const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

// Caminhos dos arquivos
const paths = {
styles: {
    src: 'src/scss/*.scss',
    dest: 'dist/css'
},
scripts: {
    src: 'src/js/*.js',
    dest: 'dist/js'
},
images: {
    src: 'src/images/*.{jpg,jpeg,png,gif,svg}',
    dest: 'dist/images'
}
};

// Tarefa para compilar SASS
function styles() {
return gulp.src(paths.styles.src)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.styles.dest));
}

// Tarefa para comprimir imagens
async function images() {
const imagemin = (await import('gulp-imagemin')).default;
return gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
}

// Tarefa para comprimir código JavaScript
function scripts() {
return gulp.src(paths.scripts.src)
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.scripts.dest));
}

// Assistir mudanças nos arquivos
function watchFiles() {
gulp.watch(paths.styles.src, styles);
gulp.watch(paths.images.src, images);
gulp.watch(paths.scripts.src, scripts);
}

// Tarefas disponíveis
const build = gulp.series(gulp.parallel(styles, images, scripts));
const watch = gulp.series(build, watchFiles);

exports.styles = styles;
exports.images = images;
exports.scripts = scripts;
exports.build = build;
exports.watch = watch;
exports.default = build;
