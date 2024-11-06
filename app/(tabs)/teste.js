import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, SectionList, StatusBar, RefreshControl, ScrollView, TextInput, Pressable } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import apiFake from '../../services/api-fakeStore';





const Teste = () => {

    const [refreshing, setRefreshing] = useState(false);
    const [products, setProducts] = useState([]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(() => {

        async function loadProducts() {

            try {
                const response = await fetch('https://api.escuelajs.co/api/v1/products?limit=10&offset=0');
                const data = await response.json();

                const transformedData = [
                    {
                        data: data
                    }
                ]

                setProducts(transformedData);
            } catch (error) {
                console.log(error);
            }
        }

        loadProducts();
    }
        , []);

    console.log(products[0]);



    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={['top']}>

                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <TextInput
                        placeholder="Busque aqui"
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, flex: 1 }}
                    />
                    <Pressable style={{ backgroundColor: 'blue', padding: 10, borderTopRightRadius: 5, borderBottomRightRadius: 5 }}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>Buscar</Text>
                    </Pressable>
                </View>

                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    {
                        products[0]?.data.map(product => (
                            <View key={product.id} style={styles.item}>
                                <Text style={styles.title}>{product.title}</Text>
                            </View>
                        ))
                    }

                </ScrollView>
                






                {/*      
<SectionList
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      sections={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    /> */}

            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 5,
        backgroundColor: '#fff',
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
    },
    header: {
        fontSize: 32,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
    },
});

export default Teste;