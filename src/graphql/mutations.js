/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDevice = /* GraphQL */ `
  mutation CreateDevice(
    $input: CreateDeviceInput!
    $condition: ModelDeviceConditionInput
  ) {
    createDevice(input: $input, condition: $condition) {
      id
      label
      location
      firmwareVersion
      isOnline
      synced
      categories {
        nextToken
        __typename
      }
      products {
        nextToken
        __typename
      }
      events {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateDevice = /* GraphQL */ `
  mutation UpdateDevice(
    $input: UpdateDeviceInput!
    $condition: ModelDeviceConditionInput
  ) {
    updateDevice(input: $input, condition: $condition) {
      id
      label
      location
      firmwareVersion
      isOnline
      synced
      categories {
        nextToken
        __typename
      }
      products {
        nextToken
        __typename
      }
      events {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteDevice = /* GraphQL */ `
  mutation DeleteDevice(
    $input: DeleteDeviceInput!
    $condition: ModelDeviceConditionInput
  ) {
    deleteDevice(input: $input, condition: $condition) {
      id
      label
      location
      firmwareVersion
      isOnline
      synced
      categories {
        nextToken
        __typename
      }
      products {
        nextToken
        __typename
      }
      events {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
      id
      deviceId
      name
      description
      isDeleted
      synced
      device {
        id
        label
        location
        firmwareVersion
        isOnline
        synced
        createdAt
        updatedAt
        __typename
      }
      products {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
      id
      deviceId
      name
      description
      isDeleted
      synced
      device {
        id
        label
        location
        firmwareVersion
        isOnline
        synced
        createdAt
        updatedAt
        __typename
      }
      products {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
      id
      deviceId
      name
      description
      isDeleted
      synced
      device {
        id
        label
        location
        firmwareVersion
        isOnline
        synced
        createdAt
        updatedAt
        __typename
      }
      products {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
      id
      deviceId
      name
      price1
      price2
      price3
      metric
      sku
      isActive
      isDeleted
      button
      synced
      device {
        id
        label
        location
        firmwareVersion
        isOnline
        synced
        createdAt
        updatedAt
        __typename
      }
      categoryId
      category {
        id
        deviceId
        name
        description
        isDeleted
        synced
        createdAt
        updatedAt
        __typename
      }
      events {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
      id
      deviceId
      name
      price1
      price2
      price3
      metric
      sku
      isActive
      isDeleted
      button
      synced
      device {
        id
        label
        location
        firmwareVersion
        isOnline
        synced
        createdAt
        updatedAt
        __typename
      }
      categoryId
      category {
        id
        deviceId
        name
        description
        isDeleted
        synced
        createdAt
        updatedAt
        __typename
      }
      events {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
      id
      deviceId
      name
      price1
      price2
      price3
      metric
      sku
      isActive
      isDeleted
      button
      synced
      device {
        id
        label
        location
        firmwareVersion
        isOnline
        synced
        createdAt
        updatedAt
        __typename
      }
      categoryId
      category {
        id
        deviceId
        name
        description
        isDeleted
        synced
        createdAt
        updatedAt
        __typename
      }
      events {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createPosEvent = /* GraphQL */ `
  mutation CreatePosEvent(
    $input: CreatePosEventInput!
    $condition: ModelPosEventConditionInput
  ) {
    createPosEvent(input: $input, condition: $condition) {
      id
      deviceId
      productId
      weightGrams
      quantity
      priceApplied
      eventTime
      synced
      device {
        id
        label
        location
        firmwareVersion
        isOnline
        synced
        createdAt
        updatedAt
        __typename
      }
      product {
        id
        deviceId
        name
        price1
        price2
        price3
        metric
        sku
        isActive
        isDeleted
        button
        synced
        categoryId
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updatePosEvent = /* GraphQL */ `
  mutation UpdatePosEvent(
    $input: UpdatePosEventInput!
    $condition: ModelPosEventConditionInput
  ) {
    updatePosEvent(input: $input, condition: $condition) {
      id
      deviceId
      productId
      weightGrams
      quantity
      priceApplied
      eventTime
      synced
      device {
        id
        label
        location
        firmwareVersion
        isOnline
        synced
        createdAt
        updatedAt
        __typename
      }
      product {
        id
        deviceId
        name
        price1
        price2
        price3
        metric
        sku
        isActive
        isDeleted
        button
        synced
        categoryId
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deletePosEvent = /* GraphQL */ `
  mutation DeletePosEvent(
    $input: DeletePosEventInput!
    $condition: ModelPosEventConditionInput
  ) {
    deletePosEvent(input: $input, condition: $condition) {
      id
      deviceId
      productId
      weightGrams
      quantity
      priceApplied
      eventTime
      synced
      device {
        id
        label
        location
        firmwareVersion
        isOnline
        synced
        createdAt
        updatedAt
        __typename
      }
      product {
        id
        deviceId
        name
        price1
        price2
        price3
        metric
        sku
        isActive
        isDeleted
        button
        synced
        categoryId
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
