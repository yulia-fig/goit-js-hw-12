import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api.js";
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from "./js/render-functions.js";

const form = document.querySelector(".form");
const loadMoreBtn = document.querySelector(".load-more");

// ====== ТУТ ВСТАВЛЯЄМО ГЛОБАЛЬНІ ЗМІННІ ======
const PER_PAGE = 15; // кількість картинок на сторінку
let page = 1;         // поточна сторінка
let query = "";       // запит користувача
let totalHits = 0;
// ============================================

form.addEventListener("submit", async event => {
  event.preventDefault();

  query = event.target.elements["search-text"].value.trim();
  if (!query) {
    iziToast.error({ message: "Please enter a search query" });
    return;
  }

  page = 1;          // скидаємо сторінку для нового пошуку
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    if (data.hits.length === 0) {
      iziToast.error({ message: "No images found" });
      return;
    }

    createGallery(data.hits);

    // ====== Номер 1: присвоюємо totalHits одразу після отримання даних ======
    totalHits = data.totalHits;

    // ====== Номер 2: перевірка кінця колекції після присвоєння totalHits ======
    if (page * PER_PAGE >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
    } else {
      showLoadMoreButton();
    }

  } catch (error) {
    iziToast.error({ message: "Something went wrong" });
  } finally {
    hideLoader();
  }
});

// ====== ОБРОБНИК Load More ======
loadMoreBtn.addEventListener("click", async () => {
  page++;
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    
    createGallery(data.hits);
    // ====== ПРОКРУЧУВАННЯ СТОРІНКИ ======
    // Отримуємо висоту першої картки галереї
    const cardHeight = document.querySelector(".gallery-item")?.getBoundingClientRect().height || 0;
    // Плавно прокручуємо на дві висоти картки
    window.scrollBy({ top: cardHeight * 2, behavior: "smooth" });

    // Перевірка кінця колекції
    if (page * PER_PAGE >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({ message: "Something went wrong" });
  } finally {
    hideLoader();
  }
});