<template>
  <div class="masonry-container" :style="{ width: containerWidth, maxWidth: maxWidth }">
    <div 
      v-for="columnIndex in itemsPerRow" 
      :key="columnIndex" 
      class="masonry-column"
    >
      <div 
        v-for="(image, imageIndex) in getColumnImages(columnIndex - 1)" 
        :key="imageIndex" 
        class="masonry-item"
      >
        <slot 
          name="item" 
          :image="image"
          :index="getOriginalIndex(columnIndex - 1, imageIndex)"
          :isFirst="getOriginalIndex(columnIndex - 1, imageIndex) === 0"
          :isLast="getOriginalIndex(columnIndex - 1, imageIndex) === images.length - 1"
          :isEven="getOriginalIndex(columnIndex - 1, imageIndex) % 2 === 0"
          :isOdd="getOriginalIndex(columnIndex - 1, imageIndex) % 2 !== 0"
        >
          <div class="default-item">
            <img :src="image" :alt="`Masonry Image ${imageIndex}`" @load="onImageLoad" />
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MasonryGallery',
  props: {
    images: {
      type: Array,
      required: true
    },
    containerWidth: {
      type: String,
      default: '100%'
    },
    maxWidth: {
      type: String,
      default: '1920px'
    },
    itemsPerRow: {
      type: Number,
      default: 6
    },
    responsive: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    getColumnImages(columnIndex) {
      return this.images.filter((_, index) => index % this.itemsPerRow === columnIndex);
    },
    getOriginalIndex(columnIndex, imageIndex) {
      return columnIndex + (imageIndex * this.itemsPerRow);
    },
    onImageLoad(event) {
      const img = event.target;
      img.style.height = 'auto';
    }
  }
};
</script>

<style scoped>
.masonry-container {
  columns: var(--column-count, 6);
  column-gap: 0;
  width: 100%;
  max-width: var(--max-width, 100%);
  margin: 0 auto;
  padding: 0;
  line-height: 0;
}

.masonry-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.masonry-item {
  break-inside: avoid;
  margin: 0;
  padding: 0;
  width: 100%;
  line-height: 0;
}

.masonry-item img {
  width: 100%;
  height: auto;
  display: block;
  margin: 0;
  padding: 0;
}

.default-item {
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0;
}

.default-item img {
  width: 100%;
  height: auto;
  display: block;
  margin: 0;
  padding: 0;
}

@media screen and (max-width: 1920px) {
  .masonry-container {
    --column-count: 6;
  }
}

@media screen and (max-width: 1600px) {
  .masonry-container {
    --column-count: 5;
  }
}

@media screen and (max-width: 1280px) {
  .masonry-container {
    --column-count: 4;
  }
}

@media screen and (max-width: 960px) {
  .masonry-container {
    --column-count: 3;
  }
}

@media screen and (max-width: 640px) {
  .masonry-container {
    --column-count: 2;
  }
}
</style> 