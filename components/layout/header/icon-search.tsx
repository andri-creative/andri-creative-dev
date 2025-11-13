// IconSearch.tsx
import { Box, Kbd, Text } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useThemeMode } from "@/components/ThemeProvider";

export default function IconSearch() {
  const { mode } = useThemeMode();

  const getStyles = () => {
    const isDark = mode === "dark";

    return {
      container: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "6px 10px",
        borderRadius: "9999px",
        // backgroundColor: isDark ? "rgba(255,255,255,0.00)" : "rgba(0,0,0,0.05)",
        backgroundColor: "transparent",
        border: isDark
          ? "1px solid rgba(255,255,255,0.1)"
          : "1px solid rgba(0,0,0,0.1)",
        color: isDark ? "white" : "black",
        cursor: "pointer",
        transition: "background 0.2s, border 0.2s",
      },
      text: {
        color: isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)",
      },
      kbd: {
        background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        border: isDark
          ? "1px solid rgba(255,255,255,0.2)"
          : "1px solid rgba(0,0,0,0.2)",
        color: isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)",
        fontSize: "11px",
        padding: "2px 6px",
        borderRadius: "6px",
      },
    };
  };

  const styles = getStyles();

  return (
    // <Theme appearance={mode}>
    <Box
      style={styles.container}
      onMouseEnter={(e) =>
      (e.currentTarget.style.background =
        mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)")
      }
      onMouseLeave={(e) =>
      (e.currentTarget.style.background =
        mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)")
      }
    >
      <MagnifyingGlassIcon width="18" height="18" />
      <Text size="2" style={styles.text}>
        Search...
      </Text>
      <Kbd style={styles.kbd}>Shift + Tab</Kbd>
    </Box>
    // </Theme>
  );
}
