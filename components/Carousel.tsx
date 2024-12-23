import React, { useRef, useState, useEffect } from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet, TouchableOpacity, ActivityIndicator, Text, Animated } from 'react-native';

const { width } = Dimensions.get('window');

 
const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<any>>(null);

  const data = [
    { id: "1", imageUrl: require("../assets/icons/csl1.png") },
    { id: "2", imageUrl: require("../assets/icons/csl2.png") },
    { id: "3", imageUrl: require("../assets/icons/csl3.png") },
  ];

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 80,
  }).current;

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  // Auto-scroll logic
  //setinterval//
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % data.length; // Loop back to the start
      scrollToIndex(nextIndex);
      setCurrentIndex(nextIndex);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={item.imageUrl} style={styles.image} />
          </View>
        )}
        horizontal
        pagingEnabled
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <View style={styles.tabContainer}>
        {data.map((_, index) => (
          <TouchableOpacity key={index} onPress={() => scrollToIndex(index)}>
            <View style={[styles.tab, currentIndex === index && styles.tabActive]} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
   
  

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    item: {
        width: width * 0.9,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: width * 0.9,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 20,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    tab: {
        width: 30,
        height: 3,
        borderRadius: 5,
        backgroundColor: '#ACA7A6',
        marginHorizontal: 5,
    },
    tabActive: {
        backgroundColor: '#FF3131',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default Carousel;
