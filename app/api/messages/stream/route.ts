import { createSSEHandler } from "@/lib/sse";

export async function GET() {
  return createSSEHandler();
}
