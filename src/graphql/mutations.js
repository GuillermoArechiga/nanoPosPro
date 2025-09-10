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
      owner
      events {
        nextToken
        __typename
      }
      buttonConfigs {
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
      owner
      events {
        nextToken
        __typename
      }
      buttonConfigs {
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
      owner
      events {
        nextToken
        __typename
      }
      buttonConfigs {
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
      name
      description
      synced
      isDeleted
      owner
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
      name
      description
      synced
      isDeleted
      owner
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
      name
      description
      synced
      isDeleted
      owner
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
      name
      price1
      price2
      price3
      metric
      sku
      isActive
      synced
      isDeleted
      owner
      categoryId
      category {
        id
        name
        description
        synced
        isDeleted
        owner
        createdAt
        updatedAt
        __typename
      }
      buttonConfigs {
        nextToken
        __typename
      }
      eventProducts {
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
      name
      price1
      price2
      price3
      metric
      sku
      isActive
      synced
      isDeleted
      owner
      categoryId
      category {
        id
        name
        description
        synced
        isDeleted
        owner
        createdAt
        updatedAt
        __typename
      }
      buttonConfigs {
        nextToken
        __typename
      }
      eventProducts {
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
      name
      price1
      price2
      price3
      metric
      sku
      isActive
      synced
      isDeleted
      owner
      categoryId
      category {
        id
        name
        description
        synced
        isDeleted
        owner
        createdAt
        updatedAt
        __typename
      }
      buttonConfigs {
        nextToken
        __typename
      }
      eventProducts {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createButtonConfig = /* GraphQL */ `
  mutation CreateButtonConfig(
    $input: CreateButtonConfigInput!
    $condition: ModelButtonConfigConditionInput
  ) {
    createButtonConfig(input: $input, condition: $condition) {
      id
      deviceId
      button
      productId
      priceTier
      synced
      owner
      device {
        id
        label
        location
        firmwareVersion
        isOnline
        synced
        owner
        createdAt
        updatedAt
        __typename
      }
      product {
        id
        name
        price1
        price2
        price3
        metric
        sku
        isActive
        synced
        isDeleted
        owner
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
export const updateButtonConfig = /* GraphQL */ `
  mutation UpdateButtonConfig(
    $input: UpdateButtonConfigInput!
    $condition: ModelButtonConfigConditionInput
  ) {
    updateButtonConfig(input: $input, condition: $condition) {
      id
      deviceId
      button
      productId
      priceTier
      synced
      owner
      device {
        id
        label
        location
        firmwareVersion
        isOnline
        synced
        owner
        createdAt
        updatedAt
        __typename
      }
      product {
        id
        name
        price1
        price2
        price3
        metric
        sku
        isActive
        synced
        isDeleted
        owner
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
export const deleteButtonConfig = /* GraphQL */ `
  mutation DeleteButtonConfig(
    $input: DeleteButtonConfigInput!
    $condition: ModelButtonConfigConditionInput
  ) {
    deleteButtonConfig(input: $input, condition: $condition) {
      id
      deviceId
      button
      productId
      priceTier
      synced
      owner
      device {
        id
        label
        location
        firmwareVersion
        isOnline
        synced
        owner
        createdAt
        updatedAt
        __typename
      }
      product {
        id
        name
        price1
        price2
        price3
        metric
        sku
        isActive
        synced
        isDeleted
        owner
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
export const createPosEvent = /* GraphQL */ `
  mutation CreatePosEvent(
    $input: CreatePosEventInput!
    $condition: ModelPosEventConditionInput
  ) {
    createPosEvent(input: $input, condition: $condition) {
      id
      deviceId
      cancelled
      synced
      owner
      device {
        id
        label
        location
        firmwareVersion
        isOnline
        synced
        owner
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
export const updatePosEvent = /* GraphQL */ `
  mutation UpdatePosEvent(
    $input: UpdatePosEventInput!
    $condition: ModelPosEventConditionInput
  ) {
    updatePosEvent(input: $input, condition: $condition) {
      id
      deviceId
      cancelled
      synced
      owner
      device {
        id
        label
        location
        firmwareVersion
        isOnline
        synced
        owner
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
export const deletePosEvent = /* GraphQL */ `
  mutation DeletePosEvent(
    $input: DeletePosEventInput!
    $condition: ModelPosEventConditionInput
  ) {
    deletePosEvent(input: $input, condition: $condition) {
      id
      deviceId
      cancelled
      synced
      owner
      device {
        id
        label
        location
        firmwareVersion
        isOnline
        synced
        owner
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
export const createPosEventProduct = /* GraphQL */ `
  mutation CreatePosEventProduct(
    $input: CreatePosEventProductInput!
    $condition: ModelPosEventProductConditionInput
  ) {
    createPosEventProduct(input: $input, condition: $condition) {
      id
      posEventId
      productId
      weightGrams
      quantity
      priceApplied
      synced
      owner
      event {
        id
        deviceId
        cancelled
        synced
        owner
        createdAt
        updatedAt
        __typename
      }
      product {
        id
        name
        price1
        price2
        price3
        metric
        sku
        isActive
        synced
        isDeleted
        owner
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
export const updatePosEventProduct = /* GraphQL */ `
  mutation UpdatePosEventProduct(
    $input: UpdatePosEventProductInput!
    $condition: ModelPosEventProductConditionInput
  ) {
    updatePosEventProduct(input: $input, condition: $condition) {
      id
      posEventId
      productId
      weightGrams
      quantity
      priceApplied
      synced
      owner
      event {
        id
        deviceId
        cancelled
        synced
        owner
        createdAt
        updatedAt
        __typename
      }
      product {
        id
        name
        price1
        price2
        price3
        metric
        sku
        isActive
        synced
        isDeleted
        owner
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
export const deletePosEventProduct = /* GraphQL */ `
  mutation DeletePosEventProduct(
    $input: DeletePosEventProductInput!
    $condition: ModelPosEventProductConditionInput
  ) {
    deletePosEventProduct(input: $input, condition: $condition) {
      id
      posEventId
      productId
      weightGrams
      quantity
      priceApplied
      synced
      owner
      event {
        id
        deviceId
        cancelled
        synced
        owner
        createdAt
        updatedAt
        __typename
      }
      product {
        id
        name
        price1
        price2
        price3
        metric
        sku
        isActive
        synced
        isDeleted
        owner
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
