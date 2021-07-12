import { Palette } from './Palette';

/**
 * Roles for colors.  Prefer using these over the Palette.  It makes it easier
 * to change things.
 *
 * The only roles we need to place in here are the ones that span through the app.
 *
 * If you have a specific use-case, like a spinner color.  It makes more sense to
 * put that in the <Spinner /> component.
 */
export const Color = {
  /**
   * The Palette is available to use, but prefer using the name.
   */
  Palette,
  /**
   * A helper for making something see-thru. Use sparingly as many layers of transparency
   * can cause older Android devices to slow down due to the excessive compositing required
   * by their under-powered GPUs.
   */
  transparent: 'rgba(0, 0, 0, 0)',
  /**
   * The Screen background.
   */
  background: Palette.white,
  /**
   * The Screen header and safe area.
   */
  headerSafe: Palette.orangeDarker,
  /**
   * The main tinting color.
   */
  primary: Palette.orange,
  /**
   * The main tinting color, but darker.
   */
  primaryDarker: Palette.orangeDarker,
  /**
   * A subtle color used for borders and lines.
   */
  line: Palette.offWhite,
  /**
   * The default color of text in many components.
   */
  text: Palette.white,
  /**
   * Secondary information.
   */
  dim: Palette.lightGrey,
  /**
   * Error messages and icons.
   */
  error: Palette.angry,

  /**
   * Storybook background for Text stories, or any stories where
   * the text color is color.text, which is white by default, and does not show
   * in Stories against the default white background
   */
  storybookDarkBg: Palette.black,

  /**
   * Storybook text color for stories that display Text components against the
   * white background
   */
  storybookTextColor: Palette.black,
};
