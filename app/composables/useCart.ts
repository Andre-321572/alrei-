export const useCart = () => {
  const cart = useState('cart', () => []);

  const addToCart = (course) => {
    const exists = cart.value.find(item => item.id === course.id);
    if (!exists) {
      cart.value.push(course);
    }
  };

  const removeFromCart = (courseId) => {
    cart.value = cart.value.filter(item => item.id !== courseId);
  };

  const clearCart = () => {
    cart.value = [];
  };

  const total = computed(() => {
    return cart.value.reduce((acc, item) => acc + (item.discount_price || item.price), 0);
  });

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    total,
    count: computed(() => cart.value.length)
  };
};
