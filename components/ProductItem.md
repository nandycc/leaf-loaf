# ProductItem Component

A flexible, reusable product card component built for React Native Expo apps. Optimized for FlatList usage with full memoization support.

## Features

- **4 Component Types**: Input, Confirmed, Cart, Recommendation
- **4 UI States**: Default, Selected, Expanded, Collapsed
- **Visibility Toggles**: Control which elements are shown
- **FlatList Optimized**: Memoized for performance
- **Event-Based**: No business logic, emits events only
- **Fully Typed**: TypeScript support with comprehensive interfaces

---

## Component Types

### 1. Input Type
Used during product search and selection flows.

**Visual Features:**
- Product image (32x32)
- Product name and quantity
- Expand/collapse chevron icon
- Suggestion pills (when expanded)
- Attributes list (when expanded)

**Use Cases:**
- Product search results
- Product selection during order creation
- Browse catalog

### 2. Confirmed Type
Used to show confirmed order items.

**Visual Features:**
- Product image (32x32)
- Product name and quantity
- Selection highlight border
- Expand/collapse chevron icon

**Use Cases:**
- Order confirmation screen
- Order history details

### 3. Cart Type
Used in shopping cart views.

**Visual Features:**
- Product image (32x32)
- Product name and quantity
- Quantity controls (-, count, +)
- Price and original price
- No expand/collapse icon

**Use Cases:**
- Shopping cart
- Checkout preview

### 4. Recommendation Type
Compact card for product recommendations.

**Visual Features:**
- Smaller padding (8px vs 12px)
- Product image (32x32)
- Product name and quantity (smaller fonts)
- Price display (L2 font)
- Add button (+ icon)

**Use Cases:**
- Related products
- Frequently bought together
- Product suggestions

---

## UI States

### Default
Normal appearance, no special styling.

### Selected
Visual highlight with orange border (`borderColor: Colors.accent.orange[200]`).

### Expanded
Shows additional content:
- Suggestion pills (if `showSuggestionPills` is true)
- Attributes list (if `showAttributes` is true)
- Chevron icon rotated 180°

### Collapsed
Hides additional content, chevron icon at 0° rotation.

---

## Props API

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | Product name |
| `type` | `'input' \| 'confirmed' \| 'cart' \| 'recommendation'` | Component type |

### Optional Props

#### Product Data
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `quantity` | `string` | - | Product quantity/weight (e.g., "500 ml") |
| `price` | `number` | - | Current price |
| `originalPrice` | `number` | - | Original/strike-through price |
| `imageSource` | `ImageSourcePropType` | - | Product image source |

#### State & Visibility
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `'default' \| 'selected' \| 'expanded' \| 'collapsed'` | `'default'` | Visual state |
| `showImage` | `boolean` | `true` | Show/hide product image |
| `showSuggestionPills` | `boolean` | `false` | Show/hide suggestion pills |
| `showAttributes` | `boolean` | `false` | Show/hide attributes list |
| `showQuantityControl` | `boolean` | `false` | Show/hide quantity controls |
| `showPrice` | `boolean` | `false` | Show/hide price display |

#### Data Arrays
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `suggestionPills` | `Array<{id: string, label: string}>` | `[]` | Suggestion pills data |
| `attributes` | `Array<{id: string, label: string}>` | `[]` | Attributes data |

#### Cart Quantity
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cartQuantity` | `number` | `1` | Current quantity in cart (for cart type) |

#### Event Handlers
| Prop | Type | Description |
|------|------|-------------|
| `onPress` | `() => void` | Called when component is pressed |
| `onExpandToggle` | `() => void` | Called when expand/collapse icon is pressed |
| `onQuantityChange` | `(quantity: number) => void` | Called when quantity is changed |
| `onSuggestionPillPress` | `(pillId: string) => void` | Called when a suggestion pill is pressed |

---

## Usage Examples

### Basic Input Type

```tsx
<ProductItem
  type="input"
  name="Amul Fresh Lactose Free Milk 500 ml"
  quantity="500 ml"
  imageSource={{ uri: 'https://example.com/image.jpg' }}
  showImage
  onPress={() => console.log('Pressed')}
/>
```

### Expanded with Pills

```tsx
const [expanded, setExpanded] = useState(false);

<ProductItem
  type="input"
  state={expanded ? 'expanded' : 'collapsed'}
  name="Amul Fresh Lactose Free Milk 500 ml"
  quantity="500 ml"
  imageSource={{ uri: 'https://example.com/image.jpg' }}
  showImage
  showSuggestionPills
  suggestionPills={[
    { id: '1', label: 'Amul Lactose Free Milk 500 ml' },
    { id: '2', label: '1L' },
    { id: '3', label: 'Nestle Lactose Free Milk' },
  ]}
  onExpandToggle={() => setExpanded(!expanded)}
  onSuggestionPillPress={(id) => console.log('Pill:', id)}
/>
```

### Cart Type with Quantity Control

```tsx
const [quantity, setQuantity] = useState(1);

