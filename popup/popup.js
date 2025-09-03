'use-strict';

const ungültigedomains = ['accounts-static.cdn.mozilla.net', 'accounts.firefox.com', 'addons.cdn.mozilla.net', 'addons.mozilla.org', 'api.accounts.firefox.com', 'content.cdn.mozilla.net', 'discovery.addons.mozilla.org', 'oauth.accounts.firefox.com', 'profile.accounts.firefox.com', 'support.mozilla.org', 'sync.services.mozilla.com', '127.0.0.1', '0.0.0.0', '[::]', '[::1]', 'localhost', 'fritz.box', 'fritz.nas', 'fritz.repeater', 'myfritz.box', 'giga.cube', 'congstar.box', 'easy.box', 'kabel.box', 'pi.hole', 'speedport.ip', 'my.router', 'home.arpa'];
const suchstatus = document.getElementById('suchstatus');
const suchstatuscookie = document.getElementById('suchstatuscookie');
const anbieter = document.getElementById('anbieter');
const anbietercontainer = document.getElementById('anbietercontainer');
const knopfstatus = document.getElementById('knopfstatus');
const knopfstatuscontainer = document.getElementById('knopfstatuscontainer');
const main = document.getElementById('main');
const logo = document.getElementById('logo');
const keineseite = document.getElementById('keineseite');
const keineseitetext = document.getElementById('keineseitetext');
const zufrühgeöffnet = document.getElementById('zufrühgeöffnet');
const zufrühgeöffnettext = document.getElementById('zufrühgeöffnettext');
const anbietertext = document.getElementById('anbietertext');
const einwilligungsstatustext = document.getElementById('einwilligungsstatustext');
const erweiterteerkennungtext = document.getElementById('erweiterteerkennungtext');

let wiederholungverhindern;
let domain;

// Deutsch oder Englisch auswählen
let knopfstatusablehntext;
let knopfstatusgeschlossentext;
let knopfstatusakzeptierttext;
let knopfstatuseinstellungtext;
let knopfstatusgespeicherttext;
let knopfstatusdefaulttext;

let suchstatusnichtausgeführt;
let suchstatussuche;
let suchstatusnichtsgefunden;
let suchstatusgefunden;
let suchstatusfehler;

if (navigator.language === 'de' || navigator.language.startsWith('de-')) {
   suchstatuscookie.innerText = 'Cookie oder LocalStorage gesetzt.';
   anbietertext.innerText = 'Cookie Banner Anbieter:';
   einwilligungsstatustext.innerText = 'Einwilligungsstatus:';
   keineseitetext.innerText = 'Nicht unterstützte Seite. Das Addon ist auf dieser Seite dauerhaft deaktiviert.';
   zufrühgeöffnettext.innerText = 'Fehler beim Abrufen des Status. Öffne das Popup neu für einen neuen Versuch.';
   erweiterteerkennungtext.innerHTML = 'Erweiterte Cookie Banner Erkennung (beta): ';
   knopfstatusablehntext = 'Abgelehnt.';
   knopfstatusgeschlossentext = 'Geschlossen.';
   knopfstatusakzeptierttext = 'Akzeptiert.';
   knopfstatuseinstellungtext = 'Einstellungen geöffnet.';
   knopfstatusgespeicherttext = 'Einstellungen gespeichert.';
   knopfstatusdefaulttext = 'Knopf nicht gefunden.';

   suchstatusnichtausgeführt = 'Nicht ausgeführt.';
   suchstatussuche = 'Suche...';
   suchstatusnichtsgefunden = 'Kein Cookie Banner gefunden.';
   suchstatusgefunden = 'Cookie Banner gefunden.';
   suchstatusfehler = 'Fehler';
} else {
   suchstatuscookie.innerText = 'Set cookie or localStorage';
   anbietertext.innerText = 'Cookie banner provider:';
   einwilligungsstatustext.innerText = 'Accept status:';
   keineseitetext.innerText = 'Unsupported site. The addon is disabled on this site.';
   zufrühgeöffnettext.innerText = 'Error while fetching the status. Reopen this popup for a new try.';
   erweiterteerkennungtext.innerHTML = 'Advanced cookie banner detection (beta): ';
   knopfstatusablehntext = 'Declined.';
   knopfstatusgeschlossentext = 'Closed.';
   knopfstatusakzeptierttext = 'Accepted.';
   knopfstatuseinstellungtext = 'Settings opened.';
   knopfstatusgespeicherttext = 'Settings saved.';
   knopfstatusdefaulttext = 'Button not found.';

   suchstatusnichtausgeführt = 'Not executed.';
   suchstatussuche = 'Searching...';
   suchstatusnichtsgefunden = 'No cookie banner found.';
   suchstatusgefunden = 'Cookie banner found.';
   suchstatusfehler = 'Error';
}
// ENDE - Deutsch oder Englisch auswählen - ENDE

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
      }).catch(function () {
         console.error("[Cookie auto decline] Kein Content Script erreichbar.");
         main.style.display = 'none';
         logo.src = "icon_64_off.png";
         logo.style.pointerEvents = 'none';
         if (ungültigedomains.toString().includes(domain) === false) {
            zufrühgeöffnet.style.display = 'block';
         }
      });
      // Logo updaten je nach dem ob die Seite valid (http) oder invalid ist.

      if (ungültigedomains.toString().includes(domain) === false) {
         main.style.display = 'block';
         keineseite.style.display = 'none';
         logo.src = "icon_64.png";
         logo.style.pointerEvents = 'auto';
      } else {
         main.style.display = 'none';
         keineseite.style.display = 'block';
         logo.src = "icon_64_off.png";
         logo.style.pointerEvents = 'none';
         zufrühgeöffnet.style.display = 'none';
      }
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
            suchstatus.innerText = suchstatusnichtausgeführt;
            break;
         case 'suche':
            suchstatus.innerText = suchstatussuche;
            break;
         case 'nichts gefunden':
            suchstatus.innerText = suchstatusnichtsgefunden;
            break;
         case 'gefunden':
            suchstatus.innerText = suchstatusgefunden;
            break;
         default:
            suchstatus.innerText = suchstatusfehler;
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

      if (message.nachricht.anbieter === 'Wahrscheinlich Eigenentwicklung.' || message.nachricht.anbieter === 'Looks self programmed.') {
         knopfstatuscontainer.style.display = 'none';
      }

      switch (message.nachricht.knopfstatus) {
         case 'abgelehnt':
            knopfstatus.innerText = knopfstatusablehntext;
            break;
         case 'geschlossen':
            knopfstatus.innerText = knopfstatusgeschlossentext;
            break;
         case 'akzeptiert':
            knopfstatus.innerText = knopfstatusakzeptierttext;
            break;
         case 'einstellungen':
            knopfstatus.innerText = knopfstatuseinstellungtext;
            break;
         case 'gespeichert':
            knopfstatus.innerText = knopfstatusgespeicherttext;
            break;
         default:
            knopfstatus.innerText = knopfstatusdefaulttext;
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
