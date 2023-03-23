# Apostrophe 3 + Vue 3 widgets + Tailwind CSS

## Get started

Install dependencies: `npm install`

## Running the project

Run `npm run dev` to build the Apostrophe UI and start the site up. Remember, this is during alpha development, so we're all in "dev mode." The `dev` script will watch for saves in client-side CSS and Javascript and trigger a build and page refresh if they are detected. It will also restart the app when server-side code is saved.

## How to test the feature

Home page should have a Todo app mounted. Create a new page and add `todo` widget to it (create new Todo piece record in the process). It should be shown on the page, it should pre-load the existing todos from the Todo piece. It should save it's state - on adding new todos or changing completed state. 

## Integration details

- `modules/asset/index.js`: Tailwind webpack configuration
- `modules/asset/ui/src/style.css`: Tailwind entrypoint
- `modules/asset/ui/src/index.js`: Bundle the Tailwind styles as a global include
- `modules/todo` - A piece that also mounts external Vue 3 app and builds it's own
- `modules/todo-widget` - A widget that mounts (offered in the `todo` piece) Apostrophe Vue app
- `index.d.ts` - To let TS know we have types, needed because our module is CJS.
- `modules/@apostrophe/home-page/views/page.html`: Replace the default home page
- `modules/default-page/views/page.html`: Add `todo` widget

## Dependencies

- `myovchev/todo-vue3` - a repository installed as npm package `@myovchev/todo-vue3`, contains simple Todo App, bundled with Vite.
- `corllete/apos-vue3` - Apostrophe Webpack configuration for Vue 3 (not an npm package yet). 
- `vue@^3` - Vue 3
- `vue-tsc` - Development only, alows CI type checking (`npm run test`)

Additional dependencies related with the Tailwind CSS integration - `css-loader`, `postcss`, `postcss-loader`, `style-loader`, `tailwindcss`.

## Notes

It's not "ready" to do anything but to demonstrate our Todo app. It needs global styles to handle vertical spacing in and between rich-text/image/video.todo widgets.
