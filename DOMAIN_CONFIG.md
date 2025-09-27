# 域名配置说明

此landing页面现在支持通过环境变量自定义显示的域名和邮箱。

## 配置方法

### 本地开发

1. 在项目根目录创建 `.env.local` 文件
2. 添加以下环境变量：

```bash
# 要显示的域名（默认: now.ad）
NEXT_PUBLIC_DOMAIN_NAME=your-domain.com

# 要显示的邮箱（默认: who@pai.rs）
NEXT_PUBLIC_EMAIL=contact@your-domain.com
```

### Cloudflare Pages 部署

在 Cloudflare Pages 的环境变量设置中添加：

1. 进入您的 Cloudflare Pages 项目
2. 转到 Settings > Environment variables
3. 添加以下变量：
   - `NEXT_PUBLIC_DOMAIN_NAME`: 您的域名
   - `NEXT_PUBLIC_EMAIL`: 您的邮箱

## 默认值

如果未设置环境变量，将使用以下默认值：
- 域名: `now.ad`
- 邮箱: `who@pai.rs`

## 技术实现

配置通过 `lib/config.ts` 文件管理，包含以下函数：
- `getSiteConfig()`: 获取完整站点配置
- `getDomainName()`: 获取域名
- `getEmail()`: 获取邮箱

页面组件会自动读取这些配置并显示相应内容。
