# OpenAPI Schema to TypeScript Interface Transformer

This TypeScript package transforms OpenAPI schemas into TypeScript interfaces. It is designed for use in browser environments, bypassing the default `redocly` processing used by `openapi-typescript` to ensure compatibility and performance.
In most cases you would want to use `openapi-typescript` directly.
The interface is opinionated and tailored toward use in [Galaxy](https://github.com/galaxyproject/galaxy)

## Features

- Converts OpenAPI schemas directly to TypeScript interfaces.
- Designed for browser compatibility by calling internal methods and avoiding Node.js-specific dependencies.

## Installation

```bash
npm install schema-to-ts
```

or

```bash
yarn add schema-to-ts
```

## API

### `schemaToInterface(openApiSchema: OpenAPI3): string`

Transforms a valid OpenAPI schema into TypeScript interfaces.

- **Parameters**: 
  - `schema` (object): The OpenAPI schema to transform.
- **Returns**: 
  - A string containing TypeScript interfaces.

## Browser Compatibility

This package has been tailored for browser environments by avoiding dependencies that rely on Node.js. This makes it suitable for use in frontend applications or browser-based tools.

## Development

### Requirements

- Node.js (>= 16.x)
- npm or yarn

### Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/openapi-schema-to-ts.git
    ```

2. Install dependencies:

    ```bash
    cd openapi-schema-to-ts
    npm install
    ```

### Building the Package

```bash
npm run build
```

### Running Tests

```bash
npm test
```

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Acknowledgements

- Built on top of [openapi-typescript](https://github.com/drwpow/openapi-typescript).

