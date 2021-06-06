import React from 'react';
import {StyleSheet, ActivityIndicator, Modal, View} from 'react-native';
import colors from '../utils/colors';

const ActivityModal = ({isLoading}) => {
  return (
    <Modal
      visible={isLoading}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      useNativeDriver
      transparent>
      <View style={{backgroundColor: '#00000078'}}>
        <ActivityIndicator
          animating
          color={colors.primary}
          size={50}
          style={styles.loader}
        />
      </View>
    </Modal>
  );
};

export default ActivityModal;

const styles = StyleSheet.create({
  loader: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
  },
});
