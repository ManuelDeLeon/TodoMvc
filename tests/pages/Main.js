export default () => {
  const mainPage = {
    newItem: element(by.css('header.header input[type=text]')),
    itemsLeft: element(by.css('span.todo-count')),
    selectedFilter: element(by.css('.filters a.selected')),
    itemsCheckboxes: element.all(by.css('ul.todo-list li .view input[type=checkbox]')),
    itemsLabels: element.all(by.css('ul.todo-list li .view label')),
    itemsButtons: element.all(by.css('ul.todo-list li .view button.destroy')),
    items: {
      count() {
        return element.all(by.css('ul.todo-list li')).count();
      },
      get(index) {
        const checkbox = mainPage.itemsCheckboxes.get(index);
        const label = mainPage.itemsLabels.get(index);
        const button = mainPage.itemsButtons.get(index);
        return { checkbox, label, button };
      }
    }
  }
  return mainPage;
};