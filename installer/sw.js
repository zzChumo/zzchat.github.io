var cacheName = 'v14.2.2';
var cacheFiles = [
    'https://zzchumo.github.io/zzChat-Online/start.html',
    'https://zzchumo.github.io/zzChat-Online/index.html',
    'https://zzchumo.github.io/zzChat-Online/channellist.html',
    'https://zzchumo.github.io/zzChat-Online/',
    'https://zzchumo.github.io/zzChat-Online/xc.html',
    'https://zzchumo.github.io/zzChat-Online/tc.html',
    'https://zzchumo.github.io/zzChat-Online/hc.html',
    'https://zzchumo.github.io/zzChat-Online/about.html',
    'https://zzchumo.github.io/zzChat-Online/love.html',
    'https://zzchumo.github.io/zzChat-Online/en/index.html'
];
// 监听 install 事件，安装完成后，进行文件缓存
self.addEventListener('install', function (e) {
    console.log('Service Worker 状态： install');
    var cacheOpenPromise = caches.open(cacheName).then(function (cache) {
        // 把要缓存的 cacheFiles 列表传入
        return cache.addAll(cacheFiles);
    });
    e.waitUntil(cacheOpenPromise);
});
// 监听 fetch 事件，安装完成后，进行文件缓存
self.addEventListener('fetch', function (e) {
    console.log('Service Worker 状态： fetch');
    var cacheMatchPromise = caches.match(e.request).then(function (cache) {
            // 如果有cache则直接返回，否则通过fetch请求
            return cache || fetch(e.request);
        }).catch(function (err) {
            console.log(err);
            return fetch(e.request);
        })
    e.respondWith(cacheMatchPromise);
});
// 监听 activate 事件，清除缓存
self.addEventListener('activate', function (e) {
    console.log('Service Worker 状态： activate');
    var cachePromise = caches.keys().then(function (keys) {
        return Promise.all(keys.map(function (key) {
            if (key !== cacheName) {
                return caches.delete(key);
            }
        }));
    })
    e.waitUntil(cachePromise);
    return self.clients.claim();
});
