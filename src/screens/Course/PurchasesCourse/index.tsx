import {
  Pressable,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {NavigationType} from '../../../Types';
import {
  colors,
  fonts,
  images,
  screens,
  size,
  strings,
} from '../../../constants';
import {vh, vw} from '../../../constants/dimensions';
import {Image} from 'react-native';
import {Skeleton} from '@rneui/themed';
import {FlatList} from 'react-native';
import {useAppSelector} from '../../../hooks';

interface Props {
  route: any;
  navigation: NavigationType;
}
const PurchasesCourse: FC<Props> = props => {
  const {navigation} = props;
  const [loading, setLoading] = useState(false);
  const [purchaseCourseListData, setPurchaseCourseListData] = useState<any[]>(
    [],
  );

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    setLoading(true);
    setTimeout(() => {
      setPurchaseCourseListData(COURSE_LIST);
      setLoading(false);
    }, 2000);
  };

  const renderCourseList = (item: any, i: number) => {
    return (
      <Pressable
        key={i.toString()}
        style={styles.catBox}
        onPress={() => {
          navigation.navigate(screens.PurchasesCourseClasses);
        }}>
        <Image source={item.courseImage} style={styles.imageBox} />
        <View style={styles.courseNameContainer}>
          <Text style={styles.titleStyle}>{item.courseName}</Text>
          <View style={styles.courseDurationContainer}>
            <Text style={styles.courseDurationText}>{item.courseDuration}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  const skeletonItem = () => {
    return (
      <View style={styles.catBox}>
        <Skeleton style={styles.imageBox} />
        <View
          style={{
            paddingHorizontal: vw(8),
            marginTop: vh(8),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Skeleton width={vw(180)} height={vh(14)} />
          <Skeleton circle width={vw(65)} height={vw(20)} />
        </View>
      </View>
    );
  };

  const placeholderData = new Array(10).fill(0);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: vw(16),
          paddingBottom: vw(20),
        }}
        data={loading ? placeholderData : COURSE_LIST}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}: any) => {
          return loading ? skeletonItem() : renderCourseList(item, index);
        }}
        refreshControl={
          <RefreshControl
            colors={[colors.primary]}
            refreshing={loading}
            onRefresh={() => {
              getCourses();
            }}
          />
        }
      />
    </SafeAreaView>
  );
};

export default PurchasesCourse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  catBox: {
    width: vw(335),
    height: 'auto',
    paddingBottom: vw(10),
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: vw(8),
    marginTop: vh(15),
  },
  imageBox: {
    width: vw(335),
    height: vh(110),
    resizeMode: 'cover',
    borderTopLeftRadius: vw(7),
    borderTopRightRadius: vw(7),
  },
  image: {
    width: vw(335),
    height: vh(300),
    resizeMode: 'contain',
  },
  titleStyle: {
    fontSize: size.S_14,
    color: colors.black,
    fontFamily: fonts.openSansBold,
    marginTop: vh(5),
  },
  courseNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: vw(8),
  },
  courseDurationContainer: {
    width: 'auto',
    height: 'auto',
    paddingHorizontal: vw(8),
    paddingVertical: vw(3),
    backgroundColor: colors.primary,
    borderRadius: vw(12),
    marginTop: vw(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseDurationText: {
    fontSize: size.S_14,
    color: colors.white,
    fontFamily: fonts.openSansMedium,
  },
  courseRateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: vw(8),
  },
  unitRateText: {
    fontSize: size.S_14,
    color: colors.black,
    fontFamily: fonts.openSansMedium,
  },
  courseRateText: {
    fontSize: size.S_12,
    color: colors.black,
    fontFamily: fonts.openSansRegular,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    marginLeft: vw(5),
    marginTop: vh(3),
  },
  courseDiscountText: {
    fontSize: size.S_14,
    color: colors.green,
    fontFamily: fonts.openSansMedium,
    marginLeft: vw(5),
  },
});

const COURSE_LIST = [
  {
    id: 1,
    courseName: 'Soli Farming-Strawberry',
    courseDuration: '90 Days',
    courseRate: '1500',
    courseMargin: '20',
    unitRate: '1200',
    courseImage: images.hydroponics,
  },
];
