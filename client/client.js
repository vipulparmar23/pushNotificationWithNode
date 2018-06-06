const publicVapidKey = 'BJCEH1SXAoei31rVgnx_Zbjf5ZoRQKmKD0EJKiBganZcbp9nLeDr5bwRJnJwHw4nVGwDEMww4tAUwQmjt2brdI8';

// Check for service worker

if('serviceWorker' in navigator){
    send().catch(err => console.error(err));
}

// Register the service worker, register Push, send Push

async function send(){

        // Register Service Worker

    console.log('Registering Service Worker');
    const register = await navigator.serviceWorker.register('/worker.js',{
        scope: '/'
    });

    console.log('Service Worker Resgistered');

    //Register Push

    console.log('Register Push...');

    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });

    console.log('Registering Push');

    // Send Push Notification

    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers:{
            'content-type': 'application/json'
        }
    });

    console.log('Push Sent...');
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }