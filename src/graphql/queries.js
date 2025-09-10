/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDevice = /* GraphQL */ `
  query GetDevice($id: ID!) {
    getDevice(id: $id) {
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
export const listDevices = /* GraphQL */ `
  query ListDevices(
    $filter: ModelDeviceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDevices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
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
export const listCategories = /* GraphQL */ `
  query ListCategories(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      price1
      price2
      price3
      cost
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
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        price1
        price2
        price3
        cost
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
      nextToken
      __typename
    }
  }
`;
export const getButtonConfig = /* GraphQL */ `
  query GetButtonConfig($id: ID!) {
    getButtonConfig(id: $id) {
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
        cost
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
export const listButtonConfigs = /* GraphQL */ `
  query ListButtonConfigs(
    $filter: ModelButtonConfigFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listButtonConfigs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        deviceId
        button
        productId
        priceTier
        synced
        owner
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPosEvent = /* GraphQL */ `
  query GetPosEvent($id: ID!) {
    getPosEvent(id: $id) {
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
export const listPosEvents = /* GraphQL */ `
  query ListPosEvents(
    $filter: ModelPosEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        deviceId
        cancelled
        synced
        owner
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPosEventProduct = /* GraphQL */ `
  query GetPosEventProduct($id: ID!) {
    getPosEventProduct(id: $id) {
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
        cost
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
export const listPosEventProducts = /* GraphQL */ `
  query ListPosEventProducts(
    $filter: ModelPosEventProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosEventProducts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        posEventId
        productId
        weightGrams
        quantity
        priceApplied
        synced
        owner
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const posEventProductsByPosEventId = /* GraphQL */ `
  query PosEventProductsByPosEventId(
    $posEventId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPosEventProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    posEventProductsByPosEventId(
      posEventId: $posEventId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        posEventId
        productId
        weightGrams
        quantity
        priceApplied
        synced
        owner
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
