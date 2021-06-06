import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {
  ScrollContainer,
  Text,
  Card,
  RowBetween,
} from '../components/StyledComponent';
import colors from '../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {UserContext} from '../store/UserContext';
import firestore from '@react-native-firebase/firestore';
import ActivityModal from '../components/ActivityModal';
import Snackbar from 'react-native-snackbar';

const History = () => {
  const {user} = useContext(UserContext);
  const [myWeights, setMyWeights] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllWeights = () => {
    firestore()
      .collection('daily_weights')
      .doc(user.uid)
      .collection('weight')
      .onSnapshot(
        weight => {
          setLoading(false);
          const data = weight.docs.map(item => {
            return {...item.data(), id: item.id};
          });

          const sorted = data
            .slice()
            .sort((a, b) => b.createdAt?.toDate() - a.createdAt?.toDate());
          setMyWeights(sorted);
        },
        e => {
          console.log(e);
          setLoading(false);
        },
      );
  };

  const deleteWeight = id => {
    Alert.alert('Delete Weight', 'Are You Sure ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          firestore()
            .collection('daily_weights')
            .doc(user.uid)
            .collection('weight')
            .doc(id)
            .delete()
            .then(() => {
              Snackbar.show({text: 'Deleted'});
            })
            .catch(() => {
              Snackbar.show({text: 'Something went wrong'});
            });
        },
      },
    ]);
  };

  useEffect(() => {
    fetchAllWeights();
    return () => {
      fetchAllWeights();
    };
  }, []);

  return (
    <ScrollContainer height="100%" pad bgColor={colors.bgColor2}>
      <ActivityModal isLoading={loading} />
      <View style={styles.mapList}>
        {myWeights.length ? (
          myWeights.map((item, key) => (
            <Card bgColor={colors.secondary} key={key}>
              <RowBetween>
                <View>
                  <Text isBold>{item?.createdAt?.toDate().toDateString()}</Text>
                  <Text>{item?.createdAt?.toDate().toLocaleTimeString()}</Text>
                </View>
                <Text isCenter color={colors.primary} isBold>
                  {`${item?.weight} kg`}
                </Text>
                <Icon
                  name="delete"
                  size={30}
                  color="red"
                  onPress={() => deleteWeight(item.id)}
                />
              </RowBetween>
            </Card>
          ))
        ) : (
          <Card bgColor={colors.secondary}>
            <Text isCenter color={colors.primary} isBold>
              Nothing to See, Get Started by adding Weight
            </Text>
          </Card>
        )}
      </View>
    </ScrollContainer>
  );
};

export default History;
const styles = StyleSheet.create({
  avatar: {
    height: 250,
    width: 250,
    alignSelf: 'center',
    borderRadius: 250 / 2,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  mapList: {
    marginBottom: '20%',
  },
  icon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '40%',
    marginVertical: 25,
  },
});
