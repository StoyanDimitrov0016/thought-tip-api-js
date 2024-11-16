# Thought Tip API (JS)

Thought Tip API (JS) is the backend powering the **Thought Tip Platform**, designed to handle the creation, retrieval, and management of articles, users, comments, and replies. This API enables users to easily navigate and organize content through a **strong segmentation system**, enhancing both user experience and content discoverability.

---

## Features

### Core Entities

The API provides full CRUD functionality and robust interaction capabilities for the following core entities:

1. **Articles**

   - Articles are categorized using segmentation entries (categories, topics, and tags).
   - Designed for flexibility in content retrieval and filtering.

2. **Users**

   - Includes authentication and role-based access for users.
   - Support for user-specific operations such as article creation and management.

3. **Comments**

   - Attach to articles for user discussions.
   - Interactive features include liking and replies.

4. **Replies**
   - Nested replies to comments, enabling threaded discussions.

---

### Segmentation System

The API provides a **strong segmentation system** to classify and filter content effectively:

1. **Categories**

   - High-level segmentation to organize articles.
   - Restricted to administrative modification.

2. **Topics**

   - Nested under categories, offering more granularity.

3. **Tags**
   - Flexible, user-searchable tags associated with specific topics.

Each article is classified into this segmentation system, enabling intuitive content discovery and streamlined search operations.

---

### Key Features

1. **Search with Segmentation**

   - Users can search articles by category, topic, and tag.
   - Optimized for fast and relevant filtering.

2. **Response Management System**

   - Standardized and extensible response classes ensure consistent API responses.
   - Responses include metadata and interaction details (e.g., whether the user has liked or owns an entry).

3. **Pagination & Metadata**

   - Pagination is implemented with metadata like `page`, `size`, `totalPages`, and `hasNextPage`.
   - Metadata includes collection-specific details, links, and entry count.

4. **Interaction System**

   - Supports operations like liking, commenting, and managing ownership.
   - Interaction flags indicate user-specific properties (e.g., `isOwner`, `isLiked`).

5. **Role-Based Access**
   - Restricted, self-managed, and community collections allow differentiated interaction levels.
   - Administrative control for segmentation entries ensures platform integrity.

---

## Folder Structure

### `/lib`

- **Base Classes**: Foundation for response handling.
- **Main Classes**: `ErrorResponse` and `SuccessResponse` for response management.
- **Extensions**: Specific success responses (`OkSingleResponse`, `OkListResponse`, `OkPaginatedResponse`, etc.).
- **Helpers**: Utility functions for creating links, metadata, and pagination.

### `/services`

- Business logic for each core entity and segmentation.

### `/controllers`

- API endpoints for users, articles, comments, replies, and segmentation.

### `/models`

- MongoDB schemas for all entities, including articles, users, comments, replies, categories, topics, and tags.

---

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB
- Environment variables configured for:
  - Database connection
  - JWT authentication
  - Node environment (development/production)

### Installation

```bash
git clone https://github.com/your-repo/thought-tip-api-js.git
cd thought-tip-api-js
npm install
```
