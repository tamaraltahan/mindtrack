const Welcome = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-6xl font-bold w-full text-center pt-16">
        Welcome to <span className="animate-grow-shrink">MindTrack</span>
      </h1>
      <h2 className="text-4xl text-center mt-10">
        An online journal, and mood tracker
      </h2>
    </div>
  );
};

export default Welcome;
