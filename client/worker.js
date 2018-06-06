console.log('Service Worker Loaded');

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log('Push Received...');
    self.registration.showNotification(data.title, {
        body: 'Notified by Vipul Parmar',
        icon: 'http://3.bp.blogspot.com/-aoYkVrVP6bE/T-pL6ucuG3I/AAAAAAAAAvg/pHmCRKzUJ9E/s1600/halifaxaerial1.jpg'
    });
});