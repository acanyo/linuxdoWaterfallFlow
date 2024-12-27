export const imgConfig = {
  loadingImg: 'https://wmimg.com/i/1283/2024/10/670f8d6933eb1.gif',
  errorImg: 'https://www.lik.cc/themes/theme-hao/assets/images/404.gif'
};

export const images = [
  {
    url: 'https://pic1.zhimg.com/v2-7d01cab20858648cbf62333a7988e6d0_r.jpg',
    title: '山水画卷',
    description: '中国传统山水画意境',
    tags: ['风景', '山水', '艺术']
  },
  {
    url: 'https://pic2.zhimg.com/v2-95b0d183c9e7b455f0f2c3b59d41e6c0_r.jpg',
    title: '城市夜景',
    description: '现代都市的璀璨夜色',
    tags: ['城市', '夜景', '建筑']
  },
  {
    url: 'https://pic3.zhimg.com/v2-8d6d2c5e4c49dd6ff3e2b35c26c8e937_r.jpg',
    title: '花卉特写',
    description: '绽放的美丽花朵',
    tags: ['花卉', '自然', '特写']
  },
  {
    url: 'https://pic4.zhimg.com/v2-a7c19c288f78ae46db68e6f3e5e2399e_r.jpg',
    title: '海滨日落',
    description: '金色阳光下的海岸线',
    tags: ['海滨', '日落', '自然']
  },
  {
    url: 'https://pic1.zhimg.com/v2-d6d96c097477501e0bbe2c8fcd94d134_r.jpg',
    title: '古建筑',
    description: '传统建筑的典雅之美',
    tags: ['建筑', '文化', '历史']
  },
  {
    url: 'https://pic2.zhimg.com/v2-9e4e5513e9ab4eb6db3d3d9c2a52c7f2_r.jpg',
    title: '雪山风光',
    description: '壮丽的雪山景色',
    tags: ['雪山', '自然', '风景']
  },
  {
    url: 'https://pic3.zhimg.com/v2-2e6d3c7b9e35e29d2c891e5650c9f414_r.jpg',
    title: '森林小径',
    description: '幽静的森林小路',
    tags: ['森林', '自然', '小径']
  },
  {
    url: 'https://pic4.zhimg.com/v2-5e9e9c3e9a7e2e7d3e2b3e5e4e1e0e9_r.jpg',
    title: '瀑布',
    description: '气势磅礴的瀑布',
    tags: ['瀑布', '自然', '水景']
  },
  {
    url: 'https://pic1.zhimg.com/v2-1e9e9c3e9a7e2e7d3e2b3e5e4e1e0e9_r.jpg',
    title: '沙漠',
    description: '广袤的沙漠风光',
    tags: ['沙漠', '自然', '风景']
  },
  {
    url: 'https://pic2.zhimg.com/v2-3e9e9c3e9a7e2e7d3e2b3e5e4e1e0e9_r.jpg',
    title: '草原',
    description: '辽阔的草原景色',
    tags: ['草原', '自然', '风景']
  },
  {
    url: require('../assers/img/1.gif'),
    title: 'GIF动画',
    description: '这是一个有趣的GIF动画',
    tags: ['动画', 'GIF']
  },
  {
    url: require('../assers/img/2.png'),
    title: 'PNG图片',
    description: '高清PNG图片展示',
    tags: ['PNG', '高清']
  },
  {
    url: require('../assers/img/3.jpg'),
    title: 'JPG照片',
    description: '精美JPG照片',
    tags: ['JPG', '照片']
  },
  {
    url: require('../assers/img/4.webp'),
    title: 'WebP图片',
    description: '新一代WebP格式图片',
    tags: ['WebP', '新技术']
  },
  {
    url: require('../assers/img/5.png'),
    title: '示例图片5',
    description: '这是第五张图片的描述',
    tags: ['示例', 'PNG']
  },
  {
    url: require('../assers/img/6.png'),
    title: '示例图片6',
    description: '这是第六张图片的描述',
    tags: ['示例', 'PNG']
  },
  {
    url: require('../assers/img/7.jpeg'),
    title: 'JPEG图片',
    description: '标准JPEG格式图片',
    tags: ['JPEG', '照片']
  },
  {
    url: require('../assers/img/8.webp'),
    title: 'WebP示例',
    description: '另一张WebP格式图片',
    tags: ['WebP', '示例']
  },
  {
    url: 'https://www.lik.cc/upload/tugou.webp',
    title: '在线图片1',
    description: '来自外部链接的图片',
    tags: ['在线', 'WebP']
  },
  {
    url: 'https://www.lik.cc/upload/image-bdmt.png',
    title: '在线图片2',
    description: '另一张外部链接图片',
    tags: ['在线', 'PNG']
  }
].map(img => ({
  ...img,
  loading: true,
  error: false
})); 