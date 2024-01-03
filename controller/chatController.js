import { chat } from "../models/chatModel.js";
import { User } from "../models/userModel.js";
export const chatAccessController = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await chat
    .find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.User._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.User._id, userId],
    };

    try {
      const createdChat = await chat.create(chatData);
      const FullChat = await chat
        .findOne({ _id: createdChat._id })
        .populate("users", "-password");
      res.status(200).send({
        success: true,
        message: "chat created successfully",
        FullChat,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: "error in create chat",
        error,
      });
    }
  }
};

export const fetchChatcontroller = async (req, res) => {
  try {
    await chat
      .find({ users: { $elemMatch: { $eq: req.User._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "sdfg",
      error,
    });
  }
};
