## About

News feed page made with: `HTML`, `CSS`, `SCSS` and `JS`.

### Development requirements

- Node.js
- Npm

### Instructions

#### Develop

- Install dependencies: 

```bash
npm install
```

- Build project:

  - For compile SCSS and watch changes (`Live-reload`):

    ```bash
    npm run scss
    ```

  - Build SCSS for production (`Minify`):

    ```bash
    npm run build-scss
    ```
  
  - Run Prettier:

    ```bash
    # Check files
    npm run prettier-check #Return list of files with errors
    # Fix errors
    npm run prettier-fix #Return list of fixed files
    ```

  - Watch changes and run prettier (`Solve errors`):

    ```bash
    npm run prettier-watch
    ```

#### Run

- Just open `./index.html` in the web brwoser.