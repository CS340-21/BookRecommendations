import { RestSerializer } from 'ember-cli-mirage';
import { singularize, pluralize, dasherize, camelize } from 'ember-cli-mirage/utils/inflector';
import Ember from 'ember';

export default RestSerializer.extend({
  _maybeAddAssociationIds(model, attrs) {
    let newHash = Ember.assign({}, attrs);

    model.associationKeys.forEach(key => {
      let modelKeyValue = model[key];
      if (this.isModel(modelKeyValue)) {
        newHash[key] = modelKeyValue.id;
        delete newHash[`${key}Id`];
      } else if (this.isCollection(modelKeyValue)) {
        newHash[pluralize(key)] = modelKeyValue.models.map(m => m.id);
      }
    });

    return newHash;
  },
  normalize(payload) {
    const type = Object.keys(payload)[0];
    const attrs = payload[type];

    // A way to get the associationKeys was found here - https://github.com/samselikoff/ember-cli-mirage/issues/972#issuecomment-315218132
    const modelName = camelize(type);
    const model = this.schema.modelFor(modelName);
    const { belongsToAssociations, hasManyAssociations } = model.class.prototype;
    const belongsToKeys = Object.keys(belongsToAssociations);
    const hasManyKeys = Object.keys(hasManyAssociations);

    const jsonApiPayload = {
      data: {
        type: pluralize(type),
        attributes: {},
      },
    };

    if (attrs.id) {
      jsonApiPayload.data.id = attrs.id;
    }

    Object.keys(attrs).forEach(key => {
      if (belongsToKeys.includes(key)) {
        const newKey = dasherize(`${key}Id`);
        jsonApiPayload.data.attributes[newKey] = attrs[key];
      } else if (hasManyKeys.includes(key)) {
        const newKey = dasherize(`${singularize(key)}Ids`);
        jsonApiPayload.data.attributes[newKey] = attrs[key];
      } else if (key !== 'id') {
        jsonApiPayload.data.attributes[dasherize(key)] = attrs[key];
      }
    });

    return jsonApiPayload;
  },

  keyForModel(modelName) {
    return Ember.String.camelize(modelName);
  },

  keyForCollection(modelName) {
    return Ember.String.camelize(modelName);
  },

  keyForRelationship(relationship) {
    return Ember.String.camelize(relationship);
  },
});
