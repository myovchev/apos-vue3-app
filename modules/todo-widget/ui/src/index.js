export default () => {
  apos.util.widgetPlayers['todo-widget'] = {
    selector: '[data-plugin-id="todo-widget"]',
    player: function (el) {
      apos.todo.mountWidget(el);
    }
  };
};
