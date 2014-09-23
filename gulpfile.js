// TODO
// - set up build (dist/)
// - set up deployment
// - add sails-linker (possibly rewrite grunt plugin)

var PROXY_ALTERVISTA = '';


var gulp = require('gulp');
var fs = require('fs');

var concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  connect = require('gulp-connect'),
  ngHtml2Js = require("gulp-ng-html2js"),
  minifyHtml = require("gulp-minify-html"),
  minifyCss = require('gulp-minify-css'),
  sass = require('gulp-sass'),
  stylish = require('jshint-stylish'),
  jshint = require('gulp-jshint'),
  clean = require('gulp-clean'),
  cache = require('gulp-cached'),
  shell = require('gulp-shell'),
  usemin = require('gulp-usemin'),
  livereload = require('gulp-livereload'),
  rev = require('gulp-rev'),
  size = require('gulp-size'),
  jade = require('gulp-jade'),
  linker = require('gulp-linker'),
  gulpExec = require('gulp-exec'),
  conventionalChangelog = require('conventional-changelog'),
  bump = require('gulp-bump'),
  rewriteModule = require('http-rewrite-middleware'),
  runSequence = require('run-sequence'),
  ngAnnotate = require('gulp-ng-annotate'),
  gutil = require('gulp-util'),
  argv = require('yargs')
    .argv,
  replace = require('gulp-replace'),
  plumber = require('gulp-plumber'),
  _ = require('lodash-node'),
  insert = require('gulp-insert');

var paths = {
  scripts: ['app/scripts/**/*.js'],
  scriptsWithoutTests: ['app/scripts/**/*.js', '!app/scripts/**/*_test.js'],
  images: 'app/images/**/*',
  templates: {
    index: ['app/index.html'],
    html: ['app/index.html', 'app/template/**/*.html', 'app/jade-output/**/*.html'],
    jade: ['app/template/**/*.jade', 'app/images/icons/SPRITE.svg'],
    icons: ['app/images/icons/*.svg', '!app/images/icons/SPRITE.svg']
  },
  styles: {
    main: 'app/styles/**/*.scss',
    bootstrap: 'app/styles/bootstrap-sass/lib/**/*.scss',
    css: 'app/styles/*.css'
  },
  notLinted: ['!app/scripts/templates.js', '!app/scripts/services/BusuuPopcorn.js']
};

var rewriteMiddleware = rewriteModule.getMiddleware([{
  from: '^/dashboard$',
  to: '/index.html'
}]);

// Error-handler for gulp-plumber
var onError = function(err) {
  gutil.beep();
  console.log(err);
};


////////////////////////////
/// Development tasks
///
var developTasks = ['connect', 'preprocess', 'watch'];
gulp.task('develop', developTasks);

gulp.task('no-karma', function() {
  var index = developTasks.indexOf('karma');
  developTasks.splice(index, 1);
  gulp.start('develop');
});


gulp.task('preprocess', ['templates', 'all-sass']);
// The default task (called when you run `gulp` from cli)
gulp.task('default', ['develop']);



/**
 * Setup a server to preview the app.
 * Has middleware that forwards certain API calls to a different server.
 */
gulp.task('connect', connect.server({
  root: ['app'],
  port: 9000,
  livereload: true,
  middleware: function(connect, o) {
    function buildProxy() {
      var url = require('url');
      var proxy = require('proxy-middleware');

      var options = url.parse('http://thesaurus.altervista.org/service.php/');
      options.route = '/service.php';

      return proxy(options);
    }

    return [
      rewriteMiddleware,
      buildProxy()
    ];
  }
}));

/**
 * Version release code
 */
gulp.task('release', function(callback) {
  runSequence('bump-minor', 'release-tasks', callback);
});

gulp.task('patch', function(callback) {
  runSequence('bump-patch', 'release-tasks', callback);
});

gulp.task('bump-minor', function() {
  gulp.src('./package.json')
    .pipe(bump({
      type: 'minor'
    }))
    .pipe(gulp.dest('./'));
});


gulp.task('bump-patch', function() {
  gulp.src('./package.json')
    .pipe(bump({
      type: 'patch'
    }))
    .pipe(gulp.dest('./'));
});

