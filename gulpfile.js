const { src, dest, watch } = require('gulp');
// esbuild sass plugin
const sassPlugin = require('esbuild-plugin-sass');

// cache map
const pluginCache = new Map();

// gulp esbuild
const { createGulpEsbuild } = require('gulp-esbuild');

const gulpEsbuild = createGulpEsbuild({
  incremental: true,
});

// eslint
const eslint = require('gulp-eslint');

function build() {
  return src('src/js/*')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulpEsbuild())
    .pipe(dest('dist'));
}

function buildStyles() {
  return src('src/scss/*')
    .pipe(
      gulpEsbuild({
        plugins: [sassPlugin({ cache: pluginCache })],
        loader: {
          '.scss': 'css',
        },
      }),
    )
    .pipe(dest('dist'));
}

function watchTask() {
  watch(['src/js/*'], build);
  watch(['src/scss/*'], buildStyles);
}

exports.build = build;
exports.watch = watchTask;
exports.buildStyles = buildStyles;
