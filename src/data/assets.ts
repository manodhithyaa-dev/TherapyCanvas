import { Asset, Template } from '@/types/therapy';

export const indianAssets: Asset[] = [
  // Food
  { id: 'food-1', name: 'Roti', nameHindi: 'रोटी', category: 'food', imageUrl: '🫓', tags: ['food', 'bread', 'meal'] },
  { id: 'food-2', name: 'Rice', nameHindi: 'चावल', category: 'food', imageUrl: '🍚', tags: ['food', 'grain', 'meal'] },
  { id: 'food-3', name: 'Dosa', nameHindi: 'डोसा', category: 'food', imageUrl: '🥞', tags: ['food', 'breakfast', 'south'] },
  { id: 'food-4', name: 'Idli', nameHindi: 'इडली', category: 'food', imageUrl: '⚪', tags: ['food', 'breakfast', 'south'] },
  { id: 'food-5', name: 'Dal', nameHindi: 'दाल', category: 'food', imageUrl: '🥣', tags: ['food', 'lentils', 'meal'] },
  { id: 'food-6', name: 'Apple', nameHindi: 'सेब', category: 'food', imageUrl: '🍎', tags: ['food', 'fruit'] },
  { id: 'food-7', name: 'Banana', nameHindi: 'केला', category: 'food', imageUrl: '🍌', tags: ['food', 'fruit'] },
  { id: 'food-8', name: 'Mango', nameHindi: 'आम', category: 'food', imageUrl: '🥭', tags: ['food', 'fruit', 'indian'] },
  
  // Clothing
  { id: 'cloth-1', name: 'Shirt', nameHindi: 'कमीज़', category: 'clothing', imageUrl: '👕', tags: ['clothing', 'upper'] },
  { id: 'cloth-2', name: 'Pants', nameHindi: 'पैंट', category: 'clothing', imageUrl: '👖', tags: ['clothing', 'lower'] },
  { id: 'cloth-3', name: 'Dress', nameHindi: 'फ्रॉक', category: 'clothing', imageUrl: '👗', tags: ['clothing', 'girls'] },
  { id: 'cloth-4', name: 'Shoes', nameHindi: 'जूते', category: 'clothing', imageUrl: '👟', tags: ['clothing', 'footwear'] },
  
  // Routines
  { id: 'routine-1', name: 'Wake Up', nameHindi: 'जागना', category: 'routines', imageUrl: '🌅', tags: ['routine', 'morning'] },
  { id: 'routine-2', name: 'Brush Teeth', nameHindi: 'दांत साफ़', category: 'routines', imageUrl: '🪥', tags: ['routine', 'hygiene'] },
  { id: 'routine-3', name: 'Bath', nameHindi: 'नहाना', category: 'routines', imageUrl: '🛁', tags: ['routine', 'hygiene'] },
  { id: 'routine-4', name: 'Eat Breakfast', nameHindi: 'नाश्ता', category: 'routines', imageUrl: '🍳', tags: ['routine', 'food'] },
  { id: 'routine-5', name: 'Go to School', nameHindi: 'स्कूल जाना', category: 'routines', imageUrl: '🏫', tags: ['routine', 'school'] },
  { id: 'routine-6', name: 'Study', nameHindi: 'पढ़ाई', category: 'routines', imageUrl: '📚', tags: ['routine', 'school'] },
  { id: 'routine-7', name: 'Play', nameHindi: 'खेलना', category: 'routines', imageUrl: '⚽', tags: ['routine', 'fun'] },
  { id: 'routine-8', name: 'Sleep', nameHindi: 'सोना', category: 'routines', imageUrl: '😴', tags: ['routine', 'night'] },
  
  // Emotions
  { id: 'emo-1', name: 'Happy', nameHindi: 'खुश', category: 'emotions', imageUrl: '😊', tags: ['emotion', 'positive'] },
  { id: 'emo-2', name: 'Sad', nameHindi: 'उदास', category: 'emotions', imageUrl: '😢', tags: ['emotion', 'negative'] },
  { id: 'emo-3', name: 'Angry', nameHindi: 'गुस्सा', category: 'emotions', imageUrl: '😠', tags: ['emotion', 'negative'] },
  { id: 'emo-4', name: 'Scared', nameHindi: 'डर', category: 'emotions', imageUrl: '😨', tags: ['emotion', 'negative'] },
  { id: 'emo-5', name: 'Surprised', nameHindi: 'हैरान', category: 'emotions', imageUrl: '😲', tags: ['emotion'] },
  { id: 'emo-6', name: 'Love', nameHindi: 'प्यार', category: 'emotions', imageUrl: '🥰', tags: ['emotion', 'positive'] },
  
  // Family
  { id: 'fam-1', name: 'Mother', nameHindi: 'माँ', category: 'family', imageUrl: '👩', tags: ['family', 'parent'] },
  { id: 'fam-2', name: 'Father', nameHindi: 'पापा', category: 'family', imageUrl: '👨', tags: ['family', 'parent'] },
  { id: 'fam-3', name: 'Grandmother', nameHindi: 'दादी', category: 'family', imageUrl: '👵', tags: ['family', 'grandparent'] },
  { id: 'fam-4', name: 'Grandfather', nameHindi: 'दादा', category: 'family', imageUrl: '👴', tags: ['family', 'grandparent'] },
  { id: 'fam-5', name: 'Sister', nameHindi: 'बहन', category: 'family', imageUrl: '👧', tags: ['family', 'sibling'] },
  { id: 'fam-6', name: 'Brother', nameHindi: 'भाई', category: 'family', imageUrl: '👦', tags: ['family', 'sibling'] },
  
  // Places
  { id: 'place-1', name: 'Home', nameHindi: 'घर', category: 'places', imageUrl: '🏠', tags: ['place', 'living'] },
  { id: 'place-2', name: 'School', nameHindi: 'स्कूल', category: 'places', imageUrl: '🏫', tags: ['place', 'education'] },
  { id: 'place-3', name: 'Park', nameHindi: 'पार्क', category: 'places', imageUrl: '🏞️', tags: ['place', 'outdoor'] },
  { id: 'place-4', name: 'Temple', nameHindi: 'मंदिर', category: 'places', imageUrl: '🛕', tags: ['place', 'religious'] },
  { id: 'place-5', name: 'Market', nameHindi: 'बाज़ार', category: 'places', imageUrl: '🏪', tags: ['place', 'shopping'] },
  
  // Transport
  { id: 'trans-1', name: 'Auto', nameHindi: 'ऑटो', category: 'transport', imageUrl: '🛺', tags: ['transport', 'vehicle'] },
  { id: 'trans-2', name: 'Bus', nameHindi: 'बस', category: 'transport', imageUrl: '🚌', tags: ['transport', 'vehicle'] },
  { id: 'trans-3', name: 'Train', nameHindi: 'ट्रेन', category: 'transport', imageUrl: '🚃', tags: ['transport', 'vehicle'] },
  { id: 'trans-4', name: 'Bicycle', nameHindi: 'साइकिल', category: 'transport', imageUrl: '🚲', tags: ['transport', 'vehicle'] },
  { id: 'trans-5', name: 'Car', nameHindi: 'कार', category: 'transport', imageUrl: '🚗', tags: ['transport', 'vehicle'] },
  
  // Nature
  { id: 'nat-1', name: 'Sun', nameHindi: 'सूरज', category: 'nature', imageUrl: '☀️', tags: ['nature', 'weather'] },
  { id: 'nat-2', name: 'Moon', nameHindi: 'चाँद', category: 'nature', imageUrl: '🌙', tags: ['nature', 'weather'] },
  { id: 'nat-3', name: 'Rain', nameHindi: 'बारिश', category: 'nature', imageUrl: '🌧️', tags: ['nature', 'weather'] },
  { id: 'nat-4', name: 'Flower', nameHindi: 'फूल', category: 'nature', imageUrl: '🌸', tags: ['nature', 'plant'] },
  { id: 'nat-5', name: 'Tree', nameHindi: 'पेड़', category: 'nature', imageUrl: '🌳', tags: ['nature', 'plant'] },
  
  // Objects
  { id: 'obj-1', name: 'Book', nameHindi: 'किताब', category: 'objects', imageUrl: '📕', tags: ['object', 'school'] },
  { id: 'obj-2', name: 'Pencil', nameHindi: 'पेंसिल', category: 'objects', imageUrl: '✏️', tags: ['object', 'school'] },
  { id: 'obj-3', name: 'Ball', nameHindi: 'गेंद', category: 'objects', imageUrl: '⚽', tags: ['object', 'play'] },
  { id: 'obj-4', name: 'Doll', nameHindi: 'गुड़िया', category: 'objects', imageUrl: '🪆', tags: ['object', 'play'] },
  { id: 'obj-5', name: 'Phone', nameHindi: 'फ़ोन', category: 'objects', imageUrl: '📱', tags: ['object', 'device'] },
];

