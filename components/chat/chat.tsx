import MaintenancePage from "@/app/(ui)/maintenance/page";
import { Box } from "@radix-ui/themes";
import Profile from "./Profile";

export default function Chat() {
  return (
    <Box>
      <Profile />
      <Box>
        <MaintenancePage />
      </Box>
    </Box>
  );
}
