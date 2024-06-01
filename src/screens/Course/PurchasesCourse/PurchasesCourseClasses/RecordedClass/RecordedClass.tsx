import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {FC, useState} from 'react';
import {NavigationType} from '../../../../../Types';
import {
  colors,
  fonts,
  images,
  screens,
  size,
  strings,
} from '../../../../../constants';
import {vh, vw} from '../../../../../constants/dimensions';

interface Props {
  navigation: NavigationType;
}
const RecordedClass: FC<Props> = props => {
  const {navigation} = props;
  const [loading, setLoading] = useState(false);

  const renderRecordedData = (item: RecordedClass, i: number) => {
    return (
      <Pressable
        style={styles.recordedClassContainer}
        onPress={() => {
          navigation.navigate(screens.RecordedClassDetail, {
            classTitle: item.classTitle,
            index: i + 1,
          });
        }}>
        <Text numberOfLines={2} style={styles.classTitleText}>
          {`${strings.class} ${i + 1} : ${item.classTitle}`}
        </Text>
        <Image source={images.rightArrow} style={styles.arrow} />
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatlistContainer}
        data={RECORDED_DATA}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}: any) => {
          return renderRecordedData(item, index);
        }}
        refreshControl={
          <RefreshControl
            colors={[colors.primary]}
            refreshing={loading}
            onRefresh={() => {}}
          />
        }
      />
    </SafeAreaView>
  );
};

export default RecordedClass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  flatlistContainer: {
    paddingHorizontal: vw(16),
    paddingBottom: vw(20),
  },
  recordedClassContainer: {
    width: vw(335),
    backgroundColor: colors.modalBg,
    height: 'auto',
    paddingVertical: vh(8),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: vw(10),
    borderRadius: vw(8),
    marginBottom: vh(10),
  },
  classTitleText: {
    fontFamily: fonts.openSansMedium,
    fontSize: size.S_14,
    color: colors.black,
    width: vw(280),
  },
  arrow: {
    width: vw(28),
    height: vw(28),
    resizeMode: 'contain',
  },
});

interface RecordedClass {
  id: string | number;
  classTitle: string;
}

const RECORDED_DATA: RecordedClass[] = [
  {
    id: 1,
    classTitle: 'Introduction',
  },
  {
    id: 2,
    classTitle: 'About Soil Farming',
  },
  {
    id: 3,
    classTitle: 'About Equipment uses in Soil Farming',
  },
  {
    id: 4,
    classTitle: 'Strawberry Introduction',
  },
  {
    id: 5,
    classTitle: 'Strawberry Cultivaton',
  },
];
