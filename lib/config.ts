/**
 * 网站配置工具
 * 支持通过环境变量自定义域名和邮箱
 */

export interface SiteConfig {
  domainName: string
  email: string
  title: string
}

/**
 * 获取站点配置
 * 优先使用环境变量，如果未设置则使用默认值
 */
export function getSiteConfig(): SiteConfig {
  const domainName = process.env.NEXT_PUBLIC_DOMAIN_NAME || 'now.ad'
  const email = process.env.NEXT_PUBLIC_EMAIL || 'who@pai.rs'
  
  return {
    domainName,
    email,
    title: domainName, // 标题使用域名
  }
}

/**
 * 获取域名
 */
export function getDomainName(): string {
  return getSiteConfig().domainName
}

/**
 * 获取邮箱
 */
export function getEmail(): string {
  return getSiteConfig().email
}
