const createAdapter = (schema = {}) => (adaptee) => {
  const schemaEntries = Object.entries(schema);
  if (schemaEntries.length === 0) return adaptee;
  const propertyDescriptors = {};
  for (const [fieldName, adapter] of schemaEntries) {
    if (!adaptee[fieldName]) continue;
    const value = typeof adaptee[fieldName] === 'function'
      ? (...args) => adapter(adaptee[fieldName](...args))
      : adapter(adaptee[fieldName]);
    propertyDescriptors[fieldName] = {
      value,
      writable: false,
      enumerable: true,
      configurable: false,
    };
  }
  return Object.create(adaptee, propertyDescriptors);
};

export { createAdapter };