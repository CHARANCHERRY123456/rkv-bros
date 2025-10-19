export default function ChatArea({ activeGroup, isMobile }) {
  if (isMobile) return null;

  return (
    <div className="flex-1 h-full flex flex-col">
      {activeGroup ? (
        <iframe
          title="Chat"
          src={`/chat/${activeGroup}`}
          className="w-full h-full border-0"
          style={{ minHeight: "100%", minWidth: "100%" }}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400 text-xl">
          Select a group to start chatting
        </div>
      )}
    </div>
  );
}
