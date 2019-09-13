<script>
export default {
  functional: true,
  render(h, { data, slots }) {
    const { href } = data.attrs;
    const slot = slots().default;
    if (!href) return slot;

    return h(
      'a',
      {
        ...data,
        attrs: {
          ...data.attrs,
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      },
      [slot],
    );
  },
};
</script>
