## Бэкенд для дипломного проекта

### Инструкция для локального использования:

Для запуска установите зависимости:
 - npm install

После чего можно запускать локальный сервер: 
- npm run start

Для разработки можно запустить сервер на localhost:3000 с хот релоудом:
- npm run dev

Инструкцию по установки Mongo на ПК здесь:
- [Официальная инструкция](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

Запустить базу можно командой:
- mongod

Локально сервис работает на 3000 порту: 
http://localhost:3000/api

Сервис доступен и онлайн:
### Авторизация 
1. POST  /signup - создает уникального пользователя (обязательные поля email, password, name);
2. POST  /signin - возвращает токен, вход в аккаунт (обязательные поля email, password);

### Функционал
1. GET /users/me - возвращает информацию о пользователе (email и имя);
2. GET /articles - возвращает все сохранённые пользователем статьи;
3. POST /articles - создаёт статью с переданными в теле (обязательные поля - keyword, title, text, date, source, link и image);
4. DELETE /articles/articleId - удаляет сохранённую статью  по _id;

IP: 178.154.226.252
[Ссылка на проект]( https://api.marina.avinkin.ru/api )

Дипломная работа(v0.0.1)


### Технологии:
express.js
База данных реализована на Mongo
