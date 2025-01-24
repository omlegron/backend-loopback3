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

  it('should update a team', (done) => {
    const teamData = {
      name: 'Team 1',
      description: 'Update Description Team 1',
    };

    Team.create(teamData, (err, team) => {
      const updatedteamData = {
        name: 'Team 2',
        description: 'Update Description Team 2',
      };

      request(app)
        .patch(`/api/teams/${team.id}`)
        .send(updatedteamData)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.have.property('id');
          expect(res.body.name).to.equal(updatedteamData.name);
          expect(res.body.description).to.equal(updatedteamData.description);
        })
        .end(done);
    });
  });
});
