# Cookie auto decline

***

<a href="https://addons.mozilla.org/de/firefox/addon/cookie-auto-decline/"><img src="https://user-images.githubusercontent.com/585534/107280546-7b9b2a00-6a26-11eb-8f9f-f95932f4bfec.png" alt="Get Cookie auto decline for Firefox"></a>

***

  <br>
Immer mehr Cookie Banner, Consent Banner und GDPR Banner lassen sich nicht mehr blockieren oder verstecken ohne die Webseiten zu beschädigen. Das Addon "Cookie auto decline" löst dieses Dilemmer indem es solche Cookie Banner nicht einfach versteckt oder blockiert sondern diese wirklich im Hintergrund mit minimaler Zustimmung akzeptiert oder die erforderlichen Cookies setzt damit der Cookie Banner nicht erscheint. Das Addon arbeitet dafür unauffällig im Hintergrund.<br><br>

Das Addon unterstützt viele bekannte Cookie Banner wie [Contentpass](https://www.contentpass.net/de), [consentmanager.net](https://www.consentmanager.net/), [onetrust.com](https://www.onetrust.com/), consensu, cookiebot, privacy-mgmt.com, [usercentrics.eu](https://usercentrics.com/) und viele mehr. Auch größere individuelle Seiten wie Google, Youtube, Yahoo, facebook usw. werden unterstützt. Dadurch ist es möglich den Cookie Banner auf über 1.000.000 Seiten zu erkennen und abzulehnen.<br>

Hinweis: Das Addon umgeht keine "Cookie Paywalls". Sollte es keine Ablehnen/Einstellungen Funktion geben werden die Cookies normal akzeptiert.

<h3>Die Vorteile</h3>
<ul>
  <li>Nahezu keine kaputten Webseiten da Cookie Banner wirklich geklickt und nicht einfach nur versteckt oder blockiert werden.</li>
  <li>Es werden auch redirect Cookie Banner erkannt (z.b. consent.google.com oder consent.yahoo.com).</li>
  <li>Anders als andere Browser Addons lehnt dieses Addon Tracking wenn möglich ab auch wenn es technisch komplexer ist.</li>
  <li>Das Addon ist absolut <b>Werbe, Tracking und Telemetriefrei.</b></li>
  <li>Keine nervigen Benachrichtigungen oder überfrachtete Menüs. Das Addon erledigt seine Arbeit unkompliziert im Hintergrund.</li>
  <li>Da das Addon keine Cookie Banner dauerhaft versteckt und nur für die ersten Sekunden aktiv ist können Cookie Banner im Nachhinein bei Bedarf aufgerufen und Einstellungen geändert werden.</li>
</ul>
<details>
  <summary>Details zu den Berechtigungen</summary>
  <ul>
    <li><b>host_permissions all_urls</b> wird benötigt damit das Addon auf das HTML der Webseite zugreifen kann. Dies wird benötigt um Cookie Banner zu finden und zu klicken sowie Cookies zu setzen.</li>
    <li><b>activeTab</b> wird benötigt damit das Addon zwischen dem Content Script (der Script der direkt auf der Webseite ausgeführt wird) und dem Popup Script (der Script der im Popup läuft sobald man ihn öffnet) kommunizieren kann. Dies wird benötigt um den Cookie Banner Status zu übermitteln (z.b. Cookie Banner gefunden? Ja/Nein). </li>
    <li><b>storage</b> wird benötigt um Nutzereinstellungen zu speichern (z.b. ob das Addon auf der Webseite vom Nutzer deaktiviert wurde). Bei der deinstallation des Addons werden die Daten vom Browser gelöscht.</li>
  </ul>
  
</details>
<hr>

<details>
  <summary>English (click to expand) 🇺🇸</summary>
  <br>
  More and more cookie banner, consent banner and GDPR banner can't be blocked or hidden without breaking the website. The Addon "Cookie auto decline" solving the problem by clicking the button or setting the required cookie so the banner doesn't appear. The addon works in the background without the need of further interaction.<br><br>
  
  The addon supports many cookie banner scripts like [Contentpass](https://www.contentpass.net/de), [consentmanager.net](https://www.consentmanager.net/), [onetrust.com](https://onetrust.com/), consensu, cookiebot, privacy-mgmt.com, [usercentrics.eu](https://usercentrics.com/) and more. Also self made cookie banner on bigger sites like on Google, Youtube, Yahoo or Facebook are supported. With this its possible to detect and decline the cookie banner on over 1.000.000 websites.<br>

Note: The addon doesn't circumvent "Cookie banner paywalls". When there is no decline or settings button the addon will click the accept button.

<h3>The advantages</h3>
<ul>
  <li>Nearly no broken pages because the cookie banner getting clicked, not just hidden or blocked.</li>
  <li>It also works with redirect cookie banner (like consent.google.com oder consent.yahoo.com).</li>
  <li>The addon trying to decline tracking even when its more complex.</li>
  <li>There are <b>no ads, no tracking und no Telemetry</b> at all.</li>
  <li>No annoying annoyances or heavy settings menus. The addon works in the background.</li>
  <li>The addon is only for a few seconds active so cookie banner settings can be changed after this (like enabling third-party videoplayer).</li>
</ul>

<details>
  <summary>permission details</summary>
  <ul>
    <li><b>host_permissions all_urls</b> is needed for the addon to be able to access the website HTML code to be able to find and click cookie banner and placing cookies.</li>
    <li><b>activeTab</b> is needed to communicate between the content script (the script which runs on the website) and the popup script (the script which runs inside the popup when a user opens it). This is needed to display the cookie banner info (like cookie banner found? yes/no).</li>
    <li><b>storage</b> is needed to save the user settings (example: On which sites the addon got disabled by the user). When the addon getting uninstalled the saved data getting deleted by the browser.</li>
  </ul>
</details>

Link to the firefox addon (english): https://addons.mozilla.org/en-US/firefox/addon/cookie-auto-decline/
</details>
