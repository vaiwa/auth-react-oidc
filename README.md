# React OIDC Authentication POC

Toto je POC (Proof of Concept) aplikace demonstrující implementaci autentikace pomocí knihovny `react-oidc-context`.

## Instalace

```bash
npm install
```

## Spuštění

```bash
npm run dev
```

Aplikace bude dostupná na `http://localhost:5173`

## Konfigurace OIDC

Aplikace používá environment variables pro konfiguraci OIDC. Zkopírujte `.env.example` do `.env` a upravte hodnoty podle potřeby:

```bash
cp .env.example .env
```

Proměnné prostředí:

- **VITE_OIDC_AUTHORITY**: URL vašeho OIDC providera (např. Keycloak)
- **VITE_OIDC_CLIENT_ID**: ID clienta v OIDC provideru
- **VITE_OIDC_REDIRECT_URI**: Redirect URI po úspěšném přihlášení

Výchozí konfigurace:

- Authority: `http://localhost:8080/realms/terkyRealm`
- Client ID: `public-app`
- Redirect URI: `http://localhost:5173`

## Struktura aplikace

### Komponenty

- **App.tsx** - Hlavní komponenta s AuthProvider a routingem
- **Nav.tsx** - Navigační komponenta s login/logout funkcionalitou
- **PrivateRoute.tsx** - Wrapper komponenta pro chráněné routes
- **SecuredRoute.tsx** - Chráněná stránka (vyžaduje přihlášení)
- **UnsecuredRoute.tsx** - Veřejná stránka (bez autentikace)

### Routes

- `/` - Domovská stránka
- `/unsecured` - Veřejná stránka
- `/secured` - Chráněná stránka (přesměruje na login pokud nejste přihlášeni)

## Funkcionality

1. **Automatické přesměrování** - Při pokusu o přístup na chráněnou stránku bez přihlášení
2. **Login/Logout** - Tlačítka v navigaci
3. **Zobrazení user informací** - Na chráněné stránce se zobrazí údaje o přihlášeném uživateli
4. **React Router integrace** - Plná integrace s react-router-dom

## Poznámky

- Aplikace očekává běžící Keycloak server na `localhost:8080`
- Client musí být nakonfigurován jako `public-app` v Keycloak
- Redirect URI musí být povolená v Keycloak konfiguraci
