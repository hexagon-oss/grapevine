#if NET6_0_OR_GREATER
using System;
using System.Collections.Generic;
using System.Text;
using Grapeseed;
using SpaceWizards.HttpListener;

namespace Grapevine
{
    /// <summary>
    /// Wrapper for the new <see cref="SpaceWizards.HttpListener.HttpListener"/>
    /// </summary>
    internal class ManagedHttpListenerWrapper : IHttpListener
    {
        public ManagedHttpListenerWrapper()
        {
            WrappedInstance = new HttpListener();
        }
        public SpaceWizards.HttpListener.HttpListener WrappedInstance
        {
            get;
        }

        public ICollection<string> Prefixes
        {
            get
            {
                return WrappedInstance.Prefixes;
            }
        }
        public bool IsListening
        {
            get
            {
                return WrappedInstance.IsListening;
            }
        }

        public bool IsSupported
        {
            get
            {
                return HttpListener.IsSupported;
            }
        }

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

        public void Dispose()
        {
            WrappedInstance.Close();
        }

        private sealed class HttpListenerContextWrapper : IHttpListenerContext
        {
            public HttpListenerContextWrapper(HttpListenerContext httpContext)
            {
                Context = httpContext;
            }

            public HttpListenerContext Context
            {
                get;
            }

            public IHttpListenerRequest Request => new ManagedHttpListenerRequestWrapper(Context.Request);

            public IHttpListenerResponse Response => Context.Response;

            public string GetAcceptEncoding()
            {
                return Context.Request.Headers.GetValue<string>("Accept-Encoding", string.Empty);
            }
        }

        private sealed class ManagedHttpListenerRequestWrapper : IHttpListenerRequest
        {
            public ManagedHttpListenerRequestWrapper(HttpListenerRequest contextRequest)
            {
                Request = contextRequest;
            }

            public HttpListenerRequest Request
            {
                get;
            }
        }
    }
}
#endif
