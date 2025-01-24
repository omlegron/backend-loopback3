'use strict';

module.exports = function(Team) {
  Team.validatesPresenceOf('name');
  Team.validatesUniquenessOf('name');
};
