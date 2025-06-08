export default function Footer() {
  return (
    <footer className="flex items-center justify-center border-t w-[100vw] h-[8vh] bg-[var(--bars)] mt-6">
      <h3 className="text-center justify-center items-center text-[var(--fssgold)]">
        Have any problems? Shoot us an email at{' '}
        <a
          href="mailto:falconsoftwaresolutions27@gmail.com"
          className="underline hover:text-gray-500 transition-colors duration-200"
        >
          falconsoftwaresolutions27@gmail.com
        </a>
      </h3>
    </footer>
  )
}