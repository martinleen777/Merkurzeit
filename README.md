# MerkurZeit — сайт merkurzeit.com

Сайт двух залов MerkurZeit в Гамбурге (Eilbeker Spielhalle и Fiesta Spielhalle). Перенесён с Wix на GitHub Pages: без рекламы Wix и без платного тарифа.

Сайт собирается автоматически: изменили файл на GitHub (или сделали push в `main`) — через 1–2 минуты GitHub Actions пересобирает и публикует сайт.

## Где что лежит

| Файл | Что в нём |
|---|---|
| `src/site.mjs` | **Тексты главной страницы, данные залов** (часы работы, адреса, телефоны), ссылки на Instagram/Facebook, e-mail, идентификатор Google Analytics |
| `src/content/spielerschutz.html` | Страница «Spielerschutz» |
| `src/content/impressum.html` | Impressum |
| `src/content/datenschutz.html` | Datenschutzerklärung |
| `src/content/stellenangebote.html` | Вакансии |
| `src/static/img/` | Фотографии: `hero` (главная), `eilbeker`, `fiesta`, `galerie-1` … `galerie-6` |
| `src/style.css` | Оформление (цвета — в начале файла) |
| `src/build.mjs` | Генератор сайта (обычно менять не нужно) |
| `.github/workflows/deploy.yml` | Автоматическая сборка и публикация |

## Как поменять текст, часы работы, телефон

1. На github.com откройте нужный файл (например, `src/site.mjs`), нажмите ✏️ (Edit).
2. Поменяйте текст между кавычками `"…"`.
3. **Commit changes**. Через 1–2 минуты изменения на сайте.

В страницах `src/content/*.html` меняйте только текст между тегами (`<p>Текст</p>`). Новую страницу можно добавить, создав файл `src/content/имя.html` по образцу — она появится по адресу `merkurzeit.com/имя/`.

## Как заменить фотографию

Подготовьте JPG, назовите так же, как старый файл (например, `galerie-3.jpg`), и загрузите в `src/static/img/` (**Add file → Upload files**). Рядом лежат `.webp` и уменьшенные `-640` версии — их тоже нужно обновить (или удалить старые `.webp`, чтобы не показывалось старое фото). Проще всего попросить Claude: он сам подготовит все размеры.

## Google Analytics и баннер согласия

Идентификатор (`G-…`) записывается в `src/site.mjs` → `GA_ID`. Пока там `""`, аналитики и баннера нет.

Как это работает (TDDDG § 25, DSGVO): при первом посещении внизу появляется баннер с одинаково заметными кнопками «Akzeptieren» и «Ablehnen»; Google Analytics загружается **только после «Akzeptieren»**; ссылка «Cookie-Einstellungen» внизу каждой страницы снова открывает баннер, при отзыве согласия cookies `_ga` удаляются. Сроки хранения данных из настроек Google Analytics (Admin → Data retention) нужно вписать в `src/content/datenschutz.html` вместо `[AUFBEWAHRUNG]`.

## Посмотреть сайт у себя

```bash
npm run serve
```

Затем откройте http://localhost:8000/ (нужны Node.js 18+ и Python 3).

## Хостинг и домен (один раз)

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.** Сайт появится на https://martinleen777.github.io/merkurzeit/
2. **GoDaddy → DNS** домена `merkurzeit.com`:
   - четыре записи **A**, имя `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` — и никаких других A-записей для `@` (удалить старые записи Wix и переадресацию/Forwarding);
   - запись **CNAME**, имя `www`, значение `martinleen777.github.io`.
3. **Settings → Pages → Custom domain:** `merkurzeit.com` → Save; когда появится «DNS check successful» и выпустится сертификат — **Enforce HTTPS**.
4. Перезапустить сборку: Actions → Deploy to GitHub Pages → Run workflow.
5. Старый адрес вакансий на Wix (`/down-for-maintenance`) автоматически перенаправляется на `/stellenangebote/`.
