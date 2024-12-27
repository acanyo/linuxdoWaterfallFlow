<template>
  <div id="app">
    <!-- 设置面板 -->
    <div class="settings-panel" :class="{ 'settings-panel-visible': isSettingsVisible }">
      <div class="settings-header">
        <h3>布局设置</h3>
        <button class="close-settings" @click="isSettingsVisible = false">&times;</button>
      </div>
      <div class="settings-content">
        <div class="control-group">
          <label>容器宽度：</label>
          <select v-model="containerWidth">
            <option value="100%">100%</option>
            <option value="1920px">1920px</option>
            <option value="1600px">1600px</option>
            <option value="1280px">1280px</option>
            <option value="960px">960px</option>
          </select>
        </div>
        <div class="control-group">
          <label>每行显示：</label>
          <select v-model="itemsPerRow">
            <option :value="2">2张</option>
            <option :value="3">3张</option>
            <option :value="4">4张</option>
            <option :value="5">5张</option>
            <option :value="6">6张</option>
          </select>
        </div>
        <div class="control-group">
          <label>
            <input type="checkbox" v-model="responsive">
            响应式布局
          </label>
        </div>
      </div>
    </div>

    <!-- 设置按钮 -->
    <div class="settings-toggle" @click="toggleSettings">
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path fill="currentColor" d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
      </svg>
    </div>

    <!-- 瀑布流画廊 -->
    <MasonryGallery 
      :images="imageUrls" 
      :containerWidth="containerWidth"
      :itemsPerRow="itemsPerRow"
      :responsive="responsive"
      :maxWidth="containerWidth"
    >
      <template #item="{ image }">
        <div class="custom-content" @click="openLightbox(image)">
          <div class="image-wrapper">
            <img 
              :src="getImageUrl(image.url)" 
              :alt="image.title"
              @load="onImageLoad($event, image)"
              @error="onImageError($event, image)"
            />
            <div class="loading-overlay" v-if="image.loading">
              <img :src="imgConfig.loadingImg" class="loading-gif" alt="loading" />
            </div>
            <div class="error-overlay" v-if="image.error">
              <img :src="imgConfig.errorImg" class="error-gif" alt="error" />
            </div>
            <div class="image-overlay">
              <div class="overlay-content">
                <div class="image-title">{{ image.title }}</div>
                <div class="image-description">{{ image.description }}</div>
                <div class="image-tags">
                  <span v-for="(tag, tagIndex) in image.tags" 
                        :key="tagIndex" 
                        class="tag">
                    #{{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </MasonryGallery>

    <!-- 灯箱组件 -->
    <div v-if="lightbox.visible" class="lightbox" @click="closeLightbox" @keyup.esc="closeLightbox" tabindex="0">
      <div class="lightbox-content" @click.stop>
        <img :src="getImageUrl(lightbox.image.url)" :alt="lightbox.image.title" />
        <button class="close-button" @click="closeLightbox">&times;</button>
        <button class="nav-button prev" @click="prevImage" v-if="currentIndex > 0">&lt;</button>
        <button class="nav-button next" @click="nextImage" v-if="currentIndex < imageUrls.length - 1">&gt;</button>
        <div class="image-counter">{{ currentIndex + 1 }} / {{ imageUrls.length }}</div>
      </div>
    </div>

    <footer class="footer">
      <p>© 2024 Powered by <a href="https://lik.cc/" target="_blank">Handsome</a></p>
    </footer>
  </div>
</template>

<script>
import MasonryGallery from './components/MasonryGallery.vue';
import { images, imgConfig } from './config/imgConfig';

export default {
  name: 'App',
  components: {
    MasonryGallery
  },
  data() {
    return {
      imageUrls: images,
      imgConfig,
      lightbox: {
        visible: false,
        image: null
      },
      currentIndex: 0,
      containerWidth: '100%',
      itemsPerRow: 6,
      responsive: true,
      isSettingsVisible: false
    };
  },
  methods: {
    getImageUrl(url) {
      if (typeof url !== 'string' || !url.startsWith('http')) {
        return url;
      }
      return url;
    },
    openLightbox(image) {
      this.lightbox.image = image;
      this.lightbox.visible = true;
      this.currentIndex = this.imageUrls.indexOf(image);
      document.body.style.overflow = 'hidden';
      this.$nextTick(() => {
        document.querySelector('.lightbox').focus();
      });
    },
    closeLightbox() {
      this.lightbox.visible = false;
      this.lightbox.image = null;
      document.body.style.overflow = '';
    },
    prevImage() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.lightbox.image = this.imageUrls[this.currentIndex];
      }
    },
    nextImage() {
      if (this.currentIndex < this.imageUrls.length - 1) {
        this.currentIndex++;
        this.lightbox.image = this.imageUrls[this.currentIndex];
      }
    },
    handleKeyDown(e) {
      if (!this.lightbox.visible) return;
      
      switch(e.key) {
        case 'ArrowLeft':
          this.prevImage();
          break;
        case 'ArrowRight':
          this.nextImage();
          break;
        case 'Escape':
          this.closeLightbox();
          break;
      }
    },
    toggleSettings() {
      this.isSettingsVisible = !this.isSettingsVisible;
    },
    onImageLoad(event, image) {
      image.loading = false;
      image.error = false;
    },
    onImageError(event, image) {
      image.loading = false;
      image.error = true;
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeyDown);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
};
</script>

