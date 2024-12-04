// components/ImageSlider.tsx

import React, { useRef, useState } from 'react';
import { View, Image, FlatList, Dimensions, StyleSheet } from 'react-native';
import { icons } from '../constants';
// Import images from the icon folder
 
 //corousel image set//
const images = [
  { uri: icons.csl1 },
  { uri:  icons.csl2 },
  { uri: icons.csl3 },
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = Dimensions.get('window');
  const flatListRef = useRef<FlatList<{ uri: any }>>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[styles.imageContainer, { width }]}>
            <Image source={item.uri} style={styles.image} />
          </View>
        )}
        onViewableItemsChanged={onViewableItemsChanged.current}
        ref={flatListRef}
      />

      {/* Pagination indicators */}
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    padding:10,
  },
  pagination: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#FF3131',
  },
  inactiveDot: {
    backgroundColor: '#ffffff',
  },
});

export default ImageSlider;
