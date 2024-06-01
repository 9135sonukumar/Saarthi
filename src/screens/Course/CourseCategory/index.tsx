import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';
import {Skeleton} from '@rneui/themed';
import Toast from 'react-native-toast-message';
import React, {FC, useEffect, useState} from 'react';
import {supabase} from '../../../lib/supabase';
import {NavigationType, Table} from '../../../Types';
import {colors, fonts, screens, size} from '../../../constants';
import {vh, vw} from '../../../constants/dimensions';

interface Props {
  navigation: NavigationType;
}

const CourseCategory: FC<Props> = props => {
  const {navigation} = props;
  const [loading, setLoading] = useState(false);
  const [courseCatData, setCourseCatData] = useState<any[]>([]);

  useEffect(() => {
    getCourseCategoryAPI();
  }, []);

  const getCourseCategoryAPI = async () => {
    setLoading(true);
    try {
      const {error, data} = await supabase
        .from<Table, any>('CourseCategoryMaster')
        .select();
      if (error) {
        Toast.show({type: 'error', text2: error.message});
      } else {
        setCourseCatData(data);
      }
    } catch (err) {
      console.error(err);
      Toast.show({
        type: 'error',
        text2: 'An error occurred while fetching data',
      });
    } finally {
      setLoading(false);
    }
  };

  const renderCourseCategory = (item: any, i: number) => {
    return (
      <Pressable
        key={i.toString()}
        style={styles.catBox}
        onPress={() =>
          navigation.navigate(screens.CourseList, {
            courseCategoryName: item.courseCategoryName,
          })
        }>
        <View style={styles.imageBox}>
          <Image source={{uri: item.image_url}} style={styles.image} />
        </View>
        <Text style={styles.titleStyle}>{item.courseCategoryName}</Text>
      </Pressable>
    );
  };

  const shimmerLoader = (_: any, i: number) => {
    return (
      <View key={i.toString()} style={styles.catBox}>
        <Skeleton circle width={vw(60)} height={vw(60)} />
        <Skeleton width={vw(80)} height={vh(12)} style={{marginTop: vh(10)}} />
      </View>
    );
  };

  const placeholderData = new Array(9).fill(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dataContainer}>
        <FlatList
          data={loading ? placeholderData : courseCatData}
          showsVerticalScrollIndicator={false}
          numColumns={3}
          renderItem={({item, index}) => {
            return loading
              ? shimmerLoader(item, index)
              : renderCourseCategory(item, index);
          }}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              refreshing={loading}
              onRefresh={getCourseCategoryAPI}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default CourseCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  dataContainer: {
    width: vw(335),
    alignSelf: 'center',
  },
  catBox: {
    width: vw(100),
    height: vw(100),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: vw(15),
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: vw(8),
    marginTop: vh(15),
  },
  imageBox: {
    width: vw(60),
    height: vw(60),
    borderRadius: vw(30),
    overflow: 'hidden',
  },
  image: {
    width: vw(60),
    height: vw(60),
    resizeMode: 'cover',
  },
  titleStyle: {
    fontSize: size.S_14,
    color: colors.black,
    fontFamily: fonts.openSansMedium,
    marginTop: vh(5),
  },
});
