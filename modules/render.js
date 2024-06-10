import './render.js';
import './preload.js';
import './getting.js';
import './fetchRequest.js';
import './getimg.js';

const searchButton = document.querySelector('.search-submit');
const container = document.querySelectorAll('.container');
const inputSearch = document.querySelector('.search-input');
const inputSubmit = document.querySelector('.search-submit');
const wrapper = document.querySelector('.title-wrapper');
const newsList = document.querySelectorAll('.news-list');
const newsSection = document.querySelector('.news');
const renderWrapper = document.querySelector('.title-wrapper');
const textWrapper = renderWrapper.querySelector('.title');

// newsSection.querySelector('.news-list').innerHTML = '';
const displayNews = (articles) => {
  newsList.innerHTML = '';

  articles.forEach(article => {
    const newsItem = document.createElement('li');
    newsItem.className = 'news-item';
    newsItem.innerHTML = `
      <img src="${article.urlToImage}" alt="${article.title}" class="news-image" height="200">
      <h3 class="news-title">
        <a href="${article.url}" class="news-link" target="_blank">${article.title}</a>
      </h3>
      <p class="news-description">${article.description}</p>
      <div class="news-footer">
        <time class="news-datetime" datetime="${article.publishedAt}">
          <span class="news-date">${article.publishedAt}</span> ${article.author}
        </time>
      </div>`
    ;
    newsList.appendChild(newsItem);
    newsSection.append(newsList);
    body.append(newsSection);
  });
};

textWrapper.textContent = 'Введите ваш запрос';

const renderNews = () => {

  searchButton.addEventListener('click', async () => { 
    const searchQuery = document.querySelector('.search-input').value;
    try {
      const response = await fetch('https://newsapi.org/v2/top-headlines?country=ru', {
        headers: {
          'X-Api-Key': '45896303d3c54e8d89e7a9ffc68f4091'
        },
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      displayNews(data.articles);
    } catch (error) {
      console.error('Произошла ошибка: ', error);
    }
    alert('тут');
  });
};

renderNews();