import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const lightbox = new SimpleLightbox(".gallery a");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");

export function createGallery(images) {
  const markup = images.map(img => `
    <li class="gallery-item">
      <a href="${img.largeImageURL}">
        <img src="${img.webformatURL}" alt="${img.tags}" />
      </a>

      <div class="info">
        <div class="info-block">
          <p class="title">Likes</p>
          <p class="count">${img.likes}</p>
        </div>

        <div class="info-block">
          <p class="title">Views</p>
          <p class="count">${img.views}</p>
        </div>

        <div class="info-block">
          <p class="title">Comments</p>
          <p class="count">${img.comments}</p>
        </div>

        <div class="info-block">
          <p class="title">Downloads</p>
          <p class="count">${img.downloads}</p>
        </div>
      </div>
    </li>
  `).join("");

  gallery.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = "";
}

export function showLoader() {
  document.querySelector(".loader").classList.add("show");
}

export function hideLoader() {
  document.querySelector(".loader").classList.remove("show");
}

export function showLoadMoreButton() {
  loadMoreBtn.style.display = "block";
}

export function hideLoadMoreButton() {
  loadMoreBtn.style.display = "none";
}