﻿using System;
using System.Net;
using System.Threading;
using Grapeseed;

namespace Grapevine
{
    public class HttpContext : IHttpContext
    {
        public CancellationToken CancellationToken { get; }

        public string Id { get; } = Guid.NewGuid().ToString();

        public Locals Locals { get; set; } = new Locals();

        public bool WasRespondedTo => Response.ResponseSent;

        public IHttpRequest Request { get; }

        public IHttpResponse Response { get; }

        public IServiceProvider Services { get; set; }

        internal HttpContext(IHttpListenerContext context, CancellationToken token)
        {
            CancellationToken = token;

            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding
            var acceptEncoding = context.GetAcceptEncoding();
            var identityForbidden = (acceptEncoding.Contains("identity;q=0") || acceptEncoding.Contains("*;q=0"));

            Request = new HttpRequest(context.Request);
            Response = new HttpResponse(context.Response)
            {
                CompressionProvider = new CompressionProvider(QualityValues.Parse(acceptEncoding), identityForbidden),
            };
        }
    }
}
