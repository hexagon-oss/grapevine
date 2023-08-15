using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Grapeseed;

namespace Grapevine
{
    /// <summary>
    /// Wrapper for the original <see cref="System.Net.HttpListener"/>
    /// </summary>
    internal sealed class HttpListenerWrapper : IHttpListener
    {
        public HttpListenerWrapper()
        {
            WrappedInstance = new HttpListener();
        }

        public HttpListener WrappedInstance
        {
            get;
        }

        public void Dispose()
        {
            WrappedInstance.Close();
        }

        public ICollection<string> Prefixes => WrappedInstance.Prefixes;

        public bool IsListening => WrappedInstance.IsListening;

        public bool IsSupported => HttpListener.IsSupported;

        public void Start()
        {
            WrappedInstance.Start();
        }

        public void Stop()
        {
            WrappedInstance.Stop();
        }

        public void Close()
        {
            WrappedInstance.Close();
        }

        public IAsyncResult BeginGetContext(AsyncCallback callback, object state)
        {
            return WrappedInstance.BeginGetContext(callback, state);
        }

        public IHttpListenerContext EndGetContext(IAsyncResult asyncResult)
        {
            return new HttpListenerContextWrapper(WrappedInstance.EndGetContext(asyncResult));
        }

        public IHttpListenerContext GetContext()
        {
            return new HttpListenerContextWrapper(WrappedInstance.GetContext());
        }

        private sealed class HttpListenerContextWrapper : IHttpListenerContext
        {
            public HttpListenerContextWrapper(HttpListenerContext wrappedInstance)
            {
                Context = wrappedInstance;
            }
            private HttpListenerContext Context
            {
                get;
            }

            public string GetAcceptEncoding()
            {
                return Context.Request.Headers.GetValue<string>("Accept-Encoding", string.Empty);
            }
        }
    }
}
