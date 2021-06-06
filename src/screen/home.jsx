import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {
  ScrollContainer,
  Text,
  Card,
  RowBetween,
} from '../components/StyledComponent';
import avatar from '../assets/images/avatar.jpg';
import scale from '../assets/images/weight-scale.png';
import colors from '../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {UserContext} from '../store/UserContext';
import firestore from '@react-native-firebase/firestore';
import ActivityModal from '../components/ActivityModal';

const Home = () => {
  const {user, isUpdate} = useContext(UserContext);
  const [myWeights, setMyWeights] = useState([]);
  const [currentWeight, setCurrentWeight] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchRecentWeights = () => {
    firestore()
      .collection('daily_weights')
      .doc(user.uid)
      .collection('weight')
      .onSnapshot(
        data => {
          if (!data.empty) {
            const res = data.docs;
            let weight = res.map(item => {
              return item.data();
            });
            const sorted = weight
              .slice()
              .sort((a, b) => b.createdAt?.toDate() - a.createdAt?.toDate());

            let filtered = [];
            for (let index = 0; index < sorted.length; index++) {
              const element = sorted[index];
              filtered.push(element);
              if (index === 5) {
                break;
              }
            }
            setMyWeights(filtered);
          }
          setLoading(false);
        },
        e => {
          console.log(e);
          setLoading(false);
        },
      );
  };

  const fetchCurrent = () => {
    firestore()
      .collection('daily_weights')
      .doc(user.uid)
      .collection('weight')
      .onSnapshot(
        data => {
          if (!data.empty) {
            const res = data.docs;
            let weight = res.map(item => {
              return item.data();
            });

            const sorted = weight
              .slice()
              .sort((a, b) => b.createdAt?.toDate() - a.createdAt?.toDate());
            setCurrentWeight(sorted[0]);
          }
          setLoading(false);
        },
        e => {
          console.log(e);
          setLoading(false);
        },
      );
  };

  useEffect(() => {
    fetchRecentWeights();
    fetchCurrent();
    return () => {
      fetchCurrent();
      fetchRecentWeights();
    };
  }, []);

  return (
    <ScrollContainer height="100%" pad bgColor={colors.bgColor2}>
      <ActivityModal isLoading={loading} />
      <Image source={avatar} style={styles.avatar} />
      <View style={{width: '50%', alignSelf: 'center', marginVertical: 20}}>
        <Text isTitle isCenter>
          {user?.displayName}
        </Text>
      </View>
      <Card>
        <RowBetween>
          <Image source={scale} style={styles.icon} />
          <View>
            <Text color={colors.bgColor}>Your Current Weight</Text>
            <Text isTitle isCenter>
              {currentWeight?.weight ? `${currentWeight.weight}kg` : '0.0kg'}
            </Text>
          </View>
          <View />
        </RowBetween>
      </Card>
      <View style={styles.title}>
        <Icon
          name="history"
          color={colors.primary}
          size={20}
          style={{marginRight: 10}}
        />
        <Text isTitle>Recent Entry</Text>
      </View>
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

export default Home;
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
