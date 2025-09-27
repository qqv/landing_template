/**
 * 网站配置工具
 * 支持通过环境变量自定义域名和邮箱
 */

export interface SiteConfig {
  domainName: string
  email: string
  title: string
}

export interface AtomPaymentConfig {
  domainName: string
  domainPrice: string
  token: string
  installments: string
  downPayment: string
  hostName: string
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

/**
 * 获取 Atom 支付配置
 * 优先使用环境变量，如果未设置则使用默认值
 */
export function getAtomPaymentConfig(): AtomPaymentConfig {
  return {
    domainName: process.env.NEXT_PUBLIC_ATOM_DOMAIN_NAME || 'now.ad',
    domainPrice: process.env.NEXT_PUBLIC_ATOM_DOMAIN_PRICE || '2888',
    token: process.env.NEXT_PUBLIC_ATOM_TOKEN || '161f3b352da7fbce',
    installments: process.env.NEXT_PUBLIC_ATOM_INSTALLMENTS || '',
    downPayment: process.env.NEXT_PUBLIC_ATOM_DOWN_PAYMENT || '',
    hostName: process.env.NEXT_PUBLIC_ATOM_HOST_NAME || 'https://www.atom.com'
  }
}

/**
 * 获取 Atom 域名
 */
export function getAtomDomainName(): string {
  return getAtomPaymentConfig().domainName
}

/**
 * 获取 Atom 域名价格
 */
export function getAtomDomainPrice(): string {
  return getAtomPaymentConfig().domainPrice
}

/**
 * 获取 Atom Token
 */
export function getAtomToken(): string {
  return getAtomPaymentConfig().token
}
