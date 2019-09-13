<template>
  <form @submit.prevent="submit">
    <label v-for="(field, key) of fields" :key="key" class="field">
      <div class="label">
        {{ field.label }}
      </div>
      <textarea
        v-if="field.type === 'textarea'"
        v-model="values[key]"
        :placeholder="getPlaceholder(field)"
        v-bind="field.attrs"
      />
      <input
        v-else
        v-model="values[key]"
        :placeholder="getPlaceholder(field)"
        :type="field.type || 'text'"
        v-bind="field.attrs"
      />

      <div class="error" v-if="getErrorMessage(key)">{{ getErrorMessage(key) }}</div>
    </label>

    <input type="submit" value="Submit" />
  </form>
</template>

<script>
const PRESET_VALIDATORS = {
  isEmail: s => {
    if (!/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(s)) {
      throw new Error('This is not a valid email');
    }
    return true;
  },
  isLink: s => {
    try {
      new URL(s);
      return true;
    } catch (e) {
      throw new Error('This is not a valid link.');
    }
  },
};
const resolveValidator = field => {
  const validator = field[validator];
  if (typeof validator === 'function') return validator;
  if (typeof validator === 'string') {
    if (!(validator in PRESET_VALIDATORS)) {
      throw Error('Cannot find validator in preset');
    }
    return PRESET_VALIDATORS[validator];
  }
  if (field.type === 'email') return PRESET_VALIDATORS.isEmail;
  return undefined;
};
/*
fields :: { [key]: field }
field  :: {
  type: 'textarea' | any type <input> (default: 'text')
  label: String,
  placeholder: String,
  optional: Boolean,
  validator: Function(String) throws Error -> Boolean | any default validator name,
}
*/
export default {
  props: ['fields'],
  data: ({ fields }) => ({
    values: Object.keys(fields).reduce((o, f) => ({ ...o, [f]: '' }), {}),
    errors: {},
  }),
  computed: {
    requiredFieldKeys() {
      const fields = this.fields;
      return Object.keys(fields).filter(key => !fields[key].optional);
    },

    validatableFieldKeys() {
      const fields = this.fields;
      return Object.keys(fields).filter(key => !!resolveValidator(fields[key]));
    },
  },
  methods: {
    getErrorMessage(key) {
      return this.errors[key] || this.fields[key].error;
    },

    getPlaceholder(field) {
      const placeholder = field.placeholder || field.label;
      if (field.optional) return placeholder + ' (optional)';
      return placeholder;
    },

    validateFields() {
      const { fields, values, requiredFieldKeys, validatableFieldKeys } = this;
      const errors = {};
      validatableFieldKeys.forEach(key => {
        if (fields[key].required && !values[key]) return;
        try {
          const validator = resolveValidator(fields[key]);
          if (!validator(values[key])) throw new Error('This is not valid.');
        } catch ({ message }) {
          errors[key] = message;
        }
      });
      requiredFieldKeys
        .filter(key => !values[key])
        .forEach(key => {
          errors[key] = `${fields[key].label} is required!`;
        });
      this.errors = errors;
      return Object.keys(this.errors).length <= 0;
    },

    submit() {
      if (!this.validateFields()) return;
      this.$emit('submit', { ...this.values });
    },
  },
};
</script>

<style scoped>
.field {
  display: block;
  margin-bottom: 1rem;
}

.label {
  margin-bottom: 0.2rem;
}

input,
textarea {
  width: 100%;
}

.error {
  color: red;
}

textarea {
  height: 5rem;
  resize: vertical;
}
</style>
