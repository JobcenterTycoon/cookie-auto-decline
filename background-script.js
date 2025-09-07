'use-strict';

const ungültigedomains = ['accounts-static.cdn.mozilla.net', 'accounts.firefox.com', 'addons.cdn.mozilla.net', 'addons.mozilla.org', 'api.accounts.firefox.com', 'content.cdn.mozilla.net', 'discovery.addons.mozilla.org', 'oauth.accounts.firefox.com', 'profile.accounts.firefox.com', 'support.mozilla.org', 'sync.services.mozilla.com', '127.0.0.1', '0.0.0.0', '[::]', '[::1]', 'localhost', 'fritz.box', 'fritz.nas', 'fritz.repeater', 'myfritz.box', 'giga.cube', 'congstar.box', 'easy.box', 'kabel.box', 'pi.hole', 'speedport.ip', 'my.router', 'home.arpa'];
let domain;

function prüfestatus() {
   let storagechecknichtausführen = false;
   browser.tabs.query({
      currentWindow: true,
      active: true,
   }).then(function (tabs) {
      if (tabs[0] && tabs[0].url && tabs[0].url.startsWith('http')) {
         // Ändere URL zu Domain und entfernen das www sowie www mit Zahlen (z.b. www2)
         domain = tabs[0].url.replace(/^https?:\/\/(www([0-9]{1,2})?\.)?/, '').replace(/\/.*/, '');
         // Logo updaten je nach dem ob die Seite valid (http) oder invalid ist.
         if (ungültigedomains.toString().includes(domain) === true) {
            storagechecknichtausführen = true;
            browserleisteicon(false);
         }
      } else {
         storagechecknichtausführen = true;
         browserleisteicon(false);
      }
      if (storagechecknichtausführen === false) {
         // Addon aktivieren/deaktivieren Option
         browser.storage.local.get("aufdiesenseitendeaktiviert").then(function (a) {
            let deaktiviert = false;
            if (a && a.aufdiesenseitendeaktiviert && a.aufdiesenseitendeaktiviert.seiten) {
               const seiten = a.aufdiesenseitendeaktiviert.seiten;
               for (let i = 0; i < seiten.length; i++) {
                  if (seiten[i] === domain) {
                     deaktiviert = true;
                     browserleisteicon(false);
                  }
               }
               if (deaktiviert === false) {
                  browserleisteicon(true);
               }
            } else {
               browser.storage.local.set({
                  aufdiesenseitendeaktiviert: {
                     seiten: []
                  },
               });
            }
         });
      }

   });
}


browser.tabs.onActivated.addListener(function () {
   prüfestatus();
});
browser.tabs.onCreated.addListener(function () {
   prüfestatus();
});
browser.tabs.onUpdated.addListener(function () {
   prüfestatus();
});
browser.runtime.onInstalled.addListener(function () {
   prüfestatus();
});

// Funktion erneut ausführen wenn das Contenr Script geladen wurde

browser.runtime.onMessage.addListener(function (message) {
   if (message && message.contentscriptausgeführt) {
      prüfestatus();
   }
});


function browserleisteicon(a) {
   if (a) {
      browser.action.setIcon({
         path: {
            16: 'icons/icon_16.png',
            32: 'icons/icon_32.png',
            64: 'icons/icon_64.png',
            128: 'icons/icon_128.png',
         },
      });
   } else {
      browser.action.setIcon({
         path: {
            64: "popup/icon_64_off.png"
         },
      });
   }
}