
describe('Version', () => {

  beforeEach(function() {
    browser.get('/');
  });

  it('should verify that element exits', () => {
    var elem = element(by.tagName('100ll-version'));
    expect(elem).toBeTruthy();
  });
  it('should verify that element is not empty', () => {
    var elem = element(by.tagName('100ll-version'));
    expect(elem.getText()).not.toEqual("");
  });

});
