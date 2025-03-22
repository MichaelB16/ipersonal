<template>
  <keep-alive>
    <img :src="logo.img" :style="logo.style" alt="logo" loading="lazy" />
  </keep-alive>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import logoWhite from 'src/assets/logo-smart-white.svg';
import logoBlue from 'src/assets/logo-smart-blue.svg';
import logoMini from 'src/assets/logo-smart-mini.svg';
export default defineComponent({
  name: 'AppLogo',
  props: {
    width: {
      type: Number,
      default: 225,
    },
    type: {
      type: String,
      default: 'blue',
      validator: (val: string) => {
        return ['white', 'blue', 'mini'].includes(val);
      },
    },
  },
  setup(props) {
    const allLogos = {
      mini: logoMini,
      white: logoWhite,
      blue: logoBlue,
    };

    type logoType = keyof typeof allLogos;

    const logo = computed(() => {
      return {
        img: getLogo(props.type as logoType),
        style: { width: props.width + 'px' },
      };
    });

    const getLogo = (type: logoType) => {
      const logos = {
        mini: logoMini,
        white: logoWhite,
        blue: logoBlue,
      };

      return logos[type];
    };

    return {
      logo,
    };
  },
});
</script>
