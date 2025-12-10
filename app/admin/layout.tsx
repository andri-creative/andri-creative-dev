import { Box } from "@radix-ui/themes";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Box>
            {children}
        </Box>
    );
}