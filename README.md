# backbone.listview

A simple ListView for Backbone.

[![Travis build status](http://img.shields.io/travis/thejameskyle/backbone.listview.svg?style=flat)](https://travis-ci.org/thejameskyle/backbone.listview)
[![Code Climate](https://codeclimate.com/github/thejameskyle/backbone.listview/badges/gpa.svg)](https://codeclimate.com/github/thejameskyle/backbone.listview)
[![Test Coverage](https://codeclimate.com/github/thejameskyle/backbone.listview/badges/coverage.svg)](https://codeclimate.com/github/thejameskyle/backbone.listview)
[![Dependency Status](https://david-dm.org/thejameskyle/backbone.listview.svg)](https://david-dm.org/thejameskyle/backbone.listview)
[![devDependency Status](https://david-dm.org/thejameskyle/backbone.listview/dev-status.svg)](https://david-dm.org/thejameskyle/backbone.listview#info=devDependencies)

Supports `Backbone.Collection`-like API. `set`, `reset`, `add`, `remove`,
`push`, `pop`, `shift`, `unshift` are supported.

> Note: This does _not_ implement `Marionette.CollectionView`-like behavior,
> but could be used to implement it.
> (see: automatic rendering of a `Backbone.Collection)

```js
import {View} from 'backbone';
import ListView from 'backbone.listview';

const MyListView = ListView.extend({
  tagName: 'ul'
});

const ItemView = View.extend({
  tagName: 'li',
  initialize(options = {}) {
    this.textContent = options.textContent;
  },
  render() {
    this.$el.text(this.textContent);
    return this;
  }
});

const listView = new ListView();

const itemView1 = new ItemView({ textContent: 'One' });
const itemView2 = new ItemView({ textContent: 'Two' });
const itemView3 = new ItemView({ textContent: 'Three' });

// Addition:
listView.add([
  itemView1,
  itemView2,
  itemView3
]);

// Removal:
listView.remove(itemView2);

// Event forwarding:
listView.on('one', () => {
  console.log('Hello One!')
});

itemView1.trigger('one');
```
