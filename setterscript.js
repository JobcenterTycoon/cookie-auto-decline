'use strict';
(function () {

   // Führe den Hauptscript nur aus wenn das Addon nicht für die Seite deaktiviert ist. Startet den Script einmalig wenn im laufenden Betrieb das Addon aktiviert wird.
   let scriptdeaktiviert = false;
   let iframereferrer;
   if (document.referrer && window.self !== window.top) {
      iframereferrer = document.referrer.replace(/(www([0-9]{1,2})?\.)/, '').replace(/https?\:\/\//, '').replace(/\/.*/, '');
   }
   const domainohnewww = window.location.hostname.replace(/^(www([0-9]{1,2})?\.)?/, '');
   let cookieeinstellung;
   if (document.contentType === 'text/html' && window.location.href.startsWith('http')) {
      const prüfeobdasaddondeaktiviertist = function () {
         scriptdeaktiviert = false;
         browser.storage.local.get('aufdiesenseitendeaktiviert').then(function (a) {
            if (a && a.aufdiesenseitendeaktiviert && a.aufdiesenseitendeaktiviert.seiten) {
               const seiten = a.aufdiesenseitendeaktiviert.seiten;
               for (let i = 0; i < seiten.length; i++) {
                  if (seiten[i] === domainohnewww || seiten[i] === iframereferrer) {
                     scriptdeaktiviert = true;
                  }
               }
               if (scriptdeaktiviert === false) {
                  browser.storage.local.onChanged.removeListener(prüfeobdasaddondeaktiviertist);
                  // Cookie Einstellungen aus dem Erweiterungsspeicher auslesen und lokal speichern.
                  browser.storage.local.get("cookieeinstellung").then(function (a) {
                     if (a && a.cookieeinstellung && a.cookieeinstellung.einstellung) {
                        cookieeinstellung = a.cookieeinstellung.einstellung;
                     } else {
                        cookieeinstellung = 'ablehnen';
                     }
                     setzecookiehauptscript();
                  });
               }
            }
         });
      };
      prüfeobdasaddondeaktiviertist();
      browser.storage.local.onChanged.addListener(prüfeobdasaddondeaktiviertist);
   }

   // Hauptscript
   const setzecookiehauptscript = function () {

      // Cookie Banner Status globaler Cookie setzen wenn der nicht existiert.
      let cookiebannerstatus = {
         seite: domainohnewww,
         suchstatus: "suche",
         anbieter: "unbekannt",
         knopfstatus: "suche"
      };
      browser.storage.local.get('cookiebannerstatuscookie').then(function (a) {
         if (a && a.cookiebannerstatuscookie) {
            let tempcookiebannerstatus = a.cookiebannerstatuscookie;
            let istdiedomainvorhanden = false;
            for (let i = 0; i < tempcookiebannerstatus.length; i++) {
               if (tempcookiebannerstatus[i].seite === domainohnewww) {
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

      // Session Storage Funktion
      let forcesessionstorage = function () {
         if (sessionStorage.getItem('mpowlesu908hxfyw37ghg5ikx90jdzt') !== 'djx0v0odce35xrb2pt5dzbgaj1mud5c' && window.location.hostname.endsWith('.mydealz.de') === false) {
            sessionStorage.setItem('mpowlesu908hxfyw37ghg5ikx90jdzt', 'djx0v0odce35xrb2pt5dzbgaj1mud5c');
         }
      };

      let forcesessionstoragecss = function () {
         if (sessionStorage.getItem('8uf0f6a8qozu0jsl16de9vjq7rwqpox6') !== '5qw4p46frzs2autdmnxr9jhfltpg5hsh') {
            sessionStorage.setItem('8uf0f6a8qozu0jsl16de9vjq7rwqpox6', '5qw4p46frzs2autdmnxr9jhfltpg5hsh');
         }
      };

      let ladeversteckcss;

      // Teil Hauptscript
      if ((sessionStorage.getItem('mpowlesu908hxfyw37ghg5ikx90jdzt') !== 'djx0v0odce35xrb2pt5dzbgaj1mud5c' && sessionStorage.getItem('8uf0f6a8qozu0jsl16de9vjq7rwqpox6') !== '5qw4p46frzs2autdmnxr9jhfltpg5hsh' && (window.innerHeight > 400 || window.innerHeight === 0)) && window.location.hostname !== 'accounts.google.com' && window.location.hostname !== 'challenges.cloudflare.com' && window.location.href.startsWith('https://www.google.com/recaptcha/') !== true && window.location.href.startsWith('https://www.recaptcha.net/recaptcha/') !== true && window.location.href.startsWith('https://w.soundcloud.com/player/?url=http') !== true && window.location.href.startsWith('https://r-login.wordpress.com/remote-login.php') !== true) {

         // Cookie Banner die ersten 5 Sekunden verstecken.
         ladeversteckcss = function () {
            if (document.querySelector('body[class="no-js"] > .main-wrapper[role="main"] + script') === null && document.querySelector('html[style="height:100%"] iframe[src^="/_Incapsula_Resource?"]') === null && document.querySelector('link[href="/cdn-cgi/styles/challenges.css"][rel="stylesheet"]') === null && document.querySelector('body > .main-wrapper:first-child + script + script[src^="https://static.cloudflareinsights.com/beacon.min.js/"]:last-child') === null && document.querySelector('body > .main-wrapper > .main-content:only-child > noscript:only-child') === null && document.querySelector('body > script:first-child + #container + .cf-turnstile + div + script:last-child') === null && document.querySelector('body[style="margin:0"] > script[src^="https://ct.captcha-delivery.com/"]') === null && document.querySelector('head > script[src^="/TSPD/"] + noscript:last-child') === null && document.querySelector('body > div:first-child + script[src^="https://mcl.spur.us/d/mcl.js?"] + script:last-child') === null && document.querySelector('body > main > div > script[src^="/.within.website/x/cmd/anubis/static/js/main"]') === null && document.getElementById('q3xyktv21es96by0ybwvb1e9a37y5pu') === null) {
               let css = document.createElement('style');
               css.innerText = 'div[style*="blur"]:has(> .wp-exclude-emoji > .animate__animated div > a[href="#"][style="order: 1;"][role]) *, div[style]:has(> .wp-exclude-emoji > .animate__animated div > a[href="#"][style="order: 1;"][role]), body > .js-modal[style="z-index: 2147483647 !important"]:has(.js-modal--cookies),.sp-message-open{overflow:auto!important;}:is(div, form, dialog, section, aside, cms-cookie-bar):is([class*="cookie"], [class*="Cookie"], [id*="cookie"], [id*="Cookie"], [class*="keks"], [id*="keks"], [aria-labelledby*="cookie"], [aria-labelledby*="consent"], [aria-label*="consent"], cookie-law, [class*="consent"], [id*="consent"], [class*="c-disclaimer"], [class*="cc_banner"], [class*="gdpr"], [id*="gdpr"], [class*="dsgvo"], [id*="dsgvo"]):not([style*="display: none !important"], [style*="visibility: hidden !important"], :empty, .gridAndInfoContainer),#BorlabsCookieBox,[data-borlabs-cookie-wrap],div[id*="Cookiebot"], div#cookiebot,#_cp_wall,#bnp_cookie_banner,#cc_privacy_layer,#cmp-style-reset,#cmpbox,#cmpbox2,#cmpwrapper,#ez-cookie-dialog-wrapper,#ez-cookie-loader-wrapper,#gdpr-banner[aria-hidden],#gdpr-consent-tool-wrapper,#gdpr-privacy-settings,#gdpr-single-choice-overlay,#jentis_consent,#onetrust-consent-sdk,#truste-consent-track,#uhfCookieAlert,[id^="usercentrics-"]:not(script),#comspace-usercentrics,.CookieComplianceContainer-veil,.artdeco-global-alert--COOKIE_CONSENT[type=COOKIE_CONSENT],.c-cookie-consent--default,.truste_box_overlay,.truste_overlay,.waconcookiemanagement,app-required-consent-overlay,body>#cmplz-cookiebanner-container,body>#portal-root>div:not([id],[class])>div[class^=Overlay__container___][class*=Overlay__containerActive___],body>#react-root>div>div>div>div>div:last-child>div>div[data-testid=BottomBar],body>[data-react-modal-body-trap]+.ReactModalPortal,body>div#a-page>span.a-declarative[data-action=sp-cc][data-csa-c-type=widget][data-csa-c-func-deps=aui-da-sp-cc][data-sp-cc*="/privacyprefs/"],body>div>div[aria-label*=oogle][id][class][aria-modal][role=dialog][tabindex="0"][data-ved][style="display: block;"],body>div[aria-label*=oogle][id][class][aria-modal][role=dialog][tabindex="0"][data-ved][style="display: block;"],body>div[data-testid=cookie-policy-manage-dialog],body>div[data-testid=wa_cookies_banner_modal],body>tp-yt-iron-overlay-backdrop[opened],body>ytd-app>ytd-consent-bump-v2-lightbox#lightbox,.cmp-root-container,div[class^=Layout-sc-][class$=consent-banner],div[data-enzyme-id=CookieComplianceModal],div[data-tracking-opt-in-overlay],div[id^=sp_message_container_],script[src^="https://k.twitchcdn.net"]+.ReactModalPortal,tiktok-cookie-banner,.osano-cm-window,#didomi-host,#qc-cmp2-container,#cookieBanner,#iubenda-cs-banner,#cookie-banner_flag + #banner-wrapper,#gd-cookie-consent,.gdpr-wrapper,fainin-cookie-consent,#precmpdialog,.js-consent-banner,#hellotrust_cookie_popup,#cookiebanner,#cookiePrefPopup,.cookie-consent-spice,#cookie_accept_msg_block,#optanon,.optanon-alert-box-wrapper,iframe#fast-cmp-iframe,#cookieDialog,#cookie-notice,#cookie-consent,.mnd-cookie-modal,#cookie-law-info-bar,#cliSettingsPopup.cli-show,#consent-manager,#cookiefirst-root,.cookiefirst-root,#form-cookies-banner,#appconsent,#cookieConsent,.cookie-disclaimer-intrusive,#cookieconsent_options,#cookie-overlay,#cookieNotice,#cookie-consent-wrapper,.cc-window[role="dialog"][aria-label="cookieconsent"][aria-describedby="cookieconsent:desc"],[aria-describedby="cookiebar-desc"],div[aria-describedby="cookieconsent:desc"].cc-window + div > div[id="cookieconsent:settings"],#cookie_consent,.cookie-panel__description,.as-oil-content-overlay,.mnd-cookie-wrapper,.mnd-cookie-modal,#colorbox.cookie-popup,.individual-cookie-wrap,#cookie-manage,#cookiebarNew,#cookiesMessage,.page-wrap--cookie-permission,#cookie-consent[data-cookie-consent-manager="true"],.js-cookiebox,#idxrcookies,form#cookiebar,.cookie-popup[x-data],.c24-cookie-consent-wrapper,.cookie-banner,#modalCookie,.cookie-modal,#cookieModal,#cookie_banner,#ccc,#cc--main.c--anim[style],#cc-main,.mmcm-container,cmp-banner,sibbo-cmp-layout,.cookies_modalbox,div[id="orejime"],.acris-cookie-consent,#gdpr-dialog,#GDPRConsentManagerContainer,.TraminoConsent,#cookieNote,#cookie-disclosure,.adsk-gdpr-footer-wrapper,#p_p_id_CookiePortlet_,div[id="klaro"],div[id="timm4-cookie-consent"],#SgCookieOptin,#usercentrics-button,#bgc-cookie-popup,#sd-cmp[class^="sd-cmp-"],.cky-consent-container,.cky-modal,.cky-overlay,#acris--cookie-permission--modal-overlay,#acris--page-wrap--cookie-permission,#shopify-pc__banner[role="alertdialog"][aria-labelledby][style="display: block;"],.--framer-cookie-banner-container,#privacy_optin_611,div[id^="__tealiumGDPR"],.avia-cookie-consent-wrap,#cookiebar_optin_219.open,iframe[src^="https://cdn.baycloud.com/"],#sd-cmp[class^="sd-cmp-"],.ccm-root,body > .stpd_cmp,#jmdCookieConsentWrapper,#bbcdBanner,#consent-manager.active,#consent.active,#cookieChoiceInfo.cookie-choices-info,div[aria-describedby="cc-individual-cookie-settings"],.cc-individual-cookie-settings-overlay,div[class="sp-dsgvo sp-dsgvo-popup-overlay not-accepted"],aside#moove_gdpr_cookie_info_bar,[class^="gdpr_lightbox gdpr_lightbox-opened"],#moove_gdpr_cookie_modal,#coiOverlay[role="banner"][style="display: flex;"][aria-hidden="false"],.cookieinfo[style^="position: fixed; left: 0px; right: 0px; height: auto; min-height: 21px; z-index: 2147483647; "],.cookie-permission-container[data-cookie-permission="true"][style="display: block;"],[class="mw-cookiewarning-container"],#tarteaucitronRoot,div[class="cc_banner-wrapper "],#eightworks-cookie-consent-plus[data-cookie-permission="true"],#ketch-modal.ketch-flex, #ketch-banner.ketch-flex,#transcend-consent-manager[style="position: fixed; z-index: 2147483647;"],#axeptio_overlay.axeptio_mount[data-project-id],#cmp-app-container,div[role="dialog"].ch2-visible.ch2-dialog,div[class="ch2-settings ch2-settings-scan ch2-visible"],.amgdprjs-bar-template,.amgdprcookie-modal-container,.amgdprcookie-modal-container + .modals-overlay,li[class="notice js-notice notice--primary notice--cookie"],#freeprivacypolicy-com---nb[aria-describedby="cc-nb-text"],#cc_dialog[aria-labelledby="cc_dialog"].cc_css_reboot,#redim-cookiehint-bottom,#redim-cookiehint-modal,#dmsCookiePopup,#cookiesplus-modal-container.cookiesplus-move,#fides-banner-container.fides-banner:not(.fides-banner-hidden),.fides-modal-container[data-testid="consent-modal"]:not([aria-hidden="true"]),#fides-overlay.fides-overlay,.pixelmate-big-wrapper.pixelmate-general-banner-wrapper,#pixelmate-settings-wrapper,#wpconsent-root > #wpconsent-container,#popin.popin-cmp,#uniccmp[data-nosnippet=""],.tx-om-cookie-consent,div[id^="utiq"]:has(a[href^="https://consenthub.utiq.com/"]),#ws_eu-cookie-container,[class^="offcanvas"][class$="show"][aria-modal="true"][role="dialog"],.otCookiesNotification:has(.js-offcanvas-cookie-accept-all),cms-accept-tags[data-cms-id],iframe.clym-widget-iframe,.widget_eu_cookie_law_widget[id^="eu_cookie_law_widget"],#cc-cookie-message[role][aria-labelledby="cc-cookie-headline"],.fc-consent-root{clip-path:circle(0)!important;pointer-events:none!important;}';
               css.setAttribute('id', 'q3xyktv21es96by0ybwvb1e9a37y5pu');
               if (document.head !== null) {
                  document.head.appendChild(css);
               }
               window.setTimeout(function () {
                  let csscheck1 = document.getElementById('q3xyktv21es96by0ybwvb1e9a37y5pu');
                  if (csscheck1 !== null) {
                     forcesessionstoragecss();
                     csscheck1.remove();
                  }
               }, 8000);
            }
         };
         window.addEventListener('DOMContentLoaded', function () {
            ladeversteckcss();
         });
         if (document.readyState !== 'loading') {
            ladeversteckcss();
         }
         let nc;
         let ncnowww;
         if (window.location.protocol === 'http:') {
            nc = "domain=" + window.location.hostname + ";max-age=86400; SameSite=Lax; path=/";
            ncnowww = "domain=" + domainohnewww + ";max-age=86400; SameSite=Lax; path=/";
         } else {
            nc = "domain=" + window.location.hostname + ";secure=true; max-age=86400; SameSite=None; path=/";
            ncnowww = "domain=" + domainohnewww + ";secure=true; max-age=86400; SameSite=None; path=/";
         }

         const cookiezeit = new Date().getTime();
         const cookiedatum = new Date().toISOString();
         const regeln = [{
            // privacy-mgmt.com
            seite: 'heise.de',
            setcookieakzeptieren: 'consentUUID=cc3fda07-066e-4c67-a9eb-72d5dce1a921_32_33_37_39_44_48_54_55_58;'
         }, {
            seite: 'spiegel.de',
            setcookieakzeptieren: 'consentUUID=5aca01af-a126-44e3-ae3c-b26b6baa419f_43_45_49;'
         }, {
            seite: 't3n.de',
            setcookieakzeptieren: 'consentUUID=a7f00152-3ceb-4694-a759-422cb7b302ad_26_35_38_40_43_44_46_49_55;'
         }, {
            seite: 'welt.de',
            setcookieakzeptieren: 'consentUUID=c2e087c6-5092-49e0-8187-3634107772e3_47_49_51_54_56_58;'
         }, {
            seite: 't-online.de',
            setcookieakzeptieren: 'consentUUID=c1fe44cb-41ae-4d2e-be8e-7903548984c1_51_54;'
         }, {
            seite: 'autobild.de',
            setcookieakzeptieren: 'consentUUID=22adf7b9d-db7e-4444-b36e-d4c079dfd0e2_25_29_32_34_37_41_42_44_47_49_50_51_54_55_56;'
         }, {
            seite: 'bild.de',
            setcookieakzeptieren: 'consentUUID=8d50c862-cc9e-4b60-b313-591952f29ab3_42_44_47_49_51_54_56_58;'
         }, {
            seite: 'computerbild.de',
            setcookieakzeptieren: 'consentUUID=b1aa470e-70cc-4891-8407-72f677cdec82_42_44_46_47_49_50_51_54_55_56_58;'
         }, {
            seite: 'stern.de',
            setcookieakzeptieren: 'consentUUID=f2196ea7-1afa-4986-87e4-2a28d05bd56b_32_33_38_41_44_46_48_50_51_55;'
         }, {
            seite: 'pcwelt.de',
            setcookieakzeptieren: 'consentUUID=478090ac-09a6-451f-a2c3-20789ac47314_32_33_34_36_38_40_42_44_46_47_48_49_50_51_54_55_56_58;'
         }, {
            seite: 'focus.de',
            setcookieakzeptieren: 'consentUUID=18b0a05b-008f-4e03-a958-439f32de8e88_32_34_36_38_39_42_44_46_49_51_54_58;'
         }, {
            seite: 'stuttgarter-nachrichten.de',
            setcookieakzeptieren: 'consentUUID=a376db30-519c-4054-a0fd-684cb7151ed4_54;'
         }, {
            seite: 'geo.de',
            setcookieakzeptieren: 'consentUUID=9392cae7-796a-4291-98fd-802b3970a5ee_32_34_38e_39_41_44_46_48_50_51_55;'
         }, {
            seite: 'giga.de',
            setcookieakzeptieren: 'consentUUID=84cfca1a-5862-4f4b-aa1f-1cc0a50992f1_54;'
         }, {
            seite: 'familie.de',
            setcookieakzeptieren: 'consentUUID=d9910087-44a0-40a9-8006-ab765cd84e61_54_56_58;'
         }, {
            seite: 'sport1.de',
            setcookieakzeptieren: 'consentUUID=89da2b14-cb6f-49e4-af96-67dc8d8a40f6_32_34_39_41_54_56_58;'
         }, {
            seite: 'kino.de',
            setcookieakzeptieren: 'consentUUID=48cf35cc-b2f2-4848-b888-be52246e47a9_54;'
         }, {
            seite: 'likehifi.de',
            setcookieakzeptieren: 'consentUUID=9f9ccda5-c4b8-49bf-973c-3470fb663bbc_32_33_34_36_37_38_41_42_43_47_48_50_54;'
         }, {
            seite: 'backenmachtgluecklich.de',
            setcookieakzeptieren: 'consentUUID=c7ac4d5e-c8ae-42d6-aca3-4341da49d300_32_34_36_41_46_47_51_54;',
            nowww: true
         }, {
            seite: 'raspberry-pi-geek.de',
            setcookieakzeptieren: 'consentUUID=039f14d5-214e-46a6-a3ab-0eebd5198635_32_33_34_36_38_41_42_43_47_48_50_54;'
         }, {
            seite: 'n-tv.de',
            setcookieakzeptieren: 'consentUUID=b275cb44-5e3c-4d1c-9a88-142c95caee24_44_46_49_51_54_56;'
         }, {
            seite: 'chip.de',
            setcookieakzeptieren: 'consentUUID=8c7e01cc-3108-4650-a225-681acde1db99_32_33_34_35_36_38_39_40_42_43_46_47_49_51_54_58;'
         }, {
            seite: 'rtl.de',
            setcookieakzeptieren: 'consentUUID=5a2997bb-3886-4fa1-b0f2-66a8d716c19c_32_34_37_39_41_44_46_49_51_54_56;'
         }, {
            seite: 'weather.com',
            setcookieakzeptieren: 'consentUUID=feda4979-9fb4-466c-b009-f4a279027ad9_55;'
         }, {
            seite: 'cinestar.de',
            setcookieakzeptieren: 'consentUUID=797b7d14-32c2-4a40-9935-9404824101d1_34_37_38_39_40_43_44_46_48_51_54_55_56;'
         }, {
            seite: 'forschung-und-wissen.de',
            setcookieakzeptieren: 'consentUUID=afebf0e1-6a7f-41d8-aad4-8245d1e40944_34_47;'
         }, {
            seite: 'ark-unity.com',
            setcookieakzeptieren: 'consentUUID=10a7171e-7071-4c34-9012-fe991aca25b7_42_44;'
         }, {
            seite: 'telepolis.de',
            setcookieakzeptieren: 'consentUUID=77de41d9-7918-43ba-b0c1-0365aa8942eb_36_39_44_46_48_50_51_54_55_58;'
         }, {
            seite: 'manager-magazin.de',
            setcookieakzeptieren: 'consentUUID=b24ca62c-88a2-4837-aef2-a9f08562e076_55;'
         }, {
            seite: 'zeit.de',
            setcookieakzeptieren: 'consentUUID=1cf0d3b1-d0bd-456c-8656-feaa5042a12f_47_51_55;'
         }, {
            // privacy-mgmt.com - ENDE
            seite: 'bandlab.com',
            setstorageablehnen: 'privacyConsent={"essential":true,"functionality":true,"analytics":false,"marketing":false}',
            setstorageakzeptieren: 'privacyConsent={"essential":true,"functionality":true,"analytics":true,"marketing":true}'
         }, {
            seite: 'aok.de',
            setcookieablehnen: 'aok-gp-cookie-settings={"comfort":{"key":"comfort","required":false,"approved":true},"functional":{"key":"functional","required":true,"approved":true},"tracking":{"key":"tracking","required":false,"approved":false}}; , aok_cookie_settings=%7B%22functional%22%3A%7B%22key%22%3A%22functional%22%2C%22name%22%3A%22Funktionale%20Cookies%22%2C%22required%22%3Atrue%2C%22approved%22%3Atrue%7D%2C%22comfort%22%3A%7B%22key%22%3A%22comfort%22%2C%22name%22%3A%22Komfort-Cookies%22%2C%22required%22%3Afalse%2C%22approved%22%3Atrue%7D%2C%22tracking%22%3A%7B%22key%22%3A%22tracking%22%2C%22name%22%3A%22Marketing-Cookies%22%2C%22required%22%3Afalse%2C%22approved%22%3Afalse%7D%7D;',
            setcookieakzeptieren: 'aok_cookie_settings=%7B%22functional%22%3A%7B%22key%22%3A%22functional%22%2C%22name%22%3A%22Funktionale%20Cookies%22%2C%22required%22%3Atrue%2C%22approved%22%3Atrue%7D%2C%22comfort%22%3A%7B%22key%22%3A%22comfort%22%2C%22name%22%3A%22Komfort-Cookies%22%2C%22required%22%3Afalse%2C%22approved%22%3Atrue%7D%2C%22tracking%22%3A%7B%22key%22%3A%22tracking%22%2C%22name%22%3A%22Marketing-Cookies%22%2C%22required%22%3Afalse%2C%22approved%22%3Atrue%7D%7D;'
         }, {
            seite: 'variohaus.de',
            setcookieablehnen: 'cookies=f=1%2Cs=0%2Cm=0;',
            setcookieakzeptieren: 'cookies=f=1%2Cs=1%2Cm=1;',
            reload: true
         }, {
            seite: 'fertighaus.de',
            setcookieablehnen: 'cookie_policy_config=es,fu;',
            setcookieakzeptieren: 'cookie_policy_config=es,st,fu,ma;'
         }, {
            seite: 'worms.de',
            setcookieablehnen: 'allowLoadExternRessources=0; , allowTracking=0; , hideCookieNotice=1;',
            setcookieakzeptieren: 'allowLoadExternRessources=1; , allowTracking=1; , hideCookieNotice=1;'
         }, {
            seite: 'jobcenter-myk.de',
            setcookieablehnen: 'bit_userConfirmCookies=true; , cookieconsent_status=comfort;',
            setcookieakzeptieren: 'bit_userConfirmCookies=true; , cookieconsent_status=statistics,comfort,marketing;'
         }, {
            seite: 'clickstorm.de',
            setcookieablehnen: 'cs_cookie_first=%7Cessential%7CexternalMedia%7Cmaps_google%7Cvideos_youtube%7C;',
            setcookieakzeptieren: 'cs_cookie_first=%7Cessential%7CexternalMedia%7Cmaps_google%7Cvideos_youtube%7Cstatistics%7Cgtm%7C;'
         }, {
            seite: 'ubuntu.com',
            setcookieablehnen: '_cookies_accepted=functionality;',
            setcookieakzeptieren: '_cookies_accepted=all;'
         }, {
            seite: 'gofundme.com,patreon.com',
            setstorageablehnen: 'tcmConsent={"purposes":{"SaleOfInfo":"Auto","Analytics":false,"Functional":true,"Advertising":false},"timestamp":"' + cookiedatum + '","confirmed":true,"prompted":true,"updated":true}',
            setstorageakzeptieren: 'tcmConsent={"purposes":{"SaleOfInfo":"Auto","Analytics":true,"Functional":true,"Advertising":true},"timestamp":"' + cookiedatum + '","confirmed":true,"prompted":true,"updated":true}'
         }, {
            seite: 'afternic.com,godaddy.com',
            setcookieablehnen: 'OPTOUTMULTI=0:0%7Cc2:1%7Cc9:1%7Cc11:1; , pwinteraction=Thu%2C%2025%20Jun%202026%2022%3A48%3A00%20GMT;',
            setcookieakzeptieren: 'OPTOUTMULTI=0:0%7Cc2:0%7Cc9:0%7Cc11:0; , pwinteraction=Thu%2C%2025%20Jun%202026%2022%3A48%3A00%20GMT;'
         }, {
            seite: 'change.org',
            setstorageablehnen: '_change_cookie_prefs={"preferences":{"consent_text":"Cookies akzeptieren","status":false},"analytics":{"consent_text":"Cookies akzeptieren","status":false},"marketing":{"consent_text":"Cookies akzeptieren","status":false}}',
            setstorageakzeptieren: '_change_cookie_prefs={"preferences":{"consent_text":"Cookies akzeptieren","status":true},"analytics":{"consent_text":"Cookies akzeptieren","status":true},"marketing":{"consent_text":"Cookies akzeptieren","status":true}}'
         }, {
            seite: 'tunnelbear.com',
            setcookieablehnen: 'ac={%22necessary%22:true%2C%22optional%22:false};',
            setcookieakzeptieren: 'ac={%22necessary%22:true%2C%22optional%22:true};'
         }, {
            seite: 'dahag.de',
            setcookieablehnen: 'dahagCookieConsent={"necessary":"true","statistic":"false"};',
            setcookieakzeptieren: 'dahagCookieConsent={"necessary":"true","statistic":"true"};'
         }, {
            seite: 'bayernportal.de',
            setcookieablehnen: 'comfortConsent=true; , cookieConsent=true;',
            setcookieakzeptieren: 'comfortConsent=true; , cookieConsent=true; trackingConsent=true;',
            reload: true
         }, {
            seite: 'scoyo.de',
            setcookieablehnen: 'squla-analytical-agreement=0; , squla-cookie-agreement=1; , squla-marketing-agreement=0;',
            setcookieakzeptieren: 'squla-analytical-agreement=1; , squla-cookie-agreement=1; , squla-marketing-agreement=1;'
         }, {
            seite: 'optoma.de',
            setcookieablehnen: 'optoma_cookie_preference=false;',
            setcookieakzeptieren: 'optoma_cookie_preference=true;'
         }, {
            seite: 'minecraft.tools',
            setcookieablehnen: 'cc_cookie={"level": ["necessary"]};',
            setcookieakzeptieren: 'cc_cookie={"level": ["necessary","analytics","adsense"]};'
         }, {
            seite: 'edeka.de',
            setcookieablehnen: 'EDEKA_PRIVACY_CENTER=; , EDEKA_PRIVACY=1@057@@91@1690139442149@;',
            setcookieakzeptieren: 'EDEKA_PRIVACY_CENTER=1%2C3%2C4%2C5%2C6%2C7%2C8%2C95%2C96; , EDEKA_PRIVACY=0%40087%7C6%7C5030%401%2C3%2C4%2C5%2C6%2C7%2C8%2C95%2C96%4091%401782428201434%2C1782428201434%2C1816124201434%40;'
         }, {
            seite: 'bewerbung-tipps.com',
            setcookieablehnen: 'cookieconsent=%5B%5D;',
            setcookieakzeptieren: 'cookieconsent=%5B%22accept%22%5D;',
            reload: true
         }, {
            seite: 'xenudo.de',
            setcookieablehnen: 'cookie-consent=;',
            setcookieakzeptieren: 'cookie-consent=analytics,marketing;',
            reload: true
         }, {
            seite: 'theo-schrauben.de',
            setstorageablehnen: '{"version":5,"settings":{"recaptcha":false,"youtube":false,"vimeo":false,"ws5_sendinblue_consent":false,"grez_consent_googlekundenrezensionen":false,"gc_analytics":false,"gc_adwords":false,"jtl_paypal_commerce_consent":false}}',
            setstorageakzeptieren: 'consent={"version":5,"settings":{"youtube":true,"vimeo":true,"recaptcha":true,"ws5_sendinblue_consent":true,"grez_consent_googlekundenrezensionen":true,"gc_analytics":true,"gc_adwords":true,"jtl_paypal_commerce_consent":true}}'
         }, {
            seite: 'kick.com',
            setcookieablehnen: 'cookie_preferences_set_v2=%7B%22state%22%3A%7B%22preferences%22%3A%7B%22necessary%22%3Atrue%2C%22functional%22%3Atrue%2C%22performance%22%3Afalse%2C%22targeting%22%3Afalse%2C%22userHasMadeChoice%22%3Atrue%7D%2C%22functionalEnabled%22%3Atrue%2C%22performanceEnabled%22%3Afalse%2C%22targetingEnabled%22%3Afalse%7D%2C%22version%22%3A0%7D;',
            setcookieakzeptieren: 'cookie_preferences_set_v2=%7B%22state%22%3A%7B%22preferences%22%3A%7B%22necessary%22%3Atrue%2C%22functional%22%3Atrue%2C%22performance%22%3Atrue%2C%22targeting%22%3Atrue%2C%22userHasMadeChoice%22%3Atrue%7D%2C%22functionalEnabled%22%3Atrue%2C%22performanceEnabled%22%3Atrue%2C%22targetingEnabled%22%3Atrue%7D%2C%22version%22%3A0%7D;'
         }, {
            seite: 'catsbest.de',
            setcookieablehnen: 'gdpr-cookie=eyJ2ZXJzaW9uIjoiMiIsImdyb3VwcyI6eyJlc3NlbnRpYWwiOnRydWUsInN0YXRpc3RpY3MiOmZhbHNlLCJleHRlcm5hbC1tZWRpYSI6dHJ1ZX0sImNvb2tpZXMiOnsiZ29vZ2xlLWFuYWx5dGljcyI6ZmFsc2UsImZiLXBpeGVsIjpmYWxzZSwiZ29vZ2xlLXRhZy1tYW5hZ2VyIjpmYWxzZSwieW91dHViZSI6dHJ1ZX19;',
            setcookieakzeptieren: 'gdpr-cookie=eyJ2ZXJzaW9uIjoiMiIsImdyb3VwcyI6eyJlc3NlbnRpYWwiOnRydWUsInN0YXRpc3RpY3MiOnRydWUsImV4dGVybmFsLW1lZGlhIjp0cnVlfSwiY29va2llcyI6eyJnb29nbGUtYW5hbHl0aWNzIjp0cnVlLCJmYi1waXhlbCI6dHJ1ZSwiZ29vZ2xlLXRhZy1tYW5hZ2VyIjp0cnVlLCJ0aWt0b2stcGl4ZWwiOnRydWUsImFkZm9ybS1waXhlbCI6dHJ1ZSwieW91dHViZSI6dHJ1ZSwiY2xldmVycmVhY2giOnRydWV9fQ==;'
         }, {
            seite: 'metro.de,metro.fr,metro.at,metro.bg,makro.nl,metro.it,metro.pe,makro.cz,makro.pt,makro.pl',
            setcookieablehnen: 'allowedCookieCategories=necessary%7Cfunctional%7CUncategorized%7Cv1;',
            setcookieakzeptieren: 'allowedCookieCategories=necessary%7Cfunctional%7Cperformance%7Cpromotional%7Cprofiling%7CUncategorized%7Cv1;'
         }, {
            seite: 'mydpd.at',
            setcookieablehnen: 'cc=ga:0,fb:0,gm:1;',
            setcookieakzeptieren: 'cc=ga:1,fb:1,gm:1,os:1,cb:1;'
         }, {
            seite: 'adomino.net',
            setcookieablehnen: 'cookieflow=none;'
         }, {
            seite: 'vliegwinkel.nl',
            setcookieablehnen: 'cookieConsentLevel=functional;',
            setcookieakzeptieren: 'cookieConsentLevel=marketing;'
         }, {
            seite: 'kvk.nl',
            setcookieablehnen: 'allowAnalyticsCookiesKvK=0; , allowTrackingCookiesKvK=0;',
            setcookieakzeptieren: 'allowPreferenceCookiesKvK=1; , allowTrackingCookiesKvK=1;'
         }, {
            seite: 'wifi.at',
            setcookieakzeptieren: 'consent=true;'
         }, {
            seite: 'bayernlb.de',
            setcookieablehnen: 'layerCookie=true; , linkedInCookie=true; , maps=true; , podcast=true; , twitterCookie=true; , video=true;',
            setcookieakzeptieren: 'layerCookie=true; , linkedInCookie=true; , maps=true; , podcast=true; , twitterCookie=true; , video=true; , matomoCookie=true;',
            reload: true,
            noframe: true
         }, {
            seite: 'unive.it',
            setcookieakzeptieren: 'unive.it=1;'
         }, {
            seite: 'azb-cuw.pl',
            setcookieakzeptieren: 'cookie=1;'
         }, {
            seite: 'shimano.com',
            setcookieablehnen: 'cookiePrefAnalytics=0; , cookiePrefMarketing=0; , cookiePrefThirdPartyApplications=1; , eu_cookie_accept=1;',
            setcookieakzeptieren: 'cookiePrefAnalytics=1; , cookiePrefMarketing=1; , cookiePrefThirdPartyApplications=1; , eu_cookie_accept=1;'
         }, {
            seite: 'umcutrecht.nl',
            setcookieablehnen: '.AspNet.Consent=no;',
            setstorageablehnen: 'consent=.AspNet.Consent=no; expires=Fri, 22 Aug 2099 15:35:43 GMT; path=/; secure',
            setstorageakzeptieren: 'consent=.AspNet.Consent=yes; expires=Fri, 22 Aug 2099 15:35:43 GMT; path=/; secure'
         }, {
            seite: 'manutd.com',
            setcookieablehnen: 'userConsentCookiePolicy=off;',
            setcookieakzeptieren: 'userConsentCookiePolicy=on;'
         }, {
            seite: 'nano.org',
            setcookieakzeptieren: 'nano-org-cookie-consent-agree=true;'
         }, {
            seite: 'quickpharm.net',
            setcookieablehnen: 'cookieAgreement=false;',
            setcookieakzeptieren: 'cookieAgreement=false; ENABLE_TRACKERS=true;'
         }, {
            seite: 'landkreis-pfaffenhofen.de',
            setcookieablehnen: 'ld-cookieselection16569--1156368248-0=cookieselection-checkbox-necessary;',
            setcookieakzeptieren: 'ld-cookieselection16569--1156368248-0=cookieselection-checkbox-necessary;'
         }, {
            seite: 'cutt.ly',
            setcookieablehnen: 'cc_cookie={"categories":["necessary","preferences"],"level":["necessary","preferences"],"revision":0,"data":null,"rfc_cookie":false,"consent_date":"' + cookiedatum + '","consent_uuid":"e8ba3e38-a991-40e9-9876-917b66a3a733","last_consent_update":"' + cookiedatum + '"};',
            setcookieakzeptieren: 'cc_cookie={"categories":["necessary","preferences","analytics","targeting"],"level":["necessary","preferences","analytics","targeting"],"revision":0,"data":null,"rfc_cookie":false,"consent_date":"' + cookiedatum + '","consent_uuid":"a318b3a7-a55f-436d-bd54-7ace987e6bf8","last_consent_update":"' + cookiedatum + '"};'
         }, {
            seite: 'curseforge.com',
            setcookieakzeptieren: 'cf_cookieBarHandled=true;'
         }, {
            seite: 'virustotal.com',
            setcookieakzeptieren: 'euConsent=1;'
         }, {
            seite: 'bingen-ruedesheimer.de',
            setcookieablehnen: 'cookieConsent={%22Lang%22:%22DE%22%2C%22cat1%22:%22On%22%2C%22cat2%22:%22Off%22%2C%22cat3%22:%22Off%22%2C%22cat4%22:%22Off%22%2C%22cat5%22:%22Off%22%2C%22cat6%22:%22Off%22};',
            setcookieakzeptieren: 'cookieConsent={%22Lang%22:%22DE%22%2C%22cat1%22:%22On%22%2C%22cat2%22:%22On%22%2C%22cat3%22:%22On%22%2C%22cat4%22:%22On%22%2C%22cat5%22:%22On%22%2C%22cat6%22:%22On%22};'
         }, {
            seite: 'baechli-bergsport.ch',
            setstorageablehnen: 'cookieconsent={"functionality":true,"tracking":false,"marketing":false}',
            setstorageakzeptieren: 'cookieconsent={"functionality":true,"tracking":true,"marketing":true}'
         }, {
            seite: 'asus.com',
            setcookieablehnen: 'isReadCookiePolicyDNTAa=false; , isReadCookiePolicyDNT=No; , LithiumCookiesAccepted=0;',
            setcookieakzeptieren: 'isReadCookiePolicyDNTAa=true; , isReadCookiePolicyDNT=Yes;'
         }, {
            seite: 'huss-licht-ton.de',
            setcookieablehnen: 'huss_cookie_version=1; , huss_cookie=%7B%22acceptcookies%22%3A%5B%5D%2C%22user_hash%22%3A%22196df052e3382111587910b112cd9e504cc586da8fec77a0289248447766b588%22%7D;',
            setcookieakzeptieren: 'huss_cookie_version=1; , huss_cookie=%7B%22acceptcookies%22%3A%5B%22google_analytics%22%2C%22google_ads%22%2C%22google_tag_manager%22%2C%22bing_tag%22%2C%22kelkoo%22%2C%22neocom_chatbot%22%5D%2C%22user_hash%22%3A%22532a73f01e616ea7d4a99d31da74e3d997650156671a7b3378b2247a3cc7a37f%22%7D;'
         }, {
            seite: 'bosch-homecomfort.com,bosch-presse.de,bosch-smarthome.com,bosch-professional.com,bosch-ebike.com,bosch-bkk.de',
            setcookieablehnen: 'do-consent={%22consent%22:{%22convenience%22:false%2C%22analysis%22:false%2C%22marketing%22:false%2C%22advertising%22:false%2C%22custom%22:[]}%2C%22timeToLive%22:31%2C%22timestamp%22:' + cookiezeit + '%2C%22version%22:4};',
            setcookieakzeptieren: 'do-consent={%22consent%22:{%22convenience%22:false%2C%22analysis%22:true%2C%22marketing%22:true%2C%22advertising%22:false%2C%22custom%22:[]}%2C%22timeToLive%22:365%2C%22timestamp%22:' + cookiezeit + '%2C%22version%22:4};'
         }, {
            seite: 'bosch-professional.com,dremel.com',
            setcookieablehnen: 'privacy-consents-v4={%22consent%22:{%22convenience%22:false%2C%22analysis%22:false%2C%22marketing%22:false%2C%22advertising%22:false%2C%22custom%22:[]}%2C%22timeToLive%22:31%2C%22timestamp%22:' + cookiezeit + '%2C%22version%22:4};',
            setcookieakzeptieren: 'privacy-consents-v4={%22consent%22:{%22convenience%22:true%2C%22analysis%22:true%2C%22marketing%22:true%2C%22advertising%22:false%2C%22custom%22:[]}%2C%22timeToLive%22:365%2C%22timestamp%22:' + cookiezeit + '%2C%22version%22:4};'
         }, {
            seite: 'alpenverein-muenchen-oberland.de',
            setcookieablehnen: 'cookie_accept=0; , wgDisable3rdParty=1; , wgDisableAnalytics=1;',
            setcookieakzeptieren: 'cookie_accept=1; , wgDisable3rdParty=0; , wgDisableAnalytics=0;'
         }, {
            seite: 'lhsystems.com',
            setcookieablehnen: 'comfortCookiesAccepted=false; , functionalCookiesAccepted=false; , necessaryCookies=true; , statisticsCookiesAccepted=false;',
            setcookieakzeptieren: 'comfortCookiesAccepted=true; , functionalCookiesAccepted=true; , necessaryCookies=true; , statisticsCookiesAccepted=true;'
         }, {
            seite: 'enesco.co.uk',
            setcookieablehnen: 'acceptCookieCookie=true; , enableNonEssentialCookies=false;',
            setcookieakzeptieren: 'acceptCookieCookie=true; , enableNonEssentialCookies=true;'
         }, {
            seite: 'autohero.com',
            setcookieablehnen: 'consent=0;',
            setcookieakzeptieren: 'consent=1;'
         }, {
            seite: 'hamburgcars.net',
            setcookieablehnen: 'cookie_consent_status=["bdk","trustami"]; , cookie_consent_ts=' + cookiezeit + ';',
            setcookieakzeptieren: 'cookie_consent_status=["statistics","marketing","bdk","trustami"]; , cookie_consent_ts=' + cookiezeit + ';'
         }, {
            seite: 'otto.market',
            setcookieakzeptieren: 'allowCookies=true;'
         }, {
            seite: 'roller.de',
            setstorageablehnen: 'cookie-hinweis={"accepted":false,"declined":true}',
            setstorageakzeptieren: 'cookie-hinweis={"accepted":true,"declined":false}'
         }, {
            seite: 'hoeffner.de',
            setcookieakzeptieren: 'optOutAccepted=true;'
         }, {
            seite: 'moebel.de',
            setcookieablehnen: 'user-consent=Usercentrics%20Consent%20Management%20Platform;',
            setcookieakzeptieren: 'user-consent=Usercentrics%20Consent%20Management%20Platform%2COptin%2CConversion%20Linker%2CGoogle%20Analytics%20Advertising%2CCriteo%20OneTag%2CYouTube%20Video%2CFacebook%20Pixel%2CGoogle%20Analytics%2CGoogle%20Tag%20Manager%2CGoogle%20Maps%2CGoogle%20Ads%20Remarketing%2CMicrosoft%20Advertising%20Remarketing%2CYahoo%20Gemini%2CPrimest%2CIngenious%20Technologies%20AG%2Ctargeting360%2Crebounce.ai%2COutbrain%2CTaboola;',
            reload: true
         }, {
            seite: 'bike24.de',
            setcookieablehnen: 'cookieConsent={"algolia":false,"basket-store":true,"dy":false,"emarsys":false,"taboola":false,"google-ga":false,"google-tm":false,"facebook":false,"bing":false,"clarity":false,"rememberMe":true,"trbo":false,"zenloop":false,"version":"1.4"};',
            setcookieakzeptieren: 'cookieConsent={"acquisition":true,"algolia":true,"basket-store":true,"bikematrix":true,"bing":true,"checkout":true,"clarity":true,"emarsys":true,"facebook":true,"fact-finder":true,"google-ads":true,"google-ga":true,"google-tm":true,"growthbook":true,"outbrain":true,"recently-viewed":true,"rememberMe":true,"rtb-house":true,"sizekick":true,"smartfit":true,"trbo":true,"typeform":true,"youtube":true,"uppr":true,"version":"1.7"};'
         }, {
            seite: 'utiq.com',
            setstorageakzeptieren: 'utiqCookieAcknowledged=true'
         }, {
            seite: 'arbeitsagentur.de',
            setcookieablehnen: 'cookie_consent=denied; , marketing_consent=denied; , personalization_consent=denied;',
            setcookieakzeptieren: 'cookie_consent=accepted; , marketing_consent=accepted; , personalization_consent=accepted;'
         }, {
            seite: 'wuerfelzeit.com',
            setcookieablehnen: 'epCookieConsent=0;',
            setcookieakzeptieren: 'epCookieConsent=1;',
            reload: true
         }, {
            seite: 'zdf.de,zdfheute.de',
            setcookieablehnen: 'zdf_cmp_client={%22version%22:%22v1%22%2C%22iteration%22:1%2C%22consents%22:[{%22id%22:%22erforderlich%22%2C%22value%22:true}%2C{%22id%22:%22erfolgsmessung%22%2C%22value%22:false}%2C{%22id%22:%22personalisierung%22%2C%22value%22:false}%2C{%22id%22:%22socialMedia%22%2C%22value%22:false}%2C{%22id%22:%22instagram%22%2C%22value%22:false}%2C{%22id%22:%22twitter%22%2C%22value%22:false}%2C{%22id%22:%22facebook%22%2C%22value%22:false}%2C{%22id%22:%22drittsysteme%22%2C%22value%22:false}]};',
            setcookieakzeptieren: 'zdf_cmp_client={%22version%22:%22v1%22%2C%22iteration%22:1%2C%22consents%22:[{%22id%22:%22erforderlich%22%2C%22value%22:true}%2C{%22id%22:%22erfolgsmessung%22%2C%22value%22:true}%2C{%22id%22:%22personalisierung%22%2C%22value%22:true}%2C{%22id%22:%22socialMedia%22%2C%22value%22:true}%2C{%22id%22:%22instagram%22%2C%22value%22:true}%2C{%22id%22:%22twitter%22%2C%22value%22:true}%2C{%22id%22:%22facebook%22%2C%22value%22:true}%2C{%22id%22:%22drittsysteme%22%2C%22value%22:true}]};'
         }, {
            seite: 'lemon-aid.de',
            setstorageablehnen: 'cookie-consent=refuse',
            setstorageakzeptieren: 'cookie-consent=accept'
         }, {
            seite: 'pcbway.com',
            setcookieablehnen: 'pcbwaycookies_analytics=0; , pcbwaycookies_functional=0; , pcbwaycookies=true;',
            setcookieakzeptieren: 'pcbwaycookies_analytics=1; , pcbwaycookies_functional=1; , pcbwaycookies=true;',
            reload: true
         }, {
            seite: 'destatis.de,bmel.de,zensus2022.de,ble.de,bafa.de,aufstiegs-bafoeg.de,verfassungsschutz.de,bundespolizei.de,bund.de,deutsche-rohstoffagentur.de,bka.de,rki.de',
            setcookieablehnen: 'gsbbanner=closed; , cookieConsent=NO;',
            setcookieakzeptieren: 'gsbbanner=closed; , matomoTracking=true;'
         }, {
            seite: 'vdk.de',
            setstorageablehnen: 'vdk-required-enabled=true ,, vdk-status=acceptSelection',
            setstorageakzeptieren: 'vdk-iframe-enabled=true ,, vdk-matomo-enabled=true ,, vdk-podigee-enabled=true ,, vdk-required-enabled=true ,, vdk-status=acceptAll ,, vdk-youtube-enabled=true'
         }, {
            seite: 'spacebar.news',
            setcookieakzeptieren: 'hideCookieBanner=true;'
         }, {
            seite: 'tu-darmstadt.de',
            setcookieablehnen: 'cookie-consent=essential;',
            setcookieakzeptieren: 'cookie-consent=*;'
         }, {
            seite: 'uni-tuebingen.de',
            setcookieablehnen: 'in2cookiemodal-selection=[%22essential%22];',
            setcookieakzeptieren: '[%22essential%22%2C%22external%22]'
         }, {
            seite: 'uni-mannheim.de',
            setcookieablehnen: 'cookieNotice=1; , cookieAccept=0;',
            setcookieakzeptieren: 'cookieNotice=1; , cookieAccept=1;'
         }, {
            seite: 'uni-goettingen.de',
            setcookieablehnen: 'matomo_optOut=1;',
            setcookieakzeptieren: 'matomo_optIn=1;'
         }, {
            seite: 'tiktok.com',
            setcookieablehnen: 'cookie-consent={%22ga%22:false%2C%22af%22:false%2C%22fbp%22:false%2C%22lip%22:false%2C%22bing%22:false%2C%22ttads%22:false%2C%22reddit%22:false%2C%22hubspot%22:false%2C%22version%22:%22v10%22};',
            setcookieakzeptieren: 'cookie-consent={%22optional%22:true%2C%22ga%22:true%2C%22af%22:true%2C%22fbp%22:true%2C%22lip%22:true%2C%22bing%22:true%2C%22ttads%22:true%2C%22reddit%22:true%2C%22hubspot%22:true%2C%22version%22:%22v10%22};'
         }, {
            seite: 'uni-bielefeld.de',
            setcookieablehnen: 'ubf-cookie-consent=false;',
            setcookieakzeptieren: 'ubf-cookie-consent=true;'
         }, {
            seite: 'ispringlearn.de',
            setcookieablehnen: 'cookieConsent=4;',
            setcookieakzeptieren: 'cookieConsent=1;'
         }, {
            seite: 'bdc.de',
            setcookieablehnen: 'analyse-disabled=true;',
            setcookieakzeptieren: 'analyse-disabled=false;'
         }, {
            seite: 'helmholtz.de',
            setcookieablehnen: 'Helmholtz-Cookie=false;',
            setcookieakzeptieren: 'Helmholtz-Cookie=cookie-0;'
         }, {
            seite: 'theycantalk.com',
            setcookieakzeptieren: 'gdpr_banner_accepted=1;'
         }, {
            seite: 'lk-nienburg.de',
            setcookieakzeptieren: 'nolis_cookiedough=ALL;'
         }, {
            seite: 'tricksplit.io',
            setcookieakzeptieren: 'accepted=true'
         }, {
            seite: 'aeroreport.de',
            setstorageablehnen: 'aeroreport-consent-key=[1]',
            setstorageakzeptieren: 'aeroreport-consent-key=[1,2]'
         }, {
            seite: 'haute-innovation.com',
            setcookieakzeptieren: 'uncode_privacy%5Bprivacy_bar%5D=1;'
         }, {
            seite: 'baeckerei-roennau.de',
            setcookieablehnen: 'hasConsent=false;',
            setcookieakzeptieren: 'hasConsent=true;'
         }, {
            seite: 'wassermanufaktur.com',
            setstorageablehnen: 'cookiePreference=required',
            setstorageakzeptieren: 'cookiePreference=marketing'
         }, {
            seite: 'autismus-verstehen.de',
            setcookieablehnen: 'cookie_consent={"statistics":{"googleAnalytics":false}};',
            setcookieakzeptieren: 'cookie_consent={"statistics":{"googleAnalytics":true}};'
         }, {
            seite: 'honeygain.com',
            setcookieablehnen: 'cookieConsent={%22submitBasicData%22:true%2C%22submitUsageStats%22:false%2C%22submitAudienceData%22:false};',
            setcookieakzeptieren: 'cookieConsent={%22submitBasicData%22:true%2C%22submitUsageStats%22:true%2C%22submitAudienceData%22:true};',
            reload: true
         }, {
            seite: 'mobrog.com',
            setcookieakzeptieren: 'settings=on;'
         }, {
            seite: 'naehstudioulrike.de',
            setcookieablehnen: 'epCookieConsent=0;',
            setcookieakzeptieren: 'epCookieConsent=1;',
            reload: true
         }, {
            seite: 'stmas.bayern.de',
            setcookieablehnen: 'required=1;',
            setcookieakzeptieren: 'required=1; , statistik=1;'
         }, {
            seite: 'orderchamp.com',
            setcookieakzeptieren: 'COOKIEmessage=1;'
         }, {
            seite: 'grandprixradio.dk,grandprixradio.nl,grandprixradio.be',
            setcookieablehnen: 'analytics_cookies=0; , cookies_accepted=1; , tracking_cookies=0; , advertisement-age-show-alcohol=false; , advertisement-age-show-gamble=false;',
            setcookieakzeptieren: 'analytics_cookies=1; , cookies_accepted=1; , tracking_cookies=1; , advertisement-age-show-alcohol=false; , advertisement-age-show-gamble=false;'
         }, {
            seite: 'insolvenzanwalt24.de',
            setcookieablehnen: 'cookieAgree=%7B%22cookie-esssential%22%3Atrue%2C%22cookie-google-analytics%22%3Afalse%7D;',
            setcookieakzeptieren: 'cookieAgree=%7B%22cookie-esssential%22%3Atrue%2C%22cookie-google-analytics%22%3Atrue%7D;'
         }, {
            seite: 'studentenwerk-dresden.de',
            setcookieablehnen: 'swdd-cookie-consent=1;',
            setcookieakzeptieren: 'swdd-cookie-consent=2;',
            reload: true
         }, {
            seite: 'obelink.de',
            setcookieablehnen: 'cookieConsentPrefs={%22cg_essential%22:1%2C%22cg_analytical%22:1%2C%22cg_marketing%22:1%2C%22expire%22:182%2C%22secure%22:1};',
            setcookieakzeptieren: 'cookieConsentPrefs=%7B%22cg_essential%22%3A1%2C%22cg_analytics%22%3A1%2C%22cg_marketing%22%3A1%7D;'
         }, {
            seite: 'airitsystems.de',
            setcookieablehnen: 'limz_consent_cookie=%7B%22accepted%22%3Atrue%2C%22preferences%22%3Afalse%2C%22statistics%22%3Afalse%2C%22marketing%22%3Afalse%2C%22version%22%3A1%7D;',
            setcookieakzeptieren: 'limz_consent_cookie=%7B%22accepted%22%3Atrue%2C%22preferences%22%3Atrue%2C%22statistics%22%3Atrue%2C%22marketing%22%3Atrue%2C%22consentId%22%3A%221393.23833-21234%22%2C%22date%22%3A1782845807838%2C%22version%22%3A1%7D;'
         }, {
            seite: 'inf-shop.de',
            setcookieakzeptieren: 'gdpr_user_interaction_done=yes;'
         }, {
            seite: 'bmwk.de,bmwk-energiewende.de,german-energy-solutions.de,personalausweisportal.de,bundeswirtschaftsministerium.de',
            setcookieablehnen: 'cookiebanner=closed;',
            setcookieakzeptieren: 'cookiebanner=closed; , consent_jwplayer=yes;'
         }, {
            seite: 'bsi.bund.de',
            setcookieablehnen: 'cookiebanner=close;',
            setcookieakzeptieren: 'cookiebanner=close; , matomoTracking=true;'
         }, {
            seite: 'bund.de',
            setcookieablehnen: 'isTrackingConsentGiven=false;',
            setcookieakzeptieren: 'isTrackingConsentGiven=true;'
         }, {
            seite: 'fainin.com',
            setcookieablehnen: 'ucc_consents={%22choices%22:[%22base%22]%2C%22timestamp%22:%22' + cookiedatum + '%22%2C%22version%22:1};',
            setcookieakzeptieren: 'ucc_consents={%22choices%22:[%22base%22%2C%22analytics%22%2C%22ad_user_data%22%2C%22ad_personalization%22%2C%22ad_storage%22]%2C%22timestamp%22:%22' + cookiedatum + '%22%2C%22version%22:1};'
         }, {
            seite: 'metro.hu',
            setcookieablehnen: 'allowedCookieCategories=necessary;',
            setcookieakzeptieren: 'allowedCookieCategories=functional%7Cnecessary%7Cperformance%7Cpromotional%7Cthirdparty%7CUncategorized;'
         }, {
            seite: 'swrag.de',
            setcookieakzeptieren: 'CookieLayerDismissed=true;'
         }, {
            seite: 'drimsim.com',
            setstorageablehnen: 'DS_POLICY={"user":false,"anon":false}',
            setstorageakzeptieren: 'DS_POLICY={"user":true,"anon":true}'
         }, {
            seite: 'highend-audiokabel.de',
            setcookieakzeptieren: 'accept_cookies2=true;',
            reload: true
         }, {
            seite: 'fitx.de',
            setcookieablehnen: 'mandatory.consentGiven=true; , mandatory.marketing=false; , mandatory.preference=false;',
            setcookieakzeptieren: 'mandatory.consentGiven=true; , mandatory.marketing=true; , mandatory.preference=true;'
         }, {
            seite: 'diffusmag.de,diffus.de',
            setcookieablehnen: 'tracking=no;',
            setcookieakzeptieren: 'tracking=yes;'
         }, {
            seite: 'blocksmc.com',
            setcookieakzeptieren: 'allowCookies=1;'
         }, {
            seite: 'karriere-feuerwehr.hamburg',
            setcookieablehnen: 'hsnCookieAllowed={"gtm":false,"youtube":true};',
            setcookieakzeptieren: 'hsnCookieAllowed={"gtm":true,"youtube":true};'
         }, {
            seite: 'sell.amazon.de',
            setcookieablehnen: 'appguard-cookie-consent=operational%7C!performance%7C!advertising;',
            setcookieakzeptieren: 'appguard-cookie-consent=operational%7Cperformance%7Cadvertising;'
         }, {
            seite: 'kba-online.de',
            setstorageakzeptieren: 'ora-cookie-policy=accepted'
         }, {
            seite: 'swissgrid.ch',
            setcookieakzeptieren: 'acceptedCookie=true;'
         }, {
            seite: 'braufreude.de',
            setcookieakzeptieren: 'allowCookie=1;'
         }, {
            seite: 'github.com',
            setcookieablehnen: 'GHCC=Required:1-Analytics:0-SocialMedia:0-Advertising:0;',
            setcookieakzeptieren: 'GHCC=Required:1-Analytics:1-SocialMedia:1-Advertising:1;'
         }, {
            seite: 'go-e.com',
            setcookieablehnen: 'gdpr={%22version%22:%221.1_tracking%22%2C%22options%22:{%22typo3%22:true%2C%22gdpr%22:true%2C%22openstreetmap%22:true%2C%22vimeo%22:true%2C%22youtube%22:true%2C%22recaptcha%22:true%2C%22googlemaps%22:true%2C%22tracking%22:false}};',
            setcookieakzeptieren: 'gdpr={%22version%22:%221.1_tracking%22%2C%22options%22:{%22typo3%22:true%2C%22gdpr%22:true%2C%22openstreetmap%22:true%2C%22vimeo%22:true%2C%22youtube%22:true%2C%22googlemaps%22:true%2C%22ai_generated%22:true%2C%22chatbot%22:true%2C%22recaptcha%22:true%2C%22tracking%22:true}};'
         }, {
            seite: 'men-at-work.net',
            setcookieakzeptieren: 'bst_accepted=1;'
         }, {
            seite: 'twitter.com,x.com',
            setcookieablehnen: 'd_prefs=MjoxLGNvbnNlbnRfdmVyc2lvbjoyLHRleHRfdmVyc2lvbjoxMDAw;',
            setcookieakzeptieren: 'd_prefs=MToxLGNvbnNlbnRfdmVyc2lvbjoyLHRleHRfdmVyc2lvbjoxMDAw;',
            noframe: true
         }, {
            seite: 'developer.twitter.com,developer.x.com,help.x.com',
            setcookieablehnen: 'twtr_pixel_opt_in=N;',
            setcookieakzeptieren: 'twtr_pixel_opt_in=Y;'
         }, {
            seite: 'brightdata.de',
            setcookieablehnen: 'brd_cookie_consent=%7B%22name%22%3A%22save%22%2C%22saved_at%22%3A' + cookiezeit + '%2C%22settings%22%3A%7B%22necessary%22%3Atrue%2C%22pers%22%3Afalse%2C%22perf%22%3Afalse%2C%22mkt%22%3Afalse%7D%7D;',
            setcookieakzeptieren: 'brd_cookie_consent=%7B%22name%22%3A%22accept_all%22%2C%22saved_at%22%3A' + cookiezeit + '%2C%22settings%22%3A%7B%22necessary%22%3Atrue%2C%22pers%22%3Atrue%2C%22perf%22%3Atrue%2C%22mkt%22%3Atrue%7D%7D;'
         }, {
            seite: 'nico-fahrradwerkstatt.de',
            setcookieakzeptieren: 'b2ad21-874=true;'
         }, {
            seite: 'gluehbirnebillig.de',
            setcookieablehnen: 'cookieConsentAnalyticsGranted=0; , cookieConsentDeclined=0; , cookieConsentFunctionalityGranted=1; , cookieConsentGranted=1; , cookieConsentMarketingGranted=0; , cookieConsentPersonalizationGranted=1; , cookieConsentPersonalization=0; , cookieConsentSecurityGranted=1; , cookieConsentUserdata=0;',
            setcookieakzeptieren: 'cookieConsentAnalyticsGranted=1; , cookieConsentDeclined=1; , cookieConsentFunctionalityGranted=1; , cookieConsentGranted=1; , cookieConsentMarketingGranted=1; , cookieConsentPersonalizationGranted=1; , cookieConsentPersonalization=1; , cookieConsentSecurityGranted=1; , cookieConsentUserdata=1;'
         }, {
            seite: 'adidas.de',
            setcookieablehnen: 'notice_preferences=%5B0%2C1%5D;',
            setcookieakzeptieren: 'notice_preferences=%5B0%2C1%2C2%5D;'
         }, {
            seite: 'matratzen.discount',
            setcookieablehnen: 'md_cookie_allow={%22necessary%22:true%2C%22advertising%22:false};',
            setcookieakzeptieren: 'md_cookie_allow={%22necessary%22:true%2C%22advertising%22:true};'
         }, {
            seite: 'sex.de',
            setcookieablehnen: 'CookieConsent=esex;',
            setstorageablehnen: 'CookieAccept=1',
            setstorageakzeptieren: 'CookieAccept=1 ,, CookiesAnalytics=1 ,, CookiesInternalStatistics=1 ,, CookiesLogin=1 ,, CookiesMarketing=1 ,, CookiesSupport=1'
         }, {
            seite: 'sex.com',
            setcookieablehnen: 'privacy-preferences=%7B%22essential%22%3Atrue%2C%22analytics%22%3Afalse%7D;',
            setcookieakzeptieren: 'privacy-preferences=%7B%22essential%22%3Atrue%2C%22analytics%22%3Atrue%7D;'
         }, {
            seite: 'tuinmaximaal.de',
            setcookieablehnen: 'pr-cookie-consent=[]; , pr-cookie-consent-id=3767448; , user_allowed_save_cookie=%7B%7D;',
            setcookieakzeptieren: 'pr-cookie-consent=%5B%22all%22%5D; , pr-cookie-consent-id=10441021; , user_allowed_save_cookie=%7B%223%22%3A1%7D;'
         }, {
            seite: 'gogoro.com',
            setcookieablehnen: 'GDPR_OPT=REJECTED; , LEGAL_OPT=1;',
            setcookieakzeptieren: 'GDPR_OPT=ACCEPTED; , LEGAL_OPT=1;'
         }, {
            seite: 'geotastic.net',
            setstorageakzeptieren: 'privacy-policy-accepted=true ,, privacy-policy-accepted-date=' + cookiezeit + ''
         }, {
            seite: 'dashboard-deutschland.de',
            setcookieakzeptieren: 'cbV2Closed=true'
         }, {
            seite: 'hyla-germany.de',
            setstorageablehnen: 'cookie-preference=declined',
            setstorageakzeptieren: 'cookie-preference=accepted'
         }, {
            seite: 'energie-und-management.de',
            setcookieablehnen: 'trackingConsent=1; , trackingDisableGoogle=1; , trackingDisableIVW=1; , trackingPressed=1;'
         }, {
            seite: 'upmpaper.com',
            setcookieablehnen: 'UPMCookiePolicy=strictlyNecessary|functional;',
            setcookieakzeptieren: 'UPMCookiePolicy=strictlyNecessary|functional|marketing|statistical;'
         }, {
            seite: 'dekra.de',
            setstorageablehnen: 'privacySettings={"baidu_maps":"true","linkedin":"false","facebook":"false","googleAds":"false","baidu":"false","hubspot":"false","hotjar":"false","matomo":"false","googleTagManager":"false","youtube":"true","applicationsights":"false","google_maps":"true","vimeo":"true"}',
            setstorageakzeptieren: 'privacySettings={"baidu_maps":"true","linkedin":"true","facebook":"true","googleAds":"true","baidu":"true","hubspot":"true","hotjar":"true","matomo":"true","googleTagManager":"true","youtube":"true","applicationsights":"true","google_maps":"true","vimeo":"true"}'
         }, {
            seite: 'tiny-house-helden.de',
            setcookieablehnen: 'allowTracking=declined;',
            setcookieakzeptieren: 'allowTracking=accepted;'
         }, {
            seite: 'vehgroshop.de',
            setstorageakzeptieren: 'showCookieBar=false'
         }, {
            seite: 'freiflaechen-photovoltaik.de',
            setcookieakzeptieren: 'fhw_dsgvo_cookies_cookie=1;'
         }, {
            seite: 'einfach-sparsam.de',
            setcookieakzeptieren: 'einfach_sparsam_consent=1;'
         }, {
            seite: 'bauzaunwelt.de',
            setcookieablehnen: 'cookiesplus=%7B%22C_P_DISPLAY_MODAL%22%3Afalse%2C%22cookiesplus-finality-18%22%3A%22on%22%2C%22cookiesplus-finality-19%22%3A%22off%22%2C%22cookiesplus-finality-20%22%3A%22off%22%2C%22consent_date%22%3A%222024-07-21%2015%3A29%22%7D;',
            setcookieakzeptieren: 'cookiesplus=%7B%22C_P_DISPLAY_MODAL%22%3Afalse%2C%22cookiesplus-finality-18%22%3A%22on%22%2C%22cookiesplus-finality-19%22%3A%22on%22%2C%22cookiesplus-finality-20%22%3A%22on%22%2C%22consent_date%22%3A%222026-07-01%2021%3A50%22%7D;'
         }, {
            seite: 'energiestiftung.ch',
            setcookieablehnen: 'cms_cookie=reject;',
            setcookieakzeptieren: 'cms_cookie=accept;',
            reload: true
         }, {
            seite: 'bernau.de',
            setcookieablehnen: 'privacySettings=%7B%22core%22%3A%221%22%2C%22functional%22%3A%220%22%2C%22external%22%3A%220%22%2C%22analytics%22%3A%220%22%7D;',
            setcookieakzeptieren: 'privacySettings=%7B%22core%22%3A%221%22%2C%22functional%22%3A%221%22%2C%22external%22%3A%221%22%2C%22analytics%22%3A%221%22%7D;',
            reload: true
         }, {
            seite: 'dnr.de',
            setstorageablehnen: 'gd-consent={"activeCategories":[],"activeServices":[]}',
            setstorageakzeptieren: 'gd-consent={"activeCategories":["essential","external_media","statistics","engagement"],"activeServices":["navigation","matomo","ga","youtube","vimeo"]}'
         }, {
            seite: 'pendlerinfo.org',
            setcookieakzeptieren: 'dataProtectionConfirmed=yes;'
         }, {
            seite: 'csagroup.org',
            setcookieablehnen: 'tru-analytics-cookies=no; , tru-functional-cookies=yes; , tru-required-cookies=yes; , tru-targeting-cookies=no;',
            setcookieakzeptieren: 'tru-analytics-cookies=yes; , tru-functional-cookies=yes; , tru-required-cookies=yes; , tru-targeting-cookies=yes;'
         }, {
            seite: 'intelligent-heizen.info',
            setcookieablehnen: 'bs_cookie_settings={"level":["necessary"],"revision":0,"data":null,"rfc_cookie":false};',
            setcookieakzeptieren: 'bs_cookie_settings={"level":["necessary","analytics"],"revision":0,"data":null,"rfc_cookie":false};'
         }, {
            seite: 'tinte24.de',
            setcookieablehnen: 'mcDsgvo=declined;',
            setcookieakzeptieren: 'mcDsgvo=accepted;'
         }, {
            seite: 'bing.com',
            setcookieablehnen: 'BCP=AD=0&AL=0&SM=0;',
            setcookieakzeptieren: 'BCP=AD=1&AL=1&SM=1;'
         }, {
            seite: 'standort-sachsen.de',
            setcookieablehnen: 'user-settings-cookies=accept-none;',
            setcookieakzeptieren: 'user-settings-cookies=accept-all;'
         }, {
            seite: 'fz-juelich.de',
            setcookieakzeptieren: 'confirm_cookies=1;'
         }, {
            seite: 'channele2e.com',
            setcookieakzeptieren: 'CookieConsent=true;'
         }, {
            seite: 'xn--fahrradprfung-4ob.de,fahrradprüfung.de',
            setcookieablehnen: 'ckcs=deny;',
            setcookieakzeptieren: 'ckcs=allow;'
         }, {
            seite: 'energieheld.de',
            setcookieablehnen: 'CookieConsent={stamp:%27WM+blRw847WoKzGlcdHBfaOHz2SjIf+168yIrGTeXIOFA48wyhNUXA==%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:false%2Cmarketing:false%2Cmethod:%27explicit%27%2Cver:2%2Cutc:1752782707503%2Cregion:%27de%27};',
            setcookieakzeptieren: 'CookieConsent={stamp:%27KQycVIUH97F/J6n/RStj/vQpY7Z96VXu/k65lMlpHfYPKhGdbbcSAg==%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cmethod:%27explicit%27%2Cver:2%2Cutc:1782936482420%2Cregion:%27de%27};',
            reload: true
         }, {
            seite: 'vbv.at',
            setcookieablehnen: 'fcc_cookie_consent=1;',
            setcookieakzeptieren: 'fcc_cookie_consent=1; , cookie_ytvideo=1; , cookie_matomo=1;'
         }, {
            seite: 'hypixel.net',
            setcookieablehnen: 'xfNew_consent=%5B%5D;',
            setcookieakzeptieren: 'xfNew_consent=%5B%22_third_party%22%2C%22optional%22%5D;'
         }, {
            seite: 'hugelshofer-logistik.ch',
            setcookieakzeptieren: 'cookieinfo=0;',
            reload: true
         }, {
            seite: 'bunny.net',
            setcookieakzeptieren: 'bn_cookies=1;'
         }, {
            seite: 'silent-power.com',
            setcookieakzeptieren: 'silent_power_cookie_policy=accepted;'
         }, {
            seite: 'blogspot.com', // Nur Subdomains
            setcookieakzeptieren: 'displayCookieNotice=y;'
         }, {
            seite: 'opel.de',
            setcookieakzeptieren: '_psac_gdpr_consent_given=1;'
         }, {
            seite: 'frankonia.de',
            setcookieablehnen: 'cm=0;',
            setcookieakzeptieren: 'cm=1;',
            reload: true
         }, {
            seite: 'greenpeace.org',
            setcookieakzeptieren: 'active_consent_choice=1;'
         }, {
            seite: 'stromausfall.info',
            setcookieakzeptieren: 'HideCookieWarning=true;',
            reload: true
         }, {
            seite: 'finya.de',
            setcookieablehnen: 'fyCcDecision={"ccStatistics":false};',
            setcookieakzeptieren: 'fyCcDecision={"ccStatistics":true};'
         }, {
            seite: 'blitzrechner.de',
            setcookieablehnen: 'gdpr-consent=["necessary"];',
            setcookieakzeptieren: 'gdpr-consent=["necessary","statistics","marketing"];'
         }, {
            seite: 'wind-turbine-models.com',
            setcookieablehnen: 'sl_consentcookie={"necessary":false,"analytics":false};',
            setcookieakzeptieren: 'sl_consentcookie={"necessary":true,"analytics":true};'
         }, {
            seite: 'vivid.money',
            setcookieablehnen: 'v.settings_cookie={%22essential%22:true%2C%22personalization%22:false%2C%22analytics%22:false};',
            setcookieakzeptieren: 'v.settings_cookie={%22essential%22:true%2C%22personalization%22:true%2C%22analytics%22:true};'
         }, {
            seite: 'gekko-computer.de',
            setcookieablehnen: '4S_CookiePrivacy=v2-7465215491294153393:1[11]-0[0]-0[000]-0[00000];',
            setcookieakzeptieren: '4S_CookiePrivacy=v2-7465215491294153393:1[11]-1[1]-1[111]-1[11111];'
         }, {
            seite: 'consilium.europa.eu',
            setstorageablehnen: 'cookieConsentAccepted=false',
            setstorageakzeptieren: 'cookieConsentAccepted=true'
         }, {
            seite: 'eskp.de',
            setcookieablehnen: 'netl_gdpr_allowed=["essential"];',
            setcookieakzeptieren: 'netl_gdpr_allowed=["essential","matomo"];'
         }, {
            seite: 'whois.com',
            setcookieablehnen: 'cookieconsent_status=dismiss; , cookieconsent_prompt=1;',
            setcookieakzeptieren: 'cookieconsent_status=accept; , cookieconsent_prompt=1;'
         }, {
            seite: 'hawesko.de',
            setcookieablehnen: 'COOKIECONSENT=eyJvdGhlciI6ZmFsc2UsIm1hcmtldGluZyI6ZmFsc2UsInRyYWNraW5nIjpmYWxzZSwiZXNzZW50aWFsIjp0cnVlfQ==;',
            setcookieakzeptieren: 'COOKIECONSENT=eyJvdGhlciI6dHJ1ZSwibWFya2V0aW5nIjp0cnVlLCJ0cmFja2luZyI6dHJ1ZSwiZXNzZW50aWFsIjp0cnVlfQ==;',
            reload: true
         }, {
            seite: 'ecwid.com',
            setstorageablehnen: 'allow-gdpr-cookie=false',
            setstorageakzeptieren: 'allow-gdpr-cookie=true'
         }, {
            seite: 'javascript-kurs.de',
            setcookieakzeptieren: 'cookiehinweis_ausblenden=yes;'
         }, {
            seite: 'tesla.com',
            setcookieablehnen: 'tsla-cookie-consent=rejected;',
            setcookieakzeptieren: 'tsla-cookie-consent=accepted;'
         }, {
            seite: 'strato.de',
            setcookieablehnen: 'cookiecookie=2023-12-14T12%3A34%3A00Z_1000_11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C22;',
            setcookieakzeptieren: 'cookiecookie=2023-12-14T12%3A34%3A00Z_1111_1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19%2C20%2C21%2C22%2C23%2C24%2C25%2C26%2C27%2C28%2C29%2C30%2C31%2C32%2C33%2C34%2C35%2C36%2C37%2C38;'
         }, {
            seite: 'pv-magazine.com',
            setcookieablehnen: 'euCookie=set;'
         }, {
            seite: 'oklo.com',
            setcookieakzeptieren: 'cookiemonster-gdpr=' + cookiezeit + ';'
         }, {
            seite: 'ibisworld.com',
            setcookieablehnen: 'cookieyes-consent=consentid:QUx1QUR2UlViUkEyeFBZaTNaZ2QxS0NKTmlGUlk5cVY,consent:yes,action:yes,necessary:yes,functional:no,analytics:no,performance:no,advertisement:no,other:no;',
            setcookieakzeptieren: 'cookieyes-consent=consentid:VnhOa2FSMkdSRTBJdnNPT1FZd2REY2FtNTM1UGNyUlI,consent:yes,action:yes,necessary:yes,functional:yes,analytics:yes,performance:yes,advertisement:yes,other:yes;'
         }, {
            seite: 'felgenshop.de',
            setcookieablehnen: 'df-cookie-essenziell=true;',
            setcookieakzeptieren: 'df-cookie-essenziell=true; , df-cookie-externe-medien=true; , df-cookie-marketing=true; , df-cookie-statistiken=true;',
            reload: true
         }, {
            seite: 'klangheimat.de',
            setcookieakzeptieren: 'accept_cookies2=true;',
            reload: true
         }, {
            seite: 'tennet.eu',
            setcookieablehnen: 'tennet-cookie-consent=false;',
            setcookieakzeptieren: 'tennet-cookie-consent=true;'
         }, {
            seite: 'bde.de',
            setcookieablehnen: 'bde_cookies_limited=true;',
            setcookieakzeptieren: 'bde_cookies_full=true;'
         }, {
            seite: 'koramaup.com',
            setcookieakzeptieren: 'cookieconsent=1;'
         }, {
            seite: 'sites.google.com,openfietsmap.nl',
            setcookieablehnen: 'SITES_NON_ESSENTIAL_COOKIES_CONSENT=0; , SITES_CONSENT=1;',
            setcookieakzeptieren: 'SITES_NON_ESSENTIAL_COOKIES_CONSENT=1;',
            reload: true
         }, {
            seite: 'reolink.com',
            setcookieablehnen: 'gdprNewLocalName=%7B%22features%22%3Atrue%2C%22ads%22%3Afalse%2C%22googleAdsTracking%22%3Afalse%7D;',
            setcookieakzeptieren: 'gdprNewLocalName=%7B%22features%22%3Atrue%2C%22ads%22%3Atrue%2C%22googleAdsTracking%22%3Atrue%7D;'
         }, {
            seite: 'bmw.de',
            setcookieablehnen: 'cc_consentCookie=%7B%22bmw_germany_family%22%3A%7B%22cmm%22%3A%7B%22advertising%22%3A0%7D%2C%22cdc%22%3A1%2C%22tp%22%3A1661330829156%2C%22lmt%22%3A1727960164399%7D%7D;',
            setcookieakzeptieren: 'cc_consentCookie=%7B%22bmw_germany_family%22%3A%7B%22cmm%22%3A%7B%22advertising%22%3A1%7D%2C%22cdc%22%3A1%2C%22tp%22%3A1661330829156%2C%22lmt%22%3A1783103370154%7D%7D;'
         }, {
            seite: 'mini.de',
            setcookieablehnen: 'cc_consentCookie=%7B%22mini_germany_family%22%3A%7B%22cmm%22%3A%7B%22advertising%22%3A0%7D%2C%22cdc%22%3A1%2C%22tp%22%3A1661330829156%2C%22lmt%22%3A1727960594266%7D%7D;',
            setcookieakzeptieren: 'cc_consentCookie=%7B%22mini_germany_family%22%3A%7B%22cmm%22%3A%7B%22advertising%22%3A1%7D%2C%22cdc%22%3A1%2C%22tp%22%3A1661330829156%2C%22lmt%22%3A1783103420006%7D%7D'
         }, {
            seite: 'bmwgroup-werke.com',
            setcookieablehnen: 'cc_consentCookie=%7B%22bmwgroup-werke_com%22%3A%7B%22cmm%22%3A%7B%22advertising%22%3A0%7D%2C%22tp%22%3A1661330829156%2C%22lmt%22%3A1741554416904%7D%7D;',
            setcookieakzeptieren: 'cc_consentCookie=%7B%22bmwgroup-werke_com%22%3A%7B%22cmm%22%3A%7B%22advertising%22%3A1%7D%2C%22tp%22%3A1661330829156%2C%22lmt%22%3A1783103466179%7D%7D;'
         }, {
            seite: 'audi.de',
            setcookieablehnen: 'AUDI_ENSIGHTEN_PRIVACY_Do_Not_Track=1; , AUDI_ENSIGHTEN_PRIVACY_External_Content=0; , AUDI_ENSIGHTEN_PRIVACY_Functional=1; , AUDI_ENSIGHTEN_PRIVACY_Marketing=0; , AUDI_ENSIGHTEN_PRIVACY_MODAL_LOADED=1; , AUDI_ENSIGHTEN_PRIVACY_MODAL_VIEWED=1; , AUDI_ENSIGHTEN_PRIVACY_Performance=0; , AUDI_ENSIGHTEN_PRIVACY_Social=0;',
            setcookieakzeptieren: 'AUDI_ENSIGHTEN_PRIVACY_Do_Not_Track=1; , AUDI_ENSIGHTEN_PRIVACY_External_Content=1; , AUDI_ENSIGHTEN_PRIVACY_Functional=1; , AUDI_ENSIGHTEN_PRIVACY_Marketing=1; , AUDI_ENSIGHTEN_PRIVACY_MODAL_LOADED=1; , AUDI_ENSIGHTEN_PRIVACY_MODAL_VIEWED=1; , AUDI_ENSIGHTEN_PRIVACY_Performance=1; , AUDI_ENSIGHTEN_PRIVACY_Social=1;'
         }, {
            seite: 'ford.de',
            setcookieablehnen: 'cookie-configuration=%7B%22timestamp%22%3A' + cookiezeit + '%2C%22value%22%3A%7B%22strictly%20necessary%22%3Atrue%2C%22performance%22%3Afalse%2C%22functionality%22%3Atrue%2C%22targeting%22%3Afalse%7D%7D; , guxfoe-cookiedisclaimer=' + cookiezeit + ';',
            setcookieakzeptieren: 'cookie-configuration=%7B%22timestamp%22%3A' + cookiezeit + '%2C%22value%22%3A%7B%22strictly%20necessary%22%3Atrue%2C%22performance%22%3Atrue%2C%22functionality%22%3Atrue%2C%22targeting%22%3Atrue%7D%7D; , guxfoe-cookiedisclaimer=' + cookiezeit + ';'
         }, {
            seite: 'toplehrstellen.ch',
            setstorageakzeptieren: 'toplehrstellen.disclaimerClosed=true'
         }, {
            seite: 'tasso.net',
            setcookieablehnen: 'CMSCookieLevel=0;',
            setcookieakzeptieren: 'CMSCookieLevel=1000;',
            reload: true
         }, {
            seite: 'institut-fuer-menschenrechte.de',
            setcookieablehnen: 'cookie_consent=%7B%22consent%22:true,%22options%22:%5B%5D%7D;',
            setcookieakzeptieren: 'cookie_consent=%7B%22consent%22:true,%22options%22:%5B%22youtube%22%5D%7D;'
         }, {
            seite: 'basengreen.com',
            setcookieablehnen: 'blocksy_cookies_consent_accepted=no;',
            setcookieakzeptieren: 'blocksy_cookies_consent_accepted=true;'
         }, {
            seite: 'grosshandelsolar.de',
            setcookieablehnen: 'accept_cookies=0;',
            setcookieakzeptieren: 'accept_cookies=1;',
            reload: true
         }, {
            seite: 'umweltberatung.at',
            setcookieablehnen: 'cookie_accepted=no;',
            setcookieakzeptieren: 'cookie_accepted=ok;',
            reload: true
         }, {
            seite: 'kfzteile24.de',
            setcookieablehnen: 'cookies_consent=%7B%22functional%22%3Afalse%2C%22marketing%22%3Afalse%7D;',
            setcookieakzeptieren: 'cookies_consent=%7B%22functional%22%3Atrue%2C%22marketing%22%3Atrue%7D;'
         }, {
            seite: 'toptal.com',
            setcookieakzeptieren: 'user_agreed_gdpr=true;'
         }, {
            seite: 'lebensmittelverband.de',
            setcookieablehnen: 'LMV_consent-general=1;',
            setcookieakzeptieren: 'LMV_consent-general=1; , LMV_consent-tracking=1;'
         }, {
            seite: 'vagabundo-tinyhouse.com',
            setcookieablehnen: 'consent-policy=%7B%22ess%22%3A1%2C%22func%22%3A0%2C%22anl%22%3A0%2C%22adv%22%3A0%2C%22dt3%22%3A1%2C%22ts%22%3A28815767%7D;',
            setcookieakzeptieren: 'consent-policy=%7B%22ess%22%3A1%2C%22func%22%3A1%2C%22anl%22%3A1%2C%22adv%22%3A1%2C%22dt3%22%3A1%2C%22ts%22%3A29719750%7D;'
         }, {
            seite: 'blackhatworld.com',
            setcookieakzeptieren: 'xf_notice_dismiss=-1;'
         }, {
            seite: 'maestroholzbau.de',
            setcookieablehnen: 'allowed_cookies=[0,1];',
            setcookieakzeptieren: 'allowed_cookies=[0,1,2,3];'
         }, {
            seite: 'hansagarten24.de',
            setcookieablehnen: 'CookieConsent={"advertisement":false,"analytics":false,"functional":true,"performance":false,"uncategorized":false};',
            setcookieakzeptieren: 'CookieConsent={"advertisement":true,"analytics":true,"functional":true,"performance":true,"uncategorized":true};'
         }, {
            seite: 'stadtreinigung.hamburg',
            setcookieakzeptieren: 'agreedToCookieNotice=YES;'
         }, {
            seite: 'fuhrberger.de',
            setcookieablehnen: 'cookie-consent-settings=necessary=true&statistics=false&youtube=false&maps=false;',
            setcookieakzeptieren: 'cookie-consent-settings=necessary=true&statistics=true&youtube=true&maps=true;'
         }, {
            seite: 'ourworldindata.org',
            setcookieablehnen: 'cookie_preferences=a:0-20241020;',
            setcookieakzeptieren: 'cookie_preferences=a:1-20260704;'
         }, {
            seite: 'bolighub.dk',
            setcookieablehnen: 'cookieConsentAtBolighub={%22choices%22:{%22necessary%22:true%2C%22functional%22:true%2C%22analytics%22:false%2C%22marketing%22:false}};',
            setcookieakzeptieren: 'cookieConsentAtBolighub={%22choices%22:{%22necessary%22:true%2C%22functional%22:true%2C%22analytics%22:true%2C%22marketing%22:true}};',
            reload: true
         }, {
            seite: 'elginusa.com',
            setcookieakzeptieren: 'fixed-message=dismiss;'
         }, {
            seite: 'shoplift.ai',
            setcookieablehnen: 'fs-cc=%257B%2522id%2522%253A%2522lk0hpdaT-J35yxYUM3jwO%2522%252C%2522consents%2522%253A%257B%2522analytics%2522%253Afalse%252C%2522essential%2522%253Atrue%252C%2522marketing%2522%253Afalse%252C%2522personalization%2522%253Afalse%252C%2522uncategorized%2522%253Atrue%257D%257D;',
            setcookieakzeptieren: 'fs-cc=%257B%2522id%2522%253A%2522Ozo1vcnAquQNBFfgrEgE3%2522%252C%2522consents%2522%253A%257B%2522analytics%2522%253Atrue%252C%2522essential%2522%253Atrue%252C%2522marketing%2522%253Atrue%252C%2522personalization%2522%253Atrue%252C%2522uncategorized%2522%253Atrue%257D%257D;'
         }, {
            seite: 'daikin.de',
            setcookieablehnen: 'acceptCookiePolicy-functional=false; , acceptCookiePolicy-marketing=false; , acceptCookiePolicy-performance=false; , acceptCookies=true; , acceptCookiePolicyDate=' + cookiezeit + ';',
            setcookieakzeptieren: 'acceptCookiePolicy-functional=true; , acceptCookiePolicy-marketing=true; , acceptCookiePolicy-performance=true; , acceptCookies=true; , acceptCookiePolicyDate=' + cookiezeit + ';'
         }, {
            seite: 'pentagonsports.de',
            setcookieablehnen: 'plenty-shop-cookie={"necessary":{"amazonPay":true,"consent":true,"session":true,"csrf":true},"tracking":{"FacebookPixelWI":false,"gtmGoogleAnalytics":false},"marketing":{"adcell":false},"payment":{"paypal-cookies":true},"media":{"googleMaps":false,"reCaptcha":false},"convenience":{"languageDetection":false},"_id":"a43ad0263167aaca0b8545e83c537a24a4ba728b"};',
            setcookieakzeptieren: 'plenty-shop-cookie={"necessary":{"consent":true,"session":true,"csrf":true,"shopbooster_cookie":true},"tracking":{"FacebookPixelWI":true,"gtmGoogleAnalytics":true},"marketing":{"adcell":true},"payment":{"paypal-cookies":true},"media":{"googleMaps":true,"reCaptcha":true},"convenience":{"languageDetection":true},"_id":"4347ab49cec3199e9ed1568d81812209376b6654"};'
         }, {
            seite: 'inmobi.com',
            setcookieablehnen: 'cookie-pref=rejected;',
            setcookieakzeptieren: 'cookie-pref=accepted;'
         }, {
            seite: 'froeling.com',
            setcookieablehnen: 'licc_required=true;',
            setcookieakzeptieren: 'licc_required=true; , licc_marketing=true; , licc_analysis=true; , licc_external_media=true;'
         }, {
            seite: 'weltladen.de',
            setcookieablehnen: 'cookietypes=required;',
            setcookieakzeptieren: 'cookietypes=required.performance.embedded;'
         }, {
            seite: 'tomtom.com',
            setcookieablehnen: 'tt_settings={%22url%22:%22https://www.tomtom.com/%22%2C%22advertising%22:false%2C%22social%22:false%2C%22analytical%22:false};',
            setcookieakzeptieren: 'tt_settings={%22url%22:%22https://www.tomtom.com/en_gb/navigation/%22%2C%22advertising%22:true%2C%22social%22:true%2C%22analytical%22:true};'
         }, {
            seite: 'random.org',
            setcookieablehnen: 'RDOPRIVACY=%5Btrue%2Ctrue%2Cfalse%5D;',
            setcookieakzeptieren: 'RDOPRIVACY=%5Btrue%2Ctrue%2Ctrue%5D;',
            nowww: true,
            reload: true
         }, {
            seite: 'iurado.de',
            setcookieablehnen: 'cookieControlPrefs=["essential","preferences"];',
            setcookieakzeptieren: 'cookieControlPrefs=["essential","preferences","analytics"];'
         }, {
            seite: 'canon.de',
            setcookieablehnen: 'CONSENTMGR=consent:false%7Cts:' + cookiezeit + '; , user_accepted=1; , _evidon_suppress_notification_cookie={"date":"' + cookiedatum + '"};',
            setcookieakzeptieren: 'CONSENTMGR=consent:true%7Cts:' + cookiezeit + '; , user_accepted=1; , _evidon_suppress_notification_cookie={"date":"' + cookiedatum + '"};',
            nowww: true
         }, {
            seite: 'extracomputer.de',
            setcookieablehnen: 'extra-cookie={"all":false,"necessary":true,"preferences":false,"statistics":false,"marketing":false};',
            setcookieakzeptieren: 'extra-cookie={"all":true,"necessary":true,"preferences":true,"statistics":true,"marketing":true};'
         }, {
            seite: 'quooker.de',
            setcookieablehnen: 'cookie-consent-io=necessary;',
            setcookieakzeptieren: 'cookie-consent-io=necessary,analytics,functional,marketing;'
         }, {
            seite: 'sebson.de',
            setcookieablehnen: 'plenty-shop-cookie={"necessary":{"consent":true,"session":true,"csrf":true},"tracking":{"googleAnalytics":false},"media":{"reCaptcha":true},"paypal":{"paypal-cookies":true},"convenience":{"languageDetection":true},"_id":"fa1a1cedc934f34806768139fd96a3325f8bca23"};',
            setcookieakzeptieren: 'plenty-shop-cookie={"necessary":{"consent":true,"session":true,"csrf":true,"shopbooster_cookie":true},"tracking":{"googleAnalytics":true},"media":{"reCaptcha":true},"paypal":{"paypal-cookies":true},"convenience":{"languageDetection":true},"_id":"7b0011c51fc74285927d28b8fc0cd9c16abffbc4"};'
         }, {
            seite: 'viagogo.de',
            setcookieablehnen: 'CookieConsent=eyJoYXNTZWxlY3RlZFByZWZlcmVuY2VzIjp0cnVlLCJwcmVmZXJlbmNlcyI6eyJhZHZlcnRpc2luZyI6ZmFsc2UsImFuYWx5dGljcyI6ZmFsc2UsInByZWZlcmVuY2VzIjpmYWxzZX19;',
            setcookieakzeptieren: 'CookieConsent=eyJoYXNTZWxlY3RlZFByZWZlcmVuY2VzIjp0cnVlLCJwcmVmZXJlbmNlcyI6eyJhZHZlcnRpc2luZyI6dHJ1ZSwiYW5hbHl0aWNzIjp0cnVlLCJwcmVmZXJlbmNlcyI6dHJ1ZX19;'
         }, {
            seite: 'statistik-nord.de',
            setstorageakzeptieren: 'cookie_banner=hidden'
         }, {
            seite: 'agila.de',
            setcookieablehnen: 'cookieconsent_dismissed=essential;',
            setcookieakzeptieren: 'cookieconsent_dismissed=gr,gm,gat,ga,bing,userlike,googlesea,flo,down,fbp,bu,zp,fa,essential,yt,ts,gf,op,fs,crit,spe;'
         }, {
            seite: 'bequiet.com',
            setcookieablehnen: '_CookiePolicyHint=true;',
            setcookieakzeptieren: '_CookiePolicyHint=true; , cookie_functional=on; , cookie_marketing=on;'
         }, {
            seite: 'mindfactory.de',
            setcookieablehnen: 'cookies_accepted=false;',
            setcookieakzeptieren: 'cookies_accepted=true; , cookies_bing=true; , cookies_ga=true; , cookies_piwik=true;',
            reload: true
         }, {
            seite: 'piazzablu.com',
            setcookieablehnen: 'cmplz_banner-status=dismissed; cmplz_functional=allow; , cmplz_marketing=deny; , cmplz_preferences=allow; , cmplz_statistics=deny;',
            setcookieakzeptieren: 'cmplz_banner-status=dismissed; cmplz_functional=allow; , cmplz_marketing=allow; , cmplz_preferences=allow; , cmplz_statistics=allow;'
         }, {
            seite: 'habsburger.net',
            setcookieablehnen: 'gdpr={%22consent_created%22:%22Thu%2C%2028%20Nov%202024%2014:53:07%20GMT%22%2C%22settings%22:{%22cookie_necessary_setting%22:true%2C%22cookie_analysis_setting%22:false}};',
            setcookieakzeptieren: 'gdpr={%22consent_created%22:%22Sun%2C%2005%20Jul%202026%2019:37:45%20GMT%22%2C%22settings%22:{%22cookie_necessary_setting%22:true%2C%22cookie_analysis_setting%22:true}};'
         }, {
            seite: 'startnext.com',
            setcookieablehnen: 'ty_cookie_consent={"data":{"preferences":false,"statistics":false,"necessary":true},"version":1};',
            setcookieakzeptieren: 'ty_cookie_consent={"data":{"necessary":true,"preferences":true,"statistics":true,"marketing":true},"version":1};'
         }, {
            seite: 'mademyday.com',
            setcookieakzeptieren: 'cookieconsent_dismissed=yes;'
         }, {
            seite: 'coop.de',
            setcookieablehnen: 'cookiehint={"matomo":0};',
            setcookieakzeptieren: 'cookiehint={"matomo":1,"googleads":1,"meta":1};'
         }, {
            seite: 'remitly.com',
            setstorageakzeptieren: 'cookie_consent_date=' + cookiezeit,
            setcookieablehnen: 'cookie_consent=000;',
            setcookieakzeptieren: 'cookie_consent=111;'
         }, {
            seite: 'opploans.com',
            setcookieakzeptieren: 'opccpap=shwn;'
         }, {
            seite: 'heliotherm.com',
            setcookieablehnen: 'mw-cookie-settings={"acceptedAll":false,"consentedDate":"' + cookiedatum + '","list":[{"id":1,"title":"Notwendige Cookies","groupid":0,"accepted":true},{"id":2,"title":"YouTube","groupid":3,"accepted":false},{"id":4,"title":"Google Analytics v4","groupid":5,"accepted":false},{"id":3,"title":"Google Analytics","groupid":5,"accepted":false}],"publishDate":"2024-07-09T07:26:55"};',
            setcookieakzeptieren: 'mw-cookie-settings={"acceptedAll":true,"consentedDate":"' + cookiedatum + '","list":[{"id":1,"title":"Notwendige Cookies","groupid":0,"accepted":true},{"id":2,"title":"YouTube","groupid":3,"accepted":true},{"id":4,"title":"Google Analytics v4","groupid":5,"accepted":true},{"id":5,"title":"Meta Pixel","groupid":5,"accepted":true},{"id":3,"title":"Google Analytics","groupid":5,"accepted":true}],"publishDate":"2024-07-09T07:26:55"};'
         }, {
            seite: 'targobank-kontowechselservice.de',
            setcookieakzeptieren: 'accept_cookies=true;',
            reload: true
         }, {
            seite: 'fortiguard.com',
            setcookieakzeptieren: 'privacy_agreement=true;'
         }, {
            seite: 'serverschmiede.com',
            setcookieablehnen: 'cconsent={"version":1,"categories":{"necessary":{"wanted":true},"analytics":{"wanted":false},"functional":{"wanted":false}},"services":["mercari","x_ua_device","cconsent","trustedshops","tagmanager","googleAnalytics","googleAds","facebook","reddit","matomo","livezilla"],"consentMode":{"ad_storage":"denied","ad_user_data":"denied","ad_personalization":"denied","analytics_storage":"denied"}};',
            setcookieakzeptieren: 'cconsent={"version":1,"categories":{"necessary":{"wanted":true},"analytics":{"wanted":true},"functional":{"wanted":true}},"services":["mercari","x_ua_device","cconsent","trustedshops","tagmanager","googleAnalytics","googleAds","facebook","reddit","matomo","livezilla"],"consentMode":{"ad_storage":"granted","ad_user_data":"granted","ad_personalization":"granted","analytics_storage":"granted"}};'
         }, {
            seite: 'revanced.app',
            setstorageablehnen: 'analytics=false',
            setstorageakzeptieren: 'analytics=true'
         }, {
            seite: 'compuram.de',
            setcookieablehnen: 'CompuRAM_CC=off;',
            setcookieakzeptieren: 'CompuRAM_CC=on;',
            reload: true
         }, {
            seite: 'bundeswehr.de',
            setstorageablehnen: 'privacyProtection={"settings":{"tracking":{"enabled":false,"readonly":false},"maps":{"enabled":false,"readonly":false},"facebook":{"enabled":false,"readonly":false},"youtube":{"enabled":false,"readonly":false},"twitter":{"enabled":false,"readonly":false},"instagram":{"enabled":false,"readonly":false},"flickr":{"enabled":false,"readonly":false},"kaltura":{"enabled":false,"readonly":false},"mastodon":{"enabled":false,"readonly":false},"bluesky":{"enabled":false,"readonly":false}}}',
            setstorageakzeptieren: 'privacyProtection={"settings":{"tracking":{"enabled":true,"readonly":false},"maps":{"enabled":true,"readonly":false},"facebook":{"enabled":true,"readonly":false},"youtube":{"enabled":true,"readonly":false},"twitter":{"enabled":true,"readonly":false},"instagram":{"enabled":true,"readonly":false},"flickr":{"enabled":true,"readonly":false},"kaltura":{"enabled":true,"readonly":false},"mastodon":{"enabled":true,"readonly":false},"bluesky":{"enabled":true,"readonly":false}}}'
         }, {
            seite: 'site24x7.com',
            setstorageablehnen: 'zglobal_Acookie_optOut=2',
            setstorageakzeptieren: 'zglobal_Acookie_optOut=0'
         }, {
            seite: 'kickstarter.com',
            setstorageablehnen: 'tcmConsent={"purposes":{"SaleOfInfo":false,"Analytics":false,"Functional":true,"Advertising":false},"timestamp":"2025-12-06T19:14:24.403Z","confirmed":true,"prompted":true,"updated":true}',
            setstorageakzeptieren: 'tcmConsent={"purposes":{"SaleOfInfo":true,"Analytics":true,"Functional":true,"Advertising":true},"timestamp":"2025-12-06T19:14:24.403Z","confirmed":true,"prompted":true,"updated":true}'
         }, {
            seite: 'opera.com',
            setcookieablehnen: 'cookie_consent_granted=true;',
            setcookieakzeptieren: 'cookie_consent_granted=true; , cookie_consent_marketing=true; , cookie_consent_analytics=true;'
         }, {
            seite: 'michalzalecki.com',
            setcookieakzeptieren: 'cookie_law=true;'
         }, {
            seite: 'allround-pc.com',
            setcookieablehnen: 'apcAcceptedTrackingCookie3=10000001;',
            setcookieakzeptieren: 'apcAcceptedTrackingCookie3=11111111;'
         }, {
            seite: 'aral.de',
            setcookieablehnen: 'r_func=true;',
            setcookieakzeptieren: 'r_func=true; , r_perf=true; , r_adv=true;'
         }, {
            seite: 'builtbybit.com',
            setcookieakzeptieren: 'bbb_notice_dismiss=-1;'
         }, {
            seite: 'bmw-public-charging.com',
            setcookieablehnen: 'CN_ALLOW_FUNCTIONAL_COOKIES=false;',
            setcookieakzeptieren: 'CN_ALLOW_FUNCTIONAL_COOKIES=true;'
         }, {
            seite: 'bahn.de',
            setcookieablehnen: 'CONSENTMGR=c1:1%7Cc2:0%7Cc3:0%7Cc4:0%7Cc5:0%7Cc6:0%7Cc7:0%7Cc8:0%7Cc9:0%7Cc10:0%7Cc11:0%7Cc12:0%7Cc13:0%7Cc14:0%7Cc15:0%7Cts:1736696118593%7Cconsent:true%7Cid:01945b279026002bf9055210d94405050003600d00fb8;',
            setcookieakzeptieren: 'CONSENTMGR=c1:1%7Cc2:1%7Cc3:1%7Cc4:1%7Cc5:1%7Cc6:1%7Cc7:1%7Cc8:1%7Cc9:1%7Cc10:1%7Cc11:1%7Cc12:1%7Cc13:1%7Cc14:1%7Cc15:1%7Cc16:1%7Cts:1783374414565%7Cconsent:true%7Cid:019f3965f7db00006358361cf76905050001400d00fb8;'
         }, {
            seite: 'secondsol.com',
            setcookieablehnen: 'cookies_consent=1;',
            setcookieakzeptieren: 'cookies_consent=1; , cookies_consent_ad=1;'
         }, {
            seite: 'betterplace.org',
            setcookieablehnen: 'betterplace-tracking-accepted=rejected;',
            setcookieakzeptieren: 'betterplace-tracking-accepted=accepted;'
         }, {
            seite: 'hbswelding.systems',
            setcookieablehnen: 'consent=false;',
            setcookieakzeptieren: 'consent=true;',
            reload: true
         }, {
            seite: 'iiyama.com',
            setcookieakzeptieren: 'cookie-bar=ok;'
         }, {
            seite: 'creative.com',
            setcookieablehnen: 'cookieSettings=%7B%22dismissed%22%3Atrue%2C%22necessary%22%3Atrue%2C%22analytics%22%3Afalse%2C%22thirdParty%22%3Afalse%7D;',
            setcookieakzeptieren: 'cookieSettings=%7B%22dismissed%22%3Atrue%2C%22necessary%22%3Atrue%2C%22analytics%22%3Atrue%2C%22thirdParty%22%3Atrue%2C%22doNotSell%22%3Afalse%7D;'
         }, {
            seite: 'drueckglueck.de',
            setcookieablehnen: 'son_consent={"version":1,"categories":{"privacy":false,"necessary":true,"functionality":true,"tracking":false,"targeting":false,"country":"DE"}};',
            setcookieakzeptieren: 'son_consent={"version":1,"country":"DE","categories":{"privacy":true,"necessary":true,"functionality":true,"tracking":true,"targeting":true},"vendorConsentDefaults":{"12":true,"21":true,"23":true,"25":true,"32":true,"36":true,"42":true,"45":true,"60":true,"61":true,"68":true,"76":true,"85":true,"87":true,"91":true,"97":true,"122":true,"128":true,"132":true,"161":true,"164":true,"211":true,"231":true,"238":true,"273":true,"285":true,"333":true,"358":true,"527":true,"628":true,"655":true,"663":true,"667":true,"707":true,"726":true,"728":true,"755":true,"790":true,"793":true,"804":true,"806":true,"807":true,"827":true,"867":true,"922":true,"1006":true,"1015":true,"1020":true,"1029":true,"1031":true,"1126":true,"1130":true,"1167":true,"1202":true,"1246":true,"1251":true,"1311":true,"1346":true,"1379":true,"1422":true,"1488":true},"legitimateInterestObjections":{},"legIntPurposeObjections":{},"specialFeatureConsentsState":{"1":true,"2":true}};'
         }, {
            seite: 'gutscheine.n-tv.de',
            setcookieablehnen: 'consent-1.0=%7B%22functional%22%3Atrue%2C%22analytics%22%3Afalse%2C%22marketing%22%3Afalse%2C%22isSet%22%3Atrue%7D;',
            setcookieakzeptieren: 'consent-1.0=%7B%22functional%22%3Atrue%2C%22analytics%22%3Atrue%2C%22marketing%22%3Atrue%2C%22isSet%22%3Atrue%7D;'
         }, {
            seite: 'soeren-hentzschel.at',
            setstorageakzeptieren: 'storage_notice.shown=true'
         }, {
            seite: 'eso.lt',
            setcookieablehnen: 'privacy_verify=1; , privacy_2=1; , privacy_3=0; , privacy_4=0;',
            setcookieakzeptieren: 'privacy_verify=1; , privacy_2=1; , privacy_3=1; , privacy_4=1;',
            reload: true
         }, {
            seite: 'blacknut.com',
            setstorageablehnen: 'bn:a:privacyConsent={"statistics":false,"marketing":false,"lang":"de","expiry":' + (cookiezeit + 86400) + '}',
            setstorageakzeptieren: 'bn:a:privacyConsent={"statistics":true,"marketing":true,"lang":"de","expiry":' + (cookiezeit + 86400) + '}'
         }, {
            seite: 'hardwareluxx.de',
            setcookieakzeptieren: 'hwl_cc=1;',
            reload: true
         }, {
            seite: 'parqet.com',
            setcookieablehnen: 'ParqetGDPR=denied;',
            setcookieakzeptieren: 'ParqetGDPR=accepted;',
            nowww: true
         }, {
            seite: 'old.reddit.com',
            setcookieakzeptieren: 'eu_cookie={%22opted%22:true%2C%22nonessential%22:false};'
         }, {
            seite: 'spigen.pl',
            setcookieakzeptieren: 'ck_cook=yes;'
         }, {
            seite: 'aws.amazon.com',
            setcookieablehnen: 'awsccc=eyJlIjoxLCJwIjowLCJmIjowLCJhIjowLCJjY2JhIjoxLCJpIjoiYWQ5ZWNkOTMtMTBkOC00ZjFkLWEwNTMtYTY5MmFiODJhNTFiIiwidiI6IjEifQ==;',
            setcookieakzeptieren: 'awsccc=eyJlIjoxLCJwIjoxLCJmIjoxLCJhIjoxLCJpIjoiNmJhOWEzNzAtZDI2Zi00NzEwLWI4YjAtYWVlOWZkOWIxZWExIiwidiI6IjEifQ==;'
         }, {
            seite: 'etherscan.io',
            setcookieakzeptieren: 'etherscan_cookieconsent=True;'
         }, {
            seite: 'sparwelt.de',
            setcookieablehnen: 'consent-1.0=%7B%22functional%22%3Atrue%2C%22analytics%22%3Afalse%2C%22marketing%22%3Afalse%2C%22isSet%22%3Atrue%7D;',
            setcookieakzeptieren: 'consent-1.0=%7B%22functional%22%3Atrue%2C%22analytics%22%3Atrue%2C%22marketing%22%3Atrue%2C%22isSet%22%3Atrue%7D;',
            checkcookie: '%22%3Atrue%7D'
         }, {
            seite: 'fruugo.de',
            setcookieablehnen: 'consents=essential;',
            setcookieakzeptieren: 'consents=essential%2Canalytics%2Cadvertising;'
         }, {
            seite: 'innn.it',
            setcookieablehnen: 'cookieConsent=[%22essential%22];',
            setcookieakzeptieren: 'cookieConsent=[%22essential%22%2C%22statistics%22%2C%22banner%22];'
         }, {
            seite: 'stellantis-direktbank.de,jtdirektbank.de,bbbank.de,berliner-volksbank.de,sparda-sw.de,sparda-bank-hamburg.de,sparda-h.de,frankfurter-volksbank.de,volksbank-stuttgart.de,volksbanking.de,hannoversche-volksbank.de,vb-mittelhessen.de,vrbank-mkb.de,vbkraichgau.de,sparda-ostbayern.de,vrbank-hessenland.de,maerkische-bank.de,bergische-volksbank.de,sparda-a.de,volksbank-koeln-bonn.de,voba-rnh.de,vr-bankverein.de,vrbank-suedpfalz.de,vb-eg.de,volksbank-allgaeu-oberschwaben.de,vb-alzey-worms.de,vrbank-ke-oa.de,volksbank-albstadt.de,westerwaldbank.de,wvb.de,dovoba.de,voba-bl.de,vrbankgl.de,gestalterbank.de,volksbank-hellweg.de,psd-berlin-brandenburg.de,volksbankinostwestfalen.de,volksbank-chemnitz.de,volksbank-goeppingen.de,eb.de,vobakl.de,volksbank-dresden-bautzen.de,vr-lif-ebn.de,vrnu.de,leipziger-volksbank.de,vblh.de,vr-werdenfels.de,vrbank.de,vb-muensterland.de,kieler-volksbank.de,volksbank-ueberlingen.de,hamburger-volksbank.de,vbhalle.de,vbkrefeld.de,volksbank-vor-ort.de,aachener-bank.de,vbsdn.de,volksbank-mit-herz.de,vvr-bank.de,volksbank-trier-eifel.de,meine-rvb.de,spreewaldbank.de,pax-bank.de,vb-ruhrmitte.de,donau-iller-bank.de,ligabank.de,rbok.de,volksbank-freiburg.de,vr-bank-passau.de,volksbankeg.de,diebank.de,raiba-rastede.de,vbimharz.de',
            setcookieablehnen: 'cookieConsent=%5B%7B%22name%22%3A%22essenziell%22%2C%22value%22%3A%22on%22%7D%2C%7B%22name%22%3A%22komfort%22%2C%22value%22%3A%22on%22%7D%2C%7B%22name%22%3A%22marketing%22%2C%22value%22%3A%22off%22%7D%2C%7B%22name%22%3A%22statistik%22%2C%22value%22%3A%22off%22%7D%2C%7B%22name%22%3A%22speichern%22%2C%22value%22%3A%22on%22%7D%5D;'
         }, {
            seite: 'sberbank.com',
            setcookieakzeptieren: 'sber.pers_notice_en=1;'
         }, {
            seite: 'hetzner.com',
            setcookieablehnen: '__Secure-HO_Cookie_Consent_Declined=1;',
            setcookieakzeptieren: '__Secure-HO_Cookie_Consent_Accepted=1;'
         }, {
            seite: 'bandcamp.com',
            setcookieablehnen: 'cookie_preferences=%7B%22allow%22%3A%5B%5D%7D;',
            setcookieakzeptieren: 'cookie_preferences=%7B%22allow%22%3A%5B%22analytics%22%2C%22advertising%22%5D%2C%22version%22%3A1%7D;'
         }, {
            seite: 'xbox-store-checker.com',
            setcookieakzeptieren: 'EU_COOKIE_LAW_CONSENT=true;'
         }, {
            seite: 'fusionbase.com',
            setcookieablehnen: 'cookie_consent=%7B%22ad_storage%22%3A%22denied%22%2C%22analytics_storage%22%3A%22denied%22%2C%22ad_user_data%22%3A%22denied%22%2C%22ad_personalization%22%3A%22denied%22%7D;',
            setcookieakzeptieren: 'cookie_consent=%7B%22ad_storage%22%3A%22granted%22%2C%22analytics_storage%22%3A%22granted%22%2C%22ad_user_data%22%3A%22granted%22%2C%22ad_personalization%22%3A%22granted%22%7D;'
         }, {
            seite: 'emlakjet.com',
            setstorageablehnen: 'efl-saved-consent={"updatedAt":' + cookiezeit + ',"categories":{"essential":true,"functional":false,"marketing":false,"other":false},"browserData":{"userAgent":"' + navigator.userAgent + '","pageLoad":2070,"language":"' + navigator.language + '","networkType":"","screen":{"devicePixelRatio":1.5,"height":1080,"width":1920},"uuid":"e3a89f10-056b-48e2-9a69-5cfbf1fefaaf"}}',
            setstorageakzeptieren: 'efl-saved-consent={"updatedAt":' + cookiezeit + ',"categories":{"essential":true,"functional":true,"marketing":true,"other":true},"browserData":{"userAgent":"' + navigator.userAgent + '","pageLoad":2070,"language":"' + navigator.language + '","networkType":"","screen":{"devicePixelRatio":1.5,"height":1080,"width":1920},"uuid":"e3a89f10-056b-48e2-9a69-5cfbf1fefaaf"}}'
         }, {
            seite: 'dave.com',
            setcookieablehnen: 'daveConsentChoices={"analytics_storage":"denied","personalization_storage":"granted","ad_storage":"denied","ad_user_data":"denied","ad_personalization":"denied","functionality_storage":"granted","security_storage":"granted"};',
            setcookieakzeptieren: 'daveConsentChoices={"analytics_storage":"granted","personalization_storage":"granted","ad_storage":"granted","ad_user_data":"granted","ad_personalization":"granted","functionality_storage":"granted","security_storage":"granted"};'
         }, {
            seite: 'schildkroeten-schutz.de',
            setcookieakzeptieren: 'onecom_cookie_consent=' + cookiezeit + ';',
            reload: true
         }, {
            seite: 'walkonthewildside.de',
            setcookieablehnen: 'gc_cookielaw=essential;',
            setcookieakzeptieren: 'gc_cookielaw=all;'
         }, {
            seite: 'zoologo.de',
            setcookieablehnen: 'cookie-consent=%7B%22customerCookieConsentId%22%3A%221744821781714-7jfollnepk6s84f7v905si4hnv%22%2C%22necessary%22%3A%221%22%2C%22functional%22%3Anull%2C%22performance%22%3A%220%22%2C%22marketing%22%3A%220%22%2C%22createdAt%22%3A%222025-04-16T16%3A43%3A01%2B00%3A00%22%2C%22updatedAt%22%3A%222025-04-16T16%3A43%3A01%2B00%3A00%22%7D;',
            setcookieakzeptieren: 'cookie-consent=%7B%22customerCookieConsentId%22%3A%221783377679473-r8efisehq6qbmo0kb3mnkm7quh%22%2C%22necessary%22%3A%221%22%2C%22functional%22%3Anull%2C%22performance%22%3A%221%22%2C%22marketing%22%3A%221%22%2C%22createdAt%22%3A%222026-07-06T22%3A41%3A19%2B00%3A00%22%2C%22updatedAt%22%3A%222026-07-06T22%3A41%3A19%2B00%3A00%22%7D;',
            reload: true
         }, {
            seite: 'einforstungsverband.at',
            setstorageablehnen: 'pw_dch_banner=2',
            setstorageakzeptieren: 'pw_dch_banner=1'
         }, {
            seite: 'jeep.de',
            setcookieablehnen: 'opncl_advertising=false; , opncl_comfort=true; , opncl_essential=true; , opncl_general=true; , opncl_performance=false;',
            setcookieakzeptieren: 'opncl_advertising=true; , opncl_comfort=true; , opncl_essential=true; , opncl_general=true; , opncl_performance=true;'
         }, {
            seite: 'ilovepdf.com',
            setcookieablehnen: 'cmp_ck=3;',
            setcookieakzeptieren: 'cmp_ck=1;'
         }, {
            seite: 'gira.de',
            setcookieablehnen: 'GIRA_ca2=%5B1%2C2%2C3%2C4%2C5%2C7%5D;',
            setcookieakzeptieren: 'GIRA_ca2=%5B1%2C2%2C3%2C4%2C5%2C7%2C8%2C9%2C10%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19%2C20%2C21%2C22%2C23%5D;'
         }, {
            seite: 'c24.de',
            setcookieablehnen: 'c24Cookies_v1=Notwendig; , c24GDPR_v1=ACCEPTED;',
            setcookieakzeptieren: 'c24Cookies_v1=Notwendig%2CAnalytisch; , c24GDPR_v1=ACCEPTED;'
         }, {
            seite: 'oekonews.at',
            setcookieablehnen: 'easycmp={%22decided%22:%22' + cookiedatum + '%22%2C%22cookies%22:[{%22id%22:%22netautor%22%2C%22allow%22:true}%2C{%22id%22:%22youtube%22%2C%22allow%22:false}%2C{%22id%22:%22recaptcha%22%2C%22allow%22:true}]};',
            setcookieakzeptieren: 'easycmp={%22decided%22:%22' + cookiedatum + '%22%2C%22cookies%22:[{%22id%22:%22netautor%22%2C%22allow%22:true}%2C{%22id%22:%22youtube%22%2C%22allow%22:true}%2C{%22id%22:%22recaptcha%22%2C%22allow%22:true}]};'
         }, {
            seite: 'gkv-spitzenverband.de',
            setstorageablehnen: 'cookie-consent={"date":' + cookiezeit + ',"version":1,"statistics":false}',
            setstorageakzeptieren: 'cookie-consent={"date":' + cookiezeit + ',"version":1,"statistics":true}'
         }, {
            seite: 'rauchmeldertest.net',
            setcookieakzeptieren: 'privacy_embeds=consent;'
         }, {
            seite: 'brf.be',
            setcookieablehnen: 'cookieConsent=disallow;',
            setcookieakzeptieren: 'cookieConsent=allow;'
         }, {
            seite: 'konsument.at',
            setcookieablehnen: 'vkicookieconsent=0;',
            setcookieakzeptieren: 'vkicookieconsent=10;'
         }, {
            seite: 'cng-mobility.ch',
            setcookieakzeptieren: 'wk-consent=consentGiven; , wk-consent-status=;'
         }, {
            seite: 'beacons.ai',
            setcookieakzeptieren: '_bConsentSet=yes;'
         }, {
            seite: 'slewo.com',
            setcookieablehnen: 'CookieConsent=%7B%22dateUpdated%22%3A%222026-07-07T12%3A29%3A10%2B00%3A00%22%2C%22statistics%22%3Afalse%2C%22marketing%22%3Afalse%7D;',
            setcookieakzeptieren: 'CookieConsent=%7B%22dateUpdated%22%3A%222026-07-07T12%3A28%3A21%2B00%3A00%22%2C%22statistics%22%3Atrue%2C%22marketing%22%3Atrue%7D;',
            reload: true
         }, {
            seite: 'awwwards.com',
            setcookieablehnen: '__w_cc={%22preferences%22:false%2C%22analysis%22:false%2C%22marketing%22:false};',
            setcookieakzeptieren: '__w_cc={%22preferences%22:true%2C%22analysis%22:true%2C%22marketing%22:true};'
         }, {
            seite: 'supermarioplay.com',
            setstorageakzeptieren: 'cookies=1'
         }, {
            seite: 'chatgpt.com,platform.openai.com',
            setcookieablehnen: 'oai-allow-ne=false; , oai_consent_analytics=false; , oai_consent_marketing=false;',
            setcookieakzeptieren: 'oai-allow-ne=true; , oai_consent_analytics=true; , oai_consent_marketing=true;'
         }, {
            seite: 'openai.com',
            setcookieablehnen: 'analytics_consent=rejected; , marketing_consent=rejected;',
            setcookieakzeptieren: 'analytics_consent=agreed; , marketing_consent=agreed;'
         }, {
            seite: 'smallpdf.com',
            setcookieablehnen: '_s.cookie_consent=marketing=0:analytics=0:version=2021-07-01:timestamp=' + cookiezeit + ';',
            setcookieakzeptieren: '_s.cookie_consent=marketing=1:analytics=1:version=2021-07-01:timestamp=' + cookiezeit + ';'
         }, {
            seite: 'tp-link.com',
            setcookieablehnen: 'tp_privacy_banner=1; , tp_privacy_base=1;',
            setcookieakzeptieren: 'tp_privacy_banner=1; , tp_privacy_base=1; , tp_privacy_marketing=1;'
         }, {
            seite: 'herlitz.de',
            setcookieablehnen: 'necessary-opt-in=true;',
            setcookieakzeptieren: 'necessary-opt-in=true; , statistic-opt-in=true; , marketing-opt-in=true;'
         }, {
            seite: 'brennenstuhl.com',
            setcookieablehnen: 'privacy={"core":"1"};',
            setcookieakzeptieren: 'privacy={"core":"1","setup":"1","Google_setup":"1","IbaseInStatsUTM_setup":"1","stats":"1","Google_stats":"1","Doofinder_stats":"1","tracking":"1","Amazon_tracking":"1","Google_tracking":"1"};',
            reload: true
         }, {
            seite: 'e-tec.at',
            setcookieablehnen: 'cc_analytic=false; , cc_functional=true; , cc_granted=true; , cc_marketing=false;',
            setcookieakzeptieren: 'cc_analytic=true; , cc_functional=true; , cc_granted=true; , cc_marketing=true; cc_essential=true;'
         }, {
            seite: 'eneba.com',
            setcookieablehnen: 'cconsent=1100;',
            setcookieakzeptieren: 'cconsent=1;'
         }, {
            seite: 'crew-united.com',
            setcookieablehnen: 'ccb=googleAdSenseAccepted=0&googleAnalyticsAccepted=0&commonCookies=1;',
            setcookieakzeptieren: 'ccb=googleAdSenseAccepted=1&googleAnalyticsAccepted=1&commonCookies=1;',
            reload: true
         }, {
            seite: 'browser.ai',
            setcookieablehnen: 'allow_browserai_cookie={%22n%22:true%2C%22pers%22:false%2C%22perf%22:false%2C%22mark%22:false};',
            setcookieakzeptieren: 'allow_browserai_cookie={%22n%22:true%2C%22pers%22:true%2C%22perf%22:true%2C%22mark%22:true};',
            reload: true
         }, {
            seite: 'windowsonarm.org',
            setstorageakzeptieren: 'cookieConsent=true'
         }, {
            seite: 'arte.tv',
            setcookieablehnen: 'user_consent=audience%3Doff%2Ctechnical%3Doff;',
            setcookieakzeptieren: 'user_consent=audience%3Don%2Ctechnical%3Don;'
         }, {
            seite: 'theonion.com',
            setstorageablehnen: 'consent_preferences={"analytics_storage":"denied","ad_storage":"denied","ad_user_data":"denied","ad_personalization":"denied"}',
            setstorageakzeptieren: 'consent_preferences={"analytics_storage":"granted","ad_storage":"granted","ad_user_data":"granted","ad_personalization":"granted"}'
         }, {
            seite: 'praxis121.de',
            setstorageakzeptieren: 'cookieNotificationHasBeenSeen=true'
         }, {
            seite: 'iosgods.com',
            setcookieablehnen: 'ips4_cookie_consent=1;',
            setcookieakzeptieren: 'ips4_cookie_consent=1; , ips4_cookie_consent_optional=1;'
         }, {
            seite: 'gkv-90prozent.de',
            setstorageablehnen: 'cookie-consent={"date":' + cookiezeit + ',"version":1,"statistics":false}',
            setstorageakzeptieren: 'cookie-consent={"date":' + cookiezeit + ',"version":1,"statistics":true}'
         }, {
            seite: 'go-aheadnordic.no',
            setstorageablehnen: 'GOA:SETTINGS={"LANGUAGE":"no","GOA_NECCESSARY_COOKIE":"ON","GOA_ANALYTICAL_COOKIE":"OFF","GOA_AD_COOKIE":"OFF"}',
            setstorageakzeptieren: 'GOA:SETTINGS={"LANGUAGE":"no","GOA_NECCESSARY_COOKIE":"ON","GOA_ANALYTICAL_COOKIE":"ON","GOA_AD_COOKIE":"ON"}'
         }, {
            seite: 'vy.se,vy.no',
            setstorageablehnen: 'Vy.User.Cookie.Settings={"analytics":false,"marketing":false}',
            setstorageakzeptieren: 'Vy.User.Cookie.Settings={"analytics":true,"marketing":true}'
         }, {
            seite: 'trafikverket.se',
            setcookieablehnen: 'TrvCookieConsent=functional%3Dfalse%26analytical%3Dfalse;',
            setcookieakzeptieren: 'TrvCookieConsent=functional%3Dtrue%26analytical%3Dtrue;'
         }, {
            seite: 'yealink.com',
            setstorageablehnen: 'privacyData={"necessary":1,"preferences":0,"statistics":0,"targeted":0}',
            setstorageakzeptieren: 'privacyData={"necessary":1,"preferences":1,"statistics":1,"targeted":1}'
         }, {
            seite: 'gitflic.ru',
            setcookieakzeptieren: 'cookiesAccepted=true;'
         }, {
            seite: 'varnyapestirny.policie.gov.cz',
            setcookieablehnen: 'accept=true; , cc_cookie={"categories":["necessary"],"revision":0,"data":null,"rfc_cookie":false,"consent_date":"' + cookiedatum + '","consent_uuid":"ac24cf57-b903-426d-a5d6-12bc8b27177a","last_consent_update":"' + cookiedatum + '"};',
            setcookieakzeptieren: 'accept=true; , cc_cookie={"categories":["necessary","analytics"],"revision":0,"data":null,"rfc_cookie":false,"consent_date":"' + cookiedatum + '","consent_uuid":"a25d87ce-153d-469a-af9b-c975ece3a7ab","last_consent_update":"' + cookiedatum + '"};'
         }, {
            seite: 'tanuloknak.hu',
            setcookieablehnen: 'gdpr_level=3;',
            reload: true
         }, {
            seite: 'vitaminwell.com',
            setcookieablehnen: 'cookies_and_content_security_policy=[];',
            setcookieakzeptieren: 'cookies_and_content_security_policy=[%22statistics%22%2C%22experience%22%2C%22marketing%22];'
         }, {
            seite: 'cyberport.de',
            setcookieablehnen: 'consent=0.1757376000000.1757376000000.c55969|c55964|s94|s40|c23451|s65|s23|c55979|c23259.c69656|s1522|c23318|s981|c27726|s1750|c74612|s1598|s115|c29334|c55977|s72|s1505|s7|c69655|s1|s26|c69653|s1513|c69654|s11|s2631|c23261|s267|c76332|s1097|s366|c23263|c66744|c69652|s194|s3009|s1537|s1484|s915|s30|c23262;',
            setcookieakzeptieren: 'consent=0.1783382400000.1783382400000.16|21|32|91|796|804|831|c69656|s1522|c23318|s981|c82033|c55969|c55964|s94|c27726|s1750|s40|s335|c74612|s1598|s65|s23|s115|c29334|c55979|c55977|s72|c23259|s1505|s7|c69655|c85650|s1|s26|s905|c69653|s1513|c69654|s11|s2631|c23261|s267|c76332|s1097|s366|c23263|c66744|s1658|c69652|s194|s3009|s1537|s1484|s915|s30|c23262.;',
            reload: true
         }, {
            seite: 'homelink.de',
            setcookieakzeptieren: 'disclaimer21=true;',
            reload: true
         }, {
            seite: 'therapy-lift.de',
            setcookieablehnen: 'cc_cookie=%7B%22categories%22%3A%5B%22necessary%22%2C%22security%22%5D%2C%22revision%22%3A4%2C%22data%22%3Anull%2C%22consentTimestamp%22%3A%222025-09-20T19%3A21%3A35.228Z%22%2C%22consentId%22%3A%22a85944d4-0795-45b7-b184-b58cc68c5e22%22%2C%22services%22%3A%7B%22necessary%22%3A%5B%22sentry%22%2C%22supabase%22%5D%2C%22authentication%22%3A%5B%5D%2C%22security%22%3A%5B%5D%2C%22analytics%22%3A%5B%5D%2C%22marketing%22%3A%5B%5D%7D%2C%22languageCode%22%3A%22de%22%2C%22lastConsentTimestamp%22%3A%222025-09-20T19%3A21%3A35.228Z%22%2C%22expirationTime%22%3A1774120895228%7D;',
            setcookieakzeptieren: 'cc_cookie=%7B%22categories%22%3A%5B%22necessary%22%2C%22authentication%22%2C%22security%22%2C%22analytics%22%2C%22marketing%22%5D%2C%22revision%22%3A4%2C%22data%22%3Anull%2C%22consentTimestamp%22%3A%222026-07-07T19%3A11%3A38.313Z%22%2C%22consentId%22%3A%229673dadf-d341-43aa-8c87-4b92ca11284d%22%2C%22services%22%3A%7B%22necessary%22%3A%5B%22sentry%22%2C%22supabase%22%5D%2C%22authentication%22%3A%5B%22appleSignIn%22%2C%22googleSignIn%22%5D%2C%22security%22%3A%5B%5D%2C%22analytics%22%3A%5B%22posthog%22%5D%2C%22marketing%22%3A%5B%22googleTagManagerAndAnalytics%22%2C%22facebookPixel%22%5D%7D%2C%22languageCode%22%3A%22de%22%2C%22lastConsentTimestamp%22%3A%222026-07-07T19%3A11%3A38.313Z%22%2C%22expirationTime%22%3A1799176298313%7D;'
         }, {
            seite: 'mediensuchthilfe.info',
            setcookieakzeptieren: 'cookie_consent=true;'
         }, {
            seite: 'macaddress.io',
            setcookieakzeptieren: 'macaddress-cookies-message=true;'
         }, {
            seite: 'haberdeger.com',
            setcookieakzeptieren: 'KVKKClosed=1;'
         }, {
            seite: 'lmarena.ai,arena.ai',
            setcookieablehnen: 'cookie-preferences={"functionality":true,"advertising":false,"analytics":false,"socialMedia":true,"lastUpdated":"' + cookiedatum + '"};',
            setcookieakzeptieren: 'cookie-preferences={"advertising":true,"functionality":true,"analytics":true,"socialMedia":true,"lastUpdated":"' + cookiedatum + '"};',
            reload: true
         }, {
            seite: 'boschrexroth.com',
            setcookieablehnen: 'privacy-settings={%22consent%22:{%22convenience%22:false%2C%22analysis%22:false%2C%22marketing%22:false%2C%22advertising%22:false%2C%22custom%22:[]}%2C%22timeToLive%22:60%2C%22timestamp%22:' + cookiezeit + '%2C%22version%22:4};',
            setcookieakzeptieren: 'privacy-settings={%22consent%22:{%22convenience%22:true%2C%22analysis%22:true%2C%22marketing%22:true%2C%22advertising%22:false%2C%22custom%22:[]}%2C%22timeToLive%22:365%2C%22timestamp%22:' + cookiezeit + '%2C%22version%22:4};'
         }, {
            seite: 'swisstransfer.com',
            setcookieablehnen: 'cookieConsent=consent_1; , googleConsent=%7B%22version%22:2,%22ad_storage%22:%22denied%22,%22ad_personalization%22:%22denied%22,%22ad_user_data%22:%22denied%22,%22analytics_storage%22:%22denied%22,%22functionality_storage%22:%22denied%22,%22personalization_storage%22:%22denied%22,%22security_storage%22:%22denied%22%7D;',
            setcookieakzeptieren: 'cookieConsent=consent_1; , googleConsent=%7B%22version%22:2,%22ad_storage%22:%22denied%22,%22ad_personalization%22:%22denied%22,%22ad_user_data%22:%22denied%22,%22analytics_storage%22:%22denied%22,%22functionality_storage%22:%22denied%22,%22personalization_storage%22:%22denied%22,%22security_storage%22:%22denied%22%7D;'
         }, {
            seite: 'offene-werkstaetten.org',
            setcookieakzeptieren: 'offene-werkstaetten.org=Cookies policy accepted;'
         }, {
            seite: 'fastweb.it',
            setcookieablehnen: 'ck_consent=AT;',
            setcookieakzeptieren: 'ck_consent=AFMT;',
            reload: true
         }, {
            seite: 'streamawards.de',
            setstorageablehnen: 'cookie-consent={"essential":true,"youtube":false,"analytics":false}',
            setstorageakzeptieren: 'cookie-consent={"essential":true,"youtube":true,"analytics":true}'
         }, {
            seite: 'groupsumi.de',
            setstorageablehnen: '@sumi/consent={"essential":true,"performance":false,"functional":true,"advertising":false}',
            setstorageakzeptieren: '@sumi/consent={"essential":true,"performance":true,"functional":true,"advertising":true}'
         }, {
            seite: 'brekz.de',
            setstorageablehnen: 'brekzConsentCookiebar_settings={"ad_user_data":false,"ad_personalization":false,"ad_storage":false,"analytics_storage":false,"personalization_storage":false,"functionality_storage":true}',
            setstorageakzeptieren: 'brekzConsentCookiebar_settings={"ad_user_data":true,"ad_personalization":true,"ad_storage":true,"analytics_storage":true,"personalization_storage":true,"functionality_storage":true}'
         }, {
            seite: 'petcure.nl',
            setcookieakzeptieren: 'cookie_consent=dismiss;'
         }, {
            seite: 'posthog.com',
            setstorageakzeptieren: 'cookie_consent=acknowledged'
         }, {
            seite: 'optimism.io',
            setcookieakzeptieren: 'cookieAccepted=true;'
         }, {
            seite: 'valtiolle.fi',
            setcookieablehnen: 'consent={"necessary":true,"preferences":false,"analytics":false,"marketing":false,"uncategorized":false};',
            setcookieakzeptieren: 'consent={"necessary":true,"preferences":true,"analytics":true,"marketing":true,"uncategorized":true};'
         }, {
            seite: 'portal.csav.fr',
            setstorageablehnen: 'app.cookieConsent={"sys":"ACCEPTED","ux":"REJECTED"}',
            setstorageakzeptieren: 'app.cookieConsent={"sys":"ACCEPTED","ux":"ACCEPTED"}'
         }, {
            seite: 'springest.de',
            setcookieablehnen: 'CookieConsent=%7B%22settings%22%3A%7B%22functional%22%3A1%7D%2C%22version%22%3A2%7D;',
            setcookieakzeptieren: 'CookieConsent=%7B%22settings%22%3A%7B%22functional%22%3A1%2C%22google%22%3A1%2C%22analytics%22%3A1%2C%22marketing%22%3A1%7D%2C%22version%22%3A2%7D;'
         }, {
            seite: 'busliniensuche.de',
            setcookieablehnen: 'CookieConfiguredOrAccepted=1;',
            setcookieakzeptieren: 'CookieConfiguredOrAccepted=1; , CookieAnalysis=1; , CookieAd=1;',
            reload: true
         }, {
            seite: 'budgetthuis.nl',
            setcookieablehnen: 'bt_privacy_consent=Agreed_Necessary;',
            setcookieakzeptieren: 'bt_privacy_consent=Shown_Agreed;'
         }, {
            seite: 'yle.fi',
            setcookieablehnen: 'userconsent=v2|;',
            setcookieakzeptieren: 'userconsent=v2|development|embedded_social_media;'
         }, {
            seite: 'bbc.com',
            setcookieablehnen: 'ckns_explicit=1; , ckns_policy=010;',
            setcookieakzeptieren: 'ckns_explicit=2; , ckns_policy=111;'
         }, {
            seite: 'free-beat-company.jimdosite.com',
            setcookieablehnen: 'ckies_cloudflare=allow; , ckies_google_maps=deny; , ckies_youtube=deny;',
            setstorageakzeptieren: 'cookies-selected=true'
         }, {
            seite: 'gskill.com',
            setcookieakzeptieren: 'popupWindow=1;'
         }, {
            seite: 'strassen-mv.de',
            setcookieablehnen: 'cookieconsent_dismissed=yes;',
            setcookieakzeptieren: 'cookieconsent_dismissed=yes; , sz_track=yes;'
         }, {
            seite: 'e-mobileo.de',
            setcookieablehnen: 'viewed_cookie_policy=yes;',
            setcookieakzeptieren: 'viewed_cookie_policy=yes; , cookielawinfo-checkbox-non-necessary=yes; , cookielawinfo-checkbox-necessary=yes;'
         }, {
            seite: 'mapy.com',
            setcookieablehnen: 'euconsent-v2=CQhUF0AQhUF0AD3ACzENCWFgAAAAAEPgAATIAAASrgKgAVABAADIAGgATAAxAB-AEIAI4ATgA7gCEAEWATaAqQBWQC3AF5gMsAZcBKsAAAAA.IJVwFQAKgAgABkADQAJgAYgA_ACEAEcAJwAdwBCACLAJtAVIArIBbgC8wGWAMuAlWAAA.YAAAAAAAAQAA;',
            setcookieakzeptieren: 'euconsent-v2=CQm-o8AQm-o8AD3ACzENCmFwAIPAAEPgAATIJNQKAAFAAQAAqABkAEAAKAAZAA0ACSAEwAJwAWwAvwBhAGIAQEAggCEAEUAI4ATgAoQBxADuAIQAUgA04COgE2gKkAVkAtwBeYDGQGNgMsAZcA0MB_gEBwIzASaBKuAqABUAEAAMgAaABMADEAH4AQgAjgBOADuAIQARYBNoCpAFZALcAXmAywBlwEqwAAAA.IJVwLAAFAAQAAqABkAEAAKAAZAA0ACSAEwAJwAWwAvwBhAGIAPwAgIBBAEIAIoARwAnABQgDNAHEAO4AhABFgCkAGnAR0Am0BUgCsgFuALzAYyAxsBlgDLgGhgP8AgOBGYCTQEqw.YAAAAAAAAQAA;'
         }, {
            seite: 'agendadigitale.eu',
            setcookieablehnen: 'cookiepolicy=required;',
            setcookieakzeptieren: 'cookiepolicy=required,profiling,analytics;'
         }, {
            seite: 'kathond.nl',
            setcookieakzeptieren: 'cookie_consent=dismiss;'
         }, {
            seite: 'studienteilnehmergesucht.de',
            setcookieablehnen: 'cookieConsent=%7B%22cookie_necessary_enabled%22%3Afalse%2C%22cookie_functional_enabled%22%3Atrue%2C%22cookie_analytics_enabled%22%3Afalse%2C%22cookie_marketing_enabled%22%3Afalse%7D;',
            setcookieakzeptieren: 'cookieConsent=%7B%22cookie_necessary_enabled%22%3Atrue%2C%22cookie_functional_enabled%22%3Atrue%2C%22cookie_analytics_enabled%22%3Atrue%2C%22cookie_marketing_enabled%22%3Atrue%7D;'
         }, {
            seite: 'mystery-banksy.com',
            setcookieablehnen: 'borlabs-cookie=%7B%22consents%22%3A%7B%22essential%22%3A%5B%22borlabs-cookie%22%5D%7D%2C%22domainPath%22%3A%22mystery-banksy.com%2F%22%2C%22expires%22%3A%22Sat%2C%2027%20Jun%202026%2018%3A32%3A58%20GMT%22%2C%22uid%22%3A%22anonymous%22%2C%22v3%22%3Atrue%2C%22version%22%3A1%7D;',
            setcookieakzeptieren: 'borlabs-cookie=%7B%22consents%22%3A%7B%22essential%22%3A%5B%22borlabs-cookie%22%5D%2C%22statistics%22%3A%5B%22google-analytics-site-kit%22%5D%2C%22marketing%22%3A%5B%22meta-pixel-for-wordpress%22%2C%22meta-pixel%22%5D%7D%2C%22domainPath%22%3A%22mystery-banksy.com%2F%22%2C%22expires%22%3A%22Sat%2C%2005%20Sep%202026%2019%3A28%3A12%20GMT%22%2C%22uid%22%3A%22a0t2pznj-bmauuces-j3rbb3se-l4pxmsxb%22%2C%22v3%22%3Atrue%2C%22version%22%3A1%7D;'
         }, {
            seite: 'maxgaming.gg',
            setcookieablehnen: 'air_cookie_consent={"1":true,"5":false,"6":false};',
            setcookieakzeptieren: 'air_cookie_consent={"1":true,"5":true,"6":true};'
         }, {
            seite: 'phoenix.de',
            setstorageablehnen: 'user_anonymous_profile={"config":{"tracking":true,"userprofile":false,"youtube":false,"twitter":false,"facebook":false,"iframe":false,"video":{"useSubtitles":false,"useAudioDescription":false}},"votings":[],"msgflash":[],"history":[]}',
            setstorageakzeptieren: 'user_anonymous_profile={"config":{"tracking":true,"userprofile":true,"youtube":true,"twitter":true,"facebook":true,"iframe":true,"video":{"useSubtitles":false,"useAudioDescription":false}},"votings":[],"msgflash":[],"history":[]}'
         }, {
            seite: 'stepstone.de',
            setstorageablehnen: 'consent_level={"isEssential":true,"isFunctional":false}',
            setstorageakzeptieren: 'consent_level={"isEssential":true,"isFunctional":true}'
         }, {
            seite: 'hife.es',
            setcookieablehnen: 'hife_eu_cookie_consent=%5B%5D;',
            setcookieakzeptieren: 'hife_eu_cookie_consent=%7B%22analytic-cookies%22%3A%221%22%7D;',
            reload: true
         }, {
            seite: 'spravazeleznic.cz',
            setcookieablehnen: 'SPOJENICONSENT=0,1,0,0;',
            setcookieakzeptieren: 'SPOJENICONSENT=0,1,1,0;'
         }, {
            seite: 'ti.com',
            setcookieablehnen: 'CONSENTMGR=c1:0%7Cc3:0%7Cc6:0%7Cc7:0%7Cts:1783720024876%7Cconsent:false;',
            setcookieakzeptieren: 'CONSENTMGR=consent:true%7Cts:1783720081900%7Cc1:1%7Cc2:1%7Cc3:1%7Cc4:1%7Cc5:1%7Cc6:1%7Cc7:1%7Cc8:1%7Cc9:1%7Cc10:1%7Cc11:1%7Cc12:1%7Cc13:1%7Cc14:1%7Cc15:1;'
         }];

         for (let i = 0; i < regeln.length; i++) {
            // Gucken ob die aufgerufene Seite von einer Regel gedeckt ist.
            let seiten = regeln[i].seite.toString();
            seiten = seiten.split(',');
            for (let k = 0; k < seiten.length; k++) {
               if (location.hostname.endsWith('.' + seiten[k]) || location.hostname === seiten[k]) {
                  console.log('[Cookie auto decline] Regel für folgende Seite gefunden: ' + seiten[k]);
                  if ((regeln[i].noframe === true && window.self == window.top) || regeln[i].noframe !== true) {

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

                     if (!regeln[i].checkcookie && regeln[i].setcookie && document.cookie.includes(regeln[i].setcookie.split('=')[0]) === true) {
                        return;
                     }
                     if (regeln[i].setstorage && window.localStorage.getItem(regeln[i].setstorage.split(' ,, ')[0].replace(/=.*/, '')) !== null) {
                        return;
                     }
                     if (regeln[i].checkcookie && document.cookie.includes(regeln[i].checkcookie)) {
                        return;
                     }

                     // Cookie Banner Status Addon global mittels Storage setzen.
                     if (document.hidden !== true) {
                        let cookiebannerstatus = {
                           seite: domainohnewww,
                           cookieoderstoragegesetzt: true,
                           suchstatus: "suche",
                           anbieter: "unbekannt",
                           knopfstatus: "suche"
                        };
                        browser.storage.local.get('cookiebannerstatuscookie').then(function (a) {
                           if (a && a.cookiebannerstatuscookie) {
                              let tempcookiebannerstatus = a.cookiebannerstatuscookie;
                              let istdiedomainvorhanden = false;
                              for (let i = 0; i < tempcookiebannerstatus.length; i++) {
                                 if (tempcookiebannerstatus[i].seite === domainohnewww) {
                                    if (Object.entries(tempcookiebannerstatus[i]).toString() !== Object.entries(cookiebannerstatus).toString()) {
                                       tempcookiebannerstatus[i].cookieoderstoragegesetzt = true;
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

                     // Reload
                     if (regeln[i].reload === true) {
                        forcesessionstorage();
                        location.reload();
                     }
                  }
                  break;
               }
            }
         }
         // Sonderfälle
         if (window.location.hostname === 'cmp.seznam.cz') {
            // Öffene geschlossenes Shadowroot (closed -> open)
            let openshadowroot = document.createElement('script');
            openshadowroot.innerText = 'Element.prototype.attachShadow = new Proxy(Element.prototype.attachShadow, { apply(target, thisArg, args) { args[0].mode = "open"; return Reflect.apply(target, thisArg, args); } });';
            document.documentElement.appendChild(openshadowroot);
            document.querySelector('html > script:first-child').remove();
            // Klicke Cookie Banner
            let findecookiebanner = window.setInterval(function () {
               let akzeptieren = document.querySelector('.szn-cmp-dialog-container');
               if (akzeptieren) {
                  akzeptieren = akzeptieren.shadowRoot.querySelector('button[data-testid="cw-button-agree-with-ads"]');
                  if (akzeptieren) {
                     console.log('[Cookie auto decline] Detected: cmp.seznam.cz redirect cookie banner');
                     forcesessionstorage();
                     clearInterval(findecookiebanner);
                     window.setTimeout(function () {
                        akzeptieren.click();
                     }, 202);
                  }
               }
            }, 200);
            window.setTimeout(function () {
               clearInterval(findecookiebanner);
            }, 5000);
         }
      }
   };
})();
