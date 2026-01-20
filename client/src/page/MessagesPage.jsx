import { useState, useEffect, useRef } from "react";
import { NavBar, Footer } from "@/components/WebSection";
import { useAuth } from "@/contexts/authentication";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Send, ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function MessagesPage() {
    const { state } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [conversations, setConversations] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [otherUserTyping, setOtherUserTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    useEffect(() => {
        if (!state.user) {
            navigate("/login");
            return;
        }
        fetchConversations();

        // Check if there's a userId in URL params
        const userId = searchParams.get("userId");
        if (userId) {
            fetchUserAndMessages(userId);
        } else {
            // If no userId in URL, clear selected user
            setSelectedUser(null);
        }

        // Poll for new messages every 2 seconds
        const interval = setInterval(() => {
            if (selectedUser) {
                fetchMessages(selectedUser.id, true);
                checkTypingStatus(selectedUser.id);
            }
            fetchConversations();
        }, 2000);

        return () => clearInterval(interval);
    }, [state.user, navigate, selectedUser, searchParams]);

    const checkTypingStatus = async (userId) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/messages/typing/${userId}`
            );
            setOtherUserTyping(response.data.isTyping);
        } catch (error) {
            console.error("Error checking typing status:", error);
        }
    };

    const sendTypingStatus = async () => {
        if (!selectedUser) return;

        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/messages/typing`,
                { receiverId: selectedUser.id }
            );
        } catch (error) {
            console.error("Error sending typing status:", error);
        }
    };

    const handleTyping = () => {
        sendTypingStatus();

        // Clear existing timeout
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        // Set new timeout to send typing status again
        typingTimeoutRef.current = setTimeout(() => {
            sendTypingStatus();
        }, 1000);
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchConversations = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/messages/conversations`
            );
            setConversations(response.data);
        } catch (error) {
            console.error("Error fetching conversations:", error);
        }
    };

    const fetchUserAndMessages = async (userId) => {
        try {
            const userResponse = await axios.get(
                `${import.meta.env.VITE_API_URL}/profile/${userId}`
            );
            setSelectedUser(userResponse.data);
            await fetchMessages(userId);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const fetchMessages = async (userId, silent = false) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/messages/${userId}`
            );
            const prevLength = messages.length;
            setMessages(response.data);

            // Auto scroll only if new message arrived
            if (!silent && response.data.length > prevLength) {
                setTimeout(scrollToBottom, 100);
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const handleSelectConversation = (user) => {
        setSelectedUser(user);
        setOtherUserTyping(false);
        fetchMessages(user.id);
        // Update URL with userId param
        navigate(`/messages?userId=${user.id}`, { replace: true });
        // Refresh conversations immediately
        fetchConversations();
        // Refresh again after 500ms to ensure database is updated
        setTimeout(() => {
            fetchConversations();
        }, 500);
    };

    const handleBackToConversations = () => {
        setSelectedUser(null);
        setOtherUserTyping(false);
        // Clear URL params
        navigate('/messages', { replace: true });
    };

    const handleSendMessage = async (e) => {
        e?.preventDefault();
        if (!newMessage.trim() || !selectedUser || isLoading) return;

        const messageToSend = newMessage;
        setNewMessage("");
        setIsLoading(true);

        try {
            // Encrypt message
            const encoder = new TextEncoder();
            const data = encoder.encode(messageToSend);
            const encryptedMessage = btoa(String.fromCharCode(...data));

            // Optimistic update - add message immediately
            const tempMessage = {
                id: Date.now(),
                sender_id: state.user.id,
                receiver_id: selectedUser.id,
                message: encryptedMessage,
                is_read: false,
                created_at: new Date().toISOString(),
            };
            setMessages(prev => [...prev, tempMessage]);
            setTimeout(scrollToBottom, 100);

            await axios.post(`${import.meta.env.VITE_API_URL}/messages`, {
                receiverId: selectedUser.id,
                message: encryptedMessage,
            });

            // Fetch to get real message with ID
            await fetchMessages(selectedUser.id, true);
            await fetchConversations();
        } catch (error) {
            console.error("Error sending message:", error);
            setNewMessage(messageToSend); // Restore message on error
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const decryptMessage = (encryptedMessage) => {
        try {
            const decoded = atob(encryptedMessage);
            return new TextDecoder().decode(
                new Uint8Array([...decoded].map(char => char.charCodeAt(0)))
            );
        } catch {
            return encryptedMessage; // Return original if decryption fails
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <Helmet>
                <title>Messages - Wannasin Blog</title>
            </Helmet>
            <div className="hidden sm:block">
                <NavBar />
            </div>
            <div className="flex-1 bg-gray-50 overflow-hidden">
                <div className="max-w-7xl mx-auto h-full sm:px-4 sm:py-8">
                    <div className="bg-white sm:rounded-lg sm:shadow-md h-full sm:h-[600px] flex flex-col md:flex-row overflow-hidden">
                        {/* Conversations List */}
                        <div className={`${selectedUser ? 'hidden md:block' : 'block'} w-full md:w-1/3 border-r border-gray-200 overflow-y-auto flex-shrink-0`}>
                            <div className="p-3 sm:p-4 border-b border-gray-200 sticky top-0 bg-white z-10 flex items-center gap-3">
                                <button
                                    onClick={() => navigate(-1)}
                                    className="sm:hidden p-2 hover:bg-gray-100 rounded-full active:bg-gray-200 transition-colors"
                                    title="Back"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                                <h2 className="text-lg sm:text-xl font-bold">Messages</h2>
                            </div>
                            {conversations.length === 0 ? (
                                <div className="p-4 text-center text-muted-foreground">
                                    No conversations yet
                                </div>
                            ) : (
                                conversations.map((conv) => (
                                    <div
                                        key={conv.user.id}
                                        onClick={() => handleSelectConversation(conv.user)}
                                        className={`p-3 sm:p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors ${selectedUser?.id === conv.user.id ? "bg-gray-100" : ""
                                            }`}
                                    >
                                        <div className="flex items-center space-x-2 sm:space-x-3">
                                            <img
                                                src={conv.user.profile_pic}
                                                alt={conv.user.name}
                                                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-baseline gap-2">
                                                    <h3 className="font-semibold truncate text-sm sm:text-base">
                                                        {conv.user.name}
                                                    </h3>
                                                    {conv.unreadCount > 0 && (
                                                        <span className="bg-green-500 text-white text-xs rounded-full px-2 py-0.5 flex-shrink-0 min-w-[1.5rem] text-center">
                                                            {conv.unreadCount}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs sm:text-sm text-gray-500 truncate mt-0.5">
                                                    {decryptMessage(conv.lastMessage)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Messages Area */}
                        <div className={`${selectedUser ? 'flex' : 'hidden md:flex'} flex-1 flex-col min-w-0`}>
                            {selectedUser ? (
                                <>
                                    {/* Header */}
                                    <div className="p-3 sm:p-4 border-b border-gray-200 flex items-center space-x-2 sm:space-x-3">
                                        <button
                                            onClick={handleBackToConversations}
                                            className="p-2 hover:bg-gray-100 rounded-full active:bg-gray-200 transition-colors"
                                            title="Back to conversations"
                                        >
                                            <ArrowLeft className="w-5 h-5" />
                                        </button>
                                        <img
                                            src={selectedUser.profile_pic}
                                            alt={selectedUser.name}
                                            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-sm sm:text-base truncate">{selectedUser.name}</h3>
                                            {otherUserTyping && (
                                                <p className="text-xs text-gray-500">typing...</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Messages */}
                                    <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
                                        {messages.map((msg, index) => {
                                            const isSentByMe = msg.sender_id === state.user.id;
                                            const isLastMessage = index === messages.length - 1;
                                            const showReadStatus = isSentByMe && isLastMessage && msg.is_read;

                                            // Debug log
                                            if (isLastMessage && isSentByMe) {
                                                console.log('Last message:', {
                                                    id: msg.id,
                                                    isSentByMe,
                                                    is_read: msg.is_read,
                                                    showReadStatus
                                                });
                                            }

                                            return (
                                                <div
                                                    key={msg.id}
                                                    className={`flex ${isSentByMe ? "justify-end" : "justify-start"}`}
                                                >
                                                    <div className="flex flex-col max-w-[85%] sm:max-w-[75%]">
                                                        <div
                                                            className={`rounded-2xl px-3 sm:px-4 py-2 break-words ${isSentByMe
                                                                ? "bg-foreground text-white"
                                                                : "bg-gray-200 text-foreground"
                                                                }`}
                                                        >
                                                            <p className="text-sm sm:text-base">{decryptMessage(msg.message)}</p>
                                                            <p className="text-xs mt-1 opacity-70">
                                                                {new Date(msg.created_at).toLocaleTimeString("en-GB", {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                })}
                                                            </p>
                                                        </div>
                                                        {showReadStatus && (
                                                            <p className="text-xs text-gray-500 mt-1 text-right">
                                                                อ่านแล้ว
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        {otherUserTyping && (
                                            <div className="flex justify-start">
                                                <div className="bg-gray-200 rounded-2xl px-4 py-3">
                                                    <div className="flex space-x-1">
                                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </div>

                                    {/* Input */}
                                    <form
                                        onSubmit={handleSendMessage}
                                        className="p-3 sm:p-4 border-t border-gray-200"
                                    >
                                        <div className="flex space-x-2">
                                            <input
                                                type="text"
                                                value={newMessage}
                                                onChange={(e) => {
                                                    setNewMessage(e.target.value);
                                                    handleTyping();
                                                }}
                                                onKeyDown={handleKeyDown}
                                                placeholder="Type a message..."
                                                className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-full focus:outline-none focus:border-foreground"
                                            />
                                            <button
                                                type="submit"
                                                disabled={isLoading || !newMessage.trim()}
                                                className="bg-foreground text-white p-2.5 sm:p-3 rounded-full hover:bg-muted-foreground active:bg-muted-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                                            >
                                                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </button>
                                        </div>
                                    </form>
                                </>
                            ) : (
                                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                                    Select a conversation to start messaging
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden sm:block">
                <Footer />
            </div>
        </div>
    );
}
