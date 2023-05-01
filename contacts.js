const path = require("path");
const fs = require("fs/promises");

const base = path.basename("contacts.json");
const dir = path.dirname("./db/contacts.json");

const contactsPath = path.format({
  dir,
  base,
});

const getAllContacts = async () => {
  const buffer = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(buffer);
};

const writeFile = async (path, file) => {
  await fs.writeFile(path, JSON.stringify(file));
  const newList = await getAllContacts();
  console.table(newList);
};

const sorryLog = (contactId) =>
  console.log(`Sorry, no contact found with this id '${contactId}'`);

async function listContacts() {
  try {
    const allContacts = await getAllContacts();
    console.table(allContacts);
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const allContacts = await getAllContacts();
    const getContact = allContacts.find((contact) => contact.id === contactId);
    if (!getContact) return sorryLog(contactId);
    console.table(getContact);
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const allContacts = await getAllContacts();
    const deleted = allContacts.find((contact) => contact.id === contactId);
    if (!deleted) return sorryLog(contactId);
    const newContactsList = allContacts.filter(
      (contact) => contact.id !== contactId
    );
    await writeFile(contactsPath, newContactsList);
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const allContacts = await getAllContacts();
    const newContactsList = [...allContacts, { name, email, phone }];
    await writeFile(contactsPath, newContactsList);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
