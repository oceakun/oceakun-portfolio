export default function NotFound() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-8'>
      <div className='max-w-2xl text-center'>
        <h1 className='mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100'>
          404 - Page Not Found
        </h1>
        <p className='mb-8 text-lg text-gray-600 dark:text-gray-400'>
          Sorry, the page you are looking for does not exist.
        </p>
        <a
          href='/blog'
          className='inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700'
        >
          Return to blog
        </a>
      </div>
    </div>
  );
}
