type User = {
  id: string;
  name: string;
  room: string;
};

const users: User[] = [];

export const addUser = ({ id, name, room }: User) => {
  name = name?.trim().toLowerCase();
  room = room?.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (existingUser) return { error: "Username already taken" };

  const user = { id, name, room };
  users.push(user);

  return { user };
};

export const removeUser = (id: string) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return { success: users.splice(index, 1)[0] };
  }

  return { error: "User not Found" };
};

export const getUser = (id: string) => {
  console.log(id)
  return users.find((user) => {
    return user.id === id;
  });
};

export const getUsersInRoom = (room: string) =>
  users.filter((user) => user.room === room);
