<div align="center">

# AniFlix | Anime Netflix

<!-- <img width="794" alt="image" src=""> -->

A simple anime streaming desktop app build using **Electron** with **Vite** and **Vue3**.

</div>

## About

This template utilizes [ViteJS](https://vitejs.dev) for building and serving your (Vue powered) front-end process, it provides Hot Reloads (HMR) to make development fast and easy ⚡

Building the Electron (main) process is done with [Electron Builder](https://www.electron.build/), which makes your application easily distributable and supports cross-platform compilation 😎

### Install dependencies ⏬

```bash
yarn install
```

### Start developing ⚒️

```bash
yarn run dev
```

## Additional Commands

```bash
yarn run dev # starts application with hot reload
yarn run build # builds application, distributable files can be found in "dist" folder

# OR

yarn run build:win # uses windows as build target
yarn run build:mac # uses mac as build target
yarn run build:linux # uses linux as build target
yarn run build:linux-deb # uses linux as build target .deb distribution
```

Optional configuration options can be found in the [Electron Builder CLI docs](https://www.electron.build/cli.html).

## Project Structure

```bash
- scripts/ # all the scripts used to build or serve your application, change as you like.
- src/
  - main/ # Main thread (Electron application source)
  - renderer/ # Renderer thread (VueJS application source)
```

## Using static files

If you have any files that you want to copy over to the app directory after installation, you will need to add those files in your `src/main/static` directory.

#### Referencing static files from your main process

```ts
/* Assumes src/main/static/myFile.txt exists */

import { app } from "electron";
import { join } from "path";
import { readFileSync } from "fs";

const path = join(app.getAppPath(), "static", "myFile.txt");
const buffer = readFileSync(path);
```
