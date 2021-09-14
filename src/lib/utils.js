// validation
// form input tools
const allowOnlyNumbers = (e, setFieldValue, field) => {
  e.preventDefault();
  const { value } = e.target;
  const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
  if (value === '' || regex.test(value.toString())) {
      setFieldValue(field, value);
  }
}

export { allowOnlyNumbers };