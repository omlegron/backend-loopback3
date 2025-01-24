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

  it('should get a team by id with has many members', (done) => {
    const teamData = {
      name: 'Team 1',
      description: 'Description Team 1',
    };

    const memberData = {
      name: 'Member 1',
      description: 'Description Member 1',
    };

    Team.create(teamData, (err, team) => {
      memberData.teamId = team.id;
      request(app)
        .post(`/api/teams/${team.id}/members`)
        .send(memberData)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.have.property('id');
          expect(res.body.name).to.equal(memberData.name); // Changed to memberData
          expect(res.body.description).to.equal(memberData.description); // Changed to memberData
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          request(app)
            .get(`/api/teams/${team.id}`)
            .query({filter: {include: ['members']}})
            .expect(200)
            .expect((res) => {
              console.log('res', res.body);
              expect(res.body).to.have.property('id');
              expect(res.body.name).to.equal(teamData.name);
              expect(res.body.description).to.equal(teamData.description);
              expect(res.body.members).to.be.an('array');
              expect(res.body.members).to.have.lengthOf(1);
              expect(res.body.members[0].name).to.equal(memberData.name);
              // eslint-disable-next-line max-len
              expect(res.body.members[0].description).to.equal(memberData.description);
            })
            .end(done);
        });
    });
  });
});
