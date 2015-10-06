module.exports = {
  description: 'install ember-cli-clipboard into a typical project',

  normalizeEntityName: function() {},

  beforeInstall: function (options) {
    this.addBowerPackageToProject('clipboard', '1.4.0');
  }
};
