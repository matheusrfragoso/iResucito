import React from 'react';
import { connect } from 'react-redux';
import BaseModal from './BaseModal';
import SearchBarView from './SearchBarView';
import {
  Text,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  CheckBox
} from 'native-base';
import {
  FlatList,
  Platform,
  View,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import {
  syncContact,
  hideContactImportDialog,
  setContactsFilterText
} from '../actions';
import {
  getCurrentRouteKey,
  getCurrentRouteContactsTextFilter,
  getFilteredContactsForImport,
  getProcessedContacts
} from '../selectors';
import commonTheme from '../../native-base-theme/variables/platform';

const unknown = require('../../img/avatar.png');

const ContactImportDialog = props => {
  var readyButton = (
    <Text
      style={{
        alignSelf: 'center',
        color: commonTheme.brandPrimary,
        marginRight: 10
      }}
      onPress={() => props.close()}>
      Listo
    </Text>
  );
  return (
    <BaseModal
      visible={props.visible}
      closeModal={() => props.close()}
      closeButton={readyButton}
      title="Importar Contactos"
      fade={true}>
      <SearchBarView
        searchTextFilterId={props.textFilterId}
        searchTextFilter={props.textFilter}
        searchHandler={props.filtrarHandler}>
        {props.imported.length > 0 && (
          <View
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: commonTheme.listBorderColor
            }}>
            <FlatList
              horizontal={true}
              keyboardShouldPersistTaps="always"
              data={props.imported}
              keyExtractor={item => item.recordID}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={{ marginRight: 10, width: 56 }}
                    onPress={() => props.syncContact(item)}>
                    <Thumbnail
                      source={
                        item.hasThumbnail ? (
                          { uri: item.thumbnailPath }
                        ) : (
                          unknown
                        )
                      }
                    />
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 12,
                        textAlign: 'center',
                        marginTop: 5
                      }}>
                      {item.givenName}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        )}
        {props.items.length === 0 && (
          <Text note style={{ textAlign: 'center', marginTop: 20 }}>
            No hay contactos
          </Text>
        )}
        <FlatList
          contentContainerStyle={{
            marginTop: 10
          }}
          onScrollBeginDrag={() => Keyboard.dismiss()}
          keyboardShouldPersistTaps="always"
          data={props.items}
          keyExtractor={item => item.recordID}
          renderItem={({ item }) => {
            var photo = (
              <Thumbnail
                small
                source={
                  item.hasThumbnail ? { uri: item.thumbnailPath } : unknown
                }
              />
            );
            var contactFullName =
              Platform.OS == 'ios'
                ? `${item.givenName} ${item.familyName}`
                : item.givenName;
            return (
              <ListItem
                avatar
                button
                onPress={() => props.syncContact(item, props.textFilterId)}>
                <Left>{photo}</Left>
                <Body>
                  <Text
                    style={{ fontSize: 15, fontWeight: 'bold' }}
                    numberOfLines={1}>
                    {contactFullName}
                  </Text>
                  <Text note numberOfLines={1}>
                    {item.emailAddresses.length > 0 ? (
                      item.emailAddresses[0].email
                    ) : null}
                  </Text>
                </Body>
                <Right>
                  <CheckBox
                    checked={item.imported}
                    onPress={() => props.syncContact(item, props.textFilterId)}
                  />
                </Right>
              </ListItem>
            );
          }}
        />
      </SearchBarView>
    </BaseModal>
  );
};

const mapStateToProps = state => {
  var visible = state.ui.get('contact_import_visible');
  var t = getCurrentRouteContactsTextFilter(state);
  return {
    visible: visible,
    textFilterId: getCurrentRouteKey(state),
    textFilter: t,
    items: getFilteredContactsForImport(state),
    imported: getProcessedContacts(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    close: () => {
      dispatch(hideContactImportDialog());
    },
    syncContact: (contact, inputId) => {
      dispatch(syncContact(contact));
      if (inputId) {
        dispatch(setContactsFilterText(inputId, ''));
      }
    },
    filtrarHandler: (inputId, text) => {
      dispatch(setContactsFilterText(inputId, text));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ContactImportDialog
);
