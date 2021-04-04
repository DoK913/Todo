## _To-Do List Application_

# Features:

- Add new task in List.
- Task filters.
- Checkbox for marking completed tasks.
- Delete one task, delete only completed tasks and clear all To-Do List.
- Drag'n'drop for tasks.
- Use LocalStorage for save current To-Do List.

# Tech

This To-Do application using next technologies:

- HTML
- CSS
- JavaScript
- Node.js (v14.16.0.)
- Express.js framework

# To launch the app, you need to:

- Before the first launch at "server" folder necessary to run next commands:

```sh
npm install express --save
npm install --save-dev nodemon
npm i connect-timeout cors
```

- Install the python language on your computer. Download link: https://www.python.org/downloads/
- Launch the terminal from folder "server" and run the following command:

```sh
npm run start:dev
```

- Launch the terminal from the applications folder and run the following command:

```sh
python -m SimpleHTTPServer 8000

OR at version 3.9+ use next command:
python -m http.server 8000
```

- Go to the following link http://localhost:8000
