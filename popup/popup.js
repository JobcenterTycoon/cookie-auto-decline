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

function invalidedomain() {
   main.style.display = 'none';
   keineseite.style.display = 'block';
   schalteranimationsofort(true);
   schaltercheckbox.checked = false;
   schalterhintergrund.style.pointerEvents = 'none';
}

let domain;
let deaktiviertaufderseite = false;
let statusanzeigen;

// localization code
[...document.querySelectorAll('[data-i18n]')].forEach(e => {
   e[e.dataset.i18nValue || 'textContent'] = browser.i18n.getMessage(e.dataset.i18n);
   if (e.dataset.i18nTitle) {
      e.title = browser.i18n.getMessage(e.dataset.i18nTitle);
   }
});

browser.tabs.query({
   currentWindow: true,
   active: true,
}).then(function (tabs) {
   if (tabs[0].url.startsWith('http')) {
      // Ändere Tab URL zu Domain und entfernen das www sowie www mit Zahlen (z.b. www2)
      domain = tabs[0].url.replace(/^https?:\/\/(www([0-9]{1,2})?\.)?/, '').replace(/\/.*/, '');
      statusanzeigen = function () {
         // Status anzeigen
         browser.storage.local.get('cookiebannerstatuscookie').then(function (a) {
            if (a && a.cookiebannerstatuscookie) {
               let invalideseite = true;
               for (let i = 0; i < a.cookiebannerstatuscookie.length; i++) {
                  if (a.cookiebannerstatuscookie[i].seite === domain) {
                     invalideseite = false;
                     // "Cookie oder LocalStorage gesetzt" anzeigen
                     if (a.cookiebannerstatuscookie[i].cookieoderstoragegesetzt) {
                        suchstatuscookie.style.display = 'block';
                     }
                     // Suchstatus auf dem Popup anzeigen
                     switch (a.cookiebannerstatuscookie[i].suchstatus) {
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
                     if (a.cookiebannerstatuscookie[i].anbieter !== 'unbekannt') {
                        anbieter.innerText = a.cookiebannerstatuscookie[i].anbieter;
                        anbietercontainer.style.display = 'block';
                     } else {
                        anbietercontainer.style.display = 'none';
                     }

                     // Knopfstatus auf dem Popup anzeigen
                     if (a.cookiebannerstatuscookie[i].anbieter !== 'unbekannt' || a.cookiebannerstatuscookie[i].suchstatus === 'gefunden') {
                        knopfstatuscontainer.style.display = 'block';
                     } else {
                        knopfstatuscontainer.style.display = 'none';
                     }

                     if (a.cookiebannerstatuscookie[i].anbieter === _('providerSelfProgrammedMessage')) {
                        knopfstatuscontainer.style.display = 'none';
                     }

                     switch (a.cookiebannerstatuscookie[i].knopfstatus) {
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
               }
               if (invalideseite === true && !deaktiviertaufderseite) {
                  invalidedomain();
               }
            } else if (!deaktiviertaufderseite) {
               invalidedomain();
            }
         });
      };
      browser.storage.local.onChanged.addListener(statusanzeigen);

      // Addon als ausgeschaltet anzeigen wenn die Domain eine geschütte Mozilla Domain ist.
      if (ungültigedomains.toString().includes(domain) === false) {
         main.style.display = 'block';
         keineseite.style.display = 'none';
         schalteranimationsofort(true);
         schaltercheckbox.checked = true;
         schalterhintergrund.style.pointerEvents = 'auto';
      } else {
         invalidedomain();
      }
   } else {
      invalidedomain();
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

// Cookie Einstellungen
const cookieeinstellungen = document.getElementById('cookieeinstellungen');
let cookieeinstellung = cookieeinstellungen.value;

cookieeinstellungen.addEventListener('change', function() {
   cookieeinstellung = cookieeinstellungen.value;
   browser.storage.local.set({
         cookieeinstellung: {
            einstellung: cookieeinstellungen.value
         },
      });
});

browser.storage.local.get("cookieeinstellung").then(function (a) {
      if (a && a.cookieeinstellung && a.cookieeinstellung.einstellung) {
         if (a.cookieeinstellung.einstellung === 'ablehnen') {
            document.querySelector('#cookieeinstellungscontainer option[value="ablehnen"]').setAttribute('selected', 'true');
         } else if(a.cookieeinstellung.einstellung === 'funktional') {
            document.querySelector('#cookieeinstellungscontainer option[value="funktional"]').setAttribute('selected', 'true');
         } else if(a.cookieeinstellung.einstellung === 'akzeptieren') {
            document.querySelector('#cookieeinstellungscontainer option[value="akzeptieren"]').setAttribute('selected', 'true');
         }
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
            deaktiviertaufderseite = true;
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
   if (statusanzeigen) {
      statusanzeigen();
   }
});
