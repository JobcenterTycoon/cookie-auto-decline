# cookie-auto-decline

***

<a href="https://addons.mozilla.org/de/firefox/addon/cookie-auto-decline/"><img src="https://user-images.githubusercontent.com/585534/107280546-7b9b2a00-6a26-11eb-8f9f-f95932f4bfec.png" alt="Get Cookie auto decline for Firefox"></a>

***

Immer mehr Cookie Banner lassen sich nicht mehr blockieren oder verstecken ohne die Webseiten zu beschädigen. Das Addon "Cookie auto decline" soll eine Hilfe aus diesem Dilemmer sein indem es solche Cookie Banner nicht einfach versteckt oder blockiert sondern diese wirklich im Hintergrund mit minimaler Zustimmung akzeptiert oder die erforderlichen Cookies setzt damit der Cookie Banner nicht erscheint. 

Das Addon arbeitet dafür unauffällig im Hintergrund.
Das Addon unterstützt viele bekannte Cookie Banner wie [Contentpass](https://www.contentpass.net/de), [consentmanager.net](https://www.consentmanager.net/), [cookielaw.org](https://www.cookielaw.org/), consensu, cookiebot, privacy-mgmt.com, [usercentrics.eu](https://usercentrics.com/) und viele mehr. Auch größere individuelle Seiten wie Google, Youtube, Yahoo, facebook usw. werden unterstützt.

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
<h3>Schutz vor Webseitenbeschädigungen</h3>
Das Addon nutzt mehrere Verfahren um zu verhindern das es Webseiten beschädigt:
<br><br>
<ol>
  <li>Das Addon wird nur 1x pro Webseitensitzung ausgeführt. Wird z.b. die Webseite neu geladen bricht das Addon direkt ab (Schutz vor Reload Schleifen).</li>
  <li>Wenn möglich prüft das Addon ob die Cookies bereits gesetzt wurden. Wenn ja bricht das Addon direkt ab (Schutz vor Überschreiben der Einstellungen).</li>
  <li>Das Addon sucht nur für einige Sekunden nach Cookie Bannern. Sollte es innerhalb der Zeit keine finden bricht das Addon die Suche ab (Schutz vor ungewollten Klicken).</li>
  <li>Kein dauerhaftes verstecken oder blockieren von Cookie Bannern (Schutz vor allgemeinen Problemen).</li>
</ol>


> [!IMPORTANT]
> Damit das Addon funktioniert muss die Berechtigung "Auf Ihre Daten für diverse Websites zugreifen" <b>global!!</b> erteilt werden. Dazu oben in die URL Leiste about:addons eingeben -> Enter -> Auf das Addon klicken -> Berechtigungen -> "Auf Ihre Daten für diverse Websites zugreifen" aktivieren. Wer das Addon auch im privaten Modus nutzen möchte muss dies ebenso in den Addon Einstellungen erlauben.
