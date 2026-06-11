# Prospects — batch-uri de outreach

Fiecare batch = un fișier `*.json` (datele prospecților) + un fișier `*.md` generat (linkuri demo + scripturi de outreach gata de trimis).

## Workflow

1. Cercetează 10 afaceri reale (Google Maps + site + Instagram). Doar date publicate public de afacere.
2. Completează `batch.json` (vezi formatul în `../tools/make-links.mjs`).
3. Generează linkurile: `node ../tools/make-links.mjs batch.json --md batch-links.md`
4. Scurtează fiecare link (is.gd / tinyurl) înainte de trimitere.
5. Trimite DM/email, notează data în coloana de tracking, follow-up la 3 zile.

## Reguli de bun-simț (și GDPR) pentru cold outreach B2B

- Scrie doar pe adrese/conturi **de business** (contact@..., pagina de Instagram a salonului), nu pe adrese personale.
- Identifică-te clar: cine ești (WebStudio), de ce scrii, cum te pot contacta.
- Un singur follow-up. Dacă nu răspund sau spun nu — scoate-i din listă definitiv.
- Folosește doar informații pe care afacerea le-a publicat singură (site, listare Google, bio Instagram).
- La cerere de ștergere/oprire, răspunde și șterge datele din batch.

## Status batch-uri

| Batch | Oraș | Nișă | Trimise | Răspunsuri | Demo-uri cerute |
|---|---|---|---|---|---|
| 01 | Cluj-Napoca | Saloane | 0/10 | – | – |
