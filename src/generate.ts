import { IObjectOf } from "@thi.ng/api/api";
import chalk from "chalk";
import { Command } from "commander";
import * as fs from "fs-extra";
import * as path from "path";
import * as valid from "validate-npm-package-name";

interface ProjectConfig {
    basename: string;
    name: string;
    root: string;
    configID: string;
}

type FileSpec = [string, string[]];
type FileSpecs = IObjectOf<IObjectOf<FileSpec[]>>;

const FILES: FileSpecs = {
    default: {
        common: [
            ["logo.png", ["public", "assets", "logo.png"]],
            ["tsconfig.json", ["tsconfig.json"]],
            ["webpack.config.js", ["webpack.config.js"]],
            ["index.ts", ["src", "index.ts"]],
            ["appstate.ts", ["src", "components", "appstate.ts"]],
            ["header.ts", ["src", "components", "header.ts"]],
        ],
        default: [
            ["api.default.ts", ["src", "api.ts"]],
            ["app.default.ts", ["src", "app.ts"]],
            ["config.default.ts", ["src", "config.ts"]],
            ["home.default.ts", ["src", "components", "home.ts"]],
            ["testroute.ts", ["src", "components", "testroute.ts"]],
            ["event-link.ts", ["src", "components", "event-link.ts"]],
            ["route-link.ts", ["src", "components", "route-link.ts"]],
        ],
        ne: [
            ["api.ne.ts", ["src", "api.ts"]],
            ["app.ne.ts", ["src", "app.ts"]],
            ["config.ne.ts", ["src", "config.ts"]],
            ["home.ne.ts", ["src", "components", "home.ts"]],
            ["testroute.ts", ["src", "components", "testroute.ts"]],
            ["route-link.ne.ts", ["src", "components", "route-link.ts"]],
            ["link.ts", ["src", "components", "link.ts"]],
        ],
        nr: [
            ["api.nr.ts", ["src", "api.ts"]],
            ["app.nr.ts", ["src", "app.ts"]],
            ["config.nr.ts", ["src", "config.ts"]],
            ["home.nr.ts", ["src", "components", "home.ts"]],
            ["event-link.ts", ["src", "components", "event-link.ts"]],
        ],
        nre: [
            ["api.nre.ts", ["src", "api.ts"]],
            ["app.nre.ts", ["src", "app.ts"]],
            ["config.nre.ts", ["src", "config.ts"]],
            ["home.nre.ts", ["src", "components", "home.ts"]],
            ["link.ts", ["src", "components", "link.ts"]],
        ],
    },
    minimal: {
        common: [
            ["tsconfig.json", ["tsconfig.json"]],
            ["webpack.config.js", ["webpack.config.js"]],
            ["index.ts", ["src", "index.ts"]],
            ["main.min.ts", ["src", "components", "main.ts"]],
        ],
        default: [
            ["api.min.default.ts", ["src", "api.ts"]],
            ["app.default.ts", ["src", "app.ts"]],
            ["config.min.default.ts", ["src", "config.ts"]],
            ["event-link.ts", ["src", "components", "event-link.ts"]],
            ["route-link.ts", ["src", "components", "route-link.ts"]],
        ],
        ne: [
            ["api.min.ne.ts", ["src", "api.ts"]],
            ["app.ne.ts", ["src", "app.ts"]],
            ["config.min.ne.ts", ["src", "config.ts"]],
            ["route-link.ne.ts", ["src", "components", "route-link.ts"]],
            ["link.ts", ["src", "components", "link.ts"]],
        ],
        nr: [
            ["api.min.nr.ts", ["src", "api.ts"]],
            ["app.nr.ts", ["src", "app.ts"]],
            ["config.min.nr.ts", ["src", "config.ts"]],
            ["event-link.ts", ["src", "components", "event-link.ts"]],
        ],
        nre: [
            ["api.min.nre.ts", ["src", "api.ts"]],
            ["app.nre.ts", ["src", "app.ts"]],
            ["config.min.nre.ts", ["src", "config.ts"]],
            ["link.ts", ["src", "components", "link.ts"]],
        ],
    }
};

const makePackage = (conf: ProjectConfig, opts) => {
    const deps = {
        "@thi.ng/atom": "latest",
        "@thi.ng/hdom": "latest",
    };
    if (opts.events) {
        deps["@thi.ng/interceptors"] = "latest";
    }
    if (opts.router) {
        deps["@thi.ng/router"] = "latest";
    }
    return JSON.stringify(
        {
            name: conf.name,
            version: "0.0.1",
            description: "TODO",
            repository: `https://github.com/[your-gh-username]/${conf.name}`,
            author: "TODO",
            license: "MIT",
            scripts: {
                build: "webpack --mode production",
                start: "webpack-dev-server --open --mode development --devtool inline-source-map"
            },
            dependencies: deps,
            devDependencies: {
                "@types/node": "^9.6.2",                
                "typescript": "^2.7.2",
                "ts-loader": "^4.0.1",
                "webpack": "^4.1.1",
                "webpack-cli": "^2.0.12",
                "webpack-dev-server": "^3.1.1",
            }
        },
        null, 4
    );
};

