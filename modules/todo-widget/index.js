module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Todo'
  },
  fields: {
    add: {
      _todo: {
        type: 'relationship',
        label: 'Choose entry',
        withType: 'todo',
        max: 1,
        min: 1,
        required: true
      }
    }
  }
};