<style>
/* 添加全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
}

#app {
  background: #fff;
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  line-height: 0;
  font-size: 0;
  position: relative;
  overflow: hidden;
}

.masonry-container {
  width: 100%;
  margin: 0;
  padding: 0;
  column-gap: 0;
  line-height: 0;
}

.masonry-item {
  break-inside: avoid;
  padding: 0;
  margin: 0;
  line-height: 0;
  width: 100%;
}

.masonry-item img {
  width: 100%;
  height: auto;
  display: block;
  margin: 0;
  padding: 0;
}

.custom-content {
  position: relative;
  cursor: pointer;
  width: 100%;
  overflow: hidden;
}

.image-wrapper {
  position: relative;
  width: 100%;
  line-height: 0;
  min-height: 100px;
  background: #f5f5f5;
}

.image-wrapper img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.custom-content:hover img {
  transform: scale(1.05);
}

/* 灯箱样式 */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  animation: fadeIn 0.3s ease;
  outline: none;
}

.lightbox-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}

.lightbox-content img {
  max-width: 90%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  pointer-events: none;
}

.close-button {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 30px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border-radius: 50%;
  z-index: 1002;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.nav-button {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 24px;
  width: 40px;
  height: 80px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border-radius: 4px;
  z-index: 1002;
}

.nav-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.nav-button.prev {
  left: 20px;
}

.nav-button.next {
  right: 20px;
}

.image-counter {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 14px;
  background: rgba(0, 0, 0, 0.5);
  padding: 5px 15px;
  border-radius: 20px;
  z-index: 1002;
  pointer-events: none;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@media screen and (max-width: 1920px) {
  .MasonryGallery {
    --items-per-row: 6;
  }
}

@media screen and (max-width: 1600px) {
  .MasonryGallery {
    --items-per-row: 5;
  }
}

@media screen and (max-width: 1280px) {
  .MasonryGallery {
    --items-per-row: 4;
  }
}

@media screen and (max-width: 960px) {
  .MasonryGallery {
    --items-per-row: 3;
  }
}

@media screen and (max-width: 640px) {
  .MasonryGallery {
    --items-per-row: 2;
  }
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.8));
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 15px;
  line-height: normal;
}

.custom-content:hover .image-overlay {
  opacity: 1;
}

.overlay-content {
  color: white;
  text-align: left;
  line-height: 1.4;
  font-size: 14px;
  pointer-events: none;
}

.image-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.image-description {
  font-size: 14px;
  margin-bottom: 8px;
  opacity: 0.9;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.image-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  line-height: normal;
}

.tag {
  font-size: 12px;
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 10px;
  opacity: 0.8;
  line-height: 1.4;
  white-space: nowrap;
}

/* 灯箱中的信息样式 */
.lightbox-info {
  position: relative;
  width: 300px;
  color: white;
  text-align: left;
  background: rgba(0, 0, 0, 0.7);
  padding: 20px;
  border-radius: 8px;
  height: fit-content;
  margin-top: auto;
  margin-bottom: auto;
  pointer-events: none;
}

.lightbox-info h2 {
  margin: 0 0 15px 0;
  font-size: 24px;
  line-height: 1.2;
}

.lightbox-info p {
  margin: 0 0 20px 0;
  font-size: 16px;
  opacity: 0.9;
  line-height: 1.6;
}

.lightbox-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  line-height: normal;
}

.lightbox-tags .tag {
  background: rgba(255, 255, 255, 0.15);
  padding: 4px 12px;
  line-height: 1.4;
  font-size: 14px;
}

.controls {
  display: none;
}

.settings-toggle {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  transition: all 0.3s ease;
  color: #333;
  opacity: 1;
  visibility: visible;
}

.settings-toggle:hover {
  background: white;
  transform: translateY(-50%) scale(1.05);
}

.settings-panel {
  position: fixed;
  right: -300px;
  top: 0;
  width: 300px;
  height: 100vh;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: transform 0.3s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
}

.settings-panel.settings-panel-visible {
  transform: translateX(-300px);
}

.settings-panel.settings-panel-visible ~ .settings-toggle {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.settings-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.settings-header h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.close-settings {
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.close-settings:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #333;
}

.settings-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.control-group label {
  font-size: 14px;
  color: #333;
}

.control-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  outline: none;
}

@media screen and (max-width: 768px) {
  .settings-toggle {
    width: 36px;
    height: 36px;
    right: 10px;
  }
  
  .settings-panel {
    width: 260px;
  }
  
  .settings-panel.settings-panel-visible {
    transform: translateX(-260px);
  }
}

.settings-panel {
  display: none;
}

.settings-panel.settings-panel-visible {
  display: flex;
}

.loading-overlay,
.error-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.loading-gif,
.error-gif {
  max-width: 50%;
  max-height: 50%;
  object-fit: contain;
}

.footer {
  text-align: center;
  padding: 20px;
  margin-top: 40px;
  color: #666;
  font-size: 14px;
}

.footer a {
  color: #409EFF;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer a:hover {
  color: #66b1ff;
}
</style> 