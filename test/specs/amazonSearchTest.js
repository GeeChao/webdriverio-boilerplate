import Home from '../page_objects/amazonhomepage.js';
import Results from '../page_objects/amazonresultspage.js';

describe('Amazon Search Assertion Demo', () => {

    before('On the Amazon home page...', () => {
      Home.open();
      Home.searchBar.waitForExist();
      Home.searchBar.waitForVisible();
    });

    it('A user searches for "qa testing"', () => {
      Home.searchBar.click();
      Home.searchBar.setValue('qa testing');
      Home.submitSearch.click();
    });

    it('Shows a positive number of results', () => {
      Results.resultsCount.waitForExist();
      Results.resultsCount.waitForVisible();
      const results = Results.resultsCount.getText();
      //e.g. 1-16 of 269 results for "qa testing"
      const integers = results.split(" ").filter(function(int) {
        return int.match(/\d+/g);
      });
      const cleanInteger = integers[1].replace(/,/g, "");
      expect(parseInt(cleanInteger)).to.be.above(0);
    });

});
