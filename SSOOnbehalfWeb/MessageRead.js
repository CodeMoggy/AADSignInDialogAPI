//Copyright (c) CodeMoggy. All rights reserved. Licensed under the MIT license.
//See LICENSE in the project root for license information.

(function () {
  "use strict";

  var dlg;
  var messageBanner;

  // The Office initialize function must be run each time a new page is loaded.
  Office.initialize = function (reason) {
    $(document).ready(function () {
        var element = document.querySelector('.ms-MessageBanner');
        messageBanner = new fabric.MessageBanner(element);
        messageBanner.hideBanner();
        $('#reverseSubject').click(reverseSubject);
    });
  };

  function reverseSubject() {
      // determine if the version of Excel supports the required requirementSet
      if (Office.context.requirements.isSetSupported('DialogAPI', '1.1')) {

          // defines which page to open when the dialog is launched
          var url = "https://localhost:44326/authentication/auth.html";

          Office.context.ui.displayDialogAsync(url, { height: 40, width: 40, requireHTTPS: true }, function (result) {
              dlg = result.value;

              // add an event handler when the dialog message has been received
              dlg.addEventHandler(Microsoft.Office.WebExtension.EventType.DialogMessageReceived, dialogMessageReceived);
          });
      }
      else {
          // todo - need an alternative path
      }

  }

  function dialogMessageReceived(result) {

      if (result && JSON.parse(result.message).status === "success") {

          //close the dialog and call into Graph
          dlg.close();

          // grab the token from the result...this is the AAD access token that will be used to authenticate the callout to the Graph API
          var _token = JSON.parse(result.message);
          var item = Office.context.mailbox.item;
          var subjectLine = item.subject;

          $.ajax({
              url: "https://localhost:44376/api/reverse?data=" + subjectLine,
              headers: {
                  "accept": "application/json",
                  "Authorization": "Bearer " + _token.accessToken
              },
              success: function (data) {
                  showNotification("Words Reversed!", data);
              },
              error: function (err) {
                  var e = err;
              }
          });
      } else {
        // todo
      }
  }

  // Helper function for displaying notifications
  function showNotification(header, content) {
      $("#notificationHeader").text(header);
      $("#notificationBody").text(content);
      messageBanner.showBanner();
      messageBanner.toggleExpansion();
  }

})();