export const activityTemplates: Template[] = [
  {
    id: 'matching-1',
    name: 'Picture Matching',
    type: 'matching',
    description: 'Match pictures with their pairs - drag and drop activity',
    thumbnail: '🎯',
    elements: [],
  },
  {
    id: 'schedule-1',
    name: 'Daily Routine',
    type: 'visual-schedule',
    description: 'Visual schedule for daily activities',
    thumbnail: '📅',
    elements: [],
  },
  {
    id: 'aac-1',
    name: 'Basic Needs AAC',
    type: 'aac-board',
    description: 'Communication board for basic needs',
    thumbnail: '💬',
    elements: [],
  },
  {
    id: 'sequence-1',
    name: 'Story Sequencing',
    type: 'sequencing',
    description: 'Arrange pictures in correct order',
    thumbnail: '🔢',
    elements: [],
  },
  {
    id: 'social-1',
    name: 'Social Story',
    type: 'social-story',
    description: 'Create social stories with pictures and text',
    thumbnail: '📖',
    elements: [],
  },
  {
    id: 'yesno-1',
    name: 'Yes/No Cards',
    type: 'yes-no-cards',
    description: 'Simple yes/no response cards',
    thumbnail: '✅',
    elements: [],
  },
];

export const languages = [
  { code: 'english', name: 'English', nativeName: 'English' },
  { code: 'hindi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'tamil', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'telugu', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'kannada', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'malayalam', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'bengali', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'marathi', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'gujarati', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'punjabi', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
];
