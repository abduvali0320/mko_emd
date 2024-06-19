<template>
    <div class="text-black dark:text-white-dark">
        <router-view></router-view>
    </div>
</template>
<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useAppStore } from '@/stores/index';
    const store = useAppStore();
    const showTopButton = ref(false);
    onMounted(() => {
        window.onscroll = () => {
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                showTopButton.value = true;
            } else {
                showTopButton.value = false;
            }
        };

        store.toggleMainLoader();
    });

    const goToTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };
</script>
