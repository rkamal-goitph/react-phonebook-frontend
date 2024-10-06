import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts } from '../redux/contacts/contactOperations';
import { setFilter } from '../redux/filter/filterSlice';
import { addContact, deleteContact } from '../redux/contacts/contactOperations';
import {
  selectVisibleContacts,
  selectIsLoading,
  selectFilter,
  selectError,
} from '../redux/contacts/contactSelectors';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import { PhonebookHeader } from 'components/PhonebookHeader/PhonebookHeader';
import { selectUser } from '../redux/auth/authSelector';

export const ContactsPage = () => {
  const visibleContacts = useSelector(selectVisibleContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const filter = useSelector(selectFilter);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  console.log('visibleContacts', visibleContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = newContact => {
    dispatch(addContact(newContact));
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const handleSetFilter = newFilter => {
    dispatch(setFilter(newFilter));
  };

  return (
    <div>
      <PhonebookHeader user={user} />{' '}
      {/* Use the new PhonebookHeader component */}
      <ContactForm addContact={handleAddContact} contacts={visibleContacts} />
      <h2 style={{ textAlign: 'center' }}>Contacts</h2>
      <Filter filter={filter} setFilter={handleSetFilter} />
      {isLoading && (
        <b style={{ display: 'block', padding: '0 0 20px 10px' }}>Loading...</b>
      )}
      {error && <b>Error: {error}</b>}
      {visibleContacts && (
        <ContactList
          contacts={visibleContacts}
          deleteContact={handleDeleteContact}
        />
      )}
    </div>
  );
};
