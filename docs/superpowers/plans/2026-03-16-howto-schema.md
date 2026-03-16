# HowTo Schema Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `HowTo` JSON-LD schema to step-by-step guide posts, following the same front-matter-driven pattern as `FAQPage` schema.

**Architecture:** New `_includes/schema_howto.html` Liquid template generates `HowTo` JSON-LD when `page.how_to` array is present in front matter. Included in `_layouts/default.html` gated on `page.layout == 'post'`. Step content authored as front matter — no body changes required.

**Tech Stack:** Jekyll, Liquid, schema.org HowTo JSON-LD

---

## Chunk 1: The Include and Layout Wire-Up

### Task 1: Create `_includes/schema_howto.html`

**Files:**
- Create: `_includes/schema_howto.html`

- [ ] **Step 1: Create the file with this exact content**

The outer gate in `default.html` already checks `page.how_to`, so no inner guard needed here:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": {{ page.title | jsonify }},
  "description": {{ page.description | default: page.excerpt | strip_html | strip_newlines | truncate: 160 | jsonify }},
  "step": [
    {% for step in page.how_to %}
    {
      "@type": "HowToStep",
      "name": {{ step.name | jsonify }},
      "text": {{ step.text | jsonify }}
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ]
}
</script>
```

- [ ] **Step 2: Wire it into `_layouts/default.html`**

In `_layouts/default.html`, locate the existing `schema_faq.html` include block (around line 21):

```html
    {% if page.faq %}
    {% include schema_faq.html %}
    {% endif %}
```

Add the `schema_howto.html` include directly after it:

```html
    {% if page.faq %}
    {% include schema_faq.html %}
    {% endif %}
    {% if page.layout == 'post' and page.how_to %}
    {% include schema_howto.html %}
    {% endif %}
```

Note: the `page.layout == 'post'` gate is intentional — HowTo is post-only. `schema_faq.html` lacks this gate (existing behavior), but we add it here to be safe.

- [ ] **Step 3: Commit**

```bash
git add _includes/schema_howto.html _layouts/default.html
git commit -m "feat: add HowTo JSON-LD schema include"
```

---

## Chunk 2: Front Matter — Kraken Guides (all 5 languages)

### Task 2: Spanish — `_posts/202603/2026-03-15-como-usar-kraken-espana-2026.md`

**Files:**
- Modify: `_posts/202603/2026-03-15-como-usar-kraken-espana-2026.md`

- [ ] **Step 1: Add `how_to` to front matter**

Add after the `faq:` block (before the closing `---`):

```yaml
how_to:
  - name: "Crear tu cuenta en Kraken"
    text: "Ve a kraken.com y haz clic en Crear cuenta. Introduce tu email y una contraseña segura, confirma el enlace de activación y activa la autenticación en dos pasos (2FA) desde Configuración → Seguridad."
  - name: "Verificar tu identidad (KYC)"
    text: "Ve a Configuración → Verificación, selecciona el nivel Intermedio y sube una foto de tu DNI o pasaporte. Realiza una foto selfie según las instrucciones. La aprobación tarda entre 1 y 3 días hábiles."
  - name: "Depositar euros por transferencia SEPA"
    text: "Ve a Financiar → Depósito → EUR, selecciona Transferencia bancaria (SEPA) y copia el IBAN y la referencia única que te muestra Kraken. Realiza la transferencia desde tu banco incluyendo la referencia en el concepto. El ingreso es gratuito y llega en 1-2 días hábiles."
  - name: "Comprar Bitcoin"
    text: "Con euros en tu cuenta, ve a Comprar/Vender, selecciona BTC/EUR, introduce el importe en euros y confirma la orden al precio de mercado. La compra es prácticamente instantánea."
```

### Task 3: English — `_posts/202603/en/2026-03-15-how-to-use-kraken-2026.md`

**Files:**
- Modify: `_posts/202603/en/2026-03-15-how-to-use-kraken-2026.md`

- [ ] **Step 1: Add `how_to` to front matter**

```yaml
how_to:
  - name: "Create your Kraken account"
    text: "Go to kraken.com and click Create account. Enter your email and a strong password, confirm the activation link, and enable two-factor authentication (2FA) under Settings → Security."
  - name: "Verify your identity (KYC)"
    text: "Go to Settings → Verification, select the Intermediate level and upload a photo of your passport or ID. Complete the selfie step. Approval typically takes 1–3 business days."
  - name: "Deposit funds"
    text: "Go to Funding → Deposit → EUR, select Bank transfer (SEPA) and copy the IBAN and unique reference Kraken provides. Send the transfer from your bank with the reference in the payment description. Free and arrives in 1–2 business days."
  - name: "Buy Bitcoin"
    text: "With EUR in your account, go to Buy/Sell, select BTC/EUR, enter the amount in euros and confirm a market order. The purchase completes almost instantly."
