import React, { memo } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import { ChevronDown, Plus, Minus } from 'lucide-react-native';
import { Colors, Typography } from '@/constants/theme';
import { hexToRgba } from '@/constants/utils';

/**
 * ProductItem Component
 *
 * A flexible, reusable product card component that adapts to different types and states.
 * Optimized for FlatList usage with memoization.
 *
 * Types:
 * - input: User is searching/selecting products (shows expand/collapse, suggestion pills)
 * - confirmed: Order is confirmed (shows selected state)
 * - cart: Item is in cart (shows quantity controls and pricing)
 * - recommendation: Product recommendation card (compact styling, add button)
 *
 * States:
 * - default: Normal state
 * - selected: Item is selected (visual highlight)
 * - expanded: Shows additional content (attributes, pills)
 * - collapsed: Hides additional content
 *
 * Visibility Toggles control which elements are rendered
 */

export interface ProductItemProps {
  // Product Data
  name: string;
  quantity?: string;
  price?: number;
  originalPrice?: number;
  imageSource?: ImageSourcePropType;

  // Type: Determines overall layout and behavior
  type: 'input' | 'confirmed' | 'cart' | 'recommendation';

  // State: Affects visual styling
  state?: 'default' | 'selected' | 'expanded' | 'collapsed';

  // Visibility Toggles
  showImage?: boolean;
  showSuggestionPills?: boolean;
  showAttributes?: boolean;
  showQuantityControl?: boolean;
  showPrice?: boolean;

  // Suggestion Pills Data
  suggestionPills?: Array<{ id: string; label: string }>;

  // Attributes Data
  attributes?: Array<{ id: string; label: string }>;

  // Cart Quantity
  cartQuantity?: number;

  // Event Handlers
  onPress?: () => void;
  onExpandToggle?: () => void;
  onQuantityChange?: (quantity: number) => void;
  onSuggestionPillPress?: (pillId: string) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
  name,
  quantity,
  price,
  originalPrice,
  imageSource,
  type,
  state = 'default',
  showImage = true,
  showSuggestionPills = false,
  showAttributes = false,
  showQuantityControl = false,
  showPrice = false,
  suggestionPills = [],
  attributes = [],
  cartQuantity = 1,
  onPress,
  onExpandToggle,
  onQuantityChange,
  onSuggestionPillPress,
}) => {
  const isRecommendation = type === 'recommendation';
  const isExpanded = state === 'expanded';
  const isSelected = state === 'selected';
  const isCollapsed = state === 'collapsed';

  // Determine if expand/collapse icon should show
  const showExpandIcon = type === 'input' || type === 'confirmed';

  // Container styles based on type
  const containerStyle = [
    isRecommendation ? styles.recommendationContainer : styles.container,
    isSelected && styles.selectedContainer,
  ];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      {/* Main Row: Image + Info + Icon */}
      <View style={styles.mainRow}>
        {/* Product Image */}
        {showImage && (
          <ProductImage
            source={imageSource}
            isRecommendation={isRecommendation}
          />
        )}

        {/* Product Info */}
        <ProductInfo
          name={name}
          quantity={quantity}
          isRecommendation={isRecommendation}
        />

        {/* Right Icon: Expand/Collapse or Add Button */}
        {showExpandIcon && (
          <TouchableOpacity
            onPress={onExpandToggle}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ChevronDown
              size={24}
              color={Colors.accent.orange[200]}
              style={[
                isExpanded && styles.iconExpanded,
                isCollapsed && styles.iconCollapsed,
              ]}
            />
          </TouchableOpacity>
        )}

        {isRecommendation && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={onPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Plus size={16} color={Colors.fonts.buttonPrimary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Attributes Row (only shown when expanded and showAttributes is true) */}
      {showAttributes && isExpanded && attributes.length > 0 && (
        <AttributesList attributes={attributes} />
      )}

      {/* Suggestion Pills Row */}
      {showSuggestionPills && suggestionPills.length > 0 && (
        <SuggestionPills
          pills={suggestionPills}
          onPillPress={onSuggestionPillPress}
        />
      )}

      {/* Quantity Control + Price Row (for cart type) */}
      {showQuantityControl && showPrice && (
        <QuantityPriceRow
          quantity={cartQuantity}
          price={price}
          originalPrice={originalPrice}
          onQuantityChange={onQuantityChange}
        />
      )}

      {/* Price only (for recommendation type) */}
      {isRecommendation && showPrice && (
        <PriceDisplay
          price={price}
          originalPrice={originalPrice}
          isRecommendation={isRecommendation}
        />
      )}
    </TouchableOpacity>
  );
};

// ============================================
// SUB-COMPONENTS
// ============================================

interface ProductImageProps {
  source?: ImageSourcePropType;
  isRecommendation: boolean;
}

const ProductImage: React.FC<ProductImageProps> = ({ source, isRecommendation }) => {
  if (!source) {
    return (
      <View style={styles.imagePlaceholder}>
        <View style={styles.placeholderIcon} />
      </View>
    );
  }

  return (
    <Image
      source={source}
      style={isRecommendation ? styles.recommendationImage : styles.image}
      resizeMode="cover"
    />
  );
};

interface ProductInfoProps {
  name: string;
  quantity?: string;
  isRecommendation: boolean;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ name, quantity, isRecommendation }) => {
  return (
    <View style={styles.infoContainer}>
      <Text
        style={isRecommendation ? styles.recommendationName : styles.name}
        numberOfLines={2}
      >
        {name}
      </Text>
      {quantity && (
        <Text
          style={isRecommendation ? styles.recommendationQuantity : styles.quantity}
        >
          {quantity}
        </Text>
      )}
    </View>
  );
};

interface AttributesListProps {
  attributes: Array<{ id: string; label: string }>;
}

