
describe('Version', () => {

  beforeEach(function() {
    browser.get('/');
  });

  it('should verify that element exits', () => {
    var elem = element(by.tagName('utsaSched-version'));
    expect(elem).toBeTruthy();
  });
  it('should verify that element is not empty', () => {
    var elem = element(by.tagName('utsaSched-version'));
    expect(elem.getText()).not.toEqual("");
  });

});
