import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import ProductItem from '@/components/ProductItem';
import { Colors, Typography } from '@/constants/theme';

export default function ProductItemDemo() {
  const [inputExpanded, setInputExpanded] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [selectedId, setSelectedId] = useState<string>('');

  const sampleImage = { uri: 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=100' };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>ProductItem Component Demo</Text>

        {/* INPUT TYPE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Input Type (Default)</Text>
          <ProductItem
            type="input"
            state="default"
            name="Amul Fresh Lactose Free Milk 500 ml"
            quantity="500 ml"
            imageSource={sampleImage}
            showImage
            onPress={() => console.log('Product pressed')}
            onExpandToggle={() => console.log('Toggle')}
          />
        </View>

        {/* INPUT TYPE - EXPANDED */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Input Type (Expanded with Pills)</Text>
          <ProductItem
            type="input"
            state={inputExpanded ? 'expanded' : 'collapsed'}
            name="Amul Fresh Lactose Free Milk 500 ml"
            quantity="500 ml"
            imageSource={sampleImage}
            showImage
            showSuggestionPills
            showAttributes
            suggestionPills={[
              { id: '1', label: 'Amul Lactose Free Milk 500 ml' },
              { id: '2', label: '1L' },
              { id: '3', label: 'Nestle Lactose Free Milk' },
              { id: '4', label: '+ See more' },
            ]}
            attributes={[
              { id: '1', label: 'Dairy' },
              { id: '2', label: 'Organic' },
            ]}
            onExpandToggle={() => setInputExpanded(!inputExpanded)}
            onSuggestionPillPress={(id) => console.log('Pill pressed:', id)}
          />
        </View>

        {/* CONFIRMED TYPE - SELECTED */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Confirmed Type (Selected)</Text>
          <ProductItem
            type="confirmed"
            state="selected"
            name="Amul Fresh Lactose Free Milk 500 ml"
            quantity="500 ml"
            imageSource={sampleImage}
            showImage
            onPress={() => console.log('Product pressed')}
          />
        </View>

        {/* CART TYPE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Cart Type (Quantity Control)</Text>
          <ProductItem
            type="cart"
            state="default"
            name="Amul Fresh Lactose Free Milk 500 ml"
            quantity="500 ml"
            price={24}
            originalPrice={28}
            imageSource={sampleImage}
            showImage
            showQuantityControl
            showPrice
            cartQuantity={cartQuantity}
            onQuantityChange={(qty) => {
              console.log('Quantity changed:', qty);
              setCartQuantity(qty);
            }}
          />
        </View>

        {/* RECOMMENDATION TYPE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Recommendation Type</Text>
          <ProductItem
            type="recommendation"
            state="default"
            name="Amul Fresh Lactose Free Milk 500 ml"
            quantity="500 ml"
            price={24}
            originalPrice={28}
            imageSource={sampleImage}
            showImage
            showPrice
            onPress={() => console.log('Add to cart')}
          />
        </View>

        {/* RECOMMENDATION TYPE - NO IMAGE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Recommendation (No Image)</Text>
          <ProductItem
            type="recommendation"
            state="default"
            name="Veggie Mix"
            quantity="150 gm"
            price={24}
            showImage={false}
            showPrice
            onPress={() => console.log('Add to cart')}
          />
        </View>

        {/* MULTIPLE ITEMS - SELECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Multiple Items (Selectable)</Text>
          {['1', '2', '3'].map((id) => (
            <View key={id} style={styles.itemSpacing}>
              <ProductItem
                type="input"
                state={selectedId === id ? 'selected' : 'default'}
                name={`Product ${id}`}
                quantity="500 ml"
                imageSource={sampleImage}
                showImage
                onPress={() => {
                  setSelectedId(selectedId === id ? '' : id);
                  console.log('Selected:', id);
                }}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.backgrounds.normal,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    ...Typography.h3,
    color: Colors.text.brown[400],
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...Typography.b1,
    color: Colors.text.brown[300],
    marginBottom: 12,
  },
  itemSpacing: {
    marginBottom: 8,
  },
});
