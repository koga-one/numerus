import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  createRef,
  KeyboardEvent,
  RefObject,
  useEffect,
  useState,
} from "react";
import { Block, Layout } from "../components";
import { IsEven } from "../components/Widgets";

const Home: NextPage = () => {
  const [n, setN] = useState(0);
  const router = useRouter();
  const numberEl: RefObject<HTMLInputElement> = createRef();

  const randomNumber = () => {
    const size = Math.floor(Math.random() * 12);
    const number = Math.floor(Math.random() * Math.pow(10, size));

    if (isNaN(number)) router.push(`/?number=0`, undefined, { shallow: true });
    else router.push(`/?number=${number}`, undefined, { shallow: true });
  };

  const handleNumber = () => {
    const number = parseInt(numberEl.current!.value);

    if (isNaN(number)) router.push(`/?number=0`, undefined, { shallow: true });
    else router.push(`/?number=${number}`, undefined, { shallow: true });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleNumber();
    }
  };

  useEffect(() => {
    if (typeof router.query.number === "string") {
      setN(parseInt(router.query.number));
      numberEl.current!.value = n.toString();
    } else {
      setN(0);
      numberEl.current!.value = "0";
    }
  }, [handleNumber]);

  return (
    <Layout title="HOME">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 container mx-auto px-1 gap-4">
        <Block title="Primes" version={0.1} answers={[IsEven]} n={n} />
      </div>
      <div className="flex bottom-1 lg:bottom-8 h-12 lg:h-16 sticky px-1 my-4 lg:my-16 pointer-events-none z-50 content-center place-content-center mx-auto container gap-1">
        <input
          ref={numberEl}
          type="number"
          step="1"
          className="pointer-events-auto lg:text-2xl text-xl w-full px-4 py-1 lg:w-1/2 border-2 border-katsu dark:border-kami dark:bg-katsu placeholder:italic placeholder:text-gure rounded-md bg-kami"
          placeholder="Enter a number..."
          onKeyDown={handleKeyDown}
        ></input>
        <button
          type="button"
          onClick={randomNumber}
          className="border-2 active:bg-ki transition border-katsu dark:border-kami pointer-events-auto rounded-md text-xl lg:text-2xl bg-kami text-katsu italic px-4 py-1"
        >
          <p>Random</p>
        </button>
        <button
          type="button"
          onClick={handleNumber}
          className="border-2 active:bg-ki transition border-katsu dark:border-kami pointer-events-auto rounded-md text-xl lg:text-2xl bg-kami text-katsu italic px-4 py-1"
        >
          <p>Enter</p>
        </button>
      </div>
    </Layout>
  );
};

export default Home;
