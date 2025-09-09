'use-strict';

const _ = browser.i18n.getMessage;

const ungültigedomains = ['accounts-static.cdn.mozilla.net', 'accounts.firefox.com', 'addons.cdn.mozilla.net', 'addons.mozilla.org', 'api.accounts.firefox.com', 'content.cdn.mozilla.net', 'discovery.addons.mozilla.org', 'oauth.accounts.firefox.com', 'profile.accounts.firefox.com', 'support.mozilla.org', 'sync.services.mozilla.com', '127.0.0.1', '0.0.0.0', '[::]', '[::1]', 'localhost', 'fritz.box', 'fritz.nas', 'fritz.repeater', 'myfritz.box', 'giga.cube', 'congstar.box', 'easy.box', 'kabel.box', 'pi.hole', 'speedport.ip', 'my.router', 'home.arpa'];

const suchstatus = document.getElementById('suchstatus');
const suchstatuscookie = document.getElementById('suchstatuscookie');
const anbieter = document.getElementById('anbieter');
const anbietercontainer = document.getElementById('anbietercontainer');
const knopfstatus = document.getElementById('knopfstatus');
const knopfstatuscontainer = document.getElementById('knopfstatuscontainer');
const main = document.getElementById('main');
const keineseite = document.getElementById('keineseite');
const zufrühgeöffnet = document.getElementById('zufrühgeöffnet');
const schaltercheckbox = document.getElementById('schaltercheckbox');
const schalterhintergrund = document.getElementById('schalterhintergrund');

function schalteranimationsofort(a) {
   if (a) {
      document.documentElement.style.setProperty('--transition', "left 0.0s");
      schalterhintergrund.style.transition = 'background-color 0.0s';
   } else {
      document.documentElement.style.setProperty('--transition', "left 0.5s");
      schalterhintergrund.style.transition = 'background-color 0.5s';
   }
}

let wiederholungverhindern;
let domain;

// localization code
[...document.querySelectorAll('[data-i18n]')].forEach(e => {
   e[e.dataset.i18nValue || 'textContent'] = chrome.i18n.getMessage(e.dataset.i18n);
   if (e.dataset.i18nTitle) {
      e.title = chrome.i18n.getMessage(e.dataset.i18nTitle);
   }
});

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
         schalteranimationsofort(true);
         schaltercheckbox.checked = false;
         schalterhintergrund.style.pointerEvents = 'none';
         if (ungültigedomains.toString().includes(domain) === false) {
            zufrühgeöffnet.style.display = 'block';
         }
      });
      // Logo updaten je nach dem ob die Seite valid (http) oder invalid ist.

      if (ungültigedomains.toString().includes(domain) === false) {
         main.style.display = 'block';
         keineseite.style.display = 'none';
         schalteranimationsofort(true);
         schaltercheckbox.checked = true;
         schalterhintergrund.style.pointerEvents = 'auto';
      } else {
         main.style.display = 'none';
         keineseite.style.display = 'block';
         schalteranimationsofort(true);
         schaltercheckbox.checked = false;
         schalterhintergrund.style.pointerEvents = 'none';
         zufrühgeöffnet.style.display = 'none';
      }
   } else {
      main.style.display = 'none';
      keineseite.style.display = 'block';
      schalteranimationsofort(true);
      schaltercheckbox.checked = false;
      schalterhintergrund.style.pointerEvents = 'none';
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
            suchstatus.innerText = _('searchStatusNotExecutedMessage');
            break;
         case 'suche':
            suchstatus.innerText = _('searchStatusSearchingMessage');
            break;
         case 'nichts gefunden':
            suchstatus.innerText = _('searchStatusNothingFoundMessage');
            break;
         case 'gefunden':
            suchstatus.innerText = _('searchStatusFoundMessage');
            break;
         default:
            suchstatus.innerText = _('searchStatusErrorMessage');
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

      if (message.nachricht.anbieter === _('providerSelfProgrammedMessage')) {
         knopfstatuscontainer.style.display = 'none';
      }

      switch (message.nachricht.knopfstatus) {
         case 'abgelehnt':
            knopfstatus.innerText = _('buttonStatusDeclinedMessage');
            break;
         case 'geschlossen':
            knopfstatus.innerText = _('buttonStatusClosedMessage');
            break;
         case 'akzeptiert':
            knopfstatus.innerText = _('buttonStatusAcceptedMessage');
            break;
         case 'einstellungen':
            knopfstatus.innerText = _('buttonStatusSettingsOpenedMessage');
            break;
         case 'gespeichert':
            knopfstatus.innerText = _('buttonStatusSettingsSavedMessage');
            break;
         default:
            knopfstatus.innerText = _('buttonStatusDefaultMessage');
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
            schalteranimationsofort(true);
            schaltercheckbox.checked = false;
            schalterhintergrund.title = _('clickToEnable');
         }
      }
   }
   schaltercheckbox.addEventListener('click', function () {
      const seiten = a.aufdiesenseitendeaktiviert.seiten;
      let domaingelöscht = false;
      for (let i = 0; i < seiten.length; i++) {
         if (seiten[i] === domain) {
            main.style.display = 'block';
            schalteranimationsofort(false);
            schaltercheckbox.checked = true;
            schalterhintergrund.title = _('clickToDisable');
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
         schalteranimationsofort(false);
         schaltercheckbox.checked = false;
         schalterhintergrund.title = _('clickToEnable');
         seiten.push(domain);
         browser.storage.local.set({
            aufdiesenseitendeaktiviert: {
               seiten: seiten
            },
         });
      }
      browser.runtime.sendMessage({
         contentscriptausgeführt: true
      });
   });
});
