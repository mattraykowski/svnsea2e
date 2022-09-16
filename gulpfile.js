const gulp = require('gulp');
const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const cp = require("child_process");
const argv = require("yargs").argv;

// const prefix = require('gulp-autoprefixer');
// const sourcemaps = require('gulp-sourcemaps');
// const sass = require('gulp-sass');

function getConfig() {
  const configPath = path.resolve(process.cwd(), "foundryconfig.json");
  let config;

  if (fs.existsSync(configPath)) {
    config = fs.readJSONSync(configPath);
    return config;
  }
}

/********************/
/*		BUILDING  		*/
/********************/

function build() {
  return cp.spawn("npx", ["vite", "build"], { stdio: "inherit", shell: true });
}

function _distWatcher() {
  const publicDirPath = path.resolve(process.cwd(), "public");
  const watcher = gulp.watch(["public/**/*.hbs"], { ignoreInitial: false });
  watcher.on('change', async function(file, stats) {
    console.log(`File ${file} was changed`);
    const partial_file = path.relative(publicDirPath, file)
    await fs.copy(path.join("public", partial_file), path.join("dist", partial_file));
  });
}

function watch() {
  _distWatcher();
  return cp.spawn("npx", ["vite", "build", "-w"], { stdio: "inherit", shell: true });
}

function serve() {
  _distWatcher();
  // forward arguments on serves
  const serveArg = process.argv[2];
  let commands = ["vite", "serve"];
  if (serveArg == "serve" && process.argv.length > 3) {
    commands = commands.concat(process.argv.slice(3));
  }
  return cp.spawn("npx", commands, { stdio: "inherit", shell: true });
}

/********************/
/*		LINK		*/
/********************/

/**
 * Link build to User Data folder
 */

async function linkUserData() {
  const name = path.basename(path.resolve("."));
  const config = fs.readJSONSync("foundryconfig.json");

  let destDir;
  try {
    if (
        fs.existsSync(path.resolve(".", "dist", "module.json")) ||
        fs.existsSync(path.resolve(".", "src", "module.json"))
    ) {
      destDir = "modules";
    } else if (
        fs.existsSync(path.resolve(".", "dist", "system.json")) ||
        fs.existsSync(path.resolve(".", "src", "system.json"))
    ) {
      destDir = "systems";
    } else {
      throw Error(`Could not find ${chalk.blueBright("module.json")} or ${chalk.blueBright("system.json")}`);
    }

    let linkDir;
    if (config.dataPath) {
      if (!fs.existsSync(path.join(config.dataPath, "Data")))
        throw Error("User Data path invalid, no Data directory found");

      linkDir = path.join(config.dataPath, "Data", destDir, config.systemName);
    } else {
      throw Error("No User Data path defined in foundryconfig.json");
    }

    if (argv.clean || argv.c) {
      console.log(chalk.yellow(`Removing build in ${chalk.blueBright(linkDir)}`));

      await fs.remove(linkDir);
    } else if (!fs.existsSync(linkDir)) {
      console.log(chalk.green(`Copying build to ${chalk.blueBright(linkDir)}`));
      await fs.symlink(path.resolve("./dist"), linkDir, "junction");
    }
    return Promise.resolve();
  } catch (err) {
    Promise.reject(err);
  }
}



/* ----------------------------------------- */
/*  Compile Sass
/* ----------------------------------------- */

// Small error handler helper function.
// function handleError(err) {
//   console.log(err.toString());
//   this.emit('end');
// }
//
// const SYSTEM_SCSS = ["scss/**/*.scss"];
// function compileScss() {
//   // Configure options for sass output. For example, 'expanded' or 'nested'
//   let options = {
//     outputStyle: 'expanded'
//   };
//   return gulp.src(SYSTEM_SCSS)
//     .pipe(
//       sass(options)
//         .on('error', handleError)
//     )
//     .pipe(prefix({
//       cascade: false
//     }))
//     .pipe(gulp.dest("./css"))
// }
// const css = gulp.series(compileScss);
//
// /* ----------------------------------------- */
// /*  Watch Updates
// /* ----------------------------------------- */
//
// function watchUpdates() {
//   gulp.watch(SYSTEM_SCSS, css);
// }
//
// /* ----------------------------------------- */
// /*  Export Tasks
// /* ----------------------------------------- */
//
// exports.default = gulp.series(
//   compileScss,
//   watchUpdates
// );
// exports.css = css;

exports.build = build;
exports.watch = watch;
exports.serve = serve;
exports.link = linkUserData;