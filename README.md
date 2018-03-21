# create-hdom-app

New project generator for TypeScript apps buit around these libraries
from the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/)
collection:

- [@thi.ng/atom](https://github.com/thi-ng/umbrella/tree/master/packages/atom)
- [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/master/packages/hdom)
- [@thi.ng/interceptors](https://github.com/thi-ng/umbrella/tree/master/packages/interceptors)
- [@thi.ng/router](https://github.com/thi-ng/umbrella/tree/master/packages/router) (optional)

The skeleton app contains various app configuration options, incl.
optional dummy components to illustrate the overall usage patterns, and
detailed comments with further documentation links to help you get
started.

[Live demo](http://demo.thi.ng/umbrella/create-hdom-app) (default configuration)

## Status

ALPHA - work in progress & current setup likely to change...

## Usage

```
yarn create hdom-app my-app

cd my-app
yarn install
yarn start
```

The `yarn start` command launched `webpack-dev-server` and opens the app
in your browser. See generated `README.md` for further details...

The app is utilizing [Tachyons
CSS](https://github.com/tachyons-css/tachyons/) for component skinning,
but this is non-intrusive and can easily be removed.

## Configuration

The generator is customizable and currently can generate the following
project configurations using extra command line arguments.

```
Usage: yarn create hdom-app <project-name> [options]

Options:

    -V, --version  output the version number
    -q, --quiet    suppress all messages (excl. errors)
    --bare         same as '--minimal --no-router --no-events'
    --minimal      don't generate dummy components
    --no-router    skip router support
    --no-events    skip event bus support
    -h, --help     output usage information
```

### Default: Event system & SPA router

By default a few dummy components are generated to help you get started. For users familiar with the overall setup, the `--minimal` option is recommended for starting new projects.

```
yarn create hdom-app my-app [--minimal]
```

### Event system, but no router support

This is the recommended option if you want to use an alternative SPA
router implementation.

```
yarn create hdom-app my-app --no-router [--minimal]
```

### Router support, but no event system

(This configuration is only intended for small tests / experiments and
not recommended for serious applications.)

```
yarn create hdom-app my-app --no-events [--minimal]
```

### Barebones: no event bus, no router

(This configuration is only intended for small tests / experiments and
not recommended for serious applications.)

```
# with dummy components
yarn create hdom-app my-app --no-router --no-events

# completely bare
yarn create hdom-app my-app --bare
```

## Dependencies

Since the `@thi.ng/*` dependencies are currently updated very frequently, the generated `package.json` lists their versions as `latest`. Dev dependencies are specified using caret ranges.

## Questions / feedback

Please create an issue on GH, should run into any problems or have any improvement ideas. Always open for suggestions.

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
