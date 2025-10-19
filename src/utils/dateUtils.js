export const formatPostDate = (dateString) => {
  const postDate = new Date(dateString);
  const now = new Date();
  
  // Get the start of today and yesterday
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  // Get the start of the post date
  const postDateStart = new Date(postDate.getFullYear(), postDate.getMonth(), postDate.getDate());
  
  // Format time in 12-hour format with AM/PM
  const timeOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };
  const timeString = postDate.toLocaleTimeString('en-US', timeOptions);
  
  // Check if it's today
  if (postDateStart.getTime() === today.getTime()) {
    return `Today ${timeString}`;
  }
  
  // Check if it's yesterday
  if (postDateStart.getTime() === yesterday.getTime()) {
    return `Yesterday ${timeString}`;
  }
  
  // For older dates, show the date and time
  const dateOptions = {
    month: 'short',
    day: 'numeric',
    year: postDate.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  };
  const formattedDate = postDate.toLocaleDateString('en-US', dateOptions);
  
  return `${formattedDate} ${timeString}`;
};