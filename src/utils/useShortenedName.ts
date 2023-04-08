export const useShortenedName = (name: string) => {
  const names = name?.split(" ");

  if (!name || !names || !names[0]) return name;

  const first = names[0];
  const last = names[1] ? ` ${names[1][0]}.` : "";

  return first + last;
};
