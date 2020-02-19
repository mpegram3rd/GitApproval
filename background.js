chrome.runtime.onInstalled.addListener(function() {
    // Replace all rules ...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        // With a new rule ...
        chrome.declarativeContent.onPageChanged.addRules([
            {
                // That fires when a page's URL contains a 'g' ...
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { hostContains : 'github', pathContains : 'pull', schemes : ['https'] },
                        css : ['#pull_request_review_body']
                    })
                ],
                // And shows the extension's page action.
                actions: [ new chrome.declarativeContent.ShowPageAction() ]
            }
        ]);
    });
    console.log('GitApproval extension initialized');

});

chrome.pageAction.onClicked.addListener(function(tab) {
    console.log('Fired Page Action on tab: ' + JSON.stringify(tab));
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log ('Calling approval.js');

        chrome.tabs.executeScript(
            tabs[0].id, {file: 'lib/emojis.js'});
        chrome.tabs.executeScript(
            tabs[0].id, {file: 'lib/approval.js'});
        chrome.tabs.executeScript(
            tabs[0].id, { code: 'approval();' });
        console.log('After calling approval.js');

    });

});