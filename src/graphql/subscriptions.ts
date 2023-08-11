/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct($filter: ModelSubscriptionProductFilterInput) {
    onCreateProduct(filter: $filter) {
      id
      title
      description
      image
      images
      options
      category
      avgRating
      ratings
      brand
      price
      oldPrice
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct($filter: ModelSubscriptionProductFilterInput) {
    onUpdateProduct(filter: $filter) {
      id
      title
      description
      image
      images
      options
      category
      avgRating
      ratings
      brand
      price
      oldPrice
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct($filter: ModelSubscriptionProductFilterInput) {
    onDeleteProduct(filter: $filter) {
      id
      title
      description
      image
      images
      options
      category
      avgRating
      ratings
      brand
      price
      oldPrice
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateCartProduct = /* GraphQL */ `
  subscription OnCreateCartProduct(
    $filter: ModelSubscriptionCartProductFilterInput
  ) {
    onCreateCartProduct(filter: $filter) {
      id
      userSub
      quantity
      option
      productID
      product {
        id
        title
        description
        image
        images
        options
        category
        avgRating
        ratings
        brand
        price
        oldPrice
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateCartProduct = /* GraphQL */ `
  subscription OnUpdateCartProduct(
    $filter: ModelSubscriptionCartProductFilterInput
  ) {
    onUpdateCartProduct(filter: $filter) {
      id
      userSub
      quantity
      option
      productID
      product {
        id
        title
        description
        image
        images
        options
        category
        avgRating
        ratings
        brand
        price
        oldPrice
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteCartProduct = /* GraphQL */ `
  subscription OnDeleteCartProduct(
    $filter: ModelSubscriptionCartProductFilterInput
  ) {
    onDeleteCartProduct(filter: $filter) {
      id
      userSub
      quantity
      option
      productID
      product {
        id
        title
        description
        image
        images
        options
        category
        avgRating
        ratings
        brand
        price
        oldPrice
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateOrderProduct = /* GraphQL */ `
  subscription OnCreateOrderProduct(
    $filter: ModelSubscriptionOrderProductFilterInput
  ) {
    onCreateOrderProduct(filter: $filter) {
      id
      quantity
      option
      productID
      product {
        id
        title
        description
        image
        images
        options
        category
        avgRating
        ratings
        brand
        price
        oldPrice
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      orderID
      order {
        id
        userSub
        amount
        addressID
        address {
          id
          fullName
          street
          city
          state
          postalCode
          country
          isSelected
          userSub
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateOrderProduct = /* GraphQL */ `
  subscription OnUpdateOrderProduct(
    $filter: ModelSubscriptionOrderProductFilterInput
  ) {
    onUpdateOrderProduct(filter: $filter) {
      id
      quantity
      option
      productID
      product {
        id
        title
        description
        image
        images
        options
        category
        avgRating
        ratings
        brand
        price
        oldPrice
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      orderID
      order {
        id
        userSub
        amount
        addressID
        address {
          id
          fullName
          street
          city
          state
          postalCode
          country
          isSelected
          userSub
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteOrderProduct = /* GraphQL */ `
  subscription OnDeleteOrderProduct(
    $filter: ModelSubscriptionOrderProductFilterInput
  ) {
    onDeleteOrderProduct(filter: $filter) {
      id
      quantity
      option
      productID
      product {
        id
        title
        description
        image
        images
        options
        category
        avgRating
        ratings
        brand
        price
        oldPrice
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      orderID
      order {
        id
        userSub
        amount
        addressID
        address {
          id
          fullName
          street
          city
          state
          postalCode
          country
          isSelected
          userSub
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder($filter: ModelSubscriptionOrderFilterInput) {
    onCreateOrder(filter: $filter) {
      id
      userSub
      amount
      addressID
      address {
        id
        fullName
        street
        city
        state
        postalCode
        country
        isSelected
        userSub
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder($filter: ModelSubscriptionOrderFilterInput) {
    onUpdateOrder(filter: $filter) {
      id
      userSub
      amount
      addressID
      address {
        id
        fullName
        street
        city
        state
        postalCode
        country
        isSelected
        userSub
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder($filter: ModelSubscriptionOrderFilterInput) {
    onDeleteOrder(filter: $filter) {
      id
      userSub
      amount
      addressID
      address {
        id
        fullName
        street
        city
        state
        postalCode
        country
        isSelected
        userSub
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateAddress = /* GraphQL */ `
  subscription OnCreateAddress($filter: ModelSubscriptionAddressFilterInput) {
    onCreateAddress(filter: $filter) {
      id
      fullName
      street
      city
      state
      postalCode
      country
      isSelected
      userSub
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateAddress = /* GraphQL */ `
  subscription OnUpdateAddress($filter: ModelSubscriptionAddressFilterInput) {
    onUpdateAddress(filter: $filter) {
      id
      fullName
      street
      city
      state
      postalCode
      country
      isSelected
      userSub
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteAddress = /* GraphQL */ `
  subscription OnDeleteAddress($filter: ModelSubscriptionAddressFilterInput) {
    onDeleteAddress(filter: $filter) {
      id
      fullName
      street
      city
      state
      postalCode
      country
      isSelected
      userSub
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
