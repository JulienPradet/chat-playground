import createEventHandler from '../core/createEventHandler';

const FormValuesManager = initialValues => {
  const {
    stream: updateValueIntent$,
    handler: updateValue
  } = createEventHandler();

  const formValues$ = updateValueIntent$
    .scan(
      (formValues, { name, value }) =>
        Object.assign(formValues, {
          [name]: value
        }),
      initialValues
    )
    .startWith(initialValues);

  return {
    values: formValues$,
    handlers: {
      setValueFromEvent: event => {
        const name = event.target.name;
        const value = event.target.value;
        updateValue({ name, value });
      },
      setValue: (name, value) => {
        updateValue({ name, value });
      }
    }
  };
};

export default (view, initialValues = {}) => {
  const manager = FormValuesManager(initialValues);
  return manager.values.flatMap(view(manager.handlers));
};
