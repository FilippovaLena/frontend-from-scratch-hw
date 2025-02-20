/*
  Цель задания: Разработать функционал для удаления фильма из списка с использованием паттерна MVC. После удаления фильма, необходимо отобразить сообщение "Фильм успешно удалён!" в message-box

  При возникновении сложностей можете ознакомиться с пошаговым планом реализации ниже, но лучше попробовать сначала самостоятельно 🧙‍♂️

Пошаговый план реализации:

1. Реализовать метод deleteMovie в объекте model:
  - метод должен принимать id фильма, который необходимо удалить
  - метод должен удалить фильм из массива movies
  - метод должен обновить отображение фильмов на странице

2. Добавить обработчик события для удаления фильмов:
  - в метода view.init добавить обработчик события на список фильмов
  - используя делегирование событий, обработать клик на кнопке удаления фильма
  - при клике на кнопку удаления, получить id фильма из родительского элемента и передать его в метод deleteMovie объекта controller

3. Реализовать метод deleteMovie в объекте controller:
  - метод должен принимать id фильма
  - метод должен передать id фильма в метод deleteMovie объекта model
  - метод должен отобразить сообщение "Фильм успешно удалён!" в message-box
*/

const model = {
  movies: [],
  
  addMovie(title, description) {
    const id = Math.random();
    const newMovie = { id, title, description };
    this.movies.push(newMovie);
    view.renderMovies(this.movies);
  },
  
  deleteMovie(id) {
    this.movies = this.movies.filter(movie => movie.id !== id);
    view.renderMovies(this.movies);
  }
};

const view = {
  init() {
    this.renderMovies(model.movies);
    
    const form = document.querySelector('.form');
    const movieList = document.querySelector('.movie-list');

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const title = form.querySelector('.title').value;
      const description = form.querySelector('.description').value;
      model.addMovie(title, description);
      form.reset();
    });

    movieList.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-button')) {
        const movieId = parseFloat(event.target.dataset.id);
        controller.deleteMovie(movieId);
      }
    });
  },
  
  renderMovies(movies) {
    const movieList = document.querySelector('.movie-list');
    movieList.innerHTML = ''; // Очистить список

    movies.forEach(movie => {
      const movieItem = document.createElement('div');
      movieItem.className = 'movie-item';
      movieItem.innerHTML = `
        <span>${movie.title}</span>
        <span>${movie.description}</span>
        <button class="delete-button" data-id="${movie.id}">Удалить</button>
      `;
      movieList.appendChild(movieItem);
    });
  },
  
  showMessage(message) {
    const messageBox = document.querySelector('.message-box');
    messageBox.textContent = message;
    messageBox.style.display = 'block';
    setTimeout(() => {
      messageBox.style.display = 'none';
    }, 3000);
  }
};

const controller = {
  deleteMovie(id) {
    model.deleteMovie(id);
    view.showMessage("Фильм успешно удалён!");
  }
};

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
  view.init();
});