'use strict';
(function () {
   if ((sessionStorage.getItem('mpowlesu908hxfyw37ghg5ikx90jdzt') != 'djx0v0odce35xrb2pt5dzbgaj1mud5c' && (window.innerHeight > 400 || window.innerHeight === 0)) && document.querySelector('body[class="no-js"] > .main-wrapper[role="main"] + script') === null && document.querySelector('html[style="height:100%"] iframe[src^="/_Incapsula_Resource?"]') === null && document.querySelector('link[href="/cdn-cgi/styles/challenges.css"][rel="stylesheet"]') === null && window.location.hostname != 'accounts.google.com') {

      // privacy-mgmt.com force overflow
      const antioverflow = document.getElementsByClassName('sp-message-open');
      const findantioverflow = window.setInterval(function () {
         if (antioverflow.length > 0) {
            antioverflow[0].classList.remove('sp-message-open');
         }
      }, 200);

      window.setTimeout(function () {
         clearInterval(findantioverflow);
      }, 5000);

      const nc = 'domain=' + window.location.host + ';secure=true; max-age=86400; SameSite=None; path=/';
      const cookiedatum = new Date().toISOString();
      const cookiezeit = new Date().getTime();

      // Forciere das Session Storage Item.
      function forcesessionstorage() {
         if (sessionStorage.getItem('mpowlesu908hxfyw37ghg5ikx90jdzt') != 'djx0v0odce35xrb2pt5dzbgaj1mud5c') {
            sessionStorage.setItem('mpowlesu908hxfyw37ghg5ikx90jdzt', 'djx0v0odce35xrb2pt5dzbgaj1mud5c');
         }
      }

      // Cookie banner (klicker)
      window.setTimeout(function () {
         beenden();
      }, 8000);

      function beenden() {
         advancedrun = false;
         window.clearInterval(findconsent);
         forcesessionstorage();
      }

      let bereitsgeklickt = false;
      let advancedcounter = 0;
      let advancedrun = true;
      const findconsent = window.setInterval(function () {

         // iframe klicker
         if (window.self !== window.top) {

            // cdn.privacy-mgmt.com
            if (window.location.href.includes('/index.html?') && window.location.href.includes('hasCsp=') && window.location.href.includes('message_id=') && window.location.href.includes('consent')) {
               console.log('[Cookie auto decline] Detected: privacy-mgmt.com (iFrame)');
               const ablehnen = document.querySelector('.message-container button.sp_choice_type_REJECT_ALL[title][aria-label]');
               const ablehnen2 = document.querySelector('.message-container button[title*="blehnen"][aria-label]:not([title*="instellungen"], [title*="onfigurieren"])');
               const speichern = document.querySelector('.message-container button.sp_choice_type_SAVE_AND_EXIT[title][aria-label]:not([disabled])');
               const einstellungen = document.querySelector('.message-container button.sp_choice_type_12[title][aria-label]');
               const akzeptieren = document.querySelector('.message-container button.sp_choice_type_11[title][aria-label][style]');
               const akzeptieren2 = document.querySelector('.message-container button.sp_choice_type_ACCEPT_ALL[title][aria-label]');
               const speicherndeaktiviert = document.querySelector('.message-container .sp_choice_type_SAVE_AND_EXIT[disabled][aria-disabled]');

               if (ablehnen) {
                  beenden();
                  window.setTimeout(function () {
                     ablehnen.click();
                  }, 502);
                  if (window.location.host === 'www.goal.com') {
                     window.setTimeout(function () {
                        ablehnen.click();
                     }, 902);
                  }
               } else if (ablehnen2) {
                  beenden();
                  window.setTimeout(function () {
                     ablehnen2.click();
                  }, 502);
               } else {
                  try {
                     if (speichern && localStorage.getItem('bereitsgeklickt') != 'true') {
                        beenden();
                        window.setTimeout(function () {
                           speichern.click();
                        }, 502);
                     } else if (speichern && localStorage.getItem('bereitsgeklickt') === 'true') {
                        beenden();
                        window.setTimeout(function () {
                           if (speicherndeaktiviert) {
                              speichern.click();
                           } else if (speicherndeaktiviert === null) {
                              beenden();
                              const auswahlfelder = document.querySelectorAll('.pm-main div[class^="tcfv2-stack focusable"]');
                              for (let i = 0; i < auswahlfelder.length; i++) {
                                 if (auswahlfelder[i].offsetHeight > 0 && getComputedStyle(auswahlfelder[i]).getPropertyValue('visibility') === 'visible') {
                                    let zustimmenbuttons = auswahlfelder[i].querySelector('.pur-buttons-container > button:first-child');
                                    let ablehnbuttons = auswahlfelder[i].querySelector('.pur-buttons-container > button:last-child');
                                    if (auswahlfelder[i].querySelector('.required-consent') != null || ablehnbuttons != null && getComputedStyle(ablehnbuttons).getPropertyValue('visibility') != 'visible') {
                                       if (zustimmenbuttons != null) {
                                          zustimmenbuttons.click();
                                       }
                                    } else {
                                       if (ablehnbuttons != null && getComputedStyle(ablehnbuttons).getPropertyValue('visibility') === 'visible') {
                                          ablehnbuttons.click();
                                       }
                                    }
                                 }
                              }
                              window.setTimeout(function () {
                                 const speichernfinal = document.querySelector('.message-container button.sp_choice_type_SAVE_AND_EXIT[title][aria-label]:not([disabled])');
                                 if (speichernfinal) {
                                    localStorage.removeItem('bereitsgeklickt');
                                    speichernfinal.click();
                                 }
                              }, 502);
                           }
                        }, 502);

                     } else if (einstellungen && localStorage.getItem('bereitsgeklickt') != 'true') {
                        localStorage.setItem('bereitsgeklickt', 'true');
                        window.setTimeout(function () {
                           einstellungen.click();
                        }, 502);
                     } else if (akzeptieren && localStorage.getItem('bereitsgeklickt') != 'true') {
                        beenden();
                        window.setTimeout(function () {
                           akzeptieren.click();
                        }, 502);
                     }
                  } catch (a) {
                     console.error(a);
                     if (speichern) {
                        beenden();
                        window.setTimeout(function () {
                           speichern.click();
                        }, 502);
                     } else if (akzeptieren) {
                        beenden();
                        window.setTimeout(function () {
                           akzeptieren.click();
                        }, 502);
                     } else if (akzeptieren2) {
                        beenden();
                        window.setTimeout(function () {
                           akzeptieren2.click();
                        }, 502);
                     }
                  }
               }
            }

            // privacymanager.io (iframe klicker)
            if (window.location.host === 'cmp-consent-tool.privacymanager.io') {
               console.log('[Cookie auto decline] Detected: privacymanager.io (iFrame)');
               const einstellungen = document.querySelector('button#manageSettings');
               const speichern = document.querySelector('button#saveAndExit');
               if (speichern) {
                  beenden();
                  window.setTimeout(function () {
                     speichern.click();
                  }, 502);
               } else if (einstellungen) {
                  window.setTimeout(function () {
                     einstellungen.click();
                  }, 502);
               }
            }

            // trustarc.com (iframe klicker)
            if (window.location.host === 'consent-pref.trustarc.com') {
               console.log('[Cookie auto decline] Detected: trustarc.com (iFrame)');
               const ablehnen = document.querySelector('.mainContent .pdynamicbutton .required');
               const ablehnen2 = document.querySelector('.mainContent .bottom .rejectAll');
               const ablehnen3 = document.querySelector('.mainContent .trustarc-submit-buttons-container > button.trustarc-declineall-btn');
               const ablehnen4 = document.querySelector('.gdpr .declineAllButtonLower');
               const schließen = document.querySelector('.mainContent .pdynamicbutton .close');
               const akzeptieren = document.querySelector('.mainContent .pdynamicbutton .call');
               const akzeptieren2 = document.querySelector('.mainContent .pdynamicbutton .submit[role="button"]');
               if (ablehnen) {
                  window.setTimeout(function () {
                     ablehnen.click();
                  }, 502);
               } else if (ablehnen2) {
                  window.setTimeout(function () {
                     ablehnen2.click();
                  }, 502);
               } else if (ablehnen3) {
                  window.setTimeout(function () {
                     ablehnen3.click();
                  }, 502);
               } else if (ablehnen4) {
                  window.setTimeout(function () {
                     ablehnen4.click();
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
               } else if (akzeptieren2) {
                  window.setTimeout(function () {
                     akzeptieren2.click();
                  }, 502);
               } else if (parent.length > 1) {
                  let parentablehnen = parent.document.querySelector('.mainContent .pdynamicbutton .required');
                  let parentablehnen2 = parent.document.querySelector('.mainContent .bottom .rejectAll');
                  let parentablehnen3 = parent.document.querySelector('.mainContent .trustarc-submit-buttons-container > button.trustarc-declineall-btn');
                  let parentschließen = parent.document.querySelector('.mainContent .pdynamicbutton .close');
                  let parentakzeptieren = parent.document.querySelector('.mainContent .pdynamicbutton .call');
                  let parentakzeptieren2 = parent.document.querySelector('.mainContent .pdynamicbutton .submit[role="button"]');

                  if (parentablehnen) {
                     window.setTimeout(function () {
                        parentablehnen.click();
                     }, 502);
                  } else if (parentablehnen2) {
                     window.setTimeout(function () {
                        parentablehnen2.click();
                     }, 502);
                  } else if (parentablehnen3) {
                     window.setTimeout(function () {
                        parentablehnen3.click();
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
                  } else if (parentakzeptieren2) {
                     window.setTimeout(function () {
                        parentakzeptieren2.click();
                     }, 502);
                  }
               }
            }

            // baycloud.ie
            if (window.location.host === 'cdn.baycloud.com') {
               console.log('[Cookie auto decline] Detected: baycloud.ie (iFrame)');
               const ablehnen = document.querySelector('#panelContainer button#panelDecline');
               if (ablehnen) {
                  window.setTimeout(function () {
                     beenden();
                     ablehnen.click();
                  }, 1002);
               }
               let css = document.createElement('style');
               css.innerText = 'body{opacity:0!important;pointer-events:none!important;}';
               css.setAttribute('id', 'vktgytywnpohtlutzkebaunetlurwlcj');
               if (document.head != null) {
                  document.head.appendChild(css);
               }
               window.setTimeout(function () {
                  let csscheck1 = document.getElementById('vktgytywnpohtlutzkebaunetlurwlcj');
                  if (csscheck1 != null) {
                     csscheck1.remove();
                  }
                  clearInterval(findantioverflow);
               }, 5000);
            }

         }
         // iframe klicker ENDE

         // #cmpbox (consensu.org, consentmanager.net)
         const cmpbox = document.querySelector('#cmpbox.cmpbox[aria-labelledby^="cmpbox"]');
         if (cmpbox) {
            console.log('[Cookie auto decline] Detected: #cmpbox (consensu.org, consentmanager.net)');
            const ablehnen = cmpbox.querySelector('a.cmptxt_btn_no[role="button"]');
            const einstellungen = cmpbox.querySelector('a.cmptxt_btn_settings[role="button"]');
            const speichern = cmpbox.querySelector('a.cmptxt_btn_save[role="button"]');
            const akzeptieren = cmpbox.querySelector('a.cmptxt_btn_yes[role="button"]');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            } else if (einstellungen && cmpbox.innerText.toLowerCase().includes('kostenfrei mit werb') === false) {
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

         // #cmpbox shadowroot (consensu.org, consentmanager.net)
         const cmpboxshadowroot = document.querySelector('#cmpwrapper.cmpwrapper');
         if (cmpboxshadowroot) {
            console.log('[Cookie auto decline] Detected: #cmpbox shadowroot (consensu.org, consentmanager.net)');
            const ablehnen = cmpboxshadowroot.shadowRoot.querySelector('#cmpbox a.cmptxt_btn_no[role="button"]');
            const akzeptieren = cmpboxshadowroot.shadowRoot.querySelector('a.cmptxt_btn_yes[role="button"]');
            const einstellungen = cmpboxshadowroot.shadowRoot.querySelector('a[onclick^="__cmp(\'showScreenAdvanced\')"]');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            } else if (akzeptieren) {
               beenden();
               window.setTimeout(function () {
                  akzeptieren.click();
               }, 202);
            } else if (einstellungen) {
               window.setTimeout(function () {
                  einstellungen.click();
               }, 202);
            }
         }

         // opencmp.net
         const opencmp = document.querySelector('script#open-cmp-stub:is([src="https://cdn.opencmp.net/tcf-v2/cmp-stub-latest.js"], [src="//cdn.opencmp.net/tcf-v2/cmp-stub-latest.js"])');
         if (opencmp && document.cookie.includes('euconsent-v2') === false) {
            console.log('[Cookie auto decline] Detected: opencmp.net');
            const cookiecontainer = document.getElementsByClassName('cmp-root-container');
            if (cookiecontainer.length > 0) {
               const akzeptieren = document.querySelector('.cmp-root-container').shadowRoot.querySelector('.cmp-button-accept-all');
               if (akzeptieren) {
                  beenden();
                  window.setTimeout(function () {
                     akzeptieren.click();
                  }, 502);
               }
            }
         }

         // ContentPass
         const contentpass = document.querySelector('script[src^="https://cp"][src$="/now.js"]');
         if (contentpass && document.cookie.includes('OptanonAlertBoxClosed') === false) {
            console.log('[Cookie auto decline] Detected: contentpass');
            const contentpassobfuscated = document.querySelector('div[class^="_"] > button[class^="_"][type="button"]#_cp_cmp_cta_button');
            const contentpassobfuscated2 = document.querySelector('div[class^="_"] > a[class^="_"][rel="noopener noreferrer"][target="_self"]');
            const contentpassobfuscated3 = document.querySelector('div[class^="_"] > div > h2 + div + div button[class^="_"]');
            const contentpassregular = document.querySelector('div#cmp-consent > button#cmp-btn-accept');
            const contentpassregular2 = document.querySelector('body > [id$="box"] .cmptxt_btn_yes[role="button"]');
            const contentpassshadowroot = document.querySelector('body > div:first-child[id$="wrapper"][class$="wrapper"]');
            if (contentpassobfuscated) {
               beenden();
               window.setTimeout(function () {
                  contentpassobfuscated.click();
               }, 201);
            } else if (contentpassobfuscated2) {
               beenden();
               window.setTimeout(function () {
                  contentpassobfuscated2.click();
               }, 201);
            } else if (contentpassobfuscated3) {
               beenden();
               window.setTimeout(function () {
                  contentpassobfuscated3.click();
               }, 201);
            } else if (contentpassregular) {
               beenden();
               window.setTimeout(function () {
                  contentpassregular.click();
               }, 2201);
            } else if (contentpassregular2) {
               beenden();
               window.setTimeout(function () {
                  contentpassregular2.click();
               }, 201);
            } else if (contentpassshadowroot) {
               const buttonyes = contentpassshadowroot.shadowRoot.querySelector('[class^="cmpcontent"] a.cmptxt_btn_yes');
               if (buttonyes) {
                  beenden();
                  window.setTimeout(function () {
                     buttonyes.click();
                  }, 201);
               }
            }
         }

         // cookielaw.org
         const cookielaw = document.querySelector('script[src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"][data-domain-script]');
         if (cookielaw && contentpass == null && document.cookie.includes('OptanonAlertBoxClosed') === false) {
            console.log('[Cookie auto decline] Detected: cookielaw.org');
            const cookielawwithdecline = document.querySelector('#onetrust-button-group-parent button#onetrust-reject-all-handler');
            const cookielawwithdecline2 = document.querySelector('#onetrust-consent-sdk button.ot-pc-refuse-all-handler');
            const cookielawwithdecline3 = document.querySelector('#onetrust-consent-sdk button.ot-close-link');
            const cookielawsettings = document.querySelector('#onetrust-button-group-parent button#onetrust-pc-btn-handler');
            if (cookielawwithdecline) {
               beenden();
               window.setTimeout(function () {
                  cookielawwithdecline.click();
               }, 502);
            } else if (cookielawwithdecline2) {
               beenden();
               window.setTimeout(function () {
                  cookielawwithdecline2.click();
               }, 502);
            } else if (cookielawwithdecline3) {
               beenden();
               window.setTimeout(function () {
                  cookielawwithdecline3.click();
               }, 502);
            } else if (cookielawsettings) {
               cookielawsettings.click();
               const auswahlbestätigen = document.querySelector('button.save-preference-btn-handler');
               if (auswahlbestätigen) {
                  beenden();
                  window.setTimeout(function () {
                     auswahlbestätigen.click();
                  }, 502);
               }
            }
         }

         // usercentrics.eu
         const usercentrics = document.querySelector('[id^="usercentrics-"]:not(script)');
         const usercentricsscript = document.querySelector('script[src*="usercentrics.eu/"]#usercentrics-cmp');
         if (usercentrics && usercentricsscript && localStorage.getItem('uc_user_interaction') != true) {
            console.log('[Cookie auto decline] Detected: usercentrics');
            const ablehnen = usercentrics.shadowRoot.querySelector('button[class^="sc-"][data-testid="uc-deny-all-button"][role="button"]');
            const ablehnen2 = usercentrics.shadowRoot.querySelector('button#deny');
            const einstellungenspeichern = usercentrics.shadowRoot.querySelector('button[class^="sc-"][data-testid="uc-save-button"][role="button"]');
            const einstellungen = usercentrics.shadowRoot.querySelector('button[data-testid^="uc-customize-"], button.uc-more-button, button[data-testid^="uc-more-"]');
            const akzeptieren = document.querySelector('button.aa-first-layer__button[onclick^="accept"]');
            const speichern = usercentrics.shadowRoot.querySelector('button[data-testid="uc-save-button"], button#save.uc-save-button');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 502);
            } else if (ablehnen2) {
               beenden();
               window.setTimeout(function () {
                  ablehnen2.click();
               }, 602);
            } else if (einstellungenspeichern) {
               beenden();
               window.setTimeout(function () {
                  einstellungenspeichern.click();
               }, 602);
            } else if (speichern) {
               beenden();
               window.setTimeout(function () {
                  speichern.click();
               }, 502);
            } else if (einstellungen) {
               window.setTimeout(function () {
                  einstellungen.click();
               }, 502);
            } else if (akzeptieren) {
               beenden();
               window.setTimeout(function () {
                  akzeptieren.click();
               }, 1502);
            }
         }

         // usercentrics.eu 2
         const usercentrics2 = document.getElementById('comspace-usercentrics');
         const usercentricsframe = document.querySelector('iframe#uc-cross-domain-bridge[src^="https://app.usercentrics.eu/browser-sdk/"]');
         if (usercentrics2 && usercentricsframe && localStorage.getItem('uc_user_interaction') != true) {
            console.log('[Cookie auto decline] Detected: usercentrics2');
            const speichern = usercentrics2.querySelector('button.comspace-usercentrics--button');
            if (speichern) {
               beenden();
               window.setTimeout(function () {
                  speichern.click();
               }, 502);
            }
         }

         // gatekeeperconsent.com
         const gatekeeperconsent = document.querySelector('script[src="https://privacy.gatekeeperconsent.com/tcf2_stub.js"]');
         if (gatekeeperconsent && document.cookie.includes('ezCMPCookieConsent') === false) {
            console.log('[Cookie auto decline] Detected: gatekeeperconsent.com');
            const einstellungen = document.querySelector('button#ez-manage-settings');
            const speichern = document.querySelector('button#ez-save-settings');
            if (speichern) {
               window.setTimeout(function () {
                  beenden();
                  speichern.click();
               }, 202);
            } else if (einstellungen) {
               window.setTimeout(function () {
                  einstellungen.click();
               }, 202);
            }
         }

         // cookiebot.com
         const cookiebot = document.querySelector('div[id*="Cookiebot"], div#cookiebot');
         if (cookiebot && document.cookie.includes('%2Cutc:16') === false) {
            console.log('[Cookie auto decline] Detected: cookiebot.com');
            const ablehnen = cookiebot.querySelector('button.cint-cookiebot__buttons__deny, #CybotCookiebotDialogBodyButtonDecline, button.cookie-alert-decline-button, [class*="cookie"] a[href="javascript:void(0)"][onclick="Cookiebot.dialog.submitDecline()"], button#CybotCookiebotDialogBodyButtonDecline');
            const speichern = cookiebot.querySelector('[id*="OptinAllowallSelection"]:is(button, a, span)');
            const einstellungen = cookiebot.querySelector('#CybotCookiebotDialogBodyLevelButtonCustomize');
            if (ablehnen && ablehnen.offsetWidth > 1) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 502);
            } else if (speichern && speichern.offsetWidth > 1) {
               beenden();
               window.setTimeout(function () {
                  speichern.click();
               }, 2502);
            } else if (einstellungen && einstellungen.offsetWidth > 1 && bereitsgeklickt === false) {
               bereitsgeklickt = true;
               window.setTimeout(function () {
                  einstellungen.click();
               }, 2502);
            }

         }

         // trustarc.com
         const trustarc = document.querySelector('script[src^="https://consent.trustarc.com/asset/notice.js/v/v"]');
         if (trustarc && document.cookie.includes('notice_gdpr_prefs=') === false) {
            console.log('[Cookie auto decline] Detected: trustarc.com');
            const ablehnen = document.querySelector('#truste-consent-buttons button#truste-consent-required');
            const ablehnen2 = document.querySelector('#truste-consent-track #truste-consent-buttons > a#truste-consent-required');
            const einstellungen = document.querySelector('#truste-consent-buttons button#truste-show-consent');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 502);
            } else if (ablehnen2) {
               beenden();
               window.setTimeout(function () {
                  ablehnen2.click();
               }, 502);
            } else if (einstellungen && bereitsgeklickt === false) {
               bereitsgeklickt = true;
               window.setTimeout(function () {
                  einstellungen.click();
               }, 502);
            }
         }

         // real-cookie-banner-pro
         const realcookiebannerpro = document.querySelectorAll('body > div[id^="a"][class^="a"] > dialog.wp-exclude-emoji > [class^="animate__animated animate__"] > div:only-child > a:first-child + div + div[class*="-ext-"] > div:first-child > div[class*="-ext-"] > a[href="#"], body > div[id^="a"][class]> div.wp-exclude-emoji > [class^="animate__animated animate__"] > div:only-child > div[style^="background"] > div:only-child > div + div > div[style*="order"]');
         if (realcookiebannerpro.length > 0) {
            console.log('[Cookie auto decline] Detected: real-cookie-banner-pro');
            for (let i = 0; i < realcookiebannerpro.length; i++) {
               if (realcookiebannerpro[i].innerText.includes('Weiter ohne Einwilligung') || realcookiebannerpro[i].innerText.includes('Continue without consent')) {
                  realcookiebannerpro[i].click();
                  beenden();
                  window.setTimeout(function () {
                     realcookiebannerpro[i].click();
                  }, 202);
               }
            }
         }

         // waconcookiemanagement
         const waconcookiemanagement = document.getElementsByClassName('waconcookiemanagement');
         if (waconcookiemanagement.length > 0 && waconcookiemanagement[0].offsetHeight > 0) {
            console.log('[Cookie auto decline] Detected: waconcookiemanagement');
            const ablehnen = document.querySelector('.waconcookiemanagement .cookie-refuse > a');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            }
         }

         // onetrust.com
         const onetrust = document.getElementById('onetrust-consent-sdk');
         if (onetrust && cookielaw === null) {
            console.log('[Cookie auto decline] Detected: onetrust.com');
            const ablehnen = document.querySelector('#onetrust-banner-sdk #onetrust-button-group button#onetrust-reject-all-handler');
            const ablehnen2 = document.querySelector('#cookie-disclosure button#cookie-disclosure-reject');
            const einstellungen = document.querySelector('#onetrust-banner-sdk #onetrust-button-group button#onetrust-pc-btn-handler');
            const speichern = document.querySelector('button.save-preference-btn-handler');
            const akzeptieren = document.querySelector('#onetrust-accept-btn-handler');
            if (ablehnen && ablehnen.offsetHeight > 0) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 1002);
            } else if (ablehnen2 && ablehnen2.offsetHeight > 0) {
               beenden();
               window.setTimeout(function () {
                  ablehnen2.click();
               }, 1002);
            } else if (speichern && speichern.offsetHeight > 0) {
               beenden();
               window.setTimeout(function () {
                  speichern.click();
               }, 1002);
            } else if (einstellungen && einstellungen.offsetHeight > 0) {
               window.setTimeout(function () {
                  einstellungen.click();
               }, 1002);
            } else if (akzeptieren && akzeptieren.offsetHeight > 0) {
               beenden();
               window.setTimeout(function () {
                  akzeptieren.click();
               }, 1002);
            }

         }

         // https://wordpress.org/plugins/complianz-gdpr
         const complianzgdpr = document.querySelector('body > #cmplz-cookiebanner-container');
         if (complianzgdpr) {
            console.log('[Cookie auto decline] https://wordpress.org/plugins/complianz-gdpr');
            const ablehnen = document.querySelector('body > #cmplz-cookiebanner-container .cmplz-buttons > button.cmplz-deny');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 1002);
            }
         }

         // borlabs.io
         const borlabs = document.querySelector('#BorlabsCookieBox');
         if (borlabs && document.cookie.includes('essential%22%3A%5B%22borlabs-cookie') === false) {
            console.log('[Cookie auto decline] Detected: borlabs.io');
            const ablehnen = borlabs.querySelector('button.brlbs-cmpnt-btn.brlbs-btn-accept-only-essential');
            const speichern = borlabs.querySelector('#CookieBoxSaveButton');
            const einstellungen = borlabs.querySelector('#CookieBoxPreferencesButton');
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
            } else if (einstellungen) {
               window.setTimeout(function () {
                  einstellungen.click();
               }, 202);
            }
         }

         // osano.com
         const osano = document.querySelector('script[src^="https://cmp.osano.com/"]');
         if (osano) {
            console.log('[Cookie auto decline] Detected: osano.com');
            const ablehnen = document.querySelector('.osano-cm-window > div[id][role="dialog"] .osano-cm-buttons > button.osano-cm-denyAll');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            }
         }

         // privacy-center.org
         const privacycenter = document.querySelector('script[src^="https://sdk.privacy-center.org/"]');
         const privacycenter2 = document.querySelector('#didomi-host #didomi-popup');
         if (privacycenter || privacycenter2) {
            console.log('[Cookie auto decline] Detected: privacy-center.org');
            const ablehnen = document.querySelector('#didomi-host #didomi-popup .didomi-continue-without-agreeing[role="button"]');
            const ablehnen2 = document.querySelector('#didomi-host #didomi-notice #buttons > button#didomi-notice-disagree-button');
            const ablehnen3 = document.querySelector('#didomi-host .didomi-popup-notice-buttons button#didomi-notice-disagree-button');
            const einstellungen = document.querySelector('#didomi-host .didomi-consent-popup-actions button.didomi-button-standard');
            const einstellungen2 = document.querySelector('#didomi-host button#didomi-notice-learn-more-button');
            const speichern = document.querySelector('#didomi-host .didomi-consent-popup-actions button.didomi-button-standard[aria-label]');
            const speichern2 = document.querySelector('#didomi-host .didomi-consent-popup-actions button[aria-describedby="didomi-consent-popup-information-save"]:not([disabled])');
            const switchesablehnen = document.querySelector('#didomi-host #didomi-radio-option-disagree-to-all[aria-pressed="false"]');
            const akzeptieren = document.querySelector('#didomi-host button#didomi-notice-agree-button');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 402);
            } else if (ablehnen2) {
               beenden();
               window.setTimeout(function () {
                  ablehnen2.click();
               }, 402);
            } else if (ablehnen3 && ablehnen3.innerText.toLowerCase().includes('ad free') === false && ablehnen3.innerText.toLowerCase().includes('€') === false) {
               beenden();
               window.setTimeout(function () {
                  ablehnen3.click();
               }, 402);
            } else if (speichern) {
               beenden();
               window.setTimeout(function () {
                  speichern.click();
               }, 402);
            } else if (speichern2) {
               beenden();
               window.setTimeout(function () {
                  speichern2.click();
               }, 402);
            } else if (einstellungen) {
               window.setTimeout(function () {
                  einstellungen.click();
               }, 402);
            } else if (einstellungen2 && einstellungen2.offsetHeight > 0 && einstellungen2.innerText.toLowerCase().includes('mehr infos') === false && bereitsgeklickt === false) {
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
            }
         }

         // quantcast.com
         const quantcast = document.querySelector('script[src^="https://cmp.quantcast.com/tcfv"]');
         const quantcast2 = document.querySelector('#qc-cmp2-container.qc-cmp2-container');
         if ((quantcast || quantcast2) && document.cookie.includes('addtl_consent') === false) {
            console.log('[Cookie auto decline] Detected: quantcast.com');
            const ablehnen = document.querySelector('#qc-cmp2-container .qc-cmp2-summary-buttons > button + button[mode="secondary"]');
            const einstellungen = document.querySelector('#qc-cmp2-container .qc-cmp2-summary-buttons > button[mode="secondary"]');
            const speichern = document.querySelector('#qc-cmp2-container div[class^="qc-cmp2-buttons-"] > button[aria-pressed="false"][mode="primary"]');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
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
            const ablehnen = document.querySelector('#iubenda-cs-banner .iubenda-cs-opt-group button.iubenda-cs-reject-btn');
            const akzeptieren = document.querySelector('#iubenda-cs-banner .iubenda-cs-opt-group button.iubenda-cs-accept-btn');
            const akzeptieren2 = document.querySelector('#iubenda-cs-banner button.iubenda-cs-close-btn');
            const akzeptieren3 = document.querySelector('#iubenda-cs-banner button.iubenda-cs-accept-btn');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            } else if (akzeptieren) {
               beenden();
               window.setTimeout(function () {
                  akzeptieren.click();
               }, 202);
            } else if (akzeptieren2) {
               beenden();
               window.setTimeout(function () {
                  akzeptieren2.click();
               }, 202);
            } else if (akzeptieren3) {
               beenden();
               window.setTimeout(function () {
                  akzeptieren3.click();
               }, 202);
            }
         }

         // gdpr-legal-cookie.myshopify.com
         const gdprlegalcookiemyshopify = document.querySelector('#cookie-banner_flag + #banner-wrapper[style="opacity: 1; display: flex; visibility: visible; top: 0px; left: 0px;"]');
         if (gdprlegalcookiemyshopify && document.cookie.includes('_bc_c_set') === false) {
            console.log('[Cookie auto decline] Detected: gdpr-legal-cookie.myshopify.com');
            const ablehnen = gdprlegalcookiemyshopify.querySelector("#essential_accept");
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            }
         }

         // shopify
         const shopify = document.querySelector('section#shopify-pc__banner[aria-labelledby][style="display: block;"]');
         if (shopify && document.cookie.includes('%7B%22purposes%22%3A%7B%22p%22%3Atrue') === false) {
            console.log('[Cookie auto decline] Detected: shopify cookie banner');
            const ablehnen = shopify.querySelector('.shopify-pc__banner__btns-granular #shopify-pc__banner__btn-decline');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            }
         }

         // shopify2
         const shopify2 = document.querySelector('div[id^="shopify-section-sections"] > cookie-banner');
         if (shopify2) {
            console.log('[Cookie auto decline] Detected: shopify cookie banner 2');
            const ablehnen = shopify2.querySelector('button[name="decline"]');
            if (ablehnen && ablehnen.offsetHeight > 5) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            }
         }

         // fastcmp.com
         const fastcmp = document.querySelector('script[src="https://static.fastcmp.com/fast-cmp-stub.js"]');
         if (fastcmp && document.cookie.includes('fastCMP-addtlConsent') === false) {
            console.log('[Cookie auto decline] Detected: fastcmp.com');
            const check = document.querySelector('iframe#fast-cmp-iframe');
            if (check) {
               const ablehnen = check.contentWindow.document.querySelector('.fast-cmp-home-refuse > button.fast-cmp-button-secondary');
               const akzeptieren = document.querySelector('iframe#fast-cmp-iframe').contentWindow.document.querySelector('.fast-cmp-paywall-home__nav-box > button.fast-cmp-button-primary');
               if (ablehnen) {
                  beenden();
                  window.setTimeout(function () {
                     ablehnen.click();
                  }, 202);
               } else if (akzeptieren) {
                  beenden();
                  window.setTimeout(function () {
                     akzeptieren.click();
                  }, 202);
               }
            }
         }

         // hu-manity.co
         const humanity = document.querySelector('#cookie-notice[class="cookie-revoke-hidden cn-position-bottom cn-effect-fade cookie-notice-visible"]');
         if (humanity && document.cookie.includes('cookie_notice_accepted') === false) {
            console.log('[Cookie auto decline] Detected: hu-manity.co');
            const ablehnen = humanity.querySelector('#cn-notice-buttons > a#cn-refuse-cookie[data-cookie-set="refuse"]');
            const schließen = humanity.querySelector('.cookie-notice-container > #cn-close-notice[data-cookie-set="accept"]');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            } else if (schließen) {
               beenden();
               window.setTimeout(function () {
                  schließen.click();
               }, 202);
            }
         }

         // cookie-law-info-bar
         const cookielawinfobar = document.querySelector('#cookie-law-info-bar[style]');
         if (cookielawinfobar && document.cookie.includes('viewed_cookie_policy') === false) {
            console.log('[Cookie auto decline] Detected: cookie-law-info-bar');
            const ablehnen = cookielawinfobar.querySelector('a#wt-cli-reject-btn');
            const speichern = document.querySelector('#cliSettingsPopup a#wt-cli-privacy-save-btn.wt-cli-privacy-accept-btn[role="button"]');
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
            }
         }

         // cookiefirst.com
         const cookiefirst = document.querySelector('script[src^="https://consent.cookiefirst.com/banner"]');
         const cookiefirst2 = document.querySelector('script[src="//app.cookiefirst.com/loader/init.js"]');
         if ((cookiefirst || cookiefirst2) && document.cookie.includes('cookiefirst-consent') === false) {
            console.log('[Cookie auto decline] Detected: cookiefirst.com');
            const ablehnen = document.querySelector('.cookiefirst-root button[data-cookiefirst-action="reject"][type="button"]');
            const einstellungen = document.querySelector('.cookiefirst-root button[data-cookiefirst-action="adjust"][type="button"]');
            const speichern = document.querySelector('.cookiefirst-root button[data-cookiefirst-action="save"][type="button"]');
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
            } else if (einstellungen) {
               window.setTimeout(function () {
                  einstellungen.click();
               }, 202);
            }
         }

         // cookieconsent:desc
         const cookieconsentdesc = document.querySelector('div[aria-describedby="cookieconsent:desc"][class*="cc-window"]');
         if (cookieconsentdesc && document.cookie.includes('cookieconsent_status') === false) {
            console.log('[Cookie auto decline] Detected: cookieconsent:desc');
            const ablehnen = cookieconsentdesc.querySelector('a[aria-labelledby="cc-deny-01"], button.cc-deny');
            const speichern = cookieconsentdesc.querySelector('a[data-action="save-cc"], button.cc-save');
            const einstellungen = cookieconsentdesc.querySelector('[aria-label="Einstellungen"], [aria-label="settings cookies"]');
            const einstellungsmenu = document.querySelector('div[aria-describedby="cookieconsent:desc"][class*="cc-window"] + #pd-cp-preferences, div[aria-describedby="cookieconsent:desc"][class*="cc-window"] + div > div[id="cookieconsent:settings"]');
            const schließen = cookieconsentdesc.querySelector('a[aria-label="dismiss cookie message"]');
            const akzeptieren = cookieconsentdesc.querySelector('a[aria-label="allow cookies"]');
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
            } else if (einstellungen && bereitsgeklickt === false) {
               bereitsgeklickt = true;
               window.setTimeout(function () {
                  einstellungen.click();
               }, 202);
            } else if (einstellungsmenu) {
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
            } else if (schließen) {
               beenden();
               window.setTimeout(function () {
                  schließen.click();
               }, 202);
            } else if (akzeptieren) {
               beenden();
               window.setTimeout(function () {
                  akzeptieren.click();
               }, 202);
            }
         }

         // oveleon.de (cookiebar-desc)
         const oveleon = document.querySelector('div[aria-describedby="cookiebar-desc"].contao-cookiebar, div[aria-describedby="cookiebar-desc"]#cookiebar');
         if (oveleon && (window.localStorage.getItem('ccb_contao_token_1') === null || (window.localStorage.getItem('ccb_contao_token_1') && window.localStorage.getItem('ccb_contao_token_1').includes('"saved":-1') === true))) {
            console.log('[Cookie auto decline] Detected: oveleon.de (cookiebar-desc)');
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
            const ablehnen = document.querySelector('.as-oil-content-overlay button.as-js-only-essentials[data-qa="oil-only-essentials-button"]');
            const einstellungen = document.querySelector('.as-oil-content-overlay button.as-js-advanced-settings[data-qa="oil-AdvancedSettingsButton"]');
            const speichern = document.querySelector('.as-oil-content-overlay button.as-js-optin');
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
            } else if (einstellungen) {
               window.setTimeout(function () {
                  einstellungen.click();
               }, 202);
            }
         }

         // mnd-cookie-modal
         const mndcookiemodal = document.querySelector('.mnd-cookie-wrapper[data-mnd-cookie-plugin][data-mnd-cookie-options]');
         const mndcookiemodal2 = document.querySelector('div[class="js--modal sizing--content mnd-cookie-modal"]');
         if (mndcookiemodal || mndcookiemodal2) {
            console.log('[Cookie auto decline] Detected: mnd-cookie-modal');
            const ablehnen = document.querySelector('.mnd-cookie-modal button.btn-accept-functional');
            const ablehnen2 = document.querySelector('.mnd-cookie-wrapper button.mnd-btn-decline');
            const speichern = document.querySelector('.mnd-cookie-wrapper button.mnd-btn-save-settings');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            } else if (ablehnen2) {
               beenden();
               window.setTimeout(function () {
                  ablehnen2.click();
               }, 202);
            } else if (speichern) {
               beenden();
               window.setTimeout(function () {
                  speichern.click();
               }, 202);
            }
         }

         // page-wrap--cookie-permission
         const pagewrapcookiepermission = document.querySelector('.page-wrap--cookie-permission[data-cookie-permission="true"][data-urlprefix][data-title]');
         if (pagewrapcookiepermission && document.cookie.includes('cookiePreferences') === false) {
            console.log('[Cookie auto decline] Detected: page-wrap--cookie-permission');
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
            const speichern = document.querySelector('#cookieModal a#js-save-cookieconf');
            if (speichern) {
               beenden();
               window.setTimeout(function () {
                  speichern.click();
               }, 202);
            }
         }

         // comply-consent-manager
         const complyconsentmanager = document.querySelector('comply-consent-manager[apikey] .comply-Menu');
         if (complyconsentmanager) {
            console.log('[Cookie auto decline] Detected: comply-consent-manager');
            const ablehnen = complyconsentmanager.querySelector('button.comply-SaveSettingsButton');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            }
         }

         // ccc-overlay
         const cccoverlay = document.querySelector('#ccc[style]');
         if (cccoverlay && document.cookie.includes('CookieControl') === false) {
            console.log('[Cookie auto decline] Detected: ccc-overlay');
            const einstellungen = document.querySelector('#ccc-notify button.ccc-notify-button.ccc-tabbable:not(#ccc-notify-accept)');
            const schließen = document.querySelector('#ccc #ccc-content button#ccc-close');
            const ablehnen = document.querySelector('#ccc #ccc-content button#ccc-reject-settings');
            const speichern = document.querySelector('#ccc #ccc-content button#ccc-dismiss-button');
            if (einstellungen) {
               window.setTimeout(function () {
                  einstellungen.click();
               }, 202);
            } else if (schließen) {
               beenden();
               window.setTimeout(function () {
                  schließen.click();
               }, 202);
            } else if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            } else if (speichern) {
               beenden();
               window.setTimeout(function () {
                  speichern.click();
               }, 202);
            }
         }

         // ccm19.de
         const ccm19de = document.querySelector('.ccm-root > #ccm-widget');
         if (ccm19de && localStorage.getItem('ccm_consent') === null) {
            console.log('[Cookie auto decline] Detected: ccm-root');
            const ablehnen = document.querySelector('#ccm-widget button.ccm--decline-cookies[type="button"]');
            if (ablehnen && ablehnen.offsetHeight >= 1) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            }
            window.setTimeout(function () {
               if (localStorage.getItem('ccm_consent') === null) {
                  localStorage.setItem('ccm_consent', '{"/":{"gen":2,"ucid":"6ad4663ccc120512","consent":true,"embeddings":["9a54529","255f811","12b0367"],"created":' + cookiezeit + ',"updated":' + cookiezeit + ',"clickedButton":"decline","iframeConsentDomains":[],"tcf":{"p":[],"lip":[],"sf":[],"v":[],"liv":[],"gad":[]},"lang":"de_DE"}}');
                  beenden();
                  location.reload();
               }
            }, 502);
         }

         // https://github.com/orestbida/cookieconsent
         const orestbida = document.querySelector('#cc--main.c--anim[style]');
         const orestbida2 = document.querySelector('#cc-main > .cm-wrapper > [aria-describedby="cm__desc"]');
         if (orestbida && document.cookie.includes('cc_cookie') === false) {
            console.log('[Cookie auto decline] Detected: https://github.com/orestbida/cookieconsent');
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
            const ablehnen = optanon.querySelector('button.optanon-reject-all[onclick]');
            const speichern = document.querySelector('.optanon-white-button-middle > button[onclick]');
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
            }
         }

         // gdpr.mandarin-medien.de
         const mandarinmedien = document.querySelector('script[src*="gdpr.mandarin-medien.de/manager.js"]');
         if (mandarinmedien && document.cookie.includes('mmcm-jar-') === false) {
            console.log('[Cookie auto decline] Detected: gdpr.mandarin-medien.de');
            const ablehnen = document.querySelector('.mmcm-container .mmcm-actions a.mmcm-btn-decline');
            const speichern = document.querySelector('.mmcm-container .mmcm-actions a.mmcm-btn-save');
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
            }
         }

         // orejime
         const orejime = document.querySelector('.orejime-NoticePortal');
         if (orejime && document.cookie.includes('orejime') === false) {
            console.log('[Cookie auto decline] Detected: orejime');
            const ablehnen = document.querySelector('.orejime-NoticePortal button.orejime-Button--decline');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            }
         }

         // oax_cookie_consent_modal
         const oaxcookieconsentmodal = document.querySelector('body.oax');
         if (oaxcookieconsentmodal && document.cookie.includes('_consentCookie') === false) {
            console.log('[Cookie auto decline] Detected: oaxcookieconsentmodal');
            const ablehnen = document.querySelector('.oax_cookie_consent_modal button.oax-cookie-consent-select-necessary');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            }
         }

         // https://www.acris-ecommerce.at/
         const acris = document.querySelector('.acris-cookie-consent[data-acris-cookie-consent="true"][data-acris-cookie-consent-options]');
         if (acris) {
            console.log('[Cookie auto decline] Detected: https://www.acris-ecommerce.at/');
            const ablehnen = acris.querySelector('#ccAcceptOnlyFunctional');
            const akzeptieren = acris.querySelector('#ccAcceptButton');
            if (ablehnen && ablehnen.offsetHeight > 1) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 1202);
            } else if (akzeptieren && akzeptieren.offsetHeight > 1) {
               beenden();
               window.setTimeout(function () {
                  akzeptieren.click();
               }, 1202);
            }
         }

         // https://www.acris-ecommerce.at/ 2
         const acris2 = document.querySelector('#acris--page-wrap--cookie-permission[data-acris-cookie-permission]');
         if (acris2 && document.cookie.includes('cookiePreferences') === false) {
            console.log('[Cookie auto decline] Detected: https://www.acris-ecommerce.at/ 2');
            const ablehnen = acris2.querySelector('button#cookie-permission--accept-only-functional-button');
            const speichern = acris2.querySelector('#cookie-permission--accept-button');
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
            }
         }

         // https://www.tramino.de/
         const tramino = document.querySelector('script[src="/tramino/js/require.min.js"]');
         const tramino2 = document.querySelector('script[src^="https://storage.tramino.net/static/root/js/jquery"]');
         if ((tramino || tramino2) && document.cookie.includes('Consent') === false) {
            console.log('[Cookie auto decline] Detected: https://www.tramino.de/');
            const ablehnen = document.querySelector('.TraminoConsent button[value="acceptConsent"]');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            }
         }

         // amgdpr
         const amgdpr = document.querySelector('.amgdprcookie-modal-template form#amgdprcookie-form.amgdprcookie-settings-form[data-amcookie-js]');
         if (amgdpr && document.cookie.includes('amcookie_allowed') === false) {
            console.log('[Cookie auto decline] Detected: amgdpr');
            const ablehnen = amgdpr.querySelector('button.amgdprcookie-button.-decline:not([disabled])');
            const schließen = document.querySelector('.amgdprcookie-modal-template > button#close-modal:not([disabled])');
            const speichern = amgdpr.querySelector('button.amgdprcookie-button.-save:not([disabled])');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 1502);
            } else if (schließen) {
               beenden();
               window.setTimeout(function () {
                  schließen.click();
               }, 1502);
            } else if (speichern) {
               beenden();
               window.setTimeout(function () {
                  speichern.click();
               }, 1502);
            }
         }

         // klaro.org
         const klaro = document.querySelector('div[id="klaro"] > div[class^="klaro"]');
         const klaro2 = document.querySelector('#cookieconsent > div[class^="klaro"]');
         if ((klaro || klaro2) && document.cookie.includes('klaro') === false) {
            console.log('[Cookie auto decline] Detected: klaro.org');
            const ablehnen = document.querySelector('div[class^="klaro"] button.cn-decline[type="button"]');
            const einstellungen = document.querySelector('#klaro button.cm-btn-lern-more');
            const einstellungen2 = document.querySelector('#klaro a.cn-learn-more[href="#"]');
            const speichern = document.querySelector('#klaro button.cm-btn-accept');
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
            }
         }

         // klaro.org 2
         const klarozwei = document.querySelector('div[id="timm4-cookie-consent"] > div[class^="klaro"], div[id="hbaccept"] > div[class^="klaro"]');
         if (klarozwei && document.cookie.includes('timm4cookie-consent') === false && window.localStorage.getItem('hbaccept') === null) {
            console.log('[Cookie auto decline] Detected: klaro.org 2');
            const speichern = klarozwei.querySelector('button.cm-btn-accept[type="button"]');
            const ablehnen = klarozwei.querySelector('button.cn-decline');
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
            }
         }

         // cookie-note-hide
         const cookienotehide = document.querySelector('div[id="cookie-note"][style="display: block;"].cookie-note');
         if (cookienotehide && document.cookie.includes('ikiss-cookie-note-off') === false) {
            console.log('[Cookie auto decline] Detected: cookie-note-hide (germany)');
            const ablehnen = cookienotehide.querySelector('button#cookie-note-hide');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            }
         }

         // cookie-consent-form__description
         const cookieconsentformdescription = document.querySelector('dialog.cookie-consent-form[aria-labelledby="cookie-consent-form__description"][open]');
         if (cookieconsentformdescription && document.cookie.includes('hide_cn') === false) {
            console.log('[Cookie auto decline] Detected: cookie-consent-form__description (germany)');
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
            const speichern = sgalinski.querySelector('.sg-cookie-optin-box-button button.sg-cookie-optin-box-button-accept-specific');
            const einstellungen = sgalinski.querySelector('.sg-cookie-optin-banner-button button.sg-cookie-optin-banner-button-settings');
            if (speichern) {
               beenden();
               window.setTimeout(function () {
                  speichern.click();
               }, 202);
            } else if (einstellungen) {
               window.setTimeout(function () {
                  einstellungen.click();
               }, 202);
            }
         }

         // cookieman-modal
         const cookiemanmodal = document.querySelector('#cookieman-modal[data-cookieman-settings]');
         if (cookiemanmodal) {
            console.log('[Cookie auto decline] Detected: cookieman-modal');
            const ablehnen = cookiemanmodal.querySelector('button[data-cookieman-accept-none]');
            const speichern = cookiemanmodal.querySelector('button[data-cookieman-accept-all]');
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
            }
         }

         // usercentrics-button
         const usercentricsbutton = document.querySelector('script[id][src="https://app.usercentrics.eu/latest/main.js"]');
         const usercentricsbutton2 = document.querySelector('#usercentrics-button');
         if (usercentricsbutton && usercentricsbutton2) {
            console.log('[Cookie auto decline] Detected: usercentrics-button');
            const ablehnen = document.querySelector('#usercentrics-button button#uc-btn-deny-banner');
            const einstellungen = document.querySelector('#usercentrics-button button#uc-btn-more-info-banner');
            const speichern = document.querySelector('#usercentrics-button .uc-save-settings-button');
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
            } else if (einstellungen) {
               window.setTimeout(function () {
                  einstellungen.click();
               }, 202);
            }
         }

         // cky-consent
         const ckyconsent = document.querySelector('.cky-consent-container');
         if (ckyconsent && document.cookie.includes('action:yes,necessary:yes') === false) {
            console.log('[Cookie auto decline] Detected: cky-consent');
            const ablehnen = ckyconsent.querySelector('button.cky-btn-reject');
            const einstellungen = ckyconsent.querySelector('button.cky-btn-customize');
            const speichern = document.querySelector('.cky-preference-center button.cky-btn-preferences');
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
            } else if (einstellungen) {
               window.setTimeout(function () {
                  einstellungen.click();
               }, 202);
            }
         }

         // framer
         const framer = document.querySelector('.--framer-cookie-banner-container');
         if (framer && window.localStorage.getItem('framerCookiesDismissed') === null) {
            console.log('[Cookie auto decline] Detected: --framer-cookie-banner-container');
            const ablehnen = framer.querySelector('div[style="display: flex; flex-direction: row; gap: 10px; margin-top: 16px;"] > input:first-child');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            }
         }

         // privacy_optin
         const privacy_optin = document.querySelector('div[id^="privacy_optin_"].mod_privacy_optin.open');
         if (privacy_optin && window.localStorage.getItem('user_privacy_settings') === null) {
            console.log('[Cookie auto decline] Detected: privacy_optin');
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
            const ablehnen = tealiumGDPR.querySelector('button#rejectAll, button#consent_prompt_reject, a#no_consent, button.js-btn-reject-all, button#cm-acceptNone');
            const speichern = document.querySelector('#__tealiumGDPRcpPrefs button#save');
            const einstellungen = tealiumGDPR.querySelector('button.js-btn-edit-cookie-settings, a#preferences');
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
            } else if (einstellungen && bereitsgeklickt === false) {
               bereitsgeklickt = true;
               window.setTimeout(function () {
                  einstellungen.click();
               }, 202);
            }
         }

         // avia
         const avia = document.querySelector('.avia-cookie-consent-wrap');
         if (avia) {
            console.log('[Cookie auto decline] Detected: avia');
            const akzeptieren = avia.querySelector('.avia-cookie-consent a[href="#"][class*="avia-cookie-consent-button-"]');
            if (akzeptieren) {
               beenden();
               window.setTimeout(function () {
                  akzeptieren.click();
               }, 202);
            }
         }

         // cookiebar_optin_219
         const cookiebaroptin219 = document.querySelector('#cookiebar_optin_219.mod_cookiebar_optin_slim');
         if (cookiebaroptin219) {
            console.log('[Cookie auto decline] Detected: cookiebar_optin_219');
            const ablehnen = cookiebaroptin219.querySelector('.cookiebar_disagree > a[data-privacy]');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            }
         }

         // sirdata.com
         const sirdatacom = document.querySelector('#sd-cmp[class^="sd-cmp-"]');
         if (sirdatacom && document.cookie.includes('euconsent-v2') === false) {
            console.log('[Cookie auto decline] Detected: sirdata.com');
            const ablehnen = sirdatacom.querySelector('button:has(+ button + button)');
            const ablehnen2 = sirdatacom.querySelector('div > button:has(+ div > a[href="https://cmp.sirdata.com/"])');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            } else if (ablehnen2) {
               beenden();
               window.setTimeout(function () {
                  ablehnen2.click();
               }, 202);
            }
         }

         // https://setupad.com/
         const setupad = document.querySelector('body > .stpd_cmp');
         if (setupad && localStorage.getItem('additional-consent') === null) {
            console.log('[Cookie auto decline] Detected: https://setupad.com/');
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
            const ablehnen = mkmlegal.shadowRoot.querySelector('#cookieConsent button.deny');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            }
         }

         // https://2b-advice.com/
         const twobadvice = document.querySelector('#bbcdBanner.b-banner[style]');
         if (twobadvice && document.cookie.includes('_2BCookieSettings') === false) {
            console.log('[Cookie auto decline] Detected: https://2b-advice.com/');
            const einstellungen = twobadvice.querySelector('button#bbcdBannerButtonSettings');
            if (einstellungen) {
               beenden();
               window.setTimeout(function () {
                  einstellungen.click();
                  window.setTimeout(function () {
                     const speichern = document.querySelector('#bbcdSettings button#bbcdButtonOK_dialog_St');
                     if (speichern) {
                        speichern.click();
                     }
                  }, 202);
               }, 202);
            }
         }

         // https://webstollen.de/
         const webstollen = document.getElementById('ws_eu-cookie-container');
         if (webstollen && document.cookie.includes('eu_cookie_store') === false) {
            console.log('[Cookie auto decline] Detected: https://webstollen.de/');
            const buttons = webstollen.querySelectorAll('[class*="button"] > button');
            const speichern = webstollen.querySelectorAll('[class^="centerCat_buttons"] > a');
            const einstellungen = webstollen.querySelector('span[class^="modal_text_smaller"] > span + a');
            const einstellungen2 = webstollen.querySelector('#eu-cookie-details-anzeigen-b');
            if (buttons && buttons.length >= 2) {
               for (let i = 0; i < buttons.length; i++) {
                  if (buttons[i].innerText.includes('Ablehnen') || buttons[i].innerText.includes('Minimale Funktionen')) {
                     beenden();
                     window.setTimeout(function () {
                        buttons[i].click();
                     }, 202);
                  }
               }
            } else if (speichern && speichern.length >= 2) {
               for (let i = 0; i < speichern.length; i++) {
                  if (speichern[i].innerText.includes('Speichern')) {
                     beenden();
                     window.setTimeout(function () {
                        speichern[i].click();
                     }, 202);
                  }
               }
            } else if (einstellungen && bereitsgeklickt === false) {
               bereitsgeklickt = true;
               window.setTimeout(function () {
                  einstellungen.click();
               }, 202);
            } else if (einstellungen2 && bereitsgeklickt === false) {
               bereitsgeklickt = true;
               window.setTimeout(function () {
                  einstellungen2.click();
               }, 202);
            }
         }

         // https://www.jtl-software.de/
         const jtlsoftwarede = document.querySelector('#consent-manager.active, #consent.active');
         if (jtlsoftwarede && window.localStorage.getItem('consent') === null) {
            console.log('[Cookie auto decline] Detected: #consent-manager');
            const ablehnen = document.querySelector('#consent-manager.active button#consent-banner-btn-close');
            const ablehnen2 = document.querySelector('#consent.active button#consent--banner-btn-decline');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            } else if (ablehnen2) {
               beenden();
               window.setTimeout(function () {
                  ablehnen2.click();
               }, 202);
            }
         }

         // blogspot.com
         const blogspot = document.querySelector('#cookieChoiceInfo.cookie-choices-info');
         if (blogspot && document.cookie.includes('displayCookieNotice') === false) {
            console.log('[Cookie auto decline] Detected: blogspot.com');
            const ablehnen = document.querySelector('#cookieChoiceInfo a#cookieChoiceDismiss');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            }
         }

         // jimdo.com
         const jimdo = document.querySelector('div[aria-describedby="cc-individual-cookie-settings"], [class="sR5JB"]');
         if (jimdo && document.cookie.includes('ckies_') === false) {
            console.log('[Cookie auto decline] Detected: jimdo.com');
            const ablehnen = jimdo.querySelector('button#cookie-settings-reject-all, [data-gi-selector="reject-all-cookies"] > a');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            }
         }

         // amp-consent
         const ampconsent = document.querySelector('amp-consent.i-amphtml-element');
         if (ampconsent && (window.localStorage.key(0) === null || (window.localStorage.key(0) && window.localStorage.key(0).includes('amp-store:') === false))) {
            console.log('[Cookie auto decline] Detected: amp-consent');
            const ablehnen = ampconsent.querySelector('button[on="tap:consent-element.reject"]');
            const ablehnen2 = ampconsent.querySelector('button[on="tap:consent.dismiss"]');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            } else if (ablehnen2) {
               beenden();
               window.setTimeout(function () {
                  ablehnen2.click();
               }, 202);
            }
         }

         // shapepress
         const shapepress = document.querySelector('div[class="sp-dsgvo sp-dsgvo-popup-overlay not-accepted"]');
         if (shapepress && document.cookie.includes('sp_dsgvo_cookie_settings') === false) {
            console.log('[Cookie auto decline] Detected: shapepress');
            const ablehnen = shapepress.querySelector('a.sp-dsgvo-privacy-btn-accept-nothing');
            const akzeptieren = shapepress.querySelector('a.sp-dsgvo-privacy-btn-accept-all');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            } else if (akzeptieren) {
               beenden();
               window.setTimeout(function () {
                  akzeptieren.click();
               }, 202);
            }
         }

         // cookiesjsr
         const cookiesjsr = document.querySelector('[id$="cookiesui"] #cookiesjsr');
         if (cookiesjsr && document.cookie.includes('cookiesjsr') === false) {
            console.log('[Cookie auto decline] Detected: cookiesjsr');
            const ablehnen = cookiesjsr.querySelector('button.denyAll');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            }
         }

         // moove_gdpr_cookie_info_bar
         const moove = document.querySelector('aside#moove_gdpr_cookie_info_bar');
         if (moove && document.cookie.includes('moove_gdpr_popup') === false) {
            console.log('[Cookie auto decline] Detected: moove_gdpr_cookie_info_bar');
            const ablehnen = moove.querySelector('button.moove-gdpr-infobar-reject-btn');
            const einstellungen = moove.querySelector('button.moove-gdpr-infobar-settings-btn');
            const ablehnenineinstellungen = document.querySelector('#moove_gdpr_cookie_modal button.moove-gdpr-modal-reject-all');
            const akzeptieren = moove.querySelector('button.moove-gdpr-infobar-allow-all');
            if (ablehnen && ablehnen.offsetHeight > 10) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            } else if (einstellungen && einstellungen.offsetHeight > 10 && bereitsgeklickt === false) {
               bereitsgeklickt = true;
               window.setTimeout(function () {
                  einstellungen.click();
               }, 202);
            } else if (ablehnenineinstellungen && ablehnenineinstellungen.offsetHeight > 10) {
               beenden();
               window.setTimeout(function () {
                  ablehnenineinstellungen.click();
               }, 202);
            } else if (akzeptieren && akzeptieren.offsetHeight > 10) {
               beenden();
               window.setTimeout(function () {
                  akzeptieren.click();
               }, 202);
            }
         }

         // cookieinformation.com
         const cookieinformationcom = document.querySelector('#coiOverlay[role="banner"][style="display: flex;"][aria-hidden="false"]');
         if (cookieinformationcom && document.cookie.includes('CookieInformationConsent') === false) {
            console.log('[Cookie auto decline] Detected: https://cookieinformation.com/');
            const ablehnen = cookieinformationcom.querySelector('button#declineButton');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            }
         }

         // cookieinfoscript.com
         const cookieinfoscriptcom = document.querySelector('.cookieinfo[style^="position: fixed; left: 0px; right: 0px; height: auto; min-height: 21px; z-index: 2147483647; "]');
         if (cookieinfoscriptcom && document.cookie.includes('CookieInfoScript') === false) {
            console.log('[Cookie auto decline] Detected: https://cookieinfoscript.com');
            const ablehnen = cookieinfoscriptcom.querySelector('.cookieinfo-close');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            }
         }

         // cookie-permission-container
         const cookiepermissioncontainer = document.querySelector('.cookie-permission-container[data-cookie-permission="true"][style="display: block;"]');
         if (cookiepermissioncontainer && document.cookie.includes('cookie-preference') === false) {
            console.log('[Cookie auto decline] Detected: cookie-permission-container');
            const ablehnen = cookiepermissioncontainer.querySelector('button.btn-primary');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            }
         }

         // mw-cookiewarning-container
         const mwcookiewarningcontainer = document.querySelector('[class="mw-cookiewarning-container"]');
         if (mwcookiewarningcontainer && document.cookie.includes('cookiewarning_dismissed') === false) {
            console.log('[Cookie auto decline] Detected: mw-cookiewarning-container');
            const akzeptieren = mwcookiewarningcontainer.querySelector('form [name="disablecookiewarning"]');
            if (akzeptieren) {
               beenden();
               window.setTimeout(function () {
                  akzeptieren.click();
               }, 402);
            }
         }

         // tc-privacy-wrapper
         const tcprivacywrapper = document.querySelector('#tc-privacy-wrapper.tc-privacy-wrapper.tc-privacy-override');
         if (tcprivacywrapper && document.cookie.includes('TC_PRIVACY') === false) {
            console.log('[Cookie auto decline] Detected: tc-privacy-wrapper');
            const ablehnen = tcprivacywrapper.querySelector('button[id*="_tc_privacy_button"].tc-privacy-button:is([title="Weiter ohne Zustimmung"], [title="Ablehnen"])');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            }
         }

         // tarteaucitronRoot
         const tarteaucitronroot = document.getElementById('tarteaucitronRoot');
         if (tarteaucitronroot && document.cookie.includes('=wait') === true) {
            console.log('[Cookie auto decline] Detected: tc-privacy-wrapper');
            const ablehnen = tarteaucitronroot.querySelector('button[id^="tarteaucitronAllDenied2"], button[onclick="tarteaucitron.userInterface.respondAll(false);"]');
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
            const speichern = offcanvas.querySelector('button[class="btn btn-primary btn-block js-offcanvas-cookie-submit"]');
            if (speichern && (speichern.innerText.toLowerCase().includes('akzeptieren') || speichern.innerText.toLowerCase().includes('speichern'))) {
               beenden();
               window.setTimeout(function () {
                  speichern.click();
               }, 202);
            }
         }

         // eightworks-cookie-consent-plus
         const eightworkscookieconsentplus = document.querySelector('#eightworks-cookie-consent-plus[data-cookie-permission="true"]');
         if (eightworkscookieconsentplus && document.cookie.includes('cookie-preference') === false) {
            console.log('[Cookie auto decline] Detected: eightworks-cookie-consent-plus');
            const einstellungen = eightworkscookieconsentplus.querySelector('a.cookie-permission--configure-button[href="#"]');
            const speichern = eightworkscookieconsentplus.querySelector('button[class="btn btn-default js-offcanvas-cookie-submit eightworks-cookie-consent-plus-button eightworks-cookie-consent-plus-button-mod1"][title="Speichern"]');
            if (speichern) {
               beenden();
               window.setTimeout(function () {
                  speichern.click();
               }, 602);
            } else if (einstellungen && einstellungen.offsetHeight > 1 && bereitsgeklickt === false) {
               bereitsgeklickt = true;
               window.setTimeout(function () {
                  einstellungen.click();
               }, 202);
            }
         }

         // cc_banner-wrapper
         const ccbannerwrapper = document.querySelector('div[class="cc_banner-wrapper "] :is(div[class="cc_banner cc_container cc_container--open"], div[class="cc-banner cc_container cc_container--open"])');
         if (ccbannerwrapper && document.cookie.includes('cookieconsent_dismissed') === false) {
            console.log('[Cookie auto decline] Detected: cc_banner-wrapper');
            const akzeptieren = ccbannerwrapper.querySelector('a[data-cc-event="click:dismiss"]');
            if (akzeptieren) {
               beenden();
               window.setTimeout(function () {
                  akzeptieren.click();
               }, 202);
            }
         }

         // transcend.io
         const transcend = document.querySelector('#transcend-consent-manager[style="position: fixed; z-index: 2147483647;"]');
         if (transcend && window.localStorage.getItem('tcmConsent') === null) {
            console.log('[Cookie auto decline] Detected: transcend.io');
            // Shadow Root is closed so the addon need to go this way.
            window.localStorage.setItem('tcmConsent', '{"purposes":{"SaleOfInfo":false,"Analytics":false,"Functional":true,"Advertising":false},"timestamp":"' + cookiedatum + '","confirmed":true,"prompted":true,"updated":true}');
            beenden();
            location.reload();
         }

         // ketch.com
         const ketch = document.querySelector('#ketch-modal.ketch-flex, #ketch-banner.ketch-flex');
         if (ketch) {
            console.log('[Cookie auto decline] Detected: ketch.com');
            const ablehnen = ketch.querySelector('div:has(> div:first-child > div:first-child > div:first-child > p:first-child) > div:last-child > button:is([aria-label="Reject All"], [aria-label="Alle ablehnen"], [aria-label="DECLINE"])');
            const speichern = ketch.querySelector('div:has(> div > a[href^="https://www.ketch.com/"]) > div > button[aria-label="Save choices"]');
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
            }
         }

         // otCKAppData
         const otckappdata = document.querySelector('.otCookiesNotification > #cookies-wrapper');
         if (otckappdata && document.cookie.includes('_consentik_cookie') === false) {
            console.log('[Cookie auto decline] Detected: otCKAppData');
            const ablehnen = otckappdata.querySelector('#cookies-dismiss[role="button"]');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            }
         }

         // sliding-popup
         const slidingpopup = document.querySelector('div[id="sliding-popup"][class="sliding-popup-bottom"][style]');
         if (slidingpopup && document.cookie.includes('cookie-agreed') === false) {
            console.log('[Cookie auto decline] Detected: sliding-popup');
            const ablehnen = slidingpopup.querySelector('button.decline-button');
            const speichern = slidingpopup.querySelector('.eu-cookie-compliance-save-preferences-button');
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
            }
         }

         // evidon
         const evidon = document.querySelector('#_evidon_banner, #_evidon-barrier-wrapper');
         if (evidon && evidon.offsetHeight >= 1) {
            console.log('[Cookie auto decline] Detected: evidon');
            const ablehnen = evidon.querySelector('button#_evidon-decline-button, button#_evidon-barrier-declinebutton');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            }
         }

         // axept.io
         const axept = document.querySelector('#axeptio_overlay.axeptio_mount[data-project-id]');
         if (axept && document.cookie.includes('axeptio') === true && document.cookie.includes('%2Cgoogle_analytics%2C') === false) {
            console.log('[Cookie auto decline] Detected: axept.io');
            const ablehnen = axept.querySelector('button#axeptio_btn_dismiss');
            let ablehnen2 = axept.querySelector('.needsclick');
            const einstellungen = axept.querySelector('button#axeptio_btn_configure');
            const speichern = axept.querySelector('button#axeptio_btn_next');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 402);
            } else if (ablehnen2 && ablehnen2.shadowRoot) {
               ablehnen2 = axept.querySelector('.needsclick').shadowRoot.querySelector('button#axeptio_btn_dismiss');
               if (ablehnen2) {
                  beenden();
                  window.setTimeout(function () {
                     ablehnen2.click();
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
            }
         }

         // wordpress
         const wordpress = document.querySelector('#cmp-app-container iframe');
         if (wordpress && document.cookie.includes('euconsent-v2') === false) {
            console.log('[Cookie auto decline] Detected: wordpress cookie banner');
            const einstellungen = wordpress.contentWindow.document.querySelector('button[class="cmp-components-button is-secondary"]');
            const ablehnen = wordpress.contentWindow.document.querySelector('button[class="cmp-components-button white-space-normal is-secondary"]');
            if (ablehnen) {
               beenden();
               window.setTimeout(function () {
                  ablehnen.click();
               }, 202);
            } else if (einstellungen && bereitsgeklickt === false) {
               bereitsgeklickt = true;
               window.setTimeout(function () {
                  einstellungen.click();
               }, 202);
            }
         }

         // cookiehub.com
         const cookiehub = document.querySelector('div[role="dialog"].ch2-visible.ch2-dialog, div[class="ch2-settings ch2-settings-scan ch2-visible"]');
         if (cookiehub && document.cookie.includes('cookiehub') === false) {
            console.log('[Cookie auto decline] Detected: cookiehub.com');
            const einstellungen = cookiehub.querySelector('button.ch2-open-settings-btn');
            const ablehnenineinstellungen = document.querySelector('div[class="ch2-settings ch2-settings-scan ch2-visible"] button.ch2-deny-all-btn');
            if (ablehnenineinstellungen) {
               beenden();
               window.setTimeout(function () {
                  ablehnenineinstellungen.click();
               }, 202);
            } else if (einstellungen && bereitsgeklickt === false) {
               bereitsgeklickt = true;
               window.setTimeout(function () {
                  einstellungen.click();
               }, 202);
            }
         }


         // Advanced
         if (advancedcounter >= 5 && advancedrun === true && window.self === window.top) {
            const advancedcontainer = document.querySelectorAll(':is(div, form, dialog, section, aside, cms-cookie-bar, li):is([class*="cookie"], [class*="Cookie"], [id*="cookie"], [id*="Cookie"], [class*="keks"], [id*="keks"], [aria-labelledby*="cookie"], [aria-labelledby*="consent"], [aria-label*="ookie"], [aria-label*="consent"], cookie-law, [class*="consent"], [id*="consent"], [class*="privacy"], [id*="privacy"], [class*="c-disclaimer"], [class*="cc_banner"], [class*="cc_overlay"], [class*="gdpr"], [id*="gdpr"], [class*="dsgvo"], [id*="dsgvo"], [data-testid="consent-banner"]):not([style*="display: none !important"], [style*="visibility: hidden !important"], :empty)');

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
                  if (a.querySelector('a[href*="cookie"]') != null ||
                     a.querySelector('a[href*="Cookie"]') != null ||
                     text.includes('diese seite benutzt cookies') ||
                     text.includes('diese website benutzt cookies') ||
                     text.includes('diese webseite benutzt cookies') ||
                     text.includes('diese seite nutzt cookies') ||
                     text.includes('diese website nutzt cookies') ||
                     text.includes('diese webseite nutzt cookies') ||
                     text.includes('diese seite verwendet cookies') ||
                     text.includes('diese website verwendet cookies') ||
                     text.includes('diese webseite verwendet cookies') ||
                     text.includes('diese seite verwendet notwendige cookies') ||
                     text.includes('diese website verwendet notwendige cookies') ||
                     text.includes('diese webseite verwendet notwendige cookies') ||
                     text.includes('diese seite verwendet technisch notwendige cookies') ||
                     text.includes('diese website verwendet technisch notwendige cookies') ||
                     text.includes('diese webseite verwendet technisch notwendige cookies') ||
                     text.includes('diese seite nutzt ausschließlich technisch notwendige cookies') ||
                     text.includes('wir setzen technisch notwendige cookies ein') ||
                     text.includes('wir setzen notwendige cookies ein') ||
                     text.includes('wir setzen cookies ein') ||
                     text.includes('wir verwenden cookies') ||
                     text.includes('wir verwenden auf dieser website cookies') ||
                     text.includes('wir nutzen essentielle cookies') ||
                     text.includes('wir nutzen cookie') ||
                     text.includes('wir benutzen cookies') ||
                     text.includes('auf dieser website nutzen wir cookies') ||
                     text.includes('verwendet cookies, um') ||
                     text.includes('die website verwendet cookies') ||
                     text.includes('verwendeten cookies') ||
                     text.includes('verwenden wir cookies') ||
                     text.includes('dass wir cookies verwenden') ||
                     text.includes('mehr über cookies auf unserer webseite') ||
                     text.includes('der nutzung aller cookies') ||
                     text.includes('cookies gesetzt') ||
                     text.includes('cookie hinweis') ||
                     text.includes('cookiehinweis') ||
                     text.includes('analytische cookies') ||
                     text.includes('cookies helfen uns') ||
                     text.includes('wir Cookies setzen') ||
                     text.includes('setzen wir cookies') ||
                     text.includes('cookies zu akzeptieren') ||
                     text.includes('verwendung von cookies') ||
                     text.includes('wir respektieren ihre privatsphäre') ||
                     text.includes('wir schätzen ihre privatsphäre') ||
                     text.includes('statistik-cookies') ||
                     text.includes('cookies verwalten') ||
                     text.includes('optionalen cookies zustimmen') ||
                     text.includes('unwesentliche cookies ablehnen') ||
                     text.includes('essenzielle cookies') ||
                     text.includes('nur notwendige cookies') ||
                     text.includes('gebrauch von cookies') ||
                     text.includes('nur essentielle cookies') ||
                     text.includes('erforderliche cookies') ||
                     text.includes('performance-cookies') ||
                     text.includes('technisch notwendige cookies') ||
                     text.includes('alle cookies akzeptieren') ||
                     text.includes('cookie einstellungen') ||
                     text.includes('cookie-einstellungen') ||
                     text.includes('privatsphären-einstellungen') ||
                     text.includes('privatsphäre-einstellungen') ||
                     text.includes('cookie-präferenz') ||
                     text.includes('wir verwenden tools,') ||
                     text.includes('this website uses cookies') ||
                     text.includes('this site uses cookies') ||
                     text.includes('uses cookies from') ||
                     text.includes('we use cookies') ||
                     text.includes('we use essential cookies') ||
                     text.includes('cookie policy') ||
                     text.includes('cookie privacy') ||
                     text.includes('cookie notice privacy') ||
                     text.includes('cookies notice') ||
                     text.includes('website makes use of cookies') ||
                     text.includes('manage cookies') ||
                     text.includes('accept all cookies') ||
                     text.includes('we serve cookies on this site') ||
                     text.includes('Cookie instellingen') ||
                     text.includes('stosujemy pliki cookies') ||
                     text.includes('ta strona korzysta z ciasteczek')) {
                     // Buttons suchen und klicken.
                     const buttons = a.querySelectorAll('button, a:not([href*="/"]), a[href*="optOut"], a[href*="optout"], a[class*="button"], [role="button"], input[type="button"], input[type="submit"], :is([class*="dismiss"], [id*="dismiss"], [class*="preferences"], [id*="preferences"], [class*="submit"], [id*="submit"], [class*="close"], [id*="close"], [class*="reject"], [id*="reject"], [class*="decline"], [id*="decline"], [class*="mandatory"], [id*="mandatory"], [class*="accept"], [id*="accept"], [id*="ausblenden"], [class*="ausblenden"], [id*="essential"], [class*="essential"]):is(span, div):not(:has(button))');
                     if (buttons.length > 0) {
                        let finalerbutton;
                        let gewichtung = 3;
                        for (let k = 0; k < buttons.length; k++) {
                           const a = buttons[k];
                           if (sichtbarkeitsprüfung(a) === true) {
                              const btn = buttons[k].innerText.toLowerCase().trim();
                              let btninput = buttons[k].value;
                              if (btninput) {
                                 btninput = btninput.toLowerCase().trim();
                              }
                              // Ablehnen
                              if (((btninput && btninput.includes('ablehnen')) || btn.includes('ablehnen') || btn.includes('lehne') || btn.includes('nein') || btn.includes('notwendige') || btn.includes('schließen') || btn.includes('nur technisch') || btn.includes('verweigern') || btn.includes('essenzielle') || btn.includes('keine tracking-cookies') || btn.includes('ohne ') || btn.includes('reject') || btn.includes('decline') || btn.includes('deny') || btn.includes('refuse') || btn.includes('disallow') || btn.includes('necassy') || btn.includes('dismiss') || btn.includes('close') || btn.includes('nie akceptuję') || btn.includes('no, ') || btn.includes('no ') || btn === 'no') && btn.length < 45) {
                                 finalerbutton = buttons[k];
                                 break;
                              } else if ((btn.includes('einstellungen übernehmen') || btn.includes('speichern') || btn.includes('auswahl ') || btn.includes('ausgewählte') || btn.includes('keuze opslaan')) && btn.length < 45) {
                                 finalerbutton = buttons[k];
                                 gewichtung = 1;
                              } else if (attributchecker(a) && gewichtung > 1) {
                                 finalerbutton = buttons[k];
                                 gewichtung = 2;
                              } else if (((btninput && (btninput.includes('akzeptieren') || btninput.includes('inverstanden'))) || btn.includes('akzeptieren') || btn.includes('ich stimme') || btn.includes('zustimmen') || btn.includes('alle auswählen') || btn.includes('agree') || btn.includes('accept') || btn.includes('verstanden') || btn.includes('ausblenden') || btn === 'ok' || btn === 'ein­ver­standen') && btn.length < 45 && gewichtung > 2) {
                                 finalerbutton = buttons[k];
                                 gewichtung = 3;
                              }
                           }
                        }
                        if (finalerbutton) {
                           beenden();
                           window.setTimeout(function () {
                              console.log('[Cookie auto decline] Detected: Unbekannter Cookie Banner.');
                              finalerbutton.click();
                           }, 202);
                        }
                     }

                  }
                  break;
               }
            }

            function attributchecker(a) {
               const attribute = a.attributes;
               for (let k = 0; k < attribute.length; k++) {
                  const v = attribute[k].value.toLowerCase().trim().toLocaleLowerCase();
                  if ((v.includes('schließen') || v.includes('close') || v.includes('dismiss') || v.includes('reject') || v.includes('disallow') || v.includes('akceptuję')) && a.innerText.length < 5) {
                     return true;
                  }
               }
            }

            function cookieattributchecker(a) {
               const attribute = a.attributes;
               for (let k = 0; k < attribute.length; k++) {
                  const v = attribute[k].value.toLowerCase().trim().toLocaleLowerCase();
                  if (v.includes('cookie')) {
                     return true;
                  }
               }
            }

            function sichtbarkeitsprüfung(a) {
               const check = window.getComputedStyle(a);
               if (check.getPropertyValue("display") !== "none" && check.getPropertyValue("visibility") === "visible" && check.getPropertyValue("content-visibility") === "visible" && check.getPropertyValue("opacity") > 0.3 && (a.offsetHeight > 1 || a.offsetWidth > 1) && a.getBoundingClientRect().bottom <= document.body.offsetHeight + 10) {
                  return true;
               } else {
                  return false;
               }
            }
         } else {
            advancedcounter++;
         }


         // Ende Intervall
      }, 200);

      // Spezifisch

      const regeln = [{
         seite: 'youtube.com',
         selector: 'tp-yt-paper-dialog#dialog div.eom-buttons.ytd-consent-bump-v2-lightbox ytd-button-renderer:first-child button[aria-label]',
         checkcookie: 'SOCS',
         noframe: true
      }, {
         seite: 'consent.google.com',
         selector: 'form[action="https://consent.google.com/save"] button[aria-label*="blehnen"]'
      }, {
         seite: 'consent.youtube.com',
         selector: 'form[action="https://consent.youtube.com/save"] button[aria-label*="blehnen"]'
      }, {
         seite: 'consent.yahoo.com',
         selector: 'button.reject-all[name="reject"][value="reject"]'
      }, {
         seite: 'europa.eu',
         selector: '#cookieConsentBanner button#cookieDeclined',
         checkcookie: 'consent_cookies'
      }, {
         seite: 'autismus.de',
         selector: 'a.cc_btn_accept_all[data-cc-event="click:dismiss"]'
      }, {
         seite: 'msn.com',
         selector: '#ez-cookie-dialog-wrapper #ez-save-settings'
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
         selector: '#cc_privacy_layer button.cc_open_settings',
         selectorfinal: '#cc_privacy_layer button.cc_accept_settings'
      }, {
         seite: 'transparency.meta.com',
         checkstorage: 'Session',
         selector: '[data-testid="cookie-policy-dialog"] button[data-cookiebanner="accept_button"]'
      }, {
         seite: 'meta.com',
         checkstorage: 'Session',
         selector: 'div[role="dialog"][aria-label*="ookies"] > div:first-child > div:first-child[aria-hidden] > div:first-child > div:last-child[aria-hidden] > div:last-child > div:first-child > div:first-child > div:first-child > div:first-child > div:last-child > div:last-child > div[role="button"][tabindex]'
      }, {
         seite: 'facebook.com',
         checkstorage: 'wd',
         selector: '[role="dialog"] [tabindex="0"]:is([aria-label*="ookies"], [aria-label*="lapukus"])'
      }, {
         seite: 'threads.net',
         checkstorage: 'Session',
         selector: 'div[role="dialog"] div[aria-hidden="false"] div[role="button"][tabindex="0"] + div[role="button"][tabindex="0"]'
      }, {
         seite: 'instagram.com',
         selector: 'div[style="display: flex; flex-direction: column; height: 100%; max-width: 100%;"] > button[tabindex] + button[tabindex]'
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
         selector: '[data-gdpr-consent-prompt] + div button[data-gdpr-open-full-settings]',
         selector2: '#gdpr-privacy-settings button[data-wt-overlay-close]',
         selectorfinal: '#gdpr-privacy-settings button[data-wt-overlay-close]' // zweiter versuch wenn erster nicht geht.
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
         seite: 'otto.de',
         checkcookie: 'cb=',
         selector: '#cookieBanner .cookieBanner__footer span.js_cookieBannerProhibitionButton'
      }, {
         seite: 'connox.de',
         checkcookie: 'CookieConsent',
         selector: '#cookiebanner #cookiebanner-buttoncontainer a#savecookiesettings-onlyselected'
      }, {
         seite: 'twitch.tv',
         selector: 'button[data-a-target="consent-banner-manage-preferences"]',
         selectorfinal: 'button[data-a-target="consent-modal-save"]',
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
         selector: '#gdpr-banner .gdpr-banner-actions > button#gdpr-banner-decline'
      }, {
         seite: 'dailymotion.com',
         checkcookie: 'dm-euconsent-v2',
         selector: 'div[role="dialog"][aria-label="Your data privacy"] button[class^="TCF2ContinueWithoutAcceptingButton__button___"]'
      }, {
         seite: 'bbc.com',
         selector: '#cookiePrompt > section.bbccookies-banner button#bbccookies-continue-button.continue-button'
      }, {
         seite: 'amazon.de,amazon.com,amazon.co.uk,amazon.it,amazon.es,amazon.com.tr,amazon.pl',
         selectorfinal: 'form#sp-cc button#sp-cc-rejectall-link',
         countdown: 1000
      }, {
         seite: 'aliexpress.com,aliexpress.us',
         checkcookie: 'u_p_s=2',
         selector: '#gdpr-new-container button.btn-more',
         selectorfinal: '#gdpr-new-container button.btn-save'
      }, {
         seite: 'dan.com',
         checkcookie: 'cookie_permission',
         selector: '.cookie-banner__content .cookie-banner__content-btns button.cookie-banner__content-essential-btn[type="button"]'
      }, {
         seite: 'mediafire.com',
         checkcookie: 'accept-cookies',
         selector: '#cookie-accept-footer a.CookieAcceptance-accept'
      }, {
         seite: 'brightdata.com',
         checkcookie: 'brd_is_eu',
         selector: '.cookies_popup_overlay .cookies_bar_popup_btns a#brd_cookies_bar_settings[role="button"]'
      }, {
         seite: 'wall-art.de',
         checkcookie: 'cookieOptions',
         selector: '#cookieNote .cookie__buttons button#adjust-cookie-settings',
         selectorfinal: '#cookieNote .cookie__buttons button#saveCookieSelection'
      }, {
         seite: 'wirkaufendeinauto.de',
         checkstorage: 'gdpr_preferences',
         selector: 'form[action="/v1/gdpr-preferences/"] div[class^="GDPRBanner-module_banner_"] [data-qa-selector="gdpr-banner-configuration-button"][role="button"]',
         selectorfinal: 'form[action="/v1/gdpr-preferences/"] div[class^="GDPRBanner-module_banner_"] [data-qa-selector="gdpr-banner-accept-selected-button"][role="button"]'
      }, {
         seite: 'auto.de',
         checkstorage: 'cookieConfig',
         selector: '.modalWrapper > .modalContent > .logoContainer > button.modalBtnAccept'
      }, {
         seite: 'gdatasoftware.com',
         checkcookie: 'GDS_CookieConsent',
         selector: '#gd-cookie-consent button[data-cookie-save="none"]'
      }, {
         seite: 'filescan.io',
         checkstorage: 'cookieNote',
         selector: 'button[aria-label="Reject cookies"]'
      }, {
         seite: 'parlons-basket.com',
         checkcookie: 'euconsent-v2',
         selector: '#sd-cmp button[class*="sd-cmp-"]'
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
         seite: 'ble.de,bafa.de,aufstiegs-bafoeg.de,verfassungsschutz.de,bundespolizei.de,bbk.bund.de',
         checkcookie: 'gsbbanner',
         selector: '#cookiebanner.cookiebanner button.js-banner-button-confirm-selection[type="button"]'
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
         seite: 'schleswig-holstein.de,bmbf.de',
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
         selector: '#colorbox.cookie-popup a.cookie-manage',
         selector2: '#cookie-manage input[name*="ional"]',
         selectorfinal: '#cookie-manage a.savePreference'
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
         selector: 'sibbo-cmp-layout a#configCmpButtonMain',
         selector2: 'sibbo-cmp-layout a#rejectAllConsent',
         selectorfinal: 'sibbo-cmp-layout a#purposesNavLegInt:not([disabled])'
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
         seite: 'deutsche-islam-konferenz.de,digital-fuer-deutschland.de,bvl.bund.de,auslandsschulwesen.de,bamf.de,thw.de,itzbund.de,bafin.de',
         checkcookie: 'cookiebanner',
         selector: '#cookiebanner .js-close-banner'
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
         selectorfinal: '#cookiePrefPopup .buttonGroup > div#rejectAllButton',
         countdown: 4502
      }, {
         seite: 'hema.com,hema.nl',
         checkcookie: 'cookieConsentSubmitted',
         selector: '.js-cookie-wall button.js-cookie-reject-btn',
         selectoralternate: '.js-cookie-bar button.js-close-cookies[type="button"]'
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
         selector: '#cookie_popin_itsap_home button.perso',
         selectorfinal: '#cookie_popin_itsap_cookies button.enregistrer'
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
         selector: '#cookieModal button#cookieSaveButton[type="button"]'
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
         selector: '.welcome--consent-wall button.welcome__button--decline[type="button"]',
         selectorfinal: '.terms-conditions button.transfer__button'
      }, {
         seite: 'smard.de',
         checkstorage: 'smard-cookiebanner',
         selector: '.js-cookie-banner button.js-cookie-decline'
      }, {
         seite: 'allesfuerzuhause.de',
         checkcookie: 'cookiePreferences',
         selector: '#cookies-modal button[id$="_declinebtn"]'
      }, {
         seite: 'hfbgmbh.de',
         checkcookie: 'aviaCookieConsent',
         selector: '.avia-cookie-consent .avia-button'
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
         checkcookie: 'OTZ',
         selector: 'div[aria-label*="oogle"] > div:last-child > span > div > div > div > div[class] > div > button[id][class][data-ved]:first-child',
         noframe: true
      }, {
         seite: 'plus.web.de,plus.gmx.net',
         checkcookie: 'consentLevel',
         selector: 'html.window-on > .window-on .row > button[data-id="reminder"]#reminder.btn-secondary'
      }, {
         seite: 'tiktok.com',
         sonderfall: 'tiktokcom'
      }, {
         seite: 'reddit.com',
         sonderfall: 'redditcom'
      }, {
         seite: 'kabeleins.de,kabeleinsdoku.de,sat1gold.de,prosieben.de,sat1.de,sixx.de,prosiebenmaxx.de,joyn.de',
         checkcookie: 'cmp-settings',
         sonderfall: 'fernsehsender'
      }, {
         seite: 'lefigaro.fr',
         checkcookie: 'fig_firstparty',
         sonderfall: 'lefigarofr'
      }, {
         seite: 'lachainemeteo.com',
         checkcookie: 'savedProfile',
         sonderfall: 'lachainemeteocom'
      }, {
         seite: 'tumblr.com',
         sonderfall: 'tumblrcom'
      }, {
         seite: 'startmail.com',
         checkcookie: 'cb_rejected',
         selector: '.banner button.button-secondary'
      }, {
         seite: 'furminator.net',
         checkcookie: 'cookie_layer_closed',
         selector: '#cookieLayer a.cookie-layer-settings',
         selector2: '#cookieDisturber input[id="group-Marketing Cookies"]',
         selectorfinal: '#cookieDisturber a[onclick="checkEssentialAndSave()"]'
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
         selector: '.cookies_modalbox a.js_cookies_extended',
         selector2: '.cookies_modalbox input#functional_cookies',
         selectorfinal: '.cookies_modalbox button.cookies_save_settings.js_cookies_save'
      }, {
         seite: 'lifesum.com',
         checkstorage: 'accepted-cookies',
         selector: 'div[data-focus-lock-disabled] div.mb-20 > button:last-child.mx-auto.inline-block'
      }, {
         seite: 'bundesregierung.de',
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
         selector: '#gdpr-dialog a.js-gdpr-settings',
         selector2: '#gdpr-dialog input#mediaSwitch',
         selectorfinal: '#gdpr-dialog button#btnDeny[type="button"]'
      }, {
         seite: 'neiki.dev',
         selectorfinal: '#gdpr-cookie-message2 button#gdpr-cookie-accept',
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
         selector: 'div[aria-labelledby="AP_cookies-dialog-title"] button#toggleCookieFunctional',
         selectorfinal: 'div[aria-labelledby="AP_cookies-dialog-title"] button.AP_mdf-accept',
         countdown: 1000
      }, {
         seite: 'backstagepro.de,regioactive.de',
         checkcookie: 'reject',
         selector: '#cookiescript_injected span[data-cs-show-title="cookie-script"]',
         selectorfinal: '#cookiescript_injected_fsd #cookiescript_reject'
      }, {
         seite: '12xl.de,elektroversand-schmidt.de,optikplus.de,wissenschaft-shop.de',
         checkcookie: 'cookienote=set',
         selector: '#cookieSelectionForm button#adjust-cookie-settings',
         selectorfinal: '#cookieSelectionForm button#saveCookieSelection'
      }, {
         seite: 'heldenlounge.de',
         checkcookie: 'cookie-preference',
         selector: '.cookie-permission-container button.btn-primary'
      }, {
         seite: 'henschel-schauspiel.de',
         checkcookie: 'ck_consent',
         selector: 'input#cconsentcheck',
         selectorfinal: '#approveform a.arrlink'
      }, {
         seite: 'mediathekviewweb.de',
         checkstorage: 'allowCookies',
         selector: '#cookieModal button#cookieDenyButton'
      }, {
         seite: 'virginaustralia.com',
         checkcookie: 'virginCookiesAccepted',
         selectorfinal: '.cmp-container button#cookieAcceptanceBtn',
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
         seite: 'wp.pl,money.pl,o2.pl,parenting.pl,pudelek.pl,autokult.pl,gadzetomania.pl,fotoblogia.pl,komorkomania.pl,polygamia.pl,abczdrowie.pl,benchmark.pl,kafeteria.pl,pysznosci.pl,dobreprogramy.pl,genialne.pl,autocentrum.pl,jastrzabpost.pl,deliciousmagazine.pl',
         checkcookie: 'PWA_adbd',
         setcookie: 'WPci=1;',
         selector: 'body > div[class]:not([id], [data-container]) > div > div:last-child > div:last-child > div:first-child > button',
         selectorfinal: 'body > div[class]:not([id], [data-container]) > div:first-child > div:last-child > div:first-child + div > div:last-child > button:first-child'
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
         selectorfinal: '#cookies_consent button#btnSave[onclick]',
         countdown: 500
      }, {
         seite: 'handyhuellen.de',
         checkstorage: 'mage_consent',
         selector: '#consent a[href="consent/data/preferences"]',
         selectorfinal: '#consent a[href="#save"]'
      }, {
         seite: 'kevag-telekom.de',
         selector: '#fullScreenLockBlockOverlayKp .notConfirmKp'
      }, {
         seite: 'phase-6.de',
         checkcookie: 'GDPR',
         selectorfinal: 'button#noCookies[onclick*="setGdprCookieRequired"]',
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
         selector: '[data-test="cookie-consent-modal"] button[type="button"]',
         selectorfinal: '[data-test="cookie-consent-modal"] > div > div:nth-last-of-type(2) button[type="button"]'

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
         selectorfinal: '.adsk-gdpr-content button#adsk-eprivacy-privacy-decline-all-button',
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
         selector: 'button#consent-settings-button',
         selectorfinal: 'button.consent-banner-button-accept-overlay'
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
         selector: '.contao-cookiebar .cc-groups > div:last-child > input',
         selectorfinal: '.contao-cookiebar button.save'
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
         selector: '#privacy-container #matomo-btn-decline',
         selectorfinal: '#communice-cookiebar #cookiebar-btn-understand'
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
         selector: '.cookie-permission-container .js-cookie-configuration-button > button',
         selectorfinal: '.offcanvas-cookie button.js-offcanvas-cookie-submit'
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
         selectorfinal: '#cookieModal button#cookiebar-safe-settings',
         countdown: 500
      }, {
         seite: 'get-in-it.de',
         checkstorage: 'Get_CookieConsent',
         selector: '#Get_CookieConsentBox a#coocon-extend-main-screen[href="javascript:void(0)"]',
         selectorfinal: '#Get_CookieConsentBox a#coocon-deny-all'
      }, {
         seite: 'commerzbank.de',
         checkcookie: 'cmp_PUK',
         selector: '.cookiebox--landind-drawer button#denyAll'
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
         selector: '#cookie-banner-overlay .open-cookie-options',
         selectorfinal: '#cookie-options [data-econda-marker*="AcceptSelectionClick"]'
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
         selectorfinal: 'button.gdpr-deny-all',
         countdown: 1000
      }, {
         seite: 'futurezone.at',
         checkcookie: '__pid',
         selectorfinal: '.consentOverlay button',
         countdown: 1500
      }, {
         seite: 'robert-thomas.de',
         checkcookie: 'cookieAllow',
         selector: '.cookie--consent button#cookie--consent_confirm'
      }, {
         seite: 'klarna.com',
         checkstorage: 'FIRST_LOAD',
         selector: '#ModalLayout > div > div > div + div + div > button[style^="padding"]'
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
         selectorfinal: '#kick__pur a[onclick="ov.cmp.acceptAllConsents()"]'
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
         checkcookie: 'consent',
         selector: '#cmp-modal button#modalSettingBtn',
         selector2: '#cmp-modal-two input#gravitolightCMP2',
         selectorfinal: '#cmp-modal-two button#modalAcceptSelectedBtn'
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
         seite: 'augsburger-allgemeine.de',
         checkstorage: 'SDGIds',
         selector: '#pur_layer button#pgwl_pur-option-accept-button'
      }, {
         seite: 'vercel.com',
         checkcookie: 'fides_consent',
         selector: '#fides-banner button[data-testid="Deny-btn"]'
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
         seite: 'industr.com',
         selector: '#redesignCmpWrapper a[rel="noopener noreferrer"][target="_self"][type="button"]'
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
         selector: '[data-module="cookieBanner"] button.cb_setup',
         selector2: '[data-module="SetupCookies"] input[value="FUNCTIONALITY"]',
         selectorfinal: '[data-module="SetupCookies"] input#hook_FormButton_button_save_choice',
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
         selector: '#GDPRConsentManagerContainer #ccmgt_explicit_preferences',
         selectorfinal: '#GDPRConsentManagerContainer #ccmgt_preferences_reject',
         checkcookie: 'CONSENTMGR'
      }, {
         seite: 'idnes.cz',
         selectorfinal: 'a[href="javascript:Didomi.setUserAgreeToAll();"]',
         countdown: 500,
         checkcookie: 'euconsent-v2'
      }, {
         seite: 'incogni.com',
         selector: '[class^="CookieConsent_cookieConsent"] button[data-testid="cookie-consent-left"]',
         selectorfinal: '[class^="CookieConsent_cookieConsent"] button[data-testid="cookie-consent-right"]'
      }, {
         seite: 'atresplayer.com',
         selector: 'sibbo-cmp-layout #acceptAllMain',
         checkcookie: 'euconsent'
      }, {
         seite: 'beacons.ai',
         selector: '#beacons-cookie-banner button[onclick="confirmRejectAll()"]',
         checkcookie: '_bConsentSet'
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
         seite: 'nytimes.com',
         selector: '.fides-overlay-modal-link-shown button.fides-reject-all-button',
         checkcookie: 'fides_consent'
      }, {
         seite: 'hit-touristik.de',
         selector: '[class^="CookiesInfo__BtnWrapper"] > button + button',
         checkcookie: 'acceptCookies'
      }, {
         seite: 'windtech-international.com',
         selector: '#eu_cookies button.button_cookie',
         checkcookie: 'windtech'
      }, {
         seite: 'helmonline.de',
         selector: '[data-role="gdpr-cookie-container"] button[data-amgdprcookie-js="settings"]:not([disabled])',
         selectorfinal: '.amgdprcookie-cookie-settings-modal button.amgdprcookie-done',
         checkcookie: 'amcookie_allowed'
      }, {
         seite: 'proidee.de',
         selector: '#COOKIE_EINSTELLUNG_BANNER a[onclick*="sendCookieData(false"]'
      }, {
         seite: 'dropbox.com',
         selector: '#ccpa-iframe-theme-provider button#decline_cookies_button',
         checkcookie: '__Secure-dbx_consent'
      }, {
         seite: 'euractiv.de',
         selector: '#termly-code-snippet-support button.t-declineButton'
      }, {
         seite: 'kraemer.de',
         selector: '#consentLayer button[onclick="openConsentSettings();"]',
         selectorfinal: '#consentLayer button[onclick="uncheckAllCheckboxes();"]',
         checkcookie: 'websale_useragreement_optoutunchecked_consentAll'
      }, {
         seite: 'pflanzenforschung.de',
         selector: '#eucookielaw a.acceptclose',
         checkcookie: 'eucookie'
      }, {
         seite: 'mia-moebel.de',
         selector: '#modal-consentmanager #cm-settings-open',
         selectorfinal: '#modal-consentmanager-extended #cm-save-settings',
         checkcookie: 'consent'
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
         seite: 'bioethanol-kamin-shop.de',
         selector: '.eu-cookie-compliance-banner button.eu-cookie-compliance-reject-button',
         checkcookie: 'cookie-'
      }, {
         seite: 'uptodown.com',
         selector: '#cookiescript_injected_wrapper #cookiescript_reject',
         checkcookie: 'consenttime'
      }, {
         seite: 'isolicht.com',
         selectorfinal: '.amgdprjs-bar-template[data-role="gdpr-cookie-container"] button[data-amcookie-js="close-cookiebar"]',
         checkstorage: 'amCookieBarFirstShowTime',
         countdown: 1000
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
         seite: 'galaxus.de',
         selector: '.cookieBanner button[class^="cookieBanner_styled_StyledRejectAllActionButton"]',
         checkcookie: '.consent'
      }, {
         seite: 'amiunique.org',
         selector: 'div[class="v-snack v-snack--active v-snack--bottom v-snack--has-background"] button[class="mr-2 v-btn v-btn--is-elevated v-btn--has-bg v-btn--rounded theme--dark v-size--default"]:first-child:has(+ button:last-child)',
         checkcookie: 'cookie_notice'
      }, {
         seite: 'moderne-hausfrau.de',
         selector: 'dialog > div:last-child > section:only-child > div[class=""]:first-child + div:last-child > div > div:last-child > div:only-child > div:last-child > p#c1-more-info',
         selector2: 'dialog > div:last-child > section:only-child > div[class=""]:first-child + div:last-child > div:only-child > div:only-child > .px-4 > div + div[class="group h-full"] > div:only-child > button#accordion-header-interesse > div > section',
         selectorfinal: 'dialog > div:last-child > section:only-child > div[class=""]:first-child + div:last-child > div:only-child > div:only-child > div:last-child  > div:only-child > button#c2-accept-selection',
         checkcookie: 'userInteracted%22%3Atrue',
      }];

      for (let i = 0; i < regeln.length; i++) {
         // Gucken ob die aufgerufene Seite von einer Regel gedeckt ist.
         let seiten = regeln[i].seite.toString();
         seiten = seiten.split(',');
         for (let k = 0; k < seiten.length; k++) {
            if (location.hostname.endsWith('.' + seiten[k]) || location.hostname === seiten[k]) {
               console.log('[Cookie auto decline] Regel für folgende Seite gefunden: ' + seiten[k]);
               if (document.cookie.includes(regeln[i].checkcookie) === false && localStorage.getItem(regeln[i].checkstorage) === null && ((regeln[i].noframe === true && window.self == window.top) || regeln[i].noframe != true)) {
                  console.log('[Cookie auto decline] Cookie Banner noch nicht akzeptiert.');
                  // Cookie Banner finden und klicken
                  if (regeln[i].selector) {
                     let counter = 0;
                     const findcookiebanner = setInterval(function () {
                        counter++;
                        if (document.querySelector(regeln[i].selector)) {
                           // Privater Test Code 1
                           console.log('[Cookie auto decline] Selector 1');
                           forcesessionstorage();
                           document.querySelector(regeln[i].selector).click();
                           selector2();
                           clearInterval(findcookiebanner);
                        } else if (regeln[i].selectoralternate && document.querySelector(regeln[i].selectoralternate)) {
                           console.log('[Cookie auto decline] Selector Alternative');
                           forcesessionstorage();
                           document.querySelector(regeln[i].selectoralternate).click();
                           selector2();
                           clearInterval(findcookiebanner);
                        }
                     }, 302);
                     setTimeout(function () {
                        clearInterval(findcookiebanner);
                        if (counter > 20) {
                           console.warn('[Cookie auto decline] Kein Cookie Banner gefunden trotz Regel.');
                           // Privater Test Code 2
                        }
                     }, 7000);
                  }

                  function selector2() {
                     if (regeln[i].selector2) {
                        let counter = 0;
                        const findcookiebanner = setInterval(function () {
                           counter++;
                           if (document.querySelector(regeln[i].selector2)) {
                              console.log('[Cookie auto decline] Selektor 2');
                              document.querySelector(regeln[i].selector2).click();
                              runselectorfinal();
                              if (regeln[i].countdown === undefined) {
                                 runselectorfinal();
                              }
                              clearInterval(findcookiebanner);
                           }
                        }, 202);
                        setTimeout(function () {
                           clearInterval(findcookiebanner);
                           if (counter > 15) {
                              console.warn('[Cookie auto decline] Cookie Banner zwischenschritt gescheitert.');
                           }
                        }, 5000);
                     } else if (regeln[i].countdown === undefined) {
                        runselectorfinal();
                     }
                  }

                  function runselectorfinal() {
                     if (regeln[i].selectorfinal) {
                        let counter = 0;
                        const findcookiebanner = setInterval(function () {
                           counter++;
                           if (document.querySelector(regeln[i].selectorfinal)) {
                              console.log('[Cookie auto decline] Selectorfinal');
                              forcesessionstorage();
                              document.querySelector(regeln[i].selectorfinal).click();
                              clearInterval(findcookiebanner);
                           }
                        }, 202);
                        setTimeout(function () {
                           clearInterval(findcookiebanner);
                           if (counter > 15) {
                              console.warn('[Cookie auto decline] Cookie konnte final nicht akzeptiert werden.');
                           }
                        }, 5000);
                     }
                  }
                  if (regeln[i].countdown) {
                     window.setTimeout(runselectorfinal, regeln[i].countdown);
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
                  if (regeln[i].sonderfall === 'tiktokcom') {
                     window.setTimeout(function () {
                        const check = document.querySelector('tiktok-cookie-banner').shadowRoot.querySelector('.button-wrapper > button:first-child');
                        if (check) {
                           check.click();
                        }
                     }, 2002);
                  } else if (regeln[i].sonderfall === 'redditcom') {
                     const findcookiebanner = window.setInterval(function () {
                        const ablehnen = document.querySelector('div[style^="opacity: 1; "] > section:last-child > section:last-child > form > button[role="button"]');
                        const ablehnen2 = document.querySelector('reddit-cookie-banner').shadowRoot.querySelector('div.items-center > shreddit-interactable-element#reject-nonessential-cookies-button > button');
                        if (ablehnen) {
                           window.clearInterval(findcookiebanner);
                           ablehnen.click();
                        } else if (ablehnen2) {
                           window.clearInterval(findcookiebanner);
                           ablehnen2.click();
                        }
                     }, 202);
                     window.setTimeout(function () {
                        window.clearInterval(findcookiebanner);
                     }, 7002);
                  } else if (regeln[i].sonderfall === 'fernsehsender') {
                     const findcookiebanner = window.setInterval(function () {
                        const ablehnen = document.querySelector('cmp-banner').shadowRoot.querySelector('cmp-dialog').shadowRoot.querySelector('cmp-link').shadowRoot.querySelector('a');
                        const test = document.querySelector('cmp-banner').shadowRoot.querySelector('cmp-dialog').shadowRoot.querySelector('cmp-button[variant="secondary"]').innerText;
                        const einstellungenundspeichern = document.querySelector('cmp-banner').shadowRoot.querySelector('cmp-dialog').shadowRoot.querySelector('cmp-button[variant="secondary"]').shadowRoot.querySelector('button');
                        if (ablehnen) {
                           window.clearInterval(findcookiebanner);
                           window.setTimeout(function () {
                              ablehnen.click();
                           }, 202);
                        } else if (test === 'ABLEHNEN ODER EINSTELLUNGEN') {
                           window.setTimeout(function () {
                              einstellungenundspeichern.click();
                           }, 202);
                        } else if (test === 'EINWILLIGUNG ABLEHNEN WIE AUSGEWÄHLT' || test === 'EINWILLIGUNGEN ABLEHNEN WIE AUSGEWÄHLT') {
                           window.setTimeout(function () {
                              window.clearInterval(findcookiebanner);
                              einstellungenundspeichern.click();
                           }, 202);
                        }
                     }, 202);
                     window.setTimeout(function () {
                        window.clearInterval(findcookiebanner);
                     }, 10002);
                  } else if (regeln[i].sonderfall === 'lefigarofr') {
                     window.setTimeout(function () {
                        const check = document.querySelector('#appconsent > iframe');
                        if (check) {
                           const akezptieren = check.contentDocument.querySelector('button.button__acceptAll');
                           if (akezptieren) {
                              akezptieren.click();
                           }
                        }
                     }, 1502);
                  } else if (regeln[i].sonderfall === 'lachainemeteocom') {
                     window.setTimeout(function () {
                        const check = document.querySelector('#appconsent > iframe').contentWindow.document.querySelector('.banner__controlArea > section > button:last-child');
                        if (check) {
                           check.click();
                           localStorage.setItem('appconsent', '{"consents":{"consentables":[{"id":1,"iab_id":1,"name":{"values":{"fr":"Stocker et/ou accéder à des informations sur un terminal"}},"description":{"values":{"fr":"Les cookies, identifiants de votre terminal ou autres informations peuvent être stockés ou consultés sur votre terminal pour les finalités qui vous sont présentées."}},"description_legal":{"values":{"fr":"Les partenaires peuvent :\n* Stocker des informations et accéder à des informations stockées sur le terminal, comme les cookies et les identifiants du terminal présentés à un utilisateur."}},"status":1,"legintStatus":0,"type":0},{"id":2,"iab_id":2,"name":{"values":{"fr":"Sélectionner des publicités standard"}},"description":{"values":{"fr":"Les publicités peuvent vous être présentées en fonction du contenu éditorial que vous consultez, de l’application que vous utilisez, de votre localisation approximative, ou de votre type de terminal\n"}},"description_legal":{"values":{"fr":"Pour sélectionner des publicités standard, les p');
                        }
                     }, 1202);
                  } else if (regeln[i].sonderfall === 'tumblrcom') {
                     window.setTimeout(function () {
                        const check = document.querySelector('#cmp-app-container iframe').contentWindow.document.querySelector('button.is-primary[type="button"]');
                        if (check) {
                           check.click();
                        }
                     }, 202);
                  } else if (regeln[i].sonderfall === 'truckscout24de') {
                     if (window.location.href === 'https://www.truckscout24.de/main/consent') {
                        if (document.querySelector('a[href="javascript:history.back()"]')) {
                           document.querySelector('a[href="javascript:history.back()"]').click();
                        }
                     } else {
                        sessionStorage.removeItem('mpowlesu908hxfyw37ghg5ikx90jdzt');
                        if (document.querySelector('#cookie-notification a.btn[href="/main/consent"]')) {
                           document.querySelector('#cookie-notification a.btn[href="/main/consent"]').click();
                        }
                     }
                  }
               }
               break;
            }
         }
      }
      // Weitere Sonderfälle die gar nicht oben reinpassen.
      if (window.location.host.endsWith('.de') && (window.location.host.includes('sparkasse-') || window.location.host.includes('-sparkasse') || window.location.host.includes('stadtsparkasse-') || window.location.host.startsWith('www.ssk') || window.location.host.startsWith('www.spk') || window.location.host.endsWith('haspa.de')) && document.cookie.includes('ePrivacyStatus') === false) {
         console.log('[Cookie auto decline] Detected: Sparkasse cookie banner');
         window.setTimeout(function () {
            const check = document.querySelector('div[class*="privacy"] .ebutton > a[data-form=".eprivacy_optin_decline"]');
            if (check) {
               forcesessionstorage();
               check.click();
            }
         }, 202);
      }
      // Privater Test Code 3
   }
})();
// Privater Test Code 4
