# Data Collection Requirements for Therapy Authoring Studio

This document outlines all data that needs to be collected to achieve the system requirements for the Interactive Therapy Authoring Studio with Marketplace.

## 1. USER AUTHENTICATION DATA

### For Tutors/Therapists:
- **Email** (required, unique)
- **Password** (hashed, required)
- **Full Name** (required)
- **Region** (required - North/South/East/West/Central/Northeast)
- **Phone Number** (optional)
- **Profile Picture/Avatar** (optional, image file)
- **Bio/Description** (optional, text)
- **Specialization** (array - Autism, Speech Therapy, ADHD, etc.)
- **Experience** (number - years)
- **Qualifications** (array - degrees, certifications)
- **RCI Certification Number** (optional, for verification)
- **Rating** (calculated from reviews)
- **Total Students** (number)
- **Total Activities Created** (number)
- **Verified Status** (boolean)
- **Account Created Date** (timestamp)
- **Last Login Date** (timestamp)

### For Family Users/Parents:
- **Email** (required, unique)
- **Password** (hashed, required)
- **Full Name** (required)
- **Phone Number** (optional)
- **Profile Picture/Avatar** (optional, image file)
- **Child Name** (optional)
- **Child Age** (optional, number)
- **Selected Tutor ID** (optional, foreign key)
- **Favorite Activities** (array of activity IDs)
- **Account Created Date** (timestamp)
- **Last Login Date** (timestamp)

## 2. ACTIVITY CONTENT DATA

### Activity Metadata:
- **Activity ID** (unique identifier)
- **Title** (required, text, multilingual)
- **Type** (required - matching/visual-schedule/aac-board/sequencing/social-story/yes-no-cards/phonics)
- **Language** (required - english/hindi/tamil/telugu/kannada/malayalam/bengali/marathi/gujarati/punjabi)
- **Description** (text, multilingual)
- **Author ID** (foreign key to User)
- **Created Date** (timestamp)
- **Updated Date** (timestamp)
- **Is Published** (boolean)
- **Tags** (array of strings)
- **Thumbnail Image** (image file/URL)
- **Preview URL** (optional, for marketplace)

### Canvas Elements (Activity Content):
- **Element ID** (unique)
- **Type** (image/text/shape/audio)
- **Position** (x, y coordinates - numbers)
- **Dimensions** (width, height - numbers)
- **Content** (text content or image URL/emoji)
- **Style Properties**:
  - Background Color (hex/rgb)
  - Border Color (hex/rgb)
  - Border Width (number)
  - Border Radius (number)
  - Font Size (number)
  - Font Color (hex/rgb)
- **Is Drop Zone** (boolean, for matching games)
- **Correct Answer** (string, for validation)

### Multilingual Text Data:
- **Text Block ID** (foreign key to Canvas Element)
- **Language Code** (english/hindi/tamil/etc.)
- **Translated Text** (text in native script)
- **Transliteration** (optional, romanized version)
- **Audio File URL** (for TTS, per language)

## 3. CULTURAL ASSET LIBRARY DATA

### Asset Metadata:
- **Asset ID** (unique identifier)
- **Name** (English, required)
- **Name in Hindi** (optional)
- **Name in Other Languages** (optional, array)
- **Category** (food/clothing/places/routines/emotions/transport/family/nature/objects)
- **Image URL** (emoji/image file/vector graphic)
- **Tags** (array of strings for searchability)
- **Region Relevance** (array - which regions this asset is relevant to)
- **Age Appropriateness** (min/max age numbers)
- **Therapy Goal Tags** (communication/cognitive/emotional-regulation/etc.)
- **Usage Count** (number, for popularity)

### Asset Categories with Examples:
- **Food**: roti, idli, dosa, dal, rice, mango, etc.
- **Clothing**: saree, kurta, dhoti, salwar, etc.
- **Places**: home, school, temple, anganwadi, market, etc.
- **Routines**: brushing, prayer, school bus, meal times, etc.
- **Emotions**: happy, sad, angry, scared (in Indian cultural context)
- **Transport**: auto, bus, train, bicycle, etc.
- **Family**: mother, father, grandmother, grandfather, etc.
- **Nature**: sun, moon, rain, flowers, trees, etc.
- **Objects**: book, pencil, ball, doll, phone, etc.

