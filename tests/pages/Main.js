export default () => {
  const mainPage = {
    newItem: element(by.css('header.header input[type=text]')),
    mainBlock: element(by.css('section.main')),
    headerBlock: element(by.css('header.header')),
    footerBlock: element(by.css('footer.footer')),
    toggleCompleted: element(by.css('section.main label')),
    clearCompleted: element(by.css('footer.footer button')),
    filterAll: element.all(by.css('footer.footer ul.filters a')).get(0),
    filterActive: element.all(by.css('footer.footer ul.filters a')).get(1),
    filterCompleted: element.all(by.css('footer.footer ul.filters a')).get(2),
    itemsLeft: element(by.css('span.todo-count')),
    selectedFilter: element(by.css('.filters a.selected')),
    itemsRows: element.all(by.css('ul.todo-list li')),
    itemsCheckboxes: element.all(by.css('ul.todo-list li .view input[type=checkbox]')),
    itemsLabels: element.all(by.css('ul.todo-list li .view label')),
    itemsButtons: element.all(by.css('ul.todo-list li .view button.destroy')),
    itemsTextboxes: element.all(by.css('ul.todo-list li input[type=text]')),
    items: {
      count() {
        return element.all(by.css('ul.todo-list li')).count();
      },
      get(index) {
        const row = mainPage.itemsRows.get(index);
        const checkbox = mainPage.itemsCheckboxes.get(index);
        const label = mainPage.itemsLabels.get(index);
        const button = mainPage.itemsButtons.get(index);
        const textbox = mainPage.itemsTextboxes.get(index);
        return { row, checkbox, label, button, textbox };
      }
    }
  }
  return mainPage;
};