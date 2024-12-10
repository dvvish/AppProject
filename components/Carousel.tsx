import React, { useRef, useState, useEffect } from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet, TouchableOpacity, ActivityIndicator, Text } from 'react-native';

const { width } = Dimensions.get('window');

 
const Carousel = () => {
  const [data, setData] = useState<{ id: string; imageUrl: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<any>>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://mechbuddy.pythonanywhere.com/api/home');
        const result = await response.json();

        // Extract the 'slider' component
        const sliderComponent = result.components.find((item: any) => item.component === 'slider');

        if (sliderComponent && sliderComponent.data) {
          const formattedData = sliderComponent.data.map((item: { id: string; imageUrl: string }) => ({
            id: item.id,
            imageUrl: item.imageUrl,
          }));
          setData(formattedData.slice(0, 3)); // Limit to the first 3 images
        } else {
          console.warn('No slider component found in the API.');
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 80,
  }).current;

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({ index });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : data.length > 0 ? (
        <>
          <FlatList
            ref={flatListRef}
            data={data}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
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
        </>
      ) : (
        <Text style={styles.errorText}>No carousel data available</Text>
      )}
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
