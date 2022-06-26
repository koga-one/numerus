import type { NextPage } from "next";
import { useRouter } from "next/router";
import { createRef, KeyboardEvent, RefObject, useEffect } from "react";
import { Block, Layout } from "../components";
import {
  Conversion,
  Digits,
  Factorization,
  Remainders,
  Transformations,
  Operations,
  Geometry,
  DumbUnits,
  Comparisons,
  Info,
} from "../components/widgets";

const Home: NextPage = () => {
  const router = useRouter();
  const numberEl: RefObject<HTMLInputElement> = createRef();
  const minEl: RefObject<HTMLInputElement> = createRef();
  const maxEl: RefObject<HTMLInputElement> = createRef();

  const randomNumber = () => {
    if (minEl.current && maxEl.current) {
      const minVal = parseInt(minEl.current.value);
      const maxVal = parseInt(maxEl.current.value);
      const number = Math.round(Math.random() * (maxVal - minVal) + minVal);

      if (isNaN(number))
        router.push(`/?number=0`, undefined, { shallow: true });
      else
        router.push(
          `/?number=${number}&min=${minVal}&max=${maxVal}`,
          undefined,
          { shallow: true }
        );
    }
  };

  const handleNumber = () => {
    const number = parseInt(numberEl.current!.value);

    if (minEl.current && maxEl.current) {
      const minVal = parseInt(minEl.current.value);
      const maxVal = parseInt(maxEl.current.value);

      if (isNaN(number))
        router.push(`/?number=0&min=${minVal}&max=${maxVal}`, undefined, {
          shallow: true,
        });
      else
        router.push(
          `/?number=${number}&min=${minVal}&max=${maxVal}`,
          undefined,
          {
            shallow: true,
          }
        );
    } else {
      if (isNaN(number))
        router.push(`/?number=0&min=0&max=1000`, undefined, {
          shallow: true,
        });
      else
        router.push(`/?number=${number}&min=0&max=1000`, undefined, {
          shallow: true,
        });
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleNumber();
    }
  };

  useEffect(() => {
    if (numberEl.current && typeof router.query.number === "string") {
      numberEl.current.value = router.query.number;
    }
    if (minEl.current && typeof router.query.min === "string") {
      minEl.current.value = router.query.min;
    }
    if (maxEl.current && typeof router.query.max === "string") {
      maxEl.current.value = router.query.max;
    }
  }, [
    minEl,
    maxEl,
    numberEl,
    minEl.current?.value,
    maxEl.current?.value,
    numberEl.current?.value,
    router.query.max,
    router.query.min,
    router.query.number,
  ]);

  return (
    <Layout>
      <div className="container mx-auto grid auto-rows-[2rem] grid-cols-1 gap-4 px-1 md:grid-cols-2 lg:grid-cols-3">
        <Block
          title="Quick Operations"
          info="Useful number operations"
          version={0.1}
          rows={11}
          func={Operations}
          n={Number(router.query.number)}
        />
        <Block
          title="Factorization"
          info="Divisors, factorization, primes, etc."
          version={0.2}
          rows={8}
          func={Factorization}
          n={Number(router.query.number)}
        />
        <Block
          title="Conversion"
          info="Converts your number to other bases"
          version={0.1}
          rows={10}
          func={Conversion}
          n={Number(router.query.number)}
        />
        <Block
          title="Digits"
          info="Info about the digits of the number"
          version={0.1}
          rows={9}
          func={Digits}
          n={Number(router.query.number)}
        />
        <Block
          title="Dumb Units"
          info="(N is treated as meters)"
          version={0.1}
          rows={21}
          func={DumbUnits}
          n={Number(router.query.number)}
        />
        <Block
          title="Remainders"
          info="The remainder of N by other numbers"
          version={0.1}
          rows={10}
          func={Remainders}
          n={Number(router.query.number)}
        />
        <Block
          title="Comparisons"
          info="N compared to real-life things!"
          version={0.1}
          rows={10}
          func={Comparisons}
          n={Number(router.query.number)}
        />
        <Block
          title="Geometry"
          info="Some cool geometry-related operations"
          version={0.1}
          rows={9}
          func={Geometry}
          n={Number(router.query.number)}
        />
        <Block
          title="Transformations"
          info="Transforming the original number into cool stuff"
          version={0.2}
          rows={7}
          func={Transformations}
          n={Number(router.query.number)}
        />
        <Block
          title="More to come!"
          info="About the website"
          version={0.1}
          rows={19}
          func={Info}
          n={Number(router.query.number)}
        />
      </div>
      <nav className="container pointer-events-none sticky bottom-1 z-50 my-4 mx-auto grid h-40 grid-cols-1 gap-1 px-1 lg:bottom-8 lg:my-16 lg:h-16 lg:grid-cols-6 lg:px-40">
        <div className="grid grid-cols-2 gap-0.5 rounded-md border-2 border-gure bg-gure dark:border-kami dark:bg-kami lg:col-span-5 lg:grid-cols-5">
          <input
            ref={minEl}
            type="number"
            step="1"
            className="pointer-events-auto rounded-md border-gure bg-kami px-4 py-1 text-sm outline-none placeholder:italic placeholder:text-gure dark:border-kami dark:bg-katsu lg:col-span-2 lg:text-base"
            placeholder="Minimum"
          ></input>
          <input
            ref={maxEl}
            type="number"
            step="1"
            className="pointer-events-auto rounded-md border-gure bg-kami px-4 py-1 text-sm outline-none placeholder:italic placeholder:text-gure dark:border-kami dark:bg-katsu lg:col-span-2 lg:text-base"
            placeholder="Maximum"
          ></input>{" "}
          <button
            type="button"
            onClick={randomNumber}
            className="pointer-events-auto col-span-2 rounded-md bg-gure px-4 py-1 text-sm italic text-kami transition active:bg-ki lg:col-span-1 lg:text-base"
          >
            <p>Random</p>
          </button>
        </div>
        <button
          type="button"
          onClick={handleNumber}
          className="pointer-events-auto order-1 row-span-2 rounded-md border-2 border-gure bg-gure px-4 py-1 italic text-kami transition active:bg-ki dark:border-kami lg:order-none lg:text-2xl"
        >
          <p>Enter</p>
        </button>
        <input
          ref={numberEl}
          type="number"
          step="1"
          className="pointer-events-auto w-full rounded-md border-2 border-gure bg-ki px-4 py-1 outline-none placeholder:italic placeholder:text-gure dark:border-ki dark:bg-kami dark:bg-katsu lg:col-span-5 lg:text-2xl"
          placeholder="Enter a number..."
          onKeyDown={handleKeyDown}
        ></input>
      </nav>
    </Layout>
  );
};

export default Home;
