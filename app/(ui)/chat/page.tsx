"use client";

import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Theme,
  Text
} from "@radix-ui/themes";
import { motion, AnimatePresence } from "framer-motion";
import LoginPrompt from "@/components/chat/auth/LoginPrompt";
import Sidebar from "@/components/chat/Sidebar";
import MemberList from "@/components/chat/MemberList";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatMessages from "@/components/chat/ChatMessages";
import MobileHeader from "@/components/chat/MobileHeader";


interface Message {
  id: number;
  content: string;
  sender: string;
  time: string;
  isOwn: boolean;
}

// Mock data
const mockUsers = [
  { id: 1, name: "Ahmad Rizki", isOnline: true, lastSeen: "now" },
  { id: 2, name: "Budi Santoso", isOnline: true, lastSeen: "2 min ago" },
  { id: 3, name: "Citra Lestari", isOnline: false, lastSeen: "1 hour ago" },
  { id: 4, name: "Dewi Anggraini", isOnline: true, lastSeen: "now" },
  { id: 5, name: "Eko Pratama", isOnline: false, lastSeen: "3 hours ago" },
];

const mockRooms = [
  { id: 1, name: "General", members: 8, isActive: true, unread: 0 },
  { id: 2, name: "Random", members: 5, isActive: true, unread: 3 },
  { id: 3, name: "Tech Talk", members: 12, isActive: false, unread: 0 },
  { id: 4, name: "Project Alpha", members: 6, isActive: true, unread: 15 },
];

export default function ChatGroupPage() {
  const { user, isLoading, logout } = useAuth();
  const [activeRoom, setActiveRoom] = useState(1);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showMemberList, setShowMemberList] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const onlineCount = mockUsers.filter(u => u.isOnline).length;

  // Deteksi ukuran layar
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setShowSidebar(false);
        setShowMemberList(false);
      } else {
        setShowSidebar(true);
        setShowMemberList(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSendMessage = (messageContent: string) => {
    if (messageContent.trim() && user) {
      const newMessage = {
        id: Date.now(),
        content: messageContent,
        sender: user.name,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };
      setMessages([...messages, newMessage]);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const activeRoomData = mockRooms.find(room => room.id === activeRoom);

  if (isLoading) {
    return (
      <Flex align="center" justify="center" style={{ height: '100vh' }}>
        <Text>Loading...</Text>
      </Flex>
    );
  }

  if (!user) {
    return <LoginPrompt />;
  }

  return (
    <Theme
      accentColor="violet"
      grayColor="gray"
      panelBackground="solid"
      scaling="100%"
      radius="medium"
    >
      <div style={{
        height: '100vh',
        backgroundColor: 'var(--gray-1)',
        overflow: 'hidden'
      }}>
        {/* Mobile Header */}
        {isMobile && (
          <MobileHeader
            user={user}
            onToggleSidebar={() => setShowSidebar(!showSidebar)}
            onToggleMemberList={() => setShowMemberList(!showMemberList)}
            showMemberList={showMemberList}
          />
        )}

        <Flex style={{
          height: '100%',
          paddingTop: isMobile ? '60px' : '0',

        }}>
          {/* Sidebar Kiri - Overlay di Mobile */}
          <AnimatePresence>
            {(showSidebar || !isMobile) && (
              <motion.div
                initial={isMobile ? { x: -280 } : false}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: isMobile ? 'fixed' : 'relative',
                  left: 0,
                  top: isMobile ? '60px' : 0,
                  bottom: 0,
                  zIndex: 40,
                  width: isMobile ? '280px' : '280px',
                  height: isMobile ? 'calc(100vh - 60px)' : '100%',
                  backgroundColor: isMobile ? 'var(--gray-1)' : 'transparent',
                  boxShadow: isMobile ? 'var(--shadow-4)' : 'none',

                  // background: 'var(--red-8)',
                }}
              >
                <Sidebar
                  user={user}
                  rooms={mockRooms}
                  activeRoom={activeRoom}
                  onRoomSelect={setActiveRoom}
                  isMobile={isMobile}
                  onClose={() => setShowSidebar(false)}
                  onLogout={handleLogout}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Overlay untuk mobile sidebar */}
          {isMobile && showSidebar && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                top: '60px',
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 30
              }}
              onClick={() => setShowSidebar(false)}
            />
          )}

          {/* Area Chat Utama */}
          <Box style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            marginLeft: 8,
          }}>
            {/* Header Chat Room */}
            {activeRoomData && (
              <ChatHeader
                roomName={activeRoomData.name}
                totalMembers={activeRoomData.members}
                onlineCount={onlineCount}
                showMemberList={showMemberList}
                isMobile={isMobile}
                onToggleMemberList={() => setShowMemberList(!showMemberList)}
                onToggleSidebar={() => setShowSidebar(true)}
              />
            )}

            {/* Area Chat */}
            <Flex style={{ flex: 1, overflow: 'hidden' }}>
              {/* Messages Area */}
              <ChatMessages
                messages={messages}
                onSendMessage={handleSendMessage}
                isMobile={isMobile}
              />

              {/* Member List Sidebar */}
              <AnimatePresence>
                {showMemberList && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: isMobile ? '100%' : 250, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: isMobile ? 'fixed' : 'relative',
                      top: isMobile ? '60px' : 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 40,
                      width: isMobile ? '100%' : '250px',
                      height: isMobile ? 'calc(100vh - 60px)' : '100%',
                      marginTop: 8
                    }}
                  >
                    <MemberList
                      users={mockUsers}
                      onlineCount={onlineCount}
                      isMobile={isMobile}
                      onClose={() => setShowMemberList(false)}
                      onShowSidebar={() => setShowSidebar(true)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Overlay untuk mobile member list */}
              {isMobile && showMemberList && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: 'fixed',
                    top: '60px',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    zIndex: 30
                  }}
                  onClick={() => setShowMemberList(false)}
                />
              )}
            </Flex>
          </Box>
        </Flex>
      </div>
    </Theme>
  );
}