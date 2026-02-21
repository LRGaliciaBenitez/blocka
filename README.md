# Blocka 🚀📊

Blocka es una **aplicación web de criptomonedas** que permite explorar, buscar y consultar información actualizada del mercado cripto de forma clara, rápida y visual.  
Está pensada para usuarios que desean conocer precios, tendencias y detalles de distintas criptomonedas en tiempo real.

La app consume datos en vivo desde la API de **CoinGecko** y ofrece una experiencia moderna, responsiva y bien estructurada, enfocada en buenas prácticas de desarrollo front-end.

---

## 🧰 Tecnologías utilizadas

- React  
- Redux Toolkit  
- React Router  
- Tailwind CSS  
- JavaScript (ES6+)  
- Testing con Jest y React Testing Library  
- API externa: CoinGecko  

---

## ✨ Funcionalidades

- 🔍 Búsqueda de criptomonedas por nombre  
- 📈 Visualización de precios y datos relevantes  
- 📄 Vista de detalle por criptomoneda  
- ⭐ Gestión de favoritos  
- 💱 Cambio de moneda (USD / MXN)  
- 🌍 Consumo de API externa en tiempo real  
- 📱 Diseño totalmente responsivo  
- 🧪 Tests unitarios y de integración  

---

## 🔗 Demo en producción

👉 https://blockaa.netlify.app/ 

---

## 🚀 Cómo ejecutar el proyecto localmente

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/blocka.git
```
2. Instala las dependencias:
```bash
npm install
```
3. Ejecuta el proyecto:
```bash
npm run dev
```

---

## 📁 Estructura del proyecto

📦src

 ┣ 📂assets
 
 ┃ ┗ 📜logo_brocka.png
 
 ┣ 📂components
 
 ┃ ┣ 📂cards
 
 ┃ ┃ ┣ 📂cardAllCoinsMarket
 
 ┃ ┃ ┃ ┗ 📜CardAllCoinsMarket.jsx
 
 ┃ ┃ ┣ 📂cardTopCoins
 
 ┃ ┃ ┃ ┣ 📜CardTopCoins.jsx
 
 ┃ ┃ ┃ ┗ 📜CoinRow.jsx
 
 ┃ ┃ ┣ 📂cardTopCoinsMarket
 
 ┃ ┃ ┃ ┗ 📜CardTopCoinsMarket.jsx
 
 ┃ ┃ ┣ 📂cardTrending
 
 ┃ ┃ ┃ ┗ 📜CardTrending.jsx
 
 ┃ ┃ ┣ 📂cardTrendingMarket
 
 ┃ ┃ ┃ ┗ 📜CardTrendingMarket.jsx
 
 ┃ ┃ ┗ 📂searchCard
 
 ┃ ┃ ┃ ┗ 📜searchCard.jsx
 
 ┃ ┣ 📜ButtonCurrency.jsx
 
 ┃ ┣ 📜ButtonCurrency.test.js
 
 ┃ ┣ 📜FavoriteButton.jsx
 
 ┃ ┣ 📜FavoriteButton.test.js
 
 ┃ ┣ 📜Header.jsx
 
 ┃ ┣ 📜Header.test.jsx
 
 ┃ ┣ 📜MobileMenu.jsx
 
 ┃ ┣ 📜MobileMenu.test.jsx
 
 ┃ ┣ 📜Search.jsx
 
 ┃ ┣ 📜Search.test.js
 
 ┃ ┣ 📜SearchContainer.jsx
 
 ┃ ┣ 📜SearchContainer.test.js
 
 ┃ ┗ 📜Spinner.jsx
 
 ┣ 📂hooks
 
 ┃ ┗ 📜useComponentsUI.jsx
 
 ┣ 📂pages
 
 ┃ ┣ 📜CoinDetail.jsx
 
 ┃ ┣ 📜CoinDetail.test.js
 
 ┃ ┣ 📜Favoritos.jsx
 
 ┃ ┣ 📜Favoritos.test.js
 
 ┃ ┣ 📜Home.jsx
 
 ┃ ┣ 📜Home.test.js
 
 ┃ ┣ 📜Market.jsx
 
 ┃ ┗ 📜Market.test.js
 
 ┣ 📂redux
 
 ┃ ┣ 📜allCoinsSlice.js
 
 ┃ ┣ 📜allCoinsSlice.test.js
 
 ┃ ┣ 📜coinDetailSlice.js
 
 ┃ ┣ 📜coinDetailSlice.test.js
 
 ┃ ┣ 📜currencySlice.js
 
 ┃ ┣ 📜currencySlice.test.js
 
 ┃ ┣ 📜favoritesSlice.js
 
 ┃ ┣ 📜favoritesSlice.test.js
 
 ┃ ┣ 📜searchCoinsSlice.js
 
 ┃ ┣ 📜searchCoinsSlice.test.js
 
 ┃ ┣ 📜store.js
 
 ┃ ┣ 📜topCoinsSlice.js
 
 ┃ ┣ 📜topCoinsSlice.test.js
 
 ┃ ┣ 📜trendingSlice.js
 
 ┃ ┗ 📜trendingSlice.test.js
 
 ┣ 📜App.jsx
 
 ┣ 📜index.css
 
 ┣ 📜main.jsx
 
 ┗ 📜setupTests.js

---

## 🧪 Testing y calidad de código

-Tests unitarios y de integración implementados

-Cobertura global cercana al 90%

-Testing de:

  -Componentes

  -Redux slices

  -Lógica de negocio

  -Interacciones del usuario

El proyecto sigue buenas prácticas de testing para asegurar estabilidad, mantenibilidad y escalabilidad del código.

---

## 👨‍💻 Autor

Creado por Luis Galicia.
Proyecto desarrollado como parte de mi crecimiento como desarrollador front-end, enfocado en React, Redux y testing.

Si tienes sugerencias o deseas contribuir, eres bienvenido a hacer un fork o pull request 🙂








