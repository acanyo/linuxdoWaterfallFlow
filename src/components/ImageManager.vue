<template>
  <div class="image-manager">
    <!-- 上传区域 -->
    <div class="upload-area" @drop.prevent="handleDrop" @dragover.prevent>
      <input 
        type="file" 
        ref="fileInput" 
        multiple 
        accept="image/*" 
        @change="handleFileSelect" 
        style="display: none"
      >
      <div class="upload-box" @click="$refs.fileInput.click()">
        <div class="upload-hint">
          <i class="upload-icon">📁</i>
          <p>点击或拖拽图片到此处上传</p>
          <p class="upload-tip">支持 jpg、png、gif、webp 格式</p>
        </div>
      </div>
    </div>

    <!-- 图片列表 -->
    <div class="image-list">
      <div class="list-header">
        <h3>图片管理</h3>
        <div class="list-actions">
          <button @click="selectAll">全选</button>
          <button @click="deleteSelected" class="danger">删除选中</button>
        </div>
      </div>
      <div class="list-content">
        <div v-for="img in images" :key="img.url" class="image-item">
          <div class="image-preview">
            <img :src="img.url" :alt="img.title">
            <div class="image-actions">
              <input type="checkbox" v-model="img.selected">
              <button @click="copyUrl(img.url)">复制链接</button>
              <button @click="deleteImage(img)" class="danger">删除</button>
            </div>
          </div>
          <div class="image-info">
            <input v-model="img.title" placeholder="图片标题">
            <input v-model="img.description" placeholder="图片描述">
            <div class="tags-input">
              <input 
                v-model="img.newTag"
                @keyup.enter="addTag(img)"
                placeholder="添加标签 (回车确认)"
              >
              <div class="tags-list">
                <span v-for="tag in img.tags" :key="tag" class="tag">
                  {{ tag }}
                  <button @click="removeTag(img, tag)">&times;</button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageManager',
  data() {
    return {
      images: [],
      uploadProgress: 0
    };
  },
  methods: {
    handleDrop(e) {
      const files = [...e.dataTransfer.files];
      this.uploadFiles(files);
    },
    handleFileSelect(e) {
      const files = [...e.target.files];
      this.uploadFiles(files);
    },
    async uploadFiles(files) {
      for (const file of files) {
        if (!file.type.startsWith('image/')) continue;
        
        try {
          // 这里需要实现文件上传到服务器的逻辑
          const formData = new FormData();
          formData.append('image', file);
          
          // 示例：上传到服务器
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
          });
          
          const result = await response.json();
          if (result.success) {
            this.images.push({
              url: result.url,
              title: file.name,
              description: '',
              tags: [],
              selected: false,
              newTag: ''
            });
          }
        } catch (error) {
          console.error('上传失败:', error);
          // 这里可以添加错误提示
        }
      }
    },
    selectAll() {
      const allSelected = this.images.every(img => img.selected);
      this.images.forEach(img => img.selected = !allSelected);
    },
    async deleteSelected() {
      if (!confirm('确定要删除选中的图片吗？')) return;
      
      const selectedImages = this.images.filter(img => img.selected);
      for (const img of selectedImages) {
        await this.deleteImage(img);
      }
    },
    async deleteImage(img) {
      try {
        // 这里需要实现删除服务器图片的逻辑
        const response = await fetch(`/api/images/${img.id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          const index = this.images.indexOf(img);
          this.images.splice(index, 1);
        }
      } catch (error) {
        console.error('删除失败:', error);
        // 这里可以添加错误提示
      }
    },
    copyUrl(url) {
      navigator.clipboard.writeText(url)
        .then(() => {
          // 这里可以添加复制成功提示
          alert('链接已复制到剪贴板');
        })
        .catch(err => {
          console.error('复制失败:', err);
        });
    },
    addTag(img) {
      if (img.newTag && !img.tags.includes(img.newTag)) {
        img.tags.push(img.newTag);
        img.newTag = '';
      }
    },
    removeTag(img, tag) {
      const index = img.tags.indexOf(tag);
      if (index > -1) {
        img.tags.splice(index, 1);
      }
    }
  }
};
</script>

<style scoped>
.image-manager {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.upload-area {
  margin-bottom: 20px;
}

.upload-box {
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.upload-box:hover {
  border-color: #409EFF;
  background: #f5f7fa;
}

.upload-icon {
  font-size: 48px;
  margin-bottom: 10px;
}

.upload-hint p {
  margin: 5px 0;
  color: #666;
}

.upload-tip {
  font-size: 12px;
  color: #999;
}

.image-list {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.list-header {
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list-actions {
  display: flex;
  gap: 10px;
}

.list-content {
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.image-item {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
}

.image-preview {
  position: relative;
  padding-top: 75%;
}

.image-preview img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-actions {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  padding: 10px;
  display: flex;
  gap: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-preview:hover .image-actions {
  opacity: 1;
}

.image-info {
  padding: 10px;
}

.image-info input {
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 5px;
}

.tag {
  background: #f0f0f0;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.tag button {
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  color: #999;
}

button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background: #409EFF;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  opacity: 0.8;
}

button.danger {
  background: #F56C6C;
}
</style> 