## 4. MARKETPLACE DATA

### Activity Listing:
- **Activity ID** (foreign key to Activity)
- **Price** (number, in INR)
- **Pricing Model** (free/paid/institutional)
- **Purchase Count** (number)
- **Rating** (number, 0-5, calculated from reviews)
- **Review Count** (number)
- **Age Range** (min/max numbers)
- **Therapy Goals** (array - communication/cognitive/emotional-regulation/etc.)
- **Diagnosis Tags** (array - autism/ADHD/down-syndrome/etc.)
- **Published Date** (timestamp)
- **Last Updated** (timestamp)
- **Version Number** (for versioning)

### Reviews:
- **Review ID** (unique identifier)
- **Activity ID** (foreign key)
- **User ID** (foreign key to User)
- **User Name** (for display)
- **Rating** (number, 1-5)
- **Comment** (text)
- **Created Date** (timestamp)
- **Helpful Count** (number, for review quality)

### Purchases:
- **Purchase ID** (unique identifier)
- **User ID** (foreign key)
- **Activity ID** (foreign key)
- **Price Paid** (number)
- **Purchase Date** (timestamp)
- **Payment Method** (optional)
- **Transaction ID** (optional)

### Revenue Sharing:
- **Transaction ID** (unique)
- **Tutor ID** (foreign key)
- **Activity ID** (foreign key)
- **Revenue Amount** (number)
- **Platform Fee** (number)
- **Tutor Payout** (number)
- **Date** (timestamp)
- **Status** (pending/processed/failed)

## 5. TEMPLATE DATA

### Template Metadata:
- **Template ID** (unique identifier)
- **Name** (text)
- **Type** (activity type)
- **Description** (text)
- **Thumbnail** (image/emoji)
- **Elements** (array of Canvas Elements)
- **Usage Count** (number)
- **Is Default** (boolean)

## 6. USAGE ANALYTICS DATA

### Activity Usage:
- **Session ID** (unique identifier)
- **User ID** (foreign key)
- **Activity ID** (foreign key)
- **Start Time** (timestamp)
- **End Time** (timestamp)
- **Duration** (number, seconds)
- **Completion Status** (completed/incomplete/abandoned)
- **Errors Made** (number)
- **Correct Answers** (number)
- **Total Attempts** (number)
- **Device Type** (mobile/tablet/desktop)
- **Language Used** (language code)

### Progress Tracking:
- **Progress ID** (unique identifier)
- **User ID** (foreign key)
- **Activity ID** (foreign key)
- **Completion Percentage** (number, 0-100)
- **Last Played** (timestamp)
- **Times Completed** (number)
- **Best Score** (number, if applicable)
- **Average Time** (number, seconds)

### Engagement Heatmaps:
- **Heatmap ID** (unique identifier)
- **Activity ID** (foreign key)
- **Element ID** (foreign key to Canvas Element)
- **Interaction Count** (number)
- **Average Time Spent** (number, seconds)
- **Date Range** (start/end timestamps)

## 7. EXPORT DATA

### Export History:
- **Export ID** (unique identifier)
- **User ID** (foreign key)
- **Activity ID** (foreign key)
- **Export Format** (PDF/HTML/APK/audio/flashcards)
- **Export Date** (timestamp)
- **File Size** (number, bytes)
- **Download Count** (number)

### Generated Files:
- **File ID** (unique identifier)
- **Export ID** (foreign key)
- **File Type** (PDF/HTML/audio/image)
- **File URL** (storage location)
- **File Size** (number, bytes)
- **Created Date** (timestamp)
- **Expiry Date** (optional, for temporary files)

## 8. AUDIO DATA

### Text-to-Speech (TTS):
- **Audio ID** (unique identifier)
- **Text Content** (original text)
- **Language** (language code)
- **Voice Type** (child-friendly/male/female)
- **Speed** (number, 0.5-2.0)
- **Pitch** (number, 0.5-2.0)
- **Audio File URL** (storage location)
- **File Size** (number, bytes)
- **Duration** (number, seconds)
- **Generated Date** (timestamp)

