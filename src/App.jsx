function NavBar() {
  return (
    <nav className="flex items-center justify-between py-4 px-8 bg-white border-b ">
      <a href="/" className="text-2xl font-bold">
        Wannasingh K<span className="text-green-500">.</span>
      </a>
      <div className="hidden md:flex space-x-4">
        <a href="/login" className="px-9 py-2  rounded-full border">
          Log in
        </a>
        <a
          href="/signup"
          className="px-8 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-colors"
        >
          Sign up
        </a>
      </div>
      <button className="md:hidden">Menu</button>
    </nav>
  );
}

function HeroSection() {
  return (
    <main className="container px-4 py-8 lg:py-16 mx-auto">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/3 mb-8 lg:mb-0 lg:pr-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Stay <br className="hidden lg:block" />
            Informed, <br />
            Stay Inspired,
          </h1>
          <p className="text-lg text-gray-500">
            Discover a World of Knowledge at Your Fingertips. Your Daily Dose of
            Inspiration and Information.
          </p>
        </div>
        <img
          src="/src/assets/profile.jpeg"
          alt="Wannasing's Images"
          className="h-[530px] object-cover rounded-lg shadow-lg lg:w-1/3 mx-4 mb-8 lg:mb-0"
        />
        <div className="lg:w-1/3 lg:pl-8">
          <h2 className="text-xl font-semibold mb-2">-Author</h2>
          <h3 className="text-2xl font-bold mb-4">Wannasingh K.</h3>
          <p className="text-gray-500 mb-4">
            I&apos;m a passionate animal lover who enjoys taking care of pets
            and shopping for anything related to them, from toys to food and
            accessories. Exploring new places is another thing I love—whether
            it&apos;s camping in the mountains, relaxing on the beach, or
            discovering hidden spots in nature.
            <br />
            <br />
            Through my blog, I&apos;ll be sharing my adventures, experiences
            with animals, and all the fun things I find along the way. Join me
            on this journey and let&apos;s explore the world together!
          </p>
          <p className="text-gray-500">Follow me on Instagram: @oncenasingh</p>
        </div>
      </div>
    </main>
  );
}

function App() {
  return (
    <>
      <NavBar />
      <HeroSection />
    </>
  );
}

export default App;
