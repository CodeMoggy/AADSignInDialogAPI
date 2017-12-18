//Copyright (c) CodeMoggy. All rights reserved. Licensed under the MIT license.
//See LICENSE in the project root for license information.

var app = (function () {  // jshint ignore:line
    'use strict';

    var self = {};
    self.tenant = "yourtenantname"; // tenant name of the user logging in, e.g. contoso.com
    self.clientId = "yourAADAppId"; // AAD ApplicationId of the Outlook Addin
    self.redirectUri = "yourAADReplyUrl"; // AAD ReplyUrl of the Outlook Addin

    return self;

})();