# **Property Saving Functionality: Complete Theory & Flow**

## **1. System Overview**

This enhancement adds the ability for users to:

1. Save properties to their account for future reference
2. View all saved properties in a dedicated section
3. Remove properties from their saved list

---

## **2. Data Model Updates**

### **2.1. New Schema Components**

| Collection   | New Fields/Relationships                                     |
| ------------ | ------------------------------------------------------------ |
| **User**     | `savedProperties: [ObjectId]` (Array of property references) |
| **Property** | (No changes needed)                                          |

### **2.2. Relationship Diagram**

```plaintext
USER COLLECTION                          PROPERTY COLLECTION
+------------------+                     +---------------------+
| _id: ObjectId    | <——-—[Array]———-— | _id: ObjectId       |
| savedProperties: |                     | title: String       |
| [propertyId1,    |                     | ...other fields     |
|  propertyId2]    |                     +---------------------+
+------------------+
```

---

## **3. Frontend Components**

### **3.1. UI Elements**

1. **Save Button**:

   - Heart icon ♡ on property cards (outline = unsaved, filled = saved)
   - Toggle state on click
   - Tooltip: "Save to favorites"

2. **Saved Properties Page**:
   - Accessible via user profile dropdown
   - Displays saved properties in grid layout
   - Remove option for each property

### **3.2. User Interactions**

1. **Saving a Property**:

   - Click ♡ on any property card/detail page
   - Immediate visual feedback (icon fill + animation)
   - Optimistic UI update (assumes success)

2. **Viewing Saved Properties**:

   - Navigate to "/user/saved"
   - Shows loading state while fetching
   - Displays all saved properties

3. **Removing a Property**:
   - Click "×" or unfill ♡ icon
   - Property disappears from list

---

## **4. Backend API Endpoints**

### **4.1. Save Property**

- **Route**: `POST /api/user/save-property`
- **Body**: `{ propertyId: "abc123" }`
- **Headers**: `Authorization: Bearer <JWT>`
- **Response**:
  - Success: `200 OK` with updated user
  - Error: `404` if property doesn't exist

### **4.2. Get Saved Properties**

- **Route**: `GET /api/user/saved-properties`
- **Response**:
  ```json
  {
    "savedProperties": [
      { full property object },
      { full property object }
    ]
  }
  ```

### **4.3. Remove Saved Property**

- **Route**: `DELETE /api/user/saved-properties/:propertyId`
- **Response**:
  - Success: `200 OK` with updated user
  - Error: `404` if property not in saved list

---

## **5. Complete System Flow**

### **5.1. Saving a Property**

```plaintext
+-------------------+       +-------------------+       +-------------------+
|   User (UI)       |       |   Frontend        |       |   Backend         |
+-------------------+       +-------------------+       +-------------------+
       |                           |                           |
       | 1. Clicks Save Button     |                           |
       |-------------------------->|                           |
       |                           |                           |
       | 2. Immediate UI Update    |                           |
       |    (Optimistic)            |                           |
       |                           |                           |
       |                           | 3. POST /user/save-property
       |                           |    {propertyId} + JWT      |
       |                           |-------------------------->|
       |                           |                           |
       |                           | 4. Add to User's          |
       |                           |    savedProperties array   |
       |                           |<--------------------------|
       |                           |                           |
       | 5. Confirm Update or      |                           |
       |    Revert if error         |                           |
       |<--------------------------|                           |
```

### **5.2. Viewing Saved Properties**

```plaintext
+-------------------+       +-------------------+       +-------------------+
|   User (UI)       |       |   Frontend        |       |   Backend         |
+-------------------+       +-------------------+       +-------------------+
       |                           |                           |
       | 1. Navigates to /saved    |                           |
       |-------------------------->|                           |
       |                           |                           |
       | 2. Show Loading State     |                           |
       |                           |                           |
       |                           | 3. GET /user/saved-props  |
       |                           |-------------------------->|
       |                           |                           |
       |                           | 4. Lookup all properties  |
       |                           |    in User's saved array  |
       |                           |<--------------------------|
       |                           |                           |
       | 5. Render Property Grid   |                           |
       |<--------------------------|                           |
```

---

## **6. Key Considerations**

### **6.1. Performance Optimizations**

- **Client-Side Cache**: Store saved property IDs to minimize API calls
- **Bulk Fetching**: Get all saved properties in one request
- **Pagination**: For users with 100+ saved properties

### **6.2. Security Measures**

- **Ownership Verification**: Ensure users can only modify their own saved list
- **Rate Limiting**: Prevent abuse of save/unsave actions

### **6.3. Edge Cases**

- **Property Deletion**: Automatically remove references to deleted properties
- **Concurrent Modifications**: Handle cases where same property is saved/unsaved rapidly

---

## **7. UI/UX Enhancements**

1. **Visual Feedback**:

   - Micro-interactions when saving (heart pulse animation)
   - Toast notifications for failures

2. **Empty States**:

   - Friendly illustration + "You haven't saved any properties yet"
   - CTA to browse properties

3. **Organization**:
   - Filtering/sorting options in saved properties view
   - Folders/categories (future enhancement)

---

## **8. Conclusion**

This functionality provides:
✅ **Personalized experience** through property saving  
✅ **Quick access** to favorite listings  
✅ **Seamless integration** with existing flows

**Next Steps**:

- Add sharing saved properties
- Implement saved property notifications (price drops)
- Enable notes/tags on saved properties

Would you like to explore the notification system for saved properties next? 🔔
