import {hydrogenPreset} from '@shopify/hydrogen/react-router-preset';
import {vercelPreset} from '@vercel/react-router/vite';

/**
 * React Router 7.x configuration.
 *
 * Locally and on Shopify Oxygen we use the Hydrogen preset (worker target,
 * Oxygen-aware optimizations). When `VERCEL=1` is set (Vercel build env),
 * we swap in the Vercel preset so Vercel produces a Node serverless
 * function instead of a Workers bundle.
 */
const isVercel = !!process.env.VERCEL;

export default {
  presets: [isVercel ? vercelPreset() : hydrogenPreset()],
};

/** @typedef {import('@react-router/dev/config').Config} Config */
