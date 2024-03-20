using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace Grapevine
{
    public abstract class ContentFolderBase : IContentFolder
    {
        public static string DefaultIndexFileName { get; } = "index.html";

        public static Func<IHttpContext, Task> DefaultFileNotFoundHandler { get; set; } = async (context) =>
        {
            context.Response.StatusCode = HttpStatusCode.NotFound;
            var content = $"File not found: {context.Request.Endpoint}";
            await context.Response.SendResponseAsync(content);
        };

        public abstract string IndexFileName { get; set; }

        public abstract string Prefix { get; set; }

        public abstract string FolderPath { get; set; }

        public Func<IHttpContext, Task> FileNotFoundHandler { get; set; } = DefaultFileNotFoundHandler;

        public virtual string CreateDirectoryListingKey(string item)
        {
            return $"{Prefix}{item.Replace(FolderPath, string.Empty).Replace(@"\", "/")}";
        }

        public virtual string GetFullPathFromUrlPath(string urlPath)
        {
            // No going backwards
            if (urlPath.Contains("/../") || urlPath.StartsWith("."))
            {
                throw new InvalidOperationException($"Not a valid path: {urlPath}");
            }

            string fullPath = urlPath;
            if (!string.IsNullOrWhiteSpace(Prefix))
            {
                fullPath = fullPath.Replace(Prefix, string.Empty);
            }

            // the url starts with a /, which is the linux root path indicator., but the second argument of Path.Combine must not be
            // such a root path indicator for the method to work correctly.
            while (fullPath.StartsWith("/"))
            {
                fullPath = fullPath.Remove(0, 1);
            }

            fullPath = Path.Combine(FolderPath, fullPath);
            FileInfo fi = new FileInfo(fullPath);
            if (fi.Attributes.HasFlag(FileAttributes.Directory))
            {
                fullPath = Path.Combine(fullPath, IndexFileName);
            }
            return fullPath;
        }

        public abstract Task SendFileAsync(IHttpContext context);

        public abstract Task SendFileAsync(IHttpContext context, string filename);
    }

    public class ContentFolder : ContentFolderBase, IContentFolder, IDisposable
    {
        private string _indexFileName = DefaultIndexFileName;
        private string _prefix = string.Empty;
        private string _path = string.Empty;

        public ILogger<IContentFolder> Logger { get; protected set; }

        public ContentFolder(string path) : this(path, null, null) { }

        public ContentFolder(string path, string prefix) : this(path, prefix, null) { }

        public ContentFolder(string path, Func<IHttpContext, Task> handler) : this(path, null, handler) { }

        public ContentFolder(string path, string prefix, Func<IHttpContext, Task> handler)
        {
            Logger = DefaultLogger.GetInstance<IContentFolder>();
            FolderPath = path;
            Prefix = prefix;
            FileNotFoundHandler = handler ?? DefaultFileNotFoundHandler;
        }

        public override string FolderPath
        {
            get => _path;
            set
            {
                if (string.IsNullOrWhiteSpace(value)) return;

                var path = Path.GetFullPath(value);
                if (_path == path) return;

                if (!Directory.Exists(path))
                {
                    path = Directory.CreateDirectory(path).FullName;
                }
                _path = path;
            }
        }

        public override string IndexFileName
        {
            get { return _indexFileName; }
            set
            {
                if (string.IsNullOrWhiteSpace(value) || _indexFileName.Equals(value, StringComparison.CurrentCultureIgnoreCase)) return;
                _indexFileName = value;
            }
        }

        public override string Prefix
        {
            get { return _prefix; }
            set
            {
                var prefix = (string.IsNullOrWhiteSpace(value))
                    ? string.Empty
                    : $"/{value.Trim().TrimStart('/').TrimEnd('/').Trim()}";

                if (_prefix.Equals(prefix, StringComparison.CurrentCultureIgnoreCase)) return;

                _prefix = prefix;
            }
        }

        public void Dispose()
        {
        }

        public override async Task SendFileAsync(IHttpContext context)
        {
            await SendFileAsync(context, null);
        }

        public override async Task SendFileAsync(IHttpContext context, string filename)
        {
            var filepath = GetFullPathFromUrlPath(context.Request.Endpoint);
            if (File.Exists(filepath))
            {
                context.Response.StatusCode = HttpStatusCode.Ok;

                var lastModified = File.GetLastWriteTimeUtc(filepath).ToString("R");
                context.Response.AddHeader("Last-Modified", lastModified);

                if (context.Request.Headers.AllKeys.Contains("If-Modified-Since") && context.Request.Headers["If-Modified-Since"].Equals(lastModified))
                {
                        await context.Response.SendResponseAsync(HttpStatusCode.NotModified).ConfigureAwait(false);
                        return;
                    }

                if (!string.IsNullOrWhiteSpace(filename))
                    context.Response.AddHeader("Content-Disposition", $"attachment; filename=\"{filename}\"");

                context.Response.ContentType = ContentType.FindKey(Path.GetExtension(filepath).TrimStart('.').ToLower());

                using (var stream = new FileStream(filepath, FileMode.Open, FileAccess.Read))
                {
                    await context.Response.SendResponseAsync(stream);
                }
            }
            // File not found, but should have been based on the path info
            else if (!string.IsNullOrEmpty(Prefix) && context.Request.Endpoint.StartsWith(Prefix, StringComparison.CurrentCultureIgnoreCase))
            {
                context.Response.StatusCode = HttpStatusCode.NotFound;
            }
            else if (!string.IsNullOrEmpty(Path.GetExtension(context.Request.Endpoint)))
            {
                // Also if this looks like a file name and the file doesn't exist, show a 404 instead of a 501 (route not found)
                context.Response.StatusCode = HttpStatusCode.NotFound;
            }
        }
    }
}
