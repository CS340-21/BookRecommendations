import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class ApplicationSerializer extends JSONAPISerializer {
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    let items = payload;
    payload = {};
    payload.data = items;

    return super.normalizeResponse(store, primaryModelClass, payload, id, requestType);
  }

  normalize(modelClass, resourceHash) {
    let data = {
      id:            resourceHash.id,
      type:          modelClass.modelName,
      attributes:    resourceHash
    };
    return { data: data };
  }
}
