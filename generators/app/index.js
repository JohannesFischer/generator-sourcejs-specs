'use strict';
var Generator = require('yeoman-generator');
var yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.formats = {
      html: 'HTML',
      md: 'Markdown',
      pug: 'Pug'
    };

    if (Object.hasOwnProperty('keys')) {
      this.keys = Object.keys(this.formats);
    } else {
      this.keys = [];

      for (let key in this.formats) {
        this.keys.push(key);
      }
    }


    if (Object.hasOwnProperty('values')) {
      this.values = Object.values(this.formats);
    } else {
      this.values = [];

      for (let i = 0; i < this.formats.length; i++) {
        this.values.push(this.formats[i]);
      }
    }

    // Have Yeoman greet the user.
    this.log(yosay('Creating all the new SourceJS specs!'));
  }

  prompting() {
    return this.prompt([{
      type: 'list',
      name: 'format',
      message: 'Select spec format',
      choices: this.values
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
        format: this.keys.find(key => this.formats[key] === answers.format),
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

