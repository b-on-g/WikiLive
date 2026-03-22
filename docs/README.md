# Template Repo

Template repo to fast make new $hyoo apps.

# Подготовительные шаги
1. Если ещё нет основного репозитория компании, в котором будут содержаться все проекты компании, создайте его. Например, имя компании lim.
2. Вам нужно будет создать папку в mam с именем компании и вынести её в репозиторий. Получится mam/lim
3. Нужно использовать шаблон https://github.com/Lyumih/richtemplate для создания своего проекта. Назовите проект, например, lim_market
4. После создания склонируйте проект в mam в папку компании с односложным именем. `git clone https://github.com/lim/lim_market.git lim/market`

## Замена в шаблоне на проект.
- У вас есть склонированный репозиторий с шаблонным проектом lim_market в mam/lim/market
- В IDE выберите поиск по папке "Find in Folder" и включите режим замены "Toggle Replace". Вам нужно провести ряд замен в проекте
1. Замените в файлах папки все вхождения "company_template" на ваше "lim_market" (имя компании_проект). Это заменит все view.tree файлы
2. Замените в файлах папки все вхождения "company/template" на ваше "lim/market" (имя компании/проект). Это заменит все deploy.yaml файлы
3. Замените в файлах папки все вхождения "Lyumih/richtemplate" на ваше "lim/lim_market" (имя GitHub/репозиторий). Это заменит все ссылки на репозитоий на ваше
4. Запушить проект, настроить GitHub Pages и проверить, что шаблон заработал.

## Дополнительные настройки
1. Можно поменять favicon.ico на favicon компании
2. Поменять и добавить описание Open Graph (og) в index.html. Для лучшей работы SEO

## After Make

- [ ] [Rename app then update index.html and CNAME](./app).
- [ ] [Update GitHub Workflow](.github/workflows).
- [ ] Update repo description and link to app at the GitHub.
- [ ] [Add this repo to $hyoo namespace](https://github.com/hyoo-ru/mam_hyoo/blob/master/hyoo.meta.tree).
- [ ] Rewrite this readme.



Сделать $mol_template_rich, который будет более расширенным и полезным. 

В нём будут добавлены: 
- файлик favicon (мол иконка), который вставлен в meta.tree и в index.html
- в index.html будет прописана og информация для сео. Нужно будет поправить на свою

- в /app будет создан app.view.tree с минимальным настроенным $mol_book2_catalog => $mol_page => $custom_button | $template_logo
- также там будет преднастроена переключение темы и $mol_source для ссылки на гитхаб
- также кнопка login/logout (в файлике .ts) - которая демонстрирует работу переключения страниц.

- создан компонент /ui/button (пока думаю какой конкретно?) и для него добавлен сторибук ($mol_demo). Может Hello world или ссылку на документация по молу/handbook, как это сделано для темплейтов для react/vue/nextjs.

- создан компонент logo и добавлена иконка в meta.tree (паблик файлы, /assets). Это должно показать, как правильно добавлять ресурсы в мол

- Добавить сторибук (mol_demo/mol_docs), добавить кастомный компонент (картинку лого и мб кнопку) и index.html, и добавить в meta.tree. Работать с сторибуком в моле легко - такая настройка даст огромный буст на старте.

- в deploy.yaml добавить строки, чтобы он из репозитория сразу создавал app и app/demo правильно. Тогда с gh_pages будет меньше вопросов, как развернуть 2 приложения в одном deploy.yaml

- Обновить readme.md в соответствии с расширенными компонентами. 

- демонстрация CSS и css-in-ts
- Hello world
