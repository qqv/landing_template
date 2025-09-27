import { getDomainName, getEmail } from '@/lib/config'

export default function HomePage() {
  const domainName = getDomainName()
  const email = getEmail()

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-foreground mb-4 cursor-pointer transition-transform duration-200 ease-in-out hover:-translate-y-2 hover:scale-105">
          {domainName}
        </h1>
        <p className="text-xl text-muted-foreground">{email}</p>
      </div>
    </main>
  )
}
