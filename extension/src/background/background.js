chrome.browserAction.setBadgeBackgroundColor({ color: "rgb(211, 47, 46)" });  // badge 배경 색 설정

currentID = "";  // 현재 댓글 수집&필터링을 맡은 프로세스의 ID
stuck = {};  // popup에서 현재 status 등을 요청할 때 줄 정보들



chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request)
    }
)

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    // url
    console.log('status!', changeInfo, tab.url)
    chrome.tabs.getSelected(null, function(tab) {
        var u = new URL(tab.url);
        if (!(u.origin.includes("devtools://"))) {
            console.log(tab.url);
            url = u;  // URL 객체
        }
    });

    if (changeInfo.status == 'complete') {
        console.log('completed');
        get('turn', (turn) => {
            if (turn == 'on') {
                filtering(tab);
            } else {
                console.log('꺼져 있음');
            }
        });
    }
});
