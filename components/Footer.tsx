import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="shadow-footer-lg mt-8 grid h-80 grid-cols-1 items-center bg-kami bg-opacity-5 p-10 lg:h-40 lg:grid-cols-3">
      <div className="order-3 flex justify-center lg:order-1 lg:justify-end">
        © 2022 - {new Date().getFullYear()} - Andre H. Koga
      </div>
      <div className="order-1 flex flex-col place-content-center items-center lg:order-2">
        <Link href="/">
          <a>
            <Image
              src="/favicon.svg"
              alt="The logo of the website"
              width="30px"
              height="30px"
            />
          </a>
        </Link>
        <p className="text-xs">{"numbers are beautiful, aren't they?"}</p>
      </div>
      <div className="order-2 flex justify-center gap-8 text-center lg:order-3 lg:justify-start">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://koga.one"
          className="underline"
        >
          Check out my blog
        </a>
      </div>
    </div>
  );
};

export default Footer;