// https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#heading=h.we1fxubeuwef
gulp.task('release-tasks', function() {
  var jsonFile = require('./package.json'),
    commitMsg = "chore(release): " + jsonFile.version;

  function changeParsed(err, log) {
    if (err) {
      return done(err);
    }
    fs.writeFile('CHANGELOG.md', log);
  }
  var ref, repository, version;
  repository = jsonFile.repository, version = jsonFile.version;
  conventionalChangelog({
    // repository: repository.url,
    version: version
  }, changeParsed);

  return gulp.src(['package.json', 'CHANGELOG.md'])
    .pipe(gulp.dest('.'))
    .pipe(gulpExec('git add -A')) // so the following git commands only execute once
    .pipe(gulpExec("git commit -m '" + commitMsg + "'"))
    .pipe(gulpExec("git tag -a " + jsonFile.version + " -m '" + commitMsg + "'"));
});

gulp.task('lint', function() {
  return gulp.src(paths.scripts.concat(paths.notLinted))
    .pipe(cache('lint'))
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, function(file) {
    gulp.src(file.path)
      .pipe(connect.reload(file.path));
  });

  // gulp.watch(paths.scripts, ['lint']);

  gulp.watch(paths.styles.css, ['reloadStyles']);
  gulp.watch(paths.templates.html, ['html2js']);
  gulp.watch(paths.templates.jade, ['jade']);
  gulp.watch('app/styleguide/*.jade', ['styleguide']);
  gulp.watch(paths.styles.main, ['sass-main']);
  gulp.watch(paths.styles.bootstrap, ['sass-bootstrap']);
  gulp.watch('./app/stylus/**/*.styl', ['stylus']);

  gulp.watch(paths.scriptsWithoutTests, function(event) {
    if (event.type === 'added' || event.type === 'deleted') {
      gulp.start('linker');
    }
  });
});

gulp.task('reloadJs', function() {
  return gulp.src(paths.scripts)
    .pipe(connect.reload());
});

gulp.task('reloadStyles', function() {
  gulp.src(paths.styles.css)
    .pipe(connect.reload());
});

gulp.task('linker', function() {
  return gulp.src('app/index.html')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(linker({
      scripts: ['app/scripts/**/*.js',  '!app/scripts/app.js'],
      startTag: '<!--SCRIPTS-->',
      endTag: '<!--SCRIPTS END-->',
      fileTmpl: '<script src="%s"></script>',
      appRoot: 'app/'
    }))
    .pipe(gulp.dest('app/'));
});


gulp.task('templates', ['jade', 'html2js']);

gulp.task('styleguide', function() {
  gulp.src("app/styleguide/index.jade")
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(jade({
      options: {
        pretty: true
      },
      pretty: true
      // doctype: "html"
    }))
    .pipe(connect.reload())
    .pipe(gulp.dest('app/styleguide/'));
});

gulp.task('jade', function() {
  return gulp.src(paths.templates.jade)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(cache('jade'))
    .pipe(insert.prepend('mixin icon(type, width, height)\n  - width = width || 100\n  - height = height || 100\n  svg(viewBox="0 0 #{width} #{height}")\n    use(xlink:href="#icon_#{type}")\n'))
    .pipe(jade({
      pretty: true,
      doctype: "html"
    }))
    .pipe(gulp.dest("app/jade-output"));
});

gulp.task('html2js', ['jade'], function() {
  return gulp.src(paths.templates.html)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(ngHtml2Js({
      moduleName: "cinnamon.templates",
      prefix: "template/"
    }))
    .pipe(concat("templates.js"))
    .pipe(gulp.dest("app/scripts"));
});

gulp.task('all-sass', function() {
  return gulp.src(['./app/styles/main.scss', './app/styles/busuu-bootstrap.scss'])
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sass({
      outputStyle: "compressed",
      includePaths: ["./app/styles/bootstrap-sass", "./app"]
    }))
    .on('error', gutil.log)
    .pipe(gulp.dest('./app/styles'));
});


gulp.task('sass-main', function() {
  return gulp.src('./app/styles/main.scss')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sass({
      outputStyle: "compressed",
      includePaths: ["./app/styles/bootstrap-sass", "./app"]
    }))
    .on('error', gutil.log)
    .pipe(gulp.dest('./app/styles'));
});

gulp.task('sass-bootstrap', function() {
  return gulp.src('./app/styles/busuu-bootstrap.scss')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sass({
      outputStyle: "compressed",
      includePaths: ["./app/styles/bootstrap-sass", "./app"]
    }))
    .on('error', gutil.log)
    .pipe(gulp.dest('./app/styles'));
});



// Stylus stuff
var stylus = require('gulp-stylus');
var jeet = require('jeet');
var nib = require('nib');
var rupture = require('rupture');

gulp.task('stylus', function() {
  gulp.src(paths.stylus)
    .pipe(stylus({
      errors: true,
      use: [jeet(), nib(), rupture()]
    }))
    .pipe(gulp.dest('./app/styles/'));
});
