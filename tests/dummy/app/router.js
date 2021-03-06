import Ember from 'ember';
import config from './config/environment';
const { getOwner, get, inject, run, $ } = Ember;

const Router = Ember.Router.extend({

  // Inject the dummy app's radical service
  radical: inject.service(),

  // Important things from the config
  location: config.locationType,
  rootURL: config.rootURL,

  // Let's have some fun when the transitions are complete, eh?
  didTransition() {
    this._super(...arguments);

    // Schedule some fun goodtimes into the `afterRender` run queue
    run.scheduleOnce('afterRender', this, function() {
      // Reset the page position to the top
      $('body, html').scrollTop(0);
    });

    // Update the `currentRouteName` prop on `Service.Radical` so we can show
    // it off nice and pretty in the header
    const currentRoute = getOwner(this).lookup(`route:${this.get('currentRouteName')}`);
    this.set('radical.currentRouteTitle', (get(currentRoute, 'pageTitle') || 'Ember Radical'));
  }
});

Router.map(function() {
  this.route('getting-started', function() {
    this.route('alerts');
    this.route('buttons');
    this.route('cards');
    this.route('drawers');
    this.route('dropdowns');
    this.route('modals');
    this.route('popovers');
    this.route('state');
    this.route('svg');
    this.route('tabs');
    this.route('tooltips');
  });
  this.route('testing');
});

export default Router;
