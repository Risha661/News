import './preload.js';

const newsSection = document.querySelector('.news');
const renderWrapper = document.querySelector('.title-wrapper');
const textWrapper = renderWrapper.querySelector('.title');

newsSection.querySelector('.news-list').innerHTML = '';

const displayNews = (articles) => {
  const container = document.createElement('div');
  container.classList.add('container');
  const newsList = document.createElement('ul');
  newsList.classList.add('news-list');
  const newsSection = document.querySelector('.news');
  const titleWrapper = document.querySelector('.title-wrapper');

  articles.forEach(article => {
    const newsItem = document.createElement('li');
    newsItem.classList.add('news-item');
    newsItem.innerHTML =` 
      <img src="${article.urlToImage}" alt="${article.title}" class="news-image" height="200">
      <h3 class="news-title">
        <a href="${article.url}" class="news-link" target="_blank">${article.title}</a>
      </h3>
      <p class="news-description">${article.description}</p>
      <div class="news-footer">
        <time class="news-datetime" datetime="${article.publishedAt}">
          <span class="news-date">${article.publishedAt}</span> ${article.author}
        </time>
      </div>;`

    newsList.append(newsItem);
  });
  container.append(newsList);
  newsSection.append(container);
  titleWrapper.append(newsSection);
};

textWrapper.textContent = 'Введите ваш запрос';

document.querySelector('.search-submit').addEventListener('click', async (event) =>{
  event.preventDefault();
  const searchQuery = document.querySelector('.search-input').value;
  let url = `https://newsapi.org/v2/everything?q=${searchQuery}&pageSize=8&apiKey=7dbb00f1877742d9818640ad6eb49c62`;
  let url2 = `https://newsapi.org/v2/top-headlines?country=ru&pageSize=4&apiKey=7dbb00f1877742d9818640ad6eb49c62`;

  try {
    const [response1, response2] = await Promise.all([
      fetch(url),
      fetch(url2),
    ]);
    const data1 = await response1.json();
    const data2 = await response2.json();

    displayNews(data1.articles);
    displayNews(data2.articles);
  } catch (error) {
    console.log('Произошла ошибка: ', error);
  }
});
