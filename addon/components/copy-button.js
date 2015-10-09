import Ember from 'ember';
import layout from '../templates/components/copy-button';
/* global Clipboard */

const { get, set } = Ember;

export default Ember.Component.extend({
  layout: layout,
  tagName: 'button',
  classNames: ['btn--copy'],
  attributeBindings: [
    'clipboardText:data-clipboard-text',
    'clipboardTarget:data-clipboard-target',
    'clipboardAction:data-clipboard-action',
    'buttonType:type'
  ],

  /**
   * @property {Array} clipboardEvents - events supported by clipboard.js
   */
  clipboardEvents: ['success', 'error'],

  /**
   * @property {String} buttonType - type attribute for button element
   */
  buttonType: 'button',

  didInsertElement() {
    let clipboard = new Clipboard(`#${this.get('elementId')}`);
    set(this, 'clipboard', clipboard);

    get(this, 'clipboardEvents').forEach(action => {
      window.getSelection().removeAllRanges();
      clipboard.on(action, Ember.run.bind(this, function(e) {
        try {
          this.sendAction(action, e);
        }
        catch(error) {
          Ember.Logger.debug(error.message);
        }
      }));
    });
  },

  willDestroyElement() {
    get(this, 'clipboard').destroy();
  }
});