```

### Task 4: Portuguese — `_posts/202603/pt/2026-03-15-como-usar-kraken-portugal-2026.md`

**Files:**
- Modify: `_posts/202603/pt/2026-03-15-como-usar-kraken-portugal-2026.md`

- [ ] **Step 1: Add `how_to` to front matter**

```yaml
how_to:
  - name: "Criar a sua conta na Kraken"
    text: "Aceda a kraken.com e clique em Criar conta. Introduza o seu email e uma palavra-passe segura, confirme o link de ativação e ative a autenticação em dois fatores (2FA) em Definições → Segurança."
  - name: "Verificar a sua identidade (KYC)"
    text: "Vá a Definições → Verificação, selecione o nível Intermédio e carregue uma foto do seu BI ou passaporte. Complete o passo do selfie. A aprovação demora normalmente 1 a 3 dias úteis."
  - name: "Depositar euros por transferência SEPA"
    text: "Vá a Financiar → Depósito → EUR, selecione Transferência bancária (SEPA) e copie o IBAN e a referência única que a Kraken apresenta. Faça a transferência pelo seu banco com a referência na descrição. Gratuito e chega em 1-2 dias úteis."
  - name: "Comprar Bitcoin"
    text: "Com euros na sua conta, vá a Comprar/Vender, selecione BTC/EUR, introduza o montante em euros e confirme uma ordem a mercado. A compra é concluída quase instantaneamente."
```

### Task 5: German — `_posts/202603/de/2026-03-15-kraken-anleitung-deutschland-2026.md`

**Files:**
- Modify: `_posts/202603/de/2026-03-15-kraken-anleitung-deutschland-2026.md`

- [ ] **Step 1: Add `how_to` to front matter**

```yaml
how_to:
  - name: "Konto bei Kraken erstellen"
    text: "Gehe auf kraken.com und klicke auf Konto erstellen. Gib deine E-Mail-Adresse und ein sicheres Passwort ein, bestätige den Aktivierungslink und aktiviere die Zwei-Faktor-Authentifizierung (2FA) unter Einstellungen → Sicherheit."
  - name: "Identität verifizieren (KYC)"
    text: "Gehe zu Einstellungen → Verifizierung, wähle die Stufe Mittel und lade ein Foto deines Personalausweises oder Reisepasses hoch. Schließe den Selfie-Schritt ab. Die Genehmigung dauert in der Regel 1–3 Werktage."
  - name: "Euro per SEPA einzahlen"
    text: "Gehe zu Einzahlung → EUR, wähle Banküberweisung (SEPA) und kopiere die IBAN und die eindeutige Referenz, die Kraken anzeigt. Überweise den Betrag mit der Referenz im Verwendungszweck. Kostenlos, Eingang in 1–2 Werktagen."
  - name: "Bitcoin kaufen"
    text: "Mit Euro auf deinem Konto gehe zu Kaufen/Verkaufen, wähle BTC/EUR, gib den Betrag in Euro ein und bestätige eine Market-Order. Der Kauf ist nahezu sofort abgeschlossen."
```

### Task 6: French — `_posts/202603/fr/2026-03-15-comment-utiliser-kraken-2026.md`

**Files:**
- Modify: `_posts/202603/fr/2026-03-15-comment-utiliser-kraken-2026.md`

- [ ] **Step 1: Add `how_to` to front matter**

```yaml
how_to:
  - name: "Créer votre compte Kraken"
    text: "Rendez-vous sur kraken.com et cliquez sur Créer un compte. Saisissez votre adresse e-mail et un mot de passe sécurisé, confirmez le lien d'activation et activez l'authentification à deux facteurs (2FA) dans Paramètres → Sécurité."
  - name: "Vérifier votre identité (KYC)"
    text: "Allez dans Paramètres → Vérification, sélectionnez le niveau Intermédiaire et téléchargez une photo de votre passeport ou carte d'identité. Complétez l'étape selfie. L'approbation prend généralement 1 à 3 jours ouvrables."
  - name: "Déposer des euros par virement SEPA"
    text: "Allez dans Financer → Dépôt → EUR, sélectionnez Virement bancaire (SEPA) et copiez l'IBAN et la référence unique affichés par Kraken. Effectuez le virement depuis votre banque avec la référence dans le libellé. Gratuit, arrivée en 1–2 jours ouvrables."
  - name: "Acheter du Bitcoin"
    text: "Avec des euros sur votre compte, allez dans Acheter/Vendre, sélectionnez BTC/EUR, saisissez le montant en euros et confirmez un ordre au prix du marché. L'achat est presque instantané."
