//Copyright (c) CodeMoggy. All rights reserved. Licensed under the MIT license.
//See LICENSE in the project root for license information.

(function () {
    "use strict";


    // The Office initialize function must be run each time a new page is loaded.
    Office.initialize = function (reason) {
        $(document).ready(signIn);
    };

    function signIn() {
        var response = { "status": "none", "accessToken": "" };

        window.config = {
            instance: "https://login.microsoftonline.com/",
            tenant: app.tenant,
            clientId: app.clientId,
            redirectUri: app.redirectUri,
            cacheLocation: 'localStorage', // enable to cache user
            endpoints: {
                "YourApiAADAppIdName": "YourApiAADAppIdUri" // AAD App ID Name / Uri of Web API
            }
        }

        // Setup auth context
        var authContext = new AuthenticationContext(window.config);

        authContext.redirectUri = app.redirectUri;
        authContext.handleWindowCallback();

        var isCallback = authContext.isCallback(window.location.hash);
        var user = authContext.getCachedUser();

        // Check if the user is cached
        if (!user) {
            authContext.login();
        }
        else {
            // Get access token for graph
            authContext.acquireToken("YourApiAADAppIdUri", function (error, token) {
                // Check for success
                if (error || !token) {
                    // Handle ADAL Error
                    response.status = "error";
                    response.accessToken = null;
                    Office.context.ui.messageParent(JSON.stringify(response));
                }
                else {
                    // Return the roken to the parent
                    response.status = "success";
                    response.accessToken = token;
                    Office.context.ui.messageParent(JSON.stringify(response));
                }
            });
        }
    }
})();