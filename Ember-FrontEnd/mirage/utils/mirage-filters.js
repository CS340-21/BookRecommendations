import { get } from '@ember/object';
import { typeOf as emberTypeOf } from '@ember/utils';
import { assert } from '@ember/debug';
import { camelize } from 'ember-cli-mirage/utils/inflector';

export const findAll = (scheme, request, dataType, context) => {
  const ids = request.queryParams.ids;
  if (ids) {
    // Resolves coalesced find requests
    return scheme[dataType].find(ids);
  }
  const filters = {};
  const page = {
    start: 0,
    count: 25,
  };
  let sort = null;
  Object.keys(request.queryParams).forEach(key => {
    let values = request.queryParams[key];
    if (!Array.isArray(values)) {
      values = [values];
    }
    values.forEach(value => {
      if (key === 'sort') {
        let ascending = true;
        if (value.startsWith('-')) {
          ascending = false;
          value = value.slice(1);
        }
        sort = {
          value,
          ascending,
        };
      } else if (key === 'start') {
        page.start = Number.parseInt(value);
      } else if (key === 'count') {
        page.count = Number.parseInt(value);
      } else {
        const splitValue = value.split(':');
        let criteria = splitValue[0];
        let operator = 'equals';
        if (splitValue.length > 1) {
          operator = splitValue[1];
        }
        if (!filters[key]) {
          filters[key] = [];
        }

        const keyIsDate = scheme[dataType].first()[key] instanceof Date;
        if (keyIsDate) {
          const parsedCriteria = Number.parseInt(criteria);
          assert('Date filter must be milliseconds', parsedCriteria);
          criteria = (parsedCriteria && new Date(parsedCriteria)) || criteria;
        }
        filters[key].push({
          key,
          operator,
          criteria,
        });
      }
    });
  });

  const results = scheme[dataType].all();
  const filteredResults = results.models.filter(item => {
    let pass = true;
    Object.keys(filters).forEach(key => {
      let orFiltersPass = false;
      let andFiltersPass = true;
      let hasOrFilters = false;

      filters[key].forEach(filter => {
        if (filter.key === 'search') {
          // Full Text Search
          andFiltersPass =
            andFiltersPass &&
            Object.keys(item.attrs).some(itemKey => {
              let value = item.attrs[itemKey];
              if (emberTypeOf(value) === 'string') {
                return value.toLowerCase().indexOf(filter.criteria.toLowerCase()) !== -1;
              } else {
                return false;
              }
            });
        } else if (filter.key === 'tag') {
          if (filter.operator === 'equals') {
            hasOrFilters = true;
            // Multiple equals filters are combined with OR
            orFiltersPass = orFiltersPass || item.tags.indexOf(Number.parseInt(filter.criteria)) !== -1;
          } else if (filter.operator === 'notEquals') {
            andFiltersPass = andFiltersPass && item.tags.indexOf(Number.parseInt(filter.criteria)) === -1;
          }
        } else {
          let value = item[filter.key];
          if (!(value instanceof Date)) {
            value += ''; // normalize strings and numbers to strings
          }
          if (filter.operator === 'equals') {
            hasOrFilters = true;
            // Multiple equals filters are combined with OR
            orFiltersPass = orFiltersPass || value === filter.criteria;
          } else if (filter.operator === 'notEquals') {
            andFiltersPass = andFiltersPass && value !== filter.criteria;
          } else if (filter.operator === 'greaterThan') {
            andFiltersPass = andFiltersPass && value > filter.criteria;
          } else if (filter.operator === 'lessThan') {
            andFiltersPass = andFiltersPass && value < filter.criteria;
          } else if (filter.operator === 'greaterThanOrEquals') {
            andFiltersPass = andFiltersPass && value >= filter.criteria;
          } else if (filter.operator === 'lessThanOrEquals') {
            andFiltersPass = andFiltersPass && value <= filter.criteria;
          } else if (filter.operator === 'like') {
            filter.criteria = filter.criteria.replace('*', '').toLowerCase();
            andFiltersPass = andFiltersPass && value.includes(filter.criteria);
          }
        }
      });
      if (!hasOrFilters) {
        orFiltersPass = true;
      }
      pass = pass && orFiltersPass && andFiltersPass;
    });
    return pass;
  });
  let sortedResults = filteredResults;
  if (sort) {
    sortedResults = sortedResults.sort((a, b) => {
      let aVal = get(a, sort.value);
      let bVal = get(b, sort.value);
      const aNumber = Number.parseInt(aVal);
      const bNumber = Number.parseInt(bVal);
      if (!Number.isNaN(aNumber) && !Number.isNaN(bNumber)) {
        // If a and b are numbers, compare as numbers
        aVal = aNumber;
        bVal = bNumber;
      }
      if (aVal < bVal) {
        if (sort.ascending) {
          return -1;
        } else {
          return 1;
        }
      } else if (bVal < aVal) {
        if (sort.ascending) {
          return 1;
        } else {
          return -1;
        }
      } else {
        return 0;
      }
    });
  }

  const serializedResults = sortedResults.map(function(item) {
    return context ? context.serialize(item)[camelize(results.modelName)] : item;
  });

  const total = serializedResults.length;

  const pagedResults = serializedResults.slice(page.start, page.start + page.count);

  const response = {
    meta: {
      start: page.start,
      count: page.count,
      total,
    },
  };
  response[results.modelName] = pagedResults;
  return response;
};
