import BlobFileManager from '@/components/blob-file-manager'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <BlobFileManager />
    </main>
  )
}