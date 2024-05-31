import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC, useState, useEffect} from 'react';
import {NavigationType} from '../../../Types';
import {colors, fonts, images, screens, size} from '../../../constants';
import {vh, vw} from '../../../constants/dimensions';
import {Skeleton} from '@rneui/themed';

interface Props {
  route: any;
  navigation: NavigationType;
}

const CourseList: FC<Props> = props => {
  const {navigation} = props;
  const courseCategoryName = props.route.params.courseCategoryName;
  const [loading, setLoading] = useState(false);
  const [courseListData, setCourseListData] = useState<any[]>([]);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    setLoading(true);
    setTimeout(() => {
      setCourseListData(COURSE_LIST);
      setLoading(false);
    }, 2000);
  };

  const renderCourseList = (item: any, i: number) => {
    return (
      <Pressable
        key={i.toString()}
        style={styles.catBox}
        onPress={() => {
          navigation.navigate(screens.CourseDetails, {item: item});
        }}>
        <Image source={item.courseImage} style={styles.imageBox} />
        <View style={styles.courseNameContainer}>
          <Text style={styles.titleStyle}>{item.courseName}</Text>
          <View style={styles.courseDurationContainer}>
            <Text style={styles.courseDurationText}>{item.courseDuration}</Text>
          </View>
        </View>
        <View style={styles.courseRateContainer}>
          <Text style={styles.unitRateText}>{`₹ ${item.unitRate}`}</Text>
          <Text style={styles.courseRateText}>{item.courseRate}</Text>
          <Text
            style={
              styles.courseDiscountText
            }>{`${item.courseMargin}% Off`}</Text>
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
          <Skeleton circle width={vw(70)} height={vw(25)} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: vw(8),
            marginTop: vh(6),
          }}>
          <Skeleton width={vw(60)} height={vh(12)} />
          <Skeleton
            width={vw(40)}
            height={vh(12)}
            style={{marginLeft: vw(10)}}
          />
          <Skeleton
            width={vw(60)}
            height={vh(12)}
            style={{marginLeft: vw(10)}}
          />
        </View>
      </View>
    );
  };

  const placeholderData = new Array(10).fill(0);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Skeleton
          width={vw(335)}
          height={vh(20)}
          style={{
            marginTop: vh(5),
            marginLeft: vw(16),
          }}
        />
      ) : (
        <Text style={styles.category}>{courseCategoryName}</Text>
      )}

      <FlatList
        contentContainerStyle={{
          paddingHorizontal: vw(16),
          paddingBottom: vw(20),
        }}
        data={loading ? placeholderData : courseListData}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return loading ? skeletonItem() : renderCourseList(item, index);
        }}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl
            colors={[colors.primary]}
            refreshing={loading}
            onRefresh={getCourses}
          />
        }
      />
    </SafeAreaView>
  );
};

export default CourseList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignSelf: 'center',
  },
  category: {
    fontSize: size.S_16,
    color: colors.black,
    fontFamily: fonts.openSansSemiBold,
    marginTop: vh(5),
    marginLeft: vw(16),
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
    width: '100%',
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
    backgroundColor: colors.inputGrey,
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
    courseName: 'Soil Farming-Strawberry',
    courseDuration: '90 Days',
    courseRate: '1500',
    courseMargin: '20',
    unitRate: '1200',
    courseImage: images.hydroponics,
  },
  {
    id: 2,
    courseName: 'Soil Farming-Capsicum',
    courseDuration: '120 Days',
    courseRate: '1800',
    courseMargin: '25',
    unitRate: '1350',
    courseImage: images.hydroponics,
  },
  {
    id: 3,
    courseName: 'Soil Farming-Strawberry',
    courseDuration: '90 Days',
    courseRate: '1500',
    courseMargin: '20',
    unitRate: '1200',
    courseImage: images.hydroponics,
  },
  {
    id: 4,
    courseName: 'Soil Farming-Strawberry',
    courseDuration: '90 Days',
    courseRate: '1500',
    courseMargin: '20',
    unitRate: '1200',
    courseImage: images.hydroponics,
  },
  {
    id: 5,
    courseName: 'Soil Farming-Strawberry',
    courseDuration: '90 Days',
    courseRate: '1500',
    courseMargin: '20',
    unitRate: '1200',
    courseImage: images.hydroponics,
  },
  {
    id: 6,
    courseName: 'Soil Farming-Strawberry',
    courseDuration: '90 Days',
    courseRate: '1500',
    courseMargin: '20',
    unitRate: '1200',
    courseImage: images.hydroponics,
  },
  {
    id: 7,
    courseName: 'Soil Farming-Strawberry',
    courseDuration: '90 Days',
    courseRate: '1500',
    courseMargin: '20',
    unitRate: '1200',
    courseImage: images.hydroponics,
  },
  {
    id: 8,
    courseName: 'Soil Farming-Strawberry',
    courseDuration: '90 Days',
    courseRate: '1500',
    courseMargin: '20',
    unitRate: '1200',
    courseImage: images.hydroponics,
  },
  {
    id: 9,
    courseName: 'Soil Farming-Strawberry',
    courseDuration: '90 Days',
    courseRate: '1500',
    courseMargin: '20',
    unitRate: '1200',
    courseImage: images.hydroponics,
  },
  {
    id: 10,
    courseName: 'Soil Farming-Strawberry',
    courseDuration: '90 Days',
    courseRate: '1500',
    courseMargin: '20',
    unitRate: '1200',
    courseImage: images.hydroponics,
  },
];