```

- [ ] **Step 2: Commit all 5 Kraken posts**

```bash
git add _posts/202603/2026-03-15-como-usar-kraken-espana-2026.md
git add _posts/202603/en/2026-03-15-how-to-use-kraken-2026.md
git add _posts/202603/pt/2026-03-15-como-usar-kraken-portugal-2026.md
git add _posts/202603/de/2026-03-15-kraken-anleitung-deutschland-2026.md
git add _posts/202603/fr/2026-03-15-comment-utiliser-kraken-2026.md
git commit -m "feat: add HowTo schema to Kraken guide posts (all languages)"
```

---

## Chunk 3: Front Matter — Older How-To Posts

### Task 7: `_posts/201712/2017-12-03-como-comprar-criptomonedas.md`

**Files:**
- Modify: `_posts/201712/2017-12-03-como-comprar-criptomonedas.md`

- [ ] **Step 1: Add `how_to` to front matter**

Add after the `faq:` block:

```yaml
how_to:
  - name: "Elegir la criptomoneda a comprar"
    text: "Consulta CoinMarketCap para decidir qué criptomoneda comprar y en qué exchange se vende. Bitcoin y Ethereum están disponibles en todos los exchanges con soporte fiat; otras monedas pueden requerir un exchange intermedio."
  - name: "Crear una cuenta en el exchange"
    text: "Regístrate en un exchange como Coinbase o Bitstamp. Activa la autenticación en dos pasos (2FA) y usa una contraseña única y segura."
  - name: "Verificar tu identidad"
    text: "Sube los documentos que solicite el exchange (DNI, pasaporte, a veces una factura de servicios). La verificación puede tardar horas o días y es obligatoria para depositar dinero fiat."
  - name: "Enviar dinero al exchange"
    text: "Deposita euros o dólares mediante transferencia SEPA o tarjeta. Incluye la referencia que te indica el exchange en el concepto de la transferencia para que puedan identificarte."
  - name: "Comprar la criptomoneda"
    text: "Con fondos disponibles, compra la criptomoneda al precio de mercado. La compra es prácticamente instantánea y verás los fondos reflejados en tu cuenta."
  - name: "Mover los fondos a un wallet"
    text: "Transfiere las criptomonedas a un wallet donde controles la clave privada (como Ledger o Trezor). Dejar fondos en el exchange los expone a hackeos o cierres inesperados."
```

### Task 8: `_posts/201712/2017-12-13-como-comprar-altcoins.md`

**Files:**
- Modify: `_posts/201712/2017-12-13-como-comprar-altcoins.md`

- [ ] **Step 1: Add `how_to` to front matter**

Add after the `faq:` block:

```yaml
how_to:
  - name: "Decidir dónde comprar la altcoin"
    text: "Consulta CoinMarketCap, busca la altcoin deseada y mira en qué exchanges se vende. Si el exchange acepta transferencias SEPA, puedes comprar directamente con euros; si no, necesitarás Bitcoin o Ethereum como paso intermedio."
  - name: "Obtener la dirección de envío en Binance"
    text: "Regístrate en Binance, ve a Billetera → Depósito, selecciona Bitcoin o Ethereum y copia la dirección de depósito. Verifica que la red coincide exactamente antes de enviar fondos."
  - name: "Enviar fondos desde Coinbase a Binance"
    text: "En Coinbase, ve a Enviar, pega la dirección de Binance y envía Bitcoin o Ethereum. Para reducir comisiones usa Litecoin si el exchange destino lo acepta. Espera a que la transacción sea confirmada."
  - name: "Comprar la altcoin en Binance"
    text: "En Binance, busca el par de trading (por ejemplo ETH/ALT), selecciona Mercado y compra al precio actual con los fondos que acabas de depositar."
  - name: "Vender y convertir a fiat"
    text: "Para retirar dinero fiat, vende la altcoin por Bitcoin en Binance, transfiere el Bitcoin a Coinbase, véndelo por euros y retira a tu cuenta bancaria mediante transferencia SEPA."
```

- [ ] **Step 2: Commit**

```bash
git add _posts/201712/2017-12-03-como-comprar-criptomonedas.md
git add _posts/201712/2017-12-13-como-comprar-altcoins.md
git commit -m "feat: add HowTo schema to como-comprar posts"
```

---

## Chunk 4: Verify

### Task 9: Validate the JSON-LD output

- [ ] **Step 1: Build the site locally**

```bash
npm run dev
```

Wait for Jekyll to build (watch for "Server running...").

- [ ] **Step 2: Check the HTML output for one post**

Open `http://localhost:4000/como-comprar-criptomonedas/` in a browser, view source, and search for `"@type": "HowTo"`. Verify:
- `name` matches the post title
- `step` array is present with all 6 steps
- JSON is syntactically valid (no unescaped quotes or special characters)

- [ ] **Step 3: Verify the Kraken ES post**

Open `http://localhost:4000/como-usar-kraken-espana-2026/`, view source, confirm `HowTo` JSON-LD is present with 4 steps.

- [ ] **Step 4: Verify a non-how-to post has no HowTo schema**

Open any post without `how_to` front matter (e.g. `http://localhost:4000/que-es-bitcoin/`), view source, confirm there is no `"@type": "HowTo"` block.

- [ ] **Step 5: Leave a comment on GitHub issue #83 and close it**

```bash
curl -s -X POST -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"body":"Added HowTo schema to 7 step-by-step posts: 5 Kraken guides (es/en/pt/de/fr) and 2 older how-to guides. Implementation follows the same front-matter pattern as FAQPage schema (`_includes/schema_howto.html`, gated to `layout == post`)."}' \
  "https://api.github.com/repos/DannieBGoode/criptomo/issues/83/comments"
```
