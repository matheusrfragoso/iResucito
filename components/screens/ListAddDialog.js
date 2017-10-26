import React from 'react';
import { connect } from 'react-redux';
import { Text, Input, Item, Button } from 'native-base';
import { hideListAddDialog, createList, updateListAddName } from '../actions';
import BaseModal from './BaseModal';
import { getFriendlyTextForListType } from '../util';

class ListAddDialog extends React.Component {
  constructor(props) {
    super(props);
    this.focusInput = this.focusInput.bind(this);
  }

  focusInput() {
    this.listNameInput._root.focus();
  }

  render() {
    if (!this.props.listCreateEnabled) {
      var disabledReasonText =
        this.props.listCreateName && this.props.listCreateName.trim() !== ''
          ? 'Ya existe una lista con el mismo nombre'
          : 'Ingrese un nombre no vacío';
    }
    var acceptButtons = (
      <Button
        primary
        onPress={() =>
          this.props.createNewList(
            this.props.listCreateName,
            this.props.listCreateType
          )}
        disabled={!this.props.listCreateEnabled}>
        <Text>Crear</Text>
      </Button>
    );
    var titleSuffix = getFriendlyTextForListType(this.props.listCreateType);
    return (
      <BaseModal
        visible={this.props.visible}
        modalShow={() => this.focusInput()}
        closeModal={() => this.props.closeListAdd()}
        acceptButtons={acceptButtons}
        title={`Crear Lista (${titleSuffix})`}>
        <Item
          style={{ marginBottom: 20 }}
          error={!this.props.listCreateEnabled}
          success={this.props.listCreateEnabled}>
          <Input
            ref={input => {
              this.listNameInput = input;
            }}
            onChangeText={text => this.props.listNameChanged(text)}
            value={this.props.listCreateName}
            clearButtonMode="always"
            autoCorrect={false}
          />
        </Item>
        <Text danger note>
          {disabledReasonText}
        </Text>
      </BaseModal>
    );
  }
}

const mapStateToProps = state => {
  var visible = state.ui.get('list_add_visible');
  var list_create_type = state.ui.get('list_create_type');
  var list_create_name = state.ui.get('list_create_name');
  var list_create_enabled = state.ui.get('list_create_enabled');
  return {
    visible: visible,
    listCreateType: list_create_type,
    listCreateName: list_create_name,
    listCreateEnabled: list_create_enabled
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeListAdd: () => {
      dispatch(hideListAddDialog());
    },
    listNameChanged: text => {
      dispatch(updateListAddName(text));
    },
    createNewList: (name, type) => {
      dispatch(createList(name, type));
      dispatch(hideListAddDialog());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListAddDialog);
