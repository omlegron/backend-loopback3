'use strict';

const app = require('../server/server');
const request = require('supertest');
const Team = app.models.Team;
const Members = app.models.Members;
const chai = require('chai');
const expect = chai.expect;

describe('Team  API', () => {
  beforeEach((done) => {
    Team.destroyAll({}, () => {
      done();
    });
  });

  beforeEach((done) => {
    Members.destroyAll({}, () => {
      done();
    });
  });

  it('should delete a team', (done) => {
    const teamData = {
      name: 'Team 1',
      description: 'Description Team 1',
    };

    Team.create(teamData, (err, team) => {
      request(app)
        .delete(`/api/teams/${team.id}`)
        .expect(200)
        .end(done);
    });
  });
});
