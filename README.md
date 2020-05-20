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

  - For compile SCSS and watch changes (`Write css`):

    ```bash
    npm run watch-scss
    ```

  - Build SCSS for development:

    ```bash
    npm run build-scss-dev
    ```

  - Build SCSS for production (`Minify`):

    ```bash
    npm run build-scss-prod
    ```

- Prettier (`Code beautifier`):
  
  - Watch changes and run prettier (`Solve errors`):

    ```bash
    npm run watch-prettier
    ```
  
  - Run Prettier:

    ```bash
    # Check files
    npm run prettier-check #Return list of files with errors
    # Fix errors
    npm run prettier-fix #Return list of fixed files
    ```

#### Run

- Just open `./index.html` in the web brwoser.