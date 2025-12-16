import { Types } from "mongoose";

export interface User {
  _id: string | Types.ObjectId;
  name: string;
  email: string;
  avatar?: string;
  provider: "google" | "github";
  isOnline: boolean;
  lastSeen: Date;
  createdAt: Date;
}

export interface Message {
  _id: string | Types.ObjectId;
  sender: User;
  content: string;
  readBy: string[];
  replyTo?: Message;
  isEdited: boolean;
  editedAt?: Date;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface SocketMessage {
  type: "message:new" | "message:updated" | "message:deleted";
  data: Message;
}

export interface OnlineUser {
  userId: string;
  name: string;
  avatar?: string;
  socketId: string;
}

export interface TypingUser {
  userId: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
