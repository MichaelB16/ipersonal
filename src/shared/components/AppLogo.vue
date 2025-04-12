<template>
  <keep-alive>
    <img :src="logo.img" :style="logo.style" alt="logo" loading="lazy" />
  </keep-alive>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import logoBlue from 'src/assets/logo-smart-blue.svg';
import logoMini from 'src/assets/logo-smart-mini.svg';
import logoMiniWhite from 'src/assets/logo-smart-mini-white.svg';
import logoWhite from 'src/assets/logo-smart-white.svg';
import { useSettingStore } from 'src/stores/settings';
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
        return ['blue', 'mini'].includes(val);
      },
    },
  },
  setup(props) {
    const settingStore = useSettingStore();
    const allLogos = {
      mini: logoMini,
      blue: logoBlue,
      white: logoWhite,
      'mini-white': logoMiniWhite,
    };

    type logoType = keyof typeof allLogos;

    const logo = computed(() => {
      const menuMini = settingStore.menuMini || settingStore.isMobile;

      if (settingStore.isDark) {
        const type: logoType = menuMini ? 'mini-white' : 'white';
        return {
          img: getLogo(type),
          style: { width: props.width + 'px' },
        };
      }

      const type: logoType = menuMini ? 'mini' : (props.type as logoType);

      return {
        img: getLogo(type),
        style: { width: props.width + 'px' },
      };
    });

    const getLogo = (type: logoType) => {
      const logos = {
        mini: logoMini,
        blue: logoBlue,
        white: logoWhite,
        'mini-white': logoMiniWhite,
      };

      return logos[type];
    };

    return {
      logo,
    };
  },
});
</script>