const makeHtml = (conf: ProjectConfig) =>
    `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${conf.name}</title>
    <link href="https://unpkg.com/tachyons@4.9.1/css/tachyons.min.css" rel="stylesheet">
</head>
<body>
    <div id="app"></div>
    <script type="text/javascript" src="bundle.js"></script>
</body>
</html>`;

const makeReadme = (conf: ProjectConfig) =>
    `# ${conf.name}
## About

TODO

## Building
### Development

\`\`\`
git clone https://github.com/[your-gh-username]/${conf.name}
yarn install
yarn start
\`\`\`

Installs all dependencies, runs \`webpack-dev-server\` and opens the app in your browser.

### Production

\`\`\`
yarn build
\`\`\`

Builds a minified version of the app and places it in \`/public\` directory.

## Authors

TODO

&copy; 2018`;

const createApp = (conf: ProjectConfig, opts) => {
    ensureProjectName(conf.name, opts);
    checkProjectName(conf.name);

    conf.basename = path.basename(conf.name);
    conf.root = path.resolve(conf.basename);

    fs.ensureDirSync(conf.basename);

    log(opts, `Creating a new app "${conf.name}" in ${chalk.green(conf.root)}...\n`);

    if (opts.bare) {
        opts.router = false;
        opts.events = false;
        opts.minimal = true;
    }

    conf.configID = opts.router ?
        opts.events ? "default" : "ne" :
        opts.events ? "nr" : "nre";

    emitFile(["package.json"], makePackage(conf, opts), conf, opts);
    emitFile(["README.md"], makeReadme(conf), conf, opts);
    emitFile(["public", "index.html"], makeHtml(conf), conf, opts);

    const filesets = opts.minimal ? FILES.minimal : FILES.default;
    copyFileSet(filesets.common, conf, opts);
    copyFileSet(filesets[conf.configID], conf, opts);
}

const emitFile = (srcpath: string[], body: string, conf: ProjectConfig, opts) => {
    const dir = path.resolve(...[conf.root, ...srcpath.slice(0, srcpath.length - 1)]);
    const fpath = path.resolve(...[conf.root, ...srcpath]);
    log(opts, "writing:", chalk.green(srcpath.join("/")));
    try {
        fs.ensureDirSync(dir);
        fs.writeFileSync(fpath, body);
    } catch (e) {
        error("error writing file:", e.message);
        error("aborting...");
        process.exit(1);
    }
};

const copyFile = ([src, dest]: FileSpec, conf: ProjectConfig, opts) => {
    const srcPath = path.resolve(__dirname, "tpl", src);
    const destDir = path.resolve(...[conf.root, ...dest.slice(0, dest.length - 1)]);
    const destPath = path.resolve(...[conf.root, ...dest]);
    log(opts, "writing:", chalk.green(dest.join("/")));
    try {
        fs.ensureDirSync(destDir);
        fs.copySync(srcPath, destPath);
    } catch (e) {
        error("error writing file:", e.message);
        error("aborting...");
        process.exit(1);
    }
};

const copyFileSet = (files: FileSpec[], conf: ProjectConfig, opts) => {
    files.forEach((f) => copyFile(f, conf, opts));
};

const ensureProjectName = (name: string, opts) => {
    if (!name) {
        error(`
Please specify the project directory:
    ${chalk.cyan(opts.name())} ${chalk.green("<project-directory>")}

For example:
    ${chalk.cyan(opts.name())} ${chalk.green("my-hdom-app")}

Run ${chalk.cyan(`${opts.name()} --help`)} to see all options.`
        );
        process.exit(1);
    }
};

const checkProjectName = (name: string) => {
    const res = valid(name);
    if (!res.validForNewPackages) {
        error(`Could not create a project called "${name}" because of npm naming restrictions:`);
        listErrors(res.errors);
        listErrors(res.warnings);
        process.exit(1);
    }
}

const listErrors = (errors: string[]) => {
    if (errors != null) {
        errors.forEach((e) => error(`    - ${e}`));
    }
}

const log = (opts: Command, ...body) => {
    if (!opts.quiet) {
        console.log(...body);
    }
}

const error = (...body) => {
    console.error(chalk.red(body.join(" ")));
}

// main entry point

const packageJson = require("./package.json");
const conf = <ProjectConfig>{};
const opts: Command = new Command(packageJson.name)
    .version(packageJson.version)
    .arguments("<project-directory>")
    .usage(`${chalk.green("<project-directory>")} [options]`)
    .action((name) => (conf.name = name))
    .option("-q, --quiet", "suppress all messages (excl. errors)")
    .option("--bare", "same as '--minimal --no-router --no-events'")
    .option("--minimal", "don't generate dummy components")
    .option("--no-router", "skip router support")
    .option("--no-events", "skip event bus support")
    .parse(process.argv);

createApp(conf, opts);
