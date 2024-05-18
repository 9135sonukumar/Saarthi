import {
  Image,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {NavigationType} from '../../../Types';
import {colors, fonts, size} from '../../../constants';
import {supabase} from '../../../lib/supabase';
import Toast from 'react-native-toast-message';
import {vh, vw} from '../../../constants/dimensions';
import {Skeleton} from '@rneui/themed';

interface Props {
  navigation: NavigationType;
}
const SaarthiMart: FC<Props> = props => {
  const {navigation} = props;
  const [loading, setLoading] = useState(false);

  const [catData, setCatData] = useState<any[]>([]);

  useEffect(() => {
    getCategoryAPI();
  }, []);

  type Table = 'CategoryMatser' | 'User' | 'Address';

  const getCategoryAPI = async () => {
    setLoading(true);
    try {
      const {error, data} = await supabase
        .from<Table, any>('CategoryMatser')
        .select();
      if (error) {
        Toast.show({type: 'error', text2: error.message});
        setLoading(false);
      } else {
        setCatData(data);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const renderCategory = (item: any, i: number) => {
    return (
      <Pressable key={i.toString()} style={styles.catBox}>
        <View style={styles.imageBox}>
          <Image source={{uri: item.image_url}} style={styles.image} />
        </View>
        <Text style={styles.titleStyle}>{item.CategoryName}</Text>
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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.category}>Categories</Text>
      <View style={{height: vh(150)}}>
        <ScrollView
          horizontal
          scrollEnabled={!loading}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              refreshing={loading}
              onRefresh={() => {
                getCategoryAPI();
              }}
            />
          }
          contentContainerStyle={{paddingHorizontal: vw(16)}}>
          {loading
            ? new Array(13).fill(0).map(shimmerLoader)
            : catData.map(renderCategory)}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SaarthiMart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  catBox: {
    width: vw(100),
    height: vw(100),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: vw(10),
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
  circle: {
    width: vw(60),
    height: vw(60),
  },
  titleStyle: {
    fontSize: size.S_14,
    color: colors.black,
    fontFamily: fonts.openSansMedium,
    marginTop: vh(5),
  },
  category: {
    fontSize: size.S_16,
    color: colors.black,
    fontFamily: fonts.openSansSemiBold,
    marginTop: vh(5),
    marginLeft: vw(16),
  },
});
