'use-strict';

const suchstatus = document.getElementById('suchstatus');
const suchstatuscookie = document.getElementById('suchstatuscookie');
const anbieter = document.getElementById('anbieter');
const anbietercontainer = document.getElementById('anbietercontainer');
const knopfstatus = document.getElementById('knopfstatus');
const knopfstatuscontainer = document.getElementById('knopfstatuscontainer');
const main = document.getElementById('main');
const logo = document.getElementById('logo');
const keineseite = document.getElementById('keineseite');
const zufrühgeöffnet = document.getElementById('zufrühgeöffnet');
let wiederholungverhindern;
let domain;

browser.tabs.query({
   currentWindow: true,
   active: true,
}).then(function (tabs) {
   if (tabs[0].url.startsWith('http')) {
      // Ändere URL zu Domain und entfernen das www sowie www mit Zahlen (z.b. www2)
      domain = tabs[0].url.replace(/^https?:\/\/(www([0-9]{1,2})?\.)?/, '').replace(/\/.*/, '');
      // Popup Kommunikation
      browser.tabs.sendMessage(tabs[0].id, {
         popupstatus: "geöffnet"
      }).then(function () {
         console.log("[Cookie auto decline] geöffnet nachricht vom popup script an den content script gesendet");
         main.style.display = 'block';
         logo.src = "icon_64.png";
      }).catch(function () {
         console.error("[Cookie auto decline] Kein Content Script erreichbar.");
        main.style.display = 'none';
        logo.src = "icon_64_off.png";
        logo.style.pointerEvents = 'none';
        zufrühgeöffnet.style.display = 'block';
      });
      // Logo updaten je nach dem ob die Seite valid (http) oder invalid ist.
      main.style.display = 'block';
      keineseite.style.display = 'none';
      logo.src = "icon_64.png";
      logo.style.pointerEvents = 'auto';
   } else {
      main.style.display = 'none';
      keineseite.style.display = 'block';
      logo.src = "icon_64_off.png";
      logo.style.pointerEvents = 'none';
   }
});

browser.runtime.onMessage.addListener(function (message) {
   // Verhindern das der selbe Wert immer wieder neu ins Popup geschrieben wird.
   if (wiederholungverhindern && message.nachricht && message.nachricht.suchstatus === wiederholungverhindern.suchstatus && message.nachricht.anbieter === wiederholungverhindern.anbieter && message.nachricht.knopfstatus === wiederholungverhindern.knopfstatus) {
      return;
   }
   wiederholungverhindern = message.nachricht;
   // Aktualisiere Status
   if (message.nachricht && message.nachricht.cookiegesetzt === true) {
      suchstatuscookie.style.display = 'block';

   } else if (message.nachricht && message.nachricht.suchstatus) {
      // Suchstatus auf dem Popup anzeigen
      switch (message.nachricht.suchstatus) {
         case 'nicht ausgeführt':
            suchstatus.innerText = 'Nicht ausgeführt.';
            break;
         case 'suche':
            suchstatus.innerText = 'Suche...';
            break;
         case 'nichts gefunden':
            suchstatus.innerText = 'Kein Cookie Banner gefunden.';
            break;
         case 'gefunden':
            suchstatus.innerText = 'Cookie Banner gefunden.';
            break;
         default:
            suchstatus.innerText = 'error';
            break;
      }

      // Anbieter auf dem Popup anzeigen
      if (message.nachricht.anbieter !== 'unbekannt') {
         anbieter.innerText = message.nachricht.anbieter;
         anbietercontainer.style.display = 'block';
      } else {
         anbietercontainer.style.display = 'none';
      }

      // Knopfstatus auf dem Popup anzeigen
      if (message.nachricht.anbieter !== 'unbekannt' || message.nachricht.suchstatus === 'gefunden') {
         knopfstatuscontainer.style.display = 'block';
      } else {
         knopfstatuscontainer.style.display = 'none';
      }

      if (message.nachricht.anbieter === 'Wahrscheinlich Eigenentwicklung.') {
         knopfstatuscontainer.style.display = 'none';
      }

      switch (message.nachricht.knopfstatus) {
         case 'abgelehnt':
            knopfstatus.innerText = 'Abgelehnt.';
            break;
         case 'geschlossen':
            knopfstatus.innerText = 'Geschlossen.';
            break;
         case 'akzeptiert':
            knopfstatus.innerText = 'Akzeptiert.';
            break;
         case 'einstellungen':
            knopfstatus.innerText = 'Einstellungen geöffnet.';
            break;
         case 'gespeichert':
            knopfstatus.innerText = 'Einstellungen gespeichert.';
            break;
         default:
            knopfstatus.innerText = 'Knopf nicht gefunden.';
            break;
      }
   }
});

// Erweiterte Cookie Banner Erkennung Checkbox
const checkbox = document.getElementById('checkbox');
checkbox.addEventListener('click', function () {
   if (checkbox.checked) {
      browser.storage.local.set({
         erweitertecookiebannererkennung: {
            enabled: true
         },
      });
   } else {
      browser.storage.local.remove('erweitertecookiebannererkennung');
   }
});

browser.storage.local.get("erweitertecookiebannererkennung").then(function (a) {
   if (a && a.erweitertecookiebannererkennung && a.erweitertecookiebannererkennung.enabled === true && checkbox.checked === false) {
      checkbox.click();
   }
});

// Addon aktivieren/deaktivieren Option
browser.storage.local.get("aufdiesenseitendeaktiviert").then(function (a) {
   if (a && a.aufdiesenseitendeaktiviert && a.aufdiesenseitendeaktiviert.seiten) {
      const seiten = a.aufdiesenseitendeaktiviert.seiten;
      for (let i = 0; i < seiten.length; i++) {
         if (seiten[i] === domain) {
            main.style.display = 'none';
            logo.src = "icon_64_off.png";
         }
      }
   } else {
      browser.storage.local.set({
         aufdiesenseitendeaktiviert: {
            seiten: []
         },
      });
   }
   logo.addEventListener('click', function () {
      const seiten = a.aufdiesenseitendeaktiviert.seiten;
      let domaingelöscht = false;
      for (let i = 0; i < seiten.length; i++) {
         if (seiten[i] === domain) {
            main.style.display = 'block';
            logo.src = "icon_64.png";
            seiten.splice(i, 1);
            domaingelöscht = true;
            browser.storage.local.set({
               aufdiesenseitendeaktiviert: {
                  seiten: seiten
               },
            });
            break;
         }
      }
      if (seiten.toString().includes(domain) === false && domaingelöscht === false) {
         main.style.display = 'none';
         logo.src = "icon_64_off.png";
         seiten.push(domain);
         browser.storage.local.set({
            aufdiesenseitendeaktiviert: {
               seiten: seiten
            },
         });
      }
   });
});
