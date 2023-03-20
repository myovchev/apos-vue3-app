import { createApp } from 'vue';
import { TodoApp, TodoAppPlugin } from '@myovchev/todo-vue3';
import App from './App.vue';

export default () => {
  apos.util.onReady(mountApps);
  apos.todo.mountWidget = mountWidget;

  // Directly mount the Vue app (from 3rd party module) on the page
  function mountApps() {
    const els = [ ...document.querySelectorAll('[data-plugin-id="todo-page"]') ];
    if (!els.length) {
      return;
    }
    for (const el of els) {
      // Already mounted.
      if (typeof el.dataset.vApp !== 'undefined') {
        continue;
      }
      el.removeAttribute('data-props');
      const app = createApp(TodoApp);
      app.mount(el);
    }
  }

  // Mount our own Vue app, probably via widget player.
  function mountWidget(el) {
    if (!el) {
      return;
    }
    // Already mounted.
    if (typeof el.dataset.vApp !== 'undefined') {
      return;
    }
    const props = JSON.parse(el.getAttribute('data-props') || '{}');
    el.removeAttribute('data-props');
    const app = createApp(App, props);
    app.use(TodoAppPlugin);
    app.mount(el);
  }
};
