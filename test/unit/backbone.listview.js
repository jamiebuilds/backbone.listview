import Backbone.ListView from '../../src/backbone.listview';

describe('Backbone.ListView', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(Backbone.ListView, 'greet');
      Backbone.ListView.greet();
    });

    it('should have been run once', () => {
      expect(Backbone.ListView.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(Backbone.ListView.greet).to.have.always.returned('hello');
    });
  });
});
