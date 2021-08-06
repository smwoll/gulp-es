import gulp from 'gulp';
import { sassPlugin } from 'esbuild-sass-plugin';

const { src, dest, watch } = require('gulp');
// esbuild sass plugin

// const sassPlugin = require('esbuild-sass-plugin');

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
  return src('src/scss/main.scss')
    .pipe(
      gulpEsbuild({
        plugins: [
          sassPlugin({
            // cache: pluginCache,
            file: 'main.scss',
            includePaths: ['/src/scss'],
          }),
        ],
        loader: {
          '.scss': 'css',
        },
      }),
    )
    .pipe(dest('dist'));
}

function watchTask() {
  watch(['src/js/*'], build);
  watch(['src/scss/**/*.scss'], buildStyles);
}

exports.build = build;
exports.watch = watchTask;
exports.buildStyles = buildStyles;
