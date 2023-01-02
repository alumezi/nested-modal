# [nested-modal (React)](https://reactjs.org/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/alumezi/nested-modal/blob/main/LICENSE.md) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/alumezi/nested-modal/pulls)

Nested Modal is a component that helps manage lots of modals shown at the same time.

- **Easy to use:** Very easy to create all the modals you need by just wrapping the content nodes with the Nested Modal wrapper.
- **Full Control:** Abstracts only the main parts, you can fully control visiblity with ids and callbacks.

## Installation

`npm install nested-modal`

## Documentation

We are still working on some proper docs.

<img width="1680" alt="Screenshot 2023-01-02 at 3 50 06 PM" src="https://user-images.githubusercontent.com/29073778/210247158-4397373c-5ac2-4f64-8737-95230095478c.png">


## Examples

Main example:

- Use a useState hook to control Visibility.
- Each node added will be a modal.
- Ids have to be unique.

```jsx
import NestedModal from 'nested-modal'

const App = () => {
  return (
    <NestedModal
      currentOpenedModal={currentOpenedModal}
      setCurrentOpenedModal={setCurrentOpenedModal}
      onClose={() => {}}
    >
      <div id='first-modal'>
        Modal content
        <button onClick={() => setCurrentOpenedModal('second-modal')}>asd</button>
      </div>
      <div id='second-modal'>Modal content 2</div>
    </NestedModal>
  )
}
```

## Contributing

I made this package just for fun. Anyone who would like to contribute is welcomed to open PR's or post suggestions/issues.

## Development

In order to work on this package you need to follow these steps:

1. Create a react project. e.g. with [CRA](https://create-react-app.dev/)
2. In nested-modal create a link: `npm link`
3. Go to your project and link nested-modal with your project: `npm link nested-modal`
4. One last thing, you need to link your projects react copy in the nested-modal codebase: `npm linl ../path-to-my-cra-project/node_modules/react`

- Before opening a pr please undo the last step as it will break the packge release workflow. `npm unlink ../path-to-my-cra-project/node_modules/react`

### [Code of Conduct](https://code.fb.com/codeofconduct)

We will be using Facebook code of conduct.
Please read [the full text](https://code.fb.com/codeofconduct) so that you can understand what actions will and will not be tolerated.

### License

Nested Modal is [MIT licensed](./LICENSE).
