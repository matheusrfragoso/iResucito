import React from 'react';
import { connect } from 'react-redux';
import { Icon, List } from 'native-base';
import BaseScreen from './BaseScreen';
import ListDetailItem from './ListDetailItem';
import { shareList } from '../actions';
import { getSalmosFromList } from '../selectors';
import AppNavigatorConfig from '../AppNavigatorConfig';

const ListDetail = props => {
  return (
    <BaseScreen>
      <List>
        <ListDetailItem
          listName={props.list.name}
          listKey="ambiental"
          listText={props.listMap.get('ambiental')}
        />
        <ListDetailItem
          listName={props.list.name}
          listKey="entrada"
          listText={props.listMap.get('entrada')}
        />
        <ListDetailItem
          listName={props.list.name}
          listKey="1-monicion"
          listText={props.listMap.get('1-monicion')}
        />
        <ListDetailItem
          listName={props.list.name}
          listKey="1"
          listText={props.listMap.get('1')}
        />
        {props.listMap.has('1-salmo') && (
          <ListDetailItem
            listName={props.list.name}
            listKey="1-salmo"
            listText={props.listMap.get('1-salmo')}
          />
        )}
        <ListDetailItem
          listName={props.list.name}
          listKey="2-monicion"
          listText={props.listMap.get('2-monicion')}
        />
        <ListDetailItem
          listName={props.list.name}
          listKey="2"
          listText={props.listMap.get('2')}
        />
        {props.listMap.has('2-salmo') && (
          <ListDetailItem
            listName={props.list.name}
            listKey="2-salmo"
            listText={props.listMap.get('2-salmo')}
          />
        )}
        {props.listMap.has('3-monicion') && (
          <ListDetailItem
            listName={props.list.name}
            listKey="3-monicion"
            listText={props.listMap.get('3-monicion')}
          />
        )}
        {props.listMap.has('3') && (
          <ListDetailItem
            listName={props.list.name}
            listKey="3"
            listText={props.listMap.get('3')}
          />
        )}
        {props.listMap.has('3-salmo') && (
          <ListDetailItem
            listName={props.list.name}
            listKey="3-salmo"
            listText={props.listMap.get('3-salmo')}
          />
        )}
        <ListDetailItem
          listName={props.list.name}
          listKey="evangelio-monicion"
          listText={props.listMap.get('evangelio-monicion')}
        />
        <ListDetailItem
          listName={props.list.name}
          listKey="evangelio"
          listText={props.listMap.get('evangelio')}
        />
        {props.listMap.has('paz') && (
          <ListDetailItem
            listName={props.list.name}
            listKey="paz"
            listText={props.listMap.get('paz')}
          />
        )}
        {props.listMap.has('comunion') && (
          <ListDetailItem
            listName={props.list.name}
            listKey="comunion"
            listText={props.listMap.get('comunion')}
          />
        )}
        <ListDetailItem
          listName={props.list.name}
          listKey="salida"
          listText={props.listMap.get('salida')}
        />
      </List>
    </BaseScreen>
  );
};

const mapStateToProps = (state, props) => {
  return {
    list: props.navigation.state.params.list,
    listMap: getSalmosFromList(state, props)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listShare: (list, listMap) => {
      dispatch(shareList(list.name, listMap));
    }
  };
};

const ShareList = props => {
  if (props.listMap.keys().length == 0) {
    return null;
  }
  return (
    <Icon
      name="share"
      style={{
        marginTop: 4,
        marginRight: 12,
        color: AppNavigatorConfig.navigationOptions.headerTitleStyle.color
      }}
      onPress={() =>
        props.listShare(props.navigation.state.params.list, props.listMap)}
    />
  );
};

const ShareListButton = connect(mapStateToProps, mapDispatchToProps)(ShareList);

ListDetail.navigationOptions = props => ({
  title: props.navigation.state.params
    ? props.navigation.state.params.list.name
    : 'Lista',
  headerRight: <ShareListButton {...props} />
});

export default connect(mapStateToProps, mapDispatchToProps)(ListDetail);
