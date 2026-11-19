import { addons } from 'storybook/manager-api';
import { create as createTheme } from 'storybook/theming/create';

// Storybook manager theme — the Storybook Preview's dark-green menu,
// ported to real Storybook's sidebar. Forest sidebar, cream canvas,
// gold accents, DM Sans / DM Serif Display / JetBrains Mono (all
// inlined as data URIs, loaded via managerHead in main.ts).
//
// What real Storybook cannot do (noted, not faked): the preview's
// custom sidebar items with "Used on Screen X" sublabels under each
// story. In real Storybook the groups come from the story titles
// (OneAndDone/<Group>/<Story>) and the "Used on" line lives in each
// story's docs description instead.
const theme = createTheme({
  base: 'light',

  brandTitle: 'JobHunter07 — One-and-Done Matching',
  brandUrl: 'https://jobhunter07.com',
  brandTarget: '_self',

  // Preview palette: --forest #16281c, --forest2 #1e3826, --moss #2f5d3a,
  // --paper #fdfaf3, --gold #c9a227, gold text #f5d76e, muted green #9db894.
  colorPrimary: '#2f5d3a',
  colorSecondary: '#c9a227',

  // UI — dark-green sidebar, cream canvas, like the preview.
  appBg: '#16281c',
  appContentBg: '#fdfaf3',
  appPreviewBg: '#fdfaf3',
  appBorderColor: '#334233',
  appBorderRadius: 10,

  // Text
  textColor: '#e6efdf',
  textInverseColor: '#1c241a',
  textMutedColor: '#9db894',

  // Toolbar / top bar
  barTextColor: '#e6efdf',
  barSelectedColor: '#f5d76e',
  barHoverColor: '#f5d76e',
  barBg: '#16281c',

  // Form inputs (sidebar search)
  inputBg: '#0f1f14',
  inputBorder: '#3d5f46',
  inputTextColor: '#eef3e8',
  inputBorderRadius: 9,

  fontBase: '"DM Sans", system-ui, sans-serif',
  fontCode: '"JetBrains Mono", monospace',
});

addons.setConfig({ theme });
