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
        console.log ('Setting up approval dependencies');

        // This bit of nastiness is so we can keep the code modular
        // Unforunately, that means loading the scripts in a well defined order
        // By using the callback madness we make sure that sequential loading occurs.
        chrome.tabs.executeScript(
            tabs[0].id, {file: 'lib/emojis.js'}, function() {
                console.log ('emojis lib loaded')
                chrome.tabs.executeScript(
                    tabs[0].id, {file: 'lib/approval.js'}, function() {
                        console.log('approval lib loaded')
                        chrome.tabs.executeScript(
                            tabs[0].id, { code: 'approval();' }, function() {
                                console.log('Approval executed');
                            });
                    });

            });

    });

});