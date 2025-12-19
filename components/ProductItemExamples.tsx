/**
 * ProductItem Usage Examples
 *
 * This file demonstrates all the different ways to use the ProductItem component.
 * Copy and adapt these examples for your use cases.
 */

import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ProductItem from './ProductItem';

// Example product data structure
interface Product {
  id: string;
  name: string;
  quantity: string;
  price: number;
  originalPrice?: number;
  imageSource?: any;
}

const sampleProduct: Product = {
  id: '1',
  name: 'Amul Fresh Lactose Free Milk 500 ml',
  quantity: '500 ml',
  price: 24,
  originalPrice: 28,
  imageSource: { uri: 'https://via.placeholder.com/32' },
};

// ============================================
// EXAMPLE 1: INPUT TYPE (Search/Selection)
// ============================================
export const InputTypeExample = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      {/* Default State */}
      <ProductItem
        type="input"
        state="default"
        name={sampleProduct.name}
        quantity={sampleProduct.quantity}
        imageSource={sampleProduct.imageSource}
        showImage
        onPress={() => console.log('Product pressed')}
        onExpandToggle={() => console.log('Toggle expand')}
      />

      {/* Expanded State with Pills and Attributes */}
      <ProductItem
        type="input"
        state={expanded ? 'expanded' : 'collapsed'}
        name={sampleProduct.name}
        quantity={sampleProduct.quantity}
        imageSource={sampleProduct.imageSource}
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
        onPress={() => console.log('Product pressed')}
        onExpandToggle={() => setExpanded(!expanded)}
        onSuggestionPillPress={(pillId) => console.log('Pill pressed:', pillId)}
      />
    </View>
  );
};

// ============================================
// EXAMPLE 2: CONFIRMED TYPE (Order Confirmed)
// ============================================
export const ConfirmedTypeExample = () => {
  return (
    <View style={styles.container}>
      {/* Selected State */}
      <ProductItem
        type="confirmed"
        state="selected"
        name={sampleProduct.name}
        quantity={sampleProduct.quantity}
        imageSource={sampleProduct.imageSource}
        showImage
        onPress={() => console.log('Product pressed')}
        onExpandToggle={() => console.log('Toggle expand')}
      />

      {/* Default State */}
      <ProductItem
        type="confirmed"
        state="default"
        name={sampleProduct.name}
        quantity={sampleProduct.quantity}
        imageSource={sampleProduct.imageSource}
        showImage
        onPress={() => console.log('Product pressed')}
      />
    </View>
  );
};

// ============================================
// EXAMPLE 3: CART TYPE (Shopping Cart)
// ============================================
export const CartTypeExample = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <View style={styles.container}>
      <ProductItem
        type="cart"
        state="default"
        name={sampleProduct.name}
        quantity={sampleProduct.quantity}
        price={sampleProduct.price}
        originalPrice={sampleProduct.originalPrice}
        imageSource={sampleProduct.imageSource}
        showImage
        showQuantityControl
        showPrice
        cartQuantity={quantity}
        onPress={() => console.log('Product pressed')}
        onQuantityChange={(newQuantity) => {
          console.log('Quantity changed to:', newQuantity);
          setQuantity(newQuantity);
        }}
      />
    </View>
  );
};

// ============================================
// EXAMPLE 4: RECOMMENDATION TYPE
// ============================================
export const RecommendationTypeExample = () => {
  return (
    <View style={styles.container}>
      <ProductItem
        type="recommendation"
        state="default"
        name={sampleProduct.name}
        quantity={sampleProduct.quantity}
        price={sampleProduct.price}
        originalPrice={sampleProduct.originalPrice}
        imageSource={sampleProduct.imageSource}
        showImage
        showPrice
        onPress={() => console.log('Add to cart pressed')}
      />

      {/* Without image */}
      <ProductItem
        type="recommendation"
        state="default"
        name="Veggie Mix"
        quantity="150 gm"
        price={24}
        showImage={false}
        showPrice
        onPress={() => console.log('Add to cart pressed')}
      />
    </View>
  );
};

// ============================================
// EXAMPLE 5: FLATLIST OPTIMIZATION
// ============================================
export const FlatListExample = () => {
  const [products] = useState<Product[]>([
    { ...sampleProduct, id: '1' },
    { ...sampleProduct, id: '2', name: 'Nestle Milk 1L' },
    { ...sampleProduct, id: '3', name: 'Mother Dairy Milk 500ml' },
  ]);

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    '1': 1,
    '2': 2,
    '3': 1,
  });

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    setQuantities((prev) => ({ ...prev, [productId]: newQuantity }));
  };

  const renderItem = ({ item }: { item: Product }) => (
    <ProductItem
      type="cart"
      state="default"
      name={item.name}
      quantity={item.quantity}
      price={item.price}
      originalPrice={item.originalPrice}
      imageSource={item.imageSource}
      showImage
      showQuantityControl
      showPrice
      cartQuantity={quantities[item.id]}
      onPress={() => console.log('Product pressed:', item.id)}
      onQuantityChange={(newQuantity) =>
        handleQuantityChange(item.id, newQuantity)
      }
    />
  );

  const keyExtractor = (item: Product) => item.id;

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.listContainer}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

// ============================================
// EXAMPLE 6: MIXED STATES DEMO
// ============================================
export const AllStatesDemo = () => {
  const [selectedId, setSelectedId] = useState<string>('2');
  const [expandedId, setExpandedId] = useState<string>('3');

  const products = [
    { id: '1', state: 'default' as const },
    { id: '2', state: 'selected' as const },
    { id: '3', state: 'expanded' as const },
    { id: '4', state: 'collapsed' as const },
  ];

  return (
    <View style={styles.container}>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          type="input"
          state={
            product.id === selectedId
              ? 'selected'
              : product.id === expandedId
              ? 'expanded'
              : 'default'
          }
          name={sampleProduct.name}
          quantity={sampleProduct.quantity}
          imageSource={sampleProduct.imageSource}
          showImage
          showSuggestionPills={product.id === expandedId}
          suggestionPills={
            product.id === expandedId
              ? [
                  { id: '1', label: 'Amul Lactose Free Milk 500 ml' },
                  { id: '2', label: '1L' },
                ]
              : []
          }
          onPress={() => setSelectedId(product.id)}
          onExpandToggle={() =>
            setExpandedId(expandedId === product.id ? '' : product.id)
          }
        />
      ))}
    </View>
  );
};

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  listContainer: {
    padding: 16,
  },
  separator: {
    height: 12,
  },
});
