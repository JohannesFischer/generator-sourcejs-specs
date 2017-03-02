'use strict';
var Generator = require('yeoman-generator');
// var chalk = require('chalk');
var yosay = require('yosay');

const formats = {
  html: 'HTML',
  md: 'Markdown',
  pug: 'Pug'
};

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // Have Yeoman greet the user.
    this.log(yosay('Creating all the new SourceJS specs!'));
  }

  prompting() {
    return this.prompt([{
      type: 'list',
      name: 'format',
      message: 'Select spec format',
      choices: Object.values(formats)
    }, {
      type: 'input',
      name: 'name',
      message: 'Enter short Spec name (folder name):',
      default: 'new-spec'
    },
    {
      type: 'input',
      name: 'title',
      message: 'Enter human readable Spec title:',
      default: 'New Spec title'
    },
    {
      type: 'input',
      name: 'keywords',
      message: 'Enter spec keywords (comma separated)',
      default: 'none'
    }]).then(answers => {
      this.data = {
        author: this.user.git.username,
        format: Object.keys(formats).find(key => formats[key] === answers.format),
        keywords: answers.keywords === 'none' ? undefined : answers.keywords,
        name: answers.name,
        title: answers.title
      };
    });
  }

  writing() {
    const filename = `index.${this.data.format}`;

    this.fs.copyTpl(
      this.templatePath(`_${filename}`),
      this.destinationPath(`${this.data.name}/${filename}`),
      this.data
    );

    this.fs.copyTpl(
      this.templatePath('_info.json'),
      this.destinationPath(`${this.data.name}/info.json`),
      this.data
    );
  }
};

