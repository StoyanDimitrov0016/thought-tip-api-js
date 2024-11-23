# API Response Documentation

This file serves as a comprehensive reference for understanding the standardized response structure used in the **Thought Tip API (JS)**. It provides details on the response formats, metadata, and examples, helping developers effectively integrate with the API.

For an overview of the entire project, refer to the [README.md](../README.md).

---

## Table of Contents

1. [Overview](#overview)
2. [Response Structure](#response-structure)
3. [Response Formats](#response-formats)
   - [Single Response](#single-response)
   - [List Response](#list-response)
   - [Paginated Response](#paginated-response)
   - [Error Response](#error-response)
4. [Metadata Details](#metadata-details)
   - [List Metadata](#list-metadata)
   - [Paginated Metadata](#paginated-metadata)
5. [Examples](#examples)
6. [Helper Functions](#helper-functions)

---

## Overview

The **Thought Tip API (JS)** adheres to a standardized response format across all endpoints. By structuring responses consistently, the API simplifies client-side integration, reduces potential errors, and ensures predictability for developers.

While the response formats are standardized into four core types—`single`, `list`, `paginated`, and `error`—the inclusion of dynamic metadata ensures that responses remain flexible and informative. This design enables advanced functionality like pagination, navigational links, and resource context without adding complexity to the core API structure.

### Goals of Standardized Responses

- **Consistency**: A predictable structure across endpoints reduces the need for custom client-side logic.
- **Flexibility**: Metadata adds contextual information like pagination and hypermedia links, enhancing usability.
- **Scalability**: The structure supports expanding API features (e.g., adding new metadata fields) without breaking existing functionality.

## Overview

Every API response follows a standardized format to ensure consistency and predictability. The response structure includes:

- A **status** code indicating the result of the request.
- A **success** boolean flag.
- A **format** that defines the type of response (e.g., `single`, `list`, `paginated`, `error`).
- Metadata providing additional information about the response.

## Response Formats

The **Thought Tip API (JS)** uses four standardized response formats to handle different types of API responses: `single`, `list`, `paginated`, and `error`. Each format is designed to address specific use cases while maintaining a consistent structure across endpoints. Here's an explanation of each format, its purpose, and when it should be used.

---

### Overview of Formats

#### 1. **Single Response**

- **Purpose**: Designed for endpoints that return a single resource, such as retrieving the details of a specific article, user, or category.
- **Use Case**: Use this format when the client requests a single resource by its identifier or a unique query parameter.
- **Key Characteristics**:
  - The `data` field contains a single object representing the resource.
  - Includes optional `metadata` for additional context (e.g., navigational links).

#### 2. **List Response**

- **Purpose**: Intended for endpoints that return a non-paginated list of resources.
- **Use Case**: Use this format for smaller datasets where all items can be returned in a single response (e.g., retrieving all categories).
- **Key Characteristics**:
  - The `data` field contains an array of objects, each representing a resource.
  - Includes `metadata` with the total count of resources and relevant links.
  - No pagination details are included.

#### 3. **Paginated Response**

- **Purpose**: Used for endpoints that return a large collection of resources split across multiple pages.
- **Use Case**: Use this format when the dataset is too large to return in a single response (e.g., fetching articles, comments, or users).
- **Key Characteristics**:
  - The `data` field contains an array of objects for the current page.
  - Includes `metadata` with pagination details such as `page`, `size`, `totalPages`, `hasNext`, and `hasPrevious`.

#### 4. **Error Response**

- **Purpose**: Handles error cases where the request cannot be fulfilled due to client-side or server-side issues.
- **Use Case**: Use this format for all errors, including validation errors, authentication failures, and server errors.
- **Key Characteristics**:
  - Does not include a `data` field.
  - Includes an `errors` array with details about the issue(s).
  - May include a `callstack` field in development mode for debugging.

---

### Differences Between Formats

| Format      | Use Case                   | Key Feature                         | Includes `metadata`?    | Includes Pagination? |
| ----------- | -------------------------- | ----------------------------------- | ----------------------- | -------------------- |
| `single`    | Retrieve a single resource | `data` contains one resource        | Optional                | No                   |
| `list`      | Retrieve all resources     | `data` contains an array of items   | Yes (with `totalCount`) | No                   |
| `paginated` | Retrieve large collections | `data` contains items for one page  | Yes (with pagination)   | Yes                  |
| `error`     | Handle request failures    | Includes `errors` array for details | No                      | No                   |

---

### Choosing the Right Format

Here are some guidelines for selecting the appropriate response format for an endpoint:

- **Use `single`**:

  - When a client requests a specific resource by its unique identifier (e.g., `/users/:id` or `/articles/:slug`).
  - For actions like viewing an individual user profile or fetching article details.

- **Use `list`**:

  - When a client requests all resources in a collection, and the dataset is small enough to return in one response (e.g., `/categories` or `/tags`).

- **Use `paginated`**:

  - When the collection is large, and returning all resources in one response would be inefficient (e.g., `/articles?page=1&size=10` or `/comments?page=2&size=20`).
  - This format enables the client to load resources incrementally.

- **Use `error`**:
  - When a request cannot be completed successfully due to invalid input, unauthorized access, or server errors.
  - This format helps the client identify and resolve the issue.

---

## Response Structure

All responses inherit from the `BaseResponse` class. This defines the following properties:

| Property    | Type      | Description                                                               |
| ----------- | --------- | ------------------------------------------------------------------------- |
| `status`    | `number`  | The HTTP status code of the response.                                     |
| `success`   | `boolean` | Indicates whether the request was successful (`true`) or not (`false`).   |
| `timestamp` | `string`  | ISO 8601 timestamp of when the response was generated.                    |
| `type`      | `string`  | Describes the type of response based on the HTTP status code.             |
| `format`    | `string`  | The format of the response (`single`, `list`, `paginated`, `error`).      |
| `title`     | `string`  | A brief, human-readable summary of the response.                          |
| `detail`    | `string`  | A detailed explanation of the response or error.                          |
| `instance`  | `string`  | An optional identifier for the specific instance of the request or error. |

## Response Formats

### Single Response

Used for endpoints that return a single resource.

#### Structure

| Property   | Type     | Description                         |
| ---------- | -------- | ----------------------------------- |
| `data`     | `object` | The single resource being returned. |
| `metadata` | `object` | Reserved for additional links.      |

---

### List Response

Used for endpoints that return a non-paginated list of resources.

#### Structure

| Property   | Type     | Description                      |
| ---------- | -------- | -------------------------------- |
| `data`     | `array`  | An array of resources.           |
| `metadata` | `object` | Includes `totalCount` and links. |

---

### Paginated Response

Used for endpoints that return a paginated list of resources.

#### Structure

| Property   | Type     | Description                         |
| ---------- | -------- | ----------------------------------- |
| `data`     | `array`  | An array of resources for the page. |
| `metadata` | `object` | Includes pagination details.        |

---

### Error Response

Used for endpoints that return an error.

#### Structure

| Property    | Type     | Description                                            |
| ----------- | -------- | ------------------------------------------------------ |
| `errors`    | `array`  | A list of error details, including field-level errors. |
| `callstack` | `string` | Stack trace (only in development mode).                |

## Metadata Details

Metadata is included in `list` and `paginated` responses to provide additional context about the data being returned. It helps clients understand the structure, count, and navigational aspects of the response.

For example:

- **List Responses**: Metadata includes the total count of resources and relevant links.
- **Paginated Responses**: Metadata provides pagination details such as current page, total pages, and navigational links.

### List Metadata Example

```json
{
  "collectionName": "categories",
  "collectionType": "restricted",
  "links": {
    "self": { "href": "/categories", "method": "GET" }
  },
  "totalCount": 42
}
```

---

### Paginated Metadata

For paginated lists, metadata additionally includes:

- `pagination` (with `page`, `size`, `totalPages`, `hasNext`, `hasPrevious`).

---

#### Pagination Metadata Structure

| Key           | Type      | Description                            |
| ------------- | --------- | -------------------------------------- |
| `page`        | `number`  | The current page number.               |
| `size`        | `number`  | The number of items per page.          |
| `totalPages`  | `number`  | The total number of pages.             |
| `hasNext`     | `boolean` | Indicates if there is a next page.     |
| `hasPrevious` | `boolean` | Indicates if there is a previous page. |

## Examples

### Single Response Example

```json
{
  "status": 200,
  "success": true,
  "type": "https://example.com/probs/success",
  "format": "single",
  "title": "Resource Retrieved",
  "detail": "The requested resource was retrieved successfully.",
  "data": {
    "id": 1,
    "name": "Example Resource",
    "description": "An example resource."
  },
  "metadata": {
    "collectionName": "resources",
    "links": {
      "self": { "href": "/resources/1", "method": "GET" }
    }
  }
}
```

### Paginated Response Example

```json
{
  "status": 200,
  "success": true,
  "type": "https://example.com/probs/success",
  "format": "paginated",
  "title": "Resources Retrieved",
  "detail": "The requested resources were retrieved successfully.",
  "data": [
    { "id": 1, "name": "Resource 1" },
    { "id": 2, "name": "Resource 2" }
  ],
  "metadata": {
    "collectionName": "resources",
    "totalCount": 100,
    "pagination": {
      "page": 1,
      "size": 10,
      "totalPages": 10,
      "hasNext": true,
      "hasPrevious": false
    },
    "links": {
      "self": { "href": "/resources?page=1&size=10", "method": "GET" }
    }
  }
}
```
