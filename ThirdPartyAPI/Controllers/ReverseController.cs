//Copyright (c) CodeMoggy. All rights reserved. Licensed under the MIT license.
//See LICENSE in the project root for license information.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ThirdPartyAPI.Controllers
{
    [Authorize]
    [EnableCors(origins: "*", headers: "*", methods: "*")] // not production-ready...consider using actual values
    public class ReverseController : ApiController
    {
        /// <summary>
        /// Reverses the letters of each word in a string 
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        // GET api/values
        public string Get(string data)
        {
            var reversed = string.Join(" ", data.Split(' ').Select(x => new String(x.Reverse().ToArray())));

            return reversed;
        }
    }
}
