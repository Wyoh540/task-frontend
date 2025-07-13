import { defaultPlugins } from '@hey-api/openapi-ts';

export default {
  input: 'http://localhost:8080/api/v1/openapi.json',
  output: 'src/client',
  plugins: [
    ...defaultPlugins,
    '@hey-api/client-axios',
    '@tanstack/react-query',
    {
      enums: 'typescript', 
      name: '@hey-api/typescript',
    },
  ], 
};