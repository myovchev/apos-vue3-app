// eslint-disable-next-line no-unused-vars
const { TodoAppPlugin, TodoApp } = require('@myovchev/todo-vue3');
const { createSSRApp } = require('vue');
const { renderToString } = require('vue/server-renderer');

module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Todo',
    pluralLabel: 'Todos',
    quickCreate: true,
    alias: 'todo',
    autopublish: true
  },
  fields: {
    add: {
      todos: {
        type: 'array',
        label: 'Todos',
        inline: true,
        titleField: 'text',
        fields: {
          add: {
            text: {
              type: 'string',
              label: 'Text',
              required: true
            },
            completed: {
              type: 'boolean',
              label: 'Completed',
              def: false
            }
          }
        }
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [ 'title', 'todos' ]
      }
    }
  },
  components(self) {
    return {
      // Pass `todo` piece. `widget` is true if this is a widget.
      // The `enabled` retur value is calculated:
      // - if not a widget: always true
      // - if a widget: true only if there is an apos user
      async app(req, {
        todo, widget = false, ssr = false
      } = {}) {
        const name = widget ? 'todo-widget' : 'todo-page';
        let props = '{}';
        if (widget) {
          const widgetData = {
            todo: { ...todo || {} }
          };
          props = self.apos.util.escapeHtml(
            JSON.stringify(widgetData),
            { single: true }
          );
        }
        const enabled = !widget || !!req.user;
        let html = '';
        if (ssr && enabled) {
          // NOTE: App will never work. Why?
          // Because we need App component build to JS first,
          // similar to what we do with our TodoApp (which is
          // built via Vite). In few words, we can never SSR
          // Apostrophe owned components without substantial
          // change to the build process.
          const component = widget ? 'App' : 'TodoApp';
          const app = createSSRApp({
            template: `<${component} v-bind="props" />`,
            data: () => ({ props })
          });
          app.use(TodoAppPlugin);
          html = await renderToString(app);
        }
        return {
          todo,
          name,
          props,
          enabled,
          html
        };
      }
    };
  }
};
