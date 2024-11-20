import { createPoll as makePoll, getPollById as fetchPollbyId, updatePollCount as putupdatePollCount} from "../models/Poll.model.js";
import {sendVoteMessage} from "../kafka/producer.kafka.js";

export const createPoll = async (req, res) => {
  const { question, options } = req.body;
  const poll = await makePoll(question, options);
  res.json(poll);
};

export const vote = async (req, res) => {
  const pollId = req.params.id;
  const { optionId } = req.body;
  sendVoteMessage({ pollId, optionId });
  await putupdatePollCount(pollId, optionId);
  const updatedPoll = await fetchPollbyid(pollId);
  res.json(updatedPoll);
};

export const getPollResults = async (req, res) => {
  const pollId = req.params.id;
  const poll = await fetchPollbyId(pollId);
  res.json(poll);
};
