chrome.contextMenus.create({
    id: "Open_new_tabs_with_selection",
    title: "Open new tabs with selection",
    contexts: ["selection"],
});
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "Open_new_tabs_with_selection") {

        var x = info.selectionText.trim();

        if ( x.startsWith('s://') ) {
            x = 'p' + x;
        }
        if ( x.startsWith('p://') || x.startsWith('ps://') ) {
            x = 't' + x;
        }
        if ( x.startsWith('tp://') || x.startsWith('tps://') ) {
            x = 't' + x;
        }
        if ( x.startsWith('ttp://') || x.startsWith('ttps://') ) {
            x = 'h' + x;
        }

        if (chrome.extension.getURL("/").startsWith('chrome')) {
            x = x.replace(/ /g,'\n');
        }

        var a = x.replace(/\r/g, '\n').replace(/\n\n/g, '\n').split('\n');
        for (var i = 0; i < a.length; i++ ) {
            var u = a[i].trim();
            while (i+1 < a.length && !a[i+1].startsWith('http')) {
                u = u + a[i+1].trim();
                i++;
            }
            chrome.tabs.create({url: u });
        }
    }
});
