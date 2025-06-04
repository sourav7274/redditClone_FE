
const MessageList = ({ messages, user }) => {
  console.log(user)
  return (
    user.name && (
      <div>
        <p>Currently chating with {user.name}</p>
        {messages.map((msg, index) => {
          return (
            <div className="bg-gray-600 flex-col" key={index}>
              <strong>{msg.sender}:</strong> {msg.message}
            </div>
          );
        })}
      </div>
    )
  );
};

export default MessageList;
