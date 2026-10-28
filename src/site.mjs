// Тексты главной страницы, данные залов и общие настройки сайта MerkurZeit.
// Остальные страницы — HTML-файлы в папке src/content/.

// Идентификатор Google Analytics 4 (G-…). Пустая строка "" — аналитика и баннер согласия отключены.
// Аналитика загружается только после согласия посетителя в баннере (TDDDG § 25, DSGVO).
export const GA_ID = "G-01SJQ3X3Z7";

export const SITE = {
  name: "MerkurZeit",
  domain: "merkurzeit.com",
  title: "MerkurZeit – Spielhallen in Hamburg-Eilbek und Wandsbek",
  description: "MerkurZeit betreibt zwei Spielhallen in Hamburg: die Eilbeker Spielhalle und die Fiesta Spielhalle. Moderne Geldspielgeräte, geschultes Personal, Zutritt ab 18 Jahren.",
  email: "merkurzeit@gmail.com",
  instagram: "https://www.instagram.com/kingclubhamburg",
  facebook: "https://www.facebook.com/kingcasinoclub",
};

export const HOME = {
  heading: ["MerkurZeit", "Spielhallen in Hamburg-Eilbek und Hamburg-Wandsbek"],
  intro: [
    "Willkommen bei MerkurZeit",
    "Wir betreiben zwei Spielhallen in Hamburg. In gepflegten Räumen finden Sie moderne Geldspielgeräte führender Hersteller, eine ruhige Atmosphäre, geschultes freundliches Personal, sowie ein breites Angebot an kleine Snacks und Heiß-, Kaltgetränke.",
    "Der verantwortungsvolle Umgang mit dem Spiel ist uns wichtig. Unser Personal ist im Spieler- und Jugendschutz geschult.",
  ],
  age: "Zutritt ab 18 Jahren",
};

export const HALLS = [
  {
    id: "eilbeker-spielhalle",
    name: "Eilbeker Spielhalle",
    photo: "eilbeker",
    text: "In der Eilbeker Spielhalle finden Sie moderne Geldspielgeräte namhafter Hersteller, darunter Merkur (Gauselmann), Löwen Entertainment und Admiral. Für Ihr Wohlbefinden sorgen unser aufmerksames Personal sowie ein tägliches Angebot an Snacks und Getränken.",
    hours: "12:00-5:00 Uhr",
    address: "Wandsbeker Chaussee 136, 22089 Hamburg",
    phone: "040 20005859",
    location: "Direkt neben U-Bahn Station U1 Ritterstrasse",
  },
  {
    id: "fiesta-spielhalle",
    name: "Fiesta Spielhalle",
    photo: "fiesta",
    text: "Die Fiesta Spielhalle bietet Geldspielgeräte marktführender Hersteller, moderne Geldwechselsysteme und hohe Sicherheitsstandards. Unser aufmerksames Servicepersonal sorgt für eine angenehme Atmosphäre und den Schutz unserer Gäste.",
    hours: "12:00-5:00 Uhr",
    address: "Friedrich-Ebert-Damm 93b, 22047 Hamburg",
    phone: "040 6931640",
    location: "Bushaltestelle BUS 16, 171, 271 Station Stephanstraße",
  },
];

// Фотографии галереи: файлы src/static/img/galerie-N.jpg (+ .webp и уменьшенные -640).
export const GALLERY = [1, 2, 3, 4, 5, 6].map((n) => ({ file: `galerie-${n}`, alt: `Spielhalle – Bild ${n}` }));

export const PLAYER_PROTECTION_NOTE =
  "Zutritt und Spielteilnahme sind erst ab 18 Jahren erlaubt. Wir kontrollieren das Alter am Eingang. Glücksspiel kann süchtig machen. Wenn Sie Hilfe brauchen, sprechen Sie unser Personal an oder rufen Sie die kostenlose und anonyme Beratung des BIÖG an:";