### Recorded Audio:
- **Recording ID** (unique identifier)
- **User ID** (foreign key - therapist/parent)
- **Activity ID** (foreign key)
- **Element ID** (foreign key, if attached to element)
- **Audio File URL** (storage location)
- **File Size** (number, bytes)
- **Duration** (number, seconds)
- **Recording Date** (timestamp)
- **Is Public** (boolean, for sharing)

## 9. OFFLINE SYNC DATA

### Sync Queue:
- **Sync ID** (unique identifier)
- **User ID** (foreign key)
- **Entity Type** (activity/asset/user/etc.)
- **Entity ID** (foreign key)
- **Action** (create/update/delete)
- **Data** (JSON blob of changes)
- **Created Date** (timestamp)
- **Synced Date** (timestamp, null if pending)
- **Status** (pending/synced/failed)

### Local Storage Metadata:
- **Device ID** (unique identifier)
- **User ID** (foreign key)
- **Last Sync Date** (timestamp)
- **Stored Activities** (array of activity IDs)
- **Storage Used** (number, bytes)
- **Device Type** (mobile/tablet/desktop)

## 10. REGION & LANGUAGE DATA

### Regions:
- **Region Code** (north/south/east/west/central/northeast)
- **Region Name** (text)
- **States** (array of state names)
- **Primary Languages** (array of language codes)
- **Cultural Context Notes** (text, optional)

### Languages:
- **Language Code** (english/hindi/tamil/etc.)
- **Language Name** (English name)
- **Native Name** (text in native script)
- **Script Type** (devanagari/tamil/telugu/etc.)
- **RTL Support** (boolean, for Urdu)
- **Font Family** (for proper rendering)

## 11. ACCESSIBILITY DATA

### User Preferences:
- **User ID** (foreign key)
- **High Contrast Mode** (boolean)
- **Large Text Size** (boolean)
- **Dyslexia-Friendly Font** (boolean)
- **Screen Reader Enabled** (boolean)
- **Reduced Motion** (boolean)
- **Color Blindness Mode** (none/protanopia/deuteranopia/tritanopia)

## 12. NOTIFICATION DATA

### Notifications:
- **Notification ID** (unique identifier)
- **User ID** (foreign key)
- **Type** (activity-shared/new-content/reminder/etc.)
- **Title** (text)
- **Message** (text)
- **Link** (optional, URL)
- **Read Status** (boolean)
- **Created Date** (timestamp)

## DATA STORAGE REQUIREMENTS

### File Storage:
- **Images**: PNG/JPEG/SVG (thumbnails, assets, activity previews)
- **Audio**: MP3/WAV (TTS, recordings)
- **Documents**: PDF (exported activities)
- **Videos**: MP4 (optional, for future video support)

### Database:
- **Primary Database**: PostgreSQL/MySQL (for structured data)
- **NoSQL**: MongoDB (for flexible content like canvas elements)
- **Cache**: Redis (for session data, frequently accessed content)
- **File Storage**: AWS S3/Cloudinary (for images, audio, documents)

### Estimated Storage per User:
- **Tutor**: ~500MB (activities, assets, audio)
- **Family**: ~100MB (downloaded activities, progress data)

## DATA PRIVACY & SECURITY

### Required:
- **GDPR Compliance**: User data deletion, consent management
- **Data Encryption**: At rest and in transit
- **PII Protection**: Encrypt sensitive user information
- **Children's Privacy**: COPPA compliance for child data
- **Audit Logs**: Track all data access and modifications

---

## SUMMARY CHECKLIST

✅ User authentication (tutors & families)
✅ Activity content (canvas elements, multilingual text)
✅ Cultural asset library (images, metadata)
✅ Marketplace listings (pricing, reviews, purchases)
✅ Templates (pre-built activity structures)
✅ Usage analytics (sessions, progress, engagement)
✅ Export data (formats, history)
✅ Audio data (TTS, recordings)
✅ Offline sync (queue, local storage)
✅ Region & language metadata
✅ Accessibility preferences
✅ Notifications

All data should be collected with proper validation, sanitization, and security measures in place.

