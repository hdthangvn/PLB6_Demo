import React, { useState, useEffect } from 'react';
import StoreLayout from '../../layouts/StoreLayout';
import { useStoreContext } from '../../context/StoreContext';
import StoreStatusGuard from '../../components/store/StoreStatusGuard';

const StoreChats = () => {
  const { currentStore } = useStoreContext();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentStore) {
      fetchChats();
    }
  }, [currentStore]);

  const fetchChats = async () => {
    try {
      setLoading(true);
      // Mock data cho danh sách chat - phân biệt theo chi nhánh
      const getMockChatsByBranch = (branchId) => {
        if (branchId === 'branch-1') {
          // Chi nhánh Hải Châu - Chuyên điện thoại cao cấp
          return [
            {
              id: 'chat-001',
              customerName: 'Nguyễn Minh Tuấn',
              customerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
              lastMessage: 'Khi nào có hàng lại iPhone 15 Pro Max?',
              lastMessageTime: '2024-01-21T10:30:00Z',
              unreadCount: 2,
              status: 'online'
            },
            {
              id: 'chat-002',
              customerName: 'Trần Thị Lan',
              customerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
              lastMessage: 'AirPods Pro 2 có màu nào khác không?',
              lastMessageTime: '2024-01-21T09:15:00Z',
              unreadCount: 0,
              status: 'offline'
            },
            {
              id: 'chat-003',
              customerName: 'Lê Văn Đức',
              customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
              lastMessage: 'Samsung Galaxy S24 Ultra có bảo hành bao lâu?',
              lastMessageTime: '2024-01-21T08:45:00Z',
              unreadCount: 1,
              status: 'online'
            },
          ];
        }
        
        if (branchId === 'branch-2') {
          // Chi nhánh Thanh Khê - Chuyên laptop gaming và văn phòng
          return [
            {
              id: 'chat-001',
              customerName: 'Phạm Văn Hùng',
              customerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
              lastMessage: 'MacBook Pro M3 có thể nâng cấp RAM không?',
              lastMessageTime: '2024-01-21T10:30:00Z',
              unreadCount: 3,
              status: 'online'
            },
            {
              id: 'chat-002',
              customerName: 'Nguyễn Thị Mai',
              customerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
              lastMessage: 'ASUS ROG Strix G15 có phù hợp cho học tập không?',
              lastMessageTime: '2024-01-21T09:15:00Z',
              unreadCount: 0,
              status: 'offline'
            },
            {
              id: 'chat-003',
              customerName: 'Hoàng Văn Nam',
              customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
              lastMessage: 'Logitech MX Master 3S có thể dùng cho Mac không?',
              lastMessageTime: '2024-01-21T08:45:00Z',
              unreadCount: 1,
              status: 'online'
            },
          ];
        }
        
        return [];
      };
      
      const mockChats = getMockChatsByBranch(currentStore?.id) || [
        {
          id: 'chat-001',
          customerName: 'Nguyễn Văn A',
          customerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
          lastMessage: 'Khi nào có hàng lại iPhone 14 Pro?',
          lastMessageTime: '2024-01-21T10:30:00Z',
          unreadCount: 2,
          status: 'online'
        },
        {
          id: 'chat-002',
          customerName: 'Trần Thị B',
          customerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
          lastMessage: 'Cảm ơn shop, sản phẩm rất tốt!',
          lastMessageTime: '2024-01-21T09:15:00Z',
          unreadCount: 0,
          status: 'offline'
        },
        {
          id: 'chat-003',
          customerName: 'Lê Văn C',
          customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
          lastMessage: 'Có ship đến quận 7 không?',
          lastMessageTime: '2024-01-21T08:45:00Z',
          unreadCount: 1,
          status: 'online'
        },
        {
          id: 'chat-004',
          customerName: 'Phạm Thị D',
          customerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
          lastMessage: 'Sản phẩm có bảo hành không?',
          lastMessageTime: '2024-01-20T16:30:00Z',
          unreadCount: 0,
          status: 'offline'
        },
        {
          id: 'chat-005',
          customerName: 'Hoàng Văn E',
          customerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
          lastMessage: 'Giá có thể giảm thêm không?',
          lastMessageTime: '2024-01-20T14:20:00Z',
          unreadCount: 3,
          status: 'online'
        }
      ];
      setChats(mockChats);
    } catch (error) {
      console.error('Error fetching chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (chatId) => {
    try {
      // Mock data cho tin nhắn
      const mockMessages = {
        'chat-001': [
          {
            id: 'msg-001',
            sender: 'customer',
            content: 'Chào shop, tôi muốn hỏi về iPhone 14 Pro',
            timestamp: '2024-01-21T10:00:00Z'
          },
          {
            id: 'msg-002',
            sender: 'store',
            content: 'Chào bạn! Shop có iPhone 14 Pro 128GB và 256GB. Bạn quan tâm dung lượng nào?',
            timestamp: '2024-01-21T10:05:00Z'
          },
          {
            id: 'msg-003',
            sender: 'customer',
            content: 'Tôi muốn 256GB. Giá bao nhiêu?',
            timestamp: '2024-01-21T10:10:00Z'
          },
          {
            id: 'msg-004',
            sender: 'store',
            content: 'iPhone 14 Pro 256GB giá 28.000.000đ. Shop đang có chương trình giảm giá 1.000.000đ',
            timestamp: '2024-01-21T10:12:00Z'
          },
          {
            id: 'msg-005',
            sender: 'customer',
            content: 'Khi nào có hàng lại iPhone 14 Pro?',
            timestamp: '2024-01-21T10:30:00Z'
          }
        ],
        'chat-002': [
          {
            id: 'msg-006',
            sender: 'customer',
            content: 'Shop ơi, tôi đã nhận được MacBook Air M2 rồi',
            timestamp: '2024-01-21T09:00:00Z'
          },
          {
            id: 'msg-007',
            sender: 'store',
            content: 'Cảm ơn bạn đã mua hàng! Bạn có hài lòng với sản phẩm không?',
            timestamp: '2024-01-21T09:05:00Z'
          },
          {
            id: 'msg-008',
            sender: 'customer',
            content: 'Cảm ơn shop, sản phẩm rất tốt!',
            timestamp: '2024-01-21T09:15:00Z'
          }
        ]
      };
      setMessages(mockMessages[chatId] || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    fetchMessages(chat.id);
    // Đánh dấu đã đọc
    setChats(prev => prev.map(c => 
      c.id === chat.id ? { ...c, unreadCount: 0 } : c
    ));
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const message = {
        id: `msg-${Date.now()}`,
        sender: 'store',
        content: newMessage.trim(),
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('vi-VN');
  };

  if (!currentStore) {
    return (
      <StoreLayout>
        <StoreStatusGuard currentStore={currentStore} pageName="chat" noSidebar={true} />
      </StoreLayout>
    );
  }

  return (
    <StoreLayout>
      <StoreStatusGuard currentStore={currentStore} pageName="chat" noSidebar={true}>
        <div className="space-y-6">
          {/* Header */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-cyan-200 to-blue-200 rounded-2xl p-6">
              <div className="relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-xl flex items-center justify-center">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                      </svg>
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold">
                        <span className="text-cyan-600">Tin nhắn</span> <span className="text-blue-600">khách hàng</span>
                      </h1>
                      <p className="text-gray-600 mt-1">Quản lý tin nhắn và hỗ trợ khách hàng</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-600">
                      <span className="text-green-600 font-medium">{chats.filter(c => c.status === 'online').length}</span> đang online
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="text-blue-600 font-medium">{chats.filter(c => c.unreadCount > 0).length}</span> tin nhắn chưa đọc
                    </div>
                  </div>
                </div>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Tổng cuộc trò chuyện</p>
                        <p className="text-xl font-bold text-gray-900">{chats.length}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Đang online</p>
                        <p className="text-xl font-bold text-gray-900">{chats.filter(c => c.status === 'online').length}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Tin nhắn chưa đọc</p>
                        <p className="text-xl font-bold text-gray-900">{chats.reduce((sum, c) => sum + c.unreadCount, 0)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Đã giải quyết</p>
                        <p className="text-xl font-bold text-gray-900">{chats.filter(c => c.status === 'resolved').length}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[600px] flex">
            {/* Chat List */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Danh sách chat</h3>
              </div>
              <div className="flex-1 overflow-y-auto">
                {loading ? (
                  <div className="p-4 text-center text-gray-500">Đang tải...</div>
                ) : (
                  <div className="space-y-1">
                    {chats.map((chat) => (
                      <div
                        key={chat.id}
                        onClick={() => handleChatSelect(chat)}
                        className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedChat?.id === chat.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img
                              src={chat.customerAvatar}
                              alt={chat.customerName}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                              chat.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                            }`}></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-900 truncate">{chat.customerName}</h4>
                              <span className="text-xs text-gray-500">{formatTime(chat.lastMessageTime)}</span>
                            </div>
                            <p className="text-sm text-gray-600 truncate mt-1">{chat.lastMessage}</p>
                            {chat.unreadCount > 0 && (
                              <div className="flex justify-end mt-1">
                                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                                  {chat.unreadCount}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 flex flex-col">
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedChat.customerAvatar}
                        alt={selectedChat.customerName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">{selectedChat.customerName}</h4>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            selectedChat.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                          }`}></div>
                          <span className="text-sm text-gray-600">
                            {selectedChat.status === 'online' ? 'Đang online' : 'Offline'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'store' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === 'store'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-900'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === 'store' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Nhập tin nhắn..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                      >
                        Gửi
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                    <h3 className="text-lg font-medium mb-2">Chọn một cuộc trò chuyện</h3>
                    <p className="text-sm">Chọn khách hàng để bắt đầu trò chuyện</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </StoreStatusGuard>
    </StoreLayout>
  );
};

export default StoreChats;

