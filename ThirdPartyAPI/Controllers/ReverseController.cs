//Copyright (c) CodeMoggy. All rights reserved. Licensed under the MIT license.
//See LICENSE in the project root for license information.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ThirdPartyAPI.Controllers
{
    [Authorize]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ReverseController : ApiController
    {
        // GET api/values
        public string Get(string data)
        {
            var reversed = string.Join(" ", data.Split(' ').Select(x => new String(x.Reverse().ToArray())));

            return reversed;
        }
    }
}
