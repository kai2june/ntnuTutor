var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default', function(err){
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 3000
        },
        ignore: ['./node_modules/**']
    }).on('restart', function(err){
        console.log("I'm now restarting....");
    });
});