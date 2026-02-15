const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const cors = require("cors");
const { error } = require("console");

const app = express();
const PORT = 4000;
const DATA_FILE = path.join(__dirname, "chats.json");
const formatDate = (date = new Date()) => {
  const formatNumber = (number) => (number + "").padStart(2, "0");

  const res = `${formatNumber(date.getMonth() + 1)}.${formatNumber(date.getDate())}, ${formatNumber(date.getHours())}:${formatNumber(date.getMinutes())}`;

  return res;
};

app.use(cors());
app.use(express.json());

app.post("/chats", async (req, res) => {
  try {
    const chatData = req.body;

    let chats = [];

    try {
      chats = JSON.parse(await fs.readFile(DATA_FILE, "utf8"));
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }

    const newChat = { ...chatData };

    chats.push(newChat);

    await fs.writeFile(DATA_FILE, JSON.stringify(chats, null, 2), "utf8");

    res.json({
      id: newChat.id,
    });
  } catch (error) {
    res.status(500).json({ error: "Сервер: Ошибка создания нового чата" });
  }
});

app.get("/chats", async (req, res) => {
  try {
    const chats = JSON.parse(await fs.readFile(DATA_FILE, "utf8"));

    res.json(chats);
  } catch (error) {
    res.json([]);
  }
});

app.post("/chats/:id/messages", async (req, res) => {
  try {
    const { id } = req.params;
    const { message, userId } = req.body;

    const chats = JSON.parse(await fs.readFile(DATA_FILE, "utf8"));

    const chatIndex = chats.findIndex((chat) => chat.id === id);

    if (chatIndex === -1) {
      return res.status(404).json({ error: "Сервер: Чат не найден" });
    }

    const newMessage = {
      userId: userId,
      message: message,
      time: formatDate(),
    };

    chats[chatIndex].messages = chats[chatIndex].messages || [];
    chats[chatIndex].messages.push(newMessage);

    await fs.writeFile(DATA_FILE, JSON.stringify(chats, null, 2), "utf8");

    res.json({
      newMessage: newMessage,
    });
  } catch (error) {
    res.status(500).json({ error: "Сервер: Ошибка создания нового сообщения" });
  }
});

app.delete("/chats/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const chats = JSON.parse(await fs.readFile(DATA_FILE, "utf8"));

    const filteredChats = chats.filter((chat) => chat.id !== id);

    if (filteredChats.length === chats.length) {
      return res.status(404).json(404);
    }

    await fs.writeFile(
      DATA_FILE,
      JSON.stringify(filteredChats, null, 2),
      "utf8",
    );

    res.json({
      deletedChatId: id,
    });
  } catch (error) {
    res.status(500).json({ error: "Сервер: Ошибка удаления чата" });
  }
});

app.delete("/chats/:id/participants/:userId", async (req, res) => {
  try {
    const { id, userId } = req.params;
    const deletedUserId = parseInt(userId);

    const chats = JSON.parse(await fs.readFile(DATA_FILE, "utf8"));
    const chatIndex = chats.findIndex((chat) => chat.id === id);

    if (chatIndex === -1) {
      return res
        .status(404)
        .json({ error: "Сервер: При удалении пользователя не был найден чат" });
    }

    const chat = chats[chatIndex];
    const initialLength = chat.participants.length;

    chat.participants = chat.participants.filter(
      (participant) => participant.id !== deletedUserId,
    );

    if (initialLength === chat.participants.length) {
      return res
        .status(404)
        .json({ error: "Сервер: Не найден пользователь в чате" });
    }

    if (chat.participants.length === 0) {
      chats.splice(chatIndex, 1);
    }

    await fs.writeFile(DATA_FILE, JSON.stringify(chats, null, 2), "utf8");

    res.json({
      deletedUserId: deletedUserId,
      chats: chats,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Сервер: Ошибка удаления пользователя" });
  }
});

app.post("/chats/:id/participants", async (req, res) => {
  try {
    const { id } = req.params;
    const { selectedUsers } = req.body;

    const chats = JSON.parse(await fs.readFile(DATA_FILE, "utf8"));
    const chatIndex = chats.findIndex((chat) => chat.id === id);

    if (chatIndex === -1) {
      return res.status(404).json({ error: "Сервер: Чат не найден" });
    }

    const chat = chats[chatIndex];

    const newParticipants = selectedUsers.map((user) => ({
      id: user.id,
      username: user.username,
      isAdmin: false,
    }));

    chat.participants = [...chat.participants, ...newParticipants];

    await fs.writeFile(DATA_FILE, JSON.stringify(chats, null, 2), "utf8");

    res.json(chat.participants);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Сервер: Ошибка при добавлении новых участников" });
  }
});

app.listen(PORT, () => {
  console.log("Сервер запущен");
});
