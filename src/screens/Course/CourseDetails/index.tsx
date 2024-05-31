import React, {FC, useState, useEffect} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
import {Skeleton} from '@rneui/themed';

interface Props {
  route: any;
  navigation: NavigationType;
}

const CourseDetails: FC<Props> = ({route, navigation}) => {
  const {
    courseName,
    courseDuration,
    courseRate,
    courseMargin,
    unitRate,
    courseImage,
  } = route.params.item;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setLoading(false);
    }, 1500); // Simulating delay for data fetching
  }, []);

  const renderSkeleton = () => {
    return (
      <>
        <Skeleton style={[styles.imageBox, {marginLeft: vw(10)}]} />
        <View
          style={[
            styles.courseNameContainer,
            {marginLeft: vw(10), width: vw(335)},
          ]}>
          <Skeleton
            width={vw(200)}
            height={vh(20)}
            style={{marginTop: vh(5)}}
          />
          <Skeleton width={vw(80)} height={vh(20)} style={{marginTop: vh(5)}} />
        </View>
        <View
          style={[
            styles.courseRateContainer,
            {marginLeft: vw(10), width: vw(335)},
          ]}>
          <Skeleton width={vw(50)} height={vh(20)} style={{marginTop: vh(5)}} />
          <Skeleton
            width={vw(50)}
            height={vh(20)}
            style={{marginLeft: vw(5), marginTop: vh(3)}}
          />
          <Skeleton
            width={vw(50)}
            height={vh(20)}
            style={{marginLeft: vw(5)}}
          />
        </View>
      </>
    );
  };

  const renderData = (specification: string) => {
    if (loading) {
      return (
        <View style={styles.specificationView}>
          <Skeleton circle width={vw(20)} height={vw(20)} />
          <Skeleton
            width={vw(220)}
            height={vw(20)}
            style={{marginLeft: vw(10)}}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.specificationView}>
          <Image source={images.checkMark} style={styles.checkMarkImg} />
          <Text style={styles.specificationText}>{specification}</Text>
        </View>
      );
    }
  };
  const skeletonButton = () => {
    if (loading) {
      return <Skeleton style={styles.button} />;
    } else {
      return (
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate(screens.PurchasesCourse);
          }}>
          <Text style={styles.text}>{strings.join}</Text>
        </Pressable>
      );
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginTop: vw(10)}}>
        {loading ? (
          renderSkeleton()
        ) : (
          <>
            <Image source={courseImage} style={styles.imageBox} />
            <View style={styles.courseNameContainer}>
              <Text style={styles.titleStyle}>{courseName}</Text>
              <Text style={styles.courseDurationText}>{courseDuration}</Text>
            </View>
            <View style={styles.courseRateContainer}>
              <Text style={styles.unitRateText}>{`₹ ${unitRate}`}</Text>
              <Text style={styles.courseRateText}>{courseRate}</Text>
              <Text
                style={
                  styles.courseDiscountText
                }>{`${courseMargin}% Off`}</Text>
            </View>
          </>
        )}

        {renderData('LIVE CLASS')}
        {renderData('CLASS PDF')}
        {renderData('TOPIC WISE DOUBT CLASS')}
        {renderData('RECORDED VIDEOS')}
        {renderData('15 DAYS FIELD WORK')}
        {renderData('BILINGUAL COURSE')}
        {renderData('COURSE VALIDITY 1 YEAR')}
      </ScrollView>
      {skeletonButton()}
    </SafeAreaView>
  );
};

export default CourseDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  text: {
    fontSize: size.S_14,
    color: colors.white,
    fontFamily: fonts.openSansMedium,
  },
  button: {
    width: vw(335),
    height: vh(40),
    borderRadius: vw(8),
    marginBottom: vh(15),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skeletonContainer: {
    alignItems: 'center',
    paddingVertical: vh(10),
  },
  imageBox: {
    width: vw(335),
    height: vh(200),
    borderTopLeftRadius: vw(7),
    borderTopRightRadius: vw(7),
  },
  titleStyle: {
    fontSize: size.S_16,
    color: colors.black,
    fontFamily: fonts.openSansBold,
    marginTop: vh(5),
  },
  courseNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: vw(3),
  },
  courseDurationText: {
    fontSize: size.S_16,
    color: colors.black,
    fontFamily: fonts.openSansMedium,
  },
  courseRateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: vw(3),
  },
  unitRateText: {
    fontSize: size.S_16,
    color: colors.black,
    fontFamily: fonts.openSansMedium,
  },
  courseRateText: {
    fontSize: size.S_14,
    color: colors.black,
    fontFamily: fonts.openSansRegular,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    marginLeft: vw(5),
    marginTop: vh(3),
  },
  courseDiscountText: {
    fontSize: size.S_16,
    color: colors.green,
    fontFamily: fonts.openSansMedium,
    marginLeft: vw(5),
  },
  specificationView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: vw(8),
    marginTop: vh(10),
  },
  checkMarkImg: {
    width: vw(20),
    height: vw(20),
    resizeMode: 'contain',
  },
  specificationText: {
    fontSize: size.S_14,
    color: colors.black,
    fontFamily: fonts.openSansMedium,
    marginLeft: vw(10),
  },
});