<ProductItem
  type="cart"
  name="Amul Fresh Lactose Free Milk 500 ml"
  quantity="500 ml"
  price={24}
  originalPrice={28}
  imageSource={{ uri: 'https://example.com/image.jpg' }}
  showImage
  showQuantityControl
  showPrice
  cartQuantity={quantity}
  onQuantityChange={setQuantity}
/>
```

### Recommendation Type

```tsx
<ProductItem
  type="recommendation"
  name="Amul Fresh Lactose Free Milk 500 ml"
  quantity="500 ml"
  price={24}
  imageSource={{ uri: 'https://example.com/image.jpg' }}
  showImage
  showPrice
  onPress={() => console.log('Add to cart')}
/>
```

### FlatList Integration

```tsx
const renderItem = ({ item }) => (
  <ProductItem
    type="cart"
    name={item.name}
    quantity={item.quantity}
    price={item.price}
    imageSource={item.imageSource}
    showImage
    showQuantityControl
    showPrice
    cartQuantity={item.cartQuantity}
    onQuantityChange={(qty) => handleQuantityChange(item.id, qty)}
  />
);

<FlatList
  data={products}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
/>
```

---

## Style Specifications

### Main Container
- **Default**: `backgroundColor: Colors.backgrounds.normal`, `borderRadius: 4px`, `padding: 12px`
- **Recommendation**: `padding: 8px`
- **Selected State**: `borderWidth: 1px`, `borderColor: Colors.accent.orange[200]`

### Product Image
- **Size**: 32x32
- **Border Radius**: 4px

### Icons
- **Expand/Collapse**: 24px, Orange-200 color
- **Add Button**: 24px circle, Orange-200 background, white plus icon

### Suggestion Pills
- **Background**: Blue-100 at 50% opacity
- **Padding**: 6px vertical, 8px horizontal
- **Border Radius**: 50px

### Quantity Control
- **Background**: Orange-200
- **Border Radius**: 4px
- **Gap**: 8px
- **Button Color**: White

### Typography

#### Default Types
- **Product Name**: B2 Regular (12px)
- **Quantity**: L2 Regular (8px), Orange-200 color
- **Price**: B3 Medium (10px)
- **Original Price**: B3 Medium (10px), 30% opacity, line-through
- **Suggestion Pill**: L3 (6px)
- **Quantity Text**: B3 Medium (10px), Button Primary color

#### Recommendation Type
- **Product Name**: L2 Medium (8px)
- **Quantity**: L3 Regular (6px), Orange-200 color
- **Price**: L2 Medium (8px)
- **Original Price**: L2 Medium (8px), 30% opacity, line-through

---

## Component Architecture

### Internal Structure

```
ProductItem (Container)
├── Main Row
│   ├── ProductImage
│   ├── ProductInfo (name + quantity)
│   └── Icon (Chevron or Add Button)
├── AttributesList (conditional)
├── SuggestionPills (conditional)
├── QuantityPriceRow (conditional)
│   ├── QuantityControl
│   └── PriceDisplay
└── PriceDisplay (recommendation only)
```

### Sub-Components

1. **ProductImage**: Renders image or placeholder
2. **ProductInfo**: Displays name and quantity
3. **AttributesList**: Shows attributes as comma-separated list
4. **SuggestionPills**: Scrollable row of pill buttons
5. **QuantityPriceRow**: Combines quantity control and price
6. **PriceDisplay**: Shows current and original price

---

## Performance Optimization

The component is memoized using `React.memo()`, which prevents unnecessary re-renders when props haven't changed.

**Best Practices for FlatList:**

```tsx
// Extract handler functions outside render
const handleQuantityChange = useCallback((id: string, qty: number) => {
  // Update logic
}, []);

// Use keyExtractor
const keyExtractor = useCallback((item) => item.id, []);

// Memoize renderItem
const renderItem = useCallback(({ item }) => (
  <ProductItem
    type="cart"
    name={item.name}
    // ... other props
    onQuantityChange={(qty) => handleQuantityChange(item.id, qty)}
  />
), [handleQuantityChange]);
```

---

## Color Reference

From `constants/theme.ts`:

```typescript
Colors.backgrounds.normal        // #FFFFFF
Colors.accent.orange[200]        // #C38030
Colors.accent.blue[100]          // #AEC6DA (50% opacity for pills)
Colors.text.brown[400]           // #211608
Colors.fonts.buttonPrimary       // #FFFFFF
Colors.neutrals[200]             // #E5E5E5
```

---

## Accessibility

The component includes:
- `activeOpacity={0.7}` for visual feedback
- `hitSlop` for smaller touchable areas
- `numberOfLines` for text truncation
- `disabled` state for quantity decrease button

---

## Notes

- **No Business Logic**: Component only handles UI and events
- **Parent Responsibility**: Manage state, data fetching, cart operations
- **Memoization**: Component is memoized for performance
- **Type Safety**: Full TypeScript support
- **Theme Integration**: Uses design system tokens

---

## File Location

```
/project/components/ProductItem.tsx
```

## Related Files

- `/project/components/ProductItemExamples.tsx` - Usage examples
- `/project/constants/theme.ts` - Design system tokens
