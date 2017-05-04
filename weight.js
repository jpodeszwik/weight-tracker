var weightSettings = {
  settings: {
    index: {
      number_of_shards: 1,
      number_of_replicas: 1
    }
  },
  mappings: {
    product: {
      properties: {
        date: {
          type: 'date',
          format: 'dateOptionalTime'
        },
        username: {
          type: 'string',
          index: 'not_analyzed'
        },
        weight: {
          type: 'double'
        }
      }
    }
  }
}

module.exports = weightSettings
