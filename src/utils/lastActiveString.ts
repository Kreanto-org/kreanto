export const useLastActiveString = (lastActive: Date | undefined) => {
  if (!lastActive) return "";

  const diff = new Date().getTime() - lastActive.getTime();

  // < 5 minutes
  if (diff < 5 * 60 * 1000) return "Active now";

  if (diff < 60 * 60 * 1000) return "Active less than 1 hour ago";

  const hours_diff = Math.floor(diff / (60 * 1000));

  if (hours_diff < 24) return `Active today`;

  const days_diff = Math.floor(hours_diff / 24);

  if (days_diff === 1) return "Last active yesterday";
  if (days_diff < 7) return "Last active this week";

  return "Last active more than a week ago";
};
