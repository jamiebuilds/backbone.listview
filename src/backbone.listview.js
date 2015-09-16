import _ from 'underscore';
import Backbone from 'backbone';

function toModel(view) {
  return { view: view };
}

function toModels(views) {
  if (_.isArray(views)) {
    return _.map(views, toModel);
  } else {
    return toModel(views);
  }
}

const ListView = Backbone.View.extend({
  constructor() {
    this.views = new Backbone.Collection();
    this._views = [];

    this.listenTo(this.views, {
      add    : this._onViewCollectionAdd,
      remove : this._onViewCollectionRemove,
      reset  : this._onViewCollectionReset,
      sort   : this._onViewCollectionSort
    });

    Backbone.View.apply(this, arguments);
  },

  _onViewCollectionAdd(model, collection, options) {
    var view = model.get('view');
    var index = this.views.indexOf(model);
    this._addView(view, index, options);
  },

  _onViewCollectionRemove(model, collection, options) {
    var view = model.get('view');
    var index = _.indexOf(this._views, view);
    this._removeView(view, index, options);
  },

  _onViewCollectionReset(collection, options) {
    // to be implemented...
  },

  _onViewCollectionSort() {
    // to be implemented...
  },

  _addView(view, index, options) {
    if (index === this._views.length) {
      this._views.push(view);
      this._appendEl(this.$el);
    } else if (index === 0) {
      this._views.unshift(view);
      this._prependEl(this.$el);
    } else {
      this._views.splice(index, 0, view);
      this._insertElAfter(view.$el, this._views[index - 1].$el);
    }
    view.render();
    this.trigger('add', view, this, options);
    view.on('all', this._onViewEvent, this);
  },

  _removeView(view, index, options) {
    this._views.splice(index, 1);
    view.remove();
    this.trigger('remove', view, this, options);
    view.off('all', this._onViewEvent, this);
  },

  _onViewEvent() {
    this.trigger.apply(this, arguments);
  },

  _appendEl($el) {
    this.$el.append($el);
  },

  _prependEl($el) {
    this.$el.prepend($el);
  },

  _insertElAfter($el, $target) {
    $el.insertAfter($target);
  }
});

_.each([
  'set',
  'reset',
  'add',
  'push',
  'pop',
  'shift',
  'unshift'
], function(method) {
  ListView.prototype[method] = function(views, options) {
    this.views[method](toModels(views), options);
    return views;
  };
});

export default ListView;
