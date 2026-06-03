// 監聽來自網頁端的訊息
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SET_REMINDER') {
        const { word, delayMs } = event.data;
        
        // 設定定時器，時間到時發出通知
        setTimeout(() => {
            self.registration.showNotification('Smart English Hub 複習提醒', {
                body: `💡 該複習單字了：【${word}】\n點擊進入網頁開始測驗！`,
                icon: 'https://cdn-icons-png.flaticon.com/512/3251/3251521.png',
                badge: 'https://cdn-icons-png.flaticon.com/512/3251/3251521.png',
                tag: 'vocab-reminder-' + word,
                renotify: true,
                data: { url: './再一次.html' }
            });
        }, delayMs);
    }
});

// 監聽點擊通知事件，點擊後打開網頁
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
            for (let client of windowClients) {
                if (client.url.includes('再一次.html') && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(event.notification.data.url);
            }
        })
    );
});