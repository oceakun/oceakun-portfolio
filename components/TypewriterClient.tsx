'use client';
import Typewriter from 'typewriter-effect';

interface TypewriterClientProps {
  name: string;
  alias: string;
}

export default function TypewriterClient({
  name,
  alias,
}: TypewriterClientProps) {
  return (
    <Typewriter
      options={{
        autoStart: true,
        loop: true,
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString(
            `<span class="dark:text-yellow-200 text-rose-500">${name}</span>`
          )
          .pauseFor(2500)
          .deleteAll()
          .callFunction(() => {
            console.log('All strings were deleted');
          })
          .typeString(
            `<span class="dark:text-yellow-200 text-rose-500">${alias}</span>`
          )
          .pauseFor(2500)
          .deleteAll()
          .start();
      }}
    />
  );
}
