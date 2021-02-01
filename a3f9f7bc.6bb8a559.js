(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{102:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return s})),n.d(t,"metadata",(function(){return o})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return u}));var a=n(3),i=n(7),r=(n(0),n(123)),s={id:"client-overview",title:"Client Overview",sidebar_label:"Client Overview",slug:"client-overview"},o={unversionedId:"client-overview",id:"client-overview",isDocsHomePage:!1,title:"Client Overview",description:"Grapevine.Client exposes a set of extensions methods to make sending REST requests with HttpClient both readable and chainable.",source:"@site/docs\\gv-client-overview.md",slug:"/client-overview",permalink:"/grapevine/docs/client-overview",editUrl:"https://github.com/scottoffen/grapevine-docs/edit/master/docs/gv-client-overview.md",version:"current",sidebar_label:"Client Overview",sidebar:"someSidebar",previous:{title:"Direct Access via Advanced",permalink:"/grapevine/docs/advanced-access"},next:{title:"Frequently Asked Questions",permalink:"/grapevine/docs/tutorials/"}},c=[{value:"Correctly Injecting HttpClient",id:"correctly-injecting-httpclient",children:[{value:"Brief Sample",id:"brief-sample",children:[]},{value:"References",id:"references",children:[]}]},{value:"Extension Methods",id:"extension-methods",children:[]},{value:"Configure The Request",id:"configure-the-request",children:[{value:"Route (Endpoint)",id:"route-endpoint",children:[]},{value:"Authentication",id:"authentication",children:[]},{value:"Content",id:"content",children:[]},{value:"Cookies",id:"cookies",children:[]},{value:"Headers",id:"headers",children:[]},{value:"Query Parameters",id:"query-parameters",children:[]},{value:"Timeout",id:"timeout",children:[]}]},{value:"Send The Request",id:"send-the-request",children:[]},{value:"Deserialize The Response",id:"deserialize-the-response",children:[{value:"Get Response As String",id:"get-response-as-string",children:[]},{value:"Get Response As Stream",id:"get-response-as-stream",children:[]},{value:"Get Response As Byte Array",id:"get-response-as-byte-array",children:[]}]}],l={toc:c};function u(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(r.b)("wrapper",Object(a.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"Grapevine.Client exposes a set of extensions methods to make sending REST requests with ",Object(r.b)("inlineCode",{parentName:"p"},"HttpClient")," both readable and chainable."),Object(r.b)("h2",{id:"correctly-injecting-httpclient"},"Correctly Injecting HttpClient"),Object(r.b)("p",null,"The socket exhaustion problems assocaited with the incorrect usage of the ",Object(r.b)("inlineCode",{parentName:"p"},"HttpClient")," class in .NET applications has been ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.aspnetmonsters.com/2016/08/2016-08-27-httpclientwrong/"}),"well documented"),". Microsoft has published ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://docs.microsoft.com/en-us/aspnet/core/fundamentals/http-requests?view=aspnetcore-5.0"}),"an article introducing ",Object(r.b)("inlineCode",{parentName:"a"},"IHttpClientFactory")),", which is used to configure and create ",Object(r.b)("inlineCode",{parentName:"p"},"HttpClient")," instances in an app. When using the extensions in Grapevine.Client, it is recommended that these patterns are followed."),Object(r.b)("h3",{id:"brief-sample"},"Brief Sample"),Object(r.b)("p",null,"This brief sample creates a client for GitHub. In your applications ",Object(r.b)("inlineCode",{parentName:"p"},"Startup")," class, use the built in extension class ",Object(r.b)("inlineCode",{parentName:"p"},"AddHttpClient"),"."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),'public class Startup\n{\n    public Startup(IConfiguration configuration)\n    {\n        Configuration = configuration;\n    }\n\n    public IConfiguration Configuration { get; }\n\n    public void ConfigureServices(IServiceCollection services)\n    {\n        services.AddHttpClient<GitHubClient>(c =>\n        {\n            c.BaseAddress = new Uri("https://api.github.com/");\n            c.DefaultRequestHeaders.Add("Accept", "application/vnd.github.v3+json");\n            c.DefaultRequestHeaders.Add("User-Agent", "HttpClientFactory-Sample");\n        });\n\n        // DO NOT DO THIS:\n        // services.AddScoped<GitHubClient>();\n        // AS IT WILL OVERRIDE THE REGISTERATION THAT INJECTS THE CONFIGURED CLIENT\n    }\n}\n')),Object(r.b)("p",null,"This will both register our ",Object(r.b)("inlineCode",{parentName:"p"},"GitHubClient")," class with the service collection, and registers a named client and a configuration to be used with that client. When the client is eventually injected into the class below, it will already have the base address assigned, and the default headers needed to make requests to the GitHub api added and defined."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),"public class GitHubClient\n{\n    private HttpClient _client;\n\n    public GitHubClient(HttpClient client)\n    {\n        _client = client;\n    }\n\n    // Additional code removed for brevity\n}\n")),Object(r.b)("h3",{id:"references"},"References"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",Object(a.a)({parentName:"li"},{href:"https://www.aspnetmonsters.com/2016/08/2016-08-27-httpclientwrong/"}),"You're Using HttpClient Wrong And It Is Destabilizing Your Software")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",Object(a.a)({parentName:"li"},{href:"https://docs.microsoft.com/en-us/aspnet/core/fundamentals/http-requests?view=aspnetcore-5.0"}),"Make HTTP requests using IHttpClientFactory in ASP.NET Core")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",Object(a.a)({parentName:"li"},{href:"https://docs.microsoft.com/en-us/dotnet/architecture/microservices/implement-resilient-applications/use-httpclientfactory-to-implement-resilient-http-requests"}),"Use IHttpClientFactory to implement resilient HTTP requests"))),Object(r.b)("h2",{id:"extension-methods"},"Extension Methods"),Object(r.b)("p",null,"Using ",Object(r.b)("inlineCode",{parentName:"p"},"HttpClient")," involves creating an ",Object(r.b)("inlineCode",{parentName:"p"},"HttpRequestMessage"),", configuring it's properties (e.g. headers, query string, route, etc.), serializing the content, and sending that request. The response then needs to be deserialized and used."),Object(r.b)("p",null,"The extension methods available in this library simplifiy that process. The ",Object(r.b)("inlineCode",{parentName:"p"},"UsingRoute")," extension method on ",Object(r.b)("inlineCode",{parentName:"p"},"HttpClient")," returns a ",Object(r.b)("inlineCode",{parentName:"p"},"RestRequestBuilder")," object, which has extension methods on it to configure the request. It also has extension methods to send the request using different HTTP verbs, and then there are extension methods on both ",Object(r.b)("inlineCode",{parentName:"p"},"HttpResponseMessage")," and ",Object(r.b)("inlineCode",{parentName:"p"},"Task<HttpResponseMessage>"),"for deserializing the content. Put another way, the extension methods fall in to three categories."),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Configuring the ",Object(r.b)("inlineCode",{parentName:"li"},"HttpRequestMessage")),Object(r.b)("li",{parentName:"ul"},"Sending the ",Object(r.b)("inlineCode",{parentName:"li"},"HttpRequestMessage")),Object(r.b)("li",{parentName:"ul"},"Deserializing the ",Object(r.b)("inlineCode",{parentName:"li"},"HttpResponseMessage")," contents")),Object(r.b)("p",null,"The example below proceed in that order, based on topic, or you can jump to a specific method:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"UsingRoute(string route)"))),Object(r.b)("p",null,"To enjoy the benefits of using these chaning methods, you'll need to configure the request and send it all in one chain."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),'var content = await _client\n    .UsingRoute($"/repos/scottoffen/grapevine/issues")\n    .WithQueryParam("state", "open")\n    .WithQueryParam("sort", "created")\n    .WithQueryParam("direction", "desc")\n    .GetAsync()\n    .GetResponseStreamAsync();\n')),Object(r.b)("h2",{id:"configure-the-request"},"Configure The Request"),Object(r.b)("h3",{id:"route-endpoint"},"Route (Endpoint)"),Object(r.b)("p",null,"Start by setting the request route using the ",Object(r.b)("inlineCode",{parentName:"p"},"UsingRoute(string route)")," extension method. If the ",Object(r.b)("inlineCode",{parentName:"p"},"HttpClient.BaseAddress")," has already been set, the value should be relative to that value. If it has not, then you should include the fully qualified domain name and full path the endpoint."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),'_client.UsingRoute($"/repos/scottoffen/grapevine/issues");\n')),Object(r.b)("p",null,"You'll notice that this is the only extension method on ",Object(r.b)("inlineCode",{parentName:"p"},"HttpClient")," of those listed here. This method actually returns a ",Object(r.b)("inlineCode",{parentName:"p"},"RestRequestMessageBuilder"),", and all other methods below are extension methods on that class."),Object(r.b)("h3",{id:"authentication"},"Authentication"),Object(r.b)("p",null,"If your requests need authentication, you can easily add it using one of the three extensions methods below."),Object(r.b)("h4",{id:"basic-authentication"},"Basic Authentication"),Object(r.b)("p",null,"Basic authentication sends a Base64 encoded username and password. You can create the Base64 encoded string yourself or let the extension method do that for you."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),'// Send the username and password to be concatenated and Base64 encoded\n_client.WithBasicAuthentication("username", "password");\n\n// Concat and encode yourself, and just pass in the token\nvar token = "dXNlcm5hbWU6cGFzc3dvcmQ=";\n_client.UsingRoute("")\n    .WithBasicAuthentication(token);\n')),Object(r.b)("h5",{id:"oauth-authentication"},"OAuth Authentication"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),'_client.UsingRoute("")\n    .WithOAuthBearerToken(bearerToken);\n')),Object(r.b)("h4",{id:"other-authentication-schemes"},"Other Authentication Schemes"),Object(r.b)("p",null,"Or you can use a ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes"}),"different authentication scheme")," by passing in the type and credentials."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),'_client.UsingRoute("")\n    .WithAuthentication(type, credentials);\n')),Object(r.b)("h3",{id:"content"},"Content"),Object(r.b)("p",null,"You can set the content of the request by passing in a string or a pre-built ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpcontent?view=net-5.0"}),Object(r.b)("inlineCode",{parentName:"a"},"HttpContent"))," object."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),'var json = JsonSerializer.Serialize(myObject);\n_client.UsingRoute("")\n    .WithContent(json);\n\n// Send a multipart request\nMultipartContent content = ...\n_client.UsingRoute("")\n    .WithContent(content);\n\n// Or more specifically multipart/form-data\nMultipartFormDataContent content = ...\n_client.UsingRoute("")\n    .WithContent(content);\n')),Object(r.b)("h3",{id:"cookies"},"Cookies"),Object(r.b)("p",null,"You can set one or many cookies on the request."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),'// Set a single cookie\n_client.UsingRoute("")\n    .WithCookie("key", "value");\n\n// Set multiple cookies\nvar cookies = new []\n{\n    new KeyValuePair<string,string>("name", "John Smith"),\n    new KeyValuePair<string,string>("delta", "true")\n};\n\n_client.UsingRoute("")\n    .WithCookies(cookies);\n')),Object(r.b)("h3",{id:"headers"},"Headers"),Object(r.b)("p",null,"You can set one or many headers on the request."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),'// Set a single header\n_client.UsingRoute("")\n    .WithHeader("X-CustomHeader", "MyCustomValue");\n\n// Set multiple headers\nvar headers = new []\n{\n    new KeyValuePair<string,string>("Content-Type", "application/json"),\n    new KeyValuePair<string,string>("Content-Encoding", "gzip")\n};\n\n_client.UsingRoute("")\n    .WithHeaders(headers);\n')),Object(r.b)("div",{className:"admonition admonition-caution alert alert--warning"},Object(r.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-heading"}),Object(r.b)("h5",{parentName:"div"},Object(r.b)("span",Object(a.a)({parentName:"h5"},{className:"admonition-icon"}),Object(r.b)("svg",Object(a.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"}),Object(r.b)("path",Object(a.a)({parentName:"svg"},{fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"})))),"caution")),Object(r.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-content"}),Object(r.b)("p",{parentName:"div"},"It is not recommended to use this method to set cookies or authentication headers, as other extension methods may override those headers."))),Object(r.b)("h3",{id:"query-parameters"},"Query Parameters"),Object(r.b)("p",null,"Add query parameters to the route."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),'// Set a single query parameter\n_client.UsingRoute("")\n    .WithQueryParam("id", "13485");\n\n// Set multiple query parameters\nvar query = new NameValueCollection()\n{\n    {"state", "open"},\n    {"sort", "created"},\n    {"direction", "desc"},\n};\n\n_client.UsingRoute("")\n    .WithQueryParams(query);\n')),Object(r.b)("h3",{id:"timeout"},"Timeout"),Object(r.b)("p",null,"You can set the timeout value for a request by passing either a number of seconds as an integer or passing in a ",Object(r.b)("inlineCode",{parentName:"p"},"TimeSpan")," instance."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),'// Set to 10 seconds\n_client.UsingRoute("")\n    .WithRequestTimeout(10);\n\n// Set to a timespan of 10 seconds\n_client.UsingRoute("")\n    .WithRequestTimeout(TimeSpan.FromSeconds(10));\n')),Object(r.b)("h2",{id:"send-the-request"},"Send The Request"),Object(r.b)("p",null,"There are extension methods specifically for the most common HTTP methods, or you can pass in the method to be used. All of the methods take an optional cancellation token (not shown)."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),'var response = await _client\n    .UsingRoute("/user/list")\n    .WithQueryParam("sort", "desc")\n    .GetAsync();\n\nvar response = await _client\n    .UsingRoute("/user")\n    .WithContent(userdata)\n    .PostAsync();\n\nvar response = await _client\n    .UsingRoute("/user/1234")\n    .WithContent(userdata)\n    .PutAsync();\n\nvar response = await _client\n    .UsingRoute("/user/234")\n    .DeleteAsync();\n\nvar response = await _client\n    .UsingRoute("/user")\n    .WithContent(userdata)\n    .SendAsync(HttpMethod.Patch);\n')),Object(r.b)("h2",{id:"deserialize-the-response"},"Deserialize The Response"),Object(r.b)("p",null,"You can deserialize the response body to a string, stream or byte array using an extension method on the response."),Object(r.b)("h3",{id:"get-response-as-string"},"Get Response As String"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp",metastring:"{7,18}","{7,18}":!0}),'string response = await _client\n    .UsingRoute($"/repos/scottoffen/grapevine/issues")\n    .WithQueryParam("state", "open")\n    .WithQueryParam("sort", "created")\n    .WithQueryParam("direction", "desc")\n    .GetAsync()\n    .GetResponseStringAsync();\n\n/* OR */\n\nvar response = await _client\n    .UsingRoute($"/repos/scottoffen/grapevine/issues")\n    .WithQueryParam("state", "open")\n    .WithQueryParam("sort", "created")\n    .WithQueryParam("direction", "desc")\n    .GetAsync();\n\nvar responseContent = response.GetResponseStringAsync();\n')),Object(r.b)("h3",{id:"get-response-as-stream"},"Get Response As Stream"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp",metastring:"{7,18}","{7,18}":!0}),'string response = await _client\n    .UsingRoute($"/repos/scottoffen/grapevine/issues")\n    .WithQueryParam("state", "open")\n    .WithQueryParam("sort", "created")\n    .WithQueryParam("direction", "desc")\n    .GetAsync()\n    .GetResponseStreamAsync();\n\n/* OR */\n\nvar response = await _client\n    .UsingRoute($"/repos/scottoffen/grapevine/issues")\n    .WithQueryParam("state", "open")\n    .WithQueryParam("sort", "created")\n    .WithQueryParam("direction", "desc")\n    .GetAsync();\n\nvar responseContent = response.GetResponseStreamAsync();\n')),Object(r.b)("h3",{id:"get-response-as-byte-array"},"Get Response As Byte Array"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp",metastring:"{7,18}","{7,18}":!0}),'string response = await _client\n    .UsingRoute($"/repos/scottoffen/grapevine/issues")\n    .WithQueryParam("state", "open")\n    .WithQueryParam("sort", "created")\n    .WithQueryParam("direction", "desc")\n    .GetAsync()\n    .GetResponseBytesAsync();\n\n/* OR */\n\nvar response = await _client\n    .UsingRoute($"/repos/scottoffen/grapevine/issues")\n    .WithQueryParam("state", "open")\n    .WithQueryParam("sort", "created")\n    .WithQueryParam("direction", "desc")\n    .GetAsync();\n\nvar responseContent = response.GetResponseBytesAsync();\n')))}u.isMDXComponent=!0},123:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return h}));var a=n(0),i=n.n(a);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=i.a.createContext({}),u=function(e){var t=i.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=u(e.components);return i.a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},b=i.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,s=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),p=u(n),b=a,h=p["".concat(s,".").concat(b)]||p[b]||d[b]||r;return n?i.a.createElement(h,o(o({ref:t},l),{},{components:n})):i.a.createElement(h,o({ref:t},l))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,s=new Array(r);s[0]=b;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o.mdxType="string"==typeof e?e:a,s[1]=o;for(var l=2;l<r;l++)s[l]=n[l];return i.a.createElement.apply(null,s)}return i.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);