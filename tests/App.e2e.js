import Main from './pages/Main';

describe('angularjs homepage', function () {
  const mainPage = new Main();
  beforeEach(()=>{
    browser.waitForAngularEnabled(false);
    browser.get('/');
  });

  it('can add item', function () {
    expect(mainPage.newItem.getText()).toEqual("");
    mainPage.newItem.sendKeys("AAA", protractor.Key.ENTER);
    expect(mainPage.itemsLeft.getText()).toEqual("1 item left");
    expect(mainPage.selectedFilter.getText()).toEqual('All');
    expect(mainPage.items.count()).toBe(1);
    const item = mainPage.items.get(0);
    expect(item.checkbox.getAttribute('checked')).toBeFalsy();
    expect(item.label.getText()).toEqual('AAA');
    expect(item.button.isDisplayed()).toBe(false);
    expect(mainPage.newItem.getText()).toEqual("");
    expect(mainPage.newItem.getId()).toEqual(browser.driver.switchTo().activeElement().getId());
  });

  it('can delete item', ()=>{
    mainPage.newItem.sendKeys("AAA", protractor.Key.ENTER);
    expect(mainPage.mainBlock.isDisplayed()).toBe(true);
    expect(mainPage.footerBlock.isDisplayed()).toBe(true);
    const item = mainPage.items.get(0);
    browser.actions().mouseMove(item.row).perform();
    expect(item.button.isDisplayed()).toBe(true);
    item.button.click();
    expect(mainPage.mainBlock.isPresent()).toBe(false);
    expect(mainPage.footerBlock.isPresent()).toBe(false);
    expect(mainPage.newItem.getText()).toEqual("");
  })

  it('can edit item', () => {
    mainPage.newItem.sendKeys("AAA", protractor.Key.ENTER);
    const item = mainPage.items.get(0);
    expect(item.row.getAttribute('class')).not.toContain("editing");
    item.label.click();
    expect(item.row.getAttribute('class')).toContain("editing");
    expect(item.textbox.getAttribute('value')).toBe("AAA");
    item.textbox.sendKeys("BBB", protractor.Key.ESCAPE);
    expect(item.label.getText()).toBe("AAA");
    expect(item.row.getAttribute('class')).not.toContain("editing");
    item.label.click();
    expect(item.row.getAttribute('class')).toContain("editing");
    expect(item.textbox.getAttribute('value')).toBe("AAA");
    item.textbox.sendKeys("BBB", protractor.Key.ENTER);
    expect(item.label.getText()).toBe("AAABBB");
    expect(item.row.getAttribute('class')).not.toContain("editing");
    item.label.click();
    expect(item.row.getAttribute('class')).toContain("editing");
    expect(item.textbox.getAttribute('value')).toBe("AAABBB");
  })

  it(`can select All/Active/Completed`, ()=>{
    mainPage.newItem.sendKeys("AAA", protractor.Key.ENTER);
    expect(mainPage.filterAll.getAttribute('class')).toContain("selected");
    mainPage.newItem.sendKeys("BBB", protractor.Key.ENTER);
    expect(mainPage.clearCompleted.isPresent()).toBe(false);
    expect(mainPage.itemsLeft.getText()).toEqual("2 items left");
    expect(mainPage.items.count()).toBe(2);
    mainPage.items.get(0).checkbox.click();
    expect(mainPage.clearCompleted.isPresent()).toBe(true);
    expect(mainPage.itemsLeft.getText()).toEqual("1 item left");
    mainPage.filterActive.click();
    expect(mainPage.items.count()).toBe(1);
    expect(mainPage.items.get(0).label.getText()).toBe("BBB");
    mainPage.filterCompleted.click();
    expect(mainPage.items.count()).toBe(1);
    expect(mainPage.items.get(0).label.getText()).toBe("AAA");
    mainPage.filterAll.click();
    expect(mainPage.items.count()).toBe(2);
    expect(mainPage.items.get(0).label.getText()).toBe("AAA");
    expect(mainPage.items.get(1).label.getText()).toBe("BBB");
  })

  it(`clears completed`, () => {
    mainPage.newItem.sendKeys("AAA", protractor.Key.ENTER);
    mainPage.newItem.sendKeys("BBB", protractor.Key.ENTER);
    mainPage.newItem.sendKeys("CCC", protractor.Key.ENTER);
    mainPage.items.get(0).checkbox.click();
    mainPage.items.get(2).checkbox.click();
    mainPage.clearCompleted.click();
    expect(mainPage.items.count()).toBe(1);
    expect(mainPage.items.get(0).label.getText()).toBe("BBB");
  })

  it(`toggles completed`, () => {
    mainPage.newItem.sendKeys("AAA", protractor.Key.ENTER);
    mainPage.newItem.sendKeys("BBB", protractor.Key.ENTER);
    mainPage.newItem.sendKeys("CCC", protractor.Key.ENTER);
    mainPage.items.get(0).checkbox.click();
    mainPage.items.get(2).checkbox.click();
    mainPage.toggleCompleted.click();
    expect(mainPage.items.count()).toBe(3);
    expect(mainPage.items.get(0).checkbox.getAttribute('checked')).toBeTruthy();
    expect(mainPage.items.get(1).checkbox.getAttribute('checked')).toBeTruthy();
    expect(mainPage.items.get(2).checkbox.getAttribute('checked')).toBeTruthy();
    mainPage.toggleCompleted.click();
    expect(mainPage.items.count()).toBe(3);
    expect(mainPage.items.get(0).checkbox.getAttribute('checked')).toBeFalsy();
    expect(mainPage.items.get(1).checkbox.getAttribute('checked')).toBeFalsy();
    expect(mainPage.items.get(2).checkbox.getAttribute('checked')).toBeFalsy();
    mainPage.toggleCompleted.click();
    expect(mainPage.items.count()).toBe(3);
    expect(mainPage.items.get(0).checkbox.getAttribute('checked')).toBeTruthy();
    expect(mainPage.items.get(1).checkbox.getAttribute('checked')).toBeTruthy();
    expect(mainPage.items.get(2).checkbox.getAttribute('checked')).toBeTruthy();
  })
});
