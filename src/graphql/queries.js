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
      owner
      synced
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
        owner
        synced
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
      metric
      sku
      isActive
      button
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
        metric
        sku
        isActive
        button
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
export const getPosEvent = /* GraphQL */ `
  query GetPosEvent($id: ID!) {
    getPosEvent(id: $id) {
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
        owner
        synced
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
        button
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
      owner
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
        productId
        weightGrams
        quantity
        priceApplied
        eventTime
        synced
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