const AttributesList: React.FC<AttributesListProps> = ({ attributes }) => {
  return (
    <View style={styles.attributesContainer}>
      <Text style={styles.attributeText} numberOfLines={1}>
        {attributes.map(attr => attr.label).join(' • ')}
      </Text>
    </View>
  );
};

interface SuggestionPillsProps {
  pills: Array<{ id: string; label: string }>;
  onPillPress?: (pillId: string) => void;
}

const SuggestionPills: React.FC<SuggestionPillsProps> = ({ pills, onPillPress }) => {
  return (
    <View style={styles.pillsContainer}>
      {pills.map((pill) => (
        <TouchableOpacity
          key={pill.id}
          style={styles.pill}
          onPress={() => onPillPress?.(pill.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.pillText}>{pill.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

interface QuantityPriceRowProps {
  quantity: number;
  price?: number;
  originalPrice?: number;
  onQuantityChange?: (quantity: number) => void;
}

const QuantityPriceRow: React.FC<QuantityPriceRowProps> = ({
  quantity,
  price,
  originalPrice,
  onQuantityChange,
}) => {
  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange?.(quantity - 1);
    }
  };

  const handleIncrease = () => {
    onQuantityChange?.(quantity + 1);
  };

  return (
    <View style={styles.quantityPriceRow}>
      {/* Quantity Control */}
      <View style={styles.quantityControl}>
        <TouchableOpacity
          onPress={handleDecrease}
          style={styles.quantityButton}
          disabled={quantity <= 1}
        >
          <Minus size={16} color={Colors.fonts.buttonPrimary} />
        </TouchableOpacity>

        <Text style={styles.quantityValue}>{quantity}</Text>

        <TouchableOpacity
          onPress={handleIncrease}
          style={styles.quantityButton}
        >
          <Plus size={16} color={Colors.fonts.buttonPrimary} />
        </TouchableOpacity>
      </View>

      {/* Price Display */}
      <PriceDisplay price={price} originalPrice={originalPrice} />
    </View>
  );
};

interface PriceDisplayProps {
  price?: number;
  originalPrice?: number;
  isRecommendation?: boolean;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  originalPrice,
  isRecommendation = false,
}) => {
  return (
    <View style={styles.priceContainer}>
      {price !== undefined && (
        <Text style={isRecommendation ? styles.recommendationPrice : styles.price}>
          ${price}
        </Text>
      )}
      {originalPrice !== undefined && originalPrice > (price || 0) && (
        <Text
          style={
            isRecommendation
              ? styles.recommendationOriginalPrice
              : styles.originalPrice
          }
        >
          ${originalPrice}
        </Text>
      )}
    </View>
  );
};

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  // Main Container Styles
  container: {
    backgroundColor: Colors.backgrounds.normal,
    borderRadius: 4,
    padding: 12,
  },
  recommendationContainer: {
    backgroundColor: Colors.backgrounds.normal,
    borderRadius: 4,
    padding: 8,
  },
  selectedContainer: {
    borderWidth: 1,
    borderColor: Colors.accent.orange[200],
  },

  // Main Row
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  // Product Image
  image: {
    width: 32,
    height: 32,
    borderRadius: 4,
  },
  recommendationImage: {
    width: 32,
    height: 32,
    borderRadius: 4,
  },
  imagePlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 4,
    backgroundColor: Colors.neutrals[200],
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    width: 16,
    height: 16,
    backgroundColor: Colors.neutrals[400],
    borderRadius: 2,
  },

  // Product Info
  infoContainer: {
    flex: 1,
    gap: 2,
  },
  name: {
    ...Typography.b2Regular,
    color: Colors.text.brown[400],
  },
  recommendationName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 8,
    lineHeight: 11,
    color: Colors.text.brown[400],
  },
  quantity: {
    ...Typography.l2,
    color: Colors.accent.orange[200],
  },
  recommendationQuantity: {
    ...Typography.l3,
    color: Colors.accent.orange[200],
  },

  // Expand/Collapse Icon
  iconExpanded: {
    transform: [{ rotate: '180deg' }],
  },
  iconCollapsed: {
    transform: [{ rotate: '0deg' }],
  },

  // Add Button (Recommendation)
  addButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.accent.orange[200],
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Attributes
  attributesContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.neutrals[200],
  },
  attributeText: {
    ...Typography.l2,
    color: Colors.text.brown[300],
  },

  // Suggestion Pills
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  pill: {
    backgroundColor: hexToRgba(Colors.accent.blue[100], 0.5),
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 50,
  },
  pillText: {
    ...Typography.l3,
    color: Colors.text.brown[400],
  },

  // Quantity Control + Price Row
  quantityPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },

  // Quantity Control
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accent.orange[200],
    borderRadius: 4,
    gap: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  quantityButton: {
    padding: 4,
  },
  quantityValue: {
    ...Typography.b3,
    color: Colors.fonts.buttonPrimary,
    minWidth: 20,
    textAlign: 'center',
  },

  // Price Display
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  price: {
    ...Typography.b3,
    color: Colors.text.brown[400],
  },
  recommendationPrice: {
    fontFamily: 'Poppins-Medium',
    fontSize: 8,
    lineHeight: 11,
    color: Colors.text.brown[400],
  },
  originalPrice: {
    ...Typography.b3,
    color: hexToRgba(Colors.text.brown[400], 0.3),
    textDecorationLine: 'line-through',
  },
  recommendationOriginalPrice: {
    fontFamily: 'Poppins-Medium',
    fontSize: 8,
    lineHeight: 11,
    color: hexToRgba(Colors.text.brown[400], 0.3),
    textDecorationLine: 'line-through',
  },
});

export default memo(ProductItem);
