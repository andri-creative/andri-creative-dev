import * as radixColors from "@radix-ui/colors";

export function injectRadixColors() {
  const root = document.documentElement;

  Object.entries(radixColors).forEach(([colorName, shades]) => {
    if (typeof shades === "object") {
      Object.entries(shades).forEach(([shade, value]) => {
        // inject sebagai --color-red-1, --color-green-1, dsb
        const cssVarName = `--color-${colorName}-${shade.replace(
          /(\d+)/,
          "-$1"
        )}`;
        root.style.setProperty(cssVarName, value);
      });
    }
  });
}
