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
      async app(req, { todo, widget = false } = {}) {
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
        return {
          todo,
          name,
          props,
          enabled: !widget || !!req.user
        };
      }
    };
  }
};
