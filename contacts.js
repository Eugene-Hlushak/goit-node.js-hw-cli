const path = require("path");
const fs = require("fs/promises");
const nanoid = import("nanoid");

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

const generateNewId = async () => (await nanoid).nanoid();

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
    console.log(`Contact ${deleted.name} was succesfully deleted! `);
    await writeFile(contactsPath, newContactsList);
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const allContacts = await getAllContacts();
    const check = allContacts.find(
      (contact) =>
        contact.name === name ||
        contact.email === email ||
        contact.phone === phone
    );
    if (check) {
      console.log("There is already exist the same contact");
      return console.table(allContacts);
    }
    const newContactsList = [
      ...allContacts,
      { id: await generateNewId(), name, email, phone },
    ];

    console.log(`Succsessfully added new contact ${name}`);
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
