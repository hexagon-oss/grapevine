using System;
using System.IO;
using Grapevine;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using NLog.Extensions.Logging;

namespace Samples
{
    public class Startup
    {
        private IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddLogging(loggingBuilder =>
            {
                loggingBuilder.ClearProviders();
                loggingBuilder.AddNLog(_configuration);
            });
        }

        public void ConfigureServer(IRestServer server)
        {
            // The path to your static content
            var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "website");

            // The following line is shorthand for:
            //     server.ContentFolders.Add(new ContentFolder(folderPath));
            server.ContentFolders.Add(folderPath);
            server.UseContentFolders();

            var port = PortFinder.FindNextLocalOpenPort(1234);
            server.Prefixes.Add($"http://localhost:{port}/");

            /* Configure Router Options (if supported by your router implementation) */
            server.Router.Options.ContentExpiresDuration = TimeSpan.FromSeconds(1);
            server.Router.Options.SendExceptionMessages = true;
        }
    }
}