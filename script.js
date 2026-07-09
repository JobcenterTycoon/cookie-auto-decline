'use strict';
(function () {
   // Sprache
   const _ = browser.i18n.getMessage;

   // Addon Popup Variablen
   let domainohnewww = window.location.hostname.replace(/(www([0-9]{1,2})?\.)/, '');
   let cookiebannerstatus = {
      seite: domainohnewww,
      suchstatus: "suche",
      anbieter: "unbekannt",
      knopfstatus: "suche"
   };

   let erweitertecookiebannererkennungaktiviert = false;
   browser.storage.local.get('erweitertecookiebannererkennung').then(function (a) {
      if (a && a.erweitertecookiebannererkennung && a.erweitertecookiebannererkennung.enabled === true) {
         erweitertecookiebannererkennungaktiviert = true;
      }
   });

   // Cookie Einstellungen
   let cookieeinstellung;
   browser.storage.local.get("cookieeinstellung").then(function (a) {
      if (a && a.cookieeinstellung && a.cookieeinstellung.einstellung) {
         cookieeinstellung = a.cookieeinstellung.einstellung;
      } else {
         cookieeinstellung = 'ablehnen';
      }
   });

   // Führe den Hauptscript nur aus wenn das Addon nicht für die Seite deaktiviert ist. Wird es deaktiviert stoppe das Intervall. Wird es aktiviert führe das Script einmalig aus.
   let iframereferrer;
   let scriptdeaktiviert = false;
   let prüfeobdasaddondeaktiviertist;
   if (document.contentType === 'text/html' && window.location.href.startsWith('http')) {
      let scriptbereitsausgeführt = false;
      domainohnewww = window.location.hostname.replace(/(www([0-9]{1,2})?\.)/, '');
      if (document.referrer && window.self !== window.top) {
         iframereferrer = document.referrer.replace(/(www([0-9]{1,2})?\.)/, '').replace(/https?\:\/\//, '').replace(/\/.*/, '');
      }
      prüfeobdasaddondeaktiviertist = function () {
         scriptdeaktiviert = false;
         browser.storage.local.get('aufdiesenseitendeaktiviert').then(function (a) {
            if (a && a.aufdiesenseitendeaktiviert && a.aufdiesenseitendeaktiviert.seiten) {
               const seiten = a.aufdiesenseitendeaktiviert.seiten;
               for (let i = 0; i < seiten.length; i++) {
                  if (seiten[i] === domainohnewww || seiten[i] === iframereferrer) {
                     scriptdeaktiviert = true;
                  }
               }
               if (scriptdeaktiviert === false && scriptbereitsausgeführt === false) {
                  scriptbereitsausgeführt = true;
                  findecookiebannerhauptscript();
               }
            }
         });
      };
      prüfeobdasaddondeaktiviertist();
      browser.storage.local.onChanged.addListener(prüfeobdasaddondeaktiviertist);
   }

   // Hauptscript
   const findecookiebannerhauptscript = function () {

      // Cookie Banner Status Addon global mittels Storage setzen.
      const updatecookiebannerstatuscookie = function () {
         if (document.hidden !== true && window.self === window.top) {
            if (cookiebannerstatus.anbieter !== 'unbekannt' || cookiebannerstatus.knopfstatus !== 'suche') {
               cookiebannerstatus.suchstatus = 'gefunden';
            }

            browser.storage.local.get('cookiebannerstatuscookie').then(function (a) {
               if (a && a.cookiebannerstatuscookie) {
                  let tempcookiebannerstatus = a.cookiebannerstatuscookie;
                  let istdiedomainvorhanden = false;
                  for (let i = 0; i < tempcookiebannerstatus.length; i++) {
                     if (tempcookiebannerstatus[i].seite === domainohnewww) {
                        if (Object.entries(tempcookiebannerstatus[i]).toString() !== Object.entries(cookiebannerstatus).toString()) {
                           if (tempcookiebannerstatus[i].cookieoderstoragegesetzt) {
                              cookiebannerstatus.cookieoderstoragegesetzt = true;
                           }
                           tempcookiebannerstatus[i] = cookiebannerstatus;
                           browser.storage.local.set({
                              cookiebannerstatuscookie: tempcookiebannerstatus
                           });
                        }
                        istdiedomainvorhanden = true;
                     }
                  }
                  if (istdiedomainvorhanden === false) {
                     tempcookiebannerstatus.push(cookiebannerstatus);
                     browser.storage.local.set({
                        cookiebannerstatuscookie: tempcookiebannerstatus
                     });
                  }
               } else {
                  browser.storage.local.set({
                     cookiebannerstatuscookie: [
                        cookiebannerstatus
                     ]
                  });
               }
            });
         }
      };

      // Variablen
      let findconsent;
      let findconsentinterval;
      let findconsentintervalzahl = 200;
      let findconsentintervalzahlgeändert = false;
      let checkpagevisibility;
      let checkpagevisibility2;
      let findcookiebannerspecific;
      let findcookiebannerspecificinterval;
      let regelsuchebereitsgelaufen = false;

      // Forciere das Session Storage Item.
      let forcesessionstorage = function () {
         if (sessionStorage.getItem('mpowlesu908hxfyw37ghg5ikx90jdzt') !== 'djx0v0odce35xrb2pt5dzbgaj1mud5c' && window.location.host.endsWith('.mydealz.de') === false) {
            sessionStorage.setItem('mpowlesu908hxfyw37ghg5ikx90jdzt', 'djx0v0odce35xrb2pt5dzbgaj1mud5c');
         }
      };
      let beenden = function () {
         window.clearInterval(findconsentinterval);
         window.clearInterval(findcookiebannerspecificinterval);
         window.removeEventListener('visibilitychange', checkpagevisibility);
         window.removeEventListener('visibilitychange', checkpagevisibility2);
         forcesessionstorage();
      };
      let beendenohnestorage = function () {
         window.clearInterval(findconsentinterval);
         window.clearInterval(findcookiebannerspecificinterval);
         window.removeEventListener('visibilitychange', checkpagevisibility);
         window.removeEventListener('visibilitychange', checkpagevisibility2);
      };
      // Funktionen für die Cookie Banner erkennung.
      let attributchecker = function (a) {
         const htmltext = a.outerHTML.toLowerCase();
         if ((htmltext.includes('schließen') || htmltext.includes('close') || htmltext.includes('dismiss') || htmltext.includes('reject') || htmltext.includes('disallow') || htmltext.includes('akceptuję') || a.innerText.trim().match(/^(x|×|Χ|Х|х|ᕁ|ᕽ|ᚷ|Ⅹ|ⅹ|╳|❌|⤫|⤬|⨯|𐌗|𐌢|𝝬|X|☓|Ꭓ)$/i)) && a.innerText.length < 5) {
            return true;
         }
      };
      let attributcheckeradvancedchecker = function (a) {
         const links = a.getElementsByTagName('a');
         for (let i = 0; i < links.length; i++) {
            const linkhtml = links[i].outerHTML.toLowerCase().trim();
            if (linkhtml.includes('datenschutz') || linkhtml.includes('cookie') || linkhtml.includes('privacy')) {
               return true;
            }
         }
      };
      let knöpfetextcheck = function (b) {
         if (b) {
            let textcomplete;
            if (typeof b === 'object') {
               textcomplete = b.innerText.toLowerCase().trim();
               const cssbefore = getComputedStyle(b, '::before').content;
               const cssafter = getComputedStyle(b, '::after').content;
               if (cssbefore && cssbefore !== 'none' && cssbefore !== '""' && cssbefore.startsWith('url(') === false && (cssbefore !== cssbefore.toLowerCase() || cssbefore !== cssbefore.toUpperCase() || cssbefore.match(/([0-9]|€|\$|\?)/))) {
                  textcomplete = textcomplete + getComputedStyle(b, '::before').content.toLowerCase().trim();
               }
               if (cssafter && cssafter !== 'none' && cssafter !== '""' && cssafter.startsWith('url(') === false && (cssafter !== cssafter.toLowerCase() || cssafter !== cssafter.toUpperCase() || cssafter.match(/([0-9]|€|\$|\?)/))) {
                  textcomplete = textcomplete + getComputedStyle(b, '::after').content.toLowerCase().trim();
               }
               if (textcomplete.length < 2 && b.value) {
                  if (b.value === 'on' && b.name && b.name.length > 2) {
                     textcomplete = textcomplete + b.name.toLowerCase().trim();
                  } else {
                     textcomplete = textcomplete + b.value.toLowerCase().trim();
                  }
               }
            } else if (typeof b === 'string') {
               textcomplete = b.toLowerCase().trim();
            }
            textcomplete = textcomplete.replace(/( | | |​|­)/, ' ').trim();
            b = textcomplete;
            const c = b;
            const d = b;
            const paybutton = paybuttons(c);
            const marketingtracking = marketingtrackingg(d);
            const ablehntext = ['ablehnen', 'alle ablehnen', 'cookies ablehnen', 'alle cookies ablehnen', 'optionale cookies ablehnen', 'zusätzliche cookies ablehnen', 'unwichtige cookies ablehnen', 'ich lehne ab', 'notwendige', 'nur notwendige', 'nur notwendige cookies', 'nur notwendige cookies akzeptieren', 'nur technisch notwendige cookies akzeptieren', 'technisch notwendige cookies erlauben', 'schließen', 'schliessen', 'nur technisch', 'nur technische', 'nur technische cookies', 'technisch notwendige akzeptieren', 'nur erforderliche', 'nur erforderliche cookies', 'nur erforderliche cookies zulassen', 'nur mit erforderlichen cookies fortfahren', 'erforderlich bestätigen', 'fortfahren ohne zu akzeptieren', 'cookies zulassen', 'nur wesentliche', 'nur wesentliche cookies', 'weigern', 'essenzielle', 'nur essentielle cookies akzeptieren', 'nur essenzielle akzeptieren', 'nur essenzielle cookies akzeptieren', 'nicht akzeptieren', 'nichts akzeptieren', 'keine tracking-cookies', 'nur das nötigste', 'ohne cookies', 'eingeschränkte funktionalität', 'nein, danke', 'nein danke', 'nein danke.', 'nicht einverstanden', 'ich bin nicht einverstanden', 'weiter ohne einwilligung', 'weiter ohne zustimmung', 'weiter ohne tracking', 'cookies verbieten', 'lehne nicht notwendige ab', 'lehn nicht notwendige ab', 'sämtliche datennutzung ablehnen', 'ich stimme der nutzung von cookies nicht zu', 'webanalyse ablehnen', 'alle verweigern', 'nur funktionelle cookies', 'reject', 'i reject', 'reject all', 'reject cookies', 'reject optional', 'reject optional cookies', 'reject all optional cookies', 'reject additional cookies', 'reject & close', 'reject and close', 'reject non-essential', 'reject all non-essential cookies', 'reject all non essential cookies', 'essential cookies only', 'reject all non-required', 'decline', 'i decline', 'decline all', 'decline all cookies', 'deny', 'deny all', 'deny all cookies', 'refuse', 'refuse all', 'refuse all cookies', 'refuse cookies', 'disallow', 'disallow all', 'disallow all cookies', 'necassy', 'only necassy', 'only necassy cookies', 'dismiss', 'close', 'no thanks', 'necessary', 'only necessary', 'necessary only', 'required only', 'necessary cookies', 'only necessary cookies', 'necessary cookies only', 'without accept', 'continue without consent', 'continue without accepting', 'do not consent', 'nie akceptuję', 'rejeitar', 'kun nødvendige', 'nödvändiga', 'nødvendige', 'odmítnout', 'odmítnout volitelné cookies', 'odmítnout vše', 'رفض', 'niezbędne', 'begrænset', 'odmietnuť', 'essential', 'essential only', 'don\'t allow', 'ไม่ยอมรับ', 'deaktiver', 'pouze nezbytné', 'δεν αποδεχομαι', 'απόρριψη όλων', 'отклонить', 'continuar sin consentimiento', 'rifiuta', 'rifiutare', 'odmawiam', 'rechazar', 'rechazar cookies', 'prihvati samo neophodne kolačiće', 'continuer sans accepter', 'fortsätt utan att acceptera', 'zaakceptuj tylko niezbędne', 'odrzuć wszystkie', 'odrzuć', 'odrzuć niewymagane', 'odrzuć wszystko', 'refuser', 'eefuser tous les', 'refuser tous les cookies', 'tümünü reddet', 'endast nödvändiga', 'endast nödvändiga cookies', 'weigeren', 'atmesti', 'atmesti visus', 'pokračovať s nevyhnutnými cookies', 'отказвам', 'отказвам бисквитки', 'отказвам опционалните бисквитки', 'afwijzen', 'alles afwijzen', 'niet toestaan', '拒否', 'recusar', 'từ chối', '거부', '拒否する', '拒绝', '拒絕', '全部拒絕', '全部拒绝', '僅需', '仅需', 'godta bare de obligatoriske', 'godta endast nödvändiga', 'povolit jen nezbytné', 'nee, liever niet', 'alles weigeren', 'sólo cookies necesarias desde el punto de vista técnico', 'neka alla cookies', 'neka', 'refuza', 'tüm çerezleri reddediyorum', 'tüm çerezleri reddedin', 'tümünü reddet', 'en desacuerdo', 'godkänn nödvändiga cookies', 'avböj', 'n\'accepter que les cookies techniques', 'akceptuj tylko niezbędne', 'nej til cookies', 'hylkää kaikki', 'afvis', 'ne pas autoriser', 'accept necessary cookies only', 'denegar todas', 'negar', 'negare', 'nægt', 'kiellä', 'nie zgadzam się', 'nee, ik wil geen optimale cookies', 'vain välttämättömät', 'bara nödvändiga', 'только необходимые', 'dušše vealtameahttumiid', 'тільки обов\'язкові', 'refuser les cookies optionnels', 'tillåt nödvändiga', 'noraidīt'];
            for (let i = 0; i < ablehntext.length; i++) {
               if (b === ablehntext[i] && b.includes('einstellungen') === false) {
                  return 'ablehntext';
               }
            }
            const speichertext = ['speichern', 'speichern und schließen', 'schließen und speichern', 'individuelle auswahlen speichern', 'auswahl speichern', 'auswahl akzeptieren', 'individuelle auswahl speichern', 'einstellungen übernehmen', 'einstellungen speichern', 'einstellung speichern', 'meine einstellungen übernehmen', 'meine einstellungen speichern', 'auswahl übernehmen', 'auswahl bestätigen', 'meine auswahl bestätigen', 'bestätigen', 'ausgewählte übernehmen', 'ausgewählte speichern', 'ausgewählte cookies speichern', 'ausgewählte cookies übernehmen', 'speichern & schließen', 'mit erforderlichen einstellungen fortfahren', 'save', 'save choices', 'save your choice', 'save custom choices', 'confirm choices', 'opslaan', 'keuze opslaan', 'udvalgte cookies', 'sutinku', 'gem indstillinger', 'vybraných', 'αποδοχή επιλογών', 'selectie toestaan', 'voorkeuren', 'accepteer selectie', 'potvrdit moje volby', 'spara val'];
            for (let i = 0; i < speichertext.length; i++) {
               if (b === speichertext[i]) {
                  return 'speichertext';
               }
            }
            const akzeptiertext = ['akzeptieren', 'akzeptiere', 'ich akzeptiere', 'akzeptiere alle', 'ich akzeptiere alle', 'ich akzeptiere alle cookies', 'alle akzeptieren', 'alle cookies akzeptieren', 'akzeptieren und fortfahren', 'alle cookies akzeptieren und fortfahren', 'alles akzeptieren', 'cookies akzeptieren', 'ich stimme zu', 'ich stimme zu.', 'zustimmen', 'allen cookies zustimmen', 'allen zustimmen', 'cookies zustimmen', 'zustimmen und fortfahren', 'zustimmen und weiter', 'zustimmung', 'verstanden', 'ausblenden', 'erlauben', 'alle erlauben', 'cookies erlauben', 'alles erlauben', 'alle cookies erlauben', 'nur notwendige erlauben', 'nicht mehr anzeigen', 'alle auswählen', 'alles auswählen', 'alles klar', 'alles klar!', 'alles zulassen', 'bestätige', 'ein­ver­standen', 'einverstanden', 'zulassen', 'alle zulassen', 'alle zulassen und fortsetzen', 'alle cookies zulassen', 'in ordnung', 'annehmen', 'alle annehmen', 'alle bestätigen', 'alle cookies annehmen', 'cookies annehmen', 'einwilligen', 'einwilligen und weiter', 'akzeptieren und weiter', 'akzeptieren und schließen', 'einverstanden und weiter', 'weiter mit den empfohlenen cookies', 'ich bestätige alle', 'ja, ich bin einverstanden', 'okay', 'okey', 'ok', 'ок', 'ok,habe es!', 'nehme an', 'ich habe das verstanden', 'übernehmen', 'ja, ich akzeptiere cookies', 'ich verstehe und stimme der nutzung von cookies zu', 'webanalyse akzeptieren', 'agree', 'i agree', 'accept', 'i accept', 'yes, i accept', 'accept all', 'all cookies', 'accept all cookies', 'accept additional cookies', 'accept & close', 'accept and close', 'Accept recommended settings', 'got it', 'got it!', 'got it !', 'continue', 'continue browsing', 'consent', 'consent all', 'consent to all', 'consent to all cookies', 'allow', 'allow all', 'allow all cookies', 'hide', 'i understand', 'understood', 'acknowledge', 'analytics only', 'ok, i agree', 'agreed', '続ける', '閉じる', 'sutinku su visais', 'sluit melding', 'acceptér', 'ja, det er greit', 'godta', 'godta alt', 'godta alle', 'godta alle cookies', 'принять', 'принять cookies', 'povolit', 'قبول', 'zaakceptuj', 'súhlasím', 'бәрін қабылдау', 'согласен', 'kabul et', 'kabul ediyorum', 'přijmout', 'přijmout všechny cookies', 'accetta', 'accetta tutti', 'ยอมรับ', 'aceito', 'aceitar', 'aceitar e fechar', 'elfogadom', 'hyväksy', 'tillad', 'tillad alle', 'samtycker', 'wszystko', 'zamknij', 'הבנתי', 'souhlasím', 'souhlasím a pokračovat', 'αποδοχή όλων', 'αποδεχομαι', 'αποδοχή', 'acepto', 'sluit', 'zgoda', 'zgoda i kontynuacja', 'aceptar', 'aceptar todo', 'aceptar todas', 'slažem se', 'zaakceptuj', 'zaakceptuj wszystkie', 'akceptuj wszystkie', 'akceptuj wszystkie pliki cookies', 'autoriser tous les cookies', 'autoriser tous les', 'tümünü kabul et', 'tillåt alla', 'accepteren', 'alle accepteren', 'alles accepteren', 'alle cookies accepteren', 'sutikti', 'sutikti su', 'sutikti su visais', 'accepter', 'accepter alle', 'accepter & fermer', 'accepter and fermer', 'accepter et fermer', 'acceptera alla', 'acceptera alla cookies', 'accepter tous les cookies', 'acceptera', 'acceptera alla kakor', 'godkänn', 'godkänn alla', 'godkänn alla kakor', 'godkänn alla cookies', 'приемам', 'приемам всички', 'погодитися', 'zgadzam się', 'consentir', 'toestaan', 'alles toestaan', 'continuar', 'tiếp tụ', '계속', 'すべて受け入れる', '继续', '接受', '全部接受', '繼續', 'povolit všechny', 'zaakceptuj i zamknij okno', 'ik snap het!', 'ik snap het', 'povolit vše', 'akceptuję wszystkie', 'akceptuję i przechodzę do serwisu', 'zatwierdź wszystkie', 'tüm çerezleri kabul ediyorum', 'tüm çerezleri kabul edin', 'tümünü kabul et', 'estoy de acuerdo', 'прийняти файли cookie', 'zezwól', 'povolit cookies', 'j\'accepte', 'akkoord', 'accepteer alles', 'accepteer alle cookies', 'ja til cookies', 'hyväksy kaikki', 'godta alla', 'permitir todos', 'alle cookies aanvaarden', 'sluiten', 'aceitar todos', 'accettare tutti', 'akceptuj wszystko', 'tout accepter', 'accepter tout', 'ja, ik accepteer optimale cookies', 'принять все', 'dohkket buot', 'прийняти все', 'accept all non-essential cookies', 'accept all non essential cookies', 'přijmout', 'potwierdź', 'akceptuję', 'atļaut'];
            for (let i = 0; i < akzeptiertext.length; i++) {
               if (b === akzeptiertext[i]) {
                  return 'akzeptiertext';
               }
            }
            const optionstext = ['einstellungen', 'einstellungen verwalten', 'ihre auswahl treffen', 'optionen', 'setting', 'cookies verwalten', 'benutzerdefiniert', 'dostosuj pliki cookie', 'çerez ayarları', 'çerez ayarlarını yapılandır', 'cookie instellingen', 'instellingen', 'więcej opcji', 'configurações', 'impostazioni', 'možnosti', 'ustawienia', 'ustawienia zaawansowane', 'hantera mina preferenser', 'configuración', 'nastavení', 'preferencje', 'manage cookies', 'hantera', 'ustawienia plików cookie', 'ayarları değiştir', 'ajustes', 'dostosuj', 'podrobné nastavení', 'voorkeuren instellen', 'voorkeuren aanpassen', 'paramétrage', 'anpassa cookies', 'pas aan', 'kişiselleştirin', 'ustawienia plików cookies', 'hallitse', 'indstillinger', 'manage settings', 'configurar', 'configurar as minhas escolhas', 'nastavení preferencí', 'ne, uprav', 'ei, säädä', 'nei, endre valg', 'nej, justera', 'nej, juster', 'いいえ、調整します', 'nee, pas aan', 'no, aggiusta', 'no, ajustar', 'non, ajuster', 'não, ajustar', 'personnaliser mes choix', 'configure', 'nastavení', 'ustawienia zaawansowane', 'pielāgot'];
            for (let i = 0; i < optionstext.length; i++) {
               if (b.includes(optionstext[i]) && !paybutton) {
                  return 'optionstext';
               }
            }
            const funktionaltext = ['funktional', 'funktionel', 'funktions-', 'notwendige cookies zulassen', 'warenkorb speichern', 'warenkorbs zu speichern', 'anmeldedaten speichern', 'komfort', 'personalisierte inhalte', 'personalisierter inhalt', 'personalisierung von inhalten', 'personalisierung von suchergebnissen', 'optimierten kundenservice', 'videos und bilder', 'präferenzen', 'übersetzungstool', 'tidio ‑ live chat and chatbots', 'open street map', 'openstreetmap', 'optimized customer service', 'comfort', 'display videos', 'display images', 'functional', 'funzionale', 'fonctionnel', 'fonctionnalité', 'functioneel', 'functionele', 'funcionais', 'funcțional', 'funzionali', 'funcional', '機能的', '機能性', '功能性', 'foncionals', 'funksjonelle', 'i̇şlevsellik', 'swyddogaeth', 'функционалност', 'функціональності', 'Функционални', 'Функциональные', 'פונקציונליות', 'λειτουργικότητας', 'funksjonalitet', 'funkcionalitātes ', 'funkcionalumo', 'funktsionaal', 'funkcionalni', 'funkcjonalne', 'verwendung von profilen zur auswahl personalisierter inhalte', 'erstellung von profilen zur personalisierung von inhalten', 'verwendung reduzierter daten zur auswahl von inhalten', 'ein personalisiertes inhalts-profil erstellen', 'personalisierte inhalte auswählen', 'personalisierten inhalten', 'use limited data to select content', 'use profiles to select personalised content', 'create profiles to personalise content', 'utiliser des données limitées pour sélectionner le contenu', 'creare profili per la personalizzazione dei contenuti', 'utilizzare profili per la selezione di contenuti personalizzati', 'utilizzare dati limitati per la selezione dei contenuti', 'kreiranje profila za personalizaciju sadržaja', 'korišćenje profila za izbor personalizovanog sadržaja', 'sozial', 'social', 'preferenze', 'preferences', 'preferencias', 'préférences', 'external media', 'external content', 'externe medien', 'externe inhalte', 'externe dienste', 'externen inhalten', 'redaktionellen inhalten', 'redaktionelle inhalte', 'redaktionell empfohlene inhalte', 'toiminnallinen', 'funkční', 'third-party services', 'paypal express'];
            for (let i = 0; i < funktionaltext.length; i++) {
               if (b.includes(funktionaltext[i]) && !marketingtracking) {
                  return 'funktionaltext';
               }
            }
            const funktionaltext2 = ['erforderlich', 'erforderliche', 'nur erforderlich', 'nur erforderliche', 'youtube', 'facebook', 'instagram', 'tiktok', 'twitter', 'twitch', 'linkedin', 'dailymotion', 'pinterest', 'vimeo', 'soundcloud', 'maps', 'open street map', 'openstreetmap', 'kartendienst', 'landkarte', 'packstation', 'sonstige', 'extern', 'navigation', 'embedd', 'eye-able', 'service', 'zahlungsanbieter', 'zusatzfunktionen', 'recaptcha', 'paypal', 'express checkout', 'bewertungen', 'cleverpush', 'flowbox', 'guuru', 'selligent', 'trbo', 'wonderpush', 'authorized.by', 'billiger.de', 'google fonts', 'idealo', 'trusted shops', 'händlerbund', 'drittanbieter-inhalte', 'drittanbieter inhalte', 'entertainment', 'wishlist', 'wunschliste', 'tidio', 'chatbot', 'livechat', 'live chat', 'doofinder'];
            for (let i = 0; i < funktionaltext2.length; i++) {
               if (b.includes(funktionaltext2[i]) && b.length <= 25 && !marketingtracking) {
                  return 'funktionaltext';
               }
            }
         }
      };
      let paybuttons = function (c) {
         if (typeof (c) !== 'string') {
            let textcomplete = c.innerText.toLowerCase();
            const cssbefore = getComputedStyle(c, '::before').content;
            const cssafter = getComputedStyle(c, '::after').content;
            if (cssbefore !== 'none' && cssbefore.startsWith('url(') === false) {
               textcomplete = textcomplete + getComputedStyle(c, '::before').content.toLowerCase();
            }
            if (cssafter !== 'none' && cssafter.startsWith('url(') === false) {
               textcomplete = textcomplete + getComputedStyle(c, '::after').content.toLowerCase();
            }
            if (c && c.length < 2 && c.value) {
               textcomplete = textcomplete + c.value;
            }
            c = textcomplete;
         }
         const paytext = ['kaufe', 'bestell', 'kostenpflichtig', 'einloggen', 'abo', 'abbonati', 'pur ', 'werbefrei', 'spende', 'buchen', 'buy', 'pay', '€', '$', 'adfree', 'ad free', 'ad-free', 'subscribe', 'pro ', 'premium', 'order ', 'login', 'register', 'registrieren', 'registrarse', 'donate', 'suscrib', 'pagar', 'download', 'contentpass', 'content-pass', 'content pass'];
         for (let i = 0; i < paytext.length; i++) {
            if (c.includes(paytext[i]) || c.match(/[0-9]/) || c === 'order') {
               return true;
            }
         }
      };
      let marketingtrackingg = function (d) {
         const marketingtrackingtext = ['marketing', 'werbe', 'tracking', 'advertising', 'analyse', 'analytics', 'statistik', 'facebook pixel', 'meta pixel', 'adwords', 'linkedin insights', 'brevo', 'hotjar', 'microsoft clarity', 'pinterest ads', 'tiktok ads', 'google ads'];
         for (let i = 0; i < marketingtrackingtext.length; i++) {
            if (d.includes(marketingtrackingtext[i])) {
               return true;
            }
         }
      };
      // ENDE Funktionen für die Cookie Banner erkennung.
      let sichtbarkeitsprüfung = function (a) {
         const check = window.getComputedStyle(a);
         const rect = a.getBoundingClientRect();
         const maxheight = Math.max(window.innerHeight, document.body.offsetHeight, document.body.scrollHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight, screen.availHeight);
         const maxwidth = Math.max(window.innerWidth, document.body.offsetWidth, document.body.scrollWidth, document.documentElement.clientWidth, document.documentElement.scrollWidth, document.documentElement.offsetWidth, screen.availWidth);

         if (check.getPropertyValue('display') !== "none" && check.getPropertyValue('visibility') === 'visible' && check.getPropertyValue('content-visibility') === 'visible' && check.getPropertyValue('opacity') > 0.1 && (a.offsetHeight > 1 || a.offsetWidth > 1) && (rect.bottom - rect.height < maxheight) && (rect.right - rect.width < maxwidth) && (rect.top + rect.height > 0) && (rect.left + rect.width > 0) && a.checkVisibility()) {
            return true;
         } else {
            return false;
         }
      };
      let klickecookiebutton = function () {};
      let findconsentintervalzahländern = function () {
         if (findconsentintervalzahlgeändert === false) {
            findconsentintervalzahlgeändert = true;
            window.clearInterval(findconsentinterval);
            findconsentinterval = window.setInterval(function () {
               findconsent();
            }, findconsentintervalzahl);
         }
      };


      // Find Cookie Banner
      if (scriptdeaktiviert === false && sessionStorage.getItem('mpowlesu908hxfyw37ghg5ikx90jdzt') !== 'djx0v0odce35xrb2pt5dzbgaj1mud5c' && document.querySelector('body[class="no-js"] > .main-wrapper[role="main"] + script') === null && document.querySelector('html[style="height:100%"] iframe[src^="/_Incapsula_Resource?"]') === null && document.querySelector('link[href="/cdn-cgi/styles/challenges.css"][rel="stylesheet"]') === null && document.querySelector('body > .main-wrapper:first-child + script + script[src^="https://static.cloudflareinsights.com/beacon.min.js/"]:last-child') === null && document.querySelector('body > .main-wrapper > .main-content:only-child > noscript:only-child') === null && document.querySelector('body > script:first-child + #container + .cf-turnstile + div + script:last-child') === null && document.querySelector('body[style="margin:0"] > script[src^="https://ct.captcha-delivery.com/"]') === null && document.querySelector('head > script[src^="/TSPD/"] + noscript:last-child') === null && document.querySelector('body > div:first-child + script[src^="https://mcl.spur.us/d/mcl.js?"] + script:last-child') === null && document.querySelector('body > main > div > script[src^="/.within.website/x/cmd/anubis/static/js/main"]') === null && window.location.hostname !== 'accounts.google.com' && window.location.hostname !== 'challenges.cloudflare.com' && window.location.href.startsWith('https://www.google.com/recaptcha/') !== true && window.location.href.startsWith('https://www.recaptcha.net/recaptcha/') !== true && window.location.href.startsWith('https://w.soundcloud.com/player/?url=http') !== true && window.location.href.startsWith('https://r-login.wordpress.com/remote-login.php') !== true) {

         let nc;
         let ncnowww;
         if (window.location.protocol === 'http:') {
            nc = "domain=" + window.location.hostname + ";max-age=86400; SameSite=Lax; path=/";
            ncnowww = "domain=" + domainohnewww + ";max-age=86400; SameSite=Lax; path=/";
         } else {
            nc = "domain=" + window.location.hostname + ";secure=true; max-age=86400; SameSite=None; path=/";
            ncnowww = "domain=" + domainohnewww + ";secure=true; max-age=86400; SameSite=None; path=/";
         }
         const cookiedatum = new Date().toISOString();
         const cookiezeit = new Date().getTime();

         // Intervall nur laufen lassen wenn das Fenster sichtbar ist.
         checkpagevisibility = function () {
            if (document.hidden === true) {
               window.clearInterval(findconsentinterval);
            } else if (document.hidden === false) {
               findconsentinterval = window.setInterval(function () {
                  findconsent();
               }, findconsentintervalzahl);
            }
         };
         window.addEventListener('visibilitychange', checkpagevisibility);
         if (document.hidden === false) {
            findconsentinterval = window.setInterval(function () {
               findconsent();
            }, findconsentintervalzahl);
         }

         let bereitsgeklickt = false;
         let bereitsgeklickt2 = false;
         let advancedcounter = 0;
         let advancedslowdown = 3;
         let advancedrun = true;
         let altererkennungsscriptausgeführt = false;
         let findconsentcounter = 0;
         let cookiebannerfinalakzeptiert = false;
         let cookiebannerfinalakzeptiertcounter = 0;
         let cookiebannerfinalakzeptiertversuche = 0;

         let sfbxabgelehnt = false;
         let switchesdelay = 0;

         // Suchintervall
         findconsent = function () {
            // Intervall nach 10 Sekunden im sichtbaren Bereich stoppen.
            findconsentcounter++;
            if (cookiebannerfinalakzeptiert === true) {
               cookiebannerfinalakzeptiertcounter++;
            }
            if (cookiebannerfinalakzeptiertversuche >= 4) {
               beenden();
            }
            if (findconsentcounter >= (10000 / findconsentintervalzahl)) {
               cookiebannerstatus.suchstatus = 'nichts gefunden';
               beendenohnestorage();
            }
            if (scriptdeaktiviert === true) {
               browser.storage.local.onChanged.removeListener(prüfeobdasaddondeaktiviertist);
               beendenohnestorage();
               sessionStorage.removeItem('mpowlesu908hxfyw37ghg5ikx90jdzt');
            }

            let ablehnen;
            let speichern;
            let einstellungen;
            let schließen;
            let akzeptieren;
            let nureinklickeinstellungen;

            // iFrame Klicker
            if (window.self !== window.top) {

               // cdn.privacy-mgmt.com
               if (window.location.href.includes('/index.html?') && window.location.href.includes('hasCsp=') && window.location.href.includes('message_id=') && window.location.href.includes('consent')) {
                  console.log('[Cookie auto decline] Detected: privacy-mgmt.com (iFrame)');
                  cookiebannerstatus.anbieter = 'privacy-mgmt.com (iFrame)';
                  advancedrun = false;
                  nureinklickeinstellungen = true;
                  findconsentintervalzahl = 602;
                  findconsentintervalzahländern();
                  if (cookieeinstellung !== 'akzeptieren') {
                     einstellungen = document.querySelector('button.sp_choice_type_12');
                     if (window.screen.availWidth < 500) {
                        einstellungen = document.querySelector('button.sp_choice_type_12.mobile');
                     }
                     const einstellungenknöpfe = document.querySelectorAll('.pm-main .pur-buttons-container > button');
                     if (einstellungenknöpfe.length > 0) {
                        advancedrun = false;
                        for (let i = 0; i < einstellungenknöpfe.length; i++) {
                           const a = einstellungenknöpfe[i];
                           if (getComputedStyle(a).getPropertyValue('display') !== 'none' && getComputedStyle(a).getPropertyValue('visibility') !== 'hidden') {
                              cookiebannerstatus.knopfstatus = 'einstellungen';
                              if (einstellungenknöpfe[i].parentElement.parentElement.querySelector('.required-consent')) {
                                 const b = einstellungenknöpfe[i];
                                 if (knöpfetextcheck(b) === 'akzeptiertext') {
                                    a.click();
                                 }
                              } else {
                                 if (cookieeinstellung === 'funktional') {
                                    switchesdelay++;
                                    let b = einstellungenknöpfe[i].parentElement.parentElement;
                                    let textgeprüft = knöpfetextcheck(b);
                                    if (textgeprüft === 'funktionaltext') {
                                       b = einstellungenknöpfe[i];
                                       textgeprüft = knöpfetextcheck(b);
                                       if (textgeprüft === 'akzeptiertext') {
                                          a.click();
                                       }
                                    } else {
                                       a.click();
                                    }
                                 } else {
                                    a.click();
                                 }
                              }
                           }
                        }
                     } else {
                        if (domainohnewww !== 'cmp.tag24.de') {
                           ablehnen = document.querySelector('button.sp_choice_type_REJECT_ALL, .sp_choice_type_13');
                        }
                     }
                  }
                  speichern = document.querySelector('button.sp_choice_type_SAVE_AND_EXIT:not(:disabled)');
                  akzeptieren = document.querySelector('button.accept-all, button.sp_choice_type_ACCEPT_ALL');
                  if (!einstellungen && !speichern) {
                     akzeptieren = document.querySelectorAll('button.accept-all, button.sp_choice_type_ACCEPT_ALL, .sp_choice_type_11');
                     for (let i = 0; i < akzeptieren.length; i++) {
                        const c = akzeptieren[i];
                        if (akzeptieren[i].checkVisibility() && paybuttons(c) !== true) {
                           akzeptieren = akzeptieren[i];
                        }
                     }
                     if (akzeptieren.length === 0) {
                        akzeptieren = undefined;
                     }
                  }
                  klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
               }

               // privacymanager.io (iframe klicker)
               if (window.location.hostname === 'cmp-consent-tool.privacymanager.io') {
                  console.log('[Cookie auto decline] Detected: privacymanager.io (iFrame)');
                  cookiebannerstatus.anbieter = 'privacymanager.io (iFrame)';
                  einstellungen = document.querySelector('button#manageSettings');
                  speichern = document.querySelector('button#saveAndExit');
                  klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
               }

               // trustarc.com (iframe klicker)
               if (window.location.hostname === 'consent-pref.trustarc.com') {
                  console.log('[Cookie auto decline] Detected: trustarc.com (iFrame)');
                  findconsentintervalzahl = 802;
                  findconsentintervalzahländern();
                  cookiebannerstatus.anbieter = 'trustarc.com (iFrame)';
                  ablehnen = document.querySelector('.mainContent .pdynamicbutton .required, .mainContent .bottom .rejectAll, .mainContent .trustarc-submit-buttons-container > button.trustarc-declineall-btn, .gdpr .declineAllButtonLower');
                  if (cookieeinstellung === 'funktional') {
                     switchesdelay++;
                     const switches = document.querySelectorAll('.cookiecat, li.listItem');
                     for (let i = 0; i < switches.length; i++) {
                        let b = switches[i];
                        if (switches[i].querySelector('.viewcookie')) {
                           b = switches[i].querySelector('p, span.gwt-InlineHTML h3');
                        }
                        if (knöpfetextcheck(b) === 'funktionaltext') {
                           if (switches[i].querySelector('.switch > .gwt-InlineHTML:first-child + .gwt-InlineHTML, .switchContainerLayerOne > .consentyes')) {
                              switches[i].querySelector('.switch > .gwt-InlineHTML:first-child + .gwt-InlineHTML, .switchContainerLayerOne > .consentyes').click();
                           }
                        } else {
                           if (switches[i].querySelector('.switch > .gwt-InlineHTML:first-child, .switchContainerLayerOne > .consentno')) {
                              switches[i].querySelector('.switch > .gwt-InlineHTML:first-child, .switchContainerLayerOne > .consentno').click();
                           }
                        }
                     }
                     speichern = document.querySelector('button.submit, a.saveAndExit, .pdynamicbutton[style="visibility: visible;"] a.submit[role="button"]');
                  }
                  akzeptieren = document.querySelector('a.call, button.acceptAllButtonLower, a.acceptAll');
                  schließen = document.querySelector('.mainContent .pdynamicbutton .close');
                  klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
               }

               // baycloud.ie (iframe klicker)
               if (window.location.hostname === 'cdn.baycloud.com') {
                  console.log('[Cookie auto decline] Detected: baycloud.ie (iFrame)');
                  cookiebannerstatus.anbieter = 'baycloud.ie (iFrame)';
                  findconsentintervalzahl = 2802;
                  findconsentintervalzahländern();
                  nureinklickeinstellungen = true;
                  ablehnen = document.querySelector('#panelContainer button#panelDecline');
                  einstellungen = document.querySelector('#panelContainer button#toggleDetails');
                  speichern = document.querySelector('#panelContainer button#panelSaveSelected:not(.hide)');
                  klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
                  let css = document.createElement('style');
                  css.innerText = 'body{opacity:0!important;pointer-events:none!important;}';
                  css.setAttribute('id', 'vktgytywnpohtlutzkebaunetlurwlcj');
                  if (document.head !== null) {
                     document.head.appendChild(css);
                  }
                  window.setTimeout(function () {
                     let csscheck1 = document.getElementById('vktgytywnpohtlutzkebaunetlurwlcj');
                     if (csscheck1 !== null) {
                        csscheck1.remove();
                     }
                  }, 5000);
               }

               // trustcommander.net
               if (window.location.href.startsWith('https://cdn.trustcommander.net/privacy-center/template/index.htm')) {
                  console.log('[Cookie auto decline] Detected: trustcommander.net (iFrame)');
                  cookiebannerstatus.anbieter = 'trustcommander.net (iFrame)';
                  advancedrun = false;
                  if (cookieeinstellung === 'funktional') {
                     const personalisierung = document.querySelector('.category-container > .col-sm-3:has(+ .col-sm-3:last-child) button.btn-switch-no.btn-primary');
                     if (personalisierung) {
                        personalisierung.click();
                     }
                  }
                  speichern = document.querySelector('#privacy-cat-modal button.btn-primary:is([title*="estätigen"], [title*="peichern"])');
                  klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
               }

               // Contentpass iFrame
               if (window.location.href.startsWith('https://cp.') && window.location.href.includes('/first-layer/?start&theme=')) {
                  console.log('[Cookie auto decline] Detected: Contentpass (iFrame)');
                  cookiebannerstatus.anbieter = 'Contentpass (iFrame)';
                  akzeptieren = document.querySelector('main.animation astro-island[props*="acceptAll"] > button');
                  klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
               }

               // clym.io
               if (window.location.host === 'widget-next.clym-sdk.net' || window.location.host === 'cf.clym-widget.net') {
                  console.log('[Cookie auto decline] Detected: clym.io (iFrame)');
                  cookiebannerstatus.anbieter = 'clym.io (iFrame)';
                  advancedrun = false;
                  ablehnen = document.querySelector('#clym-notice-layout button#handle-reject-all, #clym-app-layout button#handle-reject');
                  akzeptieren = document.querySelector('#clym-notice-layout button#handle-continue, #clym-app-layout button#handle-accept');
                  if (cookieeinstellung === 'funktional') {
                     speichern = document.querySelector('#clym-notice-layout button#handle-continue, #clym-app-layout button#handle-accept');
                     switchesdelay++;
                     const boxen = document.querySelectorAll('[id^="clym-"] ul > li > label:not([data-disabled="true"])');
                     for (let i = 0; i < boxen.length; i++) {
                        const b = boxen[i].querySelector('p');
                        if (knöpfetextcheck(b) === 'funktionaltext') {
                           const checkbox = boxen[i].querySelector('input[type="checkbox"]:not([disabled], :checked)');
                           if (checkbox) {
                              checkbox.click();
                           }
                        }
                     }
                  }
                  klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
               }
            }
            // iframe klicker ENDE

            // #cmpbox (consensu.org, consentmanager.net)
            const cmpbox = document.querySelector('#cmpbox.cmpbox');
            if (cmpbox) {
               console.log('[Cookie auto decline] Detected: #cmpbox (consensu.org, consentmanager.net)');
               cookiebannerstatus.anbieter = '#cmpbox (consensu.org, consentmanager.net)';
               advancedrun = false;
               ablehnen = cmpbox.querySelector('a.cmptxt_btn_no[role="button"]');
               speichern = cmpbox.querySelector('a.cmptxt_btn_save');
               akzeptieren = cmpbox.querySelector('a.cmptxt_btn_yes[role="button"]');
               const cookiebannertext = cmpbox.innerText.toLowerCase();
               if (!cookiebannertext.includes('kostenfrei mit werb') && !cookiebannertext.includes('contentpass') && !cookiebannertext.includes('werbevideo') && !cookiebannertext.includes('pur-abo') && !cookiebannertext.includes('pur abo') && !cookiebannertext.includes('abonnement')) {
                  einstellungen = cmpbox.querySelector('a.cmptxt_btn_settings[role="button"], a.cmptxt_btn_custom');
               }
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const boxen = cmpbox.querySelectorAll('tr:has(a[role="checkbox"])');
                  for (let i = 0; i < boxen.length; i++) {
                     const b = boxen[i].querySelector('span[id^="cmpboxvendname"], td.cmpvendname');
                     if (knöpfetextcheck(b) === 'funktionaltext') {
                        const checkbox = boxen[i].querySelector('a[role="checkbox"][aria-checked="false"]:not([disabled], :checked)');
                        if (checkbox) {
                           checkbox.click();
                        }
                     }
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // #cmpbox shadowroot (consensu.org, consentmanager.net)
            const cmpboxshadowroot = document.querySelector('#cmpwrapper.cmpwrapper');
            if (cmpboxshadowroot) {
               console.log('[Cookie auto decline] Detected: #cmpbox shadowroot (consensu.org, consentmanager.net)');
               cookiebannerstatus.anbieter = '#cmpbox shadowroot (consensu.org, consentmanager.net)';
               const contentpassvorhanden = cmpboxshadowroot.shadowRoot.querySelector('.cmpcontentpass, a[href*="-pur-"], .pur__offer, [onclick="showPurPianoExperience()"]');
               if (!contentpassvorhanden) {
                  ablehnen = cmpboxshadowroot.shadowRoot.querySelector('#cmpbox a.cmptxt_btn_no[role="button"], .cmpboxbtnsave[role="button"]');
                  const einstellungenknöpfe = cmpboxshadowroot.shadowRoot.querySelectorAll('a[onclick^="__cmp(\'showScreenAdvanced\')"], #cmpwelcomebtncustom a.cmpboxbtncustom, a.cmptxt_btn_custom');
                  for (let i = 0; i < einstellungenknöpfe.length; i++) {
                     if (einstellungenknöpfe[i].checkVisibility()) {
                        einstellungen = einstellungenknöpfe[i];
                     }
                  }
                  if (cookieeinstellung === 'funktional') {
                     switchesdelay += 0.5;
                     const boxen = cmpboxshadowroot.shadowRoot.querySelectorAll('.cmpwelcomeprps, .cmpboxnaviitem');
                     for (let i = 0; i < boxen.length; i++) {
                        const b = boxen[i].querySelector('label, .cmpboxnaviitemtxt');
                        if (knöpfetextcheck(b) === 'funktionaltext') {
                           const checkbox = boxen[i].querySelector('a[role="checkbox"][aria-checked="false"]:not([disabled], :checked)');
                           if (checkbox) {
                              checkbox.click();
                           }
                        }
                     }
                  }
                  speichern = cmpboxshadowroot.shadowRoot.querySelector('a.cmptxt_btn_save, a.cmptxt_btn_save2');
               }
               akzeptieren = cmpboxshadowroot.shadowRoot.querySelector('a.cmptxt_btn_yes[role="button"]');
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // Contentpass (obfuscated)
            const contentpass = document.querySelector('body > div[data-nosnippet][translate] > div:first-child:not([class], [id]) > div[class^="_"]:not([id]):has(a[href*="datenschutz"]), body > div:first-child + div[data-nosnippet][translate] > div:first-child > div[class^="_"]:not([id]):has(a[href*="datenschutz"])');
            if (contentpass) {
               console.log('[Cookie auto decline] Detected: Contentpass (obfuscated)');
               cookiebannerstatus.anbieter = 'Contentpass (obfuscated)';
               akzeptieren = contentpass.querySelector('a[class^="_"][href^="http"][rel="noopener noreferrer"][target="_self"]');
               if (akzeptieren.innerText.toLowerCase().endsWith('weiter')) {
                  klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
               }
            }

            // opencmp.net
            const opencmp = document.querySelector('script#open-cmp-stub:is([src="https://cdn.opencmp.net/tcf-v2/cmp-stub-latest.js"], [src="//cdn.opencmp.net/tcf-v2/cmp-stub-latest.js"])');
            if (opencmp && document.cookie.includes('euconsent-v2') === false) {
               findconsentintervalzahl = 502;
               findconsentintervalzahländern();
               console.log('[Cookie auto decline] Detected: opencmp.net');
               cookiebannerstatus.anbieter = 'opencmp.net';
               const cookiecontainer = document.getElementsByClassName('cmp-root-container');
               if (cookiecontainer.length > 0) {
                  akzeptieren = document.querySelector('.cmp-root-container').shadowRoot.querySelector('.cmp-button-accept-all');
                  klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
               }
            }

            // usercentrics.eu
            const usercentrics = document.querySelector('[id^="usercentrics-"]:not(script), [class="aa-first-layer cxenseignore"]');
            const usercentricsscript = document.querySelector('script[src*="usercentrics.eu/"]');
            if (usercentrics && usercentricsscript && localStorage.getItem('uc_user_interaction') !== true) {
               findconsentintervalzahl = 502;
               findconsentintervalzahländern();
               console.log('[Cookie auto decline] Detected: usercentrics');
               cookiebannerstatus.anbieter = 'usercentrics';
               advancedrun = false;
               if (usercentrics.shadowRoot) {
                  ablehnen = usercentrics.shadowRoot.querySelector('button[class^="sc-"][data-testid="uc-deny-all-button"][role="button"], button#deny');
                  einstellungen = usercentrics.shadowRoot.querySelector('button[data-testid^="uc-customize-"][style], button.uc-more-button, button[data-testid^="uc-more-"], button[data-testid="uc-customize-anchor"]:not([aria-label="Anbieterliste"]), a#uc-more-link[data-action-type="more"]');
                  akzeptieren = usercentrics.shadowRoot.querySelector('button[data-testid="uc-accept-all-button"], button#accept');
                  if (!einstellungen || cookieeinstellung === 'ablehnen') {
                     speichern = usercentrics.shadowRoot.querySelector('button[data-testid="uc-save-button"], button#save.uc-save-button, button[class^="sc-"][data-testid="uc-save-button"][role="button"]');
                  }
                  if (cookieeinstellung === 'funktional') {
                     if (bereitsgeklickt) {
                        if (usercentrics.shadowRoot.querySelector('[data-testid="uc-tcf-purposes-expandable"]')) {
                           switchesdelay += 0.5;
                        } else {
                           switchesdelay++;
                        }
                     }
                     const boxen = usercentrics.shadowRoot.querySelectorAll('.uc-expandable-card, [data-testid="uc-expandable-card"], [data-testid="uc-tcf-special-features-expandable"], [data-testid="uc-tcf-purposes-expandable"]');
                     for (let i = 0; i < boxen.length; i++) {
                        const b = boxen[i].querySelector('.uc-card-title, button > div[id]:first-child');
                        if (boxen[i].checkVisibility() && knöpfetextcheck(b) === 'funktionaltext') {
                           const switchh = boxen[i].querySelector('button[role="switch"][aria-checked="false"]');
                           if (switchh && switchh.checkVisibility()) {
                              switchh.click();
                           }
                        }
                     }
                  }
               } else {
                  akzeptieren = document.querySelector('button.aa-first-layer__button[onclick^="accept"], button#uc-btn-accept-banner');
                  ablehnen = document.querySelector('button#uc-btn-deny-banner');
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // usercentrics.eu 2
            const usercentrics2 = document.getElementById('comspace-usercentrics');
            const usercentricsframe = document.querySelector('iframe#uc-cross-domain-bridge[src^="https://app.usercentrics.eu/browser-sdk/"]');
            if (usercentrics2 && usercentricsframe && localStorage.getItem('uc_user_interaction') !== true) {
               console.log('[Cookie auto decline] Detected: usercentrics2');
               cookiebannerstatus.anbieter = 'usercentrics';
               speichern = usercentrics2.querySelector('button.comspace-usercentrics--button');
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // gatekeeperconsent.com
            const gatekeeperconsent = document.querySelector('script[src="https://privacy.gatekeeperconsent.com/tcf2_stub.js"]');
            if (gatekeeperconsent && document.cookie.includes('ezCMPCookieConsent') === false) {
               console.log('[Cookie auto decline] Detected: gatekeeperconsent.com');
               cookiebannerstatus.anbieter = 'gatekeeperconsent.com';
               ablehnen = document.querySelector('button#ez-reject-all');
               einstellungen = document.querySelector('button#ez-manage-settings');
               if (cookieeinstellung === 'funktional') {
                  const boxen = document.querySelectorAll('#ez-cookie-dialog .ez-cmp-purpose');
                  for (let i = 0; i < boxen.length; i++) {
                     if (knöpfetextcheck(boxen[i]) === 'funktionaltext') {
                        const switchh = boxen[i].querySelector('input[type="checkbox"].ez-cmp-purpose-consent-checkbox:not(:checked)');
                        if (switchh && switchh.checkVisibility()) {
                           switchh.click();
                        }
                     }
                  }
               }
               speichern = document.querySelector('button#ez-save-settings');
               akzeptieren = document.querySelector('#ez-cookie-dialog button#ez-accept-all');
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // cookiebot.com
            const cookiebot = document.querySelector('div[id*="Cookiebot"], div#cookiebot, #cookiebanner[name="cookiebanner"][ng-non-bindable], #cookieBotLayer, [data-template*="cookiebot"]');
            if (cookiebot && document.cookie.includes('%2Cutc:16') === false) {
               console.log('[Cookie auto decline] Detected: cookiebot.com');
               cookiebannerstatus.anbieter = 'cookiebot.com';
               ablehnen = cookiebot.querySelector('button.cint-cookiebot__buttons__deny, :not([style="display: none;"]) > #CybotCookiebotDialogBodyButtonDecline, button.cookie-alert-decline-button, [class*="cookie"] a[href="javascript:void(0)"][onclick="Cookiebot.dialog.submitDecline()"], #CybotCookiebotDialogBodyLevelButtonLevelOptinDeclineAll, button[value="reject"]');
               speichern = cookiebot.querySelector(':is([id*="OptinAllowallSelection"], [id*="AcceptSelected"], [onclick*="submitConsent"]):is(button, a, span)');
               einstellungen = cookiebot.querySelector('#CybotCookiebotDialogBodyLevelButtonCustomize, #CybotCookiebotDialogBodyButtonDetails, #CybotCookiebotDialogBodyLevelDetailsButton, a[onclick="CookieSettingsManage(true)"]');
               if (cookieeinstellung === 'funktional') {
                  const switchh = cookiebot.querySelector('input[type="checkbox"]#CybotCookiebotDialogBodyLevelButtonPreferences:not(:checked)');
                  if (switchh && switchh.checkVisibility()) {
                     switchh.click();
                  }
               }
               if (domainohnewww === 'eu-schwerbehinderung.eu') {
                  ablehnen = undefined;
                  einstellungen = undefined;
                  speichern = undefined;
               }
               akzeptieren = cookiebot.querySelector('button#CybotCookiebotDialogBodyButtonAccept, #CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll, a[onclick="CookieSettingsAcceptAll()"], button[value="accept"]');
               nureinklickeinstellungen = true;
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // trustarc.com
            const trustarc = document.querySelector('script[src^="https://consent.trustarc.com/asset/notice.js/v/v"]');
            if (trustarc && document.cookie.includes('notice_gdpr_prefs=') === false) {
               console.log('[Cookie auto decline] Detected: trustarc.com');
               cookiebannerstatus.anbieter = 'trustarc.com';
               advancedrun = false;
               ablehnen = document.querySelector('#truste-consent-buttons button#truste-consent-required, #truste-consent-track #truste-consent-buttons > a#truste-consent-required');
               einstellungen = document.querySelector('#truste-consent-buttons #truste-show-consent');
               nureinklickeinstellungen = true;
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // real-cookie-banner-pro (devowl.io)
            const realcookiebannerpro = document.querySelector('div[class^="a"][id^="a"][consent-skip-blocker][data-bg][style^="background-color"] > dialog.wp-exclude-emoji[aria-labelledby^="a"][open=""], div[id^="a"][class=""][data-bg][style*="background"] > [class="wp-exclude-emoji "][style*="display: flex; width: 100%; height: 100%;');
            if (realcookiebannerpro && window.localStorage.getItem('real_cookie_banner-consent-queue-lock') === null && document.cookie.includes('%22main_essential%22%7D') === false) {
               console.log('[Cookie auto decline] Detected: real-cookie-banner-pro (devowl.io)');
               cookiebannerstatus.anbieter = 'real-cookie-banner-pro (devowl.io)';
               advancedrun = false;
               const knöpfe = realcookiebannerpro.querySelectorAll('a[href="#"][role="button"], div[id^="bnnr-body-"] > div[style^="text-decoration:"][style*="display: flex; align-items: center; justify-content: center; "] > span');
               for (let i = 0; i < knöpfe.length; i++) {
                  const textgeprüft = knöpfetextcheck(knöpfe[i]);
                  if (textgeprüft === 'ablehntext') {
                     ablehnen = knöpfe[i];
                  } else if (textgeprüft === 'optionstext') {
                     einstellungen = knöpfe[i];
                  } else if (textgeprüft === 'speichertext') {
                     speichern = knöpfe[i];
                  } else if (textgeprüft === 'akzeptiertext') {
                     akzeptieren = knöpfe[i];
                  }
               }
               if (cookieeinstellung === 'funktional') {
                  const checkboxentext = realcookiebannerpro.querySelectorAll('fieldset > span > label > span, div[id^="bnnr-body-"] > div[style="margin-top: 10px; clear: both;"] > div > div > span');
                  for (let i = 0; i < checkboxentext.length; i++) {
                     if (knöpfetextcheck(checkboxentext[i]) === 'funktionaltext') {
                        let checkbox = checkboxentext[i].parentElement;
                        if (checkbox) {
                           checkbox = checkbox.querySelector('fieldset input[type="checkbox"]:not([disabled], :checked), div[style*="color: rgb(240, 240, 240);"]');
                        }
                        if (checkbox && checkbox.checkVisibility()) {
                           checkbox.click();
                        }
                     }
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // waconcookiemanagement
            const waconcookiemanagement = document.querySelector('.waconcookiemanagement-cookiebar, [class^="waconcookiemanagement"]:not(.firsthidden, [style="display: none;"])');
            if (waconcookiemanagement && document.cookie.includes('waconcookiemanagement') === false) {
               console.log('[Cookie auto decline] Detected: waconcookiemanagement');
               cookiebannerstatus.anbieter = 'waconcookiemanagement';
               ablehnen = waconcookiemanagement.querySelector('a#data-cookie-refuse, span.cookie-refuse');
               speichern = document.querySelector('.waconcookiemanagement:not([style="display: none;"]) p.cookie-save');
               einstellungen = waconcookiemanagement.querySelector('p.cookie-management');
               if (cookieeinstellung === 'funktional') {
                  const switchh = waconcookiemanagement.querySelector('.cookiecat-e.cookie-off');
                  if (switchh && switchh.checkVisibility()) {
                     switchh.click();
                  }
               }
               akzeptieren = waconcookiemanagement.querySelector('p.cookie-accept, a[data-cookie-accept], span.cookie-accept:not(:has(> a[data-cookie-accept]))');
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // onetrust.com
            const onetrust = document.querySelector('#onetrust-consent-sdk:has(> * > *), #onetrust-cookie-popup');
            if (onetrust) {
               console.log('[Cookie auto decline] Detected: onetrust.com');
               cookiebannerstatus.anbieter = 'onetrust.com';
               nureinklickeinstellungen = true;
               ablehnen = document.querySelector('#onetrust-banner-sdk #onetrust-button-group button#onetrust-reject-all-handler, #cookie-disclosure button#cookie-disclosure-reject');
               einstellungen = document.querySelector('#onetrust-banner-sdk #onetrust-button-group button#onetrust-pc-btn-handler, button#cookie-onetrust-show-info');
               speichern = document.querySelector('button.save-preference-btn-handler');
               akzeptieren = document.querySelector('#onetrust-accept-btn-handler, [onclick="OneTrust.AllowAll()"], button#cookie-onetrust-accept-all');
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const boxen = document.querySelectorAll('#onetrust-consent-sdk :is(.category-menu-switch-handler, .accordion-text.category-item)');
                  for (let i = 0; i < boxen.length; i++) {
                     if (knöpfetextcheck(boxen[i]) === 'funktionaltext' && boxen[i].checkVisibility()) {
                        boxen[i].click();
                     }
                  }
                  let beschreibungen = onetrust.querySelectorAll('[class]:has(> h4[id^="ot-"])');
                  if (beschreibungen.length === 0) {
                     beschreibungen = document.querySelectorAll('#onetrust-consent-sdk .ot-grp-hdr1:has(> .ot-cat-header)');
                  }
                  for (let i = 0; i < beschreibungen.length; i++) {
                     if (knöpfetextcheck(beschreibungen[i]) === 'funktionaltext') {
                        const switchh = beschreibungen[i].querySelector('input.category-switch-handler[type="checkbox"]:not([disabled], :checked)');
                        if (switchh && switchh.checkVisibility()) {
                           switchh.click();
                        }
                     }
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // https://wordpress.org/plugins/complianz-gdpr
            const complianzgdpr = document.querySelector('body > #cmplz-cookiebanner-container');
            if (complianzgdpr && document.cookie.includes('cmplz_functional') === false) {
               console.log('[Cookie auto decline] https://wordpress.org/plugins/complianz-gdpr');
               cookiebannerstatus.anbieter = 'https://wordpress.org/plugins/complianz-gdpr';
               advancedrun = false;
               ablehnen = complianzgdpr.querySelector('.cmplz-buttons > button.cmplz-deny');
               einstellungen = complianzgdpr.querySelector('button.cmplz-view-preferences');
               speichern = complianzgdpr.querySelector('.cmplz-buttons > button.cmplz-save-preferences');
               akzeptieren = complianzgdpr.querySelector('button.cmplz-accept');
               if (cookieeinstellung === 'funktional') {
                  const switchh = complianzgdpr.querySelector('input[data-category="cmplz_preferences"][type="checkbox"]:not([disabled], :checked)');
                  if (switchh && switchh.checkVisibility()) {
                     switchh.click();
                  }
                  const einstellungsurlknopf = complianzgdpr.querySelector('a.cmplz-manage-options[href^="http"][data-relative_url="#cmplz-manage-consent-container"]');
                  if (einstellungsurlknopf) {
                     cookiebannerstatus.knopfstatus = 'gespeichert';
                     document.cookie = 'cmplz_banner-status=dismissed;' + nc;
                     document.cookie = 'cmplz_functional=allow;' + nc;
                     document.cookie = 'cmplz_preferences=allow;' + nc;
                     document.cookie = 'cmplz_marketing=deny;' + nc;
                     document.cookie = 'cmplz_statistics=deny;' + nc;
                     document.cookie = 'cmplz_saved_categories=["preferences","functional"];' + nc;
                     beenden();
                     window.location.reload();
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // borlabs.io
            const borlabs = document.querySelector('#BorlabsCookieBox:not(:empty), div[class="rbrl-overlay rbrl-dialog-holder"]:not([style="display: none;"]), .rbrl-settings-holder');
            if (borlabs && document.cookie.includes('essential%22%3A%5B%22borlabs-cookie') === false) {
               nureinklickeinstellungen = true;
               findconsentintervalzahl = 802;
               findconsentintervalzahländern();
               console.log('[Cookie auto decline] Detected: borlabs.io');
               cookiebannerstatus.anbieter = 'borlabs.io';
               ablehnen = borlabs.querySelector('button.brlbs-btn-accept-only-essential, .rbrl-accept-essential');
               einstellungen = borlabs.querySelector('button#CookieBoxPreferencesButton, button.rbrl-open-settings, .cookie-box > .container:not([style="height: 0px; opacity: 0;"]) a[role="button"][data-borlabs-cookie-actions="preferences"]');
               speichern = borlabs.querySelector('button#CookieBoxSaveButton, button.rbrl-save-settings, .not-visible[style*="opacity: 1;"] a#CookiePrefSave[role="button"][data-borlabs-cookie-actions="save"]');
               akzeptieren = borlabs.querySelector('button.brlbs-btn-accept-all, button.rbrl-accept-all, a._brlbs-btn-accept-all');
               if (cookieeinstellung === 'funktional') {
                  advancedrun = false;
                  const switchh = borlabs.querySelector('input[type="checkbox"]:not([disabled], :checked):is(#external-media, #preferences-service-group-external-media)');
                  if (switchh) {
                     switchh.click();
                  }
                  const tcfswitches = borlabs.querySelectorAll('input[id^="tcf-purpose-"][type="checkbox"]:not([disabled], :checked)');
                  for (let i = 0; i < tcfswitches.length; i++) {
                     if (knöpfetextcheck(tcfswitches[i]) === 'funktionaltext') {
                        tcfswitches[i].click();
                     }
                  }
                  const tcfswitches2 = borlabs.querySelectorAll('#BorlabsCookieTabPurposes [data-borlabs-cookie-iabtcf] label:has(> span.sr-only + input[type="checkbox"])');
                  for (let i = 0; i < tcfswitches2.length; i++) {
                     if (knöpfetextcheck(tcfswitches2[i]) === 'funktionaltext') {
                        const switchh2 = tcfswitches2[i].querySelector('input[type="checkbox"][data-borlabs-cookie-switch]:not([disabled], :checked)');
                        if (switchh2) {
                           switchh2.click();
                        }
                     }
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // osano.com
            const osano = document.querySelector('.osano-cm-window__dialog:not(.osano-cm-dialog--hidden), .osano-cm-window__info-dialog:not([aria-hidden="true"])');
            if (osano && document.cookie.includes('osano_') === false) {
               console.log('[Cookie auto decline] Detected: osano.com');
               cookiebannerstatus.anbieter = 'osano.com';
               ablehnen = osano.querySelector('button.osano-cm-denyAll');
               einstellungen = osano.querySelector('.osano-cm-manage');
               speichern = osano.querySelector('button.osano-cm-save');
               akzeptieren = osano.querySelector('button.osano-cm-accept-all');
               if (cookieeinstellung === 'funktional') {
                  const funktionalswitches = osano.querySelectorAll('input[type="checkbox"]:not([disabled], :checked):is(#osano-cm-dialog-toggle--category_STORAGE, #osano-cm-dialog-toggle--category_PERSONALIZATION, #osano-cm-drawer-toggle--category_PERSONALIZATION)');
                  for (let i = 0; i < funktionalswitches.length; i++) {
                     funktionalswitches[i].click();
                  }
                  const nonfunktionalswitches = osano.querySelectorAll('input[type="checkbox"]:not([disabled]):checked:is(#osano-cm-dialog-toggle--category_MARKETING, #osano-cm-dialog-toggle--category_ANALYTICS)');
                  for (let i = 0; i < nonfunktionalswitches.length; i++) {
                     nonfunktionalswitches[i].click();
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // didomi.io
            const didomi = document.querySelector('#didomi-host');
            if (didomi) {
               let didomieinstellungenignorieren = false;
               console.log('[Cookie auto decline] Detected: didomi.io');
               cookiebannerstatus.anbieter = 'didomi.io';
               nureinklickeinstellungen = true;
               advancedrun = false;
               const ablehnenknopf = didomi.querySelector('#didomi-notice-disagree-button, button#ue-disagree-notice-button, .didomi-continue-without-agreeing[role="button"]');
               if (ablehnenknopf) {
                  const c = ablehnenknopf;
                  if (!paybuttons(c)) {
                     ablehnen = ablehnenknopf;
                  } else {
                     didomieinstellungenignorieren = true;
                  }
               }
               if (didomieinstellungenignorieren === false && domainohnewww !== 'nicematin.com') {
                  einstellungen = didomi.querySelector('button#didomi-notice-learn-more-button');
               }
               if (bereitsgeklickt === true) {
                  switchesdelay++;
                  const boxen = didomi.querySelectorAll('.didomi-consent-popup-container-click-all + .didomi-consent-popup-categories [class]:has(> .didomi-components-accordion)');
                  for (let i = 0; i < boxen.length; i++) {
                     const schalterannehmen = boxen[i].querySelector('.didomi-components-radio > button:first-child + button.didomi-components-radio__option--unselected:not([disabled])');
                     const schalterablehnen = boxen[i].querySelector('.didomi-components-radio > button:first-child.didomi-components-radio__option--unselected:not([disabled])');
                     const switchess = boxen[i].querySelector('input[type="checkbox"]:not([disabled], :checked)');
                     if (cookieeinstellung === 'funktional') {
                        const boxtext = boxen[i].querySelector('span[id^="didomi-purpose-"]');
                        if (boxtext) {
                           const b = boxtext;
                           if (knöpfetextcheck(b) === 'funktionaltext') {
                              if (switchess) {
                                 switchess.click();
                              }
                              if (schalterannehmen && schalterannehmen.checkVisibility()) {
                                 schalterannehmen.click();
                              }
                           } else {
                              if (schalterablehnen) {
                                 if (schalterablehnen.checkVisibility()) {
                                    schalterablehnen.click();
                                 } else if (schalterannehmen && schalterannehmen.checkVisibility()) {
                                    schalterannehmen.click();
                                 }
                              }
                           }
                        }
                     } else {
                        if (schalterablehnen) {
                           if (schalterablehnen.checkVisibility()) {
                              schalterablehnen.click();
                           } else if (schalterannehmen && schalterannehmen.checkVisibility()) {
                              schalterannehmen.click();
                           }
                        }
                     }
                  }
               } else {
                  const akzeptierenselektor = didomi.querySelectorAll('button#didomi-notice-agree-button, button#ue-accept-notice-button');
                  for (let i = 0; i < akzeptierenselektor.length; i++) {
                     const c = akzeptierenselektor[i];
                     if (akzeptierenselektor[i].checkVisibility() && paybuttons(c) !== true) {
                        akzeptieren = akzeptierenselektor[i];
                     }
                  }
                  const didomioeffnen = didomi.querySelector('button.didomi-see-more-button');
                  if (didomioeffnen && didomioeffnen.checkVisibility()) {
                     didomioeffnen.click();
                  }
               }
               speichern = didomi.querySelector('button#btn-toggle-save:not([disabled])');
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // quantcast.com
            const quantcast = document.querySelector('script[src^="https://cmp.quantcast.com/tcfv"], #qc-cmp2-container.qc-cmp2-container');
            if (quantcast && document.cookie.includes('addtl_consent') === false) {
               console.log('[Cookie auto decline] Detected: quantcast.com');
               cookiebannerstatus.anbieter = 'quantcast.com';
               advancedrun = false;
               ablehnen = document.querySelector('#qc-cmp2-container .qc-cmp2-summary-buttons > button + button[mode="secondary"]');
               einstellungen = document.querySelector('#qc-cmp2-container .qc-cmp2-summary-buttons > button[mode="secondary"]');
               speichern = document.querySelector('#qc-cmp2-container div[class^="qc-cmp2-buttons-"] > button[aria-pressed="false"][mode="primary"]');
               akzeptieren = document.querySelector('#qc-cmp2-container .qc-cmp2-summary-buttons > button#accept-btn');
               if (speichern && !speichern.checkVisibility()) {
                  speichern = document.querySelector('#qc-cmp2-container .qc-cmp2-footer > button#save-and-exit');
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // iubenda.com
            const iubenda = document.querySelector('#iubenda-cs-banner');
            if (iubenda && document.cookie.includes('%7B%22timestamp%22%') === false) {
               console.log('[Cookie auto decline] Detected: iubenda.com');
               cookiebannerstatus.anbieter = 'iubenda.com';
               advancedrun = false;
               nureinklickeinstellungen = true;
               findconsentintervalzahl = 502;
               findconsentintervalzahländern();
               ablehnen = iubenda.querySelector('button.iubenda-cs-reject-btn');
               speichern = document.querySelector('#iubenda-iframe button#iubFooterBtn');
               akzeptieren = iubenda.querySelector('button.iubenda-cs-accept-btn');
               const c = iubenda.querySelector('button.iubenda-cs-close-btn');
               if (!iubenda.querySelector('button.app-btn-subscribe') && !paybuttons(c)) {
                  einstellungen = iubenda.querySelector('button.iubenda-cs-customize-btn');
               }
               if (cookieeinstellung === 'funktional') {
                  const boxen = document.querySelectorAll('#iubenda-iframe [class^="purposes-item purpose-item-"]');
                  for (let i = 0; i < boxen.length; i++) {
                     if (knöpfetextcheck(boxen[i]) === 'funktionaltext') {
                        const switchh = boxen[i].querySelector('input[type="checkbox"]:not([disabled], :checked)');
                        if (switchh && switchh.checkVisibility()) {
                           switchh.click();
                        }
                     }
                  }
                  const trackingswitches = document.querySelectorAll('#iubenda-iframe [class="purposes-section uspr-section"] input[type="checkbox"]:checked:not([disabled])');
                  for (let i = 0; i < trackingswitches.length; i++) {
                     trackingswitches[i].click();
                  }
                  if (document.querySelector('#iubenda-iframe')) {
                     akzeptieren = undefined;
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // shopify
            const shopify = document.querySelector('section#shopify-pc__banner[aria-labelledby][style="display: block;"]');
            if (shopify && document.cookie.includes('%7B%22purposes%22%3A%7B%22p%22%3Atrue') === false) {
               console.log('[Cookie auto decline] Detected: shopify cookie banner');
               cookiebannerstatus.anbieter = 'shopify cookie banner';
               nureinklickeinstellungen = true;
               ablehnen = shopify.querySelector('.shopify-pc__banner__btns-granular #shopify-pc__banner__btn-decline');
               einstellungen = shopify.querySelector('#shopify-pc__banner__btn-manage-prefs');
               akzeptieren = shopify.querySelector('.shopify-pc__banner__btns-granular #shopify-pc__banner__btn-accept');
               const speicherbuttons = document.querySelectorAll('#shopify-pc__prefs__dialog button#shopify-pc__prefs__header-save, #shopify-pc__prefs button#shopify-pc__prefs__header-decline');
               for (let i = 0; i < speicherbuttons.length; i++) {
                  const a = speicherbuttons[i];
                  if (sichtbarkeitsprüfung(a)) {
                     speichern = a;
                     break;
                  }
               }
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const switchh = document.querySelector('#shopify-pc__prefs input[type="checkbox"]#shopify-pc__prefs__preferences-input:not([disabled], :checked)');
                  if (switchh && switchh.checkVisibility()) {
                     switchh.click();
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // shopify2
            const shopify2 = document.querySelector('div[id^="shopify-section-sections"] > cookie-banner');
            if (shopify2) {
               console.log('[Cookie auto decline] Detected: shopify cookie banner 2');
               cookiebannerstatus.anbieter = 'shopify2 cookie banner';
               ablehnen = shopify2.querySelector('button[name="decline"]');
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // fastcmp.com
            const fastcmp = document.querySelector('script[src^="https://static.fastcmp.com/"]');
            if (fastcmp && document.cookie.includes('fastCMP-addtlConsent') === false) {
               console.log('[Cookie auto decline] Detected: fastcmp.com');
               cookiebannerstatus.anbieter = 'fastcmp.com';
               advancedrun = false;
               const check = document.querySelector('iframe#fast-cmp-iframe');
               if (check) {
                  const ablehnenbuttons = check.contentWindow.document.querySelectorAll('.fast-cmp-home-refuse > button.fast-cmp-button-secondary');
                  for (let i = 0; i < ablehnenbuttons.length; i++) {
                     if (ablehnenbuttons[i].checkVisibility()) {
                        ablehnen = ablehnenbuttons[i];
                     }
                  }
                  if (cookieeinstellung === 'funktional') {
                     einstellungen = check.contentWindow.document.querySelector('button.fast-cmp-navigation-button');
                     speichern = check.contentWindow.document.querySelector('button.fast-cmp-button-primary[value="save"]');
                     const boxen = check.contentWindow.document.querySelectorAll('.fast-cmp-consent-box');
                     for (let i = 0; i < boxen.length; i++) {
                        const b = boxen[i].querySelector('strong');
                        if (knöpfetextcheck(b) === 'funktionaltext') {
                           const switchh = boxen[i].querySelector('input[type="checkbox"]:not([disabled], :checked)');
                           if (switchh && switchh.checkVisibility()) {
                              switchh.click();
                           }
                        } else {
                           const trackingswitch = boxen[i].querySelector('input[type="checkbox"][name="purposeLegitimateInterests"]:checked:not([disabled])');
                           if (trackingswitch && trackingswitch.checkVisibility()) {
                              trackingswitch.click();
                           }
                        }
                     }
                  }
                  akzeptieren = check.contentWindow.document.querySelector('button.fast-cmp-button-primary[value="all"]');
                  klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
               }
            }

            // hu-manity.co
            const humanity = document.querySelector('#cookie-notice[class*="cn-"][role][style*="color:"]');
            if (humanity && document.cookie.includes('cookie_notice_accepted') === false) {
               console.log('[Cookie auto decline] Detected: hu-manity.co');
               cookiebannerstatus.anbieter = 'hu-manity.co';
               ablehnen = humanity.querySelector('a#cn-refuse-cookie');
               schließen = humanity.querySelector('#cn-close-notice');
               akzeptieren = humanity.querySelector('#cn-accept-cookie');
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // cookie-law-info-bar
            const cookielawinfobar = document.querySelector('#cookie-law-info-bar[style]');
            if (cookielawinfobar && document.cookie.includes('viewed_cookie_policy') === false) {
               console.log('[Cookie auto decline] Detected: cookie-law-info-bar');
               cookiebannerstatus.anbieter = 'cookie-law-info-bar';
               nureinklickeinstellungen = true;
               ablehnen = cookielawinfobar.querySelector('a#wt-cli-reject-btn');
               einstellungen = cookielawinfobar.querySelector('a.cli_settings_button[role="button"]');
               speichern = document.querySelector('#cliSettingsPopup a#wt-cli-privacy-save-btn');
               if (bereitsgeklickt === false) {
                  akzeptieren = cookielawinfobar.querySelector('a#wt-cli-accept-all-btn, a#cookie_action_close_header');
               }
               let switches = document.querySelectorAll('#cliSettingsPopup input[type="checkbox"]:checked:not(#wt-cli-checkbox-necessary, [disabled])');
               if (cookieeinstellung === 'funktional') {
                  switches = document.querySelectorAll('#cliSettingsPopup input[type="checkbox"]:checked:not(#wt-cli-checkbox-others, #wt-cli-checkbox-functional, #wt-cli-checkbox-necessary, [disabled])');
                  const switchh = document.querySelector('#cliSettingsPopup input[type="checkbox"]:is(#wt-cli-checkbox-others, #wt-cli-checkbox-functional):not([disabled], :checked)');
                  if (switchh) {
                     switchh.click();
                  }
               }
               for (let i = 0; i < switches.length; i++) {
                  switches[i].click();
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // cookiefirst.com
            const cookiefirst = document.querySelector('.cookiefirst-root');
            if (cookiefirst && document.cookie.includes('cookiefirst-consent') === false) {
               console.log('[Cookie auto decline] Detected: cookiefirst.com');
               cookiebannerstatus.anbieter = 'cookiefirst.com';
               nureinklickeinstellungen = true;
               ablehnen = document.querySelector('.cookiefirst-root button[data-cookiefirst-action="reject"][type="button"], [aria-labelledby="cookie-preference-panel-title"] button[data-cookiefirst-action="reject_second"]');
               einstellungen = cookiefirst.querySelector('button[data-cookiefirst-action="adjust"][type="button"]');
               akzeptieren = cookiefirst.querySelector('button[data-cookiefirst-action="accept"][type="button"]');
               const speicherknöpfe = document.querySelectorAll('.cookiefirst-root button[data-cookiefirst-action="save"][type="button"]');
               for (let i = 0; i < speicherknöpfe.length; i++) {
                  if (speicherknöpfe[i].checkVisibility()) {
                     speichern = speicherknöpfe[i];
                  }
               }
               const switches = document.querySelectorAll('.cookiefirst-root button[role="checkbox"][aria-checked="true"]:not([disabled], [rtayztwplpnfftousydd])');
               for (let i = 0; i < switches.length; i++) {
                  switches[i].click();
               }
               if (cookieeinstellung === 'funktional') {
                  const switches = document.querySelectorAll('.cookiefirst-root button[role="checkbox"][aria-checked="false"]:not([disabled])');
                  for (let i = 0; i < switches.length; i++) {
                     const b = switches[i].getAttribute('aria-label');
                     if (knöpfetextcheck(b) === 'funktionaltext') {
                        switches[i].setAttribute('rtayztwplpnfftousydd', 'a');
                        switches[i].click();
                     }
                  }
               }
               switchesdelay++;
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // cookieconsent:desc
            const cookieconsentdesc = document.querySelector('div[aria-describedby="cookieconsent:desc"][class*="cc-"]');
            if (cookieconsentdesc && cookieconsentdesc.offsetWidth > 1 && document.cookie.includes('cookieconsent_status') === false) {
               console.log('[Cookie auto decline] Detected: cookieconsent:desc');
               cookiebannerstatus.anbieter = 'cookieconsent:desc';
               advancedrun = false;
               nureinklickeinstellungen = true;
               ablehnen = cookieconsentdesc.querySelector('a[aria-labelledby="cc-deny-01"], .cc-deny, .cc-dismiss, .cc-dialog-button-decline, .reject-all-btn');
               speichern = cookieconsentdesc.querySelector('a[data-action="save-cc"], button.cc-save, [aria-label*="speichern"], [aria-label*="save"], button[class="cc-btn cc-allow"], .cc-savesettings');
               einstellungen = cookieconsentdesc.querySelector('[aria-label="Einstellungen"], [aria-label="settings cookies"], .cc-settings');
               const einstellungsmenu = document.querySelector('div[aria-describedby="cookieconsent:desc"][class*="cc-window"] + #pd-cp-preferences, div[aria-describedby="cookieconsent:desc"][class*="cc-window"] + div > div[id="cookieconsent:settings"]');
               schließen = cookieconsentdesc.querySelector('a[aria-label="dismiss cookie message"]');
               akzeptieren = cookieconsentdesc.querySelector('a[aria-label="allow cookies"], a.cc-allowall, a.cc-allow');
               if (einstellungsmenu && einstellungsmenu.offsetHeight >= 1) {
                  beenden();
                  window.setTimeout(function () {
                     const checkboxen = einstellungsmenu.querySelectorAll('input#analytics-cookies-checkbox:checked, input#marketing-cookies-checkbox:checked');
                     const speichernuntermenu = einstellungsmenu.querySelector('button[aria-label="Ausgewählte Akzeptieren"], button[aria-label="Einstellungen speichern"], [onclick*="savePreferences"]');
                     if (checkboxen.length > 0) {
                        for (let i = 0; i < checkboxen.length; i++) {
                           checkboxen[i].click();
                        }
                        window.setTimeout(function () {
                           speichernuntermenu.click();
                        }, 202);
                     } else {
                        speichernuntermenu.click();
                     }
                  }, 202);
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // oveleon.de (cookiebar-desc)
            const oveleon = document.querySelector('div[aria-describedby="cookiebar-desc"].contao-cookiebar, div[aria-describedby="cookiebar-desc"]#cookiebar');
            if (oveleon && (window.localStorage.getItem('ccb_contao_token_1') === null || (window.localStorage.getItem('ccb_contao_token_1') && window.localStorage.getItem('ccb_contao_token_1').includes('"saved":-1') === true))) {
               console.log('[Cookie auto decline] Detected: oveleon.de (cookiebar-desc)');
               cookiebannerstatus.anbieter = 'oveleon.de (cookiebar-desc)';
               advancedrun = false;
               ablehnen = oveleon.querySelector('button[data-deny-all]');
               speichern = oveleon.querySelector('button[data-save]');
               akzeptieren = oveleon.querySelector('button[data-accept-all]');
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const boxen = oveleon.querySelectorAll('.cc-group:has(input[type="checkbox"][data-toggle-cookies]:not([disabled], :checked))');
                  for (let i = 0; i < boxen.length; i++) {
                     const d = boxen[i].innerText.toLowerCase();
                     if (!marketingtrackingg(d)) {
                        const switchh = boxen[i].querySelector('input[type="checkbox"][data-toggle-cookies]:not([disabled], :checked)');
                        if (switchh && switchh.checkVisibility()) {
                           switchh.click();
                        }
                     }
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // as-oil-content-overlay
            const asoilcontentoverlay = document.querySelector('.as-oil-content-overlay[data-qa]');
            if (asoilcontentoverlay) {
               console.log('[Cookie auto decline] Detected: as-oil-content-overlay (modified-shop.org)');
               cookiebannerstatus.anbieter = 'as-oil-content-overlay (modified-shop.org)';
               advancedrun = false;
               ablehnen = asoilcontentoverlay.querySelector('button.as-js-only-essentials[data-qa="oil-only-essentials-button"]');
               einstellungen = asoilcontentoverlay.querySelector('button.as-js-advanced-settings[data-qa="oil-AdvancedSettingsButton"]');
               speichern = asoilcontentoverlay.querySelector('button.as-js-optin');
               akzeptieren = asoilcontentoverlay.querySelector('button[data-qa="oil-YesButton"]');
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const boxen = asoilcontentoverlay.querySelectorAll('.as-oil-cpc__category-container, .Purpose__Heading');
                  for (let i = 0; i < boxen.length; i++) {
                     const b = boxen[i].querySelector('.as-oil-cpc__category-header, .as-oil-cpc__purpose-header-text');
                     if (knöpfetextcheck(b) === 'funktionaltext') {
                        const switchh = boxen[i].querySelector('input[type="checkbox"]:not([disabled], :checked)');
                        if (switchh) {
                           switchh.click();
                        }
                     }
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // mnd-cookie-modal
            const mndcookiemodal = document.querySelector('.mnd-cookie-modal');
            if (mndcookiemodal && document.cookie.includes('mnd-cookie-accepted-') === false) {
               console.log('[Cookie auto decline] Detected: mnd-cookie-modal');
               cookiebannerstatus.anbieter = 'mnd-cookie-modal';
               advancedrun = false;
               ablehnen = mndcookiemodal.querySelector('button.btn-accept-functional');
               einstellungen = mndcookiemodal.querySelector('button.btn-privacy-settings');
               speichern = mndcookiemodal.querySelector('button.mnd-privacy-settings-save');
               akzeptieren = mndcookiemodal.querySelector('button[onclick="mndCookieNotice.mndCloseOverlay();"]');
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // page-wrap--cookie-permission
            let pagewrapcookiepermission = document.querySelector('.page-wrap--cookie-permission[data-cookie-permission="true"][data-urlprefix][data-title]:not(.is--hidden)');
            if (!pagewrapcookiepermission) {
               pagewrapcookiepermission = document.querySelector('#cookie-consent[data-cookie-consent-manager="true"]');
            }
            if (pagewrapcookiepermission && document.cookie.includes('cookiePreferences') === false) {
               console.log('[Cookie auto decline] Detected: page-wrap--cookie-permission');
               cookiebannerstatus.anbieter = 'page-wrap--cookie-permission';
               advancedrun = false;
               nureinklickeinstellungen = true;
               akzeptieren = pagewrapcookiepermission.querySelector('.cookie-permission--accept-button');
               einstellungen = pagewrapcookiepermission.querySelector('.cookie-permission--configure-button');
               speichern = pagewrapcookiepermission.querySelector('.cookie-consent--save-button');
               ablehnen = pagewrapcookiepermission.querySelector('.cookie-permission--decline-button');
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const switchh = pagewrapcookiepermission.querySelector('input[type="checkbox"][name="comfort-state"]:not([disabled], :checked)');
                  if (switchh) {
                     switchh.click();
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // idxrcookies
            const idxrcookiesdocument = document.getElementById('idxrcookies');
            if (idxrcookiesdocument && document.cookie.includes('deluxecookiesWarningCheck') === false) {
               console.log('[Cookie auto decline] Detected: idxrcookies');
               cookiebannerstatus.anbieter = 'idxrcookies';
               ablehnen = idxrcookiesdocument.querySelector('a#idxrcookiesKO');
               speichern = document.querySelector('#cookieModal a#js-save-cookieconf');
               akzeptieren = idxrcookiesdocument.querySelector('a#idxrcookiesOK');
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // comply-consent-manager
            const complyconsentmanager = document.querySelector('comply-consent-manager .comply-Menu');
            if (complyconsentmanager) {
               console.log('[Cookie auto decline] Detected: comply-consent-manager');
               cookiebannerstatus.anbieter = 'comply-consent-manager';
               const ablehnenspeichern = complyconsentmanager.querySelectorAll('button.comply-SaveSettingsButton');
               for (let i = 0; i < ablehnenspeichern.length; i++) {
                  if (knöpfetextcheck(ablehnenspeichern[i]) === 'ablehntext') {
                     ablehnen = ablehnenspeichern[i];
                  } else {
                     speichern = ablehnenspeichern[i];
                  }
               }
               akzeptieren = complyconsentmanager.querySelector('button.comply-AcceptAllButton');
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const boxen = complyconsentmanager.querySelectorAll('.comply-Row');
                  for (let i = 0; i < boxen.length; i++) {
                     if (knöpfetextcheck(boxen[i]) === 'funktionaltext') {
                        const switchh = boxen[i].querySelector('.comply-ToggleWrapper[role="checkbox"][aria-checked="false"]');
                        if (switchh) {
                           switchh.click();
                        }
                     }

                  }

               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // ccc-overlay
            const cccoverlay = document.querySelector('#ccc[style]');
            if (cccoverlay) {
               console.log('[Cookie auto decline] Detected: ccc-overlay');
               cookiebannerstatus.anbieter = 'ccc-overlay';
               ablehnen = cccoverlay.querySelector('#ccc-content button#ccc-reject-settings');
               schließen = cccoverlay.querySelector('button#ccc-notify-dismiss, button#ccc-close');
               einstellungen = cccoverlay.querySelector('#ccc-notify button[class="ccc-notify-button ccc-link ccc-tabbable ccc-notify-link"]');
               speichern = cccoverlay.querySelector('#cc-panel button#ccc-dismiss-button');
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // ccm19.de
            const ccm19de = document.querySelector('.ccm-root > #ccm-widget');
            if (ccm19de && localStorage.getItem('ccm_consent') === null) {
               console.log('[Cookie auto decline] Detected: ccm19.de');
               cookiebannerstatus.anbieter = 'ccm19.de';
               nureinklickeinstellungen = true;
               ablehnen = ccm19de.querySelector('#ccm-widget button.ccm--decline-cookies[type="button"]');
               einstellungen = ccm19de.querySelector('button[data-ccm-modal="ccm-control-panel"]');
               speichern = document.querySelector('#ccm-control-panel button.ccm--decline-cookies[type="button"], #ccm-control-panel button.ccm--save-settings[type="button"]');
               akzeptieren = ccm19de.querySelector('#ccm-widget button.ccm--save-settings[data-full-consent="true"]');
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const boxen = document.querySelectorAll('#ccm-control-panel .ccm-control-panel--purpose');
                  for (let i = 0; i < boxen.length; i++) {
                     const b = boxen[i].querySelector('span[id^="ccm-control-panel--name"]');
                     if (knöpfetextcheck(b) === 'funktionaltext') {
                        const switchh = boxen[i].querySelector('input[type="checkbox"]:not([disabled], :checked)');
                        if (switchh && switchh.checkVisibility()) {
                           switchh.click();
                        }
                     }
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
               // "[CCM19] Manipulated click on consent button detected and ignored." warning in console on a few sites. Trying another way to get the cookie banner away. The values inside "embeddings" are randomized for each site so it can’t be globally set to support specific cookie settings.
               if (!bereitsgeklickt2) {
                  bereitsgeklickt2 = true;
                  window.setTimeout(function () {
                     if (document.querySelector('.ccm-root > #ccm-widget:not([style="display: none;"])')) {
                        const zahl = Math.ceil(Math.random() * 10000000000000);
                        const cookieroh = '{"/":{"gen":2,"ucid":"' + zahl + '","consent":true,"embeddings":[],"created":' + cookiezeit + ',"updated":' + cookiezeit + ',"clickedButton":"decline","iframeConsentDomains":[],"tcf":{"p":[],"lip":[],"sf":[],"v":[],"liv":[],"gad":[],"gadAll":[]},"lang":"de_DE"}}';
                        const cookiebase64 = window.btoa(cookieroh);
                        window.localStorage.setItem('ccm_consent', cookieroh);
                        document.cookie = 'ccm_consent=' + cookiebase64 + ';' + nc;
                        beenden();
                        window.location.reload();
                     }
                  }, 1302);
               }
            }

            // https://github.com/orestbida/cookieconsent
            const orestbida = document.querySelector('#cc--main[style], #cc-main');
            if (orestbida && document.cookie.includes('cc_cookie') === false) {
               console.log('[Cookie auto decline] Detected: https://github.com/orestbida/cookieconsent');
               cookiebannerstatus.anbieter = 'https://github.com/orestbida/cookieconsent';
               advancedrun = false;
               nureinklickeinstellungen = true;
               const knöpfe = orestbida.querySelectorAll('button:not([aria-expanded], [aria-controls])');
               for (let i = 0; i < knöpfe.length; i++) {
                  const textgeprüft = knöpfetextcheck(knöpfe[i]);
                  if (textgeprüft === 'ablehntext') {
                     ablehnen = knöpfe[i];
                  } else if (textgeprüft === 'speichertext') {
                     speichern = knöpfe[i];
                  } else if (textgeprüft === 'optionstext') {
                     einstellungen = knöpfe[i];
                  } else if (textgeprüft === 'akzeptiertext') {
                     akzeptieren = knöpfe[i];
                  }
               }
               speichern = orestbida.querySelector('button#s-sv-bn, button.pm__btn.pm__btn--secondary[data-role="save"]');
               const checkboxen = orestbida.querySelectorAll('input[type="checkbox"][value]:checked:not([disabled], [rtayztwplpnfftousydd])');
               if (bereitsgeklickt) {
                  switchesdelay++;
               }
               for (let i = 0; i < checkboxen.length; i++) {
                  checkboxen[i].click();
               }
               if (cookieeinstellung === 'funktional') {
                  const boxen = orestbida.querySelectorAll('div[class="c-bl b-ex"], div[class="pm__section--toggle pm__section--expandable"]');
                  for (let i = 0; i < boxen.length; i++) {
                     if (knöpfetextcheck(boxen[i]) === 'funktionaltext') {
                        const checkbox = boxen[i].querySelector('input[type="checkbox"][value]:not([disabled], :checked)');
                        if (checkbox) {
                           checkbox.setAttribute('rtayztwplpnfftousydd', 'a');
                           checkbox.click();
                        }
                     }
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // gdpr.mandarin-medien.de
            const mandarinmedien = document.querySelector('div[class="mmcm-container"]');
            if (mandarinmedien && document.cookie.includes('mmcm-jar-') === false) {
               console.log('[Cookie auto decline] Detected: gdpr.mandarin-medien.de');
               cookiebannerstatus.anbieter = 'gdpr.mandarin-medien.de';
               advancedrun = false;
               akzeptieren = mandarinmedien.querySelector('.mmcm-btn-save-all');
               ablehnen = mandarinmedien.querySelector('.mmcm-actions a.mmcm-btn-decline');
               speichern = mandarinmedien.querySelector('.mmcm-actions a.mmcm-btn-save');
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const boxen = mandarinmedien.querySelectorAll('.mmcm-group');
                  for (let i = 0; i < boxen.length; i++) {
                     if (knöpfetextcheck(boxen[i]) === 'funktionaltext') {
                        const switchh = boxen[i].querySelector('input[type="checkbox"]:not([disabled], :checked)');
                        if (switchh && switchh.checkVisibility()) {
                           switchh.click();
                        }
                     }
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // orejime
            const orejime = document.querySelector('#orejime, .orejime-NoticePortal');
            if (orejime && document.cookie.includes('orejime') === false) {
               console.log('[Cookie auto decline] Detected: orejime');
               cookiebannerstatus.anbieter = 'orejime';
               advancedrun = false;
               nureinklickeinstellungen = true;
               ablehnen = orejime.querySelector('button.orejime-Notice-declineButton');
               einstellungen = orejime.querySelector('button.orejime-Notice-learnMoreButton');
               speichern = orejime.querySelector('button[class="orejime-Button orejime-Button--save orejime-Modal-saveButton"]');
               akzeptieren = orejime.querySelector('button.orejime-Notice-saveButton');
               const alleswitches = orejime.querySelectorAll('li.orejime-AppList-item input[type="checkbox"]:checked:not([disabled], [rtayztwplpnfftousydd])');
               for (let i = 0; i < alleswitches.length; i++) {
                  if (alleswitches[i].checkVisibility()) {
                     alleswitches[i].click();
                  }
               }
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const boxen = orejime.querySelectorAll('li.orejime-AppList-item');
                  for (let i = 0; i < boxen.length; i++) {
                     const b = boxen[i].querySelector('.orejime-AppItem-title');
                     if (knöpfetextcheck(b) === 'funktionaltext') {
                        const switchh = boxen[i].querySelector('input[type="checkbox"]:not([disabled], :checked)');
                        if (switchh && switchh.checkVisibility()) {
                           switchh.setAttribute('rtayztwplpnfftousydd', 'a');
                           switchh.click();
                        }
                     }
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // oax_cookie_consent_modal
            const oaxcookieconsentmodal = document.querySelector('body.oax .oax_cookie_consent_modal');
            if (oaxcookieconsentmodal && document.cookie.includes('_consentCookie') === false) {
               console.log('[Cookie auto decline] Detected: oaxcookieconsentmodal');
               cookiebannerstatus.anbieter = 'oaxcookieconsentmodal';
               ablehnen = oaxcookieconsentmodal.querySelector('button.oax-cookie-consent-select-necessary');
               akzeptieren = oaxcookieconsentmodal.querySelector('button.oax-cookie-consent-select-all');
               if (cookieeinstellung === 'funktional') {
                  document.cookie = '_consentCookie=%7B%22categories%22%3A%5B%22required%22%2C%22comfort%22%5D%7D;' + nc;
                  beenden();
                  window.location.reload();
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // https://www.acris-ecommerce.at/
            const acris = document.querySelector('.acris-cookie-consent[data-acris-cookie-consent="true"][data-acris-cookie-consent-options], #acris--page-wrap--cookie-permission[data-acris-cookie-permission="true"]');
            if (acris && document.cookie.includes('acris_cookie_acc') === false) {
               nureinklickeinstellungen = true;
               findconsentintervalzahl = 802;
               findconsentintervalzahländern();
               console.log('[Cookie auto decline] Detected: https://www.acris-ecommerce.at/');
               cookiebannerstatus.anbieter = 'https://www.acris-ecommerce.at/';
               advancedrun = false;
               ablehnen = acris.querySelector('button#cookie-permission--accept-only-functional-button');
               akzeptieren = acris.querySelector('button#ccConsentAcceptAllButton, button#cookie-permission--accept-all-button');
               if (!acris.querySelector('#ccSettings.show, .acris-cookie-settings--container.is--active')) {
                  einstellungen = acris.querySelector('button#cookie-permission--deny-button, button#ccSettingButton');
               } else {
                  speichern = acris.querySelector('#ccAcceptButton, #cookie-permission--accept-button');
                  switchesdelay += 2;
                  const switches = acris.querySelectorAll('input[type="checkbox"]:checked:not([disabled], [rtayztwplpnfftousydd])');
                  for (let i = 0; i < switches.length; i++) {
                     if (switches[i].checkVisibility()) {
                        switches[i].click();
                     }
                  }
                  if (cookieeinstellung === 'funktional') {
                     const boxen = acris.querySelectorAll('.card.cookie-consent-group, .cookie-setting--group');
                     for (let i = 0; i < boxen.length; i++) {
                        const b = boxen[i].querySelector('.pe-1, .title--name');
                        if (knöpfetextcheck(b) === 'funktionaltext') {
                           const switchh = boxen[i].querySelector('input[type="checkbox"]:not([disabled], :checked)');
                           if (switchh) {
                              switchh.setAttribute('rtayztwplpnfftousydd', 'a');
                              switchh.click();
                           }
                        }
                     }
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // https://www.tramino.de/
            const tramino = document.querySelector('.TraminoConsent.overlay.show');
            if (tramino && document.cookie.includes('Consent') === false) {
               console.log('[Cookie auto decline] Detected: https://www.tramino.de/');
               cookiebannerstatus.anbieter = 'https://www.tramino.de/';
               ablehnen = tramino.querySelector('button[value="acceptConsent"]');
               akzeptieren = tramino.querySelector('button[value="acceptConsentAll"]');
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // amgdpr
            const amgdpr = document.querySelector('.amgdprjs-bar-template, .amgdprcookie-modal-container');
            if (amgdpr && document.cookie.includes('amcookie_allowed') === false) {
               console.log('[Cookie auto decline] Detected: amgdpr');
               cookiebannerstatus.anbieter = 'amgdpr';
               advancedrun = false;
               ablehnen = amgdpr.querySelector('button.-decline:not(:disabled), button.g-c-button-reject:not(:disabled)');
               einstellungen = amgdpr.querySelector('button.-settings:not(:disabled)');
               speichern = document.querySelector(':is([class*="cookie"] button.-save, .amgdprcookie-cookie-settings-modal._show button.amgdprcookie-done):not(:disabled)');
               akzeptieren = amgdpr.querySelector('button[data-amgdprcookie-js="allow"]:not(:disabled), button.g-c-button-accept:not(:disabled)');
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // klaro.org
            const klaro = document.querySelector('div[class^="klaro "]:not(.cm-as-context-notice), div[class="klaro"]');
            if (klaro && document.cookie.includes('klaro') === false) {
               console.log('[Cookie auto decline] Detected: klaro.org');
               cookiebannerstatus.anbieter = 'klaro.org';
               advancedrun = false;
               ablehnen = klaro.querySelector('button.cn-decline');
               einstellungen = klaro.querySelector('a.cn-learn-more[href="#"], a.cm-learn-more[href="#"], button.cm-btn-lern-more');
               speichern = klaro.querySelector('button.cm-btn-accept, button.btn-accept, button.inbtn--primary');
               akzeptieren = klaro.querySelector('button.cm-btn-accept-all, button.cm-btn-success');
               const alleswitches = klaro.querySelectorAll('input[type="checkbox"]:checked:is([id^="purpose-item-"], [id^="app-item-"]):not([disabled], [rtayztwplpnfftousydd], #purpose-item-disableAll)');
               if (alleswitches.length > 0) {
                  switchesdelay++;
               }
               for (let i = 0; i < alleswitches.length; i++) {
                  if (alleswitches[i].checkVisibility()) {
                     alleswitches[i].click();
                  }
               }
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const switches = klaro.querySelectorAll('input[type="checkbox"]:is([id^="purpose-item-"], [id^="app-item-"]):is(#purpose-item-functionality, #purpose-item-comfort, #app-item-googleMaps, #purpose-item-services, #purpose-item-social):not([disabled], :checked, #purpose-item-disableAll)');
                  for (let i = 0; i < switches.length; i++) {
                     if (switches[i].checkVisibility()) {
                        switches[i].setAttribute('rtayztwplpnfftousydd', 'a');
                        switches[i].click();
                     }
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // cookie-note-hide
            const cookienotehide = document.querySelector('div[id="cookie-note"][style="display: block;"].cookie-note');
            if (cookienotehide && document.cookie.includes('ikiss-cookie-note-off') === false) {
               console.log('[Cookie auto decline] Detected: cookie-note-hide (germany)');
               cookiebannerstatus.anbieter = 'cookie-note-hide (germany)';
               ablehnen = cookienotehide.querySelector('button#cookie-note-hide');
               akzeptieren = cookienotehide.querySelector('button#cookie-note-accept');
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // cookie-consent-form__description
            const cookieconsentformdescription = document.querySelector('dialog.cookie-consent-form[aria-labelledby="cookie-consent-form__description"][open]');
            if (cookieconsentformdescription && document.cookie.includes('hide_cn') === false) {
               console.log('[Cookie auto decline] Detected: cookie-consent-form__description (germany)');
               cookiebannerstatus.anbieter = 'cookie-consent-form__description (germany)';
               advancedrun = false;
               switchesdelay++;
               speichern = cookieconsentformdescription.querySelector('button.cookie-consent-form__save-button');
               if (cookieeinstellung === 'ablehnen') {
                  const checkboxen = cookieconsentformdescription.querySelectorAll('input[type="checkbox"]:checked:not([disabled])');
                  for (let i = 0; i < checkboxen.length; i++) {
                     if (checkboxen[i].checkVisibility()) {
                        checkboxen[i].click();
                     }
                  }
               } else if (cookieeinstellung === 'akzeptieren') {
                  const checkboxen = cookieconsentformdescription.querySelectorAll('input[type="checkbox"]:not([disabled], :checked)');
                  for (let i = 0; i < checkboxen.length; i++) {
                     if (checkboxen[i].checkVisibility()) {
                        checkboxen[i].click();
                     }
                  }
               } else {
                  const checkboxen = cookieconsentformdescription.querySelectorAll('input[type="checkbox"]:not([disabled], :checked, [name^="cookie-option-tracking"])');
                  for (let i = 0; i < checkboxen.length; i++) {
                     if (checkboxen[i].checkVisibility()) {
                        checkboxen[i].click();
                     }
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // sgalinski.de
            const sgalinski = document.querySelector('#SgCookieOptin');
            if (sgalinski) {
               console.log('[Cookie auto decline] Detected: sgalinski.de');
               cookiebannerstatus.anbieter = 'sgalinski.de';
               advancedrun = false;
               speichern = sgalinski.querySelector('.sg-cookie-optin-box-button button.sg-cookie-optin-box-button-accept-specific');
               einstellungen = sgalinski.querySelector('.sg-cookie-optin-box:not(:has(> #cookieOpener.sg-cookie-optin-visible)) button[onclick*="cookieOpener"]');
               akzeptieren = sgalinski.querySelector('button.sg-cookie-optin-box-button-accept-all');
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const checkbox = sgalinski.querySelector('input[type="checkbox"]:is([value="iframes"], [value="externemedien"], [value="google_recaptcha"]):not([disabled], :checked)');
                  if (checkbox) {
                     checkbox.click();
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // https://extensions.typo3.org/extension/cookieman
            const cookiemanmodal = document.querySelector('#cookieman-modal[data-cookieman-settings]');
            if (cookiemanmodal) {
               console.log('[Cookie auto decline] Detected: https://extensions.typo3.org/extension/cookieman');
               cookiebannerstatus.anbieter = 'https://extensions.typo3.org/extension/cookieman';
               advancedrun = false;
               nureinklickeinstellungen = true;
               ablehnen = cookiemanmodal.querySelector('button[data-cookieman-accept-none], a.data-cookieman-not-accept');
               einstellungen = cookiemanmodal.querySelector('button[data-mdb-target="#cookieman-settings"].collapsed');
               speichern = cookiemanmodal.querySelector('button[data-cookieman-save]:not([data-cookieman-accept-none], [data-cookieman-accept-all])');
               akzeptieren = cookiemanmodal.querySelector('[data-cookieman-accept-all]');
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const checkbox = cookiemanmodal.querySelector('input[type="checkbox"][name="experience"]:not([disabled], :checked)');
                  if (checkbox) {
                     checkbox.click();
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // cookieyes.com
            const ckyconsent = document.querySelector('.cky-consent-container');
            if (ckyconsent && document.cookie.includes('action:yes,necessary:yes') === false) {
               console.log('[Cookie auto decline] Detected: cookieyes.com');
               cookiebannerstatus.anbieter = 'cookieyes.com';
               ablehnen = ckyconsent.querySelector('button.cky-btn-reject');
               einstellungen = ckyconsent.querySelector('button.cky-btn-customize, button.cky-btn-do-not-sell');
               const checkbox = document.querySelector('.cky-opt-out-wrapper input#ckyCCPAOptOut:not(:checked)');
               if (checkbox && checkbox.checkVisibility()) {
                  checkbox.click();
               }
               speichern = document.querySelector('.cky-preference-center button.cky-btn-preferences, .cky-preference-center .cky-btn-confirm');
               akzeptieren = ckyconsent.querySelector('button.cky-btn-accept');
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const switchh = document.querySelector('.cky-modal input[type="checkbox"]#ckySwitchfunctional:not([disabled], :checked)');
                  if (switchh) {
                     switchh.click();
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // framer
            const framer = document.querySelector('.--framer-cookie-banner-container');
            if (framer && window.localStorage.getItem('framerCookiesDismissed') === null) {
               console.log('[Cookie auto decline] Detected: --framer-cookie-banner-container');
               cookiebannerstatus.anbieter = 'framer.com';
               ablehnen = framer.querySelector('#__framer-cookie-component-button-reject');
               akzeptieren = framer.querySelector('#__framer-cookie-component-button-accept');
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // privacy_optin
            const privacy_optin = document.querySelector('div[id^="privacy_optin_"][class^="mod_privacy_optin"].open');
            if (privacy_optin && window.localStorage.getItem('user_privacy_settings') === null) {
               console.log('[Cookie auto decline] Detected: privacy_optin');
               cookiebannerstatus.anbieter = 'privacy_optin';
               advancedrun = false;
               ablehnen = privacy_optin.querySelector('input[name="save_tech_settings"]');
               speichern = privacy_optin.querySelector('input[name="save_settings"]:not(:disabled)');
               akzeptieren = privacy_optin.querySelector('input[name="save_all_settings"]');
               if (cookieeinstellung === 'funktional') {
                  const boxen = privacy_optin.querySelectorAll('.privacy_item');
                  for (let i = 0; i < boxen.length; i++) {
                     const b = boxen[i].querySelector('.privacy_label');
                     if (knöpfetextcheck(b) === 'funktionaltext') {
                        switchesdelay += 2;
                        const checkbox = boxen[i].querySelector('input[type="checkbox"]:not([disabled], :checked)');
                        if (checkbox && checkbox.checkVisibility()) {
                           checkbox.click();
                        }
                     }
                  }
                  speichern = privacy_optin.querySelector('input[name="save_settings"]:not(:disabled)');
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // tealiumGDPR
            const tealiumGDPR = document.querySelector('div[id^="__tealiumGDPR"]:not(:empty)');
            if (tealiumGDPR) {
               console.log('[Cookie auto decline] Detected: tealiumGDPR');
               cookiebannerstatus.anbieter = 'tealiumGDPR';
               advancedrun = false;
               ablehnen = tealiumGDPR.querySelector(':is(a, button):is([class*="reject"], [id*="reject"], [class*="decline"], [id*="decline"]), a#no_consent, #cm-acceptNone, #consent_wall_optout, #consent_prompt_decline_submit');
               speichern = document.querySelector('#__tealiumGDPRcpPrefs button#save, #__tealiumGDPRcpPrefs #pref_submit, a#preferences_prompt_submit, .g-consentmanager__confirm-selection');
               einstellungen = tealiumGDPR.querySelector('button.js-btn-edit-cookie-settings, a#preferences, button#pref_details, a#consent_prompt_manage--secondary');
               akzeptieren = tealiumGDPR.querySelector('#consent_prompt_submit, #accept, button.btn--primary, .g-consentmanager__confirm-all, #consent_wall_optin, #cm-acceptAll');
               nureinklickeinstellungen = true;
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // avia
            const avia = document.querySelector('.avia-cookie-consent-wrap');
            if (avia) {
               console.log('[Cookie auto decline] Detected: avia');
               cookiebannerstatus.anbieter = 'avia';
               akzeptieren = avia.querySelector('.avia-cookie-consent a[href="#"][class*="avia-cookie-consent-button-"]');
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // cookiebar_optin_219
            const cookiebaroptin219 = document.querySelector('#cookiebar_optin_219.open');
            if (cookiebaroptin219) {
               console.log('[Cookie auto decline] Detected: cookiebar_optin_219');
               cookiebannerstatus.anbieter = 'cookiebar_optin_219';
               ablehnen = cookiebaroptin219.querySelector('.cookiebar_disagree > a[data-privacy]');
               speichern = cookiebaroptin219.querySelector('input[name="save_settings"]:not([disabled])');
               akzeptieren = cookiebaroptin219.querySelector('.cookiebar_agree > a');
               let auswahl;
               if (cookiebaroptin219.querySelector('input[id^="cookiebar_privacy_"][type="radio"]')) {
                  switchesdelay++;
               }
               if (cookieeinstellung === 'ablehnen') {
                  auswahl = cookiebaroptin219.querySelector('input#cookiebar_privacy_1[type="radio"]:not([disabled], :checked)');
               } else if (cookieeinstellung === 'funktional') {
                  auswahl = cookiebaroptin219.querySelector('input#cookiebar_privacy_2[type="radio"]:not([disabled], :checked)');
               } else {
                  auswahl = cookiebaroptin219.querySelector('input#cookiebar_privacy_3[type="radio"]:not([disabled], :checked)');
               }
               if (auswahl && auswahl.checkVisibility()) {
                  auswahl.click();
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // sirdata.com
            const sirdatacom = document.querySelector('#sd-cmp[class^="sd-cmp-"]');
            if (sirdatacom && document.cookie.includes('euconsent-v2') === false) {
               console.log('[Cookie auto decline] Detected: sirdata.com');
               cookiebannerstatus.anbieter = 'sirdata.com';
               const knöpfe = sirdatacom.querySelectorAll('button');
               for (let i = 0; i < knöpfe.length; i++) {
                  const textgeprüft = knöpfetextcheck(knöpfe[i]);
                  if (textgeprüft === 'ablehntext') {
                     ablehnen = knöpfe[i];
                  } else if (textgeprüft === 'speichertext') {
                     speichern = knöpfe[i];
                  } else if (textgeprüft === 'optionstext') {
                     einstellungen = knöpfe[i];
                  } else if (textgeprüft === 'akzeptiertext') {
                     akzeptieren = knöpfe[i];
                  }
               }
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  let switches = sirdatacom.querySelectorAll('input[type="checkbox"]:checked:not([disabled], [rtayztwplpnfftousydd])');
                  for (let i = 0; i < switches.length; i++) {
                     switches[i].click();
                  }
                  switches = sirdatacom.querySelectorAll('input[type="checkbox"]:not([disabled], :checked)');
                  for (let i = 0; i < switches.length; i++) {
                     if (switches[i].checkVisibility()) {
                        const b = switches[i].parentElement.parentElement.parentElement;
                        if (b) {
                           if (knöpfetextcheck(b) === 'funktionaltext') {
                              const nebenswitches = b.parentElement.querySelectorAll('input[type="checkbox"]:not([disabled])');
                              for (let i = 0; i < nebenswitches.length; i++) {
                                 nebenswitches[i].setAttribute('rtayztwplpnfftousydd', 'a');
                              }
                              switches[i].setAttribute('rtayztwplpnfftousydd', 'a');
                              switches[i].click();
                           }
                        }
                     }
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // https://setupad.com/
            const setupad = document.querySelector('body > .stpd_cmp');
            if (setupad && localStorage.getItem('additional-consent') === null) {
               console.log('[Cookie auto decline] Detected: https://setupad.com/');
               cookiebannerstatus.anbieter = 'setupad.com';
               advancedrun = false;
               const knöpfe = setupad.querySelectorAll('button[type]');
               for (let i = 0; i < knöpfe.length; i++) {
                  const textgeprüft = knöpfetextcheck(knöpfe[i]);
                  if (textgeprüft === 'ablehntext') {
                     ablehnen = knöpfe[i];
                  } else if (textgeprüft === 'speichertext') {
                     speichern = knöpfe[i];
                  } else if (textgeprüft === 'optionstext') {
                     einstellungen = knöpfe[i];
                  } else if (textgeprüft === 'akzeptiertext') {
                     akzeptieren = knöpfe[i];
                  }
               }
               const switches = setupad.querySelectorAll('input[type="checkbox"]:checked:not([disabled], [rtayztwplpnfftousydd])');
               for (let i = 0; i < switches.length; i++) {
                  switches[i].click();
               }
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const boxen = setupad.querySelectorAll('.stpd_purposes_list li');
                  for (let i = 0; i < boxen.length; i++) {
                     const b = boxen[i].querySelector('.stpd_small_title');
                     if (knöpfetextcheck(b) === 'funktionaltext') {
                        const switchh = boxen[i].querySelector('input[type="checkbox"]:not([disabled], :checked)');
                        if (switchh) {
                           switchh.setAttribute('rtayztwplpnfftousydd', 'a');
                           switchh.click();
                        }
                     }
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // https://mkm.legal/
            const mkmlegal = document.querySelector('#jmdCookieConsentWrapper');
            if (mkmlegal && document.cookie.includes('mkm_cbconsent') === false) {
               console.log('[Cookie auto decline] Detected: https://mkm.legal/');
               cookiebannerstatus.anbieter = 'mkm.legal';
               advancedrun = false;
               ablehnen = mkmlegal.shadowRoot.querySelector('#cookieConsent button.deny');
               akzeptieren = mkmlegal.shadowRoot.querySelector('#cookieConsent button.js-accept-all');
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  einstellungen = mkmlegal.shadowRoot.querySelector('#cookieConsent a.js-open-settings');
                  speichern = mkmlegal.shadowRoot.querySelector('button.js-save-selection');
                  const boxen = mkmlegal.shadowRoot.querySelectorAll('.category-header');
                  for (let i = 0; i < boxen.length; i++) {
                     const b = boxen[i].querySelector('h3');
                     if (knöpfetextcheck(b) === 'funktionaltext') {
                        const checkbox = boxen[i].querySelector('input[type="checkbox"]:not([disabled], :checked)');
                        if (checkbox) {
                           checkbox.click();
                        }
                     }
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // https://2b-advice.com/
            const twobadvice = document.querySelector('#bbcdBanner.b-banner[style], #bbcdSettings.b-settings[style]');
            if (twobadvice && document.cookie.includes('_2BCookieSettings') === false) {
               console.log('[Cookie auto decline] Detected: https://2b-advice.com/');
               cookiebannerstatus.anbieter = '2b-advice.com';
               advancedrun = false;
               ablehnen = twobadvice.querySelector('button#bbcdBannerButtonDecline');
               einstellungen = twobadvice.querySelector('button#bbcdBannerButtonSettings');
               speichern = document.querySelector('#bbcdSettings button#bbcdButtonOK_dialog_St');
               akzeptieren = twobadvice.querySelector('button#bbcdBannerButtonOK');
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const checkbox = document.querySelector('#bbcdSettings input[type="checkbox"]#bbcdCategoryInput_dialog_St-preferences:not([disabled], :checked)');
                  if (checkbox) {
                     checkbox.click();
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // https://webstollen.de/
            const webstollen = document.getElementById('ws_eu-cookie-container');
            if (webstollen && document.cookie.includes('eu_cookie_store') === false) {
               console.log('[Cookie auto decline] Detected: https://webstollen.de/');
               cookiebannerstatus.anbieter = 'webstollen.de';
               advancedrun = false;
               ablehnen = webstollen.querySelector('button[aria-label="Ablehnen"]');
               einstellungen = webstollen.querySelector('a#eu-cookie-details-anzeigen-b');
               if (!einstellungen) {
                  const lknöpfe = webstollen.querySelectorAll('a[href="javascript:void(0)"]');
                  for (let i = 0; i < lknöpfe.length; i++) {
                     if (knöpfetextcheck(lknöpfe[i]) === 'speichertext') {
                        speichern = lknöpfe[i];
                     } else {
                        einstellungen = lknöpfe[i];
                     }
                  }
               }
               akzeptieren = webstollen.querySelector('button[aria-label="Alle akzeptieren"], button[aria-label="Alle auswählen"]');
               if (cookieeinstellung === 'funktional') {
                  switchesdelay += 0.5;
                  const boxen = webstollen.querySelectorAll('div[style="display: flex;"]:has(> span > label > input)');
                  for (let i = 0; i < boxen.length; i++) {
                     if (knöpfetextcheck(boxen[i]) === 'funktionaltext') {
                        const switchh = boxen[i].querySelector('input[type="checkbox"]:not([disabled], :checked)');
                        if (switchh) {
                           switchh.click();
                        }
                     }
                  }
               }
               if (bereitsgeklickt) {
                  const knöpfe2 = webstollen.querySelectorAll('button[class*="consentManagerButton"]');
                  for (let i = 0; i < knöpfe2.length; i++) {
                     if (knöpfetextcheck(knöpfe2[i]) === 'speichertext') {
                        speichern = knöpfe2[i];
                     }
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // https://www.jtl-software.de/
            const jtlsoftwarede = document.querySelector('#consent-manager.active, #consent.active');
            if (jtlsoftwarede && (window.localStorage.getItem('consent') === null || cookieeinstellung === 'funktional')) {
               console.log('[Cookie auto decline] Detected: https://www.jtl-software.de/');
               nureinklickeinstellungen = true;
               advancedrun = false;
               cookiebannerstatus.anbieter = 'jtl-software.de';
               einstellungen = jtlsoftwarede.querySelector('#consent-banner-btn-settings, button#consent--banner-btn-config');
               speichern = document.querySelector('#consent-settings button#consent-accept-banner-btn-close, #consent--settings button.consent--modal-close');
               if (cookieeinstellung === 'funktional' && !bereitsgeklickt) {
                  ablehnen = document.querySelector('#consent-manager.active button#consent-banner-btn-close, #consent.active button#consent--banner-btn-decline');
                  akzeptieren = document.querySelector('#consent.active button#consent--banner-btn-accept, #consent-manager.active button#consent-banner-btn-all');
               }
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const boxen = document.querySelectorAll('#consent--settings > .consent--modal-content > .consent--accordion > .consent--accordion-row, #consent-settings .consent-switch');
                  for (let i = 0; i < boxen.length; i++) {
                     const b = boxen[i].querySelector('label.consent--label, label.consent-label');
                     if (knöpfetextcheck(b) === 'funktionaltext') {
                        const checkbox = boxen[i].querySelector('input[type="checkbox"]:not([disabled], :checked)');
                        if (checkbox) {
                           checkbox.click();
                        }
                     }
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // blogspot.com
            const blogspot = document.querySelector('#cookieChoiceInfo.cookie-choices-info');
            if (blogspot && document.cookie.includes('displayCookieNotice') === false) {
               console.log('[Cookie auto decline] Detected: blogspot.com');
               cookiebannerstatus.anbieter = 'blogspot.com (google)';
               akzeptieren = document.querySelector('#cookieChoiceInfo a#cookieChoiceDismiss');
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // jimdo.com
            const jimdo = document.querySelector('div[aria-describedby="cc-individual-cookie-settings"], [class="sR5JB"]');
            if (jimdo && document.cookie.includes('ckies_') === false) {
               console.log('[Cookie auto decline] Detected: jimdo.com');
               cookiebannerstatus.anbieter = 'jimdo.com';
               advancedrun = false;
               ablehnen = jimdo.querySelector('button#cookie-settings-reject-all, [data-gi-selector="reject-all-cookies"] > a');
               speichern = jimdo.querySelector('button#cookie-settings-selected, [data-gi-selector] + div:not([data-gi-selector]) > a');
               akzeptieren = jimdo.querySelector('button#cookie-settings-all, [data-gi-selector="accept-all-cookies"] > a');
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const checkbox = jimdo.querySelector('.all-categories-view button.toggle[data-value="none"][data-params="Funktionell"], input[type="checkbox"]#Funktionell:not([disabled], :checked)');
                  if (checkbox && checkbox.checkVisibility()) {
                     checkbox.click();
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // amp-consent
            const ampconsent = document.querySelector('amp-consent.i-amphtml-element');
            if (ampconsent && (window.localStorage.key(0) === null || (window.localStorage.key(0) && window.localStorage.key(0).includes('amp-store:') === false))) {
               console.log('[Cookie auto decline] Detected: amp-consent');
               cookiebannerstatus.anbieter = 'amp-consent';
               akzeptieren = ampconsent.querySelector('button[on="tap:consent.accept"]');
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // shapepress
            const shapepress = document.querySelector('div[class="sp-dsgvo sp-dsgvo-popup-overlay not-accepted"]');
            if (shapepress && document.cookie.includes('sp_dsgvo_cookie_settings') === false) {
               console.log('[Cookie auto decline] Detected: shapepress');
               cookiebannerstatus.anbieter = 'shapepress';
               advancedrun = false;
               if (window.screen.availWidth >= 576) {
                  ablehnen = shapepress.querySelector('.sp-dsgvo-privacy-btn-accept-nothing');
                  akzeptieren = shapepress.querySelector('.sp-dsgvo-privacy-btn-accept-all');
               } else {
                  ablehnen = shapepress.querySelector('#sp-dsgvo-privacy-footer > .d-block a.sp-dsgvo-privacy-btn-accept-nothing, .sp-dsgvo-privacy-bottom > button.sp-dsgvo-privacy-btn-accept-nothing');
                  akzeptieren = shapepress.querySelector('#sp-dsgvo-privacy-footer > .d-block a.sp-dsgvo-privacy-btn-accept-all, .sp-dsgvo-privacy-bottom > button.sp-dsgvo-privacy-btn-accept-all');
               }
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  if (window.screen.availWidth >= 576) {
                     speichern = shapepress.querySelector('#sp-dsgvo-privacy-footer .sp-dsgvo-privacy-btn-accept-selection:not(.d-none)');
                  } else {
                     speichern = shapepress.querySelector('#sp-dsgvo-privacy-footer > .d-block .sp-dsgvo-privacy-btn-accept-selection:not(.d-none), .sp-dsgvo-privacy-bottom > .sp-dsgvo-privacy-btn-accept-selection:not(.d-none)');
                  }
                  const switchh = shapepress.querySelector('input[type="checkbox"]#sp-dsgvo-switch-category-embeddings:not([disabled], :checked)');
                  if (switchh && switchh.checkVisibility()) {
                     switchh.click();
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // cookiesjsr
            const cookiesjsr = document.querySelector('[id$="cookiesui"] #cookiesjsr');
            if (cookiesjsr && document.cookie.includes('cookiesjsr') === false) {
               console.log('[Cookie auto decline] Detected: cookiesjsr');
               cookiebannerstatus.anbieter = 'cookiesjsr';
               nureinklickeinstellungen = true;
               advancedrun = false;
               akzeptieren = cookiesjsr.querySelector('button.allowAll');
               ablehnen = cookiesjsr.querySelector('button.denyAll');
               einstellungen = cookiesjsr.querySelector('.cookiesjsr-settings');
               speichern = cookiesjsr.querySelector('button.save.dialog-last-tab');
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const switchh = cookiesjsr.querySelector('input[type=checkbox]:is([aria-describedby="desc_youtube"], [aria-describedby="desc_video"]):not([disabled], :checked)');
                  if (switchh) {
                     switchh.click();
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // mooveagency.com
            const moove = document.querySelector('aside#moove_gdpr_cookie_info_bar');
            if (moove && document.cookie.includes('moove_gdpr_popup') === false) {
               console.log('[Cookie auto decline] Detected: mooveagency.com');
               cookiebannerstatus.anbieter = 'mooveagency.com';
               nureinklickeinstellungen = true;
               advancedrun = false;
               ablehnen = moove.querySelector('button.moove-gdpr-infobar-reject-btn');
               einstellungen = moove.querySelector('button.moove-gdpr-infobar-settings-btn, .change-settings-button');
               speichern = document.querySelector('#moove_gdpr_cookie_modal button.moove-gdpr-modal-save-settings.button-visible');
               akzeptieren = moove.querySelector('button.moove-gdpr-infobar-allow-all');
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const switchh = document.querySelector('input[type="checkbox"]#moove_gdpr_strict_cookies:not([disabled], :checked)');
                  if (switchh) {
                     switchh.click();
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // cookieinformation.com
            const cookieinformationcom = document.querySelector('#coiOverlay[role="banner"][style="display: flex;"][aria-hidden="false"]');
            if (cookieinformationcom && document.cookie.includes('CookieInformationConsent') === false) {
               console.log('[Cookie auto decline] Detected: cookieinformation.com');
               cookiebannerstatus.anbieter = 'cookieinformation.com';
               advancedrun = false;
               speichern = cookieinformationcom.querySelector('button#updateButton:not([style="display: none;"])');
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const switchh = cookieinformationcom.querySelector('input[type="checkbox"]#cookie_cat_functional:not([disabled], :checked)');
                  if (switchh && switchh.checkVisibility()) {
                     switchh.click();
                  }
               } else {
                  ablehnen = cookieinformationcom.querySelector('button#declineButton:not([style="display: none;"])');
                  akzeptieren = cookieinformationcom.querySelector('button.coi-banner__accept');
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // cookie-script.com
            const cookiescriptcom = document.querySelector('#cookiescript_injected_wrapper:not([style="display: none;"])');
            if (cookiescriptcom && document.cookie.includes('consenttime') === false) {
               console.log('[Cookie auto decline] Detected: cookie-script.com');
               cookiebannerstatus.anbieter = 'cookie-script.com';
               advancedrun = false;
               speichern = cookiescriptcom.querySelector('#cookiescript_save');
               if (cookieeinstellung === 'funktional') {
                  const checkbox = cookiescriptcom.querySelector('input[type="checkbox"]#cookiescript_category_functionality:not([disabled], :checked)');
                  if (checkbox && checkbox.checkVisibility()) {
                     checkbox.click();
                  }
               } else {
                  ablehnen = cookiescriptcom.querySelector('#cookiescript_reject:not([style="display: none;"])');
                  akzeptieren = cookiescriptcom.querySelector('#cookiescript_accept:not([style="display: none;"])');
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // cookieinfoscript.com
            const cookieinfoscriptcom = document.querySelector('.cookieinfo[style^="position: fixed; left: 0px; right: 0px; height: auto; min-height: 21px; z-index: 2147483647; "]');
            if (cookieinfoscriptcom && document.cookie.includes('CookieInfoScript') === false) {
               console.log('[Cookie auto decline] Detected: cookieinfoscript.com');
               cookiebannerstatus.anbieter = 'cookieinfoscript.com';
               akzeptieren = cookieinfoscriptcom.querySelector('.cookieinfo-close');
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // cookie-permission-container
            const cookiepermissioncontainer = document.querySelector('.cookie-permission-container[data-cookie-permission="true"][style="display: block;"]');
            if (cookiepermissioncontainer && document.cookie.includes('cookie-preference') === false) {
               console.log('[Cookie auto decline] Detected: cookie-permission-container');
               cookiebannerstatus.anbieter = 'cookie-permission-container';
               ablehnen = cookiepermissioncontainer.querySelector('.cookie-permission-button > button');
               akzeptieren = cookiepermissioncontainer.querySelector('.js-cookie-accept-all-button > button');
               if (cookieeinstellung === 'funktional') {
                  document.cookie = 'cookie-preference=1;' + nc;
                  document.cookie = 'youtube-video=1;' + nc;
                  document.cookie = 'vimeo-video=1;' + nc;
                  document.cookie = 'wishlist-enabled=1;' + nc;
                  beenden();
                  window.location.reload();
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // tc-privacy-wrapper
            const tcprivacywrapper = document.querySelector('#tc-privacy-wrapper.tc-privacy-wrapper.tc-privacy-override > [id$="tc_privacy"]');
            if (tcprivacywrapper && tcprivacywrapper.offsetWidth > 0 && document.cookie.includes('TC_PRIVACY') === false) {
               console.log('[Cookie auto decline] Detected: tc-privacy-wrapper');
               cookiebannerstatus.anbieter = 'tc-privacy-wrapper';
               const knöpfe = tcprivacywrapper.querySelectorAll('button.tc-privacy-button');
               for (let i = 0; i < knöpfe.length; i++) {
                  const textgeprüft = knöpfetextcheck(knöpfe[i]);
                  if (textgeprüft === 'ablehntext') {
                     ablehnen = knöpfe[i];
                  } else if (textgeprüft === 'speichertext') {
                     speichern = knöpfe[i];
                  } else if (textgeprüft === 'akzeptiertext') {
                     akzeptieren = knöpfe[i];
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // tarteaucitronRoot
            const tarteaucitronroot = document.getElementById('tarteaucitronRoot');
            if (tarteaucitronroot && document.cookie.includes('=wait') === true) {
               console.log('[Cookie auto decline] Detected: tarteaucitronRoot');
               cookiebannerstatus.anbieter = 'tarteaucitronRoot';
               advancedrun = false;
               nureinklickeinstellungen = true;
               if (cookieeinstellung === 'funktional') {
                  if (domainohnewww !== 'gruene-kleinostheim.de') {
                     document.cookie = "tarteaucitron=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                     document.cookie = 'tarteaucitron=!tarteaucitron=true!website=true!youtube=true!vimeo=true!mycustomservice=true!addtoanyshare=false!iframe=false!facebookpixel=false!analytics=false!googletagmanager=false!regex_ads=false!regex_analytic=false!matomo=false!gajs=false;' + nc;
                  } else {
                     localStorage.setItem('dsgvoaio', 'dsgvoaiowp=!youtube=true!mycustomservice=true');
                  }
                  beenden();
                  window.location.reload();
               } else {
                  const ablehnen1 = tarteaucitronroot.querySelectorAll('[onclick="tarteaucitron.userInterface.respondAll(false);"], .tarteaucitronCTAButton.tarteaucitronDeny');
                  for (let i = 0; i < ablehnen1.length; i++) {
                     if (ablehnen1[i].checkVisibility()) {
                        ablehnen = ablehnen1[i];
                     }
                  }
                  const akzeptieren1 = tarteaucitronroot.querySelectorAll('[onclick="tarteaucitron.userInterface.respondAll(true);"], .tarteaucitronCTAButton.tarteaucitronAllow');
                  for (let i = 0; i < akzeptieren1.length; i++) {
                     if (akzeptieren1[i].checkVisibility()) {
                        akzeptieren = akzeptieren1[i];
                     }
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // offcanvas (shopping sites)
            const offcanvas = document.querySelector('[class^="offcanvas"][class$="show"][aria-modal="true"][role="dialog"]:has(.js-offcanvas-cookie-accept-all)');
            if (offcanvas && offcanvas.innerText.includes('Cookies') && document.cookie.includes('cookie-preference') === false) {
               console.log('[Cookie auto decline] Detected: offcanvas (shopping sites)');
               cookiebannerstatus.anbieter = 'offcanvas (shopping sites)';
               advancedrun = false;
               speichern = offcanvas.querySelector('button.js-offcanvas-cookie-submit');
               akzeptieren = offcanvas.querySelector('button.js-offcanvas-cookie-accept-all');
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const boxen = offcanvas.querySelectorAll('div.offcanvas-cookie-entry.form-check, div.form-check:not(.offcanvas-cookie-entry):not(:has(+ button + div input))');
                  for (let i = 0; i < boxen.length; i++) {
                     const aktivierteswitches = boxen[i].querySelector('input[type="checkbox"]:checked:not([disabled], [data-cookie-required], [rtayztwplpnfftousydd])');
                     if (aktivierteswitches) {
                        aktivierteswitches.setAttribute('rtayztwplpnfftousydd', 'a');
                        aktivierteswitches.click();
                     }
                     const b = boxen[i].querySelector('label.custom-control-label');
                     if (knöpfetextcheck(b) === 'funktionaltext') {
                        const checkbox = boxen[i].querySelector('input[type="checkbox"]:not([disabled], :checked, [data-cookie-required])');
                        if (checkbox) {
                           checkbox.click();
                        }
                     }
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // eightworks-cookie-consent-plus
            const eightworkscookieconsentplus = document.querySelector('#eightworks-cookie-consent-plus[data-cookie-permission="true"], .eightworks-cookie-consent-plus[data-cookie-permission="true"]');
            if (eightworkscookieconsentplus && document.cookie.includes('reference') === false) {
               console.log('[Cookie auto decline] Detected: eightworks-cookie-consent-plus');
               cookiebannerstatus.anbieter = 'eightworks-cookie-consent-plus';
               nureinklickeinstellungen = true;
               findconsentintervalzahl = 502;
               findconsentintervalzahländern();
               einstellungen = eightworkscookieconsentplus.querySelector('a.cookie-permission--configure-button[href="#"]');
               speichern = eightworkscookieconsentplus.querySelector('button[class="btn btn-default js-offcanvas-cookie-submit eightworks-cookie-consent-plus-button eightworks-cookie-consent-plus-button-mod1"][title="Speichern"], a.cookie-consent--save-button, button.eightworks-cookie-consent-plus-button-secondary');
               akzeptieren = eightworkscookieconsentplus.querySelector('button.js-offcanvas-cookie-accept-all, a.cookie-permission--accept-button');
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const boxen = eightworkscookieconsentplus.querySelectorAll('div[class="offcanvas-cookie-group"], .cookie-consent--group');
                  for (let i = 0; i < boxen.length; i++) {
                     const b = boxen[i].querySelector('label.custom-control-label, .cookie-consent--state-label');
                     if (knöpfetextcheck(b) === 'funktionaltext') {
                        const checkbox = boxen[i].querySelector('input[type="checkbox"]:not([disabled], :checked, [data-cookie-required])');
                        if (checkbox) {
                           checkbox.click();
                        }
                     }
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }
            // cc_banner-wrapper
            const ccbannerwrapper = document.querySelector('div[class="cc_banner-wrapper "] :is(div[class="cc_banner cc_container cc_container--open"], div[class="cc-banner cc_container cc_container--open"])');
            if (ccbannerwrapper && document.cookie.includes('cookieconsent_dismissed') === false) {
               console.log('[Cookie auto decline] Detected: cc_banner-wrapper');
               cookiebannerstatus.anbieter = 'cc_banner-wrapper';
               akzeptieren = ccbannerwrapper.querySelector('a[data-cc-event="click:dismiss"]');
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // transcend.io
            const transcend = document.querySelector('#transcend-consent-manager[style^="position: fixed; z-index: "], #transcend-consent-manager-tcf-ui[style^="position: fixed;"][style*="z-index: "]');
            if (transcend && window.localStorage.getItem('tcmConsent') === null) {
               console.log('[Cookie auto decline] Detected: transcend.io');
               cookiebannerstatus.anbieter = 'transcend.io';
               advancedrun = false;
               const transcendneu = document.querySelector('#transcend-consent-manager-tcf-ui[style^="position: fixed;"][style*="z-index: "]');
               // Shadow Root is closed so the addon need to go this way.
               if (transcend.shadowRoot === null) {
                  if (!transcendneu) {
                     window.localStorage.setItem('tcmConsent', '{"purposes":{"SaleOfInfo":false,"Analytics":false,"Functional":true,"Advertising":false},"timestamp":"' + cookiedatum + '","confirmed":true,"prompted":true,"updated":true}');
                     cookiebannerstatus.knopfstatus = 'abgelehnt';
                     beenden();
                     location.reload();
                  } else {
                     window.localStorage.setItem('tcmConsent', '{"purposes":{"GcmAdvanced":"false","Advertising":false,"Functional":true,"SaleOfInfo":"false","Analytics":false},"timestamp":"' + cookiedatum + '","confirmed":true,"prompted":false,"updated":true,"metadata":{"tcmp":{"tcf":{"tcString":"CQann8AQann8AGPABAENCDFgAAAAAAAAAAAAAAALzgAAAAAA.YAAAAAAAAAAA"}}},"metadataTimestamp":"' + cookiedatum + '"}');
                     window.localStorage.setItem('tcmTcf', '"CQann8AQann8AGPABAENCDFgAAAAAAAAAAAAAAALzgAAAAAA.YAAAAAAAAAAA"');
                     cookiebannerstatus.knopfstatus = 'abgelehnt';
                     beenden();
                     location.reload();
                  }
               } else {
                  document.cookie = 'tcm={"purposes":{"SaleOfInfo":false,"Functional":true,"Analytics":false,"Advertising":false},"timestamp":"' + cookiedatum + '","confirmed":true,"prompted":false,"updated":true};' + nc;
                  beenden();
                  location.reload();
               }
            }

            // ketch.com
            const ketch = document.querySelector('#ketch-modal.ketch-flex, #ketch-banner.ketch-flex, [class^="ketch-fixed ketch-z-ketch-max-z-index ketch-top-0 ketch-left-0 ketch-bottom-0 ketch-right-0"], .ketch-fixed.ketch-z-ketch-max-z-index');
            if (ketch) {
               console.log('[Cookie auto decline] Detected: ketch.com');
               cookiebannerstatus.anbieter = 'ketch.com';
               const knöpfe = ketch.querySelectorAll('button[id^="ketch-"]');
               for (let i = 0; i < knöpfe.length; i++) {
                  const textgeprüft = knöpfetextcheck(knöpfe[i]);
                  if (textgeprüft === 'ablehntext') {
                     ablehnen = knöpfe[i];
                  } else if (textgeprüft === 'speichertext') {
                     speichern = knöpfe[i];
                  } else if (textgeprüft === 'akzeptiertext') {
                     akzeptieren = knöpfe[i];
                  }
               }
               speichern = ketch.querySelector('[class="ketch-flex ketch-w-full ketch-items-center ketch-gap-6 sm:ketch-w-auto"] > button');
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // otCKAppData
            const otckappdata = document.querySelector('.otCookiesNotification > [style="display: block;"][id^="cookies-"]');
            if (otckappdata && document.cookie.includes('_consentik_cookie') === false) {
               console.log('[Cookie auto decline] Detected: otCKAppData');
               cookiebannerstatus.anbieter = 'otCKAppData';
               advancedrun = false;
               ablehnen = otckappdata.querySelector('#cookies-dismiss[role="button"]');
               einstellungen = otckappdata.querySelector('#cookies-preferences[role="button"]');
               speichern = otckappdata.querySelector('button.cookies-btn.btn-select');
               akzeptieren = otckappdata.querySelector('#cookies-submit[role="button"]');
               if (bereitsgeklickt) {
                  const switches = otckappdata.querySelectorAll('input[type="checkbox"][checked]:not([disabled], [data-id="necessary"], [rtayztwplpnfftousydd])');
                  for (let i = 0; i < switches.length; i++) {
                     switches[i].click();
                  }
               }
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const boxen = otckappdata.querySelectorAll('.cst-category-item-header');
                  for (let i = 0; i < boxen.length; i++) {
                     const b = boxen[i].querySelector('.cst-category-name');
                     if (knöpfetextcheck(b) === 'funktionaltext') {
                        const checkbox = boxen[i].querySelector('input[type="checkbox"]:not([disabled], [checked])');
                        if (checkbox) {
                           checkbox.setAttribute('rtayztwplpnfftousydd', 'a');
                           checkbox.click();
                        }
                     }
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // sliding-popup
            const slidingpopup = document.querySelector('div[id="sliding-popup"][class="sliding-popup-bottom"][style]');
            if (slidingpopup && document.cookie.includes('cookie-agreed=') === false) {
               console.log('[Cookie auto decline] Detected: sliding-popup');
               cookiebannerstatus.anbieter = 'sliding-popup';
               ablehnen = slidingpopup.querySelector('button.decline-button, button.eu-cookie-compliance-reject-button');
               speichern = slidingpopup.querySelector('.eu-cookie-compliance-save-preferences-button');
               akzeptieren = slidingpopup.querySelector('.agree-button');
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // evidon
            const evidon = document.querySelector('#_evidon_banner, #_evidon-barrier-wrapper');
            if (evidon && evidon.offsetHeight >= 1) {
               console.log('[Cookie auto decline] Detected: evidon');
               cookiebannerstatus.anbieter = 'evidon';
               ablehnen = evidon.querySelector('button#_evidon-decline-button, button#_evidon-barrier-declinebutton');
               akzeptieren = evidon.querySelector('button#_evidon-accept-button, button#_evidon-banner-acceptbutton');
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // axept.io
            let axept = document.querySelector('#axeptio_overlay.axeptio_mount[data-project-id]');
            if (axept && document.cookie.includes('axeptio') === true && document.cookie.includes('%2Cgoogle_analytics%2C') === false) {
               console.log('[Cookie auto decline] Detected: axept.io');
               cookiebannerstatus.anbieter = 'axept.io';
               advancedrun = false;
               findconsentintervalzahl = 1002;
               findconsentintervalzahländern();
               const aceptshadowroot = axept.querySelector('.needsclick');
               if (aceptshadowroot && aceptshadowroot.shadowRoot) {
                  axept = aceptshadowroot.shadowRoot;
               }
               ablehnen = axept.querySelector('button#axeptio_btn_dismiss, button.ax-discardButton');
               einstellungen = axept.querySelector('button#axeptio_btn_configure');
               akzeptieren = axept.querySelector('button#axeptio_btn_acceptAll');
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  window.setTimeout(function () {
                     const boxen = axept.querySelectorAll('.ListSwitch__Item');
                     for (let i = 0; i < boxen.length; i++) {
                        const b = boxen[i].querySelector('.ListSwitch__Vendor__Title');
                        if (knöpfetextcheck(b) === 'funktionaltext') {
                           const checkbox = boxen[i].querySelector('input[type="checkbox"]:not([disabled], :checked)');
                           if (checkbox) {
                              checkbox.click();
                           }
                        }
                     }
                  }, 402);
                  const weiterbutton = axept.querySelector('button#axeptio_btn_next');
                  if (weiterbutton && weiterbutton.checkVisibility()) {
                     weiterbutton.click();
                  } else if (bereitsgeklickt) {
                     cookiebannerstatus.knopfstatus = 'gespeichert';
                     beenden();
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // wordpress.com
            let wordpress = document.querySelector('#cmp-app-container iframe');
            if (wordpress && wordpress.contentWindow && wordpress.contentWindow.document && document.cookie.includes('euconsent-v2') === false) {
               wordpress = wordpress.contentWindow.document;
               console.log('[Cookie auto decline] Detected: wordpress.com');
               cookiebannerstatus.anbieter = 'wordpress.com';
               einstellungen = wordpress.querySelector('.cmp__notice-buttons > button[class="cmp-components-button is-secondary"]');
               akzeptieren = wordpress.querySelector('.cmp__notice-buttons > button[class="cmp-components-button is-primary"]');
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const boxen = wordpress.querySelectorAll('.cmp__settings-form-row:has(input)');
                  for (let i = 0; i < boxen.length; i++) {
                     const b = boxen[i].querySelector('button');
                     if (knöpfetextcheck(b) === 'funktionaltext') {
                        const checkbox = boxen[i].querySelector('input[type="checkbox"]:not([disabled], :checked)');
                        if (checkbox) {
                           checkbox.click();
                        }
                     }
                  }
                  speichern = wordpress.querySelector('.cmp__dialog-footer-buttons > button[class="cmp-components-button is-primary"]');
               } else {
                  ablehnen = wordpress.querySelector('.cmp__dialog-footer-buttons > button[class="cmp-components-button white-space-normal is-secondary"]');
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // cookiehub.com
            const cookiehub = document.querySelector('div[role="dialog"].ch2-visible.ch2-dialog, div[class="ch2-settings ch2-settings-scan ch2-visible"]');
            if (cookiehub && document.cookie.includes('cookiehub') === false) {
               console.log('[Cookie auto decline] Detected: cookiehub.com');
               cookiebannerstatus.anbieter = 'cookiehub.com';
               advancedrun = false;
               einstellungen = cookiehub.querySelector('button.ch2-open-settings-btn');
               akzeptieren = cookiehub.querySelector('button.ch2-allow-all-btn');
               nureinklickeinstellungen = true;
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  speichern = document.querySelector('div[class="ch2-settings ch2-settings-scan ch2-visible"] button.ch2-save-settings-btn');
                  const checkbox = document.querySelector('div[class="ch2-settings ch2-settings-scan ch2-visible"] input#c2-c-2[type="checkbox"]:not([disabled], :checked)');
                  if (checkbox && checkbox.checkVisibility()) {
                     checkbox.click();
                  }
               } else {
                  speichern = document.querySelector('div[class="ch2-settings ch2-settings-scan ch2-visible"] button.ch2-deny-all-btn');
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // xenforo.com
            const xenforo = document.querySelector('li[class="notice js-notice notice--primary notice--cookie"]');
            if (xenforo && document.cookie.includes('xf_notice_dismiss') === false) {
               console.log('[Cookie auto decline] Detected: xenforo.com');
               cookiebannerstatus.anbieter = 'xenforo.com';
               akzeptieren = xenforo.querySelector('a.js-noticeDismiss[href$="/account/dismiss-notice"]');
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // cookiesplus-overlay
            const cookiesplusoverlay = document.querySelector('#cookiesplus-modal-container.cookiesplus-move');
            if (cookiesplusoverlay && document.cookie.includes('consent_date') === false) {
               console.log('[Cookie auto decline] Detected: cookiesplus-overlay');
               cookiebannerstatus.anbieter = 'cookiesplus-overlay';
               advancedrun = false;
               ablehnen = cookiesplusoverlay.querySelector('button.cookiesplus-reject');
               einstellungen = cookiesplusoverlay.querySelector('button.cookiesplus-more-information');
               speichern = cookiesplusoverlay.querySelector('button.cookiesplus-save');
               akzeptieren = cookiesplusoverlay.querySelector('button.cookiesplus-accept');
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const boxen = cookiesplusoverlay.querySelectorAll('.cookiesplus-finality-header');
                  for (let i = 0; i < boxen.length; i++) {
                     const b = boxen[i].querySelector('strong');
                     if (knöpfetextcheck(b) === 'funktionaltext') {
                        const checkbox = boxen[i].querySelector('[id^="cookiesplus-finality-"][id$="-on"]:not([disabled], :checked)');
                        if (checkbox) {
                           checkbox.click();
                        }
                     }
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // sovy.com
            const sovy = document.querySelector('#sccm');
            if (sovy && document.cookie.includes('%22consentId%22%3A%') === false) {
               console.log('[Cookie auto decline] Detected: sovy.com');
               cookiebannerstatus.anbieter = 'sovy.com';
               nureinklickeinstellungen = true;
               advancedrun = false;
               ablehnen = sovy.querySelector('.cookie_reject > .rejectcookies');
               einstellungen = sovy.querySelector('#manage_cookies > .rejectcookies');
               speichern = sovy.querySelector('.svchoices > .acceptcookies');
               akzeptieren = sovy.querySelector('.cookie_accept > .acceptcookies');
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const boxen = sovy.querySelectorAll('#cat_blocks > div:has(input[type="checkbox"])');
                  for (let i = 0; i < boxen.length; i++) {
                     if (knöpfetextcheck(boxen[i]) === 'funktionaltext') {
                        const checkbox = boxen[i].querySelector('input[type="checkbox"]:not([disabled], :checked)');
                        if (checkbox) {
                           checkbox.click();
                        }
                     }
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // freeprivacypolicy.com
            const freeprivacypolicycom = document.querySelector('[id$="---nb"][aria-describedby="cc-nb-text"], #cc_dialog[aria-labelledby="cc_dialog"].cc_css_reboot');
            if (freeprivacypolicycom && document.cookie.includes('cookie_consent_user_accepted') === false) {
               console.log('[Cookie auto decline] Detected: freeprivacypolicy.com');
               cookiebannerstatus.anbieter = 'freeprivacypolicy.com';
               nureinklickeinstellungen = true;
               advancedrun = false;
               ablehnen = freeprivacypolicycom.querySelector('button.cc-nb-reject');
               einstellungen = freeprivacypolicycom.querySelector('button.cc_b_cp, button.cc-nb-changep');
               speichern = document.querySelector('[id*="preferences-cent"] :is(button.cc-cp-foot-save, .cc_cp_f_save > button)');
               akzeptieren = freeprivacypolicycom.querySelector('button.cc-nb-okagree, button.cc_b_ok');
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const switchh = document.querySelector('[id*="preferences-cent"] input#functionality[type="checkbox"]:not([disabled], :checked)');
                  if (switchh) {
                     switchh.click();
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // dmscookie.com
            const dmscookie = document.querySelector('#dmsCookiePopup');
            if (dmscookie && document.cookie.includes('marketing') === false) {
               console.log('[Cookie auto decline] Detected: dmscookie.com');
               cookiebannerstatus.anbieter = 'dmscookie.com';
               advancedrun = false;
               speichern = dmscookie.querySelector('button[onclick="dmsCookie.loadScript()"]');
               if (cookieeinstellung === 'ablehnen' || cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const checkbox = dmscookie.querySelector('input[type="checkbox"][name="statistics"]:checked:not([disabled])');
                  const checkbox2 = dmscookie.querySelector('input[type="checkbox"][name="marketing"]:checked:not([disabled])');
                  if (checkbox) {
                     checkbox.click();
                  }
                  if (checkbox2) {
                     checkbox2.click();
                  }
               }
               if (cookieeinstellung === 'ablehnen') {
                  switchesdelay++;
                  const checkbox = dmscookie.querySelector('input[type="checkbox"][name="preferences"]:checked:not([disabled])');
                  if (checkbox) {
                     checkbox.click();
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // redim.de
            const redimde = document.querySelector('#redim-cookiehint-bottom, #redim-cookiehint-modal, #Xredim-cookiehint-center');
            if (redimde && document.cookie.includes('reDimCookieHint') === false) {
               console.log('[Cookie auto decline] Detected: redim.de');
               cookiebannerstatus.anbieter = 'redim.de';
               akzeptieren = redimde.querySelector('#cookiehintsubmit, button.uk-button-primary');
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // ethyca.com
            const ethyca = document.querySelector('#fides-banner-container.fides-banner:not(.fides-banner-hidden), .fides-modal-container[data-testid="consent-modal"]:not([aria-hidden="true"]), #fides-modal:not([aria-hidden="true"])');
            if (ethyca && document.cookie.includes('fides_consent') === false) {
               console.log('[Cookie auto decline] Detected: ethyca.com');
               cookiebannerstatus.anbieter = 'ethyca.com';
               nureinklickeinstellungen = true;
               advancedrun = false;
               ablehnen = ethyca.querySelector('button.fides-reject-all-button');
               einstellungen = ethyca.querySelector('button.fides-manage-preferences-button');
               speichern = ethyca.querySelector('button#fides-save-button');
               akzeptieren = ethyca.querySelector('button.fides-accept-all-button');
               if (cookieeinstellung === 'funktional') {
                  switchesdelay += 0.5;
                  const boxen = ethyca.querySelectorAll('.fides-notice-toggle-title');
                  for (let i = 0; i < boxen.length; i++) {
                     const b = boxen[i].querySelector('span.fides-justify-space-between');
                     if (knöpfetextcheck(b) === 'funktionaltext') {
                        const checkbox = boxen[i].querySelector('input[type="checkbox"]:not([disabled], :checked)');
                        if (checkbox && checkbox.checkVisibility()) {
                           checkbox.click();
                        }
                     }
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // pixelmate
            const pixelmate = document.querySelector('.pixelmate-big-wrapper.pixelmate-general-banner-wrapper, .pixelmate-wrapper-bottom');
            if (pixelmate && document.cookie.includes('pixelmate') === false) {
               console.log('[Cookie auto decline] Detected: pixelmate');
               cookiebannerstatus.anbieter = 'pixelmate';
               nureinklickeinstellungen = true;
               advancedrun = false;
               ablehnen = pixelmate.querySelector('button.pixelmate-general-deny, button.pixelmate-general-deny-bottom');
               einstellungen = pixelmate.querySelector('button.pixelmate-general-single, .pixelmate-general-single-bottom');
               speichern = document.querySelector('#pixelmate-settings-wrapper button.pixelmate-settings-save');
               akzeptieren = pixelmate.querySelector('button.pixelmate-general-allow, .pixelmate-general-allow-bottom');
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const switchh = document.querySelector('#pixelmate-settings-wrapper input#pixelmate-videos[type="checkbox"]:not([disabled], :checked)');
                  if (switchh && switchh.checkVisibility()) {
                     switchh.click();
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // wpconsent
            const wpconsent = document.querySelector('#wpconsent-root > #wpconsent-container');
            if (wpconsent && document.cookie.includes('wpconsent_preferences') === false) {
               console.log('[Cookie auto decline] Detected: wpconsent');
               cookiebannerstatus.anbieter = 'wpconsent';
               const wpconsentshadowroot = wpconsent.shadowRoot;
               if (wpconsentshadowroot) {
                  ablehnen = wpconsentshadowroot.querySelector('button#wpconsent-cancel-all');
                  akzeptieren = wpconsentshadowroot.querySelector('button#wpconsent-accept-all');
                  klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
               }
            }

            // huconsent
            const huconsent = document.querySelector('#hu[aria-labelledby="hu-cookies-notice-message"]');
            if (huconsent && document.cookie.includes('hu-consent') === false) {
               console.log('[Cookie auto decline] Detected: huconsent');
               cookiebannerstatus.anbieter = 'huconsent';
               advancedrun = false;
               speichern = huconsent.querySelector('button#hu-cookies-save');
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const inputknopf = huconsent.querySelector('input#hu-cookies-notice-consent-choices-2-toggle[type="radio"]:not([disabled], :checked)');
                  if (inputknopf) {
                     inputknopf.click();
                  }
               } else if (cookieeinstellung === 'akzeptieren') {
                  switchesdelay++;
                  const inputknopf = huconsent.querySelector('input#hu-cookies-notice-consent-choices-3-toggle[type="radio"]:not([disabled], :checked)');
                  if (inputknopf) {
                     inputknopf.click();
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // sfbx.io (only appear when no adblocker is used)
            const sfbxio = document.querySelector('#appconsent > iframe');
            if (sfbxio) {
               console.log('[Cookie auto decline] Detected: sfbx.io');
               cookiebannerstatus.anbieter = 'sfbx.io';
               const sfbxiohtml = sfbxio.contentDocument;
               ablehnen = sfbxiohtml.querySelector('button.button__refuseAll, button.button__skip');
               if (ablehnen) {
                  sfbxabgelehnt = true;
               }
               akzeptieren = sfbxiohtml.querySelector('button.button__acceptAll');
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }
            if (sfbxabgelehnt) {
               // Akzeptiere wenn zum ablehnen ein Abo/Account erforderlich ist.
               const popincmp = document.querySelector('#popin.popin-cmp [class="popin-buttons choice"] > button:first-child + button');
               if (popincmp && popincmp.innerText.toLowerCase().includes('accept')) {
                  akzeptieren = popincmp;
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // uniconsent.com (only appear when no adblocker is used)
            const uniconsent = document.querySelector('#uniccmp[data-nosnippet=""]');
            if (uniconsent && document.cookie.includes('uniconsent') === false) {
               console.log('[Cookie auto decline] Detected: uniconsent.com');
               cookiebannerstatus.anbieter = 'uniconsent.com';
               advancedrun = false;
               const knöpfe = uniconsent.querySelectorAll('button');
               for (let i = 0; i < knöpfe.length; i++) {
                  const textgeprüft = knöpfetextcheck(knöpfe[i]);
                  if (textgeprüft === 'ablehntext') {
                     ablehnen = knöpfe[i];
                  } else if (textgeprüft === 'speichertext') {
                     speichern = knöpfe[i];
                  } else if (textgeprüft === 'akzeptiertext') {
                     akzeptieren = knöpfe[i];
                  } else if (textgeprüft === 'optionstext') {
                     einstellungen = knöpfe[i];
                  }
               }
               if (cookieeinstellung === 'funktional' && bereitsgeklickt) {
                  switchesdelay++;
                  const boxen = uniconsent.querySelectorAll('div[class="flex items-center justify-center w-full p-2 border-b "]:has(input)');
                  for (let i = 0; i < boxen.length; i++) {
                     const b = boxen[i].querySelector('.flex-1.cursor-pointer');
                     if (knöpfetextcheck(b) === 'funktionaltext') {
                        const checkbox = boxen[i].querySelector('input[type="checkbox"]:not([disabled], :checked)');
                        if (checkbox) {
                           checkbox.click();
                        }
                     }
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // omcookie
            const omcookie = document.querySelector('.tx-om-cookie-consent');
            if (omcookie && document.cookie.includes('omCookieConsent') === false) {
               console.log('[Cookie auto decline] Detected: omcookie');
               cookiebannerstatus.anbieter = 'omcookie';

               ablehnen = omcookie.querySelector('button[data-omcookie-panel-save="min"]');
               speichern = omcookie.querySelector('button[data-omcookie-panel-save="save"]');
               akzeptieren = omcookie.querySelector('button[data-omcookie-panel-save="all"]');
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const boxen = omcookie.querySelectorAll('.cookie-panel__checkbox-wrap, .form-check-inline');
                  for (let i = 0; i < boxen.length; i++) {
                     const b = boxen[i].querySelector('label');
                     if (knöpfetextcheck(b) === 'funktionaltext') {
                        const checkbox = boxen[i].querySelector('input[type="checkbox"]:not([disabled], :checked)');
                        if (checkbox) {
                           checkbox.click();
                        }
                     }
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // utiq.com
            // Der utiq.com Einwilligungsbanner erscheint nur mit deaktivierten Adblocker und erst nachdem der "normale" Cookie Banner abgelehnt wurde.
            const utiq = document.querySelector('div[id^="utiq"]:has(a[href^="https://consenthub.utiq.com/"])');
            if (utiq && document.cookie.includes('utiq_consent_status') === false && domainohnewww != 'utiq.com') {
               console.log('[Cookie auto decline] Detected: utiq.com');
               cookiebannerstatus.anbieter = 'utiq.com';
               ablehnen = utiq.querySelector('#utiqConsCloseButton, button#utiq__reject_button');
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // cms-accept-tags
            const cmsaccepttags = document.querySelector('cms-accept-tags[data-cms-id]');
            if (cmsaccepttags && document.cookie.includes('cms_cookies_saved') === false) {
               console.log('[Cookie auto decline] Detected: cms-accept-tags');
               cookiebannerstatus.anbieter = 'cms-accept-tags';
               advancedrun = false;
               akzeptieren = cmsaccepttags.querySelector('cms-button[role="button"][value="accept"][data-all="true"]');
               speichern = cmsaccepttags.querySelector('cms-button[role="button"][value="accept"]:not([data-all="true"])');
               if (cookieeinstellung !== 'akzeptieren') {
                  const switches = cmsaccepttags.querySelectorAll('input[type="checkbox"]:checked:not([disabled], [rtayztwplpnfftousydd])');
                  for (let i = 0; i < switches.length; i++) {
                     switches[i].click();
                  }
               }
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const boxen = cmsaccepttags.querySelectorAll('cms-taggroup-header');
                  for (let i = 0; i < boxen.length; i++) {
                     const b = boxen[i].querySelector('span');
                     if (knöpfetextcheck(b) === 'funktionaltext') {
                        const checkbox = boxen[i].querySelector('input[type="checkbox"]:not([disabled], :checked)');
                        if (checkbox) {
                           checkbox.setAttribute('rtayztwplpnfftousydd', 'a');
                           checkbox.click();
                        }
                     }
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // eu_cookie_law_widget
            const eucookielawwidget = document.querySelector('.widget_eu_cookie_law_widget[id^="eu_cookie_law_widget"]');
            if (eucookielawwidget && document.cookie.includes('eucookielaw') === false) {
               console.log('[Cookie auto decline] Detected: eu_cookie_law_widget');
               cookiebannerstatus.anbieter = 'eu_cookie_law_widget';
               advancedrun = false;
               akzeptieren = eucookielawwidget.querySelector('input.accept');
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // https://marketpress.de/shop/plugins/cookie-cracker/
            const cookiecracker = document.querySelector('#cc-cookie-message[role][aria-labelledby="cc-cookie-headline"]');
            if (cookiecracker && document.cookie.includes('cookie-cracker_') === false) {
               console.log('[Cookie auto decline] Detected: https://marketpress.de/shop/plugins/cookie-cracker/');
               cookiebannerstatus.anbieter = 'https://marketpress.de/shop/plugins/cookie-cracker/';
               advancedrun = false;
               ablehnen = cookiecracker.querySelector('button#cc-cookie-necessary');
               einstellungen = cookiecracker.querySelector('button#cc-cookie-advanced:not([disabled])');
               speichern = cookiecracker.querySelector('button#cc-cookie-accept[data-accept="custom"]');
               akzeptieren = cookiecracker.querySelector('button#cc-cookie-accept');
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const boxen = cookiecracker.querySelectorAll('#cc-cookie-types li');
                  for (let i = 0; i < boxen.length; i++) {
                     const b = boxen[i].querySelector('label');
                     if (knöpfetextcheck(b) === 'funktionaltext') {
                        const checkbox = boxen[i].querySelector('input[type="checkbox"]:not([disabled], :checked)');
                        if (checkbox) {
                           checkbox.click();
                        }
                     }
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // fundingchoicesmessages.google.com (only appear when no adblocker is used)
            const fundingchoicesmessages = document.querySelector('.fc-consent-root');
            if (fundingchoicesmessages && document.cookie.includes('%5Bnull%2Cnull%2Cnull%2C%5B%22') === false) {
               console.log('[Cookie auto decline] Detected: fundingchoicesmessages.google.com');
               cookiebannerstatus.anbieter = 'fundingchoicesmessages.google.com';
               advancedrun = false;
               ablehnen = fundingchoicesmessages.querySelector('button.fc-cta-do-not-consent');
               einstellungen = fundingchoicesmessages.querySelector('button.fc-cta-manage-options');
               speichern = fundingchoicesmessages.querySelector('button.fc-confirm-choices');
               akzeptieren = fundingchoicesmessages.querySelector('button.fc-cta-consent');
               if (cookieeinstellung !== 'akzeptieren') {
                  const switches = fundingchoicesmessages.querySelectorAll('.fc-data-preferences-dialog .fc-preference-container input[type="checkbox"]:checked:not([disabled], [rtayztwplpnfftousydd])');
                  for (let i = 0; i < switches.length; i++) {
                     switches[i].click();
                  }
               }
               if (cookieeinstellung === 'funktional') {
                  switchesdelay++;
                  const boxen = fundingchoicesmessages.querySelectorAll('.fc-data-preferences-dialog .fc-preference-container');
                  for (let i = 0; i < boxen.length; i++) {
                     const b = boxen[i].querySelector('h2');
                     if (knöpfetextcheck(b) === 'funktionaltext') {
                        const switchh = boxen[i].querySelector('input[type="checkbox"]:not([disabled], :checked)');
                        if (switchh) {
                           switchh.setAttribute('rtayztwplpnfftousydd', 'a');
                           switchh.click();
                        }
                     }
                  }
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // Advanced
            if (advancedcounter >= 5 && (advancedrun === true || (findconsentcounter >= (7000 / findconsentintervalzahl) && !cookiebannerfinalakzeptiert)) && (window.self === window.top || window.innerHeight > window.outerHeight / 3)) {

               // Einfachr alter Erkennungsscript
               const advancedcontainer = document.querySelectorAll(':is(div, form, dialog, section, aside, li, footer, app-cookie, cms-cookie-bar):is([class*="cookie" i], [id*="cookie" i], [aria-labelledby*="cookie" i], [aria-label*="cookie" i], [class*="keks" i], [id*="keks" i], [class*="consent" i], [id*="consent" i], [aria-labelledby*="consent" i], [aria-label*="consent" i], [class*="privacy" i], [id*="privacy" i], [class*="c-disclaimer" i], [class*="cc_banner" i], [id*="cc_banner"], [class*="cc_overlay"], [id*="cc_overlay"], [class*="cc-overlay"], [id*="cc-overlay"], [class*="gdpr"], [id*="gdpr"], [class*="dsgvo"], [id*="dsgvo"], [class^="cc-banner"], [id^="cc-banner"], [class^="cc-notification"], [id^="cc-notification"], [data-testid="consent-banner" i], [cc_data], cookie-law):not([style*="display: none !important"], [style*="visibility: hidden !important"], :empty, .default-layout.cookie-is-shown)');

               for (let i = 0; i < advancedcontainer.length; i++) {
                  const a = advancedcontainer[i];
                  const b = window.getComputedStyle(a).getPropertyValue('position');
                  let bp = a.parentElement;
                  let bc = a.children[0];
                  if (bp) {
                     bp = window.getComputedStyle(a.parentElement).getPropertyValue('position');
                  }
                  if (bc) {
                     bc = window.getComputedStyle(a.children[0]).getPropertyValue('position');
                  }
                  if (sichtbarkeitsprüfung(a) === true && (b === 'fixed' || b === 'sticky' || bp === 'fixed' || bp === 'sticky' || bc === 'fixed' || bc === 'sticky' || window.getComputedStyle(document.querySelector('body')).getPropertyValue('overflow') === 'hidden' || a.outerHTML.toLowerCase().includes('cookie') === true) && a.childElementCount >= 1 && a.innerText.length > 10) {
                     const text = a.innerText.toLowerCase();
                     if (a.querySelector('a[href*="cookie" i]') !== null ||
                        (document.documentElement.lang && document.documentElement.lang.toLowerCase() !== 'en' && !document.documentElement.lang.toLowerCase().startsWith('en-') && text.includes('cookie')) ||
                        text.includes('wir respektieren ihre privatsphäre') ||
                        text.includes('wir schätzen ihre privatsphäre') ||
                        text.includes('cookie einstellungen') ||
                        text.includes('cookie-einstellungen') ||
                        text.includes('privatsphären-einstellungen') ||
                        text.includes('privatsphäre-einstellungen') ||
                        text.includes('wir verwenden tools,') ||
                        text.includes('verwendet cookies') ||
                        text.includes('verwenden wir cookies') ||
                        text.includes('website uses cookies') ||
                        text.includes('website stores cookies') ||
                        text.includes('site uses cookies') ||
                        text.includes('uses cookies from') ||
                        text.includes('uses cookies to personalize') ||
                        text.includes('uses cookies to enhance the user') ||
                        text.includes('we use cookies') ||
                        text.includes('cookies and similar technology') ||
                        text.includes('we use essential cookies') ||
                        text.includes('cookie policy') ||
                        text.includes('cookie privacy') ||
                        text.includes('cookie notice privacy') ||
                        text.includes('cookies notice') ||
                        text.includes('website makes use of cookies') ||
                        text.includes('manage cookies') ||
                        text.includes('accept all cookies') ||
                        text.includes('accept the use of cookies') ||
                        text.includes('to improve the quality of our site') ||
                        text.includes('you agree with our cookie policy') ||
                        text.includes('Cookie instellingen') ||
                        text.includes('rejeitar cookies') ||
                        text.includes('stosujemy pliki cookies') ||
                        text.includes('ta strona korzysta z ciasteczek') ||
                        text.includes('bruker informasjons­kapsler') ||
                        text.includes('ملفات تعريف الارتباط') ||
                        text.includes('نستخدم ملفات') ||
                        text.includes('çerez konumlandırmaktayız')) {
                        // Buttons suchen und klicken.
                        const knöpfe = a.querySelectorAll('button:not(:disabled), a:not([href*="/"]), a[href*="optout" i], a[class*="button"], [role="button"], input[type="button"], input[type="submit"], span[class*="button"], :is([class*="dismiss"], [id*="dismiss" i], [class*="preferences" i], [id*="preferences" i], [class*="submit"], [id*="submit"], [class*="close" i], [id*="close" i], [class*="reject" i], [id*="reject" i], [class*="decline" i], [id*="decline" i], [class*="mandatory"], [id*="mandatory"], [class*="accept" i], [id*="accept" i], [data-action*="accept" i], [id*="ausblenden" i], [class*="ausblenden" i], [id*="essential" i], [class*="essential" i], [id*="chose_no"], [class*="chose_no"], [title*="blehnen"]):is(span, div):not(:has(button, a, input[type="checkbox"]))');
                        const akzeptierenknopf = a.querySelector(':is(button, [role="button"], [type="button"], [class*="button"]):is([class*="accept" i], [id*="accept" i], [class*="akzeptier" i], [id*="akzeptier" i], [data-action*="accept" i]):not(:has(> *))');
                        const ablehnknopf = a.querySelector(':is(button, [role="button"], [type="button"], [class*="button"]):is([class*="decline" i], [id*="decline" i], [class*="ablehnen" i], [id*="ablehnen" i], [class*="reject" i], [data-action*="decline" i], [data-action*="reject" i]):not(:has(> *))');
                        if (knöpfe.length > 0) {
                           let finalerknopf;
                           let gewichtung = 3;
                           for (let k = 0; k < knöpfe.length; k++) {
                              const a = knöpfe[k];
                              if (sichtbarkeitsprüfung(a)) {
                                 // console.log(a)
                                 let knöpfetext = knöpfe[k].innerText.toLowerCase();
                                 // Knöpfe start
                                 const knöpfevalue = knöpfe[k].value;
                                 if (knöpfevalue && knöpfetext.length <= 1) {
                                    knöpfetext = knöpfevalue;
                                 }
                                 const b = knöpfe[k];
                                 if (knöpfetext.length <= 45) {
                                    // Text
                                    const knöpfetextgeprüft = knöpfetextcheck(b);
                                    if (cookieeinstellung !== 'akzeptieren') {
                                       if (knöpfetextgeprüft === 'ablehntext') {
                                          cookiebannerstatus.knopfstatus = 'abgelehnt';
                                          finalerknopf = knöpfe[k];
                                          break;
                                       } else if (knöpfetextgeprüft === 'speichertext') {
                                          cookiebannerstatus.knopfstatus = 'gespeichert';
                                          finalerknopf = knöpfe[k];
                                          gewichtung = 1;
                                       } else if (attributchecker(a) && gewichtung > 1) {
                                          cookiebannerstatus.knopfstatus = 'geschlossen';
                                          finalerknopf = knöpfe[k];
                                          gewichtung = 2;
                                       } else if (knöpfetextgeprüft === 'akzeptiertext' && gewichtung > 2) {
                                          cookiebannerstatus.knopfstatus = 'akzeptiert';
                                          finalerknopf = knöpfe[k];
                                          gewichtung = 3;
                                       }
                                    } else {
                                       if (knöpfetextgeprüft === 'akzeptiertext') {
                                          cookiebannerstatus.knopfstatus = 'akzeptiert';
                                          finalerknopf = knöpfe[k];
                                          break;
                                       } else if (attributchecker(a)) {
                                          cookiebannerstatus.knopfstatus = 'geschlossen';
                                          finalerknopf = knöpfe[k];
                                          gewichtung = 1;
                                       } else if (knöpfetextgeprüft === 'speichertext' && gewichtung > 1) {
                                          cookiebannerstatus.knopfstatus = 'gespeichert';
                                          finalerknopf = knöpfe[k];
                                          gewichtung = 2;
                                       } else if (knöpfetextgeprüft === 'ablehntext' && gewichtung > 2) {
                                          cookiebannerstatus.knopfstatus = 'abgelehnt';
                                          finalerknopf = knöpfe[k];
                                          gewichtung = 3;
                                       }
                                    }
                                 }
                              }
                           }
                           if (!finalerknopf) {
                              if (cookieeinstellung !== 'akzeptieren') {
                                 if (ablehnknopf) {
                                    if (sichtbarkeitsprüfung(ablehnknopf)) {
                                       cookiebannerstatus.knopfstatus = 'ablehnen';
                                       finalerknopf = ablehnknopf;
                                    }
                                 } else if (akzeptierenknopf) {
                                    if (sichtbarkeitsprüfung(akzeptierenknopf)) {
                                       cookiebannerstatus.knopfstatus = 'akzeptiert';
                                       finalerknopf = akzeptierenknopf;
                                    }
                                 }
                              } else {
                                 if (akzeptierenknopf) {
                                    if (sichtbarkeitsprüfung(akzeptierenknopf)) {
                                       cookiebannerstatus.knopfstatus = 'akzeptiert';
                                       finalerknopf = akzeptierenknopf;
                                    }
                                 } else if (ablehnknopf) {
                                    if (sichtbarkeitsprüfung(ablehnknopf)) {
                                       cookiebannerstatus.knopfstatus = 'ablehnen';
                                       finalerknopf = ablehnknopf;
                                    }
                                 }
                              }
                           }
                           if (finalerknopf) {
                              altererkennungsscriptausgeführt = true;
                              cookiebannerfinalakzeptiert = true;
                              cookiebannerfinalakzeptiertcounter = 0;
                              cookiebannerfinalakzeptiertversuche++;
                              // console.log(finalerknopf);
                              forcesessionstorage();
                              cookiebannerstatus.suchstatus = 'gefunden';
                              cookiebannerstatus.anbieter = _('providerSelfProgrammedBasicDetectionMessage');
                              console.log('[Cookie auto decline] Detected (alter Erkennungsscript): Unbekannter Cookie Banner.');
                              finalerknopf.click();
                              break;
                           } else if (cookiebannerfinalakzeptiert === true) {
                              beenden();
                           }
                        }
                     }
                  }
               }

               // ENDE Einfacher alter Erkennungsscript

               // Erweiterte Cookie Banner Erkennung
               if (erweitertecookiebannererkennungaktiviert === true && altererkennungsscriptausgeführt === false) {
                  advancedslowdown++;
                  if (advancedslowdown >= 3) {
                     advancedslowdown = 0;
                  }

                  if (advancedslowdown === 0) {
                     let elemente = document.querySelectorAll('body *:not(abbr, address, applet, area, audio, audio *, b, base, basefront, bdi, bdo, big, blockquote, br, button, button *, canvas, caption, cite, cite *, code, code *, col, colgroup, colgroup *, data, datalist, datalist *, dd, del, details, details *, dfn, dir, dl, dt, en, embed, fieldset, fieldset *, figcaption, font, frame, frameset, iframe, h1, h2, h3, h4, h5, h6, hgroup, hgroup *, hr, i, img, img *, ins, kbd, input, label, legend, li, li *, link, map, map *, mark, menu, menu *, meta, meter, nav, noframes, noscript, object, ol, ol *, optgroup, option, output, p, param, picture, picture *, pre, progress, q, rp, rt, ruby, ruby *, s, samp, samp *, script, search, search *, select, select *, small, source, strike, style, sub, summary, sup, template, template *, textarea, time, title, track, tt, var, video, video *, wbr, a, a *, u, ul, svg, svg *, defs, [style*="display: none !important"], [style*="visibility: hidden !important"], [data-nocookies], :disabled, *:has(nav, address, video, audio, input:not([type="button"], [type="checkbox"], [type="hidden"], [type="radio"], [type="image"], [type="submit"], [type="text"], [type="url"]), a[href*="newsletter"]))');
                     elemente = Array.from(elemente);

                     // console.log('-----------------------');

                     for (let i = 0; i < elemente.length; i++) {
                        if (elemente[i].shadowRoot) {
                           // console.log(elemente[i])
                           let shadowrootelemente = elemente[i].shadowRoot.querySelectorAll('*:not(html, body, head, head *, abbr, address, applet, area, audio, audio *, b, base, basefront, bdi, bdo, big, blockquote, br, button, button *, canvas, caption, cite, cite *, code, code *, col, colgroup, colgroup *, data, datalist, datalist *, dd, del, details, details *, dfn, dir, dl, dt, en, embed, fieldset, fieldset *, figcaption, font, frame, frameset, iframe, h1, h2, h3, h4, h5, h6, hgroup, hgroup *, hr, i, img, img *, ins, kbd, input, label, legend, li, li *, link, map, map *, mark, menu, menu *, meta, meter, nav, noframes, noscript, object, ol, ol *, optgroup, option, output, p, param, picture, picture *, pre, progress, q, rp, rt, ruby, ruby *, s, samp, samp *, script, search, search *, select, select *, small, source, strike, style, sub, summary, sup, template, template *, textarea, time, title, track, tt, var, video, video *, wbr, a, a *, u, ul, svg, svg *, defs, [style*="display: none !important"], [style*="visibility: hidden !important"], :empty, :disabled, *:has(nav, address, video, audio, input:not([type="button"], [type="checkbox"], [type="hidden"], [type="radio"], [type="submit"], [type="image"], [type="text"], [type="url"])))');
                           shadowrootelemente = Array.from(shadowrootelemente);
                           elemente = elemente.concat(shadowrootelemente);
                        }

                        // console.log(elemente)
                        const elementtext = elemente[i].innerText.toLowerCase();
                        const elementhtml = elemente[i].outerHTML.toLowerCase();
                        const webseitesprache = document.documentElement.lang.toLowerCase();
                        if (elementtext && elementtext.length >= 50 && elementtext.length < 3500 && (elementhtml.includes('cookie') || (document.documentElement.lang && webseitesprache === 'tr' && elementtext.includes('çerezler')))) {
                           // console.log(elemente[i])
                           const elementscripte = elemente[i].querySelectorAll('script:not([type="application/json"])');
                           const inputs = elemente[i].querySelectorAll('input:not([type="button"], [type="checkbox"], [type="hidden"], [type="radio"], [type="submit"], [type="image"])');
                           let inputs2 = [];
                           for (let k = 0; k < inputs.length; k++) {
                              if (inputs[k].checkVisibility() === true) {
                                 inputs2.push(inputs[k]);
                              }
                           }
                           const sprungmarken = elemente[i].querySelectorAll('a[href^="#"]:not([href$="#"])');
                           let sprungmarken2 = false;
                           let anzahlsprungmarken = 0;
                           for (let k = 0; k < sprungmarken.length; k++) {
                              if (document.getElementById(sprungmarken[k].getAttribute('href').replace('#', '')) && sprungmarken[k].outerHTML.toLowerCase().includes('cookie') === false) {
                                 anzahlsprungmarken++;
                                 if (anzahlsprungmarken > 1) {
                                    sprungmarken2 = true;
                                 }
                                 break;
                              }
                           }
                           const bilder = elemente[i].querySelectorAll('img[src]');
                           let großesbild = false;
                           for (let i = 0; i < bilder.length; i++) {
                              if (bilder[i].height >= 350 || bilder[i].width >= 350) {
                                 großesbild = true;
                              }
                           }
                           if (elementscripte.length <= 1 && (elemente[i].getElementsByTagName('a:not([id*="cookie"], [class*="cookie"])').length < 6 || elementhtml.toLowerCase().includes('privacy') || elementhtml.includes('datenschutz')) && elemente[i].querySelectorAll('img:not([src$=".svg"])').length < 4 && großesbild === false && elemente[i].querySelectorAll('button:not([class*="dropdown"]), input[type="button"]').length < 12 && elemente[i].querySelectorAll('a:has(> *:not(svg, i, strong, p) > *:not(svg, i, strong, p) > *:not(svg, i, strong, p))').length === 0 && inputs2.length === 0 && sprungmarken2 === false) {
                              // console.log(elemente[i])

                              const elementcss = window.getComputedStyle(elemente[i]);
                              const elementrect = elemente[i].getBoundingClientRect();
                              const bodycss = window.getComputedStyle(document.querySelector('body'));

                              if ((elemente[i].getRootNode().toString() === '[object ShadowRoot]' || elementcss.getPropertyValue('position') === 'fixed' || elementcss.getPropertyValue('position') === 'sticky' || (bodycss.getPropertyValue('overflow') === 'hidden' && (parseInt(bodycss.getPropertyValue('height')) > window.innerHeight || bodycss.getPropertyValue('max-height') !== 'none'))) && (elementrect.top + 100) > 5) {
                                 const a = elemente[i];
                                 if (sichtbarkeitsprüfung(a) === true) {
                                    // console.log(elemente[i]);
                                    let finalercontainer;
                                    // Große Banner auf Datenschutz Links überprüfen und bei kleinen Bannern weglassen
                                    if (parseInt(elementcss.getPropertyValue('height')) < 200 || (parseInt(elementcss.getPropertyValue('height')) < 550 && parseInt(elementcss.getPropertyValue('width')) < 550)) {
                                       finalercontainer = elemente[i];
                                    } else if (attributcheckeradvancedchecker(a) === true || elemente[i].outerHTML.toLowerCase().includes('cookie')) {
                                       finalercontainer = elemente[i];
                                    }
                                    if (finalercontainer) {
                                       // console.log(finalercontainer);
                                       const knöpfe = finalercontainer.querySelectorAll('button:not(:disabled), [type="button"]:not(button), [role="button"]:not(button), a:not([href^="https://"], [href^="http://"]), a:is([class*="button" i], [id*="button" i], [class*="btn"], [id*="btn"]), *:not(:has(> *:not(p:only-child))):not(abbr, address, applet, area, audio, audio *, b, base, basefront, bdi, bdo, big, blockquote, br, button, button *, canvas, caption, cite, cite *, code, code *, col, colgroup, colgroup *, data, datalist, datalist *, dd, del, details, details *, dfn, dir, dl, dt, en, embed, fieldset, fieldset *, figcaption, font, frame, frameset, iframe, h1, h2, h3, h4, h5, h6, hgroup, hgroup *, hr, i, img, img *, ins, kbd, label, legend, li, link, map, map *, mark, menu, menu *, meta, meter, nav, noframes, noscript, object, ol, ol *, optgroup, option, output, p, param, picture, picture *, pre, progress, q, rp, rt, ruby, ruby *, s, samp, samp *, script, search, search *, select, select *, small, source, strike, style, sub, summary, sup, template, template *, textarea, time, title, track, tt, var, video, video *, wbr, a, a *, u, ul, svg, svg *, defs, [style*="display: none !important"], [style*="visibility: hidden !important"], footer, aside, dialog, :disabled, [class*="toggle"], [class*="switch"], [class*="checkmark"]), div:has(> span:only-child:empty)');

                                       let gewichtung = 3;
                                       let finalerknopf;

                                       for (let k = 0; k < knöpfe.length; k++) {
                                          const a = knöpfe[k];
                                          const knöpfeclassid = a.classList.toString().toLowerCase() + ' ' + a.id.toLowerCase();
                                          let knöpfeclassidisbutton = false;
                                          if (knöpfeclassid.includes('button') || knöpfeclassid.includes('btn') || knöpfe[k].nodeName === 'BUTTON') {
                                             knöpfeclassidisbutton = true;
                                          }
                                          let knöpfetext = knöpfe[k].innerText.toLowerCase().trim();
                                          const knopfcss = window.getComputedStyle(knöpfe[k]);
                                          if (sichtbarkeitsprüfung(a) === true && knöpfe[k].offsetHeight < 70 && (knöpfe[k].attributes.length >= 1 || knöpfeclassidisbutton) && (knöpfe[k].offsetWidth < 390 || (knöpfe[k].offsetWidth < 470 && knöpfetext.length > 40) || knöpfe[k].nodeName === 'BUTTON' || (knöpfe[k].parentElement.nodeName !== 'p' && knöpfe[k].parentElement.innerText.length < 150 && knöpfe[k].offsetHeight > 25)) && (knopfcss.getPropertyValue('cursor') === 'pointer' || knöpfeclassidisbutton) && (knöpfe[k].nodeName !== 'A' || knöpfeclassidisbutton === true || (knöpfe[k].getAttribute('href') && knöpfe[k].getAttribute('href').includes('/') === false) || knopfcss.getPropertyValue('border').startsWith('0px') === false || knopfcss.getPropertyValue('padding') !== '0px')) {
                                             // Knöpfe start
                                             const knöpfevalue = knöpfe[k].value;
                                             if (knöpfevalue && knöpfetext.length <= 1) {
                                                knöpfetext = knöpfevalue;
                                             }
                                             const b = knöpfe[k];
                                             if (knöpfetext.length <= 45) {
                                                // Text
                                                const knöpfetextgeprüft = knöpfetextcheck(b);
                                                if (cookieeinstellung !== 'akzeptieren') {
                                                   if (knöpfetextgeprüft === 'ablehntext') {
                                                      cookiebannerstatus.knopfstatus = 'abgelehnt';
                                                      finalerknopf = knöpfe[k];
                                                      break;
                                                   } else if (knöpfetextgeprüft === 'speichertext') {
                                                      cookiebannerstatus.knopfstatus = 'gespeichert';
                                                      finalerknopf = knöpfe[k];
                                                      gewichtung = 1;
                                                   } else if (attributchecker(a) && gewichtung > 1) {
                                                      cookiebannerstatus.knopfstatus = 'geschlossen';
                                                      finalerknopf = knöpfe[k];
                                                      gewichtung = 2;
                                                   } else if (knöpfetextgeprüft === 'akzeptiertext' && gewichtung > 2) {
                                                      cookiebannerstatus.knopfstatus = 'akzeptiert';
                                                      finalerknopf = knöpfe[k];
                                                      gewichtung = 3;
                                                   }
                                                } else {
                                                   if (knöpfetextgeprüft === 'akzeptiertext') {
                                                      cookiebannerstatus.knopfstatus = 'akzeptiert';
                                                      finalerknopf = knöpfe[k];
                                                      break;
                                                   } else if (attributchecker(a)) {
                                                      cookiebannerstatus.knopfstatus = 'geschlossen';
                                                      finalerknopf = knöpfe[k];
                                                      gewichtung = 1;
                                                   } else if (knöpfetextgeprüft === 'speichertext' && gewichtung > 1) {
                                                      cookiebannerstatus.knopfstatus = 'gespeichert';
                                                      finalerknopf = knöpfe[k];
                                                      gewichtung = 2;
                                                   } else if (knöpfetextgeprüft === 'ablehntext' && gewichtung > 2) {
                                                      cookiebannerstatus.knopfstatus = 'abgelehnt';
                                                      finalerknopf = knöpfe[k];
                                                      gewichtung = 3;
                                                   }
                                                }
                                             }
                                             // Knöpfe ende
                                          }
                                       }
                                       if (finalerknopf) {
                                          cookiebannerfinalakzeptiert = true;
                                          cookiebannerfinalakzeptiertcounter = 0;
                                          cookiebannerfinalakzeptiertversuche++;
                                          // console.log(finalerknopf);
                                          forcesessionstorage();
                                          cookiebannerstatus.suchstatus = 'gefunden';
                                          cookiebannerstatus.anbieter = _('providerSelfProgrammedAdvancedDetectionMessage');
                                          console.log('[Cookie auto decline] Detected (erweiterte Erkennung): Unbekannter Cookie Banner.');
                                          finalerknopf.click();
                                          break;
                                       } else if (cookiebannerfinalakzeptiert === true) {
                                          beenden();
                                       }
                                    }
                                 }
                              }
                           }
                        }
                     }
                  }
               }
               // ENDE Erweiterte Cookie Banner Erkennung
            } else {
               advancedcounter++;
            }
            if (cookiebannerfinalakzeptiertcounter >= 7) {
               beenden();
            }
            // Cookie Banner Status Cookie aktualisieren
            updatecookiebannerstatuscookie();

            // Ende Suchintervall
         };

         // Spezifisch

         const regeln = [{
            seite: 'consent.google.ac,consent.google.ae,consent.google.at,consent.google.be,consent.google.bg,consent.google.by,consent.google.ca,consent.google.ch,consent.google.cl,consent.google.co.id,consent.google.co.il,consent.google.coIn,consent.google.co.jp,consent.google.co.ke,consent.google.co.kr,consent.google.co.nz,consent.google.co.th,consent.google.co.uk,consent.google.co.ve,consent.google.co.za,consent.google.com,consent.google.com.ar,consent.google.com.au,consent.google.com.br,consent.google.com.co,consent.google.com.ec,consent.google.com.eg,consent.google.com.hk,consent.google.com.mx,consent.google.com.my,consent.google.com.pe,consent.google.com.ph,consent.google.com.pk,consent.google.com.py,consent.google.com.sa,consent.google.com.sg,consent.google.com.tr,consent.google.com.tw,consent.google.com.ua,consent.google.com.uy,consent.google.com.vn,consent.google.cz,consent.google.de,consent.google.dk,consent.google.dz,consent.google.ee,consent.google.es,consent.google.fi,consent.google.fr,consent.google.gr,consent.google.hr,consent.google.hu,consent.google.ie,consent.google.it,consent.google.lt,consent.google.lv,consent.google.nl,consent.google.no,consent.google.pl,consent.google.pt,consent.google.ro,consent.google.rs,consent.google.ru,consent.google.se,consent.google.sk,consent.google.coIn',
            selectorablehnen: 'div:first-child > form[action^="https://consent.google."][action$="/save"]:first-child:has(+ form:last-child) > div > div > button',
            selectorakzeptieren: 'div:first-child > form[action^="https://consent.google."][action$="/save"]:first-child + form:last-child > div > div > button',
            selectormobileablehnen: 'div:first-child + div > form[action^="https://consent.google."][action$="/save"]:first-child + form:last-child > div > div > button',
            selectormobileakzeptieren: 'div:first-child + div > form[action^="https://consent.google."][action$="/save"]:first-child > div > div > button'
         }, {
            seite: 'consent.youtube.com',
            selectorablehnen: 'div > div:has(> div:only-child > button[aria-label][role="link"]) + form[action="https://consent.youtube.com/save"]:has(+ form:last-child) > div > div > button',
            selectorakzeptieren: 'div > div:has(> div:only-child > button[aria-label][role="link"]) + form[action="https://consent.youtube.com/save"] + form:last-child > div > div > button',
            selectormobileablehnen: 'div + div > form[action="https://consent.youtube.com/save"] + form[action="https://consent.youtube.com/save"]:has(+ div:last-child > div > button[aria-label][role="link"]) > div > div > button',
            selectormobileakzeptieren: 'div + div > form[action="https://consent.youtube.com/save"]:first-child > div > div > button'
         }, {
            seite: 'consent.yahoo.com',
            selectorablehnen: '#consent-page button.reject-all[name="reject"][value="reject"]',
            selectorakzeptieren: 'button.accept-all[name="agree"][value="agree"]'
         }, {
            seite: 'youtube.com',
            selectorablehnen: 'tp-yt-paper-dialog#dialog div.eom-buttons.ytd-consent-bump-v2-lightbox ytd-button-renderer:first-child button[aria-label]',
            selectorakzeptieren: 'tp-yt-paper-dialog#dialog div.eom-buttons.ytd-consent-bump-v2-lightbox ytd-button-renderer:first-child + ytd-button-renderer button[aria-label]',
            checkcookie: 'SOCS',
            noframe: true
         }, {
            seite: 'ecb.europa.eu',
            selectorablehnen: '#cookieConsent button.floatRight',
            selectorakzeptieren: '#cookieConsent button.floatLeft',
            checkstorage: 'cookieChoice'
         }, {
            seite: 'europa.eu',
            selectorablehnen: '#cookie-consent-banner a[href="#refuse"]',
            selectorakzeptieren: '#cookie-consent-banner a[href="#accept"]',
            checkcookie: 'consent_cookies'
         }, {
            seite: 'warnung.bund.de',
            checkstorage: 'datahintAccept',
            selectorablehnen: '.datahint #data-hint-decline-button.decline',
            selectorakzeptieren: '.datahint #data-hint-accept-button'
         }, {
            seite: 'deutsche-islam-konferenz.de,digital-fuer-deutschland.de,bvl.bund.de,auslandsschulwesen.de,bamf.de,thw.de,itzbund.de,bafin.de',
            checkcookie: 'cookiebanner',
            selectorablehnen: '#cookiebanner .js-close-banner',
            selectorakzeptieren: '#cookiebanner .js-close-banner.consentToAll'
         }, {
            seite: 'wochenspiegelonline.de',
            selectorablehnen: 'button.btn--secondary[name*="[consent][deny]"]',
            selectorakzeptieren: 'button.select-all[name*="[consent][selectAll]"]'
         }, {
            seite: 'meta.com',
            checkstorage: 'Session',
            selectorablehnen: 'div[role="dialog"][aria-label*="ookies"] > div:first-child > div:first-child > div:first-child > div:last-child > div:first-child > div:first-child > div:first-child > div:first-child > div:first-child > div:first-child > div:first-child > div:first-child[role="button"][tabindex]',
            selectorakzeptieren: 'div[role="dialog"][aria-label*="ookies"] > div:first-child > div:first-child > div:first-child > div:last-child > div:first-child > div:first-child > div:first-child > div:first-child > div:first-child > div:last-child > div:last-child > div:only-child > div:only-child > div:last-child[role][data-visualcompletion]'
         }, {
            seite: 'm.facebook.com',
            checkstorage: 'wd',
            selectorablehnen: '[data-testid="cookie-policy-manage-dialog"] [data-cookiebanner="accept_only_essential_button"], div[role="dialog"][aria-modal="true"] > div:only-child > div:first-child[style^="transform:"] > div:only-child > div:last-child > div:only-child > div:first-child > div[role="button"][aria-label] -> div[role="dialog"][aria-modal="true"] > div:only-child > div:first-child + div:not([aria-hidden="true"]) > div:only-child > div:only-child > div:last-child > div:only-child > div:first-child > div[role="button"][aria-label]',
            selectorakzeptieren: '[data-testid="cookie-policy-manage-dialog"] [data-cookiebanner="accept_button"], div[role="dialog"][aria-modal="true"] > div:only-child > div:first-child[style^="transform:"] > div:only-child > div:last-child > div:only-child > div:last-child > div[role="button"][aria-label]',
            noframe: true
         }, {
            seite: 'facebook.com',
            checkstorage: 'wd',
            selectorablehnen: 'div[role="dialog"][aria-modal="true"] > div:only-child > div:last-child > div:only-child > div:first-child > div[role="button"]:is([aria-label*="ookies"], [aria-label*="lapukus"]), div[role="dialog"][aria-modal="true"] > div:only-child > div:first-child[style^="transform:"] > div:only-child > div:last-child > div:only-child > div:first-child > div[role="button"][aria-label] -> div[role="dialog"][aria-modal="true"] > div:only-child > div:first-child + div:not([aria-hidden="true"]) > div:only-child > div:only-child > div:last-child > div:only-child > div:first-child > div[role="button"][aria-label]',
            selectorakzeptieren: 'div[role="dialog"][aria-modal="true"] > div:only-child > div:last-child > div:only-child > div:last-child > div[role="button"]:is([aria-label*="ookies"], [aria-label*="lapukus"]), div[role="dialog"][aria-modal="true"] > div:only-child > div:first-child[style^="transform:"] > div:only-child > div:last-child > div:only-child > div:last-child > div[role="button"][aria-label]',
            noframe: true
         }, {
            seite: 'threads.net,threads.com',
            checkstorage: 'Session',
            selectorablehnen: 'div[role="dialog"] div[aria-hidden="false"] div[role="button"][tabindex="0"]:first-child + div[role="button"][tabindex="0"]:last-child',
            selectorakzeptieren: 'div[role="dialog"] div[aria-hidden="false"] div[role="button"][tabindex="0"]:first-child:has(+ div[role="button"][tabindex="0"]:last-child)'
         }, {
            seite: 'instagram.com',
            selectorablehnen: 'div[style="display: flex; flex-direction: column; height: 100%; max-width: 100%;"] > button[tabindex] + button[tabindex]:not([disabled=""]), div[style="display: flex; flex-direction: column; height: 100%; max-width: 100%;"] > div:last-child > div:last-child > button:only-child:not([disabled=""])',
            selectorakzeptieren: 'div[style="display: flex; flex-direction: column; height: 100%; max-width: 100%;"] > button[tabindex]:has(+ button[tabindex]:not([disabled=""])), div[style="display: flex; flex-direction: column; height: 100%; max-width: 100%;"] > div:last-child > div:first-child > div:only-child > button:only-child:not([disabled=""])'
         }, {
            seite: 'linkedin.com',
            selectorablehnen: '.artdeco-global-alert-action__wrapper > button[action-type="DENY"][data-control-name^="ga-cookie.consent.deny"]',
            selectorakzeptieren: '.artdeco-global-alert-action__wrapper > button[action-type="ACCEPT"][data-control-name^="ga-cookie.consent.accept"]'
         }, {
            seite: 'office.com,microsoft.com,minecraft.net,skype.com,xbox.com',
            selectorablehnen: '#wcpConsentBannerCtrl button[type="button"]:nth-of-type(2)',
            selectorakzeptieren: '#wcpConsentBannerCtrl button[type="button"]:nth-of-type(1)'
         }, {
            seite: 'etsy.com',
            checkcookie: ' p=',
            selectorablehnen: '#gdpr-single-choice-overlay button[data-gdpr-single-choice-reject="true"]',
            selectorakzeptieren: '#gdpr-single-choice-overlay button[data-gdpr-single-choice-accept="true"]'
         }, {
            seite: 'rp-online.de,wz.de,ga.de',
            checkcookie: 'OptanonAlertBoxClosed',
            selectorakzeptieren: '#consentAccept'
         }, {
            seite: 'gamestar.de',
            selectorakzeptieren: '#cmp-modal a.cmp-accept.no-link[href="#"]',
         }, {
            seite: 'twitch.tv',
            selectorablehnen: 'button[data-a-target="consent-banner-manage-preferences"] -> button[data-a-target="consent-modal-save"]',
            selectorakzeptieren: 'button[data-a-target="consent-banner-accept"]',
            noframe: true
         }, {
            seite: 'roblox.com',
            checkcookie: 'RBXcb',
            selectorablehnen: '#cookie-banner-wrapper button.btn-secondary-lg[type="button"]',
            selectorakzeptieren: '#cookie-banner-wrapper button[class^="btn-cta-lg cookie-btn btn-primary-md"]'
         }, {
            seite: 'ebay.com,ebay.de',
            selectorablehnen: '#gdpr-banner .gdpr-banner-actions > button#gdpr-banner-decline',
            selectorakzeptieren: '#gdpr-banner .gdpr-banner-actions > button#gdpr-banner-accept',
            countdown: 1500,
            noframe: true
         }, {
            seite: 'bbc.com',
            selectorakzeptieren: '#cookiePrompt > section.bbccookies-banner button#bbccookies-continue-button.continue-button'
         }, {
            seite: 'music.amazon.de,music.amazon.com,music.amazon.co.uk,music.amazon.it,music.amazon.es,music.amazon.com.tr,music.amazon.pl',
            selectorablehnen: '#banner music-button[variant="outline"] >> button[class="button music-t1"]',
            selectorakzeptieren: '#banner music-button[variant="solid"] >> button[class="button music-t1"]',
            checkcookie: 'com.amazon.tempo.cookies.status'
         }, {
            seite: 'luna.amazon.de,luna.amazon.com,luna.amazon.co.uk,luna.amazon.it,luna.amazon.es,luna.amazon.com.tr,luna.amazon.pl',
            selectorakzeptieren: '#cookie_consent_dialog button#item_cookie_consent_accept_button',
            checkcookie: 'com.amazon.tempo.cookies.status'
         }, {
            seite: 'amazon.de,amazon.com,amazon.co.uk,amazon.it,amazon.es,amazon.com.tr,amazon.pl',
            selectorablehnen: 'form#sp-cc button#sp-cc-rejectall-link, #cos-banner input#sp-cc-rejectall-link',
            selectorakzeptieren: '#cos-banner input#sp-cc-accept',
            keinesichtbarkeitsprüfung: true
         }, {
            seite: 'brightdata.com',
            checkcookie: 'brd_cookie_consent',
            selectorablehnen: '.cookies_popup_overlay .cookies_bar_popup_btns a#brd_cookies_bar_settings[role="button"]',
            selectorakzeptieren: '.cookies_popup_overlay .cookies_bar_popup_btns a#brd_cookies_bar_accept[role="button"]'
         }, {
            seite: 'wirkaufendeinauto.de',
            checkstorage: 'gdpr_preferences',
            selectorablehnen: 'form[action="/v1/gdpr-preferences/"] div[class^="GDPRBanner-module_banner_"] [data-qa-selector="gdpr-banner-configuration-button"][role="button"] -> form[action="/v1/gdpr-preferences/"] div[class^="GDPRBanner-module_banner_"] [data-qa-selector="gdpr-banner-accept-selected-button"][role="button"]',
            selectorakzeptieren: 'form[action="/v1/gdpr-preferences/"] button[data-qa-selector="gdpr-banner-accept-all-button"]'
         }, {
            seite: 'auto.de',
            checkstorage: 'cookieConfig',
            selectorablehnen: '.modalWrapper > .modalContent > .logoContainer > button.modalBtnAccept',
            selectorakzeptieren: '.modalWrapper > .modalContent > .modalBtnContainer > button.modalBtnAccept'
         }, {
            seite: 'keyed.de',
            checkcookie: 'hellotrust_cookies_accepted',
            selectorablehnen: '#hellotrust_cookie_popup input.htc_btn_only_necessary_checked[type="button"]',
            selectorakzeptieren: '#hellotrust_cookie_popup input#hellotrust_cookies_btn_accept__first'
         }, {
            seite: 'thomann.de',
            checkcookie: 'thomann_settings',
            selectorablehnen: '.cookie-consent-spice button.consent-button.js-decline-all-cookies[type="button"]',
            selectorakzeptieren: '.cookie-consent-spice button.consent-button.js-accept-all-cookies[type="button"]'
         }, {
            seite: 'computerbase.de',
            checkcookie: 'OptanonAlertBoxClosed',
            selectorakzeptieren: 'dialog.consent button#cookie-consent-button.js-consent-accept-button'
         }, {
            seite: 'diebayerische.de',
            checkcookie: 'cookieConsent',
            selectorablehnen: '#cookie-consent-layer button.js_cc-accept-custom',
            selectorakzeptieren: '#cookie-consent-layer button.js_cc-accept-all'
         }, {
            seite: 'xnxx.com,xvideos.com',
            selectorablehnen: '#disclaimer_background button#disclaimer-reject_cookies-btn[onclick]',
            selectorakzeptieren: '#disclaimer_background button#disclaimer-accept_cookies-btn[onclick]'
         }, {
            seite: 'dehogerielen.be',
            checkcookie: 'CookieConsent',
            selectorablehnen: '#cookieconsent-banner button.cookieconsent-banner-accept-necessary-button',
            selectorakzeptieren: '#cookieconsent-banner button.cookieconsent-banner-accept-all-button'
         }, {
            seite: 'humboldtforum.org',
            checkcookie: 'acceptCookie',
            selectorablehnen: 'div#cookieConsent button.naked',
            selectorakzeptieren: 'div#cookieConsent button.border.black.prominent'
         }, {
            seite: 'asialadies.de',
            checkcookie: 'ladies-cookies-overlay',
            selectorablehnen: '#cookie-overlay button.cookies-decline',
            selectorakzeptieren: '#cookie-overlay button.cookies-accept'
         }, {
            seite: 'schleswig-holstein.de,bmbf.de,bmleh.de',
            checkcookie: 'gsbbanner',
            selectorablehnen: '#cookiebanner button.confirmSelection',
            selectorakzeptieren: '#cookiebanner button.consentToAll'
         }, {
            seite: 'mustijamirri.fi',
            checkcookie: 'mfi_consent_necessary',
            selectorablehnen: '#cookie_consent button#cookie_only_necessary2',
            selectorakzeptieren: '#cookie_consent button#submit_privacy_consent3'
         }, {
            seite: 'smythstoys.com',
            selectorablehnen: '[options="[object Object]"] button.ios-modal-cookie',
            selectorakzeptieren: '[options="[object Object]"] button.ios-modal-cookie + button'
         }, {
            seite: 'seb.lv',
            checkcookie: 'SEBConsents',
            selectorablehnen: '#cookiesMessage a.accept-mandatory',
            selectorakzeptieren: '#cookiesMessage a.accept-selected'
         }, {
            seite: 'kocbayi.com.tr',
            checkcookie: 'CMSCookieLevel',
            selectorakzeptieren: '.CookieConsent input.btn-approve[value="Onaylıyorum"]'
         }, {
            seite: 'fix-price.by',
            checkcookie: 'CookieConsent',
            selectorakzeptieren: '.cookies-bar button.button'
         }, {
            seite: 'check24.deX',
            checkcookie: 'c24consent',
            selectorablehnen: '.c24-cookie-consent-wrapper a.c24-cookie-consent-functional[onclick]',
            selectorakzeptieren: '.c24-cookie-consent-wrapper a.c24-cookie-consent-button[onclick="Check24.cookieBanner.c24consent.giveConsent(\'fam\')"]'
         }, {
            seite: 'tarifcheck.de,affiliate-deals.de',
            checkcookie: 'consent',
            selectorablehnen: '.modal button[data-cookie-dismiss-all]',
            selectorakzeptieren: '.modal button[data-cookie-accept-all]'
         }, {
            seite: 'thw-bufdi.de',
            checkcookie: 'gsbbanner',
            selectorablehnen: '#cookiebanner a[class="button right close"]',
            selectorakzeptieren: '#cookiebanner a.consentToAll'
         }, {
            seite: 'bremerhaven.de',
            checkcookie: 'GDPRp',
            selectorablehnen: '.cookie-banner form[action*="cookies"] > button[name="cookies_deny"]',
            selectorakzeptieren: '.cookie-banner form[action*="cookies"] > button[name="cookies_accept"]'
         }, {
            seite: 'steampowered.com,steamcommunity.com',
            selectorablehnen: '#cookiePrefPopup .buttonGroup > div#rejectAllButton',
            selectorakzeptieren: '#cookiePrefPopup .buttonGroup > div#acceptAllButton',
            countdown: 4502
         }, {
            seite: 'hema.com,hema.nl',
            checkcookie: 'landing_cookies_accepted',
            selectorakzeptieren: '.js-cookie-bar .js-close-cookies'
         }, {
            seite: 'pferdekaemper.de',
            checkcookie: 'optin',
            selectorablehnen: '#cookiebanner button.set_essential_cookies',
            selectorakzeptieren: '#cookiebanner button.set_all_cookies'
         }, {
            seite: 'fpv24.com',
            checkcookie: 'FPVCookiePolicy',
            selectorablehnen: '#cookieModal button.btn-secondary[type="submit"]',
            selectorakzeptieren: '#cookieModal button.btn-select-all'
         }, {
            seite: 'frankfurt.de',
            checkcookie: 'cookieAccepted',
            selectorablehnen: '#cookieModal button#btnCookiesAcceptMandatory',
            selectorakzeptieren: '#cookieModal button#btnCookiesAcceptAll'
         }, {
            seite: 'rems.de',
            checkcookie: 'cookieinfosettings',
            selectorakzeptieren: '#cookieModal button#modalclose3[type="button"]'
         }, {
            seite: 'sozialleistungen.info',
            checkcookie: 'slinfo_cookieHash',
            selectorakzeptieren: '#toast-container button.cookie-ok'
         }, {
            seite: 'caritasnet.de',
            checkcookie: 'privacy-options-confirmed',
            selectorablehnen: '#privacy-policy-banner a.btn-decline',
            selectorakzeptieren: '#privacy-policy-banner a.btn-accept'
         }, {
            seite: 'smard.de',
            checkstorage: 'smard-cookiebanner',
            selectorablehnen: '.js-cookie-banner button.js-cookie-decline',
            selectorakzeptieren: '#privacy-policy-banner a.btn-accept'
         }, {
            seite: 'gronkh.tv',
            checkstorage: 'grnk-cookies-accepted',
            selectorablehnen: '.g-cookie-banner-controls > button:first-child',
            selectorakzeptieren: '.g-cookie-banner-controls > button:first-child + button'
         }, {
            seite: 'sehen.de',
            checkcookie: 'analytics',
            selectorablehnen: '.m-cookie [data-block-cookies]',
            selectorakzeptieren: '.m-cookie [data-action="__cookie[acceptall]"]'
         }, {
            seite: 'lentiamo.de',
            selectorablehnen: '.vc-bar-cookie button[data-cookie="0"]',
            selectorakzeptieren: '.vc-bar-cookie button[data-cookie="1"]'
         }, {
            seite: 'haustechnikdialog.de',
            checkcookie: 'PRIVACY_SETTINGS',
            selectorablehnen: '#pnlPrivacy input#ctl01_btnCookieDecline[type="button"]',
            selectorakzeptieren: '#pnlPrivacy input#ctl01_btnCookieConfirmAll[type="button"]'
         }, {
            seite: 'weimarerland.de,weimar.de,jobcenter-blk.de',
            selectorakzeptieren: '#gccookiemessage button#cookieSubmitButton[onclick][type="button"]'
         }, {
            seite: 'google.ac,google.ae,google.at,google.be,google.bg,google.by,google.ca,google.ch,google.cl,google.co.id,google.co.il,google.coIn,google.co.jp,google.co.ke,google.co.kr,google.co.nz,google.co.th,google.co.uk,google.co.ve,google.co.za,google.com,google.com.ar,google.com.au,google.com.br,google.com.co,google.com.ec,google.com.eg,google.com.hk,google.com.mx,google.com.my,google.com.pe,google.com.ph,google.com.pk,google.com.py,google.com.sa,google.com.sg,google.com.tr,google.com.tw,google.com.ua,google.com.uy,google.com.vn,google.cz,google.de,google.dk,google.dz,google.ee,google.es,google.fi,google.fr,google.gr,google.hr,google.hu,google.ie,google.it,google.lt,google.lv,google.nl,google.no,google.pl,google.pt,google.ro,google.rs,google.ru,google.se,google.sk,google.coIn,googleusercontent.com',
            checkcookie: 'SOCS',
            selectorablehnen: 'div[aria-label*="oogle"] > div:last-child > span > div > div > div > div[class] > div > button[id][class][data-ved]:first-child:has(+ button:last-child)',
            selectorakzeptieren: 'div[aria-label*="oogle"] > div:last-child > span > div > div > div > div[class] > div > button[id][class][data-ved]:first-child + button:last-child',
            selectormobileablehnen: 'div[aria-label*="oogle"] > div:last-child > span > div > div > div > div[data-ved] > div > h1 + div + div > button[data-ved] + button[data-ved]',
            selectormobileakzeptieren: 'div[aria-label*="oogle"] > div:last-child > span > div > div > div > div[data-ved] > div > h1 + div + div > button[data-ved]:has(+ button[data-ved])',
            noframe: true,
            keinesichtbarkeitsprüfung: true
         }, {
            seite: 'plus.web.de,plus.gmx.net',
            checkcookie: 'consentLevel',
            selectorakzeptieren: 'html.window-on > .window-on .row > button[data-id="later-button"]#reminder.btn-secondary',
            countdown: 1000
         }, {
            seite: 'reddit.com',
            selectorablehnen: 'reddit-cookie-banner >> div.items-center > shreddit-interactable-element#reject-nonessential-cookies-button > button ,, #data-protection-consent-dialog button[slot="secondary-button"]',
            selectorakzeptieren: '#data-protection-consent-dialog button[slot="primary-button"]',
            checkcookie: 'eu_cookie'
         }, {
            seite: 'kabeleins.de,kabeleinsdoku.de,sat1gold.de,prosieben.de,sat1.de,sixx.de,prosiebenmaxx.de,joyn.de,atv.at,ran.de,7pass.de',
            checkcookie: 'cmp-settings',
            selectorablehnen: 'cmp-banner >> cmp-dialog >> cmp-button[variant="secondary"] >> button.button--secondary:not([disabled])',
            selectorakzeptieren: 'cmp-banner >> cmp-dialog >> cmp-button[variant="primary"] >> button.button--primary:not([disabled])',
            keinesichtbarkeitsprüfung: true
         }, {
            seite: 'bundesregierung.de,bundeskanzler.de',
            checkcookie: 'cookie-banner',
            selectorablehnen: '.bpa-cookie-banner button.bpa-close-button[type="button"]',
            selectorakzeptieren: '.bpa-cookie-banner button.bpa-accept-all-button[type="button"]'
         }, {
            seite: 'looker.de',
            checkcookie: 'setCookieHint;',
            selectorakzeptieren: '#cookie_dialog + div button[type="button"]:first-child'
         }, {
            seite: '45grad.de',
            checkcookie: '_user_cookie_settings',
            selectorakzeptieren: '#optin a.optin__button'
         }, {
            seite: 'gateway-it.com',
            selectorakzeptieren: 'body > div[id^="elementor-popup-modal-"] a[href*="popup"][href*="settings"]'
         }, {
            seite: 'alles-mahlsdorf.de',
            selectorablehnen: 'body > div[id^="elementor-popup-modal-"] button:first-child:has(+ button:last-child)',
            selectorakzeptieren: 'body > div[id^="elementor-popup-modal-"] button:first-child + button:last-child'
         }, {
            seite: 'brabus.com',
            checkcookie: 'cookiesConsent',
            selectorablehnen: '#modal-cookie button#saveCookies',
            selectorakzeptieren: '#modal-cookie button#saveAllCookies'
         }, {
            seite: 'swindi.de',
            checkcookie: 'swindi-web-app-privacy-settings',
            selectorakzeptieren: '#privacy-modal button#privacy-modal-save-recommended[type="button"]'
         }, {
            seite: 'buyzoxs.de,zoxs.de',
            checkcookie: 'essential',
            selectorablehnen: '#gdpr-dialog a.js-gdpr-settings -> #gdpr-dialog input#mediaSwitch -> #gdpr-dialog button#btnDeny[type="button"]',
            selectorakzeptieren: '#gdpr-dialog button#btnAccept1'
         }, {
            seite: 'constantin.film',
            checkcookie: 'cookie-layer-settings',
            selectorablehnen: '.cookielayer a.accept-none',
            selectorakzeptieren: '.cookielayer a.accept-all'
         }, {
            seite: 'henschel-schauspiel.de',
            checkcookie: 'ck_consent',
            selectorakzeptieren: 'input#cconsentcheck -> #approveform a.arrlink'
         }, {
            seite: 'max-academy.de',
            checkcookie: 'max-academy-CookiesAccepted',
            selectorablehnen: '.MuiDialog-container button.MuiButtonBase-root + button[type="button"]',
            selectorakzeptieren: '.MuiDialog-container button.MuiButtonBase-root:has(+ button[type="button"])'
         }, {
            seite: 'gibgas.de',
            checkcookie: 'gibgas',
            selectorablehnen: '#cookies_consent button#btnSave[onclick]',
            selectorakzeptieren: '#cookies_consent button#btnSaveAll[onclick]',
            countdown: 500
         }, {
            seite: 'kevag-telekom.de',
            selectorablehnen: '#fullScreenLockBlockOverlayKp .notConfirmKp',
            selectorakzeptieren: '#fullScreenLockBlockOverlayKp .confirmKp'
         }, {
            seite: 'frischteigwaren-huber.de',
            checkstorage: 'privacyNote',
            selectorakzeptieren: '[data-overlay="privacy"] button'
         }, {
            seite: 'hokify.de,hokify.at',
            checkstorage: 'accept-cookies',
            selectorablehnen: '[data-modal="cookieBannerModal"] button + button',
            selectorakzeptieren: '[data-modal="cookieBannerModal"] button:has(+ button)'
         }, {
            seite: 'nova-motors.de',
            checkcookie: 'amcookie_allowed',
            selectorablehnen: '#am-cookie-bar button.ambar-btn-accept',
            selectorakzeptieren: '#am-cookie-bar button.ambar-btn-allow'
         }, {
            seite: 'schaedlingskunde.de',
            checkcookie: 'cookieconsent',
            selectorakzeptieren: '#cookie-biter .allow-cookies-btn'
         }, {
            seite: 'destatis.de',
            checkcookie: 'gsbbanner',
            selectorablehnen: '#cookiebanner button.rejectAll',
            selectorakzeptieren: '#cookiebanner button.consentToAll'
         }, {
            seite: 'lemonde.fr',
            checkcookie: 'euconsent',
            selectorakzeptieren: '.gdpr-lmd-wall button.gdpr-lmd-button'
         }, {
            seite: 'rt.com',
            checkcookie: 'rt-cb-approve',
            selectorakzeptieren: '.js-cookies-banner a.js-cookies-button'
         }, {
            seite: 'reg.ru',
            checkcookie: 'cookieAgree',
            selectorakzeptieren: '.b-policy-info button.b-policy-info__button'
         }, {
            seite: 'ionos.de',
            checkcookie: 'PRIVACY_CONSENT',
            selectorablehnen: '.privacy-consent--modal button#confirmSelection',
            selectorakzeptieren: '.privacy-consent--modal button#selectAll'
         }, {
            seite: 'frontline.de',
            checkcookie: 'it_eprivacy_ah-_essential',
            selectorablehnen: '#it-eprivacy-root button#it-eprivacy-banner-btn-decline',
            selectorakzeptieren: '#it-eprivacy-root button#it-eprivacy-banner-btn-accept'
         }, {
            seite: 'wisc.edu',
            checkcookie: 'uw_madison_cookieconsent_timestamp',
            selectorakzeptieren: '#cookieconsent-window button#cookieconsent-dismiss'
         }, {
            seite: 'safety.google,opensource.google,developers.google.com,cloud.google.com,web.dev,android.com,research.google,blog.google',
            checkstorage: 'glue.CookieNotificationBar',
            selectorakzeptieren: '.glue-cookie-notification-bar button.glue-cookie-notification-bar__accept'
         }, {
            seite: 'staedteregion-aachen.de',
            checkcookie: 'cookieConsent',
            selectorablehnen: '.dbayCookieSelect a.cookieSelectAccept',
            selectorakzeptieren: '.dbayCookieSelect a.cookieSelectAcceptAll'
         }, {
            seite: 'jobcenter-muenchen.de',
            checkcookie: 'jcm-disclaimer',
            selectorablehnen: '.disclaimer-content button.save',
            selectorakzeptieren: '.disclaimer-content button.all'
         }, {
            seite: 'jobcenter-hallesaale.de',
            checkstorage: 'cookieSettings',
            selectorablehnen: '#cookieSettingsDialog .cm-cookie-content-button--save',
            selectorakzeptieren: '#cookieSettingsDialog .cm-cookie-content-button--accept-all'
         }, {
            seite: 'jobcenter-stadt-kassel.de',
            checkstorage: '_bnr',
            selectorablehnen: '.cookies-container button#cookies-save-btn',
            selectorakzeptieren: '.cookies-container button#cookies-all-btn'
         }, {
            seite: 'jobcenter-stade.de',
            checkstorage: 'cookie_consent',
            selectorablehnen: '#cookie-consent .cc_banner__footer > div:last-child button[class="cc_btn"]',
            selectorakzeptieren: '#cookie-consent .cc_banner__footer > div:last-child button[class="cc_btn cc_btn--primary"]'
         }, {
            seite: 'wuppertal.de,remscheid.de',
            checkcookie: 'cookies-accepted',
            selectorakzeptieren: '.SP-CookieUsageNotification button.SP-CookieUsageNotification__ok'
         }, {
            seite: 'itzehoe.de',
            checkcookie: 'communiceMatomo',
            selectorablehnen: '#privacy-container #matomo-btn-decline -> #communice-cookiebar #cookiebar-btn-understand',
            selectorakzeptieren: '#privacy-container #matomo-btn-accept -> #communice-cookiebar #cookiebar-btn-understand'
         }, {
            seite: 'radebeul.de',
            checkcookie: 'acceptedBanner',
            selectorablehnen: '#cookiebanner button.cookiebutton[onclick="set_cookie(false)"]',
            selectorakzeptieren: '#cookiebanner button.cookiebutton[onclick="set_cookie(true)"]'
         }, {
            seite: 'stadt-eisenberg.de',
            checkcookie: 'Consent',
            selectorablehnen: '.cookieconsent button.cookie-reject-all',
            selectorakzeptieren: '.cookieconsent button.cookie-accept-all'
         }, {
            seite: 'goettingen.de',
            checkcookie: 'nolis_cookiedough',
            selectorablehnen: '.nolis-cookie-consent-button button.primary-button',
            selectorakzeptieren: '.nolis-cookie-consent-button button.secondary-button'
         }, {
            seite: 'mein-digiport.de',
            checkcookie: 'COOKIE_SUPPORT',
            selectorablehnen: '#_com_comundus_cookies_CookieBanner_cookieConsentForm button#_com_comundus_cookies_CookieBanner_acceptEssentialCookies',
            selectorakzeptieren: '#_com_comundus_cookies_CookieBanner_cookieConsentForm button#_com_comundus_cookies_CookieBanner_acceptAllCookies'
         }, {
            seite: 'gera.de',
            checkcookie: 'CookieConsent',
            selectorablehnen: '.cookie-banner button[aria-label*="notwendig"]',
            selectorakzeptieren: '.cookie-banner button[aria-label="Alle Cookies zulassen"]'
         }, {
            seite: 'solingen.de',
            checkcookie: 'CookieConsent',
            selectorablehnen: '.CookieBanner button.OptionsButton',
            selectorakzeptieren: '.CookieBanner button.AcceptButton'
         }, {
            seite: 'fertighauswelt.de',
            checkcookie: 'cb-enabled',
            selectorablehnen: 'div > #cookie-consent-title + div + div > button + button',
            selectorakzeptieren: 'div > #cookie-consent-title + div + div > button:has(+ button)'
         }, {
            seite: 'emailnator.com',
            checkstorage: 'cookie',
            selectorakzeptieren: '#cookie-notice button#accept-cookies-usage'
         }, {
            seite: 'tk.de',
            checkcookie: 'CONSENTMGR',
            selectorablehnen: '.consent-manager .consent-manager__button-container > tkds-button[variant="secondary"]',
            selectorakzeptieren: '.consent-manager .consent-manager__button-container > tkds-button.consent-manager__approve-all-button'
         }, {
            seite: 'vdek.com',
            checkcookie: 'consent_gkv',
            selectorablehnen: '#datenschutz-consent #consent_selectbutton',
            selectorakzeptieren: '#datenschutz-consent #consent_allbutton'
         }, {
            seite: 'kkh.de',
            checkstorage: 'kkh-cookieConsent',
            selectorablehnen: '#cookieModal button#cookiebar-safe-settings',
            selectorakzeptieren: '#cookieModal button#cookiebar-accept-all',
            countdown: 500
         }, {
            seite: 'get-in-it.de',
            checkstorage: 'Get_CookieConsent',
            selectorablehnen: '[class*="CookieConsentWidget_opened"] button[class*=" CookieConsentMainScreen_reject"]',
            selectorakzeptieren: '[class*="CookieConsentWidget_opened"] button[class*=" CookieConsentMainScreen_saveAll"]'
         }, {
            seite: 'commerzbank.de',
            checkcookie: 'cmp_PUK',
            selectorablehnen: '.cookiebox--landing button#denyAll',
            selectorakzeptieren: '.cookiebox--landing button#acceptAll'
         }, {
            seite: 'abuseipdb.com',
            checkcookie: 'hasConsent',
            selectorablehnen: '#cookies-eu-banner button#cookies-eu-reject',
            selectorakzeptieren: '#cookies-eu-banner button#cookies-eu-accept'
         }, {
            seite: 'bundesfinanzministerium.de',
            checkcookie: 'cookie-banner',
            selectorablehnen: '.bhh-cookie-banner button.bhh-cookie-banner__btn--close',
            selectorakzeptieren: '.bhh-cookie-banner button.bhh-cookie-banner__btn--all'
         }, {
            seite: 'mediamarkt.de,saturn.de,mediamarkt.pl',
            checkcookie: 'pwaconsent',
            selectorablehnen: '[data-test="mms-privacy-layer"] button[data-test="pwa-consent-layer-deny-all"]',
            selectorakzeptieren: '[data-test="mms-privacy-layer"] button[data-test="pwa-consent-layer-accept-all"]'
         }, {
            seite: 'robert-thomas.de',
            checkcookie: 'cookieAllow',
            selectorablehnen: '.cookie--consent button#cookie--consent_confirm',
            selectorakzeptieren: '.cookie--consent button#cookie--consent_confirmAll'
         }, {
            seite: 'delta21.de',
            checkstorage: 'cookie',
            selectorablehnen: '#cdk-overlay-0 button.cookie-settings-submit',
            selectorakzeptieren: '#cdk-overlay-0 button.cookie-settings-submitall'
         }, {
            seite: 'ga.de,saarbruecker-zeitung.de',
            checkcookie: 'Optanon',
            selectorakzeptieren: 'custom-card #consentAccept'
         }, {
            seite: 'movistar.es',
            checkcookie: 'OptanonAlertBoxClosed',
            selectorablehnen: '#cookies-bar-component button[aria-label*="Rechazar cookies opcionales"]',
            selectorakzeptieren: '#cookies-bar-component button[aria-label*="Aceptar cookies"]'
         }, {
            seite: 'kicker.de',
            checkcookie: 'kickerQM',
            countdown: 1000,
            selectorakzeptieren: '#kick__pur a[onclick="ov.cmp.acceptAllConsents()"]'
         }, {
            seite: 'truckscout24.de',
            checkcookie: 'confirmed%22%3Afalse',
            sonderfall: 'truckscout24de'
         }, {
            seite: 'hansapark.de',
            checkcookie: 'cookieManager',
            selectorablehnen: '#cookie-manager button#btnUebernehmen',
            selectorakzeptieren: '#cookie-manager button#btnAlleAuswaehlen'
         }, {
            seite: 'domains-anonymizer.com',
            checkcookie: 'cookieConsentAgree',
            selectorakzeptieren: '.cookie-consent button[onclick^="createCookieInfo"]'
         }, {
            seite: 'norberteder.com',
            checkcookie: 'cookielay',
            selectorablehnen: '#cookielay [data-cookielay-allow="custom"]',
            selectorakzeptieren: '#cookielay [data-cookielay-allow="all"]'
         }, {
            seite: 'hmd.com',
            checkcookie: 'GCString',
            selectorablehnen: '#cmp-modal button#modalRejectAllFirstLayerBtn',
            selectorakzeptieren: '#cmp-modal button#modalAcceptAllBtn'
         }, {
            seite: 'energie-experten.ch',
            checkcookie: 'true%2C%22consentMarketing',
            selectorablehnen: '.fd-consent-main button#fd-unCheckAll',
            selectorakzeptieren: '.fd-consent-main button#fd-checkAll'
         }, {
            seite: 'kleinwindanlagen.de',
            checkcookie: 'kwindanl_cn',
            selectorakzeptieren: '#annoyingeucookiemsg button.uk-button-success'
         }, {
            seite: 'gas.info',
            checkcookie: 'Tracking',
            selectorablehnen: '.jwCOWidget button.jwOptinBtnDeny',
            selectorakzeptieren: '.jwCOWidget button.jwOptinBtnAcceptAll'
         }, {
            seite: 'swhd.de',
            checkcookie: 'HRCookieManager',
            selectorablehnen: '.consent-banner button[onclick*=", false, true, ["]',
            selectorakzeptieren: '.consent-banner button[onclick*=", true, false, ["]'
         }, {
            seite: 'sfc.com',
            checkcookie: 'consent',
            selectorablehnen: '#consent #consent-onlytech',
            selectorakzeptieren: '#consent #consent-accept-all'
         }, {
            seite: 'augsburger-allgemeine.de,mainpost.de,suedkurier.de',
            checkstorage: 'SDGIds',
            selectorakzeptieren: '#pur_layer button#pgwl_pur-option-accept-button'
         }, {
            seite: 'tvo.fi',
            checkstorage: 'accept-cookies',
            selectorablehnen: 'jaettu-evastekysely button[data-action="accept-mandatory-cookies"]',
            selectorakzeptieren: 'jaettu-evastekysely button[data-action="accept-all-cookies"]'
         }, {
            seite: 'liveramp.com',
            selectorablehnen: '#ketch-banner button[aria-label="Reject All"]',
            selectorakzeptieren: '#ketch-banner button[aria-label="Accept All"]'
         }, {
            seite: 'dgppn.de',
            checkcookie: 'cookieConsent',
            selectorablehnen: '#modal-cookie button#saveCookies',
            selectorakzeptieren: '#modal-cookie button#saveAllCookies'
         }, {
            seite: '3djake.de',
            checkcookie: 'cnstinf',
            selectorablehnen: '.tc-banner button[value="deny_all"]',
            selectorakzeptieren: '.tc-banner button[value="consent_all"]'
         }, {
            seite: 'xxxlutz.de',
            checkstorage: 'last_cmp_version',
            selectorablehnen: '[aria-describedby="consentbar"] button[data-purpose="cookieBar.button.accept"] + div > button[type="button"]',
            selectorakzeptieren: '[aria-describedby="consentbar"] button[data-purpose="cookieBar.button.accept"]'
         }, {
            seite: 'wasserstoff-sicherheit.de',
            checkcookie: 'ckies_cloudflare',
            selectorablehnen: '[data-gi-selector="reject-all-cookies"] > a',
            selectorakzeptieren: '[data-gi-selector="accept-all-cookies"] > a'
         }, {
            seite: 'safety.google,opensource.google,developers.google.com,cloud.google.com,web.dev',
            selectorakzeptieren: '#glue-cookie-notification-bar-1 button.glue-cookie-notification-bar__accept'
         }, {
            seite: 'ok.ru',
            selectorablehnen: '[data-module="cookieBanner"] button.cb_setup -> input[name="button_save_choice"]',
            selectorakzeptieren: '[data-module="cookieBanner"] button.js-cb_accept',
            checkcookie: 'PRIVACY',
            countdown: 700
         }, {
            seite: 'aachener-zeitung.de',
            selectorakzeptieren: '[class^="zweiwegen-model-dialog_consentDialog"] button[data-testid="zweiwegen-accept-button"]',
            checkcookie: 'euconsent-v2'
         }, {
            seite: 'idnes.cz',
            selectorakzeptieren: 'a[href="javascript:Didomi.setUserAgreeToAll();"]',
            countdown: 500,
            checkcookie: 'euconsent-v2'
         }, {
            seite: 'rolandgumpert.com',
            selectorablehnen: '.cookie a.hide',
            selectorakzeptieren: '.cookie a.dismiss',
            checkstorage: 'cookie_consent_202008181030'
         }, {
            seite: 'smart.com',
            selectorablehnen: '#cookie-pro-dialog button#cookie-pro-info-button -> #onetrust-pc-sdk button.ot-pc-refuse-all-handler',
            selectorakzeptieren: '#cookie-pro-dialog button#cookie-pro-allow-button',
            checkstorage: 'OptanonAlertBoxClosed'
         }, {
            seite: 'filter-direkt.de',
            selectorablehnen: '.cookie-bar button[data-testing="cookie-bar-save"]',
            selectorakzeptieren: '.cookie-bar button[data-testing="cookie-bar-accept-all"]',
            checkcookie: 'necessary'
         }, {
            seite: 'hit-touristik.de',
            selectorablehnen: '[class^="CookiesInfo__BtnWrapper"] > button:first-child + button',
            selectorakzeptieren: '[class^="CookiesInfo__BtnWrapper"] > button:first-child',
            checkcookie: 'acceptCookies'
         }, {
            seite: 'windtech-international.com',
            selectorakzeptieren: '#eu_cookies button.button_cookie',
            checkcookie: 'windtech'
         }, {
            seite: 'proidee.de',
            selectorablehnen: '#COOKIE_EINSTELLUNG_BANNER a[onclick*="sendCookieData(false"]',
            selectorakzeptieren: '#COOKIE_EINSTELLUNG_BANNER a[onclick*="sendCookieData(true"]#COOKIE_BUTTON'
         }, {
            seite: 'dropbox.com',
            selectorablehnen: '#ccpa-iframe-theme-provider button#decline_cookies_button',
            selectorakzeptieren: '#ccpa-iframe-theme-provider button#accept_all_cookies_button'
         }, {
            seite: 'kraemer.de',
            selectorablehnen: '#consentLayer button[onclick="openConsentSettings();"] -> #consentLayer button[onclick="uncheckAllCheckboxes();"]',
            selectorakzeptieren: '#consentLayer button[onclick="checkAllCheckboxes();"]',
            checkcookie: 'websale_useragreement_optoutunchecked_consentAll'
         }, {
            seite: 'pflanzenforschung.de',
            selectorakzeptieren: '#eucookielaw a.acceptclose',
            checkcookie: 'eucookie'
         }, {
            seite: 'mia-moebel.de',
            selectorablehnen: '#modal-consentmanager #cm-settings-open -> #modal-consentmanager-extended #cm-save-settings',
            selectorakzeptieren: '#modal-consentmanager #cm-save-all',
            checkcookie: 'consent',
            countdown: 300
         }, {
            seite: 'medpets.de',
            selectorablehnen: '[ref="cookie-modal"] .gtm-button-deny-cookies-all-pages',
            selectorakzeptieren: '[ref="cookie-modal"] .gtm-button-accept-cookies-all-pages',
            checkcookie: 'op_tracking'
         }, {
            seite: 'jbl.de',
            selectorablehnen: '.uim a.approve-none[aria-label="Nur unbedingt erforderlich"]',
            selectorakzeptieren: '.uim a.approve-all[aria-label="Alle erlauben"]'
         }, {
            seite: 'rs-online.com',
            selectorablehnen: '[aria-label="Consent Banner"] button#rejectAll',
            selectorakzeptieren: '[aria-label="Consent Banner"] button#ensCloseBanner',
            checkstorage: 'RSCOMPONENTS'
         }, {
            seite: 'uptodown.com',
            selectorablehnen: '#cookiescript_injected_wrapper #cookiescript_reject',
            selectorakzeptieren: '#cookiescript_injected_wrapper #cookiescript_accept',
            checkcookie: 'consenttime'
         }, {
            seite: 'gotha.de',
            selectorakzeptieren: '#gccookiemessage button#cookieSubmitButton',
         }, {
            seite: 'amiunique.org',
            selectorablehnen: 'div[class="v-snack v-snack--active v-snack--bottom v-snack--has-background"] button[class="mr-2 v-btn v-btn--is-elevated v-btn--has-bg v-btn--rounded theme--dark v-size--default"]:first-child:has(+ button:last-child)',
            selectorakzeptieren: 'div[class="v-snack v-snack--active v-snack--bottom v-snack--has-background"] button[class="mr-2 v-btn v-btn--is-elevated v-btn--has-bg v-btn--rounded theme--dark v-size--default"]:first-child + button:last-child',
            checkcookie: 'cookie_notice'
         }, {
            seite: 'lotto24.de,tipp24.de',
            selectorablehnen: 'button[data-element-id="cookieConsentPromptOverlay.functionalOnlyButton"]',
            selectorakzeptieren: 'button[data-element-id="cookieConsentPromptOverlay.acceptAllButton"]',
            checkcookie: 'cookieConsentDisclaimer'
         }, {
            seite: 'tellows.de',
            selectorakzeptieren: '#cmpscreen a#btnconsent.btn-success',
            checkcookie: 'euconsent-v2'
         }, {
            seite: 'single.infranken.de',
            selectorablehnen: '#ccp-overlay button#ccp-deny-all-btn',
            selectorakzeptieren: '#ccp-overlay button#ccp-accept-all-btn'
         }, {
            seite: 'ing.de',
            selectorablehnen: 'ing-cc-manager >> ing-dialog-frame > ing-cc-dialog-level0 >> ing-button.cc-l0__button__more',
            selectorakzeptieren: 'ing-cc-manager >> ing-dialog-frame > ing-cc-dialog-level0 >> ing-button.cc-l0__button__accept',
            noframe: true
         }, {
            seite: 'ing.nl',
            selectorablehnen: 'ing-app-open-page >> #cookieDialog >> ing-feat-cookie-dialog-nl >> ing-feat-global-cookie-preference >> cookie-preference-main >> ing-button[data-testid="reject"]',
            selectorakzeptieren: 'ing-app-open-page >> #cookieDialog >> ing-feat-cookie-dialog-nl >> ing-feat-global-cookie-preference >> cookie-preference-main >> ing-button[data-testid="accept"]',
            checkcookie: 'COOKIE_PREF',
            noframe: true
         }, {
            seite: 'wp.pl,money.pl,o2.pl,parenting.pl,pudelek.pl,autokult.pl,gadzetomania.pl,fotoblogia.pl,komorkomania.pl,polygamia.pl,abczdrowie.pl,benchmark.pl,kafeteria.pl,pysznosci.pl,dobreprogramy.pl,genialne.pl,autocentrum.pl,jastrzabpost.pl,deliciousmagazine.pl,wirtualnemedia.pl',
            selectorakzeptieren: 'div[role="dialog"][aria-modal="true"][aria-label="Plansza informacyjna WP"] > div:last-child > div:last-child > div:only-child > button:first-child + button:last-child -> div[role="dialog"][aria-modal="true"][aria-label="Plansza informacyjna WP"] > div:last-child > div:last-child > div:only-child > button:first-child:has(+ button:last-child)',
            checkcookie: '__vads'
         }, {
            seite: 'deepl.com',
            selectorablehnen: '[aria-labelledby="CondensedStrictBanner-header"] button[data-testid="cookie-banner-strict-accept-selected"]',
            selectorakzeptieren: '[aria-labelledby="CondensedStrictBanner-header"] button[data-testid="cookie-banner-strict-accept-all"]',
            checkcookie: 'privacySettings'
         }, {
            seite: 'movieplayer.it',
            selectorakzeptieren: '#cl-consent a.cl-consent-node-a[data-role="b_options"] -> #cl-consent a.cl-consent-node-a[data-role="b_save_all"]'
         }, {
            seite: 'gas-h2.de',
            selectorablehnen: '.jwCOWidget .jwOptinBtnAcceptAll + .jwOptinBtnAccept + button.jwOptinBtnDeny',
            selectorakzeptieren: '.jwCOWidget .jwOptinBtnAcceptAll:has(+ .jwOptinBtnAccept + button.jwOptinBtnDeny)',
            checkcookie: 'jwMautic'
         }, {
            seite: 'mydealz.de',
            selectorablehnen: '.popover-content button[data-t="showCookiesSettings"] -> .popover-content button[data-t="rejectAll"]',
            selectorakzeptieren: '.popover-content button[data-t="acceptAll"]',
            checkcookie: 'cookie_policy_agreement'
         }, {
            seite: 'assets.poool.fr',
            selectorablehnen: '#app .p3-widget-consent > :not(.p3-d-xl-none) .consent-action > .p3-button-wrapper > button.p3-unlock-button + button'
         }, {
            seite: 'nature.com,scientificamerican.com',
            checkcookie: '26C%3DC01%26D%3Dtrue',
            selectorablehnen: '.cc-banner button.cc-banner__button-reject, .cc-banner:not(:has(button.cc-banner__button-reject)) button[data-cc-action="preferences"] -> .cc-preferences__dialog button[data-cc-action="reject"]',
            selectorakzeptieren: '.cc-banner button[data-cc-action="accept"]'
         }, {
            seite: 'dsisolar.com',
            selectorablehnen: '#wmkcprivacy em[title*="eject"]',
            selectorakzeptieren: '#wmkcprivacy button.wmkcprivacy-btn'
         }, {
            seite: 'hvv.de',
            checkcookie: 'cookieBanner',
            selectorakzeptieren: 'div[data-options*="cookieBanner"] button.js-f-cookie-banner-button'
         }, {
            seite: 'mercedes-benz.de',
            selectorablehnen: 'cmm-cookie-banner >> .button--only-technically-necessary',
            selectorakzeptieren: 'cmm-cookie-banner >> .button--accept-all'
         }, {
            seite: 'wise.com',
            checkcookie: 'twCookie',
            selectorablehnen: '#twcc__mechanism button#twcc__decline-button',
            selectorakzeptieren: '#twcc__mechanism button#twcc__accept-button'
         }, {
            seite: 'comdirect.de',
            checkcookie: 'cmp_consent',
            selectorablehnen: 'com-consent-layer >> #cmpDenyAll >> button',
            selectorakzeptieren: 'com-consent-layer >> #cmpAcceptAll >> button'
         }, {
            seite: 'nah.sh.hafas.de',
            checkcookie: 'consent',
            selectorablehnen: '#HFS_CookieHint button#HFS_CookieSelectChoice',
            selectorakzeptieren: '#HFS_CookieHint button#HFS_CookieSelectAll'
         }, {
            seite: 'apkpure.com',
            checkcookie: 'apkpure__policy_review',
            selectorablehnen: '#policy-info [dt-eid="only_necessary_cookies"]',
            selectorakzeptieren: '#policy-info [dt-eid="accept_all"]'
         }, {
            seite: 'ao.com',
            checkcookie: 'AOCookieRequestReference',
            selectorablehnen: '[data-tag-section="cookie_banner_modal"] button[data-testid="cookieBanner-decline-btn"]',
            selectorakzeptieren: '[data-tag-section="cookie_banner_modal"] button[data-testid="cookieBanner-accept-btn"]'
         }, {
            seite: 'shein.com,shein.co.uk',
            selectorablehnen: 'div[class^="_shein_privacy_"] .cmp_c_3',
            selectorakzeptieren: 'div[class^="_shein_privacy_"] .cmp_c_2'
         }, {
            seite: 'consent.pdf24.org',
            checkstorage: 'consent/pdf24.org',
            selectorablehnen: '#consentManager a.settings -> #consentManager a.declineAll',
            selectorakzeptieren: '#consentManager a.acceptAll'
         }, {
            seite: 'modivo.de',
            selectorablehnen: '.modal-consents:has(a[href="https://modivo.de/b/datenschutz"]) button[class="button-large button secondary"] -> .cookie-settings-footer > button.primary-accent',
            selectorakzeptieren: '.modal-consents:has(a[href="https://modivo.de/b/datenschutz"]) button[class="button-large button primary-accent"]'
         }, {
            seite: 'gehalt.de',
            checkcookie: 'CONSENTMGR',
            selectorablehnen: '#GDPRConsentManagerContainer #ccmgt_explicit_preferences -> #GDPRConsentManagerContainer #ccmgt_preferences_reject',
            selectorakzeptieren: '#GDPRConsentManagerContainer #ccmgt_explicit_accept'
         }, {
            seite: 'cookpad.com',
            checkcookie: 'cookies_preference',
            selectorablehnen: '[data-controller*="cookies-consent"] a[href*="/de/terms_of_use_consents?value=0"]',
            selectorakzeptieren: '[data-controller*="cookies-consent"] a[href*="/de/terms_of_use_consents?value=1"]'
         }, {
            seite: 'nike.com',
            checkcookie: 'AKA_A2',
            selectorablehnen: '.cookie-modal-base button.modal-actions-decline-btn',
            selectorakzeptieren: '.cookie-modal-base button.modal-actions-accept-btn'
         }, {
            seite: 'homebanking-hilfe.de',
            checkcookie: 'hbh42_cn',
            selectorablehnen: 'a[onclick^="eu_cookie_consent_accept"]:has( + a)',
            selectorakzeptieren: 'a[onclick^="eu_cookie_consent_accept"] + a[onclick]'
         }, {
            seite: 'retnemt.dk',
            checkstorage: 'ajs_user_traits',
            selectorablehnen: '#cookies button#accept-selected-cookies-btn',
            selectorakzeptieren: '#cookies button#accept-all-cookies-btn'
         }, {
            seite: 'jobvector.de',
            checkstorage: 'cc_essential',
            selectorablehnen: '.ddt-modal button#ddt-settingsBtn1 -> .ddt-modal button#ddt-saveSettingsBtn2',
            selectorakzeptieren: '.ddt-modal button#ddt-acceptAllBtn1'
         }, {
            seite: 'metro.co.uk',
            checkstorage: 'mol.ads.cmp.tcf.cache',
            selectorakzeptieren: '[data-project="mol-fe-cmp"] button[class*="consent"].level1PrimaryButton-0-0-6'
         }, {
            seite: 'reiseauskunft.insa.de',
            selectorablehnen: '#HFS_CookieHint input#HFS_CookieOptionfunctional -> #HFS_CookieHint button#HFS_CookieSelectChoice',
            keinesichtbarkeitsprüfung: true
         }, {
            seite: 'kleinanzeigen.de',
            checkcookie: 'ekConsentBucketTcf2',
            selectorakzeptieren: '#consentBanner button[data-testid="gdpr-banner-decline-button"], #consentBanner button#gdpr-banner-accept'
         }, {
            seite: 'marca.com',
            checkcookie: 'euconsent-v2',
            selectorakzeptieren: '#ue-initial-modal button[action-name="agreeAll"]'
         }, {
            seite: 'bmw.com',
            checkcookie: 'cc_consentCookie',
            selectorablehnen: 'epaas-consent-drawer-shell >> .consentDrawer .reject-button',
            selectorakzeptieren: 'epaas-consent-drawer-shell >> .consentDrawer .accept-button'
         }, {
            seite: 'npo.nl,nos.nl',
            selectorakzeptieren: 'ccm-notification >> button.ccm_btn--save, button#ccm_close'
         }, {
            seite: 'rajapack.de',
            selectorablehnen: '.otsdk-rajapack button.js-ot-deny',
            selectorakzeptieren: '.otsdk-rajapack button.js-ot-accept',
            checkcookie: 'OptanonConsent'
         }, {
            seite: 'pons.com',
            selectorakzeptieren: '[data-e2e="fg-modal"] button[data-e2e="fg-accept-ads-trigger"]',
            checkcookie: 'OptanonAlertBoxClosed'
         }, {
            seite: 'online-mahnantrag.de',
            selectorakzeptieren: '#CookiesButtons a[onclick="setCookieAndGo()"]',
            checkcookie: 'cookieZustimmung'
         }, {
            seite: 'chat.mistral.ai',
            selectorakzeptieren: 'div[id^="radix-"][class^="data-[state=open]"][data-state="open"][style="pointer-events: auto;"] > div:first-child + button:last-child[class^="disabled:pointer-auto"]',
            checkcookie: 'intercom.intercom-state'
         }, {
            seite: 'trakt.tv',
            selectorablehnen: '.trakt-cookie-notice button[aria-label="Accept functional cookies only"]',
            selectorakzeptieren: '.trakt-cookie-notice button[aria-label="Accept all cookies"]',
            checkcookie: '_traktconsent'
         }, {
            seite: 'sparkasse.de',
            selectorakzeptieren: '[data-testid="consentManager"] button[data-testid="privacyBanner-agreeAll"]',
            selectorablehnen: '[data-testid="consentManager"] button[data-testid="privacyBanner-rejectAll"]',
            checkcookie: 'TC_PRIVACY'
         }, {
            seite: 'kotte-zeller.de',
            selectorablehnen: '#agreementPrivacy #cookieDetailToggler -> #cookieDetails button[onclick*="ws_agreementcookies_set"]',
            selectorakzeptieren: '#agreementPrivacy input.ws_useragreement4alls',
            checkcookie: 'websale_useragreement'
         }, {
            seite: 'leo.org',
            selectorakzeptieren: 'ion-modal .leo-abo-hint ion-button[class="ion-color ion-color-success md button button-solid ion-activatable ion-focusable hydrated"]',
            checkcookie: 'eupubconsent-v2'
         }, {
            seite: 'ihrlabor.befundpost.at',
            selectorakzeptieren: '#privacyConsent a#privacyButton',
            checkcookie: 'consent'
         }, {
            seite: 'united-domains.de',
            selectorablehnen: '.cookie-layer-dialog form.cookie-layer-form button.show-details -> .cookie-layer-dialog form.cookie-layer-form button.confirm-selection',
            selectorakzeptieren: '.cookie-layer-dialog form.cookie-layer-form button.confirm-all',
            checkcookie: 'CookieSettingsGroupId'
         }, {
            seite: 'santander.nl',
            selectorablehnen: '.cookie-notification a#btnCookieShowSettings -> .cookie-notification-moreinfo a#btnCookieSaveSettings',
            selectorakzeptieren: '.cookie-notification a#btnCookieAcceptAll',
            checkcookie: 'santander_cookie_consent_gtm'
         }, {
            seite: 'hirose.com',
            selectorakzeptieren: '.termsAndConditions-section .js-cookie-notification-accept',
            checkcookie: 'cookie-notification=3'
         }, {
            seite: 'nikkei.com',
            selectorablehnen: '#datasign_cmp__host >> a + button.datasign__dialogButtonTheme--index-module',
            selectorakzeptieren: '#datasign_cmp__host >> a + button.datasign__dialogButtonTheme--index-module + button',
            checkstorage: 'co.datasign.widget.operationState'
         }, {
            seite: 'privacy.samsung.com',
            selectorablehnen: '#cookie-eu button.cookie-eu__close',
            selectorakzeptieren: '#cookie-eu button#accept-cookies-button',
            checkstorage: 'ALLOW_FUNCTIONAL_COOKIES'
         }, {
            seite: 'porsche.com',
            selectorablehnen: 'uc-layer2 >> uc-footer >> uc-p-button.deny >> button',
            selectorakzeptieren: 'uc-layer2 >> uc-footer >> uc-p-button.accept >> button',
            checkstorage: 'uc_interaction_type'
         }, {
            seite: 'apollo-news.net',
            selectorakzeptieren: '#ad-free-sub-banner-container button#ad-free-sub-banner-btn-accept-all',
            checkcookie: 'CookieConsent'
         }, {
            seite: 'tumblr.com', // sub sites only, example: https://test.tumblr.com/
            selectorakzeptieren: 'html.gdpr-banner-context .gdpr-banner a.accept-button',
            checkcookie: 'gdpr_banner_accepted'
         }, {
            seite: 'ademax-strom.de',
            sonderfall: 'ademaxstromde',
            checkcookie: 'cookie-preference'
         }, {
            seite: 'wetter.com',
            selectorakzeptieren: '#cmp-wetter button#cmp-btn-accept',
            checkcookie: '__vads'
         }, {
            seite: 'tradingview.com',
            selectorablehnen: '[inert] + div[role="log"][aria-live="polite"] button[class^="rejectAll"][data-overflow-tooltip-text="Don\'t allow"]',
            selectorakzeptieren: '[inert] + div[role="log"][aria-live="polite"] button[class^="acceptAll"][data-overflow-tooltip-text="Accept all"]',
            checkstorage: 'cookiesSettings'
         }, {
            seite: 'bayernlabo.de',
            selectorablehnen: '#form-privacy button[onclick="deleteAllCookies(event,this)"]',
            selectorakzeptieren: '#form-privacy button[onclick="setAllCookies(event,this)"]',
            checkcookie: 'layerCookie'
         }, {
            seite: 'lieferando.de',
            selectorablehnen: 'pie-cookie-banner >> .c-cookieBanner pie-button[data-test-id="actions-necessary-only"]',
            selectorakzeptieren: 'pie-cookie-banner >> .c-cookieBanner pie-button[data-test-id="actions-accept-all"]',
            checkcookie: 'customerCookieConsent'
         }];

         let cookiebannerstatuslokal;
         for (let i = 0; i < regeln.length; i++) {
            // Gucken ob die aufgerufene Seite von einer Regel gedeckt ist.
            let seiten = regeln[i].seite.toString();
            seiten = seiten.split(',');
            for (let k = 0; k < seiten.length; k++) {
               if ((location.hostname.endsWith('.' + seiten[k]) || location.hostname === seiten[k]) && regelsuchebereitsgelaufen === false) {
                  regelsuchebereitsgelaufen = true;
                  console.log('[Cookie auto decline] Regel für folgende Seite gefunden: ' + seiten[k]);
                  if ((document.cookie.includes(regeln[i].checkcookie) === false || !regeln[i].checkcookie) && (localStorage.getItem(regeln[i].checkstorage) === null || !regeln[i].checkstorage) && ((regeln[i].noframe === true && window.self == window.top) || regeln[i].noframe !== true)) {
                     console.log('[Cookie auto decline] Cookie Banner noch nicht akzeptiert.');
                     // Cookie Banner finden und klicken
                     if (regeln[i].selectorakzeptieren || regeln[i].selectorablehnen) {
                        if (cookieeinstellung === 'ablehnen' || cookieeinstellung === 'funktional') {
                           if (regeln[i].selectorablehnen) {
                              regeln[i].selector = regeln[i].selectorablehnen;
                              cookiebannerstatuslokal = 'abgelehnt';
                           } else {
                              regeln[i].selector = regeln[i].selectorakzeptieren;
                              cookiebannerstatuslokal = 'akzeptiert';
                           }
                        } else {
                           if (regeln[i].selectorakzeptieren) {
                              regeln[i].selector = regeln[i].selectorakzeptieren;
                              cookiebannerstatuslokal = 'akzeptiert';
                           } else {
                              regeln[i].selector = regeln[i].selectorablehnen;
                              cookiebannerstatuslokal = 'abgelehnt';
                           }
                        }
                        if (regeln[i].countdown === undefined) {
                           regeln[i].countdown = 302;
                        }
                        let cookiebannerspecificakzeptiert = false;
                        let tiefe = 0;

                        if ((regeln[i].selectormobileablehnen || regeln[i].selectormobileakzeptieren) && window.screen.availWidth < 500) {
                           if (cookieeinstellung === 'ablehnen' || cookieeinstellung === 'funktional') {
                              if (regeln[i].selectormobileablehnen) {
                                 regeln[i].selector = regeln[i].selectormobileablehnen;
                                 cookiebannerstatuslokal = 'abgelehnt';
                              } else {
                                 regeln[i].selector = regeln[i].selectormobileakzeptieren;
                                 cookiebannerstatuslokal = 'akzeptiert';
                              }
                           } else {
                              if (regeln[i].selectormobileakzeptieren) {
                                 regeln[i].selector = regeln[i].selectormobileakzeptieren;
                                 cookiebannerstatuslokal = 'akzeptiert';
                              } else {
                                 regeln[i].selector = regeln[i].selectormobileablehnen;
                                 cookiebannerstatuslokal = 'abgelehnt';
                              }
                           }
                        }

                        const mehrereselectoren = regeln[i].selector.split(' ,, ');
                        // findcookiebanner setInterval
                        findcookiebannerspecific = function () {
                           for (let j = 0; j < mehrereselectoren.length; j++) {
                              const selectors = mehrereselectoren[j].split(' -> ');
                              if (selectors.length > 0) {
                                 advancedrun = false;
                              }
                              if (selectors[tiefe] && (document.cookie.includes(regeln[i].checkcookie) === false || !regeln[i].checkcookie) && (localStorage.getItem(regeln[i].checkstorage) === null || !regeln[i].checkstorage)) {
                                 let foundbutton = false;
                                 const shadowroots = selectors[tiefe].split(' >> ');
                                 if (shadowroots.length > 1) {
                                    let getfinalshadowrootselector = document.querySelector(shadowroots[0]);
                                    if (getfinalshadowrootselector) {
                                       for (let j = 1; j < shadowroots.length; j++) {
                                          if (getfinalshadowrootselector && getfinalshadowrootselector.shadowRoot) {
                                             getfinalshadowrootselector = getfinalshadowrootselector.shadowRoot.querySelector(shadowroots[j]);
                                          } else if (getfinalshadowrootselector && getfinalshadowrootselector.contentDocument) {
                                             getfinalshadowrootselector = getfinalshadowrootselector.contentDocument.querySelector(shadowroots[j]);
                                          } else {
                                             getfinalshadowrootselector = undefined;
                                             break;
                                          }
                                       }
                                       const a = getfinalshadowrootselector;
                                       if (getfinalshadowrootselector && (sichtbarkeitsprüfung(a) || regeln[i].keinesichtbarkeitsprüfung === true)) {
                                          cookiebannerspecificakzeptiert = true;
                                          foundbutton = true;
                                          forcesessionstorage();
                                          if (selectors.length > 1) {
                                             tiefe++;
                                          }
                                          cookiebannerstatus.suchstatus = 'gefunden';
                                          cookiebannerstatus.anbieter = _('providerSelfProgrammedMessage');
                                          cookiebannerstatus.knopfstatus = cookiebannerstatuslokal;
                                          cookiebannerfinalakzeptiertversuche++;
                                          getfinalshadowrootselector.click();
                                          console.log('[Cookie auto decline] Cookie Banner Knopf geklickt.');
                                       }
                                    }
                                 } else {
                                    const normalselector = document.querySelector(selectors[tiefe]);
                                    const a = normalselector;
                                    if (normalselector && (sichtbarkeitsprüfung(a) || (regeln[i].keinesichtbarkeitsprüfung === true && normalselector.checkVisibility({
                                          checkDisplayNone: true
                                       })))) {
                                       cookiebannerspecificakzeptiert = true;
                                       foundbutton = true;
                                       forcesessionstorage();
                                       if (selectors.length > 1) {
                                          tiefe++;
                                       }
                                       cookiebannerstatus.suchstatus = 'gefunden';
                                       cookiebannerstatus.anbieter = _('providerSelfProgrammedMessage');
                                       cookiebannerstatus.knopfstatus = cookiebannerstatuslokal;
                                       cookiebannerfinalakzeptiertversuche++;
                                       normalselector.click();
                                       console.log('[Cookie auto decline] Cookie Banner Knopf geklickt.');
                                    }
                                 }
                                 if (cookiebannerspecificakzeptiert === true && selectors.length === 1) {
                                    if (foundbutton === false) {
                                       beenden();
                                    }
                                 }
                              } else {
                                 beenden();
                              }

                           }
                           // Cookie Banner Status Cookie aktualisieren
                           updatecookiebannerstatuscookie();
                        };

                        // Intervall nur laufen lassen wenn das Fenster sichtbar ist.
                        checkpagevisibility2 = function () {
                           if (document.hidden === true) {
                              window.clearInterval(findcookiebannerspecificinterval);
                           } else if (document.hidden === false) {
                              findcookiebannerspecificinterval = window.setInterval(function () {
                                 findcookiebannerspecific();
                              }, regeln[i].countdown);
                           }
                        };
                        window.addEventListener('visibilitychange', checkpagevisibility2);
                        if (document.hidden === false) {
                           findcookiebannerspecificinterval = window.setInterval(function () {
                              findcookiebannerspecific();
                           }, regeln[i].countdown);
                        }
                     }

                     // Cookie Einstellungen auf setstorage übertragen
                     if (regeln[i].setstorageablehnen || regeln[i].setstorageakzeptieren) {
                        if (cookieeinstellung === 'ablehnen' || cookieeinstellung === 'funktional') {
                           if (regeln[i].setstorageablehnen) {
                              regeln[i].setstorage = regeln[i].setstorageablehnen;
                           } else {
                              regeln[i].setstorage = regeln[i].setstorageakzeptieren;
                           }
                        } else {
                           if (regeln[i].setstorageakzeptieren) {
                              regeln[i].setstorage = regeln[i].setstorageakzeptieren;
                           } else {
                              regeln[i].setstorage = regeln[i].setstorageablehnen;
                           }
                        }
                     }
                     // Cookie Einstellungen auf setcookie übertragen
                     if (regeln[i].setcookieablehnen || regeln[i].setcookieakzeptieren) {
                        if (cookieeinstellung === 'ablehnen' || cookieeinstellung === 'funktional') {
                           if (regeln[i].setcookieablehnen) {
                              regeln[i].setcookie = regeln[i].setcookieablehnen;
                           } else {
                              regeln[i].setcookie = regeln[i].setcookieakzeptieren;
                           }
                        } else {
                           if (regeln[i].setcookieakzeptieren) {
                              regeln[i].setcookie = regeln[i].setcookieakzeptieren;
                           } else {
                              regeln[i].setcookie = regeln[i].setcookieablehnen;
                           }
                        }
                     }
                     // Cookies setzen
                     if (regeln[i].setcookie) {
                        let setcookies = regeln[i].setcookie.toString();
                        setcookies = setcookies.split(' , ');
                        for (let j = 0; j < setcookies.length; j++) {
                           if (regeln[i].nowww === true) {
                              document.cookie = setcookies[j] + ncnowww;
                           } else {
                              document.cookie = setcookies[j] + nc;
                           }
                        }
                        console.log('[Cookie auto decline] Cookie gesetzt.');
                     }
                     // LocalStorage setzen
                     if (regeln[i].setstorage) {
                        let setstorages = regeln[i].setstorage.toString();
                        setstorages = setstorages.split(' ,, ');
                        for (let j = 0; j < setstorages.length; j++) {
                           localStorage.setItem(setstorages[j].replace(/=.*/, ''), setstorages[j].replace(/^[^=]+=/, ''));
                        }
                        console.log('[Cookie auto decline] LocalStorage gesetzt.');
                     }
                     // Neuladen
                     if (regeln[i].reload === true) {
                        forcesessionstorage();
                        location.reload();
                     }
                     // Sonderfälle
                     if (regeln[i].sonderfall === 'truckscout24de') {
                        advancedrun = false;
                        if (window.location.href === 'https://www.truckscout24.de/main/consent') {
                           if (document.querySelector('a[href="javascript:history.back()"]')) {
                              beenden();
                              document.querySelector('a[href="javascript:history.back()"]').click();
                           }
                        } else {
                           window.setTimeout(function () {
                              if (document.querySelector('#cookie-notification a.btn[href="/main/consent"]')) {
                                 document.querySelector('#cookie-notification a.btn[href="/main/consent"]').click();
                              }
                           }, 502);
                        }
                     } else if (regeln[i].sonderfall === 'ademaxstromde') {
                        advancedrun = false;
                        window.setTimeout(function() {
                           const offcanvasoeffnen = document.querySelector('[data-cookie-permission] .js-cookie-configuration-button > button.no-button');
                              if (offcanvasoeffnen && offcanvasoeffnen.checkVisibility()) {
                              offcanvasoeffnen.click();
                           }
                        }, 1502);
                     }
                  }
                  break;
               }
            }
         }
         // cookie banner clicker
         klickecookiebutton = function (ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen) {
            advancedrun = false;
            let a;
            let c;
            a = ablehnen;
            c = ablehnen;
            if (ablehnen && sichtbarkeitsprüfung(a) === true && paybuttons(c) !== true && ((cookieeinstellung === 'ablehnen' || (!speichern && !einstellungen && !schließen && !akzeptieren)) || (cookieeinstellung === 'funktional' && !speichern && !einstellungen && !schließen))) {
               cookiebannerfinalakzeptiert = true;
               cookiebannerfinalakzeptiertcounter = 0;
               cookiebannerfinalakzeptiertversuche++;
               forcesessionstorage();
               console.log('[Cookie auto decline] Cookie Banner abgelehnt.');
               cookiebannerstatus.knopfstatus = 'abgelehnt';
               ablehnen.click();
               return;
            }

            a = speichern;
            c = speichern;
            if (speichern && sichtbarkeitsprüfung(a) === true && paybuttons(c) !== true && (cookieeinstellung !== 'akzeptieren' || !akzeptieren) && (cookieeinstellung !== 'funktional' || !einstellungen || (einstellungen && !einstellungen.checkVisibility()) || (nureinklickeinstellungen === true && bereitsgeklickt === true))) {
               if (switchesdelay >= 4 || switchesdelay === 0) {
                  cookiebannerfinalakzeptiert = true;
                  cookiebannerfinalakzeptiertcounter = 0;
                  cookiebannerfinalakzeptiertversuche++;
                  forcesessionstorage();
                  console.log('[Cookie auto decline] Cookie Banner Einstellungen gespeichert.');
                  cookiebannerstatus.knopfstatus = 'gespeichert';
                  speichern.click();
               }
               return;
            }

            a = einstellungen;
            c = einstellungen;
            if (einstellungen && sichtbarkeitsprüfung(a) === true && paybuttons(c) !== true && ((nureinklickeinstellungen === true && bereitsgeklickt === false) || !nureinklickeinstellungen) && (cookieeinstellung !== 'akzeptieren' || !akzeptieren)) {
               bereitsgeklickt = true;
               cookiebannerfinalakzeptiertcounter = 0;
               cookiebannerfinalakzeptiertversuche++;
               console.log('[Cookie auto decline] Cookie Banner Einstellungen geöffnet.');
               cookiebannerstatus.knopfstatus = 'einstellungen';
               einstellungen.click();
               return;
            }

            a = schließen;
            c = schließen;
            if (schließen && sichtbarkeitsprüfung(a) === true && paybuttons(c) !== true && (cookieeinstellung !== 'akzeptieren' || !akzeptieren)) {
               cookiebannerfinalakzeptiert = true;
               cookiebannerfinalakzeptiertcounter = 0;
               cookiebannerfinalakzeptiertversuche++;
               forcesessionstorage();
               console.log('[Cookie auto decline] Cookie Banner geschlossen.');
               cookiebannerstatus.knopfstatus = 'geschlossen';
               schließen.click();
               return;
            }

            a = akzeptieren;
            c = akzeptieren;
            if (akzeptieren && sichtbarkeitsprüfung(a) === true && paybuttons(c) !== true) {
               cookiebannerfinalakzeptiert = true;
               cookiebannerfinalakzeptiertcounter = 0;
               cookiebannerfinalakzeptiertversuche++;
               forcesessionstorage();
               console.log('[Cookie auto decline] Cookie Banner akzeptiert.');
               cookiebannerstatus.knopfstatus = 'akzeptiert';
               akzeptieren.click();
               return;
            }

            if (cookiebannerfinalakzeptiert === true) {
               beenden();
            }
         };

         // Weitere Sonderfälle die gar nicht oben reinpassen.
         if (window.location.hostname.endsWith('.de') && (window.location.hostname.includes('sparkasse-') || window.location.hostname.includes('-sparkasse') || window.location.hostname.includes('stadtsparkasse-') || window.location.hostname.startsWith('www.ssk') || window.location.hostname.startsWith('www.spk') || window.location.hostname.endsWith('haspa.de') || window.location.hostname.startsWith('www.ksk-')) && document.cookie.includes('ePrivacyStatus') === false) {
            cookiebannerstatus.anbieter = 'Sparkasse';
            console.log('[Cookie auto decline] Detected: Sparkasse cookie banner');
            window.setTimeout(function () {
               const check = document.querySelector('div[class*="privacy"] .ebutton > a[data-form=".eprivacy_optin_decline"]');
               if (check) {
                  forcesessionstorage();
                  cookiebannerstatus.knopfstatus = 'abgelehnt';
                  check.click();
               }
            }, 202);
         } else if (window.location.hostname === 'js.driftt.com') {
            let findecookiebanner = window.setInterval(function () {
               const ablehnen = document.querySelector('.drift-widget-chat-wrapper__GDPR button.drift-gdpr-action--deny-consent');
               if (ablehnen) {
                  cookiebannerstatus.anbieter = 'js.driftt.com';
                  console.log('[Cookie auto decline] Detected: js.driftt.com cookie banner chat iframe');
                  forcesessionstorage();
                  clearInterval(findecookiebanner);
                  window.setTimeout(function () {
                     cookiebannerstatus.knopfstatus = 'abgelehnt';
                     ablehnen.click();
                  }, 202);
               }
            }, 200);
            window.setTimeout(function () {
               clearInterval(findecookiebanner);
            }, 7000);
         } else if (window.location.hostname === 'www.mediafire.com') {
            console.log('[Cookie auto decline] Detected: mediafire.com cookie banner');
            window.setTimeout(function () {
               const check = document.querySelector('#cookie-accept-footer a.CookieAcceptance-accept');
               if (check && document.cookie.includes('accept-cookies') === false) {
                  forcesessionstorage();
                  check.click();
               }
            }, 502);
         } else if (window.location.hostname === 'www.verivox.de') {
            if (window.localStorage.getItem('uc_gcm') === null) {
               let banner = document.querySelector('.cmp-container');
               let bannerhintergrund = document.querySelector('.usercentrics-bg');
               if (banner && bannerhintergrund) {
                  banner.style.visibility = 'hidden';
                  bannerhintergrund.style.visibility = 'hidden';
               }
               let findecookiebanner = window.setInterval(function () {
                  const ablehnen = document.querySelector('.cmp-container button.gdpr-deny-all');
                  if (ablehnen && ablehnen.checkVisibility()) {
                     console.log('[Cookie auto decline] Detected: www.verivox.de cookie banner');
                     forcesessionstorage();
                     ablehnen.click();
                  }
               }, 400);
               window.setTimeout(function () {
                  clearInterval(findecookiebanner);
                  banner = document.querySelector('.cmp-container');
                  bannerhintergrund = document.querySelector('.usercentrics-bg');
                  if (banner && bannerhintergrund) {
                     banner.style.visibility = 'visible';
                     bannerhintergrund.style.visibility = 'visible';
                  }
               }, 4000);
            }
         }
      } else if (window.location.hostname === 'www.audioquest.com') {
         console.log('[Cookie auto decline] Detected: shopify cookie banner');
         window.setTimeout(function () {
            const check = document.querySelector('.shopify-pc__banner__btns-granular #shopify-pc__banner__btn-decline');
            if (check) {
               forcesessionstorage();
               check.click();
            }
         }, 502);
      } else {
         if (window.self === window.top) {
            cookiebannerstatus.suchstatus = 'nicht ausgeführt';
         }
      }
   };
})();
