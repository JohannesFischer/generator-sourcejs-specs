'use strict';
var Generator = require('yeoman-generator');
var yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.formats = [
      {
        ending: 'src.html',
        title: 'HTML'
      },
      {
        ending: 'md',
        title: 'Markdown'
      },
      {
        ending: 'pug',
        title: 'Pug'
      }
    ];

    this.fileEndings = [];
    this.fileFormats = [];

    for (let format in this.formats) {
      this.fileEndings.push(format.ending);
      this.fileFormats.push(format.title);
    }

    // Have Yeoman greet the user.
    this.log(yosay('Creating all the new SourceJS specs!'));
  }

  prompting() {
    return this.prompt([{
      type: 'list',
      name: 'format',
      message: 'Select spec format',
      choices: this.fileFormats
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
    }, {
      type: 'input',
      name: 'author',
      message: 'Enter author name',
      default: this.user.git.username
    }]).then(answers => {
      const format = this.formats.find(f => f.title === answers.format)

      this.data = {
        author: answers.author,
        format: format.ending,
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

