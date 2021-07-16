
# Verkefni 2

[Kynning í fyrirlestri](https://youtu.be/c8YD7QWsjIY).

Setja skal upp fjórar síður, aðgengilegar af internetinu:

1. Forsíða með tenglum á aðrar síður
2. Síða með formi
3. Síða með töflu
4. Síða með texta

Allar síður fyrir utan forsíðu skulu vera innan `pages/` möppu.

Fyrir hverja síðu, skal síðan:

* Hafa snyrtilega uppsettan kóða þar sem inndráttur er samræmdur
* Nýta merkingarfræðilega viðeigandi element
* Vera villulaus ef hún er prófuð með [HTML validator](https://validator.w3.org/)
* Vera án aðgengisvillna ef hún er prófuð með [WAVE](http://wave.webaim.org/)

## Forsíða

Setja skal síður upp á [heimasvæði](http://uts.hi.is/node/155) undir möppu `.public_html/vefforritun/verkefni2` svo verkefnið verði aðgengilegt á `https://notendur.hi.is/<notendanafn>/vefforritun/verkefni2` þar sem `<notendnafn>` er notendanafnið þitt (t.d. `osk`).

## Valmynd

Allar síður skulu innihalda neðst á síðu sömu valmynd og valmynd skal vera sett upp með viðeigandi elementum. Fyrir hverja síðu skal merkja að sú síða sé opin með því að feitletra heiti hennar í valmynd. Athugið að allar síður fyrir utan forsíðu verða að vera undir `pages/` möppu.

Fyrir neðan efni á öðrum síðum en forsíðu er lárétt lína notuð til að aðskilja á milli efnis og valmyndar.

## Form

Form tekur við upplýsingum fyrir nýskráningu notanda og skal vera sett upp með aðgengi í huga.

Eftirfarandi skal biðja um í formi, hópað saman með `<fieldset>` og með viðeigandi `legend`:

* Notandi
  - Notandanafn, texti sem krafist er
  - Netfangi, textareitur sem krafist og innihald ætti að líta út eins og netfang
  - Lykilorð, textareitur sem krafist er og sýnir ekki það sem skrifað er í hann
  - Lykilorð aftur, sama og að ofan, aukalega er reitur merktur með textanum „Lykilorð verða að vera eins“
* Spurningar
  - Kyn, _radio_ val um `Kona`, `Karl`, `Annað`
  - Aldur, val úr lista
    + `Yngri en 13 ára`
    + `13-20 ára`
    + `21-65 ára`
    + `Eldri en 65 ára`
  - `checkbox` val sem er sjálgefið valið með textanum „Senda afrit af notandaupplýsingum á netfang.“
  - Athugasemd, textareitur sem bíður upp á fleiri en eina línu af texta
* Takki til að senda form sem á stendur „Senda“

Þegar ýtt er á takka gerist ekki neitt, þ.e.a.s. engin kóði keyrir og gögn eru ekki send neitt.

Síðan skal hafa fyrirsögnina `Form`.

## Tafla

Útbúa skal töflu með áföngum á tölvunarfræðideild. Gefin eru gögn með stuttu námskeiðsnúmeri, námskeiðsheiti, misseri og einingum.

Gögn í töflu má nálgast í `gogn.csv`. Þar sem um margar línur af gögnum er að ræða er _ekki_ ráðlagt að setja gögnin handvirkt upp í ritli heldur skal nýta virkni í ritli til að breyta gögnum, sjá dæmi í fyrirlestri.

Síðan skal hafa fyrirsögnina `Áfangar í tölvunarfræðideild HÍ 2018`.

## Texti

Textann má finna í `text.md`. Þýða skal viðeigandi Markdown skipanir yfir í HTML. Fyrir lýsingu á því hvað þýðir hvað er hægt að [lesa skjölun Markdown](https://daringfireball.net/projects/markdown/syntax).

Fyrir ofan texta skal standa: „Eftirfarandi texti er fenginn úr Project Gutenberg.“ þar sem „Project Gutenberg“ er slóð á https://www.gutenberg.org/

Vísað er í mynd undir `img/`, mynd er fengin frá [WikiMedia Commons](https://commons.wikimedia.org/wiki/File:Machiavelli_Principe_Cover_Page.jpg). Laga þarf slóð á mynd á HTML skrá, ekki skal færa `img/` möppu.

## Útlit

Fyrir hugmynd um hvernig síða eigi að líta út má skoða skjáskot í `/utlit` möppu.

## Mat

* 20% – Snyrtilega uppsettur kóði með merkingarfræðilegum elementum fyrir hverja síðu
* 20% – Síður án villna frá HTML validator og WAVE validator
* 20% – Form uppsett eftir forskrift
* 20% – Tafla uppsett eftir forskrift
* 20% – Forsíða og textasíða uppsett eftir forskrift

## Sett fyrir

Verkefni sett fyrir í fyrirlestri mánudaginn 3. september 2018.

## Skil

Skila skal undir „Verkefni og hlutaprófa“ á Uglu í seinasta lagi fyrir lok dags þriðjudaginn 11. september 2018.

Skilaboð skulu innihalda slóð á verkefni ásamt zip skjali með lausn sem heitir notendanafni, t.d. `verkefni2-osk.zip`.

## Einkunn

Sett verða fyrir tíu minni verkefni þar sem átta bestu gilda 3,5% hvert, samtals 28% af lokaeinkunn.

Sett verða fyrir tvö hópverkefni þar sem hvort um sig gildir 11%, samtals 22% af lokaeinkunn.

---

> Útgáfa 0.2

### Útgáfusaga

| Útgáfa | Lýsing                              |
|--------|-------------------------------------|
| 0.1    | Fyrsta útgáfa                       |
| 0.2    | Setja inn titla fyrir form og töflu |
