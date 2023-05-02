const path = require("path");
const {
  getAllContacts,
  writeFile,
  generateNewId,
  sorryLog,
} = require("./services/services.js");

const base = path.basename("contacts.json");
const dir = path.dirname("./db/contacts.json");

const contactsPath = path.format({
  dir,
  base,
});

async function listContacts() {
  try {
    const allContacts = await getAllContacts(contactsPath);
    console.table(allContacts);
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const allContacts = await getAllContacts(contactsPath);
    const getContact = allContacts.find((contact) => contact.id === contactId);
    if (!getContact) return sorryLog(contactId);
    console.table(getContact);
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const allContacts = await getAllContacts(contactsPath);
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
    const allContacts = await getAllContacts(contactsPath);
    const check = allContacts.find(
      (contact) =>
        contact.name === name ||
        contact.email === email ||
        contact.phone === phone
    );
    if (check) {
      console.log("There is already exist the contact with the same data");
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
