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

const writeFile = async (path, file) =>
  await fs.writeFile(path, JSON.stringify(file));

async function listContacts() {
  const allContacts = await getAllContacts();
  console.table(allContacts);
}

async function getContactById(contactId) {
  const allContacts = await getAllContacts();
  const getContact = allContacts.find((contact) => contact.id === contactId);
  console.table(getContact);
}

async function removeContact(contactId) {
  const allContacts = await getAllContacts();
  const newContactsList = allContacts.filter(
    (contact) => contact.id !== contactId
  );
  await writeFile(contactsPath, newContactsList);
  const newList = await getAllContacts();
  console.table(newList);
}

async function addContact(name, email, phone) {
  const allContacts = await getAllContacts();
  const newContactsList = [...allContacts, { name, email, phone }];
  await writeFile(contactsPath, newContactsList);
  const newList = await getAllContacts();
  console.table(newList);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
