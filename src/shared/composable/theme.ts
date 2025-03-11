import { ref, computed } from 'vue';
const useTheme = () => {
  const theme = ref('light');

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
  };

  const classTheme = computed(() => {
    return theme.value === 'light' ? 'system-light' : 'system-dark';
  });

  return { theme, toggleTheme, classTheme };
};

export default useTheme;
