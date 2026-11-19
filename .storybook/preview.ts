import type { Decorator, Preview } from '@storybook/nextjs-vite';
import React from 'react';

// One-and-Done Matching styles, ported exactly from the JobHunter07
// Storybook Preview artifact. All rules are scoped under `.ood`, so
// they style only One-and-Done components (which render inside a
// <div className="ood"> wrapper) and never leak into Brian's landing
// stories. Fonts are inlined as data URIs in one-and-done.css.
import '../src/design/one-and-done.css';

import { theme, type ThemeMode } from '../src/design/tokens/theme';

const withJobHunterTheme: Decorator = (Story, context) => {
  const mode = (context.globals.theme as ThemeMode) ?? 'light';
  const palette = theme[mode].palette;
  // The `.ood` scope (and the preview's dotted paper canvas) applies
  // ONLY to One-and-Done stories. Brian's landing stories keep the
  // plain token background and are untouched by the ported CSS.
  const isOneAndDone =
    typeof context.title === 'string' && context.title.startsWith('OneAndDone');

  const themeStyles: React.CSSProperties = isOneAndDone
    ? {
        // The preview's canvas: cream paper with the dotted ground, exactly
        // as in the Storybook Preview artifact.
        backgroundColor: 'var(--paper)',
        backgroundImage: 'radial-gradient(var(--line) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
        color: 'var(--ink)',
        minHeight: '100vh',
        padding: '28px 22px 56px',
        '--jh-bg': palette.bg,
        '--jh-surface': palette.surface,
        '--jh-text': palette.text,
        '--jh-muted-text': palette.mutedText,
        '--jh-primary': palette.primary,
        '--jh-primary-hover': palette.primaryHover,
        '--jh-secondary': palette.secondary,
        '--jh-secondary-hover': palette.secondaryHover,
        '--jh-border': palette.border,
        '--jh-focus': palette.focus,
      } as React.CSSProperties
    : ({
        backgroundColor: palette.bg,
        color: palette.text,
        minHeight: '100vh',
        '--jh-bg': palette.bg,
        '--jh-surface': palette.surface,
        '--jh-text': palette.text,
        '--jh-muted-text': palette.mutedText,
        '--jh-primary': palette.primary,
        '--jh-primary-hover': palette.primaryHover,
        '--jh-secondary': palette.secondary,
        '--jh-secondary-hover': palette.secondaryHover,
        '--jh-border': palette.border,
        '--jh-focus': palette.focus,
      } as React.CSSProperties);

  return React.createElement(
    'div',
    {
      'data-theme': mode,
      className: isOneAndDone ? 'ood' : undefined,
      style: themeStyles,
    },
    React.createElement(Story)
  );
};

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for JobHunter07',
      defaultValue: 'light',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  decorators: [withJobHunterTheme],
};

export default preview;
