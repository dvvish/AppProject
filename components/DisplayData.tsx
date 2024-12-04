import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

type Props = {
  route: {
    params: {
      data: {
        category: string;
        type: string;
        company: string;
        model: string;
        variant: string;
      };
    };
  };
};

const DisplayData: React.FC<Props> = ({ route }) => {
  const { data } = route.params;

  const dataList = [
    { label: 'Category', value: data.category },
    // { label: 'Type', value: data.type },
    { label: 'Company', value: data.company },
    { label: 'Model', value: data.model },
    { label: 'Variant', value: data.variant },
  ];

  const renderItem = ({ item }: { item: { label: string; value: string } }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>
        {item.label}: {item.value}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submitted Data</Text>
      <FlatList
        data={dataList}
        keyExtractor={(item) => item.label}
        renderItem={renderItem}
      />
    </View>
  );
};

export default DisplayData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  itemContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});
