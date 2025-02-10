import Image from "next/image";
import Link from 'next/link'

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    {/* ロゴ画像 */}
    <img
      src="https://tech0-jp.com/wp-content/uploads/2023/06/logo.png"
      alt="Tech0 Logo"
      width={200}
      height={200}
      className="object-contain mb-4"
    />

    {/* ホームへのリンク */}
    <Link href="/home">
      <div className="px-6 py-3 text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
        DEMO or DIE
        test
      </div>
    </Link>
  </div>
  );
}

