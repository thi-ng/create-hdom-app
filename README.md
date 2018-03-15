# create-hdom-app

New project generator for TypeScript apps buit around these libraries from the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) collection:

- [@thi.ng/atom](https://github.com/thi-ng/umbrella/tree/master/packages/atom)
- [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/master/packages/hdom)
- [@thi.ng/router](https://github.com/thi-ng/umbrella/tree/master/packages/router) (optional)

The skeleton app contains various app configuration options, dummy components to illustrate the overall usage patterns, and detailed comments with further documentation links to help you get started.

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

The `yarn start` command launched `webpack-dev-server` and opens the app in your browser. See generated `readme.md` for further details...

The app is utilizing [Tachyons CSS](https://github.com/tachyons-css/tachyons/) for component skinning, but this is optional.

## Configuration

The generator is customizable and currently can generate 4 different
project configurations using extra command line arguments.

### Default: Event system & SPA router

```
yarn create hdom-app my-app
```

### Event system, but no router support

This is the recommended option if you want to use an alternative SPA router implementation.

```
yarn create hdom-app my-app --no-router
```

### Router support, but no event system

(This configuration is only intended for small tests / experiments and
not recommended for serious applications.)

```
yarn create hdom-app my-app --no-events
```

### Barebones: no event bus, no router

(This configuration is only intended for small tests / experiments and
not recommended for serious applications.)

```
yarn create hdom-app my-app --no-router --no-events
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
