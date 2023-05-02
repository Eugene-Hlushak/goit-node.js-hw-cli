const fs = require("fs/promises");
const nanoid = import("nanoid");

const getAllContacts = async (path) => {
  const buffer = await fs.readFile(path, "utf-8");
  return JSON.parse(buffer);
};

const writeFile = async (path, data) => {
  await fs.writeFile(path, JSON.stringify(data));
  const newList = await getAllContacts(path);
  console.table(newList);
};

const generateNewId = async () => (await nanoid).nanoid();

const sorryLog = (contactId) =>
  console.log(`Sorry, no contact found with this id '${contactId}'`);

module.exports = {
  getAllContacts,
  writeFile,
  generateNewId,
  sorryLog,
};
