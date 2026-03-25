import{a as L,S as b,i as a}from"./assets/vendor-DQvd0HNi.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))u(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&u(l)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function u(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const S="55068921-c9c0644d1a9915f60fd1c8249";async function f(s,e){return(await L.get("https://pixabay.com/api/",{params:{key:S,q:s,page:e,per_page:15,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data}const q=new b(".gallery a"),p=document.querySelector(".gallery"),m=document.querySelector(".load-more");function y(s){const e=s.map(o=>`
    <li class="gallery-item">
      <a href="${o.largeImageURL}">
        <img src="${o.webformatURL}" alt="${o.tags}" />
      </a>

      <div class="info">
        <div class="info-block">
          <p class="title">Likes</p>
          <p class="count">${o.likes}</p>
        </div>

        <div class="info-block">
          <p class="title">Views</p>
          <p class="count">${o.views}</p>
        </div>

        <div class="info-block">
          <p class="title">Comments</p>
          <p class="count">${o.comments}</p>
        </div>

        <div class="info-block">
          <p class="title">Downloads</p>
          <p class="count">${o.downloads}</p>
        </div>
      </div>
    </li>
  `).join("");p.insertAdjacentHTML("beforeend",e),q.refresh()}function P(){p.innerHTML=""}function h(){document.querySelector(".loader").classList.add("show")}function g(){document.querySelector(".loader").classList.remove("show")}function v(){m.style.display="block"}function c(){m.style.display="none"}const $=document.querySelector(".form"),B=document.querySelector(".load-more"),w=15;let n=1,i="",d=0;$.addEventListener("submit",async s=>{if(s.preventDefault(),i=s.target.elements["search-text"].value.trim(),!i){a.error({message:"Please enter a search query"});return}n=1,P(),c(),h();try{const e=await f(i,n);if(e.hits.length===0){a.error({message:"No images found"});return}y(e.hits),d=e.totalHits,n*w>=d?(c(),a.info({message:"We're sorry, but you've reached the end of search results."})):v()}catch{a.error({message:"Something went wrong"})}finally{g()}});B.addEventListener("click",async()=>{var s;n++,c(),h();try{const e=await f(i,n);y(e.hits);const o=((s=document.querySelector(".gallery-item"))==null?void 0:s.getBoundingClientRect().height)||0;window.scrollBy({top:o*2,behavior:"smooth"}),n*w>=d?(a.info({message:"We're sorry, but you've reached the end of search results."}),c()):v()}catch{a.error({message:"Something went wrong"})}finally{g()}});
//# sourceMappingURL=index.js.map
