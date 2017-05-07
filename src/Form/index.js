import createEventHandler from '../core/createEventHandler';

export default (initialValues = {}) => {
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
    values$: formValues$,
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
