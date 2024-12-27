# 瀑布流图片展示

一个基于 Vue 3 的响应式瀑布流图片展示组件，支持灯箱预览、自定义布局和图片管理功能。

## 功能特点

- 响应式瀑布流布局
- 支持灯箱预览
- 自定义图片布局
- 加载状态显示
- 错误处理
- 键盘导航支持
- 自定义内容插槽

## 安装

```bash
npm install
npm run dev
```

## 使用方法

```vue
<template>
  <MasonryGallery 
    :images="images"
    :containerWidth="containerWidth"
    :itemsPerRow="itemsPerRow"
    :responsive="responsive"
  />
</template>
```

## 配置选项

### 图片对象属性

- `url`: 图片地址
- `title`: 图片标题
- `description`: 图片描述
- `tags`: 图片标签数组

### 组件属性

- `containerWidth`: 容器宽度
- `itemsPerRow`: 每行显示数量
- `responsive`: 是否启用响应式布局

## 开发说明

- 建议使用 CDN 加速图片加载
- 图片尺寸建议统一
- 支持主流浏览器

## 贡献

欢迎提交 Issue 和 Pull Request

## 免责声明

1. 本项目仅供学习和参考使用，不得用于任何商业用途。
2. 使用本项目过程中产生的任何直接或间接损失，作者不承担任何责任。
3. 本项目展示的所有图片仅用于演示，其版权归原作者所有。如有侵权，请联系我们删除。
4. 用户在使用本项目时，必须遵守所在国家/地区的相关法律法规。
5. 作者保留对本项目的最终解释权。

## 版权

© 2024 Powered by [Handsome](https://lik.cc/). All rights reserved.

本项目遵循 MIT 许可证。详细信息请参阅 LICENSE 文件。
