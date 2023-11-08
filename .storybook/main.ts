import type { StorybookConfig } from '@storybook/react-webpack5'
const path = require('path')
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
  // 声明 Webpack 的路径，解决 @ 别名引入问题
  webpackFinal: async config => {
    config.resolve ??= {}
    config.resolve.alias ??= {}
    config.resolve.alias['@'] = path.resolve(__dirname, '../src')
    return config
  },
}
export default config
