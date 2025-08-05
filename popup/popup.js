'use-strict';

const suchstatus = document.getElementById('suchstatus');
const suchstatuscookie = document.getElementById('suchstatuscookie');
const anbieter = document.getElementById('anbieter');
const anbietercontainer = document.getElementById('anbietercontainer');
const knopfstatus = document.getElementById('knopfstatus');
const knopfstatuscontainer = document.getElementById('knopfstatuscontainer');
const main = document.getElementById('main');
const logo = document.getElementById('logo');
let wiederholungverhindern;

browser.tabs.query({
   currentWindow: true,
   active: true
}).then(function (tabs) {
   if (tabs[0].url.startsWith('http')) {
      main.style.display = 'block';
      logo.src = "icon_64.png";
   } else {
      main.style.display = 'none';
      logo.src = "icon_64_off.png";
   }
});

browser.tabs.query({
   currentWindow: true,
   active: true,
}).then(function (tabs) {
   for (const tab of tabs) {
      browser.tabs.sendMessage(tab.id, {
         popupstatus: "geöffnet"
      }).then(function () {
         console.log("[Cookie auto decline] geöffnet nachricht vom popup script an den content script gesendet");
         main.style.display = 'block';
         logo.src = "icon_64.png";
      }).catch(function () {
         console.error("[Cookie auto decline] Kein Content Script erreichbar.");
         main.style.display = 'none';
         logo.src = "icon_64_off.png";
      });
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
      suchstatuscookie.innerText = 'Cookie oder LocalStorage gesetzt.';

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
            knopfstatus.innerText = 'Abgelehnt';
            break;
         case 'geschlossen':
            knopfstatus.innerText = 'Geschlossen';
            break;
         case 'akzeptiert':
            knopfstatus.innerText = 'Akzeptiert';
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
