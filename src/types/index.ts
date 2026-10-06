export type Category = 
  | 'all'
  | 'baseball'
  | 'basketball'
  | 'soccer'
  | 'pokemon'
  | 'mtg'
  | 'onepiece'
  | 'other';

export type TradeType = 'all' | 'sale' | 'trade' | 'giveaway';

export type GradingCompany = 'all' | 'psa' | 'bgs' | 'cgc' | 'raw';

export type CardCondition = 'all' | 'nm' | 'lp' | 'mp' | 'damaged';

export type DeliveryMethod = 'meetup' | 'delivery';

export type ListingStatus = 'available' | 'reserved' | 'completed' | 'withdrawn';

export interface CardItem {
  id: string;
  title: string;
  category: Category;
  categoryName: string;
  categoryEmoji: string;
  player: string;
  manufacturer: string;
  setName: string;
  year?: string;
  cardNumber?: string;
  serialNumber?: string;
  parallel?: string;
  
  // Grading & Condition
  isGraded: boolean;
  gradingCompany: 'PSA' | 'BGS' | 'CGC' | 'SGC' | 'BRG' | 'RAW';
  gradeScore?: string; // e.g. "10", "9.5", "9", "Gem Mint 10"
  certNumber?: string;
  condition: 'NM' | 'LP' | 'MP' | 'Damaged';
  conditionLabel: string;
  conditionDescription: string;
  
  // Pricing & Trade
  tradeType: 'sale' | 'trade' | 'giveaway';
  price: number; // 0 for giveaway, null or specific for trade
  originalPrice?: number;
  discountRate?: number;
  marketPriceRange?: string; // e.g. "₩430,000 ~ ₩480,000"
  tradeWishCondition?: string; // for trade
  
  // Delivery
  meetupAvailable: boolean;
  meetupLocation?: string;
  deliveryAvailable: boolean;
  deliveryFee?: number;
  deliveryNote?: string;
  
  // Images
  frontImage?: string;
  backImage?: string;
  labelImage?: string;
  cornerImage?: string;
  additionalImages?: string[];
  
  // Slab visual simulation config
  slabHeaderColor?: string;
  slabTitle?: string;
  slabSubtitle?: string;
  slabNumber?: string;
  slabAccentText?: string;
  cardArtworkTheme?: string;
  
  // Meta & Stats
  status: ListingStatus;
  likes: number;
  isLiked?: boolean;
  views: number;
  createdAt: string;
  
  // Seller
  seller: {
    id: string;
    nickname: string;
    avatarUrl?: string;
    verified: boolean;
    joinedDate: string;
    region: string;
    completedTrades: number;
    activeListings: number;
    trustScore: number;
    mannerScore: string;
  };
}

export interface ChatMessage {
  id: string;
  inquiryId: string;
  senderId: string;
  senderNickname: string;
  text: string;
  createdAt: string;
  read: boolean;
  isSystemEvent?: boolean;
  eventType?: 'reservation' | 'completion_request' | 'completion_confirmed';
  eventPayload?: {
    dateTime?: string;
    location?: string;
    agreedPrice?: number;
  };
}

export interface Inquiry {
  id: string;
  listingId: string;
  listing: {
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    discountRate?: number;
    status: ListingStatus;
    frontImage?: string;
    gradingCompany: string;
    gradeScore?: string;
    meetupLocation?: string;
  };
  counterparty: {
    id: string;
    nickname: string;
    avatarUrl?: string;
    rating: number;
    responseRate: number;
    online: boolean;
    verified: boolean;
  };
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  tradeType: 'sale' | 'trade' | 'giveaway';
  tradeStatus: 'inquiry' | 'reserved' | 'completed';
  tradeMethod: string;
  reservedDetails?: {
    time: string;
    place: string;
  };
}

export interface FilterState {
  searchQuery: string;
  category: Category;
  tradeType: TradeType;
  gradingCompany: GradingCompany;
  condition: CardCondition;
  minPrice: number | '';
  maxPrice: number | '';
  meetupOnly: boolean;
  deliveryOnly: boolean;
  sortBy: 'latest' | 'likes' | 'price_asc' | 'price_desc' | 'grade_desc';
  viewMode: 'grid' | 'list';
}
