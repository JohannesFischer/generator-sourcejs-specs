'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs');

const testAuthor = 'Test Author';
const testName = 'test-spec';
const testTitle = 'Test Title';

describe('generator-sourcejs-spec', function () {
  describe('File formats', function() {
    describe('Format HTML', function() {
      before(function() {
        return helpers.run(path.join(__dirname, '../generators/app'))
          .withPrompts({
            author: testAuthor,
            format: 'HTML',
            name: testName
          });
      });

      it('creates spec file', function () {
        assert.file([
          testName + '/index.src.html'
        ]);
      });
    });

    describe('Format Markdown', function() {
      before(function() {
        return helpers.run(path.join(__dirname, '../generators/app'))
          .withPrompts({
            format: 'Markdown',
            name: testName
          });
      });

      it('creates spec file', function () {
        assert.file([
          testName + '/index.md'
        ]);
      });
    });

    describe('Format Pug', function() {
      before(function() {
        return helpers.run(path.join(__dirname, '../generators/app'))
          .withPrompts({
            format: 'Pug',
            name: testName
          });
      });

      it('creates spec file', function () {
        assert.file([
          testName + '/index.pug'
        ]);
      });
    });
  });

  describe('Info JSON', function() {
    it('creates info file', function() {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          format: 'HTML',
          name: testName
        })
        .then(function(dir) {
          assert.file([
            testName + '/info.json'
          ]);
        });
    });

    it('contains content of user prompt', function() {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          author: testAuthor,
          format: 'HTML',
          name: testName,
          title: testTitle
        })
        .then(function(dir) {
          assert.fileContent(testName + '/info.json', testAuthor);
          assert.fileContent(testName + '/info.json', testTitle);
        });
    });
  })
});
