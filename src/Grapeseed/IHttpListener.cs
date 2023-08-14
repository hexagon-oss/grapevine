using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace Grapeseed
{
    /// <summary>
    /// Interface to abstract the implementation of <see cref="System.Net.HttpListener"/>
    /// </summary>
    public interface IHttpListener : IDisposable
    {
        HttpListenerPrefixCollection Prefixes { get; }

        bool IsListening { get; }

        bool IsSupported { get; }

        void Start();
        void Stop();

        void Close();

        IAsyncResult BeginGetContext(AsyncCallback callback, object state);

        System.Net.HttpListenerContext EndGetContext(IAsyncResult asyncResult);

        System.Net.HttpListenerContext GetContext();

        System.Threading.Tasks.Task<System.Net.HttpListenerContext> GetContextAsync();
    }
}
