const plugins = [
  '@babel/plugin-transform-export-namespace-from',
  [
    'module-resolver',
    {
      root: ['./'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        '@': './src',
        'create-meeting': './src/features/create-meeting',
        'update-meeting': './src/features/update-meeting',
        'home-screen': './src/features/home-screen',
        auth: './src/features/auth',
        shared: './src/shared',
        res: './src/shared/res',
      },
    },
  ],
  ['module:react-native-dotenv'],
];

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins,
};
