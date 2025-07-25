'use strict';
(function () {
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

   let attributchecker = function () {};
   let cookieattributchecker = function () {};
   let sichtbarkeitsprüfung = function (a) {
      const check = window.getComputedStyle(a);
      if (check.getPropertyValue("display") !== "none" && check.getPropertyValue("visibility") === "visible" && check.getPropertyValue("content-visibility") === "visible" && check.getPropertyValue("opacity") > 0.3 && (a.offsetHeight > 1 || a.offsetWidth > 1) && a.getBoundingClientRect().bottom <= Math.max(window.innerHeight, document.body.offsetHeight, document.body.scrollHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight, screen.availHeight) + 1000) {
         return true;
      } else {
         return false;
      }
   };
   let klickecookiebutton = function () {};
   let findconsentintervalzahländern = function () {};
   // Find Cookie Banner
   if (sessionStorage.getItem('mpowlesu908hxfyw37ghg5ikx90jdzt') !== 'djx0v0odce35xrb2pt5dzbgaj1mud5c' && document.querySelector('body[class="no-js"] > .main-wrapper[role="main"] + script') === null && document.querySelector('html[style="height:100%"] iframe[src^="/_Incapsula_Resource?"]') === null && document.querySelector('link[href="/cdn-cgi/styles/challenges.css"][rel="stylesheet"]') === null && document.querySelector('body[style="margin:0"] > script[src^="https://ct.captcha-delivery.com/"]') === null && document.querySelector('head > script[src^="/TSPD/"] + noscript:last-child') === null && document.querySelector('body > div:first-child + script[src^="https://mcl.spur.us/d/mcl.js?"] + script:last-child') === null && window.location.hostname !== 'accounts.google.com' && window.location.hostname !== 'challenges.cloudflare.com' && window.location.href.startsWith('https://www.google.com/recaptcha/') !== true && window.location.href.startsWith('https://www.recaptcha.net/recaptcha/') !== true && window.location.href.startsWith('https://w.soundcloud.com/player/?url=http') !== true && window.location.href.startsWith('https://r-login.wordpress.com/remote-login.php') !== true) {

      const nc = 'domain=' + window.location.hostname + ';secure=true; max-age=86400; SameSite=None; path=/';
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
      let advancedcounter = 0;
      let advancedrun = true;
      let findconsentcounter = 0;
      let cookiebannerfinalakzeptiert = false;
      let cookiebannerfinalakzeptiertcounter = 0;
      findconsent = function () {
         // Intervall nach 10 Sekunden im sichtbaren Bereich stoppen.
         findconsentcounter++;
         if (cookiebannerfinalakzeptiert === true) {
            cookiebannerfinalakzeptiertcounter++;
         }
         if (findconsentcounter >= (10000 / findconsentintervalzahl)) {
            beenden();
         }

         let ablehnen;
         let speichern;
         let einstellungen;
         let schließen;
         let akzeptieren;
         let nureinklickeinstellungen;

         // iframe klicker
         if (window.self !== window.top) {

            // cdn.privacy-mgmt.com
            if (window.location.href.includes('/index.html?') && window.location.href.includes('hasCsp=') && window.location.href.includes('message_id=') && window.location.href.includes('consent')) {
               console.log('[Cookie auto decline] Detected: privacy-mgmt.com (iFrame)');
               advancedrun = false;
               ablehnen = document.querySelector('button.sp_choice_type_13');
               const akzeptierenbutton = document.querySelectorAll('button.sp_choice_type_11');
               if (akzeptierenbutton.length > 0) {
                  for (let i = 0; i < akzeptierenbutton.length; i++) {
                     const a = akzeptierenbutton[i];
                     if (sichtbarkeitsprüfung(a)) {
                        akzeptieren = a;
                     }
                  }
               }
               einstellungen = document.querySelector('button.sp_choice_type_12, .sp_choice_type_11 + p > strong > a[data-choice][target="_blank"][href="#"]');
               speichern = document.querySelector('button.sp_choice_type_SAVE_AND_EXIT:not([disabled])');
               if (window.screen.availWidth < 669) {
                  einstellungen = document.querySelector('button.sp_choice_type_12.mobile, .sp_choice_type_11 + p > strong > a[data-choice][target="_blank"][href="#"]');
               }
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
               const einstellungenknöpfe = document.querySelectorAll('.pm-main .pur-buttons-container > button');
               if (einstellungenknöpfe.length > 0) {
                  advancedrun = false;
                  for (let i = 0; i < einstellungenknöpfe.length; i++) {
                     const a = einstellungenknöpfe[i];
                     if (getComputedStyle(a).getPropertyValue('display') !== 'none' && getComputedStyle(a).getPropertyValue('visibility') !== 'hidden') {
                        a.click();
                     }
                  }
               }
               window.setTimeout(function () {
                  if (speichern && speichern.offsetHeight >= 1) {
                     speichern.click();
                  }
               }, 702);
            }

            // privacymanager.io (iframe klicker)
            if (window.location.hostname === 'cmp-consent-tool.privacymanager.io') {
               console.log('[Cookie auto decline] Detected: privacymanager.io (iFrame)');
               einstellungen = document.querySelector('button#manageSettings');
               speichern = document.querySelector('button#saveAndExit');
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // trustarc.com (iframe klicker)
            if (window.location.hostname === 'consent-pref.trustarc.com') {
               console.log('[Cookie auto decline] Detected: trustarc.com (iFrame)');
               const ablehnen = document.querySelector('.mainContent .pdynamicbutton .required, .mainContent .bottom .rejectAll, .mainContent .trustarc-submit-buttons-container > button.trustarc-declineall-btn, .gdpr .declineAllButtonLower');
               const schließen = document.querySelector('.mainContent .pdynamicbutton .close');
               const akzeptieren = document.querySelector('.mainContent .pdynamicbutton .call, .mainContent .pdynamicbutton .submit[role="button"]');
               if (ablehnen) {
                  window.setTimeout(function () {
                     ablehnen.click();
                  }, 502);
               } else if (schließen) {
                  beenden();
                  window.setTimeout(function () {
                     schließen.click();
                  }, 502);
               } else if (akzeptieren) {
                  window.setTimeout(function () {
                     akzeptieren.click();
                  }, 502);
               } else if (parent.length > 1) {
                  let parentablehnen = parent.document.querySelector('.mainContent .pdynamicbutton .required, .mainContent .bottom .rejectAll, .mainContent .trustarc-submit-buttons-container > button.trustarc-declineall-btn');
                  let parentschließen = parent.document.querySelector('.mainContent .pdynamicbutton .close');
                  let parentakzeptieren = parent.document.querySelector('.mainContent .pdynamicbutton .call, .mainContent .pdynamicbutton .submit[role="button"]');

                  if (parentablehnen) {
                     window.setTimeout(function () {
                        parentablehnen.click();
                     }, 502);
                  } else if (parentschließen) {
                     beenden();
                     window.setTimeout(function () {
                        parentschließen.click();
                     }, 502);
                  } else if (parentakzeptieren) {
                     window.setTimeout(function () {
                        parentakzeptieren.click();
                     }, 502);
                  }
               }
            }


            // baycloud.ie
            if (window.location.hostname === 'cdn.baycloud.com') {
               console.log('[Cookie auto decline] Detected: baycloud.ie (iFrame)');
               ablehnen = document.querySelector('#panelContainer button#panelDecline');
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
            if (window.location.href === 'https://cdn.trustcommander.net/privacy-center/template/index.htm') {
               console.log('[Cookie auto decline] Detected: trustcommander.net (iFrame)');
               speichern = document.querySelector('#privacy-cat-modal button.btn-primary:is([title*="estätigen"], [title*="peichern"])');
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

            // Contentpass iFrame
            if (window.location.href.startsWith('https://cp.') && window.location.href.includes('/first-layer/?start&theme=')) {
               console.log('[Cookie auto decline] Detected: Contentpass (iFrame)');
               akzeptieren = document.querySelector('main.animation astro-island[props*="acceptAll"] > button');
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }

         }
         // iframe klicker ENDE

         // #cmpbox (consensu.org, consentmanager.net)
         const cmpbox = document.querySelector('#cmpbox.cmpbox');
         if (cmpbox) {
            console.log('[Cookie auto decline] Detected: #cmpbox (consensu.org, consentmanager.net)');
            advancedrun = false;
            const ablehnen = cmpbox.querySelector('a.cmptxt_btn_no[role="button"]');
            const einstellungen = cmpbox.querySelector('a.cmptxt_btn_settings[role="button"]');
            const speichern = cmpbox.querySelector('a.cmptxt_btn_save[role="button"]');
            const akzeptieren = cmpbox.querySelector('a.cmptxt_btn_yes[role="button"]');
            if (ablehnen && ablehnen.offsetHeight >= 1) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            } else if (einstellungen && einstellungen.offsetHeight >= 1 && cmpbox.innerText.toLowerCase().includes('kostenfrei mit werb') === false) {
               beenden();
               window.setTimeout(function () {
                  einstellungen.click();
                  window.setTimeout(function () {
                     const switchespurpose = cmpbox.querySelector('[data-cmp-purpose="all"][aria-checked="true"]');
                     const switchesvendors = cmpbox.querySelector('[data-cmp-vendor="all"][aria-checked="true"]');
                     if (switchespurpose && switchesvendors) {
                        switchespurpose.click();
                        switchesvendors.click();
                        window.setTimeout(function () {
                           speichern.click();
                        }, 202);
                     } else {
                        window.setTimeout(function () {
                           speichern.click();
                        }, 202);
                     }
                  }, 202);
               }, 202);
            } else if (speichern && speichern.offsetHeight >= 1) {
               beenden();
               window.setTimeout(function () {
                  speichern.click();
               }, 202);
            } else if (akzeptieren) {
               beenden();
               window.setTimeout(function () {
                  akzeptieren.click();
               }, 202);
            }
         }

         // Contentpass (obfuscated)
         const contentpass = document.querySelector('body > div[data-nosnippet][translate] > div:first-child:not([class], [id]) > div[class^="_"]:not([id]):has(a[href*="datenschutz"]), body > div:first-child + div[data-nosnippet][translate] > div:first-child > div[class^="_"]:not([id]):has(a[href*="datenschutz"])');
         if (contentpass) {
            console.log('[Cookie auto decline] Detected: Contentpass (obfuscated)');
            akzeptieren = contentpass.querySelector('a[class^="_"][href^="http"][rel="noopener noreferrer"][target="_self"]');
            if (akzeptieren.innerText.toLowerCase().endsWith('weiter')) {
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }
         }

         // #cmpbox shadowroot (consensu.org, consentmanager.net)
         const cmpboxshadowroot = document.querySelector('#cmpwrapper.cmpwrapper');
         if (cmpboxshadowroot) {
            console.log('[Cookie auto decline] Detected: #cmpbox shadowroot (consensu.org, consentmanager.net)');
            ablehnen = cmpboxshadowroot.shadowRoot.querySelector('#cmpbox a.cmptxt_btn_no[role="button"], .cmpboxbtnsave[role="button"]');
            akzeptieren = cmpboxshadowroot.shadowRoot.querySelector('a.cmptxt_btn_yes[role="button"]');
            einstellungen = cmpboxshadowroot.shadowRoot.querySelector('a[onclick^="__cmp(\'showScreenAdvanced\')"]');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // opencmp.net
         const opencmp = document.querySelector('script#open-cmp-stub:is([src="https://cdn.opencmp.net/tcf-v2/cmp-stub-latest.js"], [src="//cdn.opencmp.net/tcf-v2/cmp-stub-latest.js"])');
         if (opencmp && document.cookie.includes('euconsent-v2') === false) {
            findconsentintervalzahl = 502;
            findconsentintervalzahländern();
            console.log('[Cookie auto decline] Detected: opencmp.net');
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
            console.log('[Cookie auto decline] Detected: usercentrics');
            advancedrun = false;
            findconsentintervalzahl = 1002;
            findconsentintervalzahländern();
            if (usercentrics.shadowRoot) {
               ablehnen = usercentrics.shadowRoot.querySelector('button[class^="sc-"][data-testid="uc-deny-all-button"][role="button"], button#deny');
               einstellungen = usercentrics.shadowRoot.querySelector('button[data-testid^="uc-customize-"], button.uc-more-button, button[data-testid^="uc-more-"]');
               akzeptieren = usercentrics.shadowRoot.querySelector('button[data-testid="uc-accept-all-button"], button#accept');
               speichern = usercentrics.shadowRoot.querySelector('button[data-testid="uc-save-button"], button#save.uc-save-button, button[class^="sc-"][data-testid="uc-save-button"][role="button"]');
            } else {
               akzeptieren = document.querySelector('button.aa-first-layer__button[onclick^="accept"]');
            }
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // usercentrics.eu 2
         const usercentrics2 = document.getElementById('comspace-usercentrics');
         const usercentricsframe = document.querySelector('iframe#uc-cross-domain-bridge[src^="https://app.usercentrics.eu/browser-sdk/"]');
         if (usercentrics2 && usercentricsframe && localStorage.getItem('uc_user_interaction') !== true) {
            console.log('[Cookie auto decline] Detected: usercentrics2');
            speichern = usercentrics2.querySelector('button.comspace-usercentrics--button');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // gatekeeperconsent.com
         const gatekeeperconsent = document.querySelector('script[src="https://privacy.gatekeeperconsent.com/tcf2_stub.js"]');
         if (gatekeeperconsent && document.cookie.includes('ezCMPCookieConsent') === false) {
            console.log('[Cookie auto decline] Detected: gatekeeperconsent.com');
            einstellungen = document.querySelector('button#ez-manage-settings');
            speichern = document.querySelector('button#ez-save-settings');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // cookiebot.com
         const cookiebot = document.querySelector('div[id*="Cookiebot"], div#cookiebot, #cookiebanner[name="cookiebanner"][ng-non-bindable], #cookieBotLayer');
         if (cookiebot && document.cookie.includes('%2Cutc:16') === false) {
            console.log('[Cookie auto decline] Detected: cookiebot.com');
            ablehnen = cookiebot.querySelector('button.cint-cookiebot__buttons__deny, :not([style="display: none;"]) > #CybotCookiebotDialogBodyButtonDecline, button.cookie-alert-decline-button, [class*="cookie"] a[href="javascript:void(0)"][onclick="Cookiebot.dialog.submitDecline()"], #CybotCookiebotDialogBodyLevelButtonLevelOptinDeclineAll');
            speichern = cookiebot.querySelector(':is([id*="OptinAllowallSelection"], [id*="AcceptSelected"], [onclick*="submitConsent"]):is(button, a, span)');
            einstellungen = cookiebot.querySelector('#CybotCookiebotDialogBodyLevelButtonCustomize');
            nureinklickeinstellungen = true;
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);

         }

         // trustarc.com
         const trustarc = document.querySelector('script[src^="https://consent.trustarc.com/asset/notice.js/v/v"]');
         if (trustarc && document.cookie.includes('notice_gdpr_prefs=') === false) {
            console.log('[Cookie auto decline] Detected: trustarc.com');
            ablehnen = document.querySelector('#truste-consent-buttons button#truste-consent-required, #truste-consent-track #truste-consent-buttons > a#truste-consent-required');
            einstellungen = document.querySelector('#truste-consent-buttons button#truste-show-consent');
            nureinklickeinstellungen = true;
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // real-cookie-banner-pro
         let realcookiebannerpro = document.querySelectorAll('body > div[id^="a"][class^="a"] > dialog.wp-exclude-emoji > [class^="animate__animated animate__"] > div:only-child > a:first-child + div + div[class*="-ext-"] > div:first-child > div[class*="-ext-"] > a[href="#"], body > div[id^="a"][class]> div.wp-exclude-emoji > [class^="animate__animated animate__"] > div:only-child > div[style^="background"] > div:only-child > div + div > div[style*="order"]');
         if (realcookiebannerpro.length > 0 && document.cookie.includes('%22main_essential%22%7D') === false) {
            console.log('[Cookie auto decline] Detected: real-cookie-banner-pro');
            advancedrun = false;
            for (let i = 0; i < realcookiebannerpro.length; i++) {
               if (realcookiebannerpro[i].offsetWidth > 0) {
                  if (realcookiebannerpro[i].innerText.includes('Einstellungen')) {
                     realcookiebannerpro[i].click();
                     window.setTimeout(function () {
                        realcookiebannerpro = document.querySelectorAll('body > div[id^="a"][class^="a"] > dialog.wp-exclude-emoji > [class^="animate__animated animate__"] > div:only-child > a:first-child + div + div[class*="-ext-"] > div:first-child > div[class*="-ext-"] > a[href="#"], body > div[id^="a"][class]> div.wp-exclude-emoji > [class^="animate__animated animate__"] > div:only-child > div[style^="background"] > div:only-child > div + div > div[style*="order"]');
                        for (let k = 0; k < realcookiebannerpro.length; k++) {
                           if (realcookiebannerpro[k].offsetWidth > 0 && realcookiebannerpro[k].innerText.includes('speichern')) {
                              realcookiebannerpro[k].click();
                           }
                        }
                     }, 502);
                  } else if (realcookiebannerpro[i].innerText.includes('Weiter ohne Einwilligung') || realcookiebannerpro[i].innerText.includes('Continue without consent')) {
                     realcookiebannerpro[i].click();
                     beenden();
                  }
               }
            }
         }

         // waconcookiemanagement
         const waconcookiemanagement = document.querySelector('.waconcookiemanagement-cookiebar, [class="waconcookiemanagement "]');
         if (waconcookiemanagement && document.cookie.includes('waconcookiemanagement') === false) {
            console.log('[Cookie auto decline] Detected: waconcookiemanagement');
            ablehnen = waconcookiemanagement.querySelector('a#data-cookie-refuse, span.cookie-refuse');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // onetrust.com
         const onetrust = document.getElementById('onetrust-consent-sdk');
         if (onetrust) {
            console.log('[Cookie auto decline] Detected: onetrust.com');
            ablehnen = document.querySelector('#onetrust-banner-sdk #onetrust-button-group button#onetrust-reject-all-handler, #cookie-disclosure button#cookie-disclosure-reject');
            einstellungen = document.querySelector('#onetrust-banner-sdk #onetrust-button-group button#onetrust-pc-btn-handler');
            speichern = document.querySelector('button.save-preference-btn-handler');
            akzeptieren = document.querySelector('#onetrust-accept-btn-handler');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // https://wordpress.org/plugins/complianz-gdpr
         const complianzgdpr = document.querySelector('body > #cmplz-cookiebanner-container');
         if (complianzgdpr) {
            console.log('[Cookie auto decline] https://wordpress.org/plugins/complianz-gdpr');
            ablehnen = complianzgdpr.querySelector('.cmplz-buttons > button.cmplz-deny');
            speichern = complianzgdpr.querySelector('.cmplz-buttons > button.cmplz-save-preferences');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // borlabs.io
         const borlabs = document.querySelector('#BorlabsCookieBox:not(:empty), div[class="rbrl-overlay rbrl-dialog-holder"]');
         if (borlabs && document.cookie.includes('essential%22%3A%5B%22borlabs-cookie') === false) {
            console.log('[Cookie auto decline] Detected: borlabs.io');
            ablehnen = borlabs.querySelector('button.brlbs-cmpnt-btn.brlbs-btn-accept-only-essential, .rbrl-accept-essential');
            speichern = borlabs.querySelector('#CookieBoxSaveButton, [data-cookie-accept=""]');
            einstellungen = borlabs.querySelector('#CookieBoxPreferencesButton');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // osano.com
         const osano = document.querySelector('script[src^="https://cmp.osano.com/"]');
         if (osano) {
            console.log('[Cookie auto decline] Detected: osano.com');
            ablehnen = document.querySelector('.osano-cm-window > div[id][role="dialog"] .osano-cm-buttons > button.osano-cm-denyAll');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // privacy-center.org
         const privacycenter = document.querySelector('script[src^="https://sdk.privacy-center.org/"]');
         const privacycenter2 = document.querySelector('#didomi-host #didomi-popup');
         if (privacycenter || privacycenter2) {
            console.log('[Cookie auto decline] Detected: privacy-center.org');
            advancedrun = false;
            const ablehnen = document.querySelector('#didomi-host #didomi-popup .didomi-continue-without-agreeing[role="button"]');
            const ablehnen2 = document.querySelector('#didomi-host #didomi-notice #buttons > button#didomi-notice-disagree-button');
            const ablehnen3 = document.querySelector('#didomi-host .didomi-popup-notice-buttons button#didomi-notice-disagree-button');
            const einstellungen = document.querySelector('#didomi-host .didomi-consent-popup-actions button.didomi-button-standard');
            const einstellungen2 = document.querySelector('#didomi-host button#didomi-notice-learn-more-button');
            const speichern = document.querySelector('#didomi-host .didomi-consent-popup-actions button.didomi-button-standard[aria-label]');
            const speichern2 = document.querySelector('#didomi-host .didomi-consent-popup-actions button[aria-describedby="didomi-consent-popup-information-save"]:not([disabled])');
            const switchesablehnen = document.querySelector('#didomi-host #didomi-radio-option-disagree-to-all[aria-pressed="false"]');
            const akzeptieren = document.querySelector('#didomi-host button#didomi-notice-agree-button');
            const akzeptieren2 = document.querySelector('#didomi-host button#btn-toggle-agree');
            if (ablehnen && getComputedStyle(ablehnen, ':before').getPropertyValue('content').includes("€") === false) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 402);
            } else if (ablehnen2 && ablehnen2.innerText.toLowerCase().includes('ad free') === false && ablehnen2.innerText.toLowerCase().includes('€') === false && ablehnen2.innerText.toLowerCase().includes('pur') === false) {
               beenden();
               window.setTimeout(function () {
                  ablehnen2.click();
               }, 402);
            } else if (ablehnen3 && ablehnen3.innerText.toLowerCase().includes('ad free') === false && ablehnen3.innerText.toLowerCase().includes('€') === false && ablehnen3.innerText.toLowerCase().includes('pur') === false) {
               beenden();
               window.setTimeout(function () {
                  ablehnen3.click();
               }, 402);
            } else if (speichern && speichern.innerText.toLowerCase().includes('ad free') === false && speichern.innerText.toLowerCase().includes('€') === false && speichern.innerText.toLowerCase().includes('pur') === false) {
               beenden();
               window.setTimeout(function () {
                  speichern.click();
               }, 402);
            } else if (speichern2 && speichern2.innerText.toLowerCase().includes('ad free') === false && speichern2.innerText.toLowerCase().includes('€') === false && speichern2.innerText.toLowerCase().includes('pur') === false) {
               beenden();
               window.setTimeout(function () {
                  speichern2.click();
               }, 402);
            } else if (einstellungen && einstellungen.innerText.toLowerCase().includes('ad free') === false && einstellungen.innerText.toLowerCase().includes('€') === false && einstellungen.innerText.toLowerCase().includes('pur') === false) {
               window.setTimeout(function () {
                  einstellungen.click();
               }, 402);
            } else if (einstellungen2 && einstellungen2.offsetHeight > 0 && einstellungen2.innerText.toLowerCase().includes('mehr infos') === false && einstellungen2.innerText.toLowerCase().includes('ad free') === false && einstellungen2.innerText.toLowerCase().includes('€') === false && einstellungen2.innerText.toLowerCase().includes('pur') === false && bereitsgeklickt === false) {
               bereitsgeklickt = true;
               window.setTimeout(function () {
                  einstellungen2.click();
               }, 402);
            } else if (switchesablehnen) {
               window.setTimeout(function () {
                  switchesablehnen.click();
               }, 402);
            } else if (akzeptieren && bereitsgeklickt === false) {
               beenden();
               window.setTimeout(function () {
                  akzeptieren.click();
               }, 402);
            } else if(akzeptieren2 && bereitsgeklickt === true) {
               beenden();
               window.setTimeout(function () {
                  akzeptieren2.click();
               }, 402);
            }
         }

         // quantcast.com
         const quantcast = document.querySelector('script[src^="https://cmp.quantcast.com/tcfv"], #qc-cmp2-container.qc-cmp2-container');
         if (quantcast && document.cookie.includes('addtl_consent') === false) {
            console.log('[Cookie auto decline] Detected: quantcast.com');
            advancedrun = false;
            let ablehnen = document.querySelector('#qc-cmp2-container .qc-cmp2-summary-buttons > button + button[mode="secondary"]');
            const einstellungen = document.querySelector('#qc-cmp2-container .qc-cmp2-summary-buttons > button[mode="secondary"]');
            const speichern = document.querySelector('#qc-cmp2-container div[class^="qc-cmp2-buttons-"] > button[aria-pressed="false"][mode="primary"]');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen = document.querySelector('#qc-cmp2-container .qc-cmp2-summary-buttons > button + button[mode="secondary"]');
                  ablehnen.click();
               }, 702);
            } else if (einstellungen) {
               window.setTimeout(function () {
                  einstellungen.click();
               }, 202);
            } else if (speichern) {
               beenden();
               window.setTimeout(function () {
                  speichern.click();
               }, 202);
            }
         }

         // iubenda.com
         const iubenda = document.querySelector('script[src*=".iubenda.com/"]');
         if (iubenda && document.cookie.includes('%7B%22timestamp%22%') === false) {
            console.log('[Cookie auto decline] Detected: iubenda.com');
            ablehnen = document.querySelector('#iubenda-cs-banner .iubenda-cs-opt-group button.iubenda-cs-reject-btn');
            akzeptieren = document.querySelector('#iubenda-cs-banner .iubenda-cs-opt-group button.iubenda-cs-accept-btn, #iubenda-cs-banner button.iubenda-cs-close-btn:not([style="display:none!important;"]), #iubenda-cs-banner button.iubenda-cs-accept-btn');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // gdpr-legal-cookie.myshopify.com
         const gdprlegalcookiemyshopify = document.querySelector('#banner-wrapper[style="opacity: 1; display: flex; visibility: visible; top: 0px; left: 0px;"]');
         if (gdprlegalcookiemyshopify && document.cookie.includes('_bc_c_set') === false) {
            console.log('[Cookie auto decline] Detected: gdpr-legal-cookie.myshopify.com');
            ablehnen = gdprlegalcookiemyshopify.querySelector("#essential_accept");
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // shopify
         const shopify = document.querySelector('section#shopify-pc__banner[aria-labelledby][style="display: block;"]');
         if (shopify && document.cookie.includes('%7B%22purposes%22%3A%7B%22p%22%3Atrue') === false) {
            console.log('[Cookie auto decline] Detected: shopify cookie banner');
            nureinklickeinstellungen = true;
            ablehnen = shopify.querySelector('.shopify-pc__banner__btns-granular #shopify-pc__banner__btn-decline');
            einstellungen = shopify.querySelector('#shopify-pc__banner__btn-manage-prefs');
            speichern = document.querySelector('#shopify-pc__prefs button#shopify-pc__prefs__header-decline');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // shopify2
         const shopify2 = document.querySelector('div[id^="shopify-section-sections"] > cookie-banner');
         if (shopify2) {
            console.log('[Cookie auto decline] Detected: shopify cookie banner 2');
            ablehnen = shopify2.querySelector('button[name="decline"]');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // fastcmp.com
         const fastcmp = document.querySelector('script[src="https://static.fastcmp.com/fast-cmp-stub.js"]');
         if (fastcmp && document.cookie.includes('fastCMP-addtlConsent') === false) {
            console.log('[Cookie auto decline] Detected: fastcmp.com');
            advancedrun = false;
            const check = document.querySelector('iframe#fast-cmp-iframe');
            if (check) {
               ablehnen = check.contentWindow.document.querySelector('.fast-cmp-home-refuse > button.fast-cmp-button-secondary');
               akzeptieren = document.querySelector('iframe#fast-cmp-iframe').contentWindow.document.querySelector('.fast-cmp-paywall-home__nav-box > button.fast-cmp-button-primary');
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }
         }

         // hu-manity.co
         const humanity = document.querySelector('#cookie-notice[class="cookie-revoke-hidden cn-position-bottom cn-effect-fade cookie-notice-visible"]');
         if (humanity && document.cookie.includes('cookie_notice_accepted') === false) {
            console.log('[Cookie auto decline] Detected: hu-manity.co');
            ablehnen = humanity.querySelector('#cn-notice-buttons > a#cn-refuse-cookie[data-cookie-set="refuse"]');
            schließen = humanity.querySelector('.cookie-notice-container > #cn-close-notice[data-cookie-set="accept"]');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // cookie-law-info-bar
         const cookielawinfobar = document.querySelector('#cookie-law-info-bar[style]');
         if (cookielawinfobar && document.cookie.includes('viewed_cookie_policy') === false) {
            console.log('[Cookie auto decline] Detected: cookie-law-info-bar');
            ablehnen = cookielawinfobar.querySelector('a#wt-cli-reject-btn');
            einstellungen = cookielawinfobar.querySelector('a.cli_settings_button[role="button"]');
            speichern = document.querySelector('#cliSettingsPopup a#wt-cli-privacy-save-btn.wt-cli-privacy-accept-btn[role="button"], #wt-cli-cookie-banner #wt-cli-accept-btn');
            const checkbox1 = document.querySelector('#cliSettingsPopup input#wt-cli-checkbox-performance[type="checkbox"], #wt-cli-cookie-banner input#matomo_optout_checkbox[type="checkbox"]');
            const checkbox2 = document.querySelector('#cliSettingsPopup input#wt-cli-checkbox-marketing[type="checkbox"]');
            const checkbox3 = document.querySelector('#cliSettingsPopup input#wt-cli-checkbox-others[type="checkbox"]');
            const checkbox4 = document.querySelector('#cliSettingsPopup input#wt-cli-checkbox-functional[type="checkbox"]');
            nureinklickeinstellungen = true;
            if (checkbox1 && checkbox1.checked) {
               checkbox1.click();
               return;
            } else if (checkbox2 && checkbox2.checked) {
               checkbox2.click();
               return;
            } else if (checkbox3 && checkbox3.checked) {
               checkbox3.click();
               return;
            } else if (checkbox4 && checkbox4.checked) {
               checkbox4.click();
               return;
            }
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // cookiefirst.com
         const cookiefirst = document.querySelector('.cookiefirst-root');
         if (cookiefirst && document.cookie.includes('cookiefirst-consent') === false) {
            console.log('[Cookie auto decline] Detected: cookiefirst.com');
            nureinklickeinstellungen = true;
            ablehnen = document.querySelector('.cookiefirst-root button[data-cookiefirst-action="reject"][type="button"], [aria-labelledby="cookie-preference-panel-title"] button[data-cookiefirst-action="reject_second"]');
            einstellungen = cookiefirst.querySelector('button[data-cookiefirst-action="adjust"][type="button"]');
            speichern = document.querySelector('.cookiefirst-root button[data-cookiefirst-action="save"][type="button"]');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // cookieconsent:desc
         const cookieconsentdesc = document.querySelector('div[aria-describedby="cookieconsent:desc"][class*="cc-"]');
         if (cookieconsentdesc && cookieconsentdesc.offsetWidth > 1 && document.cookie.includes('cookieconsent_status') === false) {
            console.log('[Cookie auto decline] Detected: cookieconsent:desc');
            advancedrun = false;
            nureinklickeinstellungen = true;
            ablehnen = cookieconsentdesc.querySelector('a[aria-labelledby="cc-deny-01"], .cc-deny, .cc-dismiss, .cc-dialog-button-decline');
            speichern = cookieconsentdesc.querySelector('a[data-action="save-cc"], button.cc-save, [aria-label*="speichern"], [aria-label*="save"], button[class="cc-btn cc-allow"]');
            einstellungen = cookieconsentdesc.querySelector('[aria-label="Einstellungen"], [aria-label="settings cookies"], .cc-settings');
            const einstellungsmenu = document.querySelector('div[aria-describedby="cookieconsent:desc"][class*="cc-window"] + #pd-cp-preferences, div[aria-describedby="cookieconsent:desc"][class*="cc-window"] + div > div[id="cookieconsent:settings"]');
            schließen = cookieconsentdesc.querySelector('a[aria-label="dismiss cookie message"]');
            akzeptieren = cookieconsentdesc.querySelector('a[aria-label="allow cookies"]');
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
            advancedrun = false;
            const ablehnen = oveleon.querySelector('button[data-deny-all].deny');
            const checkedcheckbox = oveleon.querySelectorAll('.cc-groups > .cc-group > input[type="checkbox"][data-toggle-cookies]:checked:not([disabled])');
            const speichern = oveleon.querySelector('button[data-save].save');
            const akzeptieren = oveleon.querySelector('button[onclick^="setCookieBar"]');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            } else if (checkedcheckbox.length > 0) {
               beenden();
               window.setTimeout(function () {
                  for (let i = 0; i < checkedcheckbox.length; i++) {
                     checkedcheckbox[i].click();
                  }
                  window.setTimeout(function () {
                     speichern.click();
                  }, 202);
               }, 202);
            } else if (speichern) {
               beenden();
               window.setTimeout(function () {
                  speichern.click();
               }, 202);
            } else if (akzeptieren) {
               beenden();
               window.setTimeout(function () {
                  akzeptieren.click();
               }, 202);
            }
         }


         // as-oil-content-overlay
         const asoilcontentoverlay = document.querySelector('.as-oil-content-overlay[data-qa="oil-full"]');
         if (asoilcontentoverlay) {
            console.log('[Cookie auto decline] Detected: as-oil-content-overlay');
            ablehnen = document.querySelector('.as-oil-content-overlay button.as-js-only-essentials[data-qa="oil-only-essentials-button"]');
            einstellungen = document.querySelector('.as-oil-content-overlay button.as-js-advanced-settings[data-qa="oil-AdvancedSettingsButton"]');
            speichern = document.querySelector('.as-oil-content-overlay button.as-js-optin');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // mnd-cookie-modal
         const mndcookiemodal = document.querySelector('.mnd-cookie-wrapper[data-mnd-cookie-plugin][data-mnd-cookie-options]');
         const mndcookiemodal2 = document.querySelector('div[class="js--modal sizing--content mnd-cookie-modal"]');
         if (mndcookiemodal || mndcookiemodal2) {
            console.log('[Cookie auto decline] Detected: mnd-cookie-modal');
            advancedrun = false;
            ablehnen = document.querySelector('.mnd-cookie-modal button.btn-accept-functional, .mnd-cookie-wrapper button.mnd-btn-decline');
            speichern = document.querySelector('.mnd-cookie-wrapper button.mnd-btn-save-settings');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // page-wrap--cookie-permission
         const pagewrapcookiepermission = document.querySelector('.page-wrap--cookie-permission[data-cookie-permission="true"][data-urlprefix][data-title]');
         if (pagewrapcookiepermission && document.cookie.includes('cookiePreferences') === false) {
            console.log('[Cookie auto decline] Detected: page-wrap--cookie-permission');
            advancedrun = false;
            const einstellungen = pagewrapcookiepermission.querySelector('.cookie-permission--configure-button');
            const komforthaken = document.querySelector('#cookie-consent .cookie-consent--group > input[value="comfort"] + label');
            const speichern = document.querySelector('#cookie-consent input.cookie-consent--save-button[type="button"]');
            const akzeptieren = pagewrapcookiepermission.querySelector('a.cookie-permission--accept-button');
            document.querySelector('#cookie-consent .cookie-consent--group > input[value="comfort"] + label > input');
            if (einstellungen && komforthaken && speichern) {
               beenden();
               window.setTimeout(function () {
                  einstellungen.click();
                  window.setTimeout(function () {
                     komforthaken.click();
                     window.setTimeout(function () {
                        speichern.click();
                     }, 202);
                  }, 202);
               }, 202);
               beenden();
            } else if (speichern) {
               window.setTimeout(function () {
                  speichern.click();
               }, 202);
            } else if (akzeptieren) {
               beenden();
               window.setTimeout(function () {
                  akzeptieren.click();
               }, 202);
            }
         }

         // idxrcookies
         const idxrcookiesdocument = document.getElementById('idxrcookies');
         if (idxrcookiesdocument && document.cookie.includes('deluxecookiesWarningCheck') === false) {
            console.log('[Cookie auto decline] Detected: idxrcookies');
            ablehnen = idxrcookiesdocument.querySelector('a#idxrcookiesKO');
            speichern = document.querySelector('#cookieModal a#js-save-cookieconf');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // comply-consent-manager
         const complyconsentmanager = document.querySelector('comply-consent-manager[apikey] .comply-Menu');
         if (complyconsentmanager) {
            console.log('[Cookie auto decline] Detected: comply-consent-manager');
            ablehnen = complyconsentmanager.querySelector('button.comply-SaveSettingsButton');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // ccc-overlay
         const cccoverlay = document.querySelector('#ccc[style]');
         if (cccoverlay && document.cookie.includes('CookieControl') === false) {
            console.log('[Cookie auto decline] Detected: ccc-overlay');
            ablehnen = cccoverlay.querySelector('#ccc-content button#ccc-reject-settings');
            schließen = cccoverlay.querySelector('button#ccc-notify-dismiss');
            speichern = cccoverlay.querySelector('button[aria-label="Set cookie preferences"]');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // ccm19.de
         const ccm19de = document.querySelector('.ccm-root > #ccm-widget');
         if (ccm19de && localStorage.getItem('ccm_consent') === null) {
            console.log('[Cookie auto decline] Detected: ccm-root');
            nureinklickeinstellungen = true;
            ablehnen = ccm19de.querySelector('#ccm-widget button.ccm--decline-cookies[type="button"]');
            einstellungen = ccm19de.querySelector('button[data-ccm-modal="ccm-control-panel"]');
            speichern = document.querySelector('#ccm-control-panel button.ccm--decline-cookies[type="button"], #ccm-control-panel button.ccm--save-settings[type="button"]');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            window.setTimeout(function () {
               if (document.querySelector('.ccm-root > #ccm-widget:not([style="display: none;"])')) {
                  window.localStorage.setItem('ccm_consent', '{"/":{"gen":2,"ucid":"2d74b685b2e05d5a547f2b22e09f833fb0ac7b534d78af2608eed772e2128cb3","consent":true,"embeddings":["9752444","1b8c114","bb6c67f"],"created":17448899122,"updated":17448899122,"iframeConsentDomains":[],"tcf":{"p":[],"sf":[],"v":[],"gad":[]},"lang":"de-DE"}}');
                  beenden();
                  window.location.reload();
               }
            }, 1302);
         }

         // https://github.com/orestbida/cookieconsent
         const orestbida = document.querySelector('#cc--main.c--anim[style]');
         const orestbida2 = document.querySelector('#cc-main > .cm-wrapper > [aria-describedby="cm__desc"]');
         if (orestbida && document.cookie.includes('cc_cookie') === false) {
            console.log('[Cookie auto decline] Detected: https://github.com/orestbida/cookieconsent');
            advancedrun = false;
            const ablehnen = orestbida.querySelector('button#s-rall-bn[type="button"]');
            const speichern = orestbida.querySelector('button#s-sv-bn[type="button"]');
            const akzeptieren = orestbida.querySelector('button#c-p-bn[type="button"]');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            } else if (speichern) {
               beenden();
               window.setTimeout(function () {
                  speichern.click();
               }, 202);
            } else if (akzeptieren) {
               beenden();
               window.setTimeout(function () {
                  akzeptieren.click();
               }, 202);
            }
         } else if (orestbida2 && document.cookie.includes('cc_cookie') === false) {
            console.log('[Cookie auto decline] Detected: https://github.com/orestbida/cookieconsent 2');
            advancedrun = false;
            const speichern = orestbida2.querySelector('button[data-role="necessary"]');
            const einstellungen = orestbida2.querySelector('button.cm__btn--secondary[data-role="show"]');
            const switchdecline = document.querySelector('#cc-main input[type="checkbox"][value="analytics"]');
            const speichern2 = document.querySelector('#cc-main button[data-role="save"]');
            if (speichern) {
               beenden();
               window.setTimeout(function () {
                  speichern.click();
               }, 202);
            } else if (einstellungen && bereitsgeklickt === false) {
               bereitsgeklickt = true;
               window.setTimeout(function () {
                  einstellungen.click();
               }, 202);
            } else if (switchdecline && switchdecline.checked === true) {
               window.setTimeout(function () {
                  switchdecline.click();
               }, 100);
            } else if (speichern2) {
               beenden();
               window.setTimeout(function () {
                  speichern2.click();
               }, 202);
            }
         }

         // optanon
         const optanon = document.querySelector('.optanon-alert-box-wrapper');
         if (optanon && document.cookie.includes('OptanonAlertBoxClosed') === false) {
            console.log('[Cookie auto decline] Detected: optanon');
            ablehnen = optanon.querySelector('button.optanon-reject-all[onclick]');
            speichern = document.querySelector('.optanon-white-button-middle > button[onclick]');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // gdpr.mandarin-medien.de
         const mandarinmedien = document.querySelector('div[class="mmcm-container"]');
         if (mandarinmedien && document.cookie.includes('mmcm-jar-') === false) {
            console.log('[Cookie auto decline] Detected: gdpr.mandarin-medien.de');
            ablehnen = mandarinmedien.querySelector('.mmcm-actions a.mmcm-btn-decline');
            speichern = mandarinmedien.querySelector('.mmcm-actions a.mmcm-btn-save');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // orejime
         const orejime = document.querySelector('#orejime, .orejime-NoticePortal');
         if (orejime && document.cookie.includes('orejime') === false) {
            console.log('[Cookie auto decline] Detected: orejime');
            ablehnen = orejime.querySelector('button.orejime-Notice-declineButton');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // oax_cookie_consent_modal
         const oaxcookieconsentmodal = document.querySelector('body.oax');
         if (oaxcookieconsentmodal && document.cookie.includes('_consentCookie') === false) {
            console.log('[Cookie auto decline] Detected: oaxcookieconsentmodal');
            ablehnen = document.querySelector('.oax_cookie_consent_modal button.oax-cookie-consent-select-necessary');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // https://www.acris-ecommerce.at/
         const acris = document.querySelector('.acris-cookie-consent[data-acris-cookie-consent="true"][data-acris-cookie-consent-options]');
         if (acris) {
            nureinklickeinstellungen = true;
            findconsentintervalzahl = 802;
            findconsentintervalzahländern();
            console.log('[Cookie auto decline] Detected: https://www.acris-ecommerce.at/');
            ablehnen = acris.querySelector('#ccAcceptOnlyFunctional');
            einstellungen = acris.querySelector('#ccSettingButton');
            akzeptieren = acris.querySelector('#ccAcceptButton');
            const switches = acris.querySelectorAll('.cookie-consent-settings div[id^="ccGroupHeader"] input[type="checkbox"][checked="checked"]:not([disabled])');

            if (switches.length > 0) {
               for (let i = 0; i < switches.length; i++) {
                  const a = switches[i];
                  if (a.checked === true) {
                     a.click();
                  }
               }
            }
            if (bereitsgeklickt === false || (bereitsgeklickt && switches.length > 0)) {
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }
         }

         // https://www.acris-ecommerce.at/ 2
         const acris2 = document.querySelector('#acris--page-wrap--cookie-permission[data-acris-cookie-permission]');
         if (acris2 && document.cookie.includes('cookiePreferences') === false) {
            console.log('[Cookie auto decline] Detected: https://www.acris-ecommerce.at/ 2');
            ablehnen = acris2.querySelector('button#cookie-permission--accept-only-functional-button');
            speichern = acris2.querySelector('#cookie-permission--accept-button');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // https://www.tramino.de/
         const tramino = document.querySelector('script[src^="https://storage.tramino.net/static/root/js/jquery"], script[src="/tramino/js/require.min.js"]');
         if (tramino && document.cookie.includes('Consent') === false) {
            console.log('[Cookie auto decline] Detected: https://www.tramino.de/');
            ablehnen = document.querySelector('.TraminoConsent button[value="acceptConsent"]');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // amgdpr
         const amgdpr = document.querySelector('.amgdprjs-bar-template, .amgdprcookie-modal-container');
         if (amgdpr && document.cookie.includes('amcookie_allowed') === false) {
            console.log('[Cookie auto decline] Detected: amgdpr');
            ablehnen = amgdpr.querySelector('button.-decline, button.g-c-button-reject');
            einstellungen = amgdpr.querySelector('button.-settings');
            speichern = document.querySelector('.gdpr-cookie-modal_setup-modal._show button.-save, .amgdprcookie-cookie-settings-modal._show button.amgdprcookie-done');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // klaro.org
         const klaro = document.querySelector('div[id="klaro"] > div[class^="klaro"], #cookieconsent > div[class^="klaro"], #consentfriend > div[class^="klaro"');
         if (klaro && document.cookie.includes('klaro') === false) {
            console.log('[Cookie auto decline] Detected: klaro.org');
            advancedrun = false;
            const ablehnen = document.querySelector('div[class^="klaro"] button.cn-decline[type="button"]');
            const einstellungen = document.querySelector('#klaro button.cm-btn-lern-more');
            const einstellungen2 = document.querySelector('#klaro a.cn-learn-more[href="#"]');
            const speichern = document.querySelector('#klaro button.cm-btn-accept, .cm-buttons > button[class="inbtn inbtn--primary"]:first-child');
            const akzeptieren = document.querySelector('#klaro .cm-footer-buttons > button.cm-btn-accept-all:first-child');
            const checkbox = document.querySelector('#klaro input[type="checkbox"]#purpose-item-disableAll[class="cm-list-input"]');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            } else if (checkbox && checkbox.checked === true && bereitsgeklickt === false) {
               bereitsgeklickt = true;
               window.setTimeout(function () {
                  checkbox.click();
               }, 202);
            } else if (speichern) {
               beenden();
               window.setTimeout(function () {
                  speichern.click();
               }, 202);
            } else if (einstellungen) {
               window.setTimeout(function () {
                  einstellungen.click();
               }, 202);
            } else if (einstellungen2) {
               window.setTimeout(function () {
                  einstellungen2.click();
               }, 202);
            } else if (akzeptieren) {
               beenden();
               window.setTimeout(function () {
                  akzeptieren.click();
               }, 202);
            }
         }

         // klaro.org 2
         const klarozwei = document.querySelector('div[id="timm4-cookie-consent"] > div[class^="klaro"], div[id="hbaccept"] > div[class^="klaro"]');
         if (klarozwei && document.cookie.includes('timm4cookie-consent') === false && window.localStorage.getItem('hbaccept') === null) {
            console.log('[Cookie auto decline] Detected: klaro.org 2');
            speichern = klarozwei.querySelector('button.cm-btn-accept[type="button"]');
            ablehnen = klarozwei.querySelector('button.cn-decline');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // cookie-note-hide
         const cookienotehide = document.querySelector('div[id="cookie-note"][style="display: block;"].cookie-note');
         if (cookienotehide && document.cookie.includes('ikiss-cookie-note-off') === false) {
            console.log('[Cookie auto decline] Detected: cookie-note-hide (germany)');
            ablehnen = cookienotehide.querySelector('button#cookie-note-hide');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // cookie-consent-form__description
         const cookieconsentformdescription = document.querySelector('dialog.cookie-consent-form[aria-labelledby="cookie-consent-form__description"][open]');
         if (cookieconsentformdescription && document.cookie.includes('hide_cn') === false) {
            console.log('[Cookie auto decline] Detected: cookie-consent-form__description (germany)');
            advancedrun = false;
            const allesauswählen = cookieconsentformdescription.querySelector('button.cookie-consent-form__permit-button');
            const trackingverbieten = cookieconsentformdescription.querySelector('input[id][aria-describedby*="tracking"]');
            const speichern = cookieconsentformdescription.querySelector('button.cookie-consent-form__save-button');
            if (allesauswählen) {
               beenden();
               window.setTimeout(function () {
                  allesauswählen.click();
               }, 202);
            }
            if (trackingverbieten) {
               window.setTimeout(function () {
                  trackingverbieten.click();
               }, 402);
            }
            if (speichern) {
               beenden();
               window.setTimeout(function () {
                  speichern.click();
               }, 602);
            }
         }

         // sgalinski.de
         const sgalinski = document.querySelector('#SgCookieOptin');
         if (sgalinski) {
            console.log('[Cookie auto decline] Detected: sgalinski.de');
            speichern = sgalinski.querySelector('.sg-cookie-optin-box-button button.sg-cookie-optin-box-button-accept-specific');
            einstellungen = sgalinski.querySelector('.sg-cookie-optin-banner-button button.sg-cookie-optin-banner-button-settings');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // cookieman-modal
         const cookiemanmodal = document.querySelector('#cookieman-modal[data-cookieman-settings]');
         if (cookiemanmodal) {
            console.log('[Cookie auto decline] Detected: cookieman-modal');
            ablehnen = cookiemanmodal.querySelector('button[data-cookieman-accept-none], a.data-cookieman-not-accept');
            speichern = cookiemanmodal.querySelector('button[data-cookieman-accept-all]');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // usercentrics-button
         const usercentricsbutton = document.querySelector('script[id][src="https://app.usercentrics.eu/latest/main.js"]');
         const usercentricsbutton2 = document.querySelector('#usercentrics-button');
         if (usercentricsbutton && usercentricsbutton2) {
            console.log('[Cookie auto decline] Detected: usercentrics-button');
            ablehnen = document.querySelector('#usercentrics-button button#uc-btn-deny-banner');
            einstellungen = document.querySelector('#usercentrics-button button#uc-btn-more-info-banner');
            speichern = document.querySelector('#usercentrics-button .uc-save-settings-button');
            akzeptieren = document.querySelector('#usercentrics-button button#uc-btn-accept-banner');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // cky-consent
         const ckyconsent = document.querySelector('.cky-consent-container');
         if (ckyconsent && document.cookie.includes('action:yes,necessary:yes') === false) {
            console.log('[Cookie auto decline] Detected: cky-consent');
            ablehnen = ckyconsent.querySelector('button.cky-btn-reject');
            einstellungen = ckyconsent.querySelector('button.cky-btn-customize');
            speichern = document.querySelector('.cky-preference-center button.cky-btn-preferences');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // framer
         const framer = document.querySelector('.--framer-cookie-banner-container');
         if (framer && window.localStorage.getItem('framerCookiesDismissed') === null) {
            console.log('[Cookie auto decline] Detected: --framer-cookie-banner-container');
            ablehnen = framer.querySelector('div[style="display: flex; flex-direction: row; gap: 10px; margin-top: 16px;"] > input:first-child');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // privacy_optin
         const privacy_optin = document.querySelector('div[id^="privacy_optin_"][class^="mod_privacy_optin"].open');
         if (privacy_optin && window.localStorage.getItem('user_privacy_settings') === null) {
            console.log('[Cookie auto decline] Detected: privacy_optin');
            advancedrun = false;
            const ablehnen = privacy_optin.querySelector('.privacy_buttons > input[name="save_tech_settings"]');
            const speichern = privacy_optin.querySelector('.privacy_buttons > input[name="save_settings"]:not([disabled])');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            } else if (speichern) {
               beenden();
               window.setTimeout(function () {
                  speichern.click();
               }, 202);
            } else {
               window.localStorage.setItem('user_privacy_settings', '1,2');
               window.localStorage.setItem('user_privacy_settings_expires', new Date().getTime() * 1.5);
               window.location.reload();
            }
         }

         // tealiumGDPR
         const tealiumGDPR = document.querySelector('div[id^="__tealiumGDPR"]:not(:empty)');
         if (tealiumGDPR) {
            console.log('[Cookie auto decline] Detected: tealiumGDPR');
            advancedrun = false;
            ablehnen = tealiumGDPR.querySelector('button#rejectAll, button#consent_prompt_reject, a#no_consent, button.js-btn-reject-all, button#cm-acceptNone, #consent_prompt_decline_submit, #consent_wall_optout');
            speichern = document.querySelector('#__tealiumGDPRcpPrefs button#save, #__tealiumGDPRcpPrefs #pref_submit');
            einstellungen = tealiumGDPR.querySelector('button.js-btn-edit-cookie-settings, a#preferences, button#pref_details');
            nureinklickeinstellungen = true;
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // avia
         const avia = document.querySelector('.avia-cookie-consent-wrap');
         if (avia) {
            console.log('[Cookie auto decline] Detected: avia');
            akzeptieren = avia.querySelector('.avia-cookie-consent a[href="#"][class*="avia-cookie-consent-button-"]');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // cookiebar_optin_219
         const cookiebaroptin219 = document.querySelector('#cookiebar_optin_219.mod_cookiebar_optin_slim');
         if (cookiebaroptin219) {
            console.log('[Cookie auto decline] Detected: cookiebar_optin_219');
            ablehnen = cookiebaroptin219.querySelector('.cookiebar_disagree > a[data-privacy]');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // sirdata.com
         const sirdatacom = document.querySelector('#sd-cmp[class^="sd-cmp-"]');
         if (sirdatacom && document.cookie.includes('euconsent-v2') === false) {
            console.log('[Cookie auto decline] Detected: sirdata.com');
            ablehnen = sirdatacom.querySelector('button:has(+ button + button), div > button:has(+ div > a[href="https://cmp.sirdata.com/"]), div:not([id], [class]) > div > button:only-child');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // https://setupad.com/
         const setupad = document.querySelector('body > .stpd_cmp');
         if (setupad && localStorage.getItem('additional-consent') === null) {
            console.log('[Cookie auto decline] Detected: https://setupad.com/');
            advancedrun = false;
            const einstellungen = setupad.querySelector('.stpd_consent_wrapper > .stpd_button_wrapper > .stpd_flexed_btns > button.stpd_submit_btn[type="button"]');
            const speichern = setupad.querySelector('.stpd_return_btn + div + .stpd_consent_wrapper > div > .stpd_flexed_btns > button.stpd_submit_btn[type="submit"]');
            if (einstellungen) {
               window.setTimeout(function () {
                  einstellungen.click();
               }, 202);
            } else {
               // select pre active "Legitimate interest" switches and decline.
               const switches = setupad.querySelectorAll('.stpd_return_btn + div > .stpd_purposes_list > div > li > .stpd_consent_slider_wrapper > .stpd_consent_box > .stpd_switch > input[type="checkbox"][name="purposesLegitimate"][value="true"]');
               if (switches.length > 0) {
                  for (let i = 0; i < switches.length; i++) {
                     switches[i].click();
                  }
               } else if (speichern) {
                  beenden();
                  window.setTimeout(function () {
                     speichern.click();
                  }, 202);
               }
            }
         }

         // https://mkm.legal/
         const mkmlegal = document.querySelector('#jmdCookieConsentWrapper');
         if (mkmlegal && document.cookie.includes('mkm_cbconsent') === false) {
            console.log('[Cookie auto decline] Detected: https://mkm.legal/');
            ablehnen = mkmlegal.shadowRoot.querySelector('#cookieConsent button.deny');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // https://2b-advice.com/
         const twobadvice = document.querySelector('#bbcdBanner.b-banner[style], #bbcdSettings.b-settings[style]');
         if (twobadvice && document.cookie.includes('_2BCookieSettings') === false) {
            console.log('[Cookie auto decline] Detected: https://2b-advice.com/');
            einstellungen = twobadvice.querySelector('button#bbcdBannerButtonSettings');
            speichern = document.querySelector('#bbcdSettings button#bbcdButtonOK_dialog_St');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // https://webstollen.de/
         const webstollen = document.getElementById('ws_eu-cookie-container');
         if (webstollen && document.cookie.includes('eu_cookie_store') === false) {
            console.log('[Cookie auto decline] Detected: https://webstollen.de/');
            advancedrun = false;
            const buttons = webstollen.querySelectorAll('[class*="button"] > button');
            const speichern = webstollen.querySelectorAll('[class*="Cat_buttons"] > a');
            const einstellungen = webstollen.querySelector('#eu-cookie-details-anzeigen-b, span[class^="modal_text_smaller"] > span + a');
            if (buttons && buttons.length >= 2) {
               for (let i = 0; i < buttons.length; i++) {
                  const j = i;
                  if (buttons[i].innerText.toLowerCase().includes('ablehnen') || buttons[i].innerText.toLowerCase().includes('minimale funktionen')) {
                     beenden();
                     window.setTimeout(function () {
                        buttons[j].click();
                     }, 202);
                  }
               }
            } else if (speichern && speichern.length >= 2) {
               for (let i = 0; i < speichern.length; i++) {
                  const j = i;
                  if (speichern[i].innerText.toLowerCase().includes('speichern')) {
                     beenden();
                     window.setTimeout(function () {
                        speichern[j].click();
                     }, 202);
                  }
               }
            } else if (einstellungen && bereitsgeklickt === false) {
               bereitsgeklickt = true;
               window.setTimeout(function () {
                  einstellungen.click();
               }, 202);
            }
         }

         // https://www.jtl-software.de/
         const jtlsoftwarede = document.querySelector('#consent-manager.active, #consent.active');
         if (jtlsoftwarede && window.localStorage.getItem('consent') === null) {
            console.log('[Cookie auto decline] Detected: https://www.jtl-software.de/');
            ablehnen = document.querySelector('#consent-manager.active button#consent-banner-btn-close, #consent.active button#consent--banner-btn-decline');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // blogspot.com
         const blogspot = document.querySelector('#cookieChoiceInfo.cookie-choices-info');
         if (blogspot && document.cookie.includes('displayCookieNotice') === false) {
            console.log('[Cookie auto decline] Detected: blogspot.com');
            ablehnen = document.querySelector('#cookieChoiceInfo a#cookieChoiceDismiss');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // jimdo.com
         const jimdo = document.querySelector('div[aria-describedby="cc-individual-cookie-settings"], [class="sR5JB"]');
         if (jimdo && document.cookie.includes('ckies_') === false) {
            console.log('[Cookie auto decline] Detected: jimdo.com');
            ablehnen = jimdo.querySelector('button#cookie-settings-reject-all, [data-gi-selector="reject-all-cookies"] > a');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // amp-consent
         const ampconsent = document.querySelector('amp-consent.i-amphtml-element');
         if (ampconsent && (window.localStorage.key(0) === null || (window.localStorage.key(0) && window.localStorage.key(0).includes('amp-store:') === false))) {
            console.log('[Cookie auto decline] Detected: amp-consent');
            ablehnen = ampconsent.querySelector('button[on="tap:consent-element.reject"], button[on="tap:consent.dismiss"]');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // shapepress
         const shapepress = document.querySelector('div[class="sp-dsgvo sp-dsgvo-popup-overlay not-accepted"]');
         if (shapepress && document.cookie.includes('sp_dsgvo_cookie_settings') === false) {
            console.log('[Cookie auto decline] Detected: shapepress');
            if (window.screen.availWidth >= 576) {
               ablehnen = shapepress.querySelector('a.sp-dsgvo-privacy-btn-accept-nothing');
               akzeptieren = shapepress.querySelector('a.sp-dsgvo-privacy-btn-accept-all');
            } else {
               ablehnen = shapepress.querySelector('#sp-dsgvo-privacy-footer > .d-block a.sp-dsgvo-privacy-btn-accept-nothing');
               akzeptieren = shapepress.querySelector('#sp-dsgvo-privacy-footer > .d-block a.sp-dsgvo-privacy-btn-accept-all');
            }
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // cookiesjsr
         const cookiesjsr = document.querySelector('[id$="cookiesui"] #cookiesjsr');
         if (cookiesjsr && document.cookie.includes('cookiesjsr') === false) {
            console.log('[Cookie auto decline] Detected: cookiesjsr');
            ablehnen = cookiesjsr.querySelector('button.denyAll');
            einstellungen = cookiesjsr.querySelector('.cookiesjsr-settings');
            speichern = cookiesjsr.querySelector('button.save.dialog-last-tab');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // moove_gdpr_cookie_info_bar
         const moove = document.querySelector('aside#moove_gdpr_cookie_info_bar');
         if (moove && document.cookie.includes('moove_gdpr_popup') === false) {
            console.log('[Cookie auto decline] Detected: moove_gdpr_cookie_info_bar');
            ablehnen = moove.querySelector('button.moove-gdpr-infobar-reject-btn');
            einstellungen = moove.querySelector('button.moove-gdpr-infobar-settings-btn');
            speichern = document.querySelector('#moove_gdpr_cookie_modal button.moove-gdpr-modal-reject-all');
            akzeptieren = moove.querySelector('button.moove-gdpr-infobar-allow-all');
            nureinklickeinstellungen = true;
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // cookieinformation.com
         const cookieinformationcom = document.querySelector('#coiOverlay[role="banner"][style="display: flex;"][aria-hidden="false"]');
         if (cookieinformationcom && document.cookie.includes('CookieInformationConsent') === false) {
            console.log('[Cookie auto decline] Detected: https://cookieinformation.com/');
            ablehnen = cookieinformationcom.querySelector('button#declineButton');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // cookieinfoscript.com
         const cookieinfoscriptcom = document.querySelector('.cookieinfo[style^="position: fixed; left: 0px; right: 0px; height: auto; min-height: 21px; z-index: 2147483647; "]');
         if (cookieinfoscriptcom && document.cookie.includes('CookieInfoScript') === false) {
            console.log('[Cookie auto decline] Detected: https://cookieinfoscript.com');
            ablehnen = cookieinfoscriptcom.querySelector('.cookieinfo-close');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // cookie-permission-container
         const cookiepermissioncontainer = document.querySelector('.cookie-permission-container[data-cookie-permission="true"][style="display: block;"]');
         if (cookiepermissioncontainer && document.cookie.includes('cookie-preference') === false) {
            if (window.screen.availWidth < 500) {
               document.cookie = 'cookie-preference=1;' + nc;
               beenden();
               window.location.reload();
            }
            console.log('[Cookie auto decline] Detected: cookie-permission-container');
            ablehnen = cookiepermissioncontainer.querySelector('button.btn-primary');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // mw-cookiewarning-container
         const mwcookiewarningcontainer = document.querySelector('[class="mw-cookiewarning-container"]');
         if (mwcookiewarningcontainer && document.cookie.includes('cookiewarning_dismissed') === false) {
            console.log('[Cookie auto decline] Detected: mw-cookiewarning-container');
            akzeptieren = mwcookiewarningcontainer.querySelector('form [name="disablecookiewarning"]');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // tc-privacy-wrapper
         const tcprivacywrapper = document.querySelector('#tc-privacy-wrapper.tc-privacy-wrapper.tc-privacy-override > [id$="tc_privacy"]');
         if (tcprivacywrapper && tcprivacywrapper.offsetWidth > 0 && document.cookie.includes('TC_PRIVACY') === false) {
            console.log('[Cookie auto decline] Detected: tc-privacy-wrapper');
            ablehnen = tcprivacywrapper.querySelector('button[id*="_tc_privacy_button"].tc-privacy-button:is([title="Weiter ohne Zustimmung"], [title*="blehnen"], [title="Refuse all"], [title="Continue browsing"], [title="Weiter ohne zulassen "], [title="Continue without accepting"], [aria-label*="efuse"])');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // tarteaucitronRoot
         const tarteaucitronroot = document.getElementById('tarteaucitronRoot');
         if (tarteaucitronroot && document.cookie.includes('=wait') === true) {
            console.log('[Cookie auto decline] Detected: tarteaucitronRoot');
            advancedrun = false;
            const ablehnen = tarteaucitronroot.querySelector('button[id^="tarteaucitronAllDenied2"], [onclick="tarteaucitron.userInterface.respondAll(false);"]');
            const speichern = tarteaucitronroot.querySelector('button#tarteaucitronSave');
            const einstellungen = tarteaucitronroot.querySelector('button[onclick="tarteaucitron.userInterface.openPanel();"]#tarteaucitronCloseAlert');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
                  const einstellungenschließen = tarteaucitronroot.querySelector('button#tarteaucitronBack');
                  if (einstellungenschließen) {
                     window.setTimeout(function () {
                        einstellungenschließen.click();
                     }, 200);
                  }
               }, 402);
            } else if (speichern) {
               beenden();
               window.setTimeout(function () {
                  speichern.click();
               }, 202);
            } else if (einstellungen && bereitsgeklickt === false) {
               bereitsgeklickt = true;
               window.setTimeout(function () {
                  einstellungen.click();
               }, 202);
            }
         }

         // offcanvas (shopping sites)
         const offcanvas = document.querySelector('[class^="offcanvas offcanvas-"][class$="show"][aria-modal="true"][role="dialog"]');
         if (offcanvas && offcanvas.innerText.includes('Cookies') && document.cookie.includes('cookie-preference') === false) {
            console.log('[Cookie auto decline] Detected: offcanvas (shopping sites)');
            advancedrun = false;
            const speichern = offcanvas.querySelector('button[class="btn btn-primary btn-block js-offcanvas-cookie-submit"]');
            if (speichern && (speichern.innerText.toLowerCase().includes('akzeptieren') || speichern.innerText.toLowerCase().includes('speichern'))) {
               beenden();
               window.setTimeout(function () {
                  speichern.click();
               }, 202);
            }
         }

         // eightworks-cookie-consent-plus
         const eightworkscookieconsentplus = document.querySelector('#eightworks-cookie-consent-plus[data-cookie-permission="true"], .eightworks-cookie-consent-plus[data-cookie-permission="true"]');
         if (eightworkscookieconsentplus && document.cookie.includes('reference') === false) {
            console.log('[Cookie auto decline] Detected: eightworks-cookie-consent-plus');
            findconsentintervalzahl = 502;
            findconsentintervalzahländern();
            einstellungen = eightworkscookieconsentplus.querySelector('a.cookie-permission--configure-button[href="#"]');
            speichern = eightworkscookieconsentplus.querySelector('button[class="btn btn-default js-offcanvas-cookie-submit eightworks-cookie-consent-plus-button eightworks-cookie-consent-plus-button-mod1"][title="Speichern"], a.cookie-consent--save-button');
            nureinklickeinstellungen = true;
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }
         // cc_banner-wrapper
         const ccbannerwrapper = document.querySelector('div[class="cc_banner-wrapper "] :is(div[class="cc_banner cc_container cc_container--open"], div[class="cc-banner cc_container cc_container--open"])');
         if (ccbannerwrapper && document.cookie.includes('cookieconsent_dismissed') === false) {
            console.log('[Cookie auto decline] Detected: cc_banner-wrapper');
            ablehnen = ccbannerwrapper.querySelector('a[data-cc-event="click:dismiss"]');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // transcend.io
         const transcend = document.querySelector('#transcend-consent-manager[style="position: fixed; z-index: 2147483647;"]');
         if (transcend && window.localStorage.getItem('tcmConsent') === null) {
            console.log('[Cookie auto decline] Detected: transcend.io');
            advancedrun = false;
            // Shadow Root is closed so the addon need to go this way.
            window.localStorage.setItem('tcmConsent', '{"purposes":{"SaleOfInfo":false,"Analytics":false,"Functional":true,"Advertising":false},"timestamp":"' + cookiedatum + '","confirmed":true,"prompted":true,"updated":true}');
            beenden();
            location.reload();
         }

         // ketch.com
         const ketch = document.querySelector('#ketch-modal.ketch-flex, #ketch-banner.ketch-flex, [class^="ketch-fixed ketch-z-ketch-max-z-index ketch-top-0 ketch-left-0 ketch-bottom-0 ketch-right-0"]');
         if (ketch) {
            console.log('[Cookie auto decline] Detected: ketch.com');
            ablehnen = ketch.querySelector('button:is([aria-label="Reject All"], [aria-label="Alle ablehnen"], [aria-label="DECLINE"], [aria-label="Decline All"])');
            speichern = ketch.querySelector('button:is([aria-label="Save choices"], [aria-label="Confirm My Choices"])');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // otCKAppData
         const otckappdata = document.querySelector('.otCookiesNotification > #cookies-wrapper');
         if (otckappdata && document.cookie.includes('_consentik_cookie') === false) {
            console.log('[Cookie auto decline] Detected: otCKAppData');
            ablehnen = otckappdata.querySelector('#cookies-dismiss[role="button"]');
            einstellungen = otckappdata.querySelector('#cookies-preferences[role="button"]');
            speichern = document.querySelector('#cookies-popup button.decline-btn');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // sliding-popup
         const slidingpopup = document.querySelector('div[id="sliding-popup"][class="sliding-popup-bottom"][style]');
         if (slidingpopup && document.cookie.includes('cookie-agreed=') === false) {
            console.log('[Cookie auto decline] Detected: sliding-popup');
            ablehnen = slidingpopup.querySelector('button.decline-button');
            speichern = slidingpopup.querySelector('.eu-cookie-compliance-save-preferences-button');
            akzeptieren = slidingpopup.querySelector('.agree-button');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // evidon
         const evidon = document.querySelector('#_evidon_banner, #_evidon-barrier-wrapper');
         if (evidon && evidon.offsetHeight >= 1) {
            console.log('[Cookie auto decline] Detected: evidon');
            ablehnen = evidon.querySelector('button#_evidon-decline-button, button#_evidon-barrier-declinebutton');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // axept.io
         const axept = document.querySelector('#axeptio_overlay.axeptio_mount[data-project-id]');
         if (axept && document.cookie.includes('axeptio') === true && document.cookie.includes('%2Cgoogle_analytics%2C') === false) {
            console.log('[Cookie auto decline] Detected: axept.io');
            advancedrun = false;
            const ablehnen = axept.querySelector('button#axeptio_btn_dismiss');
            let shadowroot = axept.querySelector('.needsclick');
            const einstellungen = axept.querySelector('button#axeptio_btn_configure');
            const speichern = axept.querySelector('button#axeptio_btn_next');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 402);
            } else if (shadowroot && shadowroot.shadowRoot && axept.querySelector('.needsclick').shadowRoot.querySelector('button#axeptio_btn_dismiss')) {
               shadowroot = axept.querySelector('.needsclick').shadowRoot.querySelector('button#axeptio_btn_dismiss');
               if (shadowroot) {
                  beenden();
                  window.setTimeout(function () {
                     shadowroot.click();
                  }, 402);
               }
            } else if (speichern) {
               beenden();
               window.setTimeout(function () {
                  speichern.click();
               }, 202);
            } else if (einstellungen) {
               window.setTimeout(function () {
                  einstellungen.click();
               }, 202);
            } else if (shadowroot && shadowroot.shadowRoot && axept.querySelector('.needsclick').shadowRoot.querySelector('button#axeptio_btn_configure')) {
               shadowroot = axept.querySelector('.needsclick').shadowRoot.querySelector('button#axeptio_btn_configure');
               if (shadowroot) {
                  window.setTimeout(function () {
                     shadowroot.click();
                  }, 402);
               }
            } else if (shadowroot && shadowroot.shadowRoot && axept.querySelector('.needsclick').shadowRoot.querySelector('button#axeptio_btn_next')) {
               shadowroot = axept.querySelector('.needsclick').shadowRoot.querySelector('button#axeptio_btn_next');
               if (shadowroot) {
                  let einstellungennext = window.setInterval(function () {
                     shadowroot.click();
                  }, 200);
                  window.setTimeout(function () {
                     beenden();
                     clearInterval(einstellungennext);
                  }, 3000);
               }
            }
         }

         // wordpress.com
         const wordpress = document.querySelector('#cmp-app-container iframe');
         if (wordpress && document.cookie.includes('euconsent-v2') === false) {
            console.log('[Cookie auto decline] Detected: wordpress cookie banner');
            einstellungen = wordpress.contentWindow.document.querySelector('button[class="cmp-components-button is-secondary"]');
            ablehnen = wordpress.contentWindow.document.querySelector('button[class="cmp-components-button white-space-normal is-secondary"]');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // cookiehub.com
         const cookiehub = document.querySelector('div[role="dialog"].ch2-visible.ch2-dialog, div[class="ch2-settings ch2-settings-scan ch2-visible"]');
         if (cookiehub && document.cookie.includes('cookiehub') === false) {
            console.log('[Cookie auto decline] Detected: cookiehub.com');
            einstellungen = cookiehub.querySelector('button.ch2-open-settings-btn');
            speichern = document.querySelector('div[class="ch2-settings ch2-settings-scan ch2-visible"] button.ch2-deny-all-btn');
            nureinklickeinstellungen = true;
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // xenforo.com
         const xenforo = document.querySelector('li[class="notice js-notice notice--primary notice--cookie"]');
         if (xenforo && document.cookie.includes('xf_notice_dismiss') === false) {
            console.log('[Cookie auto decline] Detected: xenforo.com');
            akzeptieren = xenforo.querySelector('a.js-noticeDismiss[href$="/account/dismiss-notice"]');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // cookiesplus-overlay
         const cookiesplusoverlay = document.querySelector('#cookiesplus-modal-container.cookiesplus-move');
         if (cookiesplusoverlay && document.cookie.includes('consent_date') === false) {
            console.log('[Cookie auto decline] Detected: cookiesplus-overlay');
            ablehnen = cookiesplusoverlay.querySelector('button.cookiesplus-reject');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // sovy.com
         const sovy = document.querySelector('#sccm');
         if (sovy && document.cookie.includes('%22consentId%22%3A%') === false) {
            console.log('[Cookie auto decline] Detected: sovy.com');
            ablehnen = sovy.querySelector('.rejectcookies');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // freeprivacypolicy.com
         const freeprivacypolicycom = document.querySelector('[id$="---nb"][aria-describedby="cc-nb-text"], #cc_dialog[aria-labelledby="cc_dialog"].cc_css_reboot');
         if (freeprivacypolicycom && document.cookie.includes('cookie_consent_user_accepted') === false) {
            console.log('[Cookie auto decline] Detected: freeprivacypolicy.com');
            nureinklickeinstellungen = true;
            ablehnen = freeprivacypolicycom.querySelector('button.cc-nb-reject');
            einstellungen = freeprivacypolicycom.querySelector('button.cc_b_cp');
            speichern = document.querySelector('#cookie-consent-preferences-centre .cc_cp_f_save > button');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // dmscookie.com
         const dmscookie = document.querySelector('#dmsCookiePopup');
         if (dmscookie && document.cookie.includes('marketing') === false) {
            console.log('[Cookie auto decline] Detected: dmscookie.com');
            akzeptieren = dmscookie.querySelector('button[onclick="dmsCookie.loadScript()"]');
            let switchesgeklickt = false;
            const switches = dmscookie.querySelectorAll('#checkboxContainer input[type="checkbox"]');
            if (switches.length > 0) {
               switchesgeklickt = true;
               for (let i = 0; i < switches.length; i++) {
                  if ((switches[i].name === 'statistics' || switches[i].name === 'marketing') && switches[i].checked === true) {
                     switches[i].click();
                  }
               }
            }
            if (switchesgeklickt === true) {
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }
         }

         // redim.de
         const redimde = document.querySelector('#redim-cookiehint-bottom, #redim-cookiehint-modal');
         if (redimde && document.cookie.includes('reDimCookieHint') === false) {
            console.log('[Cookie auto decline] Detected: redim.de');
            akzeptieren = redimde.querySelector('#cookiehintsubmit');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // ethyca.com
         const ethyca = document.querySelector('#fides-banner-container.fides-banner:not(.fides-banner-hidden), .fides-modal-container[data-testid="consent-modal"]:not([aria-hidden="true"])');
         if (ethyca && document.cookie.includes('fides_consent') === false) {
            console.log('[Cookie auto decline] Detected: ethyca.com');
            nureinklickeinstellungen = true;
            ablehnen = ethyca.querySelector('button.fides-reject-all-button');
            einstellungen = ethyca.querySelector('button.fides-manage-preferences-button');
            klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
         }

         // Volksbanken (100+ Seiten)
         const volksbanken = document.querySelector('div[class="cookie-consent  "]');
         if (volksbanken && document.cookie.includes('cookieConsent') === false) {
            console.log('[Cookie auto decline] Detected: Volksbank Seite');
            const checkbox = volksbanken.querySelector('li.cookie-consent__list__item > input#cookie-consent-komfort[type="checkbox"]');
            speichern = volksbanken.querySelector('.cookie-consent__footer button[type="submit"]:not([data-button="selectAll"])');
            if (checkbox && checkbox.checked === false) {
               window.setTimeout(function () {
                  checkbox.click();
               }, 202);
            }
            window.setTimeout(function () {
               klickecookiebutton(ablehnen, speichern, einstellungen, schließen, akzeptieren, nureinklickeinstellungen);
            }, 502);
         }

         // Advanced
         if (advancedcounter >= 5 && advancedrun === true && window.self === window.top) {
            const advancedcontainer = document.querySelectorAll(':is(div, form, dialog, section, aside, li, footer, app-cookie, cms-cookie-bar):is([class*="cookie"], [class*="Cookie"], [id*="cookie"], [id*="Cookie"], [class*="keks"], [id*="keks"], [aria-labelledby*="cookie"], [aria-labelledby*="consent"], [aria-label*="ookie"], [aria-label*="consent"], cookie-law, [class*="consent"], [id*="consent"], [class*="privacy"], [id*="privacy"], [class*="c-disclaimer"], [class*="cc_banner"], [id*="cc_banner"], [class*="cc_overlay"], [id*="cc_overlay"], [class*="cc-overlay"], [id*="cc-overlay"], [class*="gdpr"], [id*="gdpr"], [class*="dsgvo"], [id*="dsgvo"], [class^="cc-banner"], [id^="cc-banner"], [class^="cc-notification"], [id^="cc-notification"], [data-testid="consent-banner"], [cc_data]):not([style*="display: none !important"], [style*="visibility: hidden !important"], :empty, .default-layout.cookie-is-shown)');

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
               if (sichtbarkeitsprüfung(a) === true && (b === 'fixed' || b === 'sticky' || bp === 'fixed' || bp === 'sticky' || bc === 'fixed' || bc === 'sticky' || window.getComputedStyle(document.querySelector('body')).getPropertyValue('overflow') === 'hidden' || cookieattributchecker(a) === true) && a.childElementCount >= 1 && a.innerText.length > 10) {
                  const text = a.innerText.toLowerCase();
                  if (a.querySelector('a[href*="cookie"]') !== null ||
                     a.querySelector('a[href*="Cookie"]') !== null ||
                     (document.documentElement.lang && document.documentElement.lang.toLowerCase() !== 'en' && !document.documentElement.lang.toLowerCase().startsWith('en-') && text.includes('cookie')) ||
                     text.includes('wir respektieren ihre privatsphäre') ||
                     text.includes('wir schätzen ihre privatsphäre') ||
                     text.includes('cookie einstellungen') ||
                     text.includes('cookie-einstellungen') ||
                     text.includes('privatsphären-einstellungen') ||
                     text.includes('privatsphäre-einstellungen') ||
                     text.includes('wir verwenden tools,') ||
                     text.includes('verwendet cookies') ||
                     text.includes('this website uses cookies') ||
                     text.includes('this website stores cookies') ||
                     text.includes('this site uses cookies') ||
                     text.includes('uses cookies from') ||
                     text.includes('uses cookies to personalize') ||
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
                     text.includes('to improve the quality of our site') ||
                     text.includes('accept all cookies') ||
                     text.includes('Cookie instellingen') ||
                     text.includes('rejeitar cookies') ||
                     text.includes('stosujemy pliki cookies') ||
                     text.includes('ta strona korzysta z ciasteczek')) {
                     // Buttons suchen und klicken.
                     const buttons = a.querySelectorAll('button:not([disabled=""], [disabled="true"]), a:not([href*="/"]), a[href*="optOut"], a[href*="optout"], a[class*="button"], [role="button"], input[type="button"], input[type="submit"], :is([class*="dismiss"], [id*="dismiss"], [class*="preferences"], [id*="preferences"], [class*="submit"], [id*="submit"], [class*="close"], [id*="close"], [class*="reject"], [id*="reject"], [class*="decline"], [id*="decline"], [class*="mandatory"], [id*="mandatory"], [class*="accept"], [id*="accept"], [id*="ausblenden"], [class*="ausblenden"], [id*="essential"], [class*="essential"], [id*="chose_no"], [class*="chose_no"], [title*="blehnen"]):is(span, div):not(:has(button)):not(:has(input[type="checkbox"]))');
                     if (buttons.length > 0) {
                        let finalerbutton;
                        let gewichtung = 3;
                        for (let k = 0; k < buttons.length; k++) {
                           const a = buttons[k];
                           if (sichtbarkeitsprüfung(a) === true) {
                              let btn = buttons[k].innerText.toLowerCase().trim();
                              let btninput = buttons[k].value;
                              if (btninput && btn.length <= 1) {
                                 btn = btninput.toLowerCase().trim();
                              }
                              // Ablehnen
                              if ((btn.includes('ablehnen') || btn.includes('lehne') || btn.includes('nein') || btn.includes('notwendige') || btn.includes('schließen') || btn.includes('nur technisch') || btn.includes('verweigern') || btn.includes('essenzielle') || btn.includes('keine tracking-cookies') || btn.includes('nur das nötigste') || btn.includes('ohne ') || btn.includes('eingeschränkte funktionalität') || btn.includes('reject') || btn.includes('decline') || btn.includes('deny') || btn.includes('refuse') || btn.includes('disallow') || btn.includes('necassy') || btn.includes('dismiss') || btn.includes('close') || btn.includes('no thanks') || btn.includes('necessary') || btn.includes('nie akceptuję') || btn.includes('no, ') || btn.includes('no ') || btn.includes('rejeitar') || btn === 'no') && btn.length < 45) {
                                 finalerbutton = buttons[k];
                                 break;
                                 // Speichern
                              } else if ((btn.includes('einstellungen übernehmen') || btn.includes('speichern') || btn.includes('auswahl ') || btn.includes('ausgewählte') || btn.includes('keuze opslaan')) && btn.length < 45) {
                                 finalerbutton = buttons[k];
                                 gewichtung = 1;
                                 // Attributchecker für Symbol Schaltflächen
                              } else if (attributchecker(a) && gewichtung > 1) {
                                 finalerbutton = buttons[k];
                                 gewichtung = 2;
                                 // Akzeptieren
                              } else if ((btn.includes('akzeptier') || btn.includes('ich stimme') || btn.includes('zustimmen') || btn.includes('alle auswählen') || btn.includes('alles klar') || btn.includes('agree') || btn.includes('accept') || btn.includes('verstanden') || btn.includes('ausblenden') || btn.includes('erlauben') || btn.includes('nicht mehr anzeigen') || btn.includes('bestätige') || btn.includes('got it') || btn.includes('continue') || btn.includes('閉じる') || btn === 'ok' || btn === 'ein­ver­standen' || btn === 'okey' || btn === 'consent') && btn.length < 45 && gewichtung > 2) {
                                 finalerbutton = buttons[k];
                                 gewichtung = 3;
                              }
                           }
                        }
                        if (finalerbutton) {
                           const klickbutton = finalerbutton;
                           beenden();
                           window.setTimeout(function () {
                              console.log('[Cookie auto decline] Detected: Unbekannter Cookie Banner.');
                              klickbutton.click();
                           }, 202);
                        }
                     }

                  }
               }
            }
            attributchecker = function (a) {
               const attribute = a.attributes;
               for (let k = 0; k < attribute.length; k++) {
                  const v = attribute[k].value.toLowerCase().trim().toLocaleLowerCase();
                  if ((v.includes('schließen') || v.includes('close') || v.includes('dismiss') || v.includes('reject') || v.includes('disallow') || v.includes('akceptuję')) && a.innerText.length < 5) {
                     return true;
                  }
               }
            };

            cookieattributchecker = function (a) {
               const attribute = a.attributes;
               for (let k = 0; k < attribute.length; k++) {
                  const v = attribute[k].value.toLowerCase().trim().toLocaleLowerCase();
                  if (v.includes('cookie')) {
                     return true;
                  }
               }
            };
         } else {
            advancedcounter++;
         }


         if (cookiebannerfinalakzeptiertcounter >= 10) {
            beenden();
         }

         // Ende Intervall
      };

      // Spezifisch

      const regeln = [{
         seite: 'consent.google.ac,consent.google.ae,consent.google.at,consent.google.be,consent.google.bg,consent.google.by,consent.google.ca,consent.google.ch,consent.google.cl,consent.google.co.id,consent.google.co.il,consent.google.coIn,consent.google.co.jp,consent.google.co.ke,consent.google.co.kr,consent.google.co.nz,consent.google.co.th,consent.google.co.uk,consent.google.co.ve,consent.google.co.za,consent.google.com,consent.google.com.ar,consent.google.com.au,consent.google.com.br,consent.google.com.co,consent.google.com.ec,consent.google.com.eg,consent.google.com.hk,consent.google.com.mx,consent.google.com.my,consent.google.com.pe,consent.google.com.ph,consent.google.com.pk,consent.google.com.py,consent.google.com.sa,consent.google.com.sg,consent.google.com.tr,consent.google.com.tw,consent.google.com.ua,consent.google.com.uy,consent.google.com.vn,consent.google.cz,consent.google.de,consent.google.dk,consent.google.dz,consent.google.ee,consent.google.es,consent.google.fi,consent.google.fr,consent.google.gr,consent.google.hr,consent.google.hu,consent.google.ie,consent.google.it,consent.google.lt,consent.google.lv,consent.google.nl,consent.google.no,consent.google.pl,consent.google.pt,consent.google.ro,consent.google.rs,consent.google.ru,consent.google.se,consent.google.sk,consent.google.coIn',
         selector: 'div:first-child > form[action^="https://consent.google."][action$="/save"]:first-child:has(+ form:last-child) > div > div > button',
         selectormobile: 'div:first-child + div > form[action^="https://consent.google."][action$="/save"]:first-child + form:last-child > div > div > button'
      }, {
         seite: 'consent.youtube.com',
         selector: 'div > div:has(> div:only-child > button[aria-label][role="link"]) + form[action="https://consent.youtube.com/save"]:has(+ form:last-child) > div > div > button',
         selectormobile: 'div + div > form[action="https://consent.youtube.com/save"] + form[action="https://consent.youtube.com/save"]:has(+ div:last-child > div > button[aria-label][role="link"]) > div > div > button'
      }, {
         seite: 'consent.yahoo.com',
         selector: 'button.reject-all[name="reject"][value="reject"]'
      }, {
         seite: 'youtube.com',
         selector: 'tp-yt-paper-dialog#dialog div.eom-buttons.ytd-consent-bump-v2-lightbox ytd-button-renderer:first-child button[aria-label]',
         checkcookie: 'SOCS',
         noframe: true
      }, {
         seite: 'europa.eu',
         selector: '#cookie-consent-banner a[href="#refuse"].cck-actions-button',
         checkcookie: 'consent_cookies'
      }, {
         seite: 'deutsche-islam-konferenz.de,digital-fuer-deutschland.de,bvl.bund.de,auslandsschulwesen.de,bamf.de,thw.de,itzbund.de,bafin.de',
         checkcookie: 'cookiebanner',
         selector: '#cookiebanner .js-close-banner'
      }, {
         seite: 'bund.de',
         selector: '.cookie-consent__btn-wrapper > button.cookie-consent__btn.is-deny'
      }, {
         seite: 'wochenspiegelonline.de',
         selector: 'button.btn--secondary[name*="[consent][deny]"]'
      }, {
         seite: 'solinger-nachrichten.de',
         selector: '#cookie_action_close_header'
      }, {
         seite: 'chemnitz.de,ba-riesa.de,theater-chemnitz.de',
         checkcookie: 'privacylayer',
         selector: '#cc_privacy_layer button.cc_open_settings -> #cc_privacy_layer button.cc_accept_settings',
      }, {
         seite: 'transparency.meta.com',
         checkstorage: 'Session',
         selector: '[data-testid="cookie-policy-dialog"] button[data-cookiebanner="accept_button"]'
      }, {
         seite: 'meta.com',
         checkstorage: 'Session',
         selector: 'div[role="dialog"][aria-label*="ookies"] > div:first-child > div:first-child > div:first-child > div:last-child > div:first-child > div:first-child > div:first-child > div:first-child > div:first-child > div:first-child > div:first-child > div:first-child[role="button"][tabindex]'
      }, {
         seite: 'm.facebook.com',
         checkstorage: 'wd',
         selector: '[data-testid="cookie-policy-manage-dialog"] [data-cookiebanner="accept_only_essential_button"]',
         noframe: true
      }, {
         seite: 'facebook.com',
         checkstorage: 'wd',
         selector: '[role="dialog"] [tabindex="0"]:is([aria-label*="ookies"], [aria-label*="lapukus"])',
         noframe: true
      }, {
         seite: 'threads.net',
         checkstorage: 'Session',
         selector: 'div[role="dialog"] div[aria-hidden="false"] div[role="button"][tabindex="0"] + div[role="button"][tabindex="0"]'
      }, {
         seite: 'instagram.com',
         selector: 'div[style="display: flex; flex-direction: column; height: 100%; max-width: 100%;"] > button[tabindex] + button[tabindex]:not([disabled=""]), div[style="display: flex; flex-direction: column; height: 100%; max-width: 100%;"] > div:last-child > div:last-child > button:only-child:not([disabled=""])'
      }, {
         seite: 'whatsapp.com',
         checkcookie: 'wa_cb',
         selector: 'div[data-testid="wa_cookies_banner_modal"] button[data-cookiebanner="accept_button"]'
      }, {
         seite: 'linkedin.com',
         selector: '.artdeco-global-alert-action__wrapper > button[action-type="DENY"][data-control-name^="ga-cookie.consent.deny"]'
      }, {
         seite: 'office.com,microsoft.com,minecraft.net,skype.com,xbox.com',
         selector: '#wcpConsentBannerCtrl button[type="button"]:nth-of-type(2)'
      }, {
         seite: 'etsy.com',
         checkcookie: ' p=',
         selector: '[data-gdpr-consent-prompt] + div button[data-gdpr-open-full-settings] -> #gdpr-privacy-settings button[data-wt-overlay-close] -> #gdpr-privacy-settings button[data-wt-overlay-close]'
      }, {
         seite: 'rp-online.de,wz.de,ga.de',
         checkcookie: 'OptanonAlertBoxClosed',
         selector: '#consentAccept'
      }, {
         seite: 'gamestar.de',
         checkcookie: 'euconsent',
         selector: '#cmp-modal a.cmp-accept.no-link[href="#"]'
      }, {
         seite: 'forbes.com',
         selector: '[aria-label="privacy banner"] button[aria-label="Reject All"]'
      }, {
         seite: 'poco.de',
         selector: '[aria-describedby="consentbar"] button[data-purpose="cookieBar.button.accept"] + div > button'
      }, {
         seite: 'twitch.tv',
         selector: 'button[data-a-target="consent-banner-manage-preferences"] -> button[data-a-target="consent-modal-save"]',
         noframe: true
      }, {
         seite: 'roblox.com',
         checkcookie: 'RBXcb',
         selector: '#cookie-banner-wrapper button.btn-secondary-lg[type="button"]'
      }, {
         seite: 'fandom.com',
         checkcookie: 'tracking-opt-in-status',
         selector: 'div[data-tracking-opt-in-overlay] div[data-tracking-opt-in-accept]'
      }, {
         seite: 'ebay.com,ebay.de',
         selector: '#gdpr-banner .gdpr-banner-actions > button#gdpr-banner-decline',
         countdown: 1500,
         noframe: true
      }, {
         seite: 'bbc.com',
         selector: '#cookiePrompt > section.bbccookies-banner button#bbccookies-continue-button.continue-button'
      }, {
         seite: 'luna.amazon.de,luna.amazon.com,luna.amazon.co.uk,luna.amazon.it,luna.amazon.es,luna.amazon.com.tr,luna.amazon.pl',
         selector: '#cookie_consent_dialog button#item_cookie_consent_accept_button',
         checkcookie: 'com.amazon.tempo.cookies.status'
      }, {
         seite: 'amazon.de,amazon.com,amazon.co.uk,amazon.it,amazon.es,amazon.com.tr,amazon.pl',
         selector: 'form#sp-cc button#sp-cc-rejectall-link, #cos-banner input#sp-cc-rejectall-link',
         keinesichtbarkeitsprüfung: true
      }, {
         seite: 'aliexpress.com,aliexpress.us',
         checkcookie: 'u_p_s=2',
         selector: '#gdpr-new-container button.btn-more -> #gdpr-new-container button.btn-save'
      }, {
         seite: 'dan.com',
         checkcookie: 'cookie_permission',
         selector: '.cookie-banner__content .cookie-banner__content-btns button.cookie-banner__content-essential-btn[type="button"]'
      }, {
         seite: 'brightdata.com',
         checkcookie: 'brd_is_eu',
         selector: '.cookies_popup_overlay .cookies_bar_popup_btns a#brd_cookies_bar_settings[role="button"]'
      }, {
         seite: 'wall-art.de',
         checkcookie: 'cookieOptions',
         selector: '#cookieNote .cookie__buttons button#adjust-cookie-settings -> #cookieNote .cookie__buttons button#saveCookieSelection'
      }, {
         seite: 'wirkaufendeinauto.de',
         checkstorage: 'gdpr_preferences',
         selector: 'form[action="/v1/gdpr-preferences/"] div[class^="GDPRBanner-module_banner_"] [data-qa-selector="gdpr-banner-configuration-button"][role="button"] -> form[action="/v1/gdpr-preferences/"] div[class^="GDPRBanner-module_banner_"] [data-qa-selector="gdpr-banner-accept-selected-button"][role="button"]'
      }, {
         seite: 'auto.de',
         checkstorage: 'cookieConfig',
         selector: '.modalWrapper > .modalContent > .logoContainer > button.modalBtnAccept'
      }, {
         seite: '0rechner.de,0calc.com,0calc.es,0calc.fr',
         checkcookie: 'precmp',
         selector: '#precmpdialog form[action="/precmp"] button[value="deny"]'
      }, {
         seite: 'norton.com',
         checkcookie: 'SYMANTEC_ENSIGHTEN_PRIVACY_BANNER_VIEWED',
         selector: '#ensNotifyBanner button.gdpButton[onclick]'
      }, {
         seite: 'obi.de',
         checkcookie: 'obiConsent',
         selector: '.disc-cp--active[style="display: none"] button.js-disc-cp-deny-all[type="button"]'
      }, {
         seite: 'keyed.de',
         checkcookie: 'hellotrust_cookies_accepted',
         selector: '#hellotrust_cookie_popup input.htc_btn_only_necessary_checked[type="button"]'
      }, {
         seite: 'thomann.de',
         checkcookie: 'thomann_settings',
         selector: '.cookie-consent-spice button.consent-button.js-decline-all-cookies[type="button"]'
      }, {
         seite: 'lionic.com',
         checkcookie: 'cookie-box',
         selector: '#js-cookie-box .cookie-confirmation-buttons > #js-cookie-button'
      }, {
         seite: 'rehadat-recht.de',
         checkcookie: 'cookieInfo',
         selector: '#cookieDialog button#cookieButton[type="button"][onclick]'
      }, {
         seite: 'computerbase.de',
         checkcookie: 'OptanonAlertBoxClosed',
         selector: 'dialog.consent button#cookie-consent-button.js-consent-accept-button'
      }, {
         seite: 'nppes.cms.hhs.gov',
         selector: '.modal-content .modal-footer > button.btn-primary[ng-click="accept()"]'
      }, {
         seite: 'bau-tech.shop',
         checkcookie: '_cookie_consent',
         selector: '#cookie-consent .coc-accept-link.button[onclick*="cookie_consent_accept(false"]'
      }, {
         seite: 'photovoltaik4all.de',
         checkcookie: 'cookie-preference',
         selector: '.cookie-permission-container button.btn-primary'
      }, {
         seite: 'diebayerische.de',
         checkcookie: 'cookieConsent',
         selector: '#cookie-consent-layer button.js_cc-accept-custom'
      }, {
         seite: 'xnxx.com,xvideos.com',
         selector: '#disclaimer_background button#disclaimer-reject_cookies-btn[onclick]'
      }, {
         seite: 'vanille-shop.de',
         checkcookie: 'cookie-preference',
         selector: '.cookie-permission-container .cookie-permission-button > button.btn-primary'
      }, {
         seite: 'dehogerielen.be',
         checkcookie: 'CookieConsent',
         selector: '#cookieconsent-banner button.cookieconsent-banner-accept-necessary-button'
      }, {
         seite: 'humboldtforum.org',
         checkcookie: 'acceptCookie',
         selector: 'div#cookieConsent button.naked'
      }, {
         seite: 'raiffeisen-mobil.at',
         checkcookie: 'cookieconsent',
         selector: '#info-overlay button.js-declineAllCookies'
      }, {
         seite: 'filmzie.com',
         checkstorage: 'cookiesAccepted',
         selector: 'div.justify-content-between > button.btn-decline'
      }, {
         seite: 'apexlegendsstatus.com',
         checkcookie: 'cc_cookie',
         selector: '#cm #c-bns > button[type="button"]'
      }, {
         seite: 'webfleet.com',
         selector: '#cookieconsent_options button#wi-CookieConsent_Save'
      }, {
         seite: 'asialadies.de',
         checkcookie: 'ladies-cookies-overlay',
         selector: '#cookie-overlay button.cookies-decline[type="button"][onclick="submitCookieOverlay()"]'
      }, {
         seite: 'zoo-berlin.de',
         selector: '.js-cookiebar-banner .js-cookiebar-deny-btn'
      }, {
         seite: 'abo24.de',
         checkcookie: 'cmp',
         selector: '#cookie-consent button.accept-all'
      }, {
         seite: 'lolaliza.com',
         checkcookie: 'enableTracking',
         selector: '#cookie-notice a#cookie-bar-button.cookieBar_close'
      }, {
         seite: 'schleswig-holstein.de,bmbf.de,bmleh.de',
         checkcookie: 'gsbbanner',
         selector: '#cookiebanner button.confirmSelection'
      }, {
         seite: 'mustijamirri.fi',
         checkcookie: 'mfi_consent_necessary',
         selector: '#cookie_consent button#cookie_only_necessary[role="button"]'
      }, {
         seite: 'goldenstateofmind.com',
         checkcookie: '_chorus_privacy_consent',
         selector: '#privacy-consent button#privacy-consent-button[type="button"]'
      }, {
         seite: 'smythstoys.com',
         checkcookie: 'cookie-notification',
         selector: '#colorbox.cookie-popup a.cookie-manage -> #cookie-manage input[name*="ional"] -> #cookie-manage a.savePreference'
      }, {
         seite: 'seb.lv',
         checkcookie: 'SEBConsents',
         selector: '#cookiesMessage a.accept-mandatory'
      }, {
         seite: 'kocbayi.com.tr',
         checkcookie: 'CMSCookieLevel',
         selector: '.CookieConsent input.btn-approve[value="Onaylıyorum"]'
      }, {
         seite: 'dasfutterhaus.at',
         checkcookie: 'dsgvo_consent',
         selector: '.js-cookiebox .js-cookiebox-just-close-button'
      }, {
         seite: 'simoncuchillerias.com',
         selector: '.gdprModal button#accept-all-gdpr[type="button"]'
      }, {
         seite: 'expres.sk',
         checkstorage: 'cookiebar',
         selector: 'form#cookiebar button[name="reject"][type="button"]'
      }, {
         seite: 'fix-price.by',
         checkcookie: 'CookieConsent',
         selector: '.cookies button.button'
      }, {
         seite: 'europafm.com',
         checkstorage: 'acceptAll',
         selector: 'sibbo-cmp-layout a#configCmpButtonMain -> sibbo-cmp-layout a#rejectAllConsent -> sibbo-cmp-layout a#purposesNavLegInt:not([disabled])'
      }, {
         seite: 'goteborg2023.com',
         checkcookie: 'necessary_cookies',
         selector: '.cookie-popup[x-data] button#set-necessary-cookies'
      }, {
         seite: 'umicore.jp',
         checkcookie: 'CookieConsent',
         selector: '#cookieconsent-banner #cookieconsent-banner-accept-necessary-button'
      }, {
         seite: 'coqtales.com',
         checkstorage: 'fareharbor-cookie-notice-dismissed',
         selector: '#js-cookie-notice button.js-cookie-action[data-cookie-consent="true"]'
      }, {
         seite: 'check24.de',
         checkcookie: 'c24consent',
         selector: '.c24-cookie-consent-wrapper a.c24-cookie-consent-functional[onclick]'
      }, {
         seite: 'tarifcheck.de,affiliate-deals.de',
         checkcookie: 'consent',
         selector: '.modal button[data-cookie-dismiss-all]'
      }, {
         seite: 'thw-bufdi.de',
         checkcookie: 'gsbbanner',
         selector: '#cookiebanner a[class="button right close"]'
      }, {
         seite: 'bremerhaven.de',
         checkcookie: 'GDPRp',
         selector: '.cookie-banner form[action*="cookies"] > button[name="cookies_deny"]'
      }, {
         seite: 'schell.eu',
         checkcookie: 'cookieStaticdata',
         setcookie: 'cookieStaticdata=1;',
         selector: '#modalCookie button.btn-secondary.allow-all'
      }, {
         seite: 'steampowered.com,steamcommunity.com',
         selector: '#cookiePrefPopup .buttonGroup > div#rejectAllButton',
         countdown: 4502
      }, {
         seite: 'hema.com,hema.nl',
         checkcookie: 'cookieConsentSubmitted',
         selector: '.js-cookie-wall button.js-cookie-reject-btn'
      }, {
         seite: 'soluxtec.de',
         checkcookie: 'cookieconsent_status',
         selector: 'div[style="display: flex;"] > [style="position: fixed;"] div:not([class], [id]) + div > div:last-child > button'
      }, {
         seite: 'bsh-group.com',
         checkcookie: 'cookiepolicy',
         selector: '#cookie-layer button.js_decline-cookies[type="button"]'
      }, {
         seite: 'enwi-hz.de',
         checkcookie: 'cookieAgreed',
         selector: '#cookieBar button[onclick="rejectAllCookies();"]'
      }, {
         seite: 'o2.fr',
         checkcookie: 'cookie.consent.done=true',
         selector: '#cookie_popin_itsap_home button.perso -> #cookie_popin_itsap_cookies button.enregistrer'
      }, {
         seite: 'techbone.net',
         checkcookie: 'ctb_base',
         selector: '#cookie_banner button.btn-light[type="button"]'
      }, {
         seite: 'pferdekaemper.de',
         checkcookie: 'optin',
         selector: '#cookiebanner button.set_essential_cookies'
      }, {
         seite: 'fpv24.com',
         checkcookie: 'FPVCookiePolicy',
         selector: '#cookieModal button.btn-secondary[type="submit"]'
      }, {
         seite: 'cgi.com',
         checkcookie: 'cookie-agreed',
         selector: '.eu-cookie-compliance-banner button#cookie-decline-button[type="button"]'
      }, {
         seite: 'frankfurt.de',
         checkcookie: 'cookieAccepted',
         selector: '#cookieModal button#btnCookiesAcceptMandatory'
      }, {
         seite: 'rems.de',
         checkcookie: 'cookieinfosettings',
         selector: '#cookieModal button#modalclose3[type="button"]'
      }, {
         seite: 'grants.at',
         checkcookie: 'cookieconsent_status_new',
         selector: '#cookie-notice a[data-dismiss="modal"]'
      }, {
         seite: 'parliamentlive.tv',
         checkcookie: 'cookie-',
         selector: '#cookies button#cookiesReject'
      }, {
         seite: 'varusteleka.com',
         selector: '.cookie_settings_container #accept_necessary_cookies.cookie_button'
      }, {
         seite: 'simyo.nl',
         checkcookie: 'acceptCookies',
         selector: '[class^="cookie-"] a#js-cookie-btn-refuse'
      }, {
         seite: 'sozialleistungen.info',
         checkcookie: 'slinfo_cookieHash',
         selector: '#toast-container button.cookie-ok'
      }, {
         seite: 'caritasnet.de',
         checkcookie: 'privacy-options-confirmed',
         selector: '#privacy-policy-banner a.btn-decline'
      }, {
         seite: 'wetransfer.com',
         checkcookie: 'wt_privacy',
         selector: '.welcome--consent-wall button.welcome__button--decline[type="button"] -> .terms-conditions button.transfer__button'
      }, {
         seite: 'smard.de',
         checkstorage: 'smard-cookiebanner',
         selector: '.js-cookie-banner button.js-cookie-decline'
      }, {
         seite: 'allesfuerzuhause.de',
         checkcookie: 'cookiePreferences',
         selector: '#cookies-modal button[id$="_declinebtn"]'
      }, {
         seite: 'coolblue.de',
         checkcookie: 'cookie-preferences',
         selector: '.js-cookie-notification__form button[name="accept_cookie"]'
      }, {
         seite: 'gronkh.tv',
         checkstorage: 'grnk-cookies-accepted',
         selector: '.g-dialog-content grui-button[aria-label*="blehnen"]'
      }, {
         seite: 'sehen.de',
         checkcookie: 'analytics',
         selector: '.m-cookie [data-block-cookies]'
      }, {
         seite: 'lentiamo.de',
         selector: '.vc-bar-cookie button[data-cookie="0"]'
      }, {
         seite: 'haustechnikdialog.de',
         checkcookie: 'PRIVACY_SETTINGS',
         selector: '#pnlPrivacy input#ctl01_btnCookieDecline[type="button"]'
      }, {
         seite: 'weimarerland.de,weimar.de,jobcenter-blk.de',
         selector: '#gccookiemessage button#cookieSubmitButton[onclick][type="button"]'
      }, {
         seite: 'websummit.com',
         selector: '[class*="CivicCookieBanner"] .civic_cookie__buttons > button + button'
      }, {
         seite: 'google.ac,google.ae,google.at,google.be,google.bg,google.by,google.ca,google.ch,google.cl,google.co.id,google.co.il,google.coIn,google.co.jp,google.co.ke,google.co.kr,google.co.nz,google.co.th,google.co.uk,google.co.ve,google.co.za,google.com,google.com.ar,google.com.au,google.com.br,google.com.co,google.com.ec,google.com.eg,google.com.hk,google.com.mx,google.com.my,google.com.pe,google.com.ph,google.com.pk,google.com.py,google.com.sa,google.com.sg,google.com.tr,google.com.tw,google.com.ua,google.com.uy,google.com.vn,google.cz,google.de,google.dk,google.dz,google.ee,google.es,google.fi,google.fr,google.gr,google.hr,google.hu,google.ie,google.it,google.lt,google.lv,google.nl,google.no,google.pl,google.pt,google.ro,google.rs,google.ru,google.se,google.sk,google.coIn',
         checkcookie: 'SOCS',
         selector: 'div[aria-label*="oogle"] > div:last-child > span > div > div > div > div[class] > div > button[id][class][data-ved]:first-child',
         selectormobile: 'div[aria-label*="oogle"] > div:last-child > span > div > div > div > div[data-ved] > div > h1 + div + div > button[data-ved] + button[data-ved]',
         noframe: true
      }, {
         seite: 'plus.web.de,plus.gmx.net',
         checkcookie: 'consentLevel',
         selector: 'html.window-on > .window-on .row > button[data-id="reminder"]#reminder.btn-secondary',
         countdown: 1000
      }, {
         seite: 'reddit.com',
         selector: 'reddit-cookie-banner >> div.items-center > shreddit-interactable-element#reject-nonessential-cookies-button > button',
         checkcookie: 'eu_cookie'
      }, {
         seite: 'kabeleins.de,kabeleinsdoku.de,sat1gold.de,prosieben.de,sat1.de,sixx.de,prosiebenmaxx.de,joyn.de,atv.at',
         checkcookie: 'cmp-settings',
         selector: 'cmp-banner >> cmp-dialog >> cmp-button[variant="secondary"] >> button.button--secondary:not([disabled])',
         keinesichtbarkeitsprüfung: true
      }, {
         seite: 'lachainemeteo.com,lefigaro.fr',
         checkcookie: 'savedProfile',
         selector: '#appconsent > iframe >> button.button__acceptAll'
      }, {
         seite: 'startmail.com',
         checkcookie: 'cb_rejected',
         selector: '.banner button.button-secondary'
      }, {
         seite: 'furminator.net',
         checkcookie: 'cookie_layer_closed',
         selector: '#cookieLayer a.cookie-layer-settings -> #cookieDisturber input[id="group-Marketing Cookies"] -> #cookieDisturber a[onclick="checkEssentialAndSave()"]'
      }, {
         seite: 'cannabissocialclubsdeutschland.de',
         checkcookie: 'cookie_warning_dismissed',
         selector: '.widget-cookie-banner a[id$="-decline"][data-aid="FOOTER_COOKIE_DECLINE_RENDERED"]'
      }, {
         seite: 'smdv.de,voelkner.de,digitalo.de,getgoods.com',
         selector: '.reveal__overlay[style="display: block;"] button[class$="button_decline"][data-cookie_consent]'
      }, {
         seite: 'phoenix.de',
         checkstorage: 'user_anonymous_profile',
         setstoragename: 'user_anonymous_profile',
         selector: 'div[phnx-privacy-settings] button[ng-click="save(1); close()"]'
      }, {
         seite: 'call-a-pizza.de,telepizza.de',
         checkcookie: 'allow_cookies',
         selector: '.cookies_modalbox a.js_cookies_extended -> .cookies_modalbox input#functional_cookies -> .cookies_modalbox button.cookies_save_settings.js_cookies_save'
      }, {
         seite: 'lifesum.com',
         checkstorage: 'accepted-cookies',
         selector: 'div[data-focus-lock-disabled] div.mb-20 > button:last-child.mx-auto.inline-block'
      }, {
         seite: 'bundesregierung.de,bundeskanzler.de',
         checkcookie: 'cookie-banner',
         selector: '.bpa-cookie-banner button.bpa-close-button[type="button"]'
      }, {
         seite: 'bundesdrogenbeauftragter.de',
         checkcookie: 'Matomo-Analytics',
         selector: '.cookie-banner button.close-cookiebanner[data-choice="false"]'
      }, {
         seite: 'looker.de',
         checkcookie: 'setCookieHint;',
         selector: '#cookie_dialog + div button[type="button"]:first-child'
      }, {
         seite: '45grad.de',
         checkcookie: '_user_cookie_settings',
         selector: '#optin a.optin__button'
      }, {
         seite: 'jetcost.de,jetcost.com,jetcost.pt,jetcost.co.uk',
         selector: '#ck-modal-container a[href="#"]'
      }, {
         seite: 'ardutronix.de,gateway-it.com',
         selector: 'body > div[id^="elementor-popup-modal-"] a[href*="popup"][href*="settings"]'
      }, {
         seite: 'alles-mahlsdorf.de',
         selector: 'body > div[id^="elementor-popup-modal-"] button'
      }, {
         seite: 'bm-moebel-manufaktur.de',
         selector: 'body > div[id^="elementor-popup-modal-"] section section > .elementor-column-gap-no > div:last-child a[href*="popup"][href*="settings"]'
      }, {
         seite: 'brabus.com',
         checkcookie: 'cookiesConsent',
         selector: '#modal-cookie button#saveCookies'
      }, {
         seite: 'swindi.de',
         checkcookie: 'swindi-web-app-privacy-settings',
         selector: '#privacy-modal button#privacy-modal-save-recommended[type="button"]'
      }, {
         seite: 'erdinger.de',
         checkcookie: 'cConsent',
         selector: '.cookie-consent-dialog button.cp-confirmSelected'
      }, {
         seite: 'autoersatzteile.de,autoteiledirekt.de',
         checkcookie: 'clientCode',
         selector: '.popup--cookies button.cookies-popup__btn[data-cookies-refuse]'
      }, {
         seite: 'stiftungsland.de',
         checkcookie: 'essential',
         selector: 'form#cookieForm button#updateCookies'
      }, {
         seite: 'buyzoxs.de,zoxs.de',
         checkcookie: 'essential',
         selector: '#gdpr-dialog a.js-gdpr-settings -> #gdpr-dialog input#mediaSwitch -> #gdpr-dialog button#btnDeny[type="button"]'
      }, {
         seite: 'neiki.dev',
         selector: '#gdpr-cookie-message2 button#gdpr-cookie-accept',
         countdown: 702
      }, {
         seite: 'airwallex.com',
         checkcookie: 'awx_cookie_consent',
         selector: 'button[data-test="cookie-banner-accept"]'
      }, {
         seite: 'mymuesli.com',
         checkcookie: 'cookies_',
         selector: '.js-overlay button.tm-cookies-consent-save'
      }, {
         seite: 'constantin.film',
         checkcookie: 'cookie-layer-settings',
         selector: '.cookielayer a.accept-none'
      }, {
         seite: 'l-bank.de,l-bank.info',
         checkcookie: 'bm-cookies-settings-v2',
         selector: 'div[aria-labelledby="AP_cookies-dialog-title"] button#toggleCookieFunctional -> div[aria-labelledby="AP_cookies-dialog-title"] button.AP_mdf-accept',
         countdown: 1000
      }, {
         seite: 'backstagepro.de,regioactive.de',
         checkcookie: 'reject',
         selector: '#cookiescript_injected span[data-cs-show-title="cookie-script"] -> #cookiescript_injected_fsd #cookiescript_reject'
      }, {
         seite: '12xl.de,elektroversand-schmidt.de,optikplus.de,wissenschaft-shop.de',
         checkcookie: 'cookienote=set',
         selector: '#cookieSelectionForm button#adjust-cookie-settings -> #cookieSelectionForm button#saveCookieSelection'
      }, {
         seite: 'heldenlounge.de',
         checkcookie: 'cookie-preference',
         selector: '.cookie-permission-container button.btn-primary'
      }, {
         seite: 'henschel-schauspiel.de',
         checkcookie: 'ck_consent',
         selector: 'input#cconsentcheck -> #approveform a.arrlink'
      }, {
         seite: 'mediathekviewweb.de',
         checkstorage: 'allowCookies',
         selector: '#cookieModal button#cookieDenyButton'
      }, {
         seite: 'virginaustralia.com',
         checkcookie: 'virginCookiesAccepted',
         selector: '.cmp-container button#cookieAcceptanceBtn',
         countdown: 1000
      }, {
         seite: 'shellfire.de,privatevpn.com',
         checkcookie: 'CookieScriptConsent',
         selector: '#cookiescript_injected #cookiescript_reject'
      }, {
         seite: 'playretrogames.net',
         checkcookie: 'saved',
         selector: '#cookies button#cookiebutton'
      }, {
         seite: 'excellent-hemd.de',
         checkcookie: 'CONSENT_COOKIE',
         selector: '#cookieModal button.cookie-cancel'
      }, {
         seite: 'bayern.de',
         checkcookie: 'BayernMatomo',
         selector: '#cookie button#cookie-button-deact'
      }, {
         seite: 'max-academy.de',
         checkcookie: 'max-academy-CookiesAccepted',
         selector: '.MuiDialog-container button.MuiButtonBase-root + button[type="button"]'
      }, {
         seite: 'gibgas.de',
         checkcookie: 'gibgas',
         selector: '#cookies_consent button#btnSave[onclick]',
         countdown: 500
      }, {
         seite: 'handyhuellen.de',
         checkstorage: 'mage_consent',
         selector: '#consent a[href="consent/data/preferences"] -> #consent a[href="#save"]'
      }, {
         seite: 'kevag-telekom.de',
         selector: '#fullScreenLockBlockOverlayKp .notConfirmKp'
      }, {
         seite: 'phase-6.de',
         checkcookie: 'GDPR',
         selector: 'button#noCookies[onclick*="setGdprCookieRequired"]',
         countdown: 1002
      }, {
         seite: 'ninibela.de',
         checkstorage: 'cookies-selected',
         selector: '[data-nosnippet] [data-gi-selector="reject-all-cookies"] > a'
      }, {
         seite: 'reifen-4x4.de',
         checkcookie: 'PrestaShop-49722c247d445ea6ad5f50ec8153945a',
         selector: '#acb-deny-all-button'
      }, {
         seite: 'frischteigwaren-huber.de',
         checkstorage: 'privacyNote',
         setstoragename: 'privacyNote',
         setstoragecontent: 'true',
         selector: '[data-overlay="privacy"] button'
      }, {
         seite: 'campusjaeger.de',
         checkcookie: 'CONSENT',
         selector: '[data-test="cookie-consent-modal"] button[type="button"] -> [data-test="cookie-consent-modal"] > div > div:nth-last-of-type(2) button[type="button"]'

      }, {
         seite: 'hokify.de,hokify.at',
         checkstorage: 'accept-cookies',
         selector: '[data-modal="cookieBannerModal"] button + button'
      }, {
         seite: 'managerohnegrenzen.de',
         checkcookie: 'cookie_policy_settings',
         selector: '.mog-cookie-modal__footer > button'
      }, {
         seite: 'nova-motors.de',
         checkcookie: 'amcookie_allowed',
         selector: '#am-cookie-bar button.ambar-btn-accept'
      }, {
         seite: 'schaedlingskunde.de',
         checkcookie: 'cookieconsent',
         selector: '#cookie-biter .allow-cookies-btn'
      }, {
         seite: 'destatis.de',
         checkcookie: 'gsbbanner',
         selector: '#cookiebanner button.rejectAll'
      }, {
         seite: 'tv2.no',
         checkcookie: 'tv2samtykke',
         selector: '#cookie-banner button.cookie-banner__button'
      }, {
         seite: 'modell-werkstatt.de',
         checkcookie: 'CookieConsent',
         selector: '#cookie-manager-window button#accept-selected'
      }, {
         seite: 'webnode.com',
         checkcookie: 'essential',
         setcookie: 'ac={"essential":true,"functional":false};',
         selector: '.w-cookie-bar a.w-cookie-bar-close'
      }, {
         seite: 'lemonde.fr',
         checkcookie: 'euconsent',
         selector: '.gdpr-lmd-wall button.gdpr-lmd-button'
      }, {
         seite: 'wikihow.com',
         checkcookie: 'gdpr_accept',
         selector: '#gdpr #gdpr_accept',
         setcookie: 'gdpr_cpp_opt_out=1;',
      }, {
         seite: 'cointernet.com.co',
         checkcookie: 'opt-out',
         selector: '.cookie-message a.cookie-turn-off'
      }, {
         seite: 'alibaba.com',
         checkcookie: 'opt-out',
         selector: '#GDPR-cookies-notice .gdpr-reject-btn[onclick*="reject"]'
      }, {
         seite: 'abc.net.au',
         checkcookie: 'trackingconsent',
         selector: 'div[class^="CookieBanner_"] button[data-component="CookieBanner_AcceptABCRequired"]'
      }, {
         seite: 'instructables.com',
         checkcookie: 'OPTOUTMULTI_REF',
         selector: '.adsk-gdpr-content button#adsk-eprivacy-privacy-decline-all-button',
         countdown: 4800
      }, {
         seite: 'nbcnews.com',
         checkcookie: 'show_gdpr_consent_messaging',
         selector: 'body #cx_bottom_banner > button#cx_button_close'
      }, {
         seite: 'canva.com',
         checkcookie: 'CTC',
         selector: 'div[class][role="dialog"][aria-modal="false"][aria-labelledby=":r0:"][aria-describedby=":r1:"] button + button[type="button"]'
      }, {
         seite: 'oup.com',
         checkcookie: 'oup-cookie',
         selector: '#cookieMessage_content a.cookiepolicycontinue'
      }, {
         seite: 'rt.com',
         checkcookie: 'rt-cb-approve',
         selector: '.js-cookies-banner a.js-cookies-button'
      }, {
         seite: 'reg.ru',
         checkcookie: 'cookieAgree',
         selector: '.b-policy-info button.b-policy-info__button'
      }, {
         seite: 'ionos.de',
         checkcookie: 'PRIVACY_CONSENT',
         selector: '.privacy-consent--modal button#confirmSelection'
      }, {
         seite: 'frontline.de',
         checkcookie: 'it_eprivacy_ah-_essential',
         selector: '#it-eprivacy-root button#it-eprivacy-banner-btn-decline'
      }, {
         seite: '123rf.com',
         checkcookie: 'agreed_c',
         selector: 'button#AgreementBanner-accept-button'
      }, {
         seite: 'worldbank.org',
         checkcookie: 'consent_cookie',
         selector: '#cookieconsentpopup button.accept-consent'
      }, {
         seite: 'wisc.edu',
         checkcookie: 'uw_madison_cookieconsent_timestamp',
         selector: '#cookieconsent-window button#cookieconsent-dismiss'
      }, {
         seite: 'safety.google,opensource.google,developers.google.com,cloud.google.com,web.dev,android.com,research.google,blog.google',
         checkstorage: 'glue.CookieNotificationBar',
         selector: '.glue-cookie-notification-bar button.glue-cookie-notification-bar__accept'
      }, {
         seite: 'xing.com',
         checkcookie: 'userConsent',
         selector: 'button#consent-settings-button -> button.consent-banner-button-accept-overlay'
      }, {
         seite: 'jobcenter-ge.de',
         checkcookie: 'cookie_consent',
         selector: '#cookieDialog button[aria-label*="uswahl"]'
      }, {
         seite: 'staedteregion-aachen.de',
         checkcookie: 'cookieConsent',
         selector: '.dbayCookieSelect a.cookieSelectAccept'
      }, {
         seite: 'bonn.de,offenbach.de',
         checkcookie: 'cookies-accepted',
         selector: '.SP-ConsentBanner button.SP-ConsentBanner__button--onlyNecessary'
      }, {
         seite: 'jobcenter-oberhausen.de',
         selector: '.contao-cookiebar .cc-groups > div:last-child > input -> .contao-cookiebar button.save'
      }, {
         seite: 'amt-nordstormarn.de',
         checkcookie: 'ikiss-cookie-msg',
         selector: '#cookie-message button#cookie-message-btn'
      }, {
         seite: 'jobcenter-muenchen.de',
         checkcookie: 'jcm-disclaimer',
         selector: '.disclaimer-content button.save'
      }, {
         seite: 'team-arbeit-hamburg.de',
         checkcookie: 'tah-disclaimer',
         selector: '.disclaimer-content-2 button.save'
      }, {
         seite: 'jc-frankfurt.de',
         checkstorage: 'consent',
         selector: '.cookie-notice button.cn-decline'
      }, {
         seite: 'jobcenter-hallesaale.de,cc19.de',
         checkstorage: 'cookieSettings',
         selector: '#cookieSettingsDialog .cm-cookie-content-button--save'
      }, {
         seite: 'jobcenter-vorderpfalz-ludwigshafen.de',
         selector: '#uc-main-banner button#uc-btn-deny-banner'
      }, {
         seite: 'jobcenter-stadt-kassel.de',
         checkstorage: '_bnr',
         selector: '.cookies-container button#cookies-save-btn'
      }, {
         seite: 'jobcenter-lippe.de',
         checkcookie: 'cms_cookies_saved',
         selector: 'cms-container cms-button[role="button"][value="accept"]'
      }, {
         seite: 'jobcenter-stade.de',
         checkstorage: 'cookie_consent',
         selector: '#cookie-consent .cc_banner__footer > div:last-child button[class="cc_btn"]'
      }, {
         seite: 'jobcenter-augsburger-land.de',
         checkcookie: 'reDimCookieHint',
         setcookie: 'reDimCookieHint=1;',
         selector: '#redim-cookiehint #cookiehintsubmit'
      }, {
         seite: 'wuppertal.de,kassel.de,remscheid.de',
         checkcookie: 'cookies-accepted',
         selector: '.SP-CookieUsageNotification button.SP-CookieUsageNotification__ok'
      }, {
         seite: 'jobcenter-mk.de',
         checkcookie: 'cms_cookies_saved',
         selector: 'div[data-cms-id] button[value="accept"]'
      }, {
         seite: 'jobcenter-gelsenkirchen.de',
         checkcookie: 'cms_cookies_saved',
         selector: '.mod_cms_accept_tags button[value="accept"]'
      }, {
         seite: 'itzehoe.de',
         checkcookie: 'communiceMatomo',
         selector: '#privacy-container #matomo-btn-decline -> #communice-cookiebar #cookiebar-btn-understand'
      }, {
         seite: 'mannheim.de',
         checkcookie: 'cookie-agreed',
         selector: '.eu-cookie-compliance-banner button.decline-button'
      }, {
         seite: 'tauberbischofsheim.de,winnenden.de',
         checkcookie: 'accepted',
         selector: '#cookie-bar a.cb-enable[href=""]'
      }, {
         seite: 'dortmund.de',
         checkcookie: 'showCookieNote',
         selector: '#cookieNoteBox button.btn-success[type="button"]'
      }, {
         seite: 'radebeul.de',
         checkcookie: 'acceptedBanner',
         selector: '#cookiebanner button.cookiebutton[onclick="set_cookie(false)"]'
      }, {
         seite: 'belgernschildau.de',
         checkcookie: 'cookieconsent',
         selector: '.cc_banner #cc_btn_decline'
      }, {
         seite: 'stadt-eisenberg.de',
         checkcookie: 'Consent',
         selector: '.cookieconsent button.cookie-reject-all'
      }, {
         seite: 'goettingen.de',
         checkcookie: 'nolis_cookiedough',
         selector: '.nolis-cookie-consent-button button.secondary-button'
      }, {
         seite: 'mein-digiport.de',
         checkcookie: 'COOKIE_SUPPORT',
         selector: '#_com_comundus_cookies_CookieBanner_cookieConsentForm button#_com_comundus_cookies_CookieBanner_acceptEssentialCookies'
      }, {
         seite: 'gera.de',
         checkcookie: 'CookieConsent',
         selector: '.cookie-banner button[aria-label*="notwendig"]'
      }, {
         seite: 'solingen.de',
         checkcookie: 'CookieConsent',
         selector: '.CookieBanner button.OptionsButton'
      }, {
         seite: 'strafverteidiger-berlin.info',
         checkstorage: 'publii-gdpr-allowed-cookies-v1',
         selector: '.pcb button.pcb__btn--reject'
      }, {
         seite: 'retol.de',
         checkcookie: 'cookie-preference',
         selector: '.cookie-permission-container .js-cookie-configuration-button > button -> .offcanvas-cookie button.js-offcanvas-cookie-submit',
      }, {
         seite: 'fertighauswelt.de',
         checkcookie: 'cb-enabled',
         selector: 'div > #cookie-consent-title + div + div > button + button'
      }, {
         seite: 'fingerhaus.de',
         checkcookie: 'omCookieConsent',
         selector: '#cookieBannerFH button[data-omcookie-panel-save="min"]'
      }, {
         seite: 'kampa.de',
         checkcookie: 'essenziell',
         selector: '.mhp8-popup-modal #save[title*="ookies"]'
      }, {
         seite: 'emailnator.com',
         checkstorage: 'cookie',
         selector: '#cookie-notice button#accept-cookies-usage'
      }, {
         seite: 'tk.de',
         checkcookie: 'tkConsentNutzergerechteGestaltung',
         selector: '.g-consentmanager a[data-tk-trackaction*="estätigen"]'
      }, {
         seite: 'vdek.com',
         checkcookie: 'consent_gkv',
         selector: '#datenschutz-consent #consent_selectbutton'
      }, {
         seite: 'kkh.de',
         checkstorage: 'kkh-cookieConsent',
         selector: '#cookieModal button#cookiebar-safe-settings',
         countdown: 500
      }, {
         seite: 'get-in-it.de',
         checkstorage: 'Get_CookieConsent',
         selector: '[class*="CookieConsentWidget_opened"] button[class*=" CookieConsentMainScreen_reject"]'
      }, {
         seite: 'commerzbank.de',
         checkcookie: 'cmp_PUK',
         selector: '.cookiebox--landing button#denyAll'
      }, {
         seite: 'innn.it',
         checkcookie: 'cookieConsent',
         selector: '#cookieConsentModal + div button[class="btn btn-outline-light w-100"]'
      }, {
         seite: 'gutiq.com',
         checkstorage: 'utiqCookieAcknowledged',
         selector: '.cookie-consent #closeCookieDialog'
      }, {
         seite: 'gamechampions.com',
         checkcookie: 'cookieconsent_status',
         selector: '.cookiebar__wrapper button.cookie__allow'
      }, {
         seite: 'xenvn.com',
         checkcookie: 'xf_notice_dismiss',
         selector: '.notice-content a.js-noticeDismiss'
      }, {
         seite: 'abuseipdb.com',
         checkcookie: 'hasConsent',
         selector: '#cookies-eu-banner button#cookies-eu-reject'
      }, {
         seite: 'bundesfinanzministerium.de',
         checkcookie: 'cookie-banner',
         selector: '.bhh-cookie-banner button.bhh-cookie-banner__btn--close'
      }, {
         seite: 'mediamarkt.de,saturn.de',
         checkcookie: 'pwaconsent',
         selector: '[data-test="mms-privacy-layer"] button[data-test="pwa-consent-layer-deny-all"]'
      }, {
         seite: 'billiger.de',
         checkcookie: 'cookie-banner',
         selector: '#cookie-banner-overlay .open-cookie-options -> #cookie-options [data-econda-marker*="AcceptSelectionClick"]'
      }, {
         seite: 'cyberscan.io',
         checkcookie: 'cs-cookie',
         selector: '.cs-cookie-box button#selected-cookies'
      }, {
         seite: 'secutain.com',
         checkcookie: 'consent',
         selector: '.ddmcm-wrapper button#ddmcm-button-selected'
      }, {
         seite: 'canyon.com',
         checkcookie: 'CanyonCookieSeen',
         selector: '.cookiesModal .js-saveCookiesChoice.button--secondary'
      }, {
         seite: 'kaspersky.com',
         checkstorage: 'areCookiesAccepted',
         selector: 'button[class*="CookiesAccept_acceptButton"]'
      }, {
         seite: 'verivox.de',
         checkstorage: 'uc_gcm',
         selector: 'button.gdpr-deny-all',
         countdown: 1200
      }, {
         seite: 'futurezone.at',
         checkcookie: '__pid',
         selector: '.consentOverlay button',
         countdown: 1500
      }, {
         seite: 'robert-thomas.de',
         checkcookie: 'cookieAllow',
         selector: '.cookie--consent button#cookie--consent_confirm'
      }, {
         seite: 'klarna.com',
         checkstorage: 'FIRST_LOAD',
         selector: 'body > #root > div:only-child > div:last-child > div:last-child > div:last-child > div[style*="z-index"]:first-child + button + button[style]'
      }, {
         seite: 'beastcom.eu',
         checkstorage: 'wbkConsent',
         selector: '#wbk-consentbanner button[data-btn="reject"]'
      }, {
         seite: 'solitaire-home.com',
         selector: '.o-cookielaw button.js-deny'
      }, {
         seite: 'delta21.de',
         checkstorage: 'cookie',
         selector: '#cdk-overlay-0 button.cookie-settings-submit'
      }, {
         seite: 'moemax.de',
         selector: '[aria-describedby="consentbar"] button[data-purpose="cookieBar.button.accept"] + div button'
      }, {
         seite: 'scaleway.com',
         selector: 'body:is([style="overflow: hidden;"], [style="overflow-y: hidden;"]) #portal > div > div > div > div + div > div > div > button:first-child[class^="sc-"]'
      }, {
         seite: 'ga.de,saarbruecker-zeitung.de',
         checkcookie: 'Optanon',
         selector: 'custom-card #consentAccept'
      }, {
         seite: 'movistar.es',
         checkcookie: 'OptanonAlertBoxClosed',
         selector: '#cookies-bar-component button[aria-label*="Rechazar cookies opcionales"]'
      }, {
         seite: 'kicker.de',
         checkcookie: 'kickerQM',
         countdown: 1000,
         selector: '#kick__pur a[onclick="ov.cmp.acceptAllConsents()"]'
      }, {
         seite: 'truckscout24.de',
         checkcookie: 'confirmed%22%3Afalse',
         sonderfall: 'truckscout24de'
      }, {
         seite: 'hansapark.de',
         checkcookie: 'cookieManager',
         selector: '#cookie-manager button#btnUebernehmen'
      }, {
         seite: 'domains-anonymizer.com',
         checkcookie: 'cookieConsentAgree',
         selector: '.cookie-consent button[onclick^="createCookieInfo"]'
      }, {
         seite: 'norberteder.com',
         checkcookie: 'cookielay',
         selector: '#cookielay [data-cookielay-allow="custom"]'
      }, {
         seite: 'hmd.com',
         checkcookie: 'GCString',
         selector: '#cmp-modal button#modalRejectAllFirstLayerBtn'
      }, {
         seite: 'energie-experten.ch',
         checkcookie: 'true%2C%22consentMarketing',
         selector: '.fd-consent-main button#fd-unCheckAll'
      }, {
         seite: 'kleinwindanlagen.de',
         checkcookie: 'kwindanl_cn',
         selector: '#annoyingeucookiemsg button.uk-button-success'
      }, {
         seite: 'heimbrock-winkler.de',
         checkcookie: 'legalweb_cookie_settings',
         selector: '.sp-dsgvo.not-accepted button.sp-dsgvo-privacy-btn-accept-nothing'
      }, {
         seite: 'hylo.at',
         checkcookie: 'HyloCareCookie',
         selector: '#cookiebanner-wrap .cookiebanner-form__button[data-cookiebanner-action="save"]'
      }, {
         seite: 'atu.de',
         checkcookie: 'TC_PRIVACY',
         selector: '#popin_tc_privacy button#popin_tc_privacy_button'
      }, {
         seite: 'geforcenow.com',
         checkcookie: 'TC_PRIVACY',
         selector: '#mat-dialog-0 button[mat-raised-button]'
      }, {
         seite: 'gas.info',
         checkcookie: 'Tracking',
         selector: '.jwCOWidget button.jwOptinBtnDeny'
      }, {
         seite: 'ebayinc.com',
         selector: '.phs-cookie-popup-area button.primary-button'
      }, {
         seite: 'torsten-herbst.de',
         checkcookie: 'cookie-agreed',
         selector: 'form[id^="uv-gdpr-cconsent-all-form"] input[id^="edit-submit"]'
      }, {
         seite: 'swhd.de',
         checkcookie: 'HRCookieManager',
         selector: '.consent-banner button[onclick*=", false, true, ["]'
      }, {
         seite: 'stahl-online.de',
         checkcookie: 'confirmed%22%3Atrue',
         selector: '.phunk-cookie-modal input[value="Speichern"]'
      }, {
         seite: 'sfc.com',
         checkcookie: 'consent',
         selector: '#consent #consent-onlytech'
      }, {
         seite: 'vontobel.com',
         checkcookie: 'Cconsent:true',
         selector: '[data-disclaimer-attributes] button.functional-only'
      }, {
         seite: 'augsburger-allgemeine.de,mainpost.de',
         checkstorage: 'SDGIds',
         selector: '#pur_layer button#pgwl_pur-option-accept-button'
      }, {
         seite: 'tvo.fi',
         checkstorage: 'accept-cookies',
         selector: 'jaettu-evastekysely button[data-action="accept-mandatory-cookies"]'
      }, {
         seite: 'liveramp.com',
         selector: '#ketch-banner button[aria-label="Reject All"]'
      }, {
         seite: 'dgppn.de',
         checkcookie: 'cookieConsent',
         selector: '#modal-cookie button#saveCookies'
      }, {
         seite: '3djake.de',
         checkcookie: 'cnstinf',
         selector: '.tc-banner button[value="deny_all"]'
      }, {
         seite: 'xxxlutz.de',
         checkstorage: 'last_cmp_version',
         selector: '[aria-describedby="consentbar"] button[data-purpose="cookieBar.button.accept"] + div > button[type="button"]'
      }, {
         seite: 'ihk-muenchen.de',
         selector: '#cookie-banner button[onclick="declineMatomoConsent()"]'
      }, {
         seite: 'wasserstoff-sicherheit.de',
         checkcookie: 'ckies_cloudflare',
         selector: '[data-gi-selector="reject-all-cookies"] > a'
      }, {
         seite: 'safety.google,opensource.google,developers.google.com,cloud.google.com,web.dev',
         selector: '#glue-cookie-notification-bar-1 button.glue-cookie-notification-bar__accept'
      }, {
         seite: 'ok.ru',
         selector: '[data-module="cookieBanner"] button.cb_setup -> input[name="button_save_choice"]',
         checkcookie: 'PRIVACY'
      }, {
         seite: 'americanexpress.com',
         selector: '#glue-cookie-notification-bar-1 button.glue-cookie-notification-bar__accept',
         checkcookie: 'CookieConsent'
      }, {
         seite: 'aachener-zeitung.de',
         selector: '[class^="zweiwegen-model-dialog_consentDialog"] button[data-testid="zweiwegen-accept-button"]',
         checkcookie: 'euconsent-v2'
      }, {
         seite: 'stepstone.de',
         selector: '#GDPRConsentManagerContainer #ccmgt_explicit_preferences -> #GDPRConsentManagerContainer #ccmgt_preferences_reject',
         checkcookie: 'CONSENTMGR'
      }, {
         seite: 'idnes.cz',
         selector: 'a[href="javascript:Didomi.setUserAgreeToAll();"]',
         countdown: 500,
         checkcookie: 'euconsent-v2'
      }, {
         seite: 'incogni.com',
         selector: '[class^="CookieConsent_cookieConsent"] button[data-testid="cookie-consent-left"] -> [class^="CookieConsent_cookieConsent"] button[data-testid="cookie-consent-right"]'
      }, {
         seite: 'atresplayer.com',
         selector: 'sibbo-cmp-layout #acceptAllMain',
         checkcookie: 'euconsent'
      }, {
         seite: 'rolandgumpert.com',
         selector: '.cookie a.hide',
         checkstorage: 'cookie_consent_202008181030'
      }, {
         seite: 'paypal.com',
         selector: '#gdprCookieBanner button#bannerDeclineButton.gdprCookieBanner_decline-button',
         checkcookie: 'tcs'
      }, {
         seite: 'datadoghq.com',
         selector: '#consent-banner button#truste-consent-required',
         checkcookie: 'cmapi_cookie_privacy'
      }, {
         seite: 'statistikportal.de',
         selector: '.eu-cookie-compliance-banner button.agree-button.eu-cookie-compliance-default-button',
         checkcookie: 'cookie-agreed'
      }, {
         seite: 'filter-direkt.de',
         selector: '.cookie-bar button[data-testing="cookie-bar-save"]',
         checkcookie: 'necessary'
      }, {
         seite: 'huk.de',
         selector: '.cookie-consent button.cookie-consent__button--primary + button.cookie-consent__button--secondary',
         checkcookie: 'consent_version'
      }, {
         seite: 'smart.com',
         selector: '#cookie-pro-dialog button#cookie-pro-info-button',
         checkcookie: 'OptanonAlertBoxClosed'
      }, {
         seite: 'hit-touristik.de',
         selector: '[class^="CookiesInfo__BtnWrapper"] > button + button',
         checkcookie: 'acceptCookies'
      }, {
         seite: 'windtech-international.com',
         selector: '#eu_cookies button.button_cookie',
         checkcookie: 'windtech'
      }, {
         seite: 'proidee.de',
         selector: '#COOKIE_EINSTELLUNG_BANNER a[onclick*="sendCookieData(false"]'
      }, {
         seite: 'dropbox.com',
         selector: '#ccpa-iframe-theme-provider button#decline_cookies_button'
      }, {
         seite: 'euractiv.de',
         selector: '#termly-code-snippet-support button.t-declineButton'
      }, {
         seite: 'kraemer.de',
         selector: '#consentLayer button[onclick="openConsentSettings();"] -> #consentLayer button[onclick="uncheckAllCheckboxes();"]',
         checkcookie: 'websale_useragreement_optoutunchecked_consentAll'
      }, {
         seite: 'pflanzenforschung.de',
         selector: '#eucookielaw a.acceptclose',
         checkcookie: 'eucookie'
      }, {
         seite: 'mia-moebel.de',
         selector: '#modal-consentmanager #cm-settings-open -> #modal-consentmanager-extended #cm-save-settings',
         checkcookie: 'consent',
         countdown: 300
      }, {
         seite: 'medpets.de',
         selector: '[ref="cookie-modal"] .gtm-button-deny-cookies-all-pages',
         checkcookie: 'op_tracking'
      }, {
         seite: 'pons.com',
         selector: '#feature-guard button[data-e2e="pure-accept-ads"]',
         checkcookie: 'OTAdditionalConsentString'
      }, {
         seite: 'lebegesund.de',
         selector: 'lgv-cookie-manager button[data-cookie-save="technical"]',
         checkcookie: 'cookiePreferences'
      }, {
         seite: 'justiz.de',
         selector: '[data-testid="cookie-banner"] button[data-testid="decline-cookie"]',
         checkcookie: 'gdpr-consent'
      }, {
         seite: 'kratzbaumland.de',
         selector: '#cookiesplus-form button.cookiesplus-reject',
         checkcookie: 'DISPLAY_MODAL'
      }, {
         seite: 'cecil.de',
         selector: '.cookie-consent-mini button[data-testid="cookiesLocators_OnlyNecessary"]',
         checkcookie: 'cbrConsent'
      }, {
         seite: 'jbl.de',
         selector: '.uim a.approve-none[aria-label="Nur unbedingt erforderlich"]'
      }, {
         seite: 'programmablesearchengine.google.com',
         selector: '#cookieBar a.cookieBarConsentButton[role="button"]',
         checkstorage: 'cookieConsent'
      }, {
         seite: 'rs-online.com',
         selector: '[aria-label="Consent Banner"] button#rejectAll',
         checkstorage: 'RSCOMPONENTS'
      }, {
         seite: 'nokia.com',
         selector: '.eu-cookie-compliance-banner button.eu-cookie-compliance-reject-button',
         checkcookie: 'cookie-'
      }, {
         seite: 'uptodown.com',
         selector: '#cookiescript_injected_wrapper #cookiescript_reject',
         checkcookie: 'consenttime'
      }, {
         seite: 'gotha.de',
         selector: '#gccookiemessage button#cookieSubmitButton',
      }, {
         seite: 'lightinthebox.com',
         selector: '#get-cookie-prompt button.get-cookie-reject'
      }, {
         seite: 'maverton.de',
         selector: '#cookiebox button#cookiebox-btn-discard-all',
         checkstorage: 'cookiebox-consent-selection'
      }, {
         seite: 'amiunique.org',
         selector: 'div[class="v-snack v-snack--active v-snack--bottom v-snack--has-background"] button[class="mr-2 v-btn v-btn--is-elevated v-btn--has-bg v-btn--rounded theme--dark v-size--default"]:first-child:has(+ button:last-child)',
         checkcookie: 'cookie_notice'
      }, {
         seite: 'moderne-hausfrau.de',
         selector: 'dialog > div:last-child > section:only-child > div[class=""]:first-child + div:last-child > div > div:last-child > div:only-child > div:last-child > p#c1-more-info -> dialog > div:last-child > section:only-child > div[class=""]:first-child + div:last-child > div:only-child > div:only-child > .px-4 > div + div[class="group h-full"] > div:only-child > button#accordion-header-interesse > div > section -> dialog > div:last-child > section:only-child > div[class=""]:first-child + div:last-child > div:only-child > div:only-child > div:last-child  > div:only-child > button#c2-accept-selection',
         checkcookie: 'userInteracted%22%3Atrue',
      }, {
         seite: 'fixline-kitchen.de',
         selector: '#banner-wrapper p#essential_accept',
         countdown: 1000,
         checkcookie: 'GDPR_LC_Version'
      }, {
         seite: 'lotto24.de,tipp24.de',
         selector: 'button[data-element-id="cookieConsentPromptOverlay.functionalOnlyButton"]',
         checkcookie: 'cookieConsentDisclaimer'
      }, {
         seite: 'tellows.de',
         selector: '#cmpscreen a#btnconsent.btn-success',
         checkcookie: 'euconsent-v2'
      }, {
         seite: 'single.infranken.de',
         selector: '#ccp-overlay button#ccp-accept-all-btn'
      }, {
         seite: 'ing.de',
         selector: 'ing-cc-manager >> ing-dialog-frame > ing-cc-dialog-level0 >> ing-button.cc-l0__button__more',
         noframe: true
      }, {
         seite: 'wp.pl,money.pl,o2.pl,parenting.pl,pudelek.pl,autokult.pl,gadzetomania.pl,fotoblogia.pl,komorkomania.pl,polygamia.pl,abczdrowie.pl,benchmark.pl,kafeteria.pl,pysznosci.pl,dobreprogramy.pl,genialne.pl,autocentrum.pl,jastrzabpost.pl,deliciousmagazine.pl',
         selector: 'body > div[class] > style[data-id="wpcss"]:first-child + div:last-child > div:last-child > div:last-child > div:only-child > button:first-child -> body > div[class] > style[data-id="wpcss"]:first-child + div:last-child > div:last-child > div > div:last-child > button:first-child',
         checkcookie: '__vads'
      }, {
         seite: 'deepl.com',
         selector: '[aria-labelledby="CondensedStrictBanner-header"] button[data-testid="cookie-banner-strict-accept-all"]',
         checkcookie: 'privacySettings'
      }, {
         seite: 'movieplayer.it',
         selector: '#cl-consent a.cl-consent-node-a[data-role="b_options"] -> #cl-consent a.cl-consent-node-a[data-role="b_save_all"]'
      }, {
         seite: 'gas-h2.de',
         selector: '.jwCOWidget .jwOptinBtnAcceptAll + .jwOptinBtnAccept + button.jwOptinBtnDeny',
         checkcookie: 'jwMautic'
      }, {
         seite: 'ilmessaggero.it',
         selector: '#cmp_consent_wall a.accept[onclick="cmpConsentWall.acceptAllCookies()"]'
      }, {
         seite: 'mydealz.de',
         selector: '.popover-content button[data-t="showCookiesSettings"] -> .popover-content button[data-t="rejectAll"]',
         checkcookie: 'cookie_policy_agreement'
      }, {
         seite: 'assets.poool.fr',
         selector: '#app .p3-widget-consent > :not(.p3-d-xl-none) .consent-action > .p3-button-wrapper > button.p3-unlock-button + button'
      }, {
         seite: 'nature.com',
         checkcookie: '26C%3DC01%26D%3Dtrue',
         selector: '.cc-banner button.cc-banner__button-reject'
      }, {
         seite: 'dsisolar.com',
         selector: '#wmkcprivacy em[title*="eject"]'
      }, {
         seite: 'hvv.de',
         checkcookie: 'cookieBanner',
         selector: 'div[data-options*="cookieBanner"] button.js-f-cookie-banner-button'
      }, {
         seite: 'mercedes-benz.de',
         selector: 'cmm-cookie-banner >> .button--only-technically-necessary'
      }, {
         seite: 'wise.com',
         checkcookie: 'twCookie',
         selector: '#twcc__mechanism button#twcc__decline-button'
      }, {
         seite: 'comdirect.de',
         checkcookie: 'consent',
         selector: '#privacy-init-wall button#privacy-init-wall-button-deny'
      }, {
         seite: 'nah.sh.hafas.de',
         checkcookie: 'consent',
         selector: '#HFS_CookieHint button#HFS_CookieSelectChoice'
      }, {
         seite: 'apkpure.com',
         checkcookie: 'apkpure__policy_review',
         selector: '#policy-info [dt-eid="only_necessary_cookies"]'
      }, {
         seite: 'nico-europe.com',
         checkcookie: 'allowCookie',
         selector: '.pea_cook_wrapper button#pea_cook_btn'
      }, {
         seite: 'ao.com',
         checkcookie: 'AOCookieRequestReference',
         selector: '[data-tag-section="cookie_banner_modal"] button[data-testid="cookieBanner-decline-btn"]'
      }, {
         seite: 'stadtwerk-am-see.de',
         checkcookie: 'HRCookieManager',
         selector: '.consent-banner button[id^="alle_ablehnen_btn_"]'
      }, {
         seite: 'shein.com',
         selector: 'div[class^="_shein_privacy_"] .cmp_c_3'
      }, {
         seite: 'sellpy.de',
         selector: 'body > #app > div:first-child + div:empty + div[class^="sc-"] > div:first-child > div:last-child > button:first-child + button[color="blue"][style="min-width: auto; margin-top: 8px;"][class^="sc-"]'
      }, {
         seite: 'seclookup.com',
         checkcookie: 'zcglobal_cookie',
         selector: '#zcb-banner a#zc-decline'
      }, {
         seite: 'consent.pdf24.org',
         checkstorage: 'consent/pdf24.org',
         selector: '#consentManager a.settings -> #consentManager a.declineAll'
      }, {
         seite: 'liebherr.com',
         checkcookie: 'ucid_',
         selector: '#cmpStart button#uc-btn-deny-banner'
      }, {
         seite: 'modivo.de',
         selector: '.modal-consents:has(a[href="https://modivo.de/b/datenschutz"]) button[class="button-large button secondary"] -> .cookie-settings-footer > button.primary-accent'
      }, {
         seite: 'gehalt.de',
         checkcookie: 'CONSENTMGR',
         selector: '#GDPRConsentManagerContainer #ccmgt_explicit_preferences -> #GDPRConsentManagerContainer #ccmgt_preferences_reject'
      }, {
         seite: 'cookpad.com',
         checkcookie: 'cookies_preference',
         selector: '[data-controller*="cookies-consent"] a[href*="/de/terms_of_use_consents?value=0"]'
      }, {
         seite: 'nike.com',
         checkcookie: 'AKA_A2',
         selector: '.cookie-modal-base button.modal-actions-decline-btn'
      }];

      for (let i = 0; i < regeln.length; i++) {
         // Gucken ob die aufgerufene Seite von einer Regel gedeckt ist.
         let seiten = regeln[i].seite.toString();
         seiten = seiten.split(',');
         for (let k = 0; k < seiten.length; k++) {
            if ((location.hostname.endsWith('.' + seiten[k]) || location.hostname === seiten[k]) && regelsuchebereitsgelaufen === false) {
               regelsuchebereitsgelaufen = true;
               console.log('[Cookie auto decline] Regel für folgende Seite gefunden: ' + seiten[k]);
               if (document.cookie.includes(regeln[i].checkcookie) === false && localStorage.getItem(regeln[i].checkstorage) === null && ((regeln[i].noframe === true && window.self == window.top) || regeln[i].noframe !== true)) {
                  console.log('[Cookie auto decline] Cookie Banner noch nicht akzeptiert.');
                  // Cookie Banner finden und klicken
                  if (regeln[i].selector) {
                     if (regeln[i].countdown === undefined) {
                        regeln[i].countdown = 302;
                     }
                     let cookiebannerspecificakzeptiert = false;
                     let tiefe = 0;

                     if (window.screen.availWidth < 500 && regeln[i].selectormobile) {
                        regeln[i].selector = regeln[i].selectormobile;
                     }

                     const selectors = regeln[i].selector.split(' -> ');
                     if (selectors.length > 1) {
                        advancedrun = false;
                     }

                     // findcookiebanner setInterval
                     findcookiebannerspecific = function () {
                        if (selectors[tiefe] && document.cookie.includes(regeln[i].checkcookie) === false && localStorage.getItem(regeln[i].checkstorage) === null) {
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
                                    getfinalshadowrootselector.click();
                                    console.log('[Cookie auto decline] Cookie Banner Knopf geklickt.');
                                 }
                              }
                           } else {
                              const normalselector = document.querySelector(selectors[tiefe]);
                              const a = normalselector;
                              if (normalselector && (sichtbarkeitsprüfung(a) || regeln[i].keinesichtbarkeitsprüfung === true)) {
                                 cookiebannerspecificakzeptiert = true;
                                 foundbutton = true;
                                 forcesessionstorage();
                                 if (selectors.length > 1) {
                                    tiefe++;
                                 }
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

                  // Cookies oder/und LocalStorage setzen
                  if (regeln[i].setcookie) {
                     let setcookies = regeln[i].setcookie.toString();
                     setcookies = setcookies.split(' , ');
                     for (let j = 0; j < setcookies.length; j++) {
                        document.cookie = setcookies[j] + nc;
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
         a = ablehnen;
         if (ablehnen && sichtbarkeitsprüfung(a) === true) {
            cookiebannerfinalakzeptiert = true;
            cookiebannerfinalakzeptiertcounter = 0;
            forcesessionstorage();
            console.log('[Cookie auto decline] Cookie Banner abgelehnt.');
            if (window.self !== window.top) {
               beenden();
            }
            ablehnen.click();
            return;
         }

         a = speichern;
         if (speichern && sichtbarkeitsprüfung(a) === true) {
            cookiebannerfinalakzeptiert = true;
            cookiebannerfinalakzeptiertcounter = 0;
            forcesessionstorage();
            console.log('[Cookie auto decline] Cookie Banner Einstellungen gespeichert.');
            if (window.self !== window.top) {
               beenden();
            }
            speichern.click();
            return;
         }

         a = einstellungen;
         if (einstellungen && sichtbarkeitsprüfung(a) === true && ((nureinklickeinstellungen === true && bereitsgeklickt === false) || !nureinklickeinstellungen)) {
            bereitsgeklickt = true;
            cookiebannerfinalakzeptiertcounter = 0;
            console.log('[Cookie auto decline] Cookie Banner Einstellungen geöffnet.');
            einstellungen.click();
            return;
         }

         a = schließen;
         if (schließen && sichtbarkeitsprüfung(a) === true) {
            cookiebannerfinalakzeptiert = true;
            cookiebannerfinalakzeptiertcounter = 0;
            forcesessionstorage();
            console.log('[Cookie auto decline] Cookie Banner geschlossen.');
            if (window.self !== window.top) {
               beenden();
            }
            schließen.click();
            return;
         }

         a = akzeptieren;
         if (akzeptieren && sichtbarkeitsprüfung(a) === true) {
            cookiebannerfinalakzeptiert = true;
            cookiebannerfinalakzeptiertcounter = 0;
            forcesessionstorage();
            console.log('[Cookie auto decline] Cookie Banner akzeptiert.');
            if (window.self !== window.top) {
               beenden();
            }
            akzeptieren.click();
            return;
         }

         if (cookiebannerfinalakzeptiert === true) {
            beenden();
         }
      };

      // Consentfinder Delay ändern.
      findconsentintervalzahländern = function () {
         if (findconsentintervalzahlgeändert === false) {
            findconsentintervalzahlgeändert = true;
            window.clearInterval(findconsentinterval);
            findconsentinterval = window.setInterval(function () {
               findconsent();
            }, findconsentintervalzahl);
         }
      };

      // Weitere Sonderfälle die gar nicht oben reinpassen.
      if (window.location.hostname.endsWith('.de') && (window.location.hostname.includes('sparkasse-') || window.location.hostname.includes('-sparkasse') || window.location.hostname.includes('stadtsparkasse-') || window.location.hostname.startsWith('www.ssk') || window.location.hostname.startsWith('www.spk') || window.location.hostname.endsWith('haspa.de')) && document.cookie.includes('ePrivacyStatus') === false) {
         console.log('[Cookie auto decline] Detected: Sparkasse cookie banner');
         window.setTimeout(function () {
            const check = document.querySelector('div[class*="privacy"] .ebutton > a[data-form=".eprivacy_optin_decline"]');
            if (check) {
               forcesessionstorage();
               check.click();
            }
         }, 202);
      } else if (window.location.hostname === 'js.driftt.com') {
         let findecookiebanner = window.setInterval(function () {
            const ablehnen = document.querySelector('.drift-widget-chat-wrapper__GDPR button.drift-gdpr-action--deny-consent');
            if (ablehnen) {
               console.log('[Cookie auto decline] Detected: js.driftt.com cookie banner chat iframe');
               forcesessionstorage();
               clearInterval(findecookiebanner);
               window.setTimeout(function () {
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
      }
   }
})();
