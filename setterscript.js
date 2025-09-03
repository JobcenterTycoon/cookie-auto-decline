'use strict';
(function () {

   // Führe den Hauptscript nur aus wenn das Addon nicht für die Seite deaktiviert ist. Startet den Script einmalig wenn im laufenden Betrieb das Addon aktiviert wird.
   let scriptdeaktiviert = false;
   const domainkeinwww = window.location.hostname.replace(/(www([0-9]{1,2})?\.)/, '');
   const prüfeobdasaddondeaktiviertist = function () {
      scriptdeaktiviert = false;
      browser.storage.local.get("aufdiesenseitendeaktiviert").then(function (a) {
         if (a && a.aufdiesenseitendeaktiviert && a.aufdiesenseitendeaktiviert.seiten) {
            const seiten = a.aufdiesenseitendeaktiviert.seiten;
            for (let i = 0; i < seiten.length; i++) {
               if (seiten[i] === domainkeinwww) {
                  scriptdeaktiviert = true;
               }
            }
            if (scriptdeaktiviert === false) {
               browser.storage.local.onChanged.removeListener(prüfeobdasaddondeaktiviertist);
               setzecookiehauptscript();
            }
         }
      });
   };
   prüfeobdasaddondeaktiviertist();
   browser.storage.local.onChanged.addListener(prüfeobdasaddondeaktiviertist);

   // Hauptscript
   const setzecookiehauptscript = function () {

      // Session Storage Funktion
      let forcesessionstorage = function () {
         if (sessionStorage.getItem('mpowlesu908hxfyw37ghg5ikx90jdzt') !== 'djx0v0odce35xrb2pt5dzbgaj1mud5c' && window.location.hostname.endsWith('.mydealz.de') === false) {
            sessionStorage.setItem('mpowlesu908hxfyw37ghg5ikx90jdzt', 'djx0v0odce35xrb2pt5dzbgaj1mud5c');
         }
      };

      // Teil Hauptscript
      if ((sessionStorage.getItem('mpowlesu908hxfyw37ghg5ikx90jdzt') !== 'djx0v0odce35xrb2pt5dzbgaj1mud5c' && (window.innerHeight > 400 || window.innerHeight === 0)) && window.location.hostname !== 'accounts.google.com' && window.location.hostname !== 'challenges.cloudflare.com' && window.location.href.startsWith('https://www.google.com/recaptcha/') !== true && window.location.href.startsWith('https://www.recaptcha.net/recaptcha/') !== true && window.location.href.startsWith('https://w.soundcloud.com/player/?url=http') !== true && window.location.href.startsWith('https://r-login.wordpress.com/remote-login.php') !== true) {

         // Cookie Banner die ersten 5 Sekunden verstecken.
         window.addEventListener('DOMContentLoaded', function () {
            if (document.querySelector('body[class="no-js"] > .main-wrapper[role="main"] + script') === null && document.querySelector('html[style="height:100%"] iframe[src^="/_Incapsula_Resource?"]') === null && document.querySelector('link[href="/cdn-cgi/styles/challenges.css"][rel="stylesheet"]') === null && document.querySelector('body[style="margin:0"] > script[src^="https://ct.captcha-delivery.com/"]') === null && document.querySelector('body > div:first-child + script[src^="https://mcl.spur.us/d/mcl.js?"] + script:last-child') === null) {
               let css = document.createElement('style');
               css.innerText = 'div[style*="blur"]:has(> .wp-exclude-emoji > .animate__animated div > a[href="#"][style="order: 1;"][role]) *, div[style]:has(> .wp-exclude-emoji > .animate__animated div > a[href="#"][style="order: 1;"][role]), body > .js-modal[style="z-index: 2147483647 !important"]:has(.js-modal--cookies),.sp-message-open{overflow:auto!important;}:is(div, form, dialog, section, aside, cms-cookie-bar):is([class*="cookie"], [class*="Cookie"], [id*="cookie"], [id*="Cookie"], [class*="keks"], [id*="keks"], [aria-labelledby*="cookie"], [aria-labelledby*="consent"], [aria-label*="ookie"], [aria-label*="consent"], cookie-law, [class*="consent"], [id*="consent"], [class*="c-disclaimer"], [class*="cc_banner"], [class*="gdpr"], [id*="gdpr"], [class*="dsgvo"], [id*="dsgvo"]):not([style*="display: none !important"], [style*="visibility: hidden !important"], :empty, .gridAndInfoContainer),#BorlabsCookieBox,[data-borlabs-cookie-wrap],div[id*="Cookiebot"], div#cookiebot,#_cp_wall,#bnp_cookie_banner,#cc_privacy_layer,#cmp-style-reset,#cmpbox,#cmpbox2,#cmpwrapper,#ez-cookie-dialog-wrapper,#ez-cookie-loader-wrapper,#gdpr-banner[aria-hidden],#gdpr-consent-tool-wrapper,#gdpr-privacy-settings,#gdpr-single-choice-overlay,#jentis_consent,#onetrust-consent-sdk,#truste-consent-track,#uhfCookieAlert,[id^="usercentrics-"]:not(script),#comspace-usercentrics,.CookieComplianceContainer-veil,.artdeco-global-alert--COOKIE_CONSENT[type=COOKIE_CONSENT],.c-cookie-consent--default,.truste_box_overlay,.truste_overlay,.waconcookiemanagement,app-required-consent-overlay,body>#cmplz-cookiebanner-container,body>#portal-root>div:not([id],[class])>div[class^=Overlay__container___][class*=Overlay__containerActive___],body>#react-root>div>div>div>div>div:last-child>div>div[data-testid=BottomBar],body>[data-react-modal-body-trap]+.ReactModalPortal,body>div#a-page>span.a-declarative[data-action=sp-cc][data-csa-c-type=widget][data-csa-c-func-deps=aui-da-sp-cc][data-sp-cc*="/privacyprefs/"],body>div>div[aria-label*=oogle][id][class][aria-modal][role=dialog][tabindex="0"][data-ved][style="display: block;"],body>div[aria-label*=oogle][id][class][aria-modal][role=dialog][tabindex="0"][data-ved][style="display: block;"],body>div[data-testid=cookie-policy-manage-dialog],body>div[data-testid=wa_cookies_banner_modal],body>tp-yt-iron-overlay-backdrop[opened],body>ytd-app>ytd-consent-bump-v2-lightbox#lightbox,.cmp-root-container,div[class^=Layout-sc-][class$=consent-banner],div[data-enzyme-id=CookieComplianceModal],div[data-tracking-opt-in-overlay],div[id^=sp_message_container_],script[src^="https://k.twitchcdn.net"]+.ReactModalPortal,tiktok-cookie-banner,.osano-cm-window,#didomi-host,#qc-cmp2-container,#cookieBanner,#iubenda-cs-banner,#cookie-banner_flag + #banner-wrapper,#gd-cookie-consent,.gdpr-wrapper,fainin-cookie-consent,#precmpdialog,.js-consent-banner,#hellotrust_cookie_popup,#cookiebanner,#cookiePrefPopup,.cookie-consent-spice,#cookie_accept_msg_block,#optanon,.optanon-alert-box-wrapper,iframe#fast-cmp-iframe,#cookieDialog,#cookie-notice,#cookie-consent,.mnd-cookie-modal,#cookie-law-info-bar,#consent-manager,#cookiefirst-root,.cookiefirst-root,#form-cookies-banner,#appconsent,#cookieConsent,.cookie-disclaimer-intrusive,#cookieconsent_options,#cookie-overlay,#cookieNotice,#cookie-consent-wrapper,.cc-window[role="dialog"][aria-label="cookieconsent"][aria-describedby="cookieconsent:desc"],[aria-describedby="cookiebar-desc"],div[aria-describedby="cookieconsent:desc"].cc-window + div > div[id="cookieconsent:settings"],#cookie_consent,.cookie-panel__description,.as-oil-content-overlay,.mnd-cookie-wrapper,.mnd-cookie-modal,#colorbox.cookie-popup,.individual-cookie-wrap,#cookie-manage,#cookiebarNew,#cookiesMessage,.page-wrap--cookie-permission,.js-cookiebox,#idxrcookies,form#cookiebar,.cookie-popup[x-data],.c24-cookie-consent-wrapper,.cookie-banner,#modalCookie,.cookie-modal,#cookieModal,#cookie_banner,#ccc,#cc--main.c--anim[style],#cc-main,.mmcm-container,cmp-banner,sibbo-cmp-layout,.cookies_modalbox,div[id="orejime"],.acris-cookie-consent,#gdpr-dialog,#GDPRConsentManagerContainer,.TraminoConsent,#cookieNote,#cookie-disclosure,.adsk-gdpr-footer-wrapper,#p_p_id_CookiePortlet_,div[id="klaro"],div[id="timm4-cookie-consent"],#SgCookieOptin,#usercentrics-button,#bgc-cookie-popup,#sd-cmp[class^="sd-cmp-"],.cky-consent-container,#acris--cookie-permission--modal-overlay,#acris--page-wrap--cookie-permission,#shopify-pc__banner[role="alertdialog"][aria-labelledby][style="display: block;"],.--framer-cookie-banner-container,#privacy_optin_611,div[id^="__tealiumGDPR"],.avia-cookie-consent-wrap,#cookiebar_optin_219.mod_cookiebar_optin_slim,iframe[src^="https://cdn.baycloud.com/"],#sd-cmp[class^="sd-cmp-"],.ccm-root,body > .stpd_cmp,#jmdCookieConsentWrapper,#bbcdBanner,#consent-manager.active,#consent.active,#cookieChoiceInfo.cookie-choices-info,div[aria-describedby="cc-individual-cookie-settings"],.cc-individual-cookie-settings-overlay,div[class="sp-dsgvo sp-dsgvo-popup-overlay not-accepted"],aside#moove_gdpr_cookie_info_bar,[class^="gdpr_lightbox gdpr_lightbox-opened"],#moove_gdpr_cookie_modal,#coiOverlay[role="banner"][style="display: flex;"][aria-hidden="false"],.cookieinfo[style^="position: fixed; left: 0px; right: 0px; height: auto; min-height: 21px; z-index: 2147483647; "],.cookie-permission-container[data-cookie-permission="true"][style="display: block;"],[class="mw-cookiewarning-container"],#tarteaucitronRoot,div[class="cc_banner-wrapper "],#eightworks-cookie-consent-plus[data-cookie-permission="true"],[class^="offcanvas offcanvas-"][class$="show"][aria-modal="true"][role="dialog"],#ketch-modal.ketch-flex, #ketch-banner.ketch-flex,#transcend-consent-manager[style="position: fixed; z-index: 2147483647;"],#axeptio_overlay.axeptio_mount[data-project-id],#cmp-app-container,div[role="dialog"].ch2-visible.ch2-dialog,div[class="ch2-settings ch2-settings-scan ch2-visible"],.amgdprjs-bar-template,.amgdprcookie-modal-container,.amgdprcookie-modal-container + .modals-overlay,li[class="notice js-notice notice--primary notice--cookie"],#freeprivacypolicy-com---nb[aria-describedby="cc-nb-text"],#cc_dialog[aria-labelledby="cc_dialog"].cc_css_reboot,#redim-cookiehint-bottom,#redim-cookiehint-modal,#dmsCookiePopup,#cookiesplus-modal-container.cookiesplus-move,#fides-banner-container.fides-banner:not(.fides-banner-hidden),.fides-modal-container[data-testid="consent-modal"]:not([aria-hidden="true"]),#fides-overlay.fides-overlay,.pixelmate-big-wrapper.pixelmate-general-banner-wrapper,#wpconsent-root > #wpconsent-container{clip-path:circle(0)!important;pointer-events:none!important;}';
               css.setAttribute('id', 'q3xyktv21es96by0ybwvb1e9a37y5pu');
               if (document.head !== null) {
                  document.head.appendChild(css);
               }
               window.setTimeout(function () {
                  let csscheck1 = document.getElementById('q3xyktv21es96by0ybwvb1e9a37y5pu');
                  if (csscheck1 !== null) {
                     forcesessionstorage();
                     csscheck1.remove();
                  }
               }, 8000);
            }
         });
         let nc;
         let ncnowww;
         if (window.location.protocol === 'http:') {
            nc = "domain=" + window.location.hostname + ";max-age=86400; SameSite=Lax; path=/";
            ncnowww = "domain=" + window.location.hostname + ";max-age=86400; SameSite=Lax; path=/";
         } else {
            nc = "domain=" + window.location.hostname + ";secure=true; max-age=86400; SameSite=None; path=/";
            ncnowww = "domain=" + window.location.hostname + ";secure=true; max-age=86400; SameSite=None; path=/";
         }

         if (window.location.hostname.startsWith('www.')) {
            ncnowww = ncnowww.replace('domain=www.', 'domain=');
         }

         const cookiezeit = new Date().getTime();
         const cookiedatum = new Date().toISOString();
         const regeln = [{
            // privacy-mgmt.com
            seite: 'heise.de',
            setcookie: 'consentUUID=cc3fda07-066e-4c67-a9eb-72d5dce1a921_32_33_37_39_44;'
         }, {
            seite: 'spiegel.de',
            setcookie: 'consentUUID=5aca01af-a126-44e3-ae3c-b26b6baa419f_43_45;'
         }, {
            seite: 't3n.de',
            setcookie: 'consentUUID=a7f00152-3ceb-4694-a759-422cb7b302ad_26_35_38_40_43_44_46;'
         }, {
            seite: 'welt.de',
            setcookie: 'consentUUID=c2e087c6-5092-49e0-8187-3634107772e3_47;'
         }, {
            seite: 't-online.de',
            setcookie: 'consentUUID=f9b4fee9-ba11-428f-8246-1658e587879d_36_44;'
         }, {
            seite: 'autobild.de',
            setcookie: 'consentUUID=22adf7b9d-db7e-4444-b36e-d4c079dfd0e2_25_29_32_34_37_41_42_44_47;'
         }, {
            seite: 'bild.de',
            setcookie: 'consentUUID=8d50c862-cc9e-4b60-b313-591952f29ab3_42_44_47;'
         }, {
            seite: 'computerbild.de',
            setcookie: 'consentUUID=b1aa470e-70cc-4891-8407-72f677cdec82_42_44_46_47;'
         }, {
            seite: 'stern.de',
            setcookie: 'consentUUID=f2196ea7-1afa-4986-87e4-2a28d05bd56b_32_33_38_41_44_46;'
         }, {
            seite: 'pcwelt.de',
            setcookie: 'consentUUID=478090ac-09a6-451f-a2c3-20789ac47314_32_33_34_36_38_40_42_44_46_47;'
         }, {
            seite: 'focus.de',
            setcookie: 'consentUUID=18b0a05b-008f-4e03-a958-439f32de8e88_32_34_36_38_39_42_44_46;'
         }, {
            seite: 'krzbb.de',
            setcookie: 'consentUUID=7bcfd185-6b83-49c5-8d8e-3afd092ba512_45;'
         }, {
            seite: 'geo.de',
            setcookie: 'consentUUID=9392cae7-796a-4291-98fd-802b3970a5ee_32_34_38e_39_41_44_46;'
         }, {
            seite: 'giga.de',
            setcookie: 'consentUUID=f16bebe9-e880-48aa-a19a-5ad09c3b0c2d_47;'
         }, {
            seite: 'familie.de',
            setcookie: 'consentUUID=6a54e310-3bdb-4056-a31c-66ec9bbb4586_46;'
         }, {
            seite: 'sport1.de',
            setcookie: 'consentUUID=89da2b14-cb6f-49e4-af96-67dc8d8a40f6_32_34_39_41;'
         }, {
            seite: 'kino.de',
            setcookie: 'consentUUID=ada63ca7-2651-4dc8-8b29-d77b19fd2b81_46;'
         }, {
            seite: 'likehifi.de',
            setcookie: 'consentUUID=9f9ccda5-c4b8-49bf-973c-3470fb663bbc_32_33_34_36_37_38_41_42_43_47;'
         }, {
            seite: 'backenmachtgluecklich.de',
            setcookie: 'consentUUID=c7ac4d5e-c8ae-42d6-aca3-4341da49d300_32_34_36_41_46_47;',
            nowww: true
         }, {
            seite: 'raspberry-pi-geek.de',
            setcookie: 'consentUUID=039f14d5-214e-46a6-a3ab-0eebd5198635_32_33_34_36_38_41_42_43_47;'
         }, {
            seite: 'n-tv.de',
            setcookie: 'consentUUID=b275cb44-5e3c-4d1c-9a88-142c95caee24_44_46;'
         }, {
            seite: 'chip.de',
            setcookie: 'consentUUID=8c7e01cc-3108-4650-a225-681acde1db99_32_33_34_35_36_38_39_40_42_43_46_47;'
         }, {
            seite: 'rtl.de',
            setcookie: 'consentUUID=5a2997bb-3886-4fa1-b0f2-66a8d716c19c_32_34_37_39_41_44_46;'
         }, {
            seite: 'weather.com',
            setcookie: 'consentUUID=43158759-e592-419e-bf11-429409f91eae_46;'
         }, {
            seite: 'cinestar.de',
            setcookie: 'consentUUID=797b7d14-32c2-4a40-9935-9404824101d1_34_37_38_39_40_43_44_46;'
         }, {
            seite: 'forschung-und-wissen.de',
            setcookie: 'consentUUID=afebf0e1-6a7f-41d8-aad4-8245d1e40944_34_47;'
         }, {
            seite: 'ark-unity.com',
            setcookie: 'consentUUID=10a7171e-7071-4c34-9012-fe991aca25b7_42_44;'
         }, {
            seite: 'telepolis.de',
            setcookie: 'consentUUID=77de41d9-7918-43ba-b0c1-0365aa8942eb_36_39_44_46;'
         }, {
            seite: 'manager-magazin.de',
            setcookie: 'consentUUID=988dfc32-83c2-4b4c-96c1-4d5aa8889227_42;'
         }, {
            seite: 'zeit.de',
            setcookie: 'consentUUID=1cf0d3b1-d0bd-456c-8656-feaa5042a12f_47;'
         }, {
            // privacy-mgmt.com - ENDE
            seite: 'bandlab.com',
            setstoragename: 'privacyConsent',
            setstoragecontent: '{"essential":true,"functionality":true,"analytics":false,"marketing":false}'
         }, {
            seite: 'aok-bv.de',
            setcookie: 'cookieBannerServices=cookieBannerFunctional|cookieBannerKomfort;'
         }, {
            seite: 'aok.de',
            setcookie: 'aok-gp-cookie-settings={"comfort":{"key":"comfort","required":false,"approved":true},"functional":{"key":"functional","required":true,"approved":true},"tracking":{"key":"tracking","required":false,"approved":false}}; , aok_cookie_settings=%7B%22functional%22%3A%7B%22key%22%3A%22functional%22%2C%22name%22%3A%22Funktionale%20Cookies%22%2C%22required%22%3Atrue%2C%22approved%22%3Atrue%7D%2C%22comfort%22%3A%7B%22key%22%3A%22comfort%22%2C%22name%22%3A%22Komfort-Cookies%22%2C%22required%22%3Afalse%2C%22approved%22%3Atrue%7D%2C%22tracking%22%3A%7B%22key%22%3A%22tracking%22%2C%22name%22%3A%22Marketing-Cookies%22%2C%22required%22%3Afalse%2C%22approved%22%3Afalse%7D%7D;'
         }, {
            seite: 'viactiv.de',
            setcookie: 'dp_cookie_settings=1; , function-cookies=1;'
         }, {
            seite: 'variohaus.de',
            setcookie: 'cookies=f=1%2Cs=0%2Cm=0;',
            reload: true
         }, {
            seite: 'fertighaus.de',
            setcookie: 'cookie_policy_config=es,fu;'
         }, {
            seite: 'radolfzell.de',
            setcookie: '{"cookieItems":[{"cookiekey":"coi_cookiesettings","type":"jsscriptfile","selected":true},{"cookiekey":"coi_seesioncookies","type":"jsscriptinline","selected":true},{"cookiekey":"coi_youtube","type":"iframe","selected":true},{"cookiekey":"coi_immoportalbodensee","type":"iframe","selected":true},{"cookiekey":"coi_daswetter","type":"jsscriptinline","selected":true},{"cookiekey":"coi_arcgis","type":"iframe","selected":true},{"cookiekey":"coi_ccegov","type":"iframe","selected":true},{"cookiekey":"coi_maileon","type":"iframe","alternativeurl":"cookieOpt/noMaileon.html","selected":false},{"cookiekey":"coi_mailerlite","type":"iframe","alternativeurl":"cookieOpt/noMailerLite.html","selected":false}],"version":"1000002","fromCookie":true}'
         }, {
            seite: 'worms.de',
            setcookie: 'allowLoadExternRessources=0; , allowTracking=0; , hideCookieNotice=1;'
         }, {
            seite: 'stadt-brandenburg.de',
            setcookie: 'consent=1,0,1,1,0;'
         }, {
            seite: 'staedtetag.de',
            setcookie: 'cookienotev2=opt-out-only;'
         }, {
            seite: 'jobcenter-myk.de',
            setcookie: 'bit_userConfirmCookies=true; , cookieconsent_status=comfort;'
         }, {
            seite: 'clickstorm.de',
            setcookie: 'cs_cookie_first=%7Cessential%7CexternalMedia%7Cmaps_google%7Cvideos_youtube%7C;'
         }, {
            seite: 'ifabrik.de',
            setcookie: 'sccookie=%7B%22consent%22%3A%7B%22essential%22%3A1%2C%22media%22%3A%5B%22vimeo%22%2C%22youtube%22%5D%7D%2C%22plugin%22%3A%7B%22author%22%3A%22Heiko%20Pfefferkorn%20%3Cinfo%40ifabrik.de%3E%22%2C%22name%22%3A%22%40packages%2Fsc-cookie%22%2C%22version%22%3A%221.1.1%22%7D%7D;'
         }, {
            seite: 'ubuntu.com',
            setcookie: '_cookies_accepted=functionality;'
         }, {
            seite: 'reverbnation.com',
            setcookie: '_rn_cc=MnMsMCwxLGY6MnQsMCwxLGZ8MFcrQUM2cjRZRXR2ZFF0QlpjTjhzdz09;'
         }, {
            seite: 'gofundme.com,patreon.com',
            setstoragename: 'tcmConsent',
            setstoragecontent: '{"purposes":{"SaleOfInfo":"Auto","Analytics":false,"Functional":true,"Advertising":false},"timestamp":"' + cookiedatum + '","confirmed":true,"prompted":true,"updated":true}'
         }, {
            seite: 'afternic.com,godaddy.com',
            setcookie: 'OPTOUTMULTI=0:0%7Cc2:1%7Cc9:1%7Cc11:1; , pwinteraction=Wed%2C%2013%20Sep%202023%2015%3A27%3A25%20GMT;'
         }, {
            seite: 'change.org',
            setstoragename: '_change_cookie_prefs',
            setstoragecontent: '{"preferences":{"consent_text":"Cookies akzeptieren","status":false},"analytics":{"consent_text":"Cookies akzeptieren","status":false},"marketing":{"consent_text":"Cookies akzeptieren","status":false}}'
         }, {
            seite: 'finanzchef24.de',
            setcookie: 'cookie_consent_level={"functionality":false,"strictly-necessary":true,"targeting":false,"tracking":false};'
         }, {
            seite: 'tunnelbear.com',
            setcookie: 'ac=true;'
         }, {
            seite: 'dahag.de',
            setcookie: 'dahagCookieConsent={"necessary":"true","statistic":"false"}'
         }, {
            seite: 'surfshark.com',
            setcookie: 'surfshark-cookies-consent=100;'
         }, {
            seite: 'nordvpn.com',
            setcookie: 'consent=functionality_storage:granted%2Canalytics_storage:denied%2Cad_storage:denied; , cookieconsent_status=dismiss;'
         }, {
            seite: 'bayernportal.de',
            setcookie: 'comfortConsent=true; , cookieConsent=true;',
            reload: true
         }, {
            seite: 'fingerprint.com',
            setstoragename: 'cookieChoice',
            setstoragecontent: '["required"]'
         }, {
            seite: 'eqmac.app',
            setstoragename: 'EQM_PRIVACY_CONSENT_CHOSEN',
            setstoragecontent: 'true'
         }, {
            seite: 'scoyo.de',
            setcookie: 'squla-analytical-agreement=0; , squla-cookie-agreement=1; , squla-marketing-agreement=0;'
         }, {
            seite: 'optoma.de',
            setcookie: 'optoma_cookie_preference=false;'
         }, {
            seite: 'kununu.com',
            setcookie: 'userConsent=%7B%22marketing%22%3Afalse%2C%22version%22%3A%223%22%7D;'
         }, {
            seite: 'minecraft.tools',
            setcookie: 'cc_cookie={"level": ["necessary"]};'
         }, {
            seite: 'edeka.de',
            setcookie: 'EDEKA_PRIVACY_CENTER=; , EDEKA_PRIVACY=1@057@@91@1690139442149@;'
         }, {
            seite: 'skinmc.net',
            setcookie: 'laravel_eu_cookie_consent=%7B%22session%22%3A%221%22%2C%22xsrf-token%22%3A%221%22%2C%22youtube%22%3A%221%22%7D;',
            reload: true
         }, {
            seite: 'bewerbung-tipps.com',
            setcookie: 'cookieconsent=%5B%5D;',
            reload: true
         }, {
            seite: 'xenudo.de',
            setcookie: 'cookie-consent=;',
            reload: true
         }, {
            seite: 'theo-schrauben.de',
            setstoragename: 'consent',
            setstoragecontent: '{"version":5,"settings":{"recaptcha":true,"grez_consent_googlekundenrezensionen":true,"jtl_paypal_commerce_consent":true,"youtube":false,"vimeo":false,"ws5_sendinblue_consent":false,"gc_analytics":false,"gc_adwords":false}}'
         }, {
            seite: 'all3dp.com',
            setcookie: '_iub_cs-45533713-granular=%7B%22gac%22%3A%22MX4mAQMBAgEIAQUBCAEMAQUBAwEOAQgBBAEBAQoCBgICAQEBCQECAQQBAwEUAQMBBQEIAQYBCQEBAQgBAQERAQYBEwEEARMBBQEEAgMBCgEcAQMBDQEDAQQBAgEJAQUBAQEIAQUBBQEIAQMBAwEcAQMBBAECAgUBAQEBARACEAEJAQgCBwEFAQEBBwECAQMBwpEBBwEpAQ4CDQECAhEBGAECAQYBGAEEAREBCAEGASgBAQEDAREBFAECAQMBAQEGAQUBBAEBAQ0BEQEGAQIBAQEBAQcBEwEHAQcBBQECAQkBAwETAQEBDAEDAQUBAwEKAgIBFQEPAQEBBQEHAQEBAwEKAQUBBAEgAQoBBwIJARsBCwICARQBAQEGAQUCCAEdARABAwEIAQ4BBwEGAQIBBQEFAQYBAQEDAgYBCwEMARUBDAEBAQsBAQEJAgMBDgEBAQMBCAEDAQQBAwEGAQwBBAEOAQMBDAEDAQ0BCQEOAQEBBAEFAQEBAQIBAQ0BBgEDAQcBAQEIAQkBEQELAQwBAQERAwIDCAEYAQMCEgEHAQMBBAECAQQBAwEHAQMBAQEBAQEBDQEBAQwBAwEBAQUBCAEFAQIBAQEBAQIBBAEBAQIBBQEJAQoBBQECAQ8BAgEKAQICAQECAQgBEgEKAQ4BAgEJAQYBBQEDAQIBAwEFAQIBAgECAQIEBQEKAQIDCgEFAgkBBAEBAQUBAgEBAQEBAwECAQEBAQEGAQ4BBgENAgIBAgEDAQQBAwECAQEBAQEEAQMDAQEIAgUBCAIEAQECBgEJAQoCAgMBAgIBAQEFAgsBBAECAgIDAQEBAQYBBgIDAgEBBQIBAwIDAwMBAgcCBgEDAQIBAQICAQQBAgEIAQUCDgEJARsCAQEBAQsBAgEDAgUBAgEDAQYCAgMCAgQBAgICAQMDAwEBAgECAQEBAQEBAwEBAgEBAQEBAQMEAQEBBQEEAQEBAwECAQIGAgEEAQUBAwIBAQMHAwUBAQIFAQEBAgEBBAEBAQECAwMDAQEBAwMBAgIBAQECAQIBAQIDAQEDBAQCAgEFAQICBAEBAQIBAwIBAQICAwEBAgEBAQEBBwoCAgMBAQEBBAEBAQIBAgEEBAMBAQMBAQQCCAEDAwICBgIDAQQCBgEBBAEEAwEBAgsDAgIBAQEBAgIBBAEDAQUBAQMCBAIBAQMBAgEHAQEBAQEIAQYBAQEBAgECAwEFAwUDAQEFAQICAQHDiAHEqwFjAQ%3D%3D%22%7D; , _iub_cs-45533713=%7B%22timestamp%22%3A%222023-07-13T11%3A31%3A41.909Z%22%2C%22version%22%3A%221.49.2%22%2C%22purposes%22%3A%7B%221%22%3Atrue%2C%223%22%3Atrue%2C%224%22%3Atrue%2C%225%22%3Atrue%7D%2C%22id%22%3A45533713%7D; , euconsent-v2=CPu2HEAPu2HEAB7EwBENDNCsAP_AAAAAAAAAF5wAQF5glpAMABwAZ8BHgCZwG-AO2AdyBBQCRAElAJRgS0AECQAQF5joAIC8yUAEBeZSACAvMAAA; , PUR_SUBSCRIPTION=ADS;'
         }, {
            seite: 'kick.com',
            setstoragename: 'cookies_accepted',
            setstoragecontent: 'false'
         }, {
            seite: 'catsbest.de',
            setcookie: 'gdpr-cookie=eyJ2ZXJzaW9uIjoiMiIsImdyb3VwcyI6eyJlc3NlbnRpYWwiOnRydWUsInN0YXRpc3RpY3MiOmZhbHNlLCJleHRlcm5hbC1tZWRpYSI6dHJ1ZX0sImNvb2tpZXMiOnsiZ29vZ2xlLWFuYWx5dGljcyI6ZmFsc2UsImZiLXBpeGVsIjpmYWxzZSwiZ29vZ2xlLXRhZy1tYW5hZ2VyIjpmYWxzZSwieW91dHViZSI6dHJ1ZX19;'
         }, {
            seite: 'metro.de,metro.fr,metro.at,metro.bg,makro.nl,metro.it,metro.pe,makro.cz,makro.pt,makro.pl',
            setcookie: 'allowedCookieCategories=necessary%7Cfunctional%7CUncategorized%7Cv1;'
         }, {
            seite: 'eundl.de',
            setcookie: 'cs=2;'
         }, {
            seite: 'bettersafe.at',
            setcookie: 'COOKIEBAR_1=0;'
         }, {
            seite: 'defencediscountservice.co.uk',
            setcookie: 'privacy=%7B%22cga%22%3A0%2C%22cgc%22%3A0%2C%22cfb%22%3A0%2C%22cfb_share%22%3A0%2C%22cvwo%22%3A0%7D;'
         }, {
            seite: 'mydpd.at',
            setcookie: 'cc=ga:0,fb:0,gm:1;'
         }, {
            seite: 'adomino.net',
            setcookie: 'cookieflow=none;'
         }, {
            seite: 'vliegwinkel.nl',
            setcookie: 'cookieConsentLevel=functional;'
         }, {
            seite: 'kvk.nl',
            setcookie: 'allowAnalyticsCookiesKvK=0; , allowTrackingCookiesKvK=0; , cookieCodeKVK=0001; , cookieLevelCodeKVK=0001;'
         }, {
            seite: 'concursolutions.com',
            setcookie: 'notice_gdpr_prefs=0:; , notice_preferences=0:;'
         }, {
            seite: 'wifi.at',
            setcookie: 'consent=true;'
         }, {
            seite: 'bayernlb.de',
            setcookie: 'layerCookie=true; , linkedInCookie=true; , maps=true; , podcast=true; , twitterCookie=true; , video=true;',
            reload: true,
            noframe: true
         }, {
            seite: 'unive.it',
            setcookie: 'unive.it=1;'
         }, {
            seite: 'azb-cuw.pl',
            setcookie: 'cookie=1;'
         }, {
            seite: 'leibniz.com',
            setcookie: 'consent=1;'
         }, {
            seite: 'shimano.com',
            setcookie: 'cookiePrefAnalytics=0; , cookiePrefMarketing=0; , cookiePrefThirdPartyApplications=1; , eu_cookie_accept=1;'
         }, {
            seite: 'umcutrecht.nl',
            setcookie: '.AspNet.Consent=no;',
            setstoragename: 'consent',
            setstoragecontent: '.AspNet.Consent=no; expires=Fri, 22 Aug 2099 15:35:43 GMT; path=/; secure'
         }, {
            seite: 'manutd.com',
            setcookie: 'userConsentCookiePolicy=off;'
         }, {
            seite: 'nano.org',
            setcookie: 'nano-org-cookie-consent-agree=true;'
         }, {
            seite: 'bluelightcard.co.uk',
            setcookie: 'privacy=%7B%22cga%22%3A0%2C%22cgc%22%3A0%2C%22cfb%22%3A0%2C%22cfb_share%22%3A0%2C%22cvwo%22%3A1%7D;'
         }, {
            seite: 'quickpharm.net',
            setcookie: 'cookieAgreement=false;',
            setstoragename: 'mapsAllowed',
            setstoragecontent: 'true'
         }, {
            seite: 'sevdesk.de,sevdesk.at',
            setcookie: 'userConsent=false;'
         }, {
            seite: 'landkreis-pfaffenhofen.de',
            setcookie: 'ld-cookieselection16569--1156368248-0=cookieselection-checkbox-necessary;'
         }, {
            seite: 'modellbau-berlinski.de',
            setcookie: 'dbfakt_cookie_check=e1a66c75bc5df6c6e2a75c50f3e62912; , dbfakt_cookie=%5B%22shop%22%2C%22amazon_pay%22%2C%22google_maps%22%5D;',
            reload: true,
            noframe: true
         }, {
            seite: 'derkum-modellbau.com',
            setcookie: 'dbfakt_cookie_check=efc64997c48827fbea0ca4367cd4f9d4; , dbfakt_cookie=%5B%22shop%22%5D;',
            reload: true,
            noframe: true
         }, {
            seite: 'modellbau-metz.com',
            setcookie: 'dbfakt_cookie_check=5f866c75c046d7f4045e63cc0e81892a; , dbfakt_cookie=%5B%22shop%22%2C%22google_maps%22%2C%22vimeo%22%5D;',
            reload: true,
            noframe: true
         }, {
            seite: 'cutt.ly',
            setcookie: 'cc_cookie={"categories":["necessary","preferences"],"level":["necessary","preferences"],"revision":0,"data":null,"rfc_cookie":false,"consent_date":"' + cookiedatum + '","consent_uuid":"e8ba3e38-a991-40e9-9876-917b66a3a733","last_consent_update":"' + cookiedatum + '"};'
         }, {
            seite: 'curseforge.com',
            setcookie: 'cf_cookieBarHandled=true;'
         }, {
            seite: 'evz.de',
            setcookie: 'CookieConsent=mandatory;'
         }, {
            seite: 'virustotal.com',
            setcookie: 'euConsent=1;'
         }, {
            seite: 'bingen-ruedesheimer.de',
            setcookie: 'cookieConsent={%22Lang%22:%22DE%22%2C%22cat1%22:%22On%22%2C%22cat2%22:%22Off%22%2C%22cat3%22:%22Off%22%2C%22cat4%22:%22Off%22%2C%22cat5%22:%22Off%22%2C%22cat6%22:%22Off%22};'
         }, {
            seite: 'witter-towbars.co.uk',
            setcookie: 'cookie_consent_set=1; , cookie_functionality_storage=1; , cookie_marketing_storage=0; , cookie_statistics_storage=0;'
         }, {
            seite: 'mobile-fueling.de',
            setcookie: 'cookieControlPrefs=["comfort"]; , cookieControl=true;'
         }, {
            seite: 'baechli-bergsport.ch',
            setstoragename: 'cookieconsent',
            setstoragecontent: '{"functionality":true,"tracking":false,"marketing":false}'
         }, {
            seite: 'asus.com',
            setcookie: 'isReadCookiePolicyDNTAa=false; , isReadCookiePolicyDNT=No; , LithiumCookiesAccepted=0;'
         }, {
            seite: 'ebatpro.fr',
            setcookie: 'setup=1;',
         }, {
            seite: 'huss-licht-ton.de',
            setcookie: 'huss_cookie_version=1; , huss_cookie=%7B%22acceptcookies%22%3A%5B%5D%2C%22user_hash%22%3A%22196df052e3382111587910b112cd9e504cc586da8fec77a0289248447766b588%22%7D;'
         }, {
            seite: 'bosch-homecomfort.com,bosch-presse.de,bosch-smarthome.com,bosch-professional.com,bosch-ebike.com,bosch-bkk.de',
            setcookie: 'do-consent={%22consent%22:{%22convenience%22:false%2C%22analysis%22:false%2C%22marketing%22:false%2C%22advertising%22:false%2C%22custom%22:[]}%2C%22timeToLive%22:31%2C%22timestamp%22:' + cookiezeit + '%2C%22version%22:4};'
         }, {
            seite: 'bosch-professional.com,dremel.com',
            setcookie: 'privacy-consents-v4={%22consent%22:{%22convenience%22:false%2C%22analysis%22:false%2C%22marketing%22:false%2C%22advertising%22:false%2C%22custom%22:[]}%2C%22timeToLive%22:31%2C%22timestamp%22:' + cookiezeit + '%2C%22version%22:4};'
         }, {
            seite: 'alpenverein-muenchen-oberland.de',
            setcookie: 'cookie_accept=0; , wgDisable3rdParty=1; , wgDisableAnalytics=1;'
         }, {
            seite: 'qatarairways.com',
            setcookie: 'cookie_visited=true; , accepted_functional=true; , accepted_marketing=false;',
         }, {
            seite: 'lhsystems.com',
            setcookie: 'comfortCookiesAccepted=false; , functionalCookiesAccepted=false; , necessaryCookies=true; , statisticsCookiesAccepted=false;'
         }, {
            seite: 'enesco.co.uk',
            setcookie: 'acceptCookieCookie=true; , enableNonEssentialCookies=false;'
         }, {
            seite: 'autohero.com',
            setcookie: 'consent=0;'
         }, {
            seite: 'hamburgcars.net',
            setcookie: 'cookie_consent_status=["bdk","trustami"]; , cookie_consent_ts=' + cookiezeit
         }, {
            seite: 'otto.market',
            setcookie: 'allowCookies=true;'
         }, {
            seite: 'roller.de',
            setstoragename: 'cookie-hinweis',
            setstoragecontent: '{"accepted":false,"declined":true}'
         }, {
            seite: 'hoeffner.de',
            setcookie: 'optOutAccepted=true;'
         }, {
            seite: 'moebel.de',
            setcookie: 'user-consent=Google Maps,Dynamic Yield,Usercentrics Consent Management Platform,Google Fonts,Stripe;',
            reload: true
         }, {
            seite: 'ardplus.de',
            setstoragename: 'cookieSettings',
            setstoragecontent: '{"fullOpt":false,"googleAnalytics":false,"facebookTrackingPixelandConversionAPI":false,"googleAds":false}'
         }, {
            seite: 'bike24.de',
            setcookie: 'cookieConsent={"algolia":false,"basket-store":true,"dy":false,"emarsys":false,"taboola":false,"google-ga":false,"google-tm":false,"facebook":false,"bing":false,"clarity":false,"rememberMe":true,"trbo":false,"zenloop":false,"version":"1.4"};'
         }, {
            seite: 'xhamster.com,xhamster.desi,xhamster.xxx,buktube.com,fullxh.com,galleryxh.site,megaxh.com,movingxh.world,seexh.com,taoxh.life,unlockxh4.com,xhaccess.com,xhadult2.com,xhadult3.com,xhadult4.com,xhadult5.com,xhamster46.com,xhbig.com,xhbranch5.com,xhday.com,xhday1.com,xhmoon5.com,xhplanet1.com,xhplanet2.com,xhreal2.com,xhreal3.com,xhtab2.com,xhtab4.com,xhtree.com,xhvictory.com,xhwebsite.com,xhwebsite2.com,xhwide1.com,woxh.world',
            setcookie: 'cookie_accept_v2=%7B%22e%22%3A1%2C%22f%22%3A0%2C%22t%22%3A0%2C%22a%22%3A0%7D;'
         }, {
            seite: 'utiq.com',
            setstoragename: 'utiqCookieAcknowledged',
            setstoragecontent: 'true'
         }, {
            seite: 'arbeitsagentur.de',
            setcookie: 'cookie_consent=denied; , marketing_consent=denied; , personalization_consent=denied;'
         }, {
            seite: 'wuerfelzeit.com',
            setcookie: 'epCookieConsent=0;',
            reload: true
         }, {
            seite: 'zdf.de,zdfheute.de',
            setcookie: 'zdf_cmp_client={%22version%22:%22v1%22%2C%22iteration%22:1%2C%22consents%22:[{%22id%22:%22erforderlich%22%2C%22value%22:true}%2C{%22id%22:%22erfolgsmessung%22%2C%22value%22:false}%2C{%22id%22:%22personalisierung%22%2C%22value%22:false}%2C{%22id%22:%22socialMedia%22%2C%22value%22:false}%2C{%22id%22:%22instagram%22%2C%22value%22:false}%2C{%22id%22:%22twitter%22%2C%22value%22:false}%2C{%22id%22:%22facebook%22%2C%22value%22:false}%2C{%22id%22:%22drittsysteme%22%2C%22value%22:false}]};'
         }, {
            seite: 'dozapteka.pl,doz.pl',
            setcookie: 'consent-granted=1; , consent-granted-version=23;',
            setstoragename: 'userConsents',
            setstoragecontent: '{"ad_storage":"denied","ad_user_data":"denied","ad_personalization":"denied","analytics_storage":"denied","functionality_storage":"granted","personalization_storage":"denied","security_storage":"granted"}',
            reload: true
         }, {
            seite: 'lemon-aid.de',
            setstoragename: 'cookie-consent',
            setstoragecontent: 'refuse'
         }, {
            seite: 'pcbway.com',
            setcookie: 'pcbwaycookies_analytics=1; , pcbwaycookies_functional=0; , pcbwaycookies=true;',
            reload: true
         }, {
            seite: 'destatis.de,bmel.de,zensus2022.de,ble.de,bafa.de,aufstiegs-bafoeg.de,verfassungsschutz.de,bundespolizei.de,bund.de,deutsche-rohstoffagentur.de',
            setcookie: 'gsbbanner=closed; , cookieConsent=NO;'
         }, {
            seite: 'vdk.de',
            setstoragename: 'vdk-iframe-enabled,vdk-podigee-enabled,vdk-required-enabled,vdk-status,vdk-youtube-enabled',
            setstoragecontent: 'true ; true ; true ; acceptSelection ; true'
         }, {
            seite: 'spacebar.news',
            setcookie: 'hideCookieBanner=true;'
         }, {
            seite: 'skppsc.ch',
            setstoragename: 'banner',
            setstoragecontent: 'true'
         }, {
            seite: 'tu-darmstadt.de',
            setcookie: 'cookie-consent=[%22essential%22];'
         }, {
            seite: 'uni-tuebingen.de',
            setcookie: 'in2cookiemodal-selection=[%22essential%22];'
         }, {
            seite: 'uni-mannheim.de',
            setcookie: 'cookieNotice=1; , cookieAccept=0;'
         }, {
            seite: 'uni-hildesheim.de',
            setcookie: 'cookie_consent=%7B%22consent%22:true,%22options%22:%5B%5D%7D;'
         }, {
            seite: 'uni-goettingen.de',
            setcookie: 'matomo_optOut=1;'
         }, {
            seite: 'uni-assist.de',
            setcookie: 'omCookieConsent=group-1.1,group-2.0,dismiss;'
         }, {
            seite: 'fau.de',
            setcookie: 'rrze-legal-consent=%7B%22consents%22%3A%7B%22essential%22%3A%5B%22default%22%2C%22wordpress%22%2C%22simplesamlsessionid%22%2C%22phpsessid%22%2C%22rrze_rsvp%22%5D%7D%2C%22domainPath%22%3A%22www.fau.de%2F%22%2C%22expires%22%3A%22Tue%2C%2014%20May%202024%2013%3A51%3A04%20GMT%22%2C%22uid%22%3A%22anonymous%22%2C%22version%22%3A%227%22%7D;'
         }, {
            seite: 'tiktok.com',
            setcookie: 'cookie-consent={%22ga%22:false%2C%22af%22:false%2C%22fbp%22:false%2C%22lip%22:false%2C%22bing%22:false%2C%22ttads%22:false%2C%22reddit%22:false%2C%22hubspot%22:false%2C%22version%22:%22v10%22};'
         }, {
            seite: 'uni-bielefeld.de',
            setcookie: 'ubf-cookie-consent=false;'
         }, {
            seite: 'united-domains.de',
            setcookie: 'CookieSettingsGroupId=01917f6d-780c-7172-96cb-8560844fcd8d.12;',
            reload: true
         }, {
            seite: 'poolmegastore.de',
            setcookie: 'PrivacyBanner={%22tm%22:%2223-08-2024@15:30:14%22%2C%22PrivacyBanner%22:true%2C%22ttcms%22:true%2C%22website_statistic%22:false%2C%22google_analytics%22:false%2C%22ga-disable%22:true%2C%22mollie%22:true%2C%22klarna%22:true%2C%22klarna_paylater%22:false%2C%22amazon_pay%22:true%2C%22paypal_checkout%22:true%2C%22paypal_account%22:true%2C%22matomo%22:false%2C%22matomo_functional%22:true%2C%22google_youtube%22:true%2C%22PrivacyBanner_Youtube%22:true%2C%22google_maps%22:true%2C%22PrivacyBanner_GoogleMaps%22:true%2C%22google_ads_remarketing%22:false%2C%22Kelkoo%22:false%2C%22PhpBB%22:true};'
         }, {
            seite: 'ispringlearn.de',
            setcookie: 'cookieConsent=4;'
         }, {
            seite: 'bdc.de',
            setcookie: 'analyse-disabled=true;'
         }, { // trustarc.com
            seite: 'oracle.com,trustarc.com,samsung.com,flickr.com,hostelworld.com,juniper.net,css-tricks.com,concursolutions.com,ibmcloud.com,mi.com',
            setcookie: 'notice_gdpr_prefs=0:; , notice_preferences=0:; , cmapi_cookie_privacy=permit 1 required;'
         }, { // trustarc.com - ENDE
            seite: 'helmholtz.de',
            setcookie: 'Helmholtz-Cookie=false;'
         }, {
            seite: 'fdm-druckservice.de',
            setcookie: 'cookieControl=true; , cookieControlPrefs=[];'
         }, {
            seite: 'theycantalk.com',
            setcookie: 'gdpr_banner_accepted=1;'
         }, {
            seite: 'doppelmayr.com',
            setcookie: 'essential=true; , external=true;'
         }, {
            seite: 'lk-nienburg.de',
            setcookie: 'nolis_cookiedough=ALL;'
         }, {
            seite: 'tricksplit.io',
            setstoragename: 'accepted',
            setstoragecontent: 'true'
         }, {
            seite: 'helmholtz-klima.de',
            setcookie: 'cookie-agreed=0;'
         }, {
            seite: 'aeroreport.de',
            setstoragename: 'aeroreport-consent-key',
            setstoragecontent: '[1]'
         }, {
            seite: 'transportenvironment.org',
            setcookie: 'CookieControl={"necessaryCookies":["PHPSESSID","wordpress_*","wfwaf-authcookie-*","wf_loginalerted_*","wfCBLBypass","__cfduid","__cfruid","lang","CookieConsent","CookieControl","gravityformsfbgfgocardlesshosted"],"optionalCookies":{},"statement":{"shown":true,"updated":"07/04/2021"},"consentDate":' + cookiezeit + ',"consentExpiry":90,"interactedWith":true,"user":"A083169D-10F1-472E-A1C8-EF6D54F9B0B1"};'
         }, {
            seite: 'haute-innovation.com',
            setcookie: 'uncode_privacy%5Bprivacy_bar%5D=1;'
         }, {
            seite: 'baeckerei-roennau.de',
            setcookie: 'hasConsent=false;'
         }, {
            seite: 'backmarket.de',
            setcookie: 'BM_Advertising=false; , BM_Analytics=false; , BM_User_Experience=false; , braze_consent_updated=true;',
            reload: true
         }, {
            seite: 'coolgadget.de',
            setcookie: '4S_CookiePrivacy=v2-4747905304498640968:0[000]-1[11]-0[0]-1[];'
         }, {
            seite: 'wassermanufaktur.com',
            setstoragename: 'cookiePreference',
            setstoragecontent: 'required'
         }, {
            seite: 'autismus-sh.de',
            setstoragename: 'mono_donottrack',
            setstoragecontent: 'true'
         }, {
            seite: 'autismus-verstehen.de',
            setcookie: 'cookie_consent={"statistics":{"googleAnalytics":false}};'
         }, {
            seite: 'honeygain.com',
            setcookie: 'cookieConsent={%22submitBasicData%22:true%2C%22submitUsageStats%22:false%2C%22submitAudienceData%22:false};',
            reload: true
         }, {
            seite: 'bonus-bunny.de',
            setcookie: 'bst_dsgvo_cookie=1;'
         }, {
            seite: 'mobrog.com',
            setcookie: 'settings=on;'
         }, {
            seite: 'naehstudioulrike.de',
            setcookie: 'epCookieConsent=0;',
            reload: true
         }, {
            seite: 'stmas.bayern.de',
            setcookie: 'required=1;'
         }, {
            seite: 'energieatlas.bayern.de',
            setcookie: 'eab=%7B%22functional%22%3Afalse%2C%22matomo%22%3Afalse%2C%22webanalyse%22%3Afalse%7D;'
         }, {
            seite: 'kamdi24.de',
            setcookie: 'cconsent={"version":1,"categories":{"necessary":{"wanted":true},"funktionell":{"wanted":false},"marketing":{"wanted":false}},"services":["session","seo_idm","x_ua_device","cconsent","facebook","tagmanager","analytics"]};'
         }, {
            seite: 'orderchamp.com',
            setcookie: 'COOKIEmessage=1;'
         }, {
            seite: 'grandprixradio.dk,grandprixradio.nl,grandprixradio.be',
            setcookie: 'analytics_cookies=0; , cookies_accepted=1; , tracking_cookies=0; , advertisement-age-show-alcohol=false; , advertisement-age-show-gamble=false;'
         }, {
            seite: 'huber-se.com',
            setcookie: 'cookie_consent=;'
         }, {
            seite: 'insolvenzanwalt24.de',
            setcookie: 'cookieAgree=%7B%22cookie-esssential%22%3Atrue%2C%22cookie-google-analytics%22%3Afalse%7D;'
         }, {
            seite: 'studentenwerk-dresden.de',
            setcookie: 'swdd-cookie-consent=1;',
            reload: true
         }, {
            seite: '100prozentautark.de',
            setstoragename: 'cookieNotificationHasBeenSeen',
            setstoragecontent: 'true'
         }, {
            seite: 'retn.net',
            setcookie: 'accept=ok;'
         }, {
            seite: 'right.ly',
            setcookie: 'tracking-preferences={%22version%22:1%2C%22destinations%22:{%22Actions%20Google%20Analytic%204%22:false%2C%22Amplitude%22:false%2C%22Bing%20Ads%22:false%2C%22Facebook%20Pixel%22:false%2C%22Facebook%20Pixel%20Server%20Side%22:false%2C%22Google%20AdWords%20New%22:false%2C%22Google%20Analytics%204%20Web%22:false%2C%22Google%20Tag%20Manager%22:false%2C%22Hotjar%22:false}};'
         }, {
            seite: 'immobilien24.de',
            setcookie: 'consent=%7B%22facebookPixel%22%3Afalse%2C%22GALimited%22%3Atrue%2C%22GAFull%22%3Afalse%2C%22googleAdvertising%22%3Afalse%2C%22cloudflare%22%3Atrue%2C%22consentManager%22%3Atrue%2C%22googleTagManager%22%3Atrue%2C%22jQuery%22%3Atrue%2C%22sessionCookies%22%3Atrue%2C%22consentTS%22%3A1709222094%2C%22acceptAll%22%3Afalse%2C%22firsthit%22%3Atrue%7D;'
         }, {
            seite: 'obelink.de',
            setcookie: 'cookieConsentPrefs={%22cg_essential%22:1%2C%22cg_analytical%22:1%2C%22cg_marketing%22:1%2C%22expire%22:182%2C%22secure%22:1};'
         }, {
            seite: 'airitsystems.de',
            setcookie: 'limz_consent_cookie=%7B%22accepted%22%3Atrue%2C%22preferences%22%3Afalse%2C%22statistics%22%3Afalse%2C%22marketing%22%3Afalse%2C%22version%22%3A1%7D;'
         }, {
            seite: 'german.cri.cn',
            setstoragename: 'german_isPrivacy',
            setstoragecontent: '1'
         }, {
            seite: 'inf-shop.de',
            setcookie: 'gdpr_user_interaction_done=yes;'
         }, {
            seite: 'ada.com',
            setcookie: 'cookie_settings={%22necessary%22:true%2C%22statistics%22:false%2C%22marketing%22:false%2C%22updatedAt%22:" + cookiezeit + "};'
         }, {
            seite: 'bmwk.de,bmwk-energiewende.de,german-energy-solutions.de,personalausweisportal.de,bundeswirtschaftsministerium.de',
            setcookie: 'cookiebanner=closed;'
         }, {
            seite: 'bsi.bund.de',
            setcookie: 'cookiebanner=close;'
         }, {
            seite: 'bund.de',
            setcookie: 'isTrackingConsentGiven=false;'
         }, {
            seite: 'wayfair.de',
            setcookie: 'user_cookie_prefs=NECESSARY%2CADMINISTRATIVE;',
            reload: true
         }, {
            seite: 'fainin.com',
            setcookie: 'ucc_consents=[%22base%22];'
         }, {
            seite: 'drweb-av.de',
            setcookie: 'SwIt_msg_cookies=%22accepted%22;'
         }, {
            seite: 'metro.hu',
            setcookie: 'allowedCookieCategories=necessary;'
         }, {
            seite: 'eam-netz.de',
            setcookie: 'omCookieConsent=group-1.0,group-2.0,dismiss;'
         }, {
            seite: 'swrag.de',
            setcookie: 'CookieLayerDismissed=true;'
         }, {
            seite: 'drimsim.com',
            setstoragename: 'DS_POLICY',
            setstoragecontent: '{"user":false,"anon":false}'
         }, {
            seite: 'tvgids.nl',
            setcookie: '_osb_consent=CQDzioAQDzioAFjAWBENBDFgAAAAAAAAABpYAAAAAAAA.YAAAAAAAAAAA;'
         }, {
            seite: 'bankmillennium.pl',
            setcookie: 'Marketing_consent=2;'
         }, {
            seite: 'highend-audiokabel.de',
            setcookie: 'accept_cookies2=true;',
            reload: true
         }, {
            seite: 'kadari.net',
            setcookie: 'krd-notice=confirmed;',
            reload: true
         }, {
            seite: 'klett.de',
            setcookie: 'klett_cookie_consent={%22statistiken%22:false};'
         }, {
            seite: 'fitx.de',
            setcookie: 'mandatory.consentGiven=true; , mandatory.marketing=true; , mandatory.preference=true;'
         }, {
            seite: 'hek.de,inp-gruppe.de,altoetting.de,micronova.de',
            setcookie: 'cookie_consent=;'
         }, {
            seite: 'tinyurl.com',
            setstoragename: 'cookiesAccepted',
            setstoragecontent: 'true'
         }, {
            seite: 'waze.com',
            setcookie: 'ads-cookie-consent=disallow;'
         }, {
            seite: 'netcup.com',
            setcookie: 'js-cookie-opt-in__consent=needed,preference;'
         }, {
            seite: 'diffusmag.de,diffus.de',
            setcookie: 'tracking=no;'
         }, {
            seite: 'blocksmc.com',
            setcookie: 'allowCookies=1;'
         }, {
            seite: 'faindx.com',
            setstoragename: 'RubyPrivacyAllowed',
            setstoragecontent: '1'
         }, {
            seite: 'safemoon.com',
            setcookie: 'acceptCookies=true;'
         }, {
            seite: 'temu.com',
            setcookie: 'privacy_setting=100;',
            setstoragename: 'cookie_prompt_times,last_prompt_time',
            setstoragecontent: '1 ; ' + cookiezeit + ''
         }, {
            seite: 'karriere-feuerwehr.hamburg',
            setcookie: 'hsnCookieAllowed={"gtm":false,"youtube":true};'
         }, {
            seite: 'global2000.at',
            setcookie: 'legalweb_cookie_settings=%7B%22guid%22%3A%22a5dd9b1f-4f8a-4df5-a46a-50f467828655%22%2C%22version%22%3A1708611751%2C%22lifeTime%22%3A94608000%2C%22integrations%22%3A%5B%22embeddings_buzzsprout%22%2C%22embeddings_googleforms_free%22%2C%22embeddings_openstreetmap%22%2C%22embeddings_spotteron%22%2C%22embeddings_typeform%22%2C%22embeddings_vimeo%22%2C%22embeddings_youtube%22%5D%2C%22lastChangeOn%22%3A1714216081064%2C%22includeSubdomains%22%3A%221%22%2C%22domain%22%3A%22global2000.at%22%2C%22gvlVersion%22%3A0%7D;'
         }, {
            seite: 'sell.amazon.de',
            setcookie: 'appguard-cookie-consent=operational%7C!performance%7C!advertising;'
         }, {
            seite: 'kba-online.de',
            setstoragename: 'ora-cookie-policy',
            setstoragecontent: 'accepted'
         }, {
            seite: 'storefront.prod.kulturpass.de',
            setcookie: 'kp-cookie-banner-accepted=" + cookiezeit + ";'
         }, {
            seite: 'swissgrid.ch',
            setcookie: 'acceptedCookie=true;'
         }, {
            seite: 'emobilitaet.sh',
            setcookie: 'cms_cookie=%7B%22pref%22%3A1%2C%22stat%22%3A0%2C%22market%22%3A0%2C%22prefo%22%3A1%2C%22stato%22%3A0%2C%22marketo%22%3A0%2C%22req%22%3A1%2C%22id%22%3A%221666728113662cefd68c9c03.71955225%22%2C%22tset%22%3A1714221014%7D;',
            reload: true
         }, {
            seite: 'braufreude.de',
            setcookie: 'allowCookie=1;'
         }, {
            seite: 'github.com',
            setcookie: 'GHCC=Required:1-Analytics:0-SocialMedia:0-Advertising:0;'
         }, {
            seite: 'freiewaehler.eu',
            setcookie: 'ccm_consent=c1.2.5;',
            reload: true
         }, {
            seite: 'longi.com',
            setcookie: 'CookieConsent=false;'
         }, {
            seite: 'chargecloud.de',
            setstoragename: 'stromfahrer_privacy_policy_read,stromfahrer_consent_required,stromfahrer_consent_google,stromfahrer_consent_extended_sentry',
            setstoragecontent: 'true ; true ; true ; false'
         }, {
            seite: 'kreissler24.de',
            setcookie: '4S_CookiePrivacy=v2-15043700029010274669:0[00],1[1],0[0000],1[11];'
         }, {
            seite: 'go-e.com',
            setcookie: 'gdpr={%22version%22:%221.1_tracking%22%2C%22options%22:{%22typo3%22:true%2C%22gdpr%22:true%2C%22openstreetmap%22:true%2C%22vimeo%22:true%2C%22youtube%22:true%2C%22recaptcha%22:true%2C%22googlemaps%22:true%2C%22tracking%22:false}};'
         }, {
            seite: 'men-at-work.net',
            setcookie: 'bst_accepted=1;'
         }, {
            seite: 'twitter.com,x.com',
            setcookie: 'd_prefs=MjoxLGNvbnNlbnRfdmVyc2lvbjoyLHRleHRfdmVyc2lvbjoxMDAw;',
            noframe: true
         }, {
            seite: 'developer.twitter.com,developer.x.com,help.x.com',
            setcookie: 'twtr_pixel_opt_in=N;'
         }, {
            seite: 'offgridtec.com',
            setcookie: 'cookie-preference=1; , acris_persistent_cart_sw=1; , youtube-cookie=true;'
         }, {
            seite: 'brightdata.de',
            setcookie: 'brd_cookie_consent=%7B%22name%22%3A%22save%22%2C%22saved_at%22%3A" + cookiezeit + "%2C%22settings%22%3A%7B%22necessary%22%3Atrue%2C%22pers%22%3Afalse%2C%22perf%22%3Afalse%2C%22mkt%22%3Afalse%7D%7D;'
         }, {
            seite: 'nico-fahrradwerkstatt.de',
            setcookie: 'b2ad21-874=true;'
         }, {
            seite: 'gluehbirnebillig.de',
            setcookie: 'cookieConsentAnalyticsGranted=0; , cookieConsentDeclined=0; , cookieConsentFunctionalityGranted=1; , cookieConsentGranted=1; , cookieConsentMarketingGranted=0; , cookieConsentPersonalizationGranted=1; , cookieConsentPersonalization=0; , cookieConsentSecurityGranted=1; , cookieConsentUserdata=0;'
         }, {
            seite: 'adidas.de',
            setcookie: 'notice_preferences=%5B0%2C1%5D;'
         }, {
            seite: 'matratzen.discount',
            setcookie: 'md_cookie_allow={%22necessary%22:true%2C%22advertising%22:false};'
         }, {
            seite: 'elektrosol.de',
            setcookie: 'cookie_optin_q=googlemaps%2Cyoutubevideos; , cookienotification=notified;'
         }, {
            seite: 'sex.de',
            setcookie: 'CookieConsent=esex;',
            setstoragename: 'CookieAccept',
            setstoragecontent: '1'
         }, {
            seite: 'sex.com',
            setcookie: 'privacy-preferences=%7B%22essential%22%3Atrue%2C%22analytics%22%3Afalse%7D;'
         }, {
            seite: 'tuinmaximaal.de',
            setcookie: 'pr-cookie-consent=[]; , pr-cookie-consent-id=3767448; , user_allowed_save_cookie=%7B%7D;'
         }, {
            seite: 'gogoro.com',
            setcookie: 'GDPR_OPT=REJECTED; , LEGAL_OPT=1;'
         }, {
            seite: 'dekoder.org',
            setstoragename: 'ph-cookie-compliance',
            setstoragecontent: 'declined'
         }, {
            seite: 'geotastic.net',
            setstoragename: 'privacy-policy-accepted,privacy-policy-accepted-date',
            setstoragecontent: 'true ; ' + cookiezeit + ''
         }, {
            seite: 'dashboard-deutschland.de',
            setstoragename: 'cbV2Closed',
            setstoragecontent: 'true'
         }, {
            seite: 'grover.com',
            setcookie: 'cookieconsent={%22preferenceCookie%22:true%2C%22statisticsCookie%22:false%2C%22marketingCookie%22:false%2C%22consentTimestamp%22:1719775985784%2C%22consentExpiration%22:%222025-06-30T19:27:43.258Z%22};'
         }, {
            seite: 'owayo.de',
            setcookie: 'CookieShow=true; , CookieShowpreferences=allow; , CookiePreferences=["preferences"]; , cc_cookie={"categories":["preferences"],"level":["preferences"],"revision":0,"data":null,"rfc_cookie":false,"consent_date":"2024-06-30T20:17:02.786Z","consent_uuid":"7348e67f-1bbd-429c-a657-7df0a2641004","last_consent_update":"2024-06-30T20:17:02.786Z"};'
         }, {
            seite: 'anbord.de',
            setcookie: 'cookie-cracker_1=true; , cookie-cracker_1_prefs=technischnotwendig,cookie-cracker,woocommerce,wordPress-user-login;'
         }, {
            seite: 'hyla-germany.de',
            setstoragename: 'cookie-preference',
            setstoragecontent: 'declined'
         }, {
            seite: 'neubaukompass.de',
            setcookie: 'accept-googlefonts=" + cookiezeit + "; , accept-googlemaps=" + cookiezeit + "; , accept-required=" + cookiezeit + "; , accept-thirdparty=" + cookiezeit + ";'
         }, {
            seite: 'energie-und-management.de',
            setcookie: 'trackingConsent=1; , trackingDisableGoogle=1; , trackingDisableIVW=1; , trackingPressed=1;'
         }, {
            seite: 'upmpaper.com',
            setcookie: 'UPMCookiePolicy=strictlyNecessary|functional;'
         }, {
            seite: 'dekra.de',
            setstoragename: 'privacySettings',
            setstoragecontent: '{"baidu_maps":"true","linkedin":"false","facebook":"false","googleAds":"false","baidu":"false","hubspot":"false","hotjar":"false","matomo":"false","googleTagManager":"false","youtube":"true","applicationsights":"false","google_maps":"true","vimeo":"true"}'
         }, {
            seite: 'tiny-huchler.de',
            setcookie: 'CookieBanner=1;'
         }, {
            seite: 'tiny-house-helden.de',
            setcookie: 'allowTracking=declined;'
         }, {
            seite: 'aikosolar.com',
            setcookie: 'aiko-show-cookie-section=0;'
         }, {
            seite: 'vehgroshop.de',
            setstoragename: 'showCookieBar',
            setstoragecontent: 'false'
         }, {
            seite: 'solaragentur.ch',
            setcookie: 'cookie-agreed=2;'
         }, {
            seite: 'schiffe-kaufen.de',
            setcookie: 'popup=1;',
            reload: true
         }, {
            seite: 'dvtiernahrung.de',
            setcookie: 'cc_preferences={"1":true,"2":false};',
            reload: true
         }, {
            seite: 'freiflaechen-photovoltaik.de',
            setcookie: 'fhw_dsgvo_cookies_cookie=1;'
         }, {
            seite: 'woltair.de',
            setcookie: 'CM_AD=denied; , CM_ANALYTICS=denied; , CM_BANNER=false; , CM_PERSONALIZATION=granted;'
         }, {
            seite: 'nrw.de,justiz.nrw',
            setcookie: 'cookie-agree=-1;'
         }, {
            seite: 'einfach-sparsam.de',
            setcookie: 'einfach_sparsam_consent=1;'
         }, {
            seite: 'bauzaunwelt.de',
            setcookie: 'cookiesplus=%7B%22C_P_DISPLAY_MODAL%22%3Afalse%2C%22cookiesplus-finality-18%22%3A%22on%22%2C%22cookiesplus-finality-19%22%3A%22off%22%2C%22cookiesplus-finality-20%22%3A%22off%22%2C%22consent_date%22%3A%222024-07-21%2015%3A29%22%7D;'
         }, {
            seite: 'shell.de',
            setstoragename: '_evidon_proxy',
            setstoragecontent: '{"date":"2024-08-08T13:51:38.744Z","statistics":false,"preferences":false,"marketing":false,"functional":true}'
         }, {
            seite: 'maysunsolar.de',
            setcookie: '__strk_cookie_notification=1;'
         }, {
            seite: 'energiestiftung.ch',
            setcookie: 'cms_cookie=reject;',
            reload: true
         }, {
            seite: 'bernau.de',
            setcookie: 'privacySettings=%7B%22core%22%3A%221%22%2C%22functional%22%3A%220%22%2C%22external%22%3A%220%22%2C%22analytics%22%3A%220%22%7D;',
            reload: true
         }, {
            seite: 'dnr.de',
            setstoragename: 'gd-consent',
            setstoragecontent: '{"activeCategories":[],"activeServices":[]}'
         }, {
            seite: 'pendlerinfo.org',
            setcookie: 'dataProtectionConfirmed=yes;'
         }, {
            seite: 'storag-etzel.de',
            setcookie: 'gmfCookieConfig=2;'
         }, {
            seite: 'csagroup.org',
            setcookie: 'tru-analytics-cookies=no; , tru-functional-cookies=yes; , tru-required-cookies=yes; , tru-targeting-cookies=no;'
         }, {
            seite: 'fachagentur-windenergie.de',
            setcookie: 'EU_OPTIN=1;'
         }, {
            seite: 'intelligent-heizen.info',
            setcookie: 'bs_cookie_settings={"level":["necessary"],"revision":0,"data":null,"rfc_cookie":false};'
         }, {
            seite: 'tinte24.de',
            setcookie: 'mcDsgvo=declined;'
         }, {
            seite: 'bing.com',
            setcookie: 'BCP=AD=0&AL=0&SM=0;'
         }, {
            seite: 'standort-sachsen.de',
            setcookie: 'user-settings-cookies=accept-none;'
         }, {
            seite: 'fz-juelich.de',
            setcookie: 'confirm_cookies=1;'
         }, {
            seite: 'channele2e.com',
            setcookie: 'CookieConsent=true;'
         }, {
            seite: 'maxeon.com',
            setcookie: 'cookiePolicy=accepted;'
         }, {
            seite: 'xn--fahrradprfung-4ob.de,fahrradprüfung.de',
            setcookie: 'ckcs=deny;'
         }, {
            seite: 'energieheld.de',
            setcookie: 'CookieConsent={stamp:%27WM+blRw847WoKzGlcdHBfaOHz2SjIf+168yIrGTeXIOFA48wyhNUXA==%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:false%2Cmarketing:false%2Cmethod:%27explicit%27%2Cver:2%2Cutc:1752782707503%2Cregion:%27de%27};',
            reload: true
         }, {
            seite: 'redgifs.com',
            setstoragename: 'cookie_notice',
            setstoragecontent: 'cancel'
         }, {
            seite: 'autoevolution.com',
            setcookie: 'cooknotif2018=1;'
         }, {
            seite: 'zierschildkroete.de',
            setstoragename: 'dsgvoaio',
            setstoragecontent: 'dsgvoaiowp_cookie=!vgwort=false!wordpressmain=true'
         }, {
            seite: 'vbv.at',
            setcookie: 'fcc_cookie_consent=1;'
         }, {
            seite: 'hypixel.net',
            setcookie: 'xfNew_consent=%5B%5D;'
         }, {
            seite: 'hugelshofer-logistik.ch',
            setcookie: 'cookieinfo=0;',
            reload: true
         }, {
            seite: 'methanology.com',
            setcookie: 'cookie-agreed=0;'
         }, {
            seite: 'bunny.net',
            setcookie: 'bn_cookies=1;'
         }, {
            seite: 'catf.us',
            setcookie: 'CookieScriptConsent={"googleconsentmap":{"ad_storage":"targeting","analytics_storage":"performance","functionality_storage":"","personalization_storage":"","security_storage":""},"action":"reject","categories":"[]","key":"a1870d20-9eb3-4562-aef2-fb7f96b6d5ba"};'
         }, {
            seite: 'reinigungsberater.de',
            setcookie: 'cConsent={"ga":false};'
         }, {
            seite: 'silent-power.com',
            setcookie: 'silent_power_cookie_policy=accepted;'
         }, {
            seite: 'blogspot.com',
            setcookie: 'displayCookieNotice=y;'
         }, {
            seite: 'opel.de',
            setcookie: '_psac_gdpr_consent_given=1;'
         }, {
            seite: 'frankonia.de',
            setcookie: 'cm=0;',
            reload: true
         }, {
            seite: 'greenpeace.org',
            setcookie: 'active_consent_choice=1;'
         }, {
            seite: 'stromausfall.info',
            setcookie: 'HideCookieWarning=true;',
            reload: true
         }, {
            seite: 'finya.de',
            setcookie: 'fyCcDecision={"ccStatistics":false};'
         }, {
            seite: 'blitzrechner.de',
            setcookie: 'gdpr-consent=["necessary"];'
         }, {
            seite: 'wind-turbine-models.com',
            setcookie: 'sl_consentcookie={"necessary":false,"analytics":false};'
         }, {
            seite: 'vivid.money',
            setcookie: 'v.settings_cookie={%22essential%22:true%2C%22personalization%22:false%2C%22analytics%22:false};'
         }, {
            seite: 'gekko-computer.de',
            setcookie: '4S_CookiePrivacy=v2-7465215491294153393:1[11]-0[0]-0[000]-0[00000];'
         }, {
            seite: 'consilium.europa.eu',
            setstoragename: 'cookieConsentAccepted',
            setstoragecontent: 'false'
         }, {
            seite: 'gridx.ai',
            setcookie: 'EasyCookieConsent={"t":1726143177695,"s":false,"m":false,"p":false};'
         }, {
            seite: 'eskp.de',
            setcookie: 'netl_gdpr_allowed=["essential"];'
         }, {
            seite: 'adobe.com',
            setcookie: 'OptanonAlertBoxClosed=' + cookiedatum + '; , OptanonConsent=landingPath=NotLandingPage&datestamp=Mon+Sep+16+2024+23%3A40%3A05+GMT%2B0200+(Mitteleurop%C3%A4ische+Sommerzeit)&version=202311.1.0&groups=C0001%3A1%2CC0002%3A0%2CC0003%3A0%2CC0004%3A0&hosts=&consentId=d7888e82-cf6b-4c9f-8bc4-e30feefec2d3&interactionCount=1;'
         }, {
            seite: 'whois.com',
            setcookie: 'cookieconsent_status=dismiss; , cookieconsent_prompt=1;'
         }, {
            seite: 'hawesko.de',
            setcookie: 'COOKIECONSENT=eyJvdGhlciI6ZmFsc2UsIm1hcmtldGluZyI6ZmFsc2UsInRyYWNraW5nIjpmYWxzZSwiZXNzZW50aWFsIjp0cnVlfQ==;',
            reload: true
         }, {
            seite: 'ecwid.com',
            setstoragename: 'allow-gdpr-cookie',
            setstoragecontent: 'false'
         }, {
            seite: 'cylib.de',
            setcookie: 'fs-cc=%257B%2522id%2522%253A%2522n12zvPf8WH8zdisSbgacj%2522%252C%2522consents%2522%253A%257B%2522analytics%2522%253Afalse%252C%2522essential%2522%253Atrue%252C%2522marketing%2522%253Afalse%252C%2522personalization%2522%253Afalse%252C%2522uncategorized%2522%253Afalse%257D%257D;'
         }, {
            seite: 'mytinyhouseproject.de',
            setcookie: 'cookie_notice_accepted=false;'
         }, {
            seite: 'arzt-auskunft.de',
            setcookie: 'CookieScriptConsent={"action":"reject","categories":"[]"};'
         }, {
            seite: 'kzbv.de',
            setcookie: 'cookieconsent_status=dismiss;'
         }, {
            seite: 'ncsc.gov.uk',
            setcookie: 'consent cookie=true;'
         }, {
            seite: 'forum.eu',
            setcookie: 'data_privacy_terms_confirmed=true;',
            reload: true
         }, {
            seite: 'javascript-kurs.de',
            setcookie: 'cookiehinweis_ausblenden=yes;'
         }, {
            seite: 'duh.de',
            setcookie: 'cookie_dismiss=true;'
         }, {
            seite: 'tesla.com',
            setcookie: 'tsla-cookie-consent=rejected;'
         }, {
            seite: 'strato.de',
            setcookie: 'cookiecookie=2023-12-14T12%3A34%3A00Z_1000_11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C22;'
         }, {
            seite: 'pv-magazine.com',
            setcookie: 'euCookie=set;'
         }, {
            seite: 'oklo.com',
            setcookie: 'cookiemonster-gdpr=' + cookiezeit + ';'
         }, {
            seite: 'perfect-privacy.com',
            setcookie: 'cookieuse=set;',
            reload: true
         }, {
            seite: 'ibisworld.com',
            setcookie: 'cookieyes-consent=consentid:QUx1QUR2UlViUkEyeFBZaTNaZ2QxS0NKTmlGUlk5cVY,consent:yes,action:yes,necessary:yes,functional:no,analytics:no,performance:no,advertisement:no,other:no;'
         }, {
            seite: 'bike-components.de',
            setcookie: 'privacy-202408230938=0;',
            reload: true
         }, {
            seite: 'pcloud.link',
            setcookie: 'cookieconsent=0;'
         }, {
            seite: 'ableton.com',
            setcookie: 'cookie_banner=true;'
         }, {
            seite: 'mobile.de',
            setcookie: 'mdeConsentData=CQFwyQAQFwyQAEyAHADEBJFgAAAAAAAAAAYgAAAAAAAA;'
         }, {
            seite: 'insetto.eu',
            setcookie: 'InsettoCookieOpt=none;'
         }, {
            seite: 'felgenshop.de',
            setcookie: 'df-cookie-essenziell=true;',
            reload: true
         }, {
            seite: 'shopify.com',
            setcookie: 'privacy_signal=eyJjb25zZW50ZWRBbGwiOiItMSIsImNvdW50cnlDb2RlIjoiREUiLCJjb21wbGlhbmNlWm9uZSI6ImdkcHIiLCJyb290RG9tYWluIjoic2hvcGlmeS5jb20iLCJkYXRlIjoiMTcyNzcwMzE4Njc5MCIsInVybCI6Imh0dHBzOi8vd3d3LnNob3BpZnkuY29tL2RlL2Jsb2cvdmVya2F1ZnNwbGF0dGZvcm1lbiMiLCJhcGlWZXJzaW9uIjoiMS4wLjEifQ%3D%3D;'
         }, {
            seite: 'klangheimat.de',
            setcookie: 'accept_cookies2=true;',
            reload: true
         }, {
            seite: 'tennet.eu',
            setcookie: 'tennet-cookie-consent=false;'
         }, {
            seite: 'fahrrad-xxl.de',
            setcookie: 'fxxl_erforderliche_cookies=true;'
         }, {
            seite: 'bde.de',
            setcookie: 'bde_cookies_limited=true;'
         }, {
            seite: 'wertstoffblog.de',
            setcookie: 'cookie_notice_accepted=true;'
         }, {
            seite: 'autoscout24.de',
            setcookie: 'euconsent-v2=CQFwyQAQFwyQAGNAFCDEA7EgAAAAAAAAAAAAAAAUIghwAKAAuACgAKgAcAA8ACAAEgAMgAaAA8ACIAEcAJkAUgBTACqAF0AMQAbwA_ACEAENAIgAiQBHACaAFGAMMAZYA0QByADnAHdAPwA_YCDgIQAREAi0BHAEdAJKAYoAz4B1ADtgH2AP-Ai8BHoCRAEyAKHAUeApEBT4CpQFqALYAXIAvMBf4DIYGRgZIAyoBlgDLgGrgOLAdyBCECdYFCAAAAAA.YAAAAAAAA4CA;'
         }, {
            seite: 'koramaup.com',
            setcookie: 'cookieconsent=1;'
         }, {
            seite: 'sites.google.com,openfietsmap.nl',
            setcookie: 'SITES_NON_ESSENTIAL_COOKIES_CONSENT=0; , SITES_CONSENT=1;',
            reload: true
         }, {
            seite: 'elektroautor.com',
            setcookie: 'eucookielaw=' + cookiezeit + ';'
         }, {
            seite: 'redusystems.com',
            setcookie: 'gtmCookieAccepted=0; , gtmCookiePopup=1;'
         }, {
            seite: 'reolink.com',
            setcookie: 'gdprNewLocalName=%7B%22features%22%3Atrue%2C%22ads%22%3Afalse%2C%22googleAdsTracking%22%3Afalse%7D;'
         }, {
            seite: 'bmw.de',
            setcookie: 'cc_consentCookie=%7B%22bmw_germany_family%22%3A%7B%22cmm%22%3A%7B%22advertising%22%3A0%7D%2C%22cdc%22%3A1%2C%22tp%22%3A1661330829156%2C%22lmt%22%3A1727960164399%7D%7D;'
         }, {
            seite: 'mini.de',
            setcookie: 'cc_consentCookie=%7B%22mini_germany_family%22%3A%7B%22cmm%22%3A%7B%22advertising%22%3A0%7D%2C%22cdc%22%3A1%2C%22tp%22%3A1661330829156%2C%22lmt%22%3A1727960594266%7D%7D;'
         }, {
            seite: 'bmwgroup-werke.com',
            setcookie: 'cc_consentCookie=%7B%22bmwgroup-werke_com%22%3A%7B%22cmm%22%3A%7B%22advertising%22%3A0%7D%2C%22tp%22%3A1661330829156%2C%22lmt%22%3A1741554416904%7D%7D;'
         }, {
            seite: 'audi.de',
            setcookie: 'AUDI_ENSIGHTEN_PRIVACY_Do_Not_Track=1; , AUDI_ENSIGHTEN_PRIVACY_External_Content=0; , AUDI_ENSIGHTEN_PRIVACY_Functional=1; , AUDI_ENSIGHTEN_PRIVACY_Marketing=0; , AUDI_ENSIGHTEN_PRIVACY_MODAL_LOADED=1; , AUDI_ENSIGHTEN_PRIVACY_MODAL_VIEWED=1; , AUDI_ENSIGHTEN_PRIVACY_Performance=0; , AUDI_ENSIGHTEN_PRIVACY_Social=0;'
         }, {
            seite: 'ford.de',
            setcookie: 'cookie-configuration=%7B%22timestamp%22%3A' + cookiezeit + '%2C%22value%22%3A%7B%22strictly%20necessary%22%3Atrue%2C%22performance%22%3Afalse%2C%22functionality%22%3Atrue%2C%22targeting%22%3Afalse%7D%7D; , guxfoe-cookiedisclaimer=' + cookiezeit + ';'
         }, {
            seite: 'klimareporter.de',
            setcookie: 'cookiesDirective=1; , cpnb_cookiesSettings=%7B%22required-cookies%22%3A1%2C%22analytical-cookies%22%3A0%2C%22youtube%22%3A0%2C%22disqus%22%3A1%7D;'
         }, {
            seite: 'wcshop24.de',
            setstoragename: 'cookie-policy',
            setstoragecontent: 'decline'
         }, {
            seite: 'dw-shop.de',
            setcookie: 'CCUserSettings=2%3D1%26default%3D1%2612%3D0%26statistiknutzeranalyse%3D0%2615%3D0%26marketing%3D0%2618%3D0%26funktional%3D0;'
         }, {
            seite: 'toplehrstellen.ch',
            setstoragename: 'toplehrstellen.disclaimerClosed',
            setstoragecontent: 'true'
         }, {
            seite: 'tasso.net',
            setcookie: 'CMSCookieLevel=0;',
            reload: true
         }, {
            seite: 'institut-fuer-menschenrechte.de',
            setcookie: 'cookie_consent=%7B%22consent%22:true,%22options%22:%5B%5D%7D;'
         }, {
            seite: 'basengreen.com',
            setcookie: 'blocksy_cookies_consent_accepted=no;'
         }, {
            seite: 'grosshandelsolar.de',
            setcookie: 'accept_cookies=1;',
            reload: true
         }, {
            seite: 'umweltberatung.at',
            setcookie: 'cookie_accepted=no;',
            reload: true
         }, {
            seite: 'kfzteile24.de',
            setcookie: 'cookies_consent=%7B%22functional%22%3Afalse%2C%22marketing%22%3Afalse%7D;'
         }, {
            seite: 'toptal.com',
            setcookie: 'user_agreed_gdpr=true;'
         }, {
            seite: 'lebensmittelverband.de',
            setcookie: 'LMV_consent-general=1;'
         }, {
            seite: 'vagabundo-tinyhouse.com',
            setcookie: 'consent-policy=%7B%22ess%22%3A1%2C%22func%22%3A0%2C%22anl%22%3A0%2C%22adv%22%3A0%2C%22dt3%22%3A1%2C%22ts%22%3A28815767%7D;'
         }, {
            seite: 'blackhatworld.com',
            setcookie: 'xf_notice_dismiss=-1;'
         }, {
            seite: 'altholzverband.de',
            setcookie: 'eucookielaw=' + cookiezeit + ';'
         }, {
            seite: 'expobiomasa.com',
            setcookie: 'cookie-agreed=0;'
         }, {
            seite: 'maestroholzbau.de',
            setcookie: 'allowed_cookies=[0,1];'
         }, {
            seite: 'hansagarten24.de',
            setcookie: 'CookieConsent={"advertisement":false,"analytics":false,"functional":true,"performance":false,"uncategorized":false};'
         }, {
            seite: 'leonwood.de',
            setcookie: 'cookieControl=true; , cookieControlPrefs=%5B%5D;'
         }, {
            seite: 'minergie.ch',
            setcookie: 'consent_manager={%22consents%22:[%22google-recaptcha%22%2C%22phpsessid%22%2C%22consent_manager%22]%2C%22version%22:4%2C%22consentid%22:%22671554653c1a16.69899672%22%2C%22cachelogid%22:%2291%22};'
         }, {
            seite: 'stadtreinigung.hamburg',
            setcookie: 'agreedToCookieNotice=YES;'
         }, {
            seite: 'fuhrberger.de',
            setcookie: 'cookie-consent-settings=necessary=true&statistics=false&youtube=false&maps=false;'
         }, {
            seite: 'ourworldindata.org',
            setcookie: 'cookie_preferences=a:0-20241020;'
         }, {
            seite: 'bolighub.dk',
            setcookie: 'cookieConsentAtBolighub={%22choices%22:{%22necessary%22:true%2C%22functional%22:true%2C%22analytics%22:false%2C%22marketing%22:false}};',
            reload: true
         }, {
            seite: 'eurodns.com',
            setcookie: 'cookiesAccepted=ok;'
         }, {
            seite: 'elginusa.com',
            setcookie: 'fixed-message=dismiss;'
         }, {
            seite: 'shoplift.ai',
            setcookie: 'fs-cc=%257B%2522id%2522%253A%2522lk0hpdaT-J35yxYUM3jwO%2522%252C%2522consents%2522%253A%257B%2522analytics%2522%253Afalse%252C%2522essential%2522%253Atrue%252C%2522marketing%2522%253Afalse%252C%2522personalization%2522%253Afalse%252C%2522uncategorized%2522%253Atrue%257D%257D;'
         }, {
            seite: 'henrich-schroeder.de',
            setcookie: 'omCookieConsent=group-1.1,group-2.0,group-3.0,group-4.0,dismiss;'
         }, {
            seite: 'daikin.de',
            setcookie: 'acceptCookiePolicy-functional=false; , acceptCookiePolicy-marketing=false; , acceptCookiePolicy-performance=false; , acceptCookies=true; , acceptCookiePolicyDate=' + cookiezeit + ';'
         }, {
            seite: 'pentagonsports.de',
            setcookie: 'plenty-shop-cookie={"necessary":{"amazonPay":true,"consent":true,"session":true,"csrf":true},"tracking":{"FacebookPixelWI":false,"gtmGoogleAnalytics":false},"marketing":{"adcell":false},"payment":{"paypal-cookies":true},"media":{"googleMaps":false,"reCaptcha":false},"convenience":{"languageDetection":false},"_id":"a43ad0263167aaca0b8545e83c537a24a4ba728b"};'
         }, {
            seite: 'waragod.de',
            setcookie: 'CookieScriptConsent={"action":"reject","categories":"[]","key":"2c89ad61-6ff2-407a-94d2-6f4765e4c749"};'
         }, {
            seite: 'iwkoeln.de',
            setcookie: 'gdpr=1;'
         }, {
            seite: 'horizonhobby.com',
            setcookie: 'cookie_hint=true;'
         }, {
            seite: 'inmobi.com',
            setcookie: 'cookie-pref=rejected;'
         }, {
            seite: 'froeling.com',
            setcookie: 'licc_required=true;'
         }, {
            seite: 'mifcom.de',
            setcookie: 'analytics_cookie=0; , cookie_accepted=1; , cookie_closed=1; , marketing_cookie=0; , user_allowed_save_cookie=%7B%221%22%3A1%7D;',
            reload: true
         }, {
            seite: 'weltladen.de',
            setcookie: 'cookietypes=required;'
         }, {
            seite: 'trybawaryjny.pl',
            setcookie: 'cookie_notice_accepted=false;'
         }, {
            seite: 'tomtom.com',
            setcookie: 'tt_settings={%22url%22:%22https://www.tomtom.com/%22%2C%22advertising%22:false%2C%22social%22:false%2C%22analytical%22:false};'
         }, {
            seite: 'random.org',
            setcookie: 'RDOPRIVACY=%5Btrue%2Ctrue%2Cfalse%5D;',
            nowww: true,
            reload: true
         }, {
            seite: 'vfa.de',
            setcookie: 'vfa-consent=%7B%22ga%22%3A0%2C%22soundcloud%22%3A0%2C%22youtube%22%3A0%2C%22livestream%22%3A0%2C%2223degree%22%3A0%2C%22googlemaps%22%3A0%2C%22twitter%22%3A0%2C%22tiktok%22%3A0%2C%22spotify%22%3A0%2C%22podcaster%22%3A0%2C%22cookielogin%22%3A1%2C%22session%22%3A1%2C%22klaro%22%3A1%7D;'
         }, {
            seite: 'iurado.de',
            setcookie: 'cookieControlPrefs=["essential","preferences"];'
         }, {
            seite: 'canon.de',
            setcookie: 'CONSENTMGR=consent:false%7Cts:1732572153611; , user_accepted=1; , _evidon_suppress_notification_cookie={"date":"' + cookiedatum + '"};',
            nowww: true
         }, {
            seite: 'extracomputer.de',
            setcookie: 'extra-cookie={"all":false,"necessary":true,"preferences":false,"statistics":false,"marketing":false};'
         }, {
            seite: 'quooker.de',
            setcookie: 'cookie-consent-io=necessary;'
         }, {
            seite: 'computeruniverse.net',
            setcookie: 'consentOpts={%22b%22:false%2C%22c%22:false%2C%22n%22:true};'
         }, {
            seite: 'spektrum.de',
            setcookie: 'eupubconsent-v2=CQIsg5gQIsg5gAcABBDEBRFsAP_gAAAAAAYgKoNX_G__bWlr8X73aftkeY1P9_h77sQxBhfJE-4FzLvW_JwXx2ExNA36tqIKmRIAu3TBIQNlGJDURVCgaogVryDMaEyUoTNKJ6BkiFMRM2dYCFxvm4tj-QCY5vqts1dxmB-AKALAAEAggAAACAAAgCAAAACAAAAACEAAAAAAAAAAAIBAAgJgMAIAAAEAARgAAQAAAAAAAAAAAAAAoAfff_9Pn_-uB_-_3_vf_AAAAMEgBgLzAhCBNUIABAgYOgBALzAmqSgBgImAXmBNUpAFARMAvMCEIEOQJqlAAIEDAAAA.f_wAAAAAAAAA; , OptanonConsent=isGpcEnabled=0&datestamp=Tue+Nov+26+2024+20%3A41%3A10+GMT%2B0100+(Mitteleurop%C3%A4ische+Normalzeit)&version=202411.1.0&browserGpcFlag=0&isIABGlobal=false&consentId=383f13ff-391d-4fed-a353-39127f52e612&interactionCount=3&isAnonUser=1&landingPath=NotLandingPage&groups=C0002%3A1%2CC0005%3A1%2CC0004%3A1%2CC0001%3A1%2CC0003%3A1%2Cgad%3A1%2CC0009%3A1%2CC0008%3A1%2CV2STACK42%3A1%2CC0010%3A1&hosts=H1016%3A1%2CH1894%3A1%2CH436%3A1%2CH1461%3A1%2CH449%3A1%2CH128%3A1%2CH903%3A1%2CH1588%3A1%2CH908%3A1%2CH1908%3A1%2CH876%3A1%2CH140%3A1%2CH943%3A1%2CH197%3A1%2CH1954%3A1%2CH878%3A1%2CH1831%3A1%2CH504%3A1%2CH1814%3A1%2CH879%3A1%2CH1786%3A1%2CH253%3A1%2CH12%3A1%2CH390%3A1%2CH881%3A1%2CH14%3A1%2CH326%3A1%2CH1445%3A1%2CH882%3A1%2CH391%3A1%2CH327%3A1%2CH1870%3A1%2CH23%3A1%2CH201%3A1%2CH32%3A1%2CH950%3A1%2CH429%3A1%2CH1373%3A1%2CH37%3A1%2CH202%3A1%2CH631%3A1%2CH430%3A1%2CH42%3A1%2CH423%3A1%2CH1788%3A1%2CH52%3A1%2CH1832%3A1%2CH1744%3A1%2CH1871%3A1%2CH886%3A1%2CH53%3A1%2CH1547%3A1%2CH55%3A1%2CH911%3A1%2CH205%3A1%2CH1955%3A1%2CH1459%3A1%2CH61%3A1%2CH887%3A1%2CH434%3A1%2CH888%3A1%2CH1589%3A1%2CH207%3A1%2CH333%3A1%2CH1584%3A1%2CH1833%3A1%2CH209%3A1%2CH1940%3A1%2CH957%3A1%2CH889%3A1%2CH839%3A1%2CH613%3A1%2CH562%3A1%2CH82%3A1%2CH335%3A1%2CH1895%3A1%2CH214%3A1%2CH86%3A1%2CH88%3A1%2CH1018%3A1%2CH216%3A1%2CH1830%3A1%2CH1483%3A1%2CH257%3A1%2CH891%3A1%2CH217%3A1%2CH92%3A1%2CH565%3A1%2CH218%3A1%2CH1405%3A1%2CH220%3A1%2CH962%3A1%2CH339%3A1%2CH441%3A1%2CH1697%3A1%2CH1896%3A1%2CH1872%3A1%2CH893%3A1%2CH1873%3A1%2CH340%3A1%2CH760%3A1%2CH677%3A1%2CH765%3A1%2CH571%3A1%2CH344%3A1%2CH113%3A1%2CH117%3A1%2CH843%3A1%2CH445%3A1%2CH448%3A1%2CH1062%3A1%2CH121%3A1%2CH1834%3A1%2CH125%3A1%2CH346%3A1%2CH620%3A1%2CH450%3A1%2CH1064%3A1%2CH230%3A1%2CH247%3A1%2CH231%3A1%2CH1586%3A1%2CH1953%3A1%2CH901%3A1%2CH1767%3A1%2CH1053%3A1%2CH780%3A1%2CH234%3A1%2CH1874%3A1%2CH148%3A1%2CH1775%3A1%2CH926%3A1%2CH1793%3A1%2CH1462%3A1%2CH1587%3A1%2CH1022%3A1%2CH350%3A1%2CH1875%3A1%2CH984%3A1%2CH787%3A1%2CH1757%3A1%2CH250%3A1%2CH586%3A1%2CH170%3A1%2CH171%3A1%2CH1084%3A1%2CH1006%3A1%2CH909%3A1%2CH461%3A1%2CH178%3A1%2CH883%3A1%2CH940%3A1%2CH906%3A1%2CH837%3A1%2CH104%3A1%2CH153%3A1%2CH1536%3A1%2CH25%3A1%2CH200%3A1%2CH244%3A1%2CH701%3A1%2CH221%3A1%2CH897%3A1%2CH228%3A1%2CH139%3A1%2CH147%3A1%2CH249%3A1%2CH853%3A1&genVendors=V2%3A1%2CV4%3A1%2CV10%3A1%2CV6%3A0%2CV11%3A1%2CV14%3A1%2CV15%3A1%2CV5%3A1%2C&intType=3&geolocation=DE%3BHH&AwaitingReconsent=false;'
         }, {
            seite: 'sebson.de',
            setcookie: 'plenty-shop-cookie={"necessary":{"consent":true,"session":true,"csrf":true},"tracking":{"googleAnalytics":false},"media":{"reCaptcha":true},"paypal":{"paypal-cookies":true},"convenience":{"languageDetection":true},"_id":"fa1a1cedc934f34806768139fd96a3325f8bca23"};'
         }, {
            seite: 'viagogo.de',
            setcookie: 'CookieConsent=eyJoYXNTZWxlY3RlZFByZWZlcmVuY2VzIjp0cnVlLCJwcmVmZXJlbmNlcyI6eyJhZHZlcnRpc2luZyI6ZmFsc2UsImFuYWx5dGljcyI6ZmFsc2UsInByZWZlcmVuY2VzIjpmYWxzZX19;'
         }, {
            seite: 'statistik-nord.de',
            setstoragename: 'cookie_banner',
            setstoragecontent: 'hidden'
         }, {
            seite: 'agila.de',
            setcookie: 'cookieconsent_dismissed=essential;'
         }, {
            seite: 'bequiet.com',
            setcookie: '_CookiePolicyHint=true;'
         }, {
            seite: 'hardwaredealz.com',
            setcookie: 'hwdconsent=1;'
         }, {
            seite: 'mindfactory.de',
            setcookie: 'cookies_accepted=false;',
            reload: true
         }, {
            seite: 'piazzablu.com',
            setcookie: 'cmplz_banner-status=dismissed; cmplz_functional=allow; , cmplz_marketing=deny; , cmplz_preferences=allow; , cmplz_statistics=deny;'
         }, {
            seite: 'habsburger.net',
            setcookie: 'gdpr={%22consent_created%22:%22Thu%2C%2028%20Nov%202024%2014:53:07%20GMT%22%2C%22settings%22:{%22cookie_necessary_setting%22:true%2C%22cookie_analysis_setting%22:false}};'
         }, {
            seite: 'startnext.com',
            setcookie: 'ty_cookie_consent={"data":{"preferences":false,"statistics":false,"necessary":true},"version":1};'
         }, {
            seite: 'inline-info.com',
            setcookie: 'requiredCookies=1; , firstCall=1;'
         }, {
            seite: 'elektroland24.de',
            setcookie: 'cookie-preference=1; , inactive-cookie-consent=marketing%2Cstatistik;'
         }, {
            seite: 'ademax-strom.de',
            setcookie: 'cookie-preference=1;'
         }, {
            seite: 'mademyday.com',
            setcookie: 'cookieconsent_dismissed=yes;'
         }, {
            seite: 'tomorrow.one',
            setcookie: 'ESSENTIAL_USER_CONSENT=true;'
         }, {
            seite: 'coop.de',
            setcookie: 'cookiehint={"matomo":0};'
         }, {
            seite: 'remitly.com',
            setstoragename: 'cookie_consent_date',
            setstoragecontent: cookiezeit,
            setcookie: 'cookie_consent=000;'
         }, {
            seite: 'opploans.com',
            setcookie: 'opccpap=shwn;'
         }, {
            seite: 'heliotherm.com',
            setcookie: 'mw-cookie-settings={"acceptedAll":false,"consentedDate":"' + cookiedatum + '","list":[{"id":1,"title":"Notwendige Cookies","groupid":0,"accepted":true},{"id":2,"title":"YouTube","groupid":3,"accepted":false},{"id":4,"title":"Google Analytics v4","groupid":5,"accepted":false},{"id":3,"title":"Google Analytics","groupid":5,"accepted":false}],"publishDate":"2024-07-09T07:26:55"};'
         }, {
            seite: 'targobank-kontowechselservice.de',
            setcookie: 'accept_cookies=true;',
            reload: true
         }, {
            seite: 'targobank.de',
            setcookie: 'eu-consent=%7B%22%2F%22%3A%7B%22solutions%22%3A%7B%22piano%22%3Afalse%2C%22tealium%22%3Afalse%2C%22vtm%22%3Afalse%2C%22ABTasty%22%3Afalse%2C%22googleMarketingPlatform%22%3Afalse%2C%22microsoftAdvertising%22%3Afalse%2C%22meta%22%3Afalse%2C%22linkedIn%22%3Afalse%2C%22googleMaps%22%3Afalse%2C%22userlikeChat%22%3Afalse%2C%22youTube%22%3Afalse%2C%22googleReCaptcha%22%3Afalse%7D%2C%22expireDate%22%3A%222025-12-05T19%3A25%3A42.510Z%22%2C%22version%22%3A%221.2.0%22%7D%7D;'
         }, {
            seite: 'netcraft.com',
            setcookie: 'cookie_law_seen=true;'
         }, {
            seite: 'fortiguard.com',
            setcookie: 'privacy_agreement=true;'
         }, {
            seite: 'servershop24.de',
            setcookie: 'plenty-shop-cookie={"necessary":{"consent":true,"consentActiveStatus":true,"externalId":true,"session":true,"csrf":true},"tracking":{"googleanalytics":true},"marketing":{"googleads":true},"media":{"amazonPay":true,"reCaptcha":true},"paypal":{"paypal-cookies":true},"convenience":{"tagmanager":true,"languageDetection":true},"_id":"89826e1895054f55d71123994b11d0f40175d781"};'
         }, {
            seite: 'serverschmiede.com',
            setcookie: 'cconsent={"version":1,"categories":{"necessary":{"wanted":true},"analytics":{"wanted":false},"functional":{"wanted":false}},"services":["mercari","x_ua_device","cconsent","trustedshops","tagmanager","googleAnalytics","googleAds","facebook","reddit","matomo","livezilla"],"consentMode":{"ad_storage":"denied","ad_user_data":"denied","ad_personalization":"denied","analytics_storage":"denied"}};'
         }, {
            seite: 'revanced.app',
            setstoragename: 'analytics',
            setstoragecontent: 'false'
         }, {
            seite: 'pcbilliger.de',
            setcookie: 'cookieConsent=True;'
         }, {
            seite: 'compuram.de',
            setcookie: 'CompuRAM_CC=off;',
            reload: true
         }, {
            seite: 'bundeswehr.de',
            setstoragename: 'privacyProtection',
            setstoragecontent: '{"settings":{"tracking":{"enabled":false,"readonly":false},"maps":{"enabled":false,"readonly":false},"facebook":{"enabled":false,"readonly":false},"youtube":{"enabled":false,"readonly":false},"twitter":{"enabled":false,"readonly":false},"instagram":{"enabled":false,"readonly":false},"flickr":{"enabled":false,"readonly":false},"kaltura":{"enabled":false,"readonly":false},"mastodon":{"enabled":false,"readonly":false},"bluesky":{"enabled":false,"readonly":false}}}'
         }, {
            seite: 'site24x7.com',
            setstoragename: 'zglobal_Acookie_optOut',
            setstoragecontent: '2'
         }, {
            seite: 'kickstarter.com',
            setstoragename: 'tcmConsent',
            setstoragecontent: '{"purposes":{"SaleOfInfo":false,"Analytics":false,"Functional":true,"Advertising":false},"timestamp":"2024-12-06T19:14:24.403Z","confirmed":true,"prompted":true,"updated":true}'
         }, {
            seite: 'opera.com',
            setcookie: 'cookie_consent_granted=true;'
         }, {
            seite: 'michalzalecki.com',
            setcookie: 'cookie_law=true;'
         }, {
            seite: 'allround-pc.com',
            setcookie: 'apcAcceptedTrackingCookie3=10000001;'
         }, {
            seite: 'gov.pl',
            setcookie: 'seen_cookie_message=yes;'
         }, {
            seite: 'honor.com',
            setcookie: '_accept_cookie_flag_new=yes; , _accept_cookie_choose=0|0|0; , _accept_cookie_choose_new=0%7C0%7C0;'
         }, {
            seite: 'hausundgrund.de',
            setcookie: 'hug_cookie_policy_accepted=0;'
         }, {
            seite: 'aral.de',
            setcookie: 'r_func=true;'
         }, {
            seite: 'wasessenwir.jetzt',
            setcookie: 'wasessenwirjetzt-consent={%22choices%22:{%22necessary%22:true%2C%22tracking%22:false%2C%22analytics%22:false%2C%22marketing%22:false}};'
         }, {
            seite: 'mantruckandbus.com',
            setcookie: 'cookie_control=accepted;'
         }, {
            seite: 'magnet-shop.net',
            setcookie: 'hbcom-cookiepanel-dismiss=1;'
         }, {
            seite: 'builtbybit.com',
            setcookie: 'bbb_notice_dismiss=-1;'
         }, {
            seite: 'polymart.org',
            setcookie: 'wpcc=dismiss;'
         }, {
            seite: 'allekabel.de',
            setstoragename: 'showlegal,uid',
            setstoragecontent: '0 ; -1'
         }, {
            seite: 'bmw-public-charging.com',
            setcookie: 'CN_ALLOW_FUNCTIONAL_COOKIES=false;'
         }, {
            seite: 'bahn.de',
            setcookie: 'CONSENTMGR=c1:1%7Cc2:0%7Cc3:0%7Cc4:0%7Cc5:0%7Cc6:0%7Cc7:0%7Cc8:0%7Cc9:0%7Cc10:0%7Cc11:0%7Cc12:0%7Cc13:0%7Cc14:0%7Cc15:0%7Cts:1736696118593%7Cconsent:true%7Cid:01945b279026002bf9055210d94405050003600d00fb8;'
         }, {
            seite: 'secondsol.com',
            setcookie: 'cookies_consent=1;'
         }, {
            seite: 'betterplace.org',
            setcookie: 'betterplace-tracking-accepted=rejected;'
         }, {
            seite: 'hbswelding.systems',
            setcookie: 'consent=false;',
            reload: true
         }, {
            seite: 'iiyama.com',
            setcookie: 'cookie-bar=ok;'
         }, {
            seite: 'creative.com',
            setcookie: 'cookieSettings=%7B%22dismissed%22%3Atrue%2C%22necessary%22%3Atrue%2C%22analytics%22%3Afalse%2C%22thirdParty%22%3Afalse%7D;'
         }, {
            seite: 'drueckglueck.de',
            setcookie: 'son_consent={"version":1,"categories":{"necessary":true,"functionality":true,"tracking":false,"targeting":false,"country":"DE"}};'
         }, {
            seite: 'gutscheine.n-tv.de',
            setcookie: 'consent-1.0=%7B%22functional%22%3Atrue%2C%22analytics%22%3Afalse%2C%22marketing%22%3Afalse%2C%22isSet%22%3Atrue%7D;'
         }, {
            seite: 'soeren-hentzschel.at',
            setstoragename: 'storage_notice.shown',
            setstoragecontent: 'true'
         }, {
            seite: 'eso.lt',
            setcookie: 'privacy_verify=1; , privacy_2=1; , privacy_3=0; , privacy_4=0;',
            reload: true
         }, {
            seite: 'character.ai',
            setcookie: 'cookie_consent_v1=reject_all;'
         }, {
            seite: 'blacknut.com',
            setstoragename: 'bn:a:privacyConsent',
            setstoragecontent: '{"statistics":false,"marketing":false,"lang":"de","expiry":' + (cookiezeit + 86400) + '}'
         }, {
            seite: 'seznam.cz',
            setcookie: 'euconsent-v2=CQNBgcAQNBgcAD3ACQCSBdFsAP_gAEPgAATIJNQIwAFAAQAAqABkAEAAKAAZAA0ACSAEwAJwAWwAvwBhAGIAQEAggCEAEUAI4ATgAoQBxADuAIQAUgA04COgE2gKkAW4AvMBjID_AIDgRmAk0BecBIACoAIAAZAA0ACYAGIAPwAhABHACcAGaAO4AhABFgE2gKkAW4AvMAAA.YAAAAAAAAWAA;',
            nowww: true
         }, {
            seite: 'hardwareluxx.de',
            setcookie: 'hwl_cc=1;',
            reload: true
         }, {
            seite: 'parqet.com',
            setcookie: 'ParqetGDPR=denied;'
         }, {
            seite: 'spaness.de',
            setcookie: 'kookiesSet=6;'
         }, {
            seite: 'old.reddit.com',
            setcookie: 'eu_cookie={%22opted%22:true%2C%22nonessential%22:false};'
         }, {
            seite: 'spigen.pl',
            setcookie: 'ck_cook=yes;'
         }, {
            seite: 'aws.amazon.com',
            setcookie: 'awsccc=eyJlIjoxLCJwIjowLCJmIjowLCJhIjowLCJjY2JhIjoxLCJpIjoiYWQ5ZWNkOTMtMTBkOC00ZjFkLWEwNTMtYTY5MmFiODJhNTFiIiwidiI6IjEifQ==;'
         }, {
            seite: 'etherscan.io',
            setcookie: 'etherscan_cookieconsent=True;'
         }, {
            seite: 'sparwelt.de',
            setcookie: 'consent-1.0=%7B%22functional%22%3Atrue%2C%22analytics%22%3Afalse%2C%22marketing%22%3Afalse%2C%22isSet%22%3Atrue%7D;',
            checkcookie: '%22%3Atrue%7D'
         }, {
            seite: 'fruugo.de',
            setcookie: 'consents=essential;'
         }, {
            seite: 'rheinenergie.com',
            setcookie: 'cookiesAccepted=0;'
         }, {
            seite: 'emove.online',
            setcookie: 'cookie-cracker_1=true; , cookie-cracker_1_prefs=technischnotwendig,cookie-cracker;'
         }, {
            seite: 'innn.it',
            setcookie: 'cookieConsent=[%22essential%22];'
         }, {
            seite: 'lieferando.de',
            setcookie: 'je-cookieConsent=necessary; , customerCookieConsent=%5B%7B%22consentTypeId%22%3A103%2C%22consentTypeName%22%3A%22necessary%22%2C%22isAccepted%22%3Atrue%2C%22decisionAt%22%3A%222025-03-04T23%3A00%3A27.0000000%2B00%3A00%22%7D%2C%7B%22consentTypeId%22%3A104%2C%22consentTypeName%22%3A%22functional%22%2C%22isAccepted%22%3Afalse%2C%22decisionAt%22%3A%222025-03-04T23%3A00%3A27.0000000%2B00%3A00%22%7D%2C%7B%22consentTypeId%22%3A105%2C%22consentTypeName%22%3A%22analytical%22%2C%22isAccepted%22%3Afalse%2C%22decisionAt%22%3A%222025-03-04T23%3A00%3A27.0000000%2B00%3A00%22%7D%2C%7B%22consentTypeId%22%3A106%2C%22consentTypeName%22%3A%22personalized%22%2C%22isAccepted%22%3Afalse%2C%22decisionAt%22%3A%222025-03-04T23%3A00%3A27.0000000%2B00%3A00%22%7D%5D; , cookieConsent=functional;',
            nowww: true
         }, {
            seite: 'stellantis-direktbank.de,jtdirektbank.de,bbbank.de,berliner-volksbank.de,sparda-sw.de,sparda-bank-hamburg.de,sparda-h.de,frankfurter-volksbank.de,volksbank-stuttgart.de,volksbanking.de,hannoversche-volksbank.de,vb-mittelhessen.de,vrbank-mkb.de,vbkraichgau.de,sparda-ostbayern.de,vrbank-hessenland.de,maerkische-bank.de,bergische-volksbank.de,sparda-a.de,volksbank-koeln-bonn.de,voba-rnh.de,vr-bankverein.de,vrbank-suedpfalz.de,vb-eg.de,volksbank-allgaeu-oberschwaben.de,vb-alzey-worms.de,vrbank-ke-oa.de,volksbank-albstadt.de,westerwaldbank.de,wvb.de,dovoba.de,voba-bl.de,vrbankgl.de,gestalterbank.de,volksbank-hellweg.de,psd-berlin-brandenburg.de,volksbankinostwestfalen.de,volksbank-chemnitz.de,volksbank-goeppingen.de,eb.de,vobakl.de,volksbank-dresden-bautzen.de,vr-lif-ebn.de,vrnu.de,leipziger-volksbank.de,vblh.de,vr-werdenfels.de,vrbank.de,vb-muensterland.de,kieler-volksbank.de,volksbank-ueberlingen.de,hamburger-volksbank.de,vbhalle.de,vbkrefeld.de,volksbank-vor-ort.de,aachener-bank.de,vbsdn.de,volksbank-mit-herz.de,vvr-bank.de,volksbank-trier-eifel.de,meine-rvb.de,spreewaldbank.de,pax-bank.de,vb-ruhrmitte.de,donau-iller-bank.de,ligabank.de,rbok.de,volksbank-freiburg.de,vr-bank-passau.de,volksbankeg.de,diebank.de,raiba-rastede.de,vbimharz.de',
            setcookie: 'cookieConsent=%5B%7B%22name%22%3A%22essenziell%22%2C%22value%22%3A%22on%22%7D%2C%7B%22name%22%3A%22komfort%22%2C%22value%22%3A%22on%22%7D%2C%7B%22name%22%3A%22marketing%22%2C%22value%22%3A%22off%22%7D%2C%7B%22name%22%3A%22statistik%22%2C%22value%22%3A%22off%22%7D%2C%7B%22name%22%3A%22speichern%22%2C%22value%22%3A%22on%22%7D%5D;'
         }, {
            seite: 'sparda-b.de,vr-nordoberpfalz.de,vreg.de',
            setcookie: 'cookieConsent=%5B%7B%22name%22%3A%22essenziell%22%2C%22value%22%3A%22on%22%7D%2C%7B%22name%22%3A%22komfort%22%2C%22value%22%3A%22on%22%7D%2C%7B%22name%22%3A%22statistik%22%2C%22value%22%3A%22off%22%7D%2C%7B%22name%22%3A%22speichern%22%2C%22value%22%3A%22on%22%7D%5D;'
         }, {
            seite: 'vr.de',
            setcookie: 'TC_PRIVACY_CENTER=1; , TC_PRIVACY=0%40011%7C58%7C4483%401%40%401741117974717%2C1741117974717%2C1774813974717%40;'
         }, {
            seite: 'muenchner-bank.de,volksbank-buehl.de,vb-oberberg.de',
            setcookie: 'cookieConsent=%5B%7B%22name%22%3A%22essenziell%22%2C%22value%22%3A%22on%22%7D%2C%7B%22name%22%3A%22komfort%22%2C%22value%22%3A%22on%22%7D%2C%7B%22name%22%3A%22marketing%22%2C%22value%22%3A%22off%22%7D%2C%7B%22name%22%3A%22statistik%22%2C%22value%22%3A%22off%22%7D%5D;'
         }, {
            seite: 'sberbank.com',
            setcookie: 'sber.pers_notice_en=1;'
         }, {
            seite: 'boerse-stuttgart.de',
            setcookie: 'COOKIE_CONSENT=ALLOW_REQUIRED;',
            reload: true
         }, {
            seite: 'hetzner.com',
            setcookie: '__Secure-HO_Cookie_Consent_Declined=1;'
         }, {
            seite: 'bandcamp.com',
            setcookie: 'cookie_preferences=%7B%22allow%22%3A%5B%5D%7D;'
         }, {
            seite: 'doppelherz.de',
            setcookie: 'cookieConsent=false;'
         }, {
            seite: 'xbox-store-checker.com',
            setcookie: 'EU_COOKIE_LAW_CONSENT=true;'
         }, {
            seite: 'graugear.de',
            setcookie: 'ct-ultimate-gdpr-cookie-level=Mw%3D%3D; , ct-ultimate-gdpr-cookie=eyJjb25zZW50X2RlY2xpbmVkIjpmYWxzZSwiY29uc2VudF9leHBpcmVfdGltZSI6MTc3Mzg2MjQ3OSwiY29uc2VudF9sZXZlbCI6MywiY29uc2VudF90aW1lIjoxNzQyMzI2NDc5fQ%3D%3D;'
         }, {
            seite: 'kompass.com',
            setcookie: 'axeptio_cookies=%7B%22%24%24token%22%3A%22tzuxh86xw3gvlc672faa%22%2C%22%24%24date%22%3A%222025-03-23T15%3A23%3A36.290Z%22%2C%22%24%24cookiesVersion%22%3A%7B%22name%22%3A%22de-DE%22%2C%22identifier%22%3A%2266f423a89a161582c3a9cf03%22%7D%2C%22%24%24completed%22%3Atrue%2C%22facebook_pixel%22%3Afalse%2C%22cloudflare%22%3Afalse%2C%22CloudFlare%22%3Afalse%2C%22vimeo%22%3Afalse%2C%22google_analytics%22%3Afalse%2C%22effinity%22%3Afalse%2C%22optomaton_ug%22%3Afalse%2C%22sojern%22%3Afalse%2C%22spotad%22%3Afalse%2C%22mediamath%22%3Afalse%2C%22widespace%22%3Afalse%2C%22adsense%22%3Afalse%2C%22getquanty%22%3Afalse%2C%22GetQuanty%22%3Afalse%2C%22oct8ne%22%3Afalse%2C%22snapengage%22%3Afalse%2C%22fastbase%22%3Afalse%2C%22shiny_stat%22%3Afalse%7D;',
            setstoragename: '_ax_tcstring',
            setstoragecontent: 'CQOuRYAQOuRYAEEAEBDEBiFgAAAAAAAAAAYgAAAAAAAA.YAAAAAAAAAAA'
         }, {
            seite: 'fusionbase.com',
            setcookie: 'cookie_consent=%7B%22ad_storage%22%3A%22denied%22%2C%22analytics_storage%22%3A%22denied%22%2C%22ad_user_data%22%3A%22denied%22%2C%22ad_personalization%22%3A%22denied%22%7D;'
         }, {
            seite: 'emlakjet.com',
            setstoragename: 'efl-saved-consent',
            setstoragecontent: '{"updatedAt":1742743804412,"categories":{"essential":true,"functional":false,"marketing":false,"other":false},"browserData":{"userAgent":"' + navigator.userAgent + '","pageLoad":2070,"language":"' + navigator.language + '","networkType":"","screen":{"devicePixelRatio":1.5,"height":1080,"width":1920},"uuid":"e3a89f10-056b-48e2-9a69-5cfbf1fefaaf"}}'
         }, {
            seite: 'sucuri.net',
            setcookie: 'pwinteraction=Sun%2C%2023%20Mar%202025%2015%3A34%3A49%20GMT;'
         }, {
            seite: 'dave.com',
            setcookie: 'daveConsentChoices={"analytics_storage":"denied","personalization_storage":"granted","ad_storage":"denied","ad_user_data":"denied","ad_personalization":"denied","functionality_storage":"granted","security_storage":"granted"};'
         }, {
            seite: 'schildkroeten-schutz.de',
            setcookie: 'onecom_cookie_consent=' + cookiezeit + ';',
            reload: true
         }, {
            seite: 'nwb.de',
            setcookie: 'cookieVerstanden=ok;'
         }, {
            seite: 'walkonthewildside.de',
            setcookie: 'gc_cookielaw=essential;'
         }, {
            seite: 'truthsocial.com',
            setstoragename: 'soapbox:gdpr',
            setstoragecontent: 'true'
         }, {
            seite: 'zoologo.de',
            setcookie: 'cookie-consent=%7B%22customerCookieConsentId%22%3A%221744821781714-7jfollnepk6s84f7v905si4hnv%22%2C%22necessary%22%3A%221%22%2C%22functional%22%3Anull%2C%22performance%22%3A%220%22%2C%22marketing%22%3A%220%22%2C%22createdAt%22%3A%222025-04-16T16%3A43%3A01%2B00%3A00%22%2C%22updatedAt%22%3A%222025-04-16T16%3A43%3A01%2B00%3A00%22%7D;',
            reload: true
         }, {
            seite: 'einforstungsverband.at',
            setstoragename: 'pw_dch_banner',
            setstoragecontent: '2'
         }, {
            seite: 'jeep.de',
            setcookie: 'opncl_advertising=false; , opncl_comfort=true; , opncl_essential=true; , opncl_general=true; , opncl_performance=false;'
         }, {
            seite: 'hug-ka.de',
            setcookie: 'cc_advertising=no; , cc_necessary=yes;'
         }, {
            seite: 'entsoe.eu',
            setcookie: 'emfip-welcome=true;'
         }, {
            seite: 'ilovepdf.com',
            setcookie: 'cmp_ck=3;'
         }, {
            seite: 'planet-beruf.de',
            setcookie: 'cc_important=true;'
         }, {
            seite: 'aubi-plus.de',
            setcookie: 'cm-accepted=true;'
         }, {
            seite: 'gira.de',
            setcookie: 'GIRA_ca2=%5B1%2C2%2C3%2C4%2C5%2C7%5D;'
         }, {
            seite: 'c24.de',
            setcookie: 'c24Cookies_v1=Notwendig; , c24GDPR_v1=ACCEPTED;'
         }, {
            seite: 'oekonews.at',
            setcookie: 'easycmp={%22decided%22:%222025-05-13T19:59:09.912Z%22%2C%22cookies%22:[{%22id%22:%22netautor%22%2C%22allow%22:true}%2C{%22id%22:%22youtube%22%2C%22allow%22:false}%2C{%22id%22:%22recaptcha%22%2C%22allow%22:true}]};'
         }, {
            seite: 'gopuff.com',
            setcookie: 'consent=[{%22allow%22:true%2C%22categoryId%22:%22essential%22%2C%22readOnly%22:true%2C%22requestable%22:true}%2C{%22allow%22:false%2C%22categoryId%22:%22advertising%22%2C%22requestable%22:true}%2C{%22allow%22:false%2C%22categoryId%22:%22analytics%22%2C%22requestable%22:false}%2C{%22allow%22:false%2C%22categoryId%22:%22functional%22%2C%22requestable%22:true}%2C{%22allow%22:false%2C%22categoryId%22:%22marketing%22%2C%22requestable%22:true}%2C{%22allow%22:false%2C%22categoryId%22:%22personalization%22%2C%22requestable%22:false}%2C{%22allow%22:false%2C%22categoryId%22:%22saleOfPersonalInfo%22%2C%22requestable%22:false%2C%22readOnly%22:true}]; , consentDone=%221%22;'
         }, {
            seite: 'gkv-spitzenverband.de',
            setstoragename: 'cookie-consent',
            setstoragecontent: '{"date":' + cookiezeit + ',"version":1,"statistics":false}'
         }, {
            seite: 'redact.dev',
            setcookie: 'CookieConsent={stamp:%27HpGPQAwWFMz6kZAvI3b1t/jR/ZFQYw2dMKW67U8RiCmbNPZZMY/cSg==%27%2Cnecessary:true%2Cpreferences:false%2Cstatistics:false%2Cmarketing:false%2Cmethod:%27explicit%27%2Cver:1%2Cutc:1748035485255%2Cregion:%27de%27};'
         }, {
            seite: 'kbv.de',
            setcookie: 'cookieConsent=level1;'
         }, {
            seite: 'sunspec.org',
            setcookie: 'woodmart_cookies_1=accepted;'
         }, {
            seite: 'mhw-deutschland.de',
            setcookie: 'engagebox_2=1;'
         }, {
            seite: '116117.de',
            setcookie: 'cookieConsent=level1.level3;'
         }, {
            seite: 'rauchmeldertest.net',
            setcookie: 'privacy_embeds=consent;'
         }, {
            seite: 'brf.be',
            setcookie: 'cookieConsent=disallow;'
         }, {
            seite: 'konsument.at',
            setcookie: 'vkicookieconsent=0;'
         }, {
            seite: 'cng-mobility.ch',
            setcookie: 'wk-consent=consentGiven; , wk-consent-status=;'
         }, {
            seite: 'minol.de',
            setcookie: 'cms_cookies_saved=true;',
            reload: true
         }, {
            seite: 'karlstadsenergi.se',
            setcookie: 'sv-cookie-consent=.X3BrX2lkLF9wa19zZXMsc3RnX3JldHVybmluZ192aXNpdG9yLHN0Z3RyYWZmaWNzb3VyY2Vwcmlvcml0eSxzdGdfbGFzdF9pbnRlcmFjdGlvbixzdi1pbnRlcm5hbC1zdi13ZWItYW5hbHl0aWNzLHN2LWludGVybmFsLXN2LXdlYi1hbmFseXRpY3MtbWFya2V0aW5nLGltYm94;',
            reload: true
         }, {
            seite: 'beacons.ai',
            setcookie: '_bConsentSet=yes;'
         }, {
            seite: 'slewo.com',
            setcookie: 'CookieConsent={"dateUpdated":"' + cookiedatum + '","statistics":false,"marketing":false};',
            reload: true
         }, {
            seite: 'awwwards.com',
            setcookie: '__w_cc={%22preferences%22:false%2C%22analysis%22:false%2C%22marketing%22:false};'
         }, {
            seite: 'supermarioplay.com',
            setstoragename: 'cookies',
            setstoragecontent: '1'
         }, {
            seite: 'chatgpt.com,platform.openai.com',
            setcookie: 'oai-allow-ne=false; , oai_consent_analytics=false; , oai_consent_marketing=false;'
         }, {
            seite: 'openai.com',
            setcookie: 'analytics_consent=rejected; , marketing_consent=rejected;'
         }, {
            seite: 'smallpdf.com',
            setcookie: '_s.cookie_consent=marketing=0:analytics=0:version=2021-07-01:timestamp=' + cookiezeit + ';'
         }, {
            seite: 'tp-link.com',
            setcookie: 'tp_privacy_banner=1; , tp_privacy_base=1;'
         }, {
            seite: 'herlitz.de',
            setcookie: 'necessary-opt-in=true;'
         }, {
            seite: 'brennenstuhl.com',
            setcookie: 'privacy={"core":"1"};',
            reload: true
         }, {
            seite: 'e-tec.at',
            setcookie: 'cc_analytic=false; , cc_functional=false; , cc_granted=true; , cc_marketing=false;'
         }, {
            seite: 'eneba.com',
            setcookie: 'cconsent=1100;'
         }, {
            seite: 'crew-united.com',
            setcookie: 'ccb=googleAdSenseAccepted=0&googleAnalyticsAccepted=0&commonCookies=1;',
            reload: true
         }, {
            seite: 'cloudmounter.net',
            setcookie: 'Sticky_gdpr=1;'
         }, {
            seite: 'nigrin.com',
            setcookie: 'allowAnalytics=false; , allowGeneral=true;'
         }, {
            seite: 'browser.ai',
            setcookie: 'allow_browserai_cookie={%22n%22:true%2C%22pers%22:false%2C%22perf%22:false%2C%22mark%22:false};',
            reload: true
         }, {
            seite: 'windowsonarm.org',
            setstoragename: 'cookieConsent',
            setstoragecontent: 'true'
         }, {
            seite: 'sis.de',
            setstoragename: 'SW_PRIVACY_CONSENT',
            setstoragecontent: '{"tools":{"GoogleAnalytics":false,"GoogleTagManager":false,"GoogleAdsConversionTracking":false,"Youtube":false},"changed":"' + cookiedatum + '"}'
         }, {
            seite: 'arte.tv',
            setcookie: 'user_consent=audience%3Doff%2Ctechnical%3Doff;'
         }, {
            seite: 'theonion.com',
            setstoragename: 'consent_preferences',
            setstoragecontent: '{"analytics_storage":"denied","ad_storage":"denied","ad_user_data":"denied","ad_personalization":"denied"}'
         }, {
            seite: 'praxis121.de',
            setstoragename: 'cookieNotificationHasBeenSeen',
            setstoragecontent: 'true'
         }, {
            seite: 'iosgods.com',
            setcookie: 'ips4_cookie_consent=1;'
         }, {
            seite: 'gkv-90prozent.de',
            setstoragename: 'cookie-consent',
            setstoragecontent: '{"date":' + cookiezeit + ',"version":1,"statistics":false}'
         }, {
            seite: 'go-aheadnordic.no',
            setstoragename: 'GOA:SETTINGS',
            setstoragecontent: '{"LANGUAGE":"no","GOA_NECCESSARY_COOKIE":"ON","GOA_ANALYTICAL_COOKIE":"OFF","GOA_AD_COOKIE":"OFF"}'
         }, {
            seite: 'vy.se,vy.no',
            setstoragename: 'Vy.User.Cookie.Settings',
            setstoragecontent: '{"analytics":false,"marketing":false}'
         }, {
            seite: 'norrtag.se',
            setcookie: '__mmgdpr={%22version%22:%221.0.1%22%2C%22categories%22:[{%22id%22:1%2C%22approved%22:true}%2C{%22id%22:2%2C%22approved%22:false}%2C{%22id%22:3%2C%22approved%22:true}]};'
         }, {
            seite: 'trafikverket.se',
            setcookie: 'TrvCookieConsent=functional%3Dfalse%26analytical%3Dfalse;'
         }, {
            seite: 'yealink.com',
            setstoragename: 'privacyData',
            setstoragecontent: '{"necessary":1,"preferences":0,"statistics":0,"targeted":0}'
         }, {
            seite: 'gitflic.ru',
            setcookie: 'cookiesAccepted=true;'
         }, {
            seite: 'transdev.de',
            setcookie: 'ncc_c=nccfunctionalstatisticsmarketing;',
            reload: true
         }, {
            seite: 'varnyapestirny.policie.gov.cz',
            setcookie: 'accept=true;'
         }, {
            seite: 'getränkefickel.de,xn--getrnkefickel-efb.de',
            setcookie: 'gox_cookie_consent=;'
         }];

         for (let i = 0; i < regeln.length; i++) {
            // Gucken ob die aufgerufene Seite von einer Regel gedeckt ist.
            let seiten = regeln[i].seite.toString();
            seiten = seiten.split(',');
            for (let k = 0; k < seiten.length; k++) {
               if (location.hostname.endsWith('.' + seiten[k]) || location.hostname === seiten[k]) {
                  console.log('[Cookie auto decline] Regel für folgende Seite gefunden: ' + seiten[k]);
                  if ((regeln[i].noframe === true && window.self == window.top) || regeln[i].noframe !== true) {
                     if (regeln[i].checkcookie === undefined && regeln[i].setcookie && document.cookie.includes(regeln[i].setcookie.split('=')[0]) === true) {
                        return;
                     }
                     if (regeln[i].setstoragename && window.localStorage.getItem(regeln[i].setstoragename.split(',')[0]) !== null) {
                        return;
                     }
                     if (regeln[i].checkcookie && document.cookie.includes(regeln[i].checkcookie)) {
                        return;
                     }

                     // Cookie Banner Status an das Popup Panel weiterleiten.
                     if (document.hidden !== true) {
                        browser.runtime.onMessage.addListener(function (request) {
                           if (request.popupstatus === 'geöffnet') {
                              console.log(request.popupstatus);

                              function erfolg() {
                                 console.log(cookiebannerstatus);
                              }

                              function fehler() {
                                 console.log("Erweiterungspopup geschlossen, beende Übertragung.");
                              }
                              const cookiebannerstatus = {
                                 cookiegesetzt: true
                              };
                              // Sende Daten solange das Popup geöffnet ist oder bis 10 Sekunden lang.
                              browser.runtime.sendMessage({
                                 nachricht: cookiebannerstatus
                              }).then(erfolg, fehler);
                           }
                        });
                     }

                     // Cookies oder/und LocalStorage setzen
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
                     if (regeln[i].setstoragename && regeln[i].setstoragecontent) {
                        let setlocalstoragenames = regeln[i].setstoragename.toString();
                        let setstoragecontent = regeln[i].setstoragecontent.toString();
                        setlocalstoragenames = setlocalstoragenames.split(',');
                        setstoragecontent = setstoragecontent.split(' ; ');
                        for (let j = 0; j < setlocalstoragenames.length; j++) {
                           localStorage.setItem(setlocalstoragenames[j], setstoragecontent[j]);
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
            let openshadowroot = document.createElement("script");
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
