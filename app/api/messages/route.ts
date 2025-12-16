// app/api/messages/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/config/mongodb";
import Message from "@/models/message/Message";
import User from "@/models/message/User";
import { sendToClients } from "@/lib/sse";

export async function GET() {
  try {
    await connectDB();

    const messages = await Message.find()
      .populate("sender", "name email avatar")
      .sort({ createdAt: 1 });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("GET ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil pesan" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { sender, content, replyTo } = body;

    console.log("📨 Received POST request:", {
      sender,
      contentLength: content?.length,
    });

    if (!sender || !content) {
      return NextResponse.json(
        { success: false, error: "Sender dan content diperlukan" },
        { status: 400 }
      );
    }

    // Cari atau buat user
    let user = await User.findOne({ email: sender });

    if (!user) {
      console.log(`👤 Creating new user for: ${sender}`);
      user = await User.create({
        email: sender,
        name: sender.split("@")[0],
      });
    }

    // Buat pesan
    const msg = await Message.create({
      sender: user._id,
      content,
      replyTo: replyTo || null,
    });

    // Populate sender data
    const populated = await Message.findById(msg._id).populate(
      "sender",
      "name email avatar"
    );

    console.log("✅ Message created:", {
      id: populated._id.toString(),
      sender: populated.sender.email,
      content:
        populated.content.substring(0, 50) +
        (populated.content.length > 50 ? "..." : ""),
    });

    // Kirim ke semua client SSE
    sendToClients(populated);

    return NextResponse.json({ success: true, message: populated });
  } catch (error) {
    console.error("❌ POST ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengirim pesan" },
      { status: 500 }
    );
  }
}
