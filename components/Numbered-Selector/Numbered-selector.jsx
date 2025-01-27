import styles from "./numbered-selector.module.scss";
import PropTypes from "prop-types";
import iconText from "../../public/PS_Icon_Text.svg";
import iconImg from "../../public/PS_Icon_Img.svg";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const NumberedSelector = ({ section, selectSection }) => {
  const svgLine = () => {
    return (
      <svg width="130" height="60">
        <path
          d="M 0 10 H 50 L 85 45 H 135"
          stroke="black"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    );
  };

  const LeftSide = () => {
    return (
      <>
        <span className={`${styles.number} ${geistMono.variable} `}>
          {section.sectionNumber}
        </span>
        <div
          className={`${styles.line} ${
            section.sectionNumber !== "01" ? styles.flipLine : null
          }`}
        >
          {svgLine()}
        </div>
      </>
    );
  };

  const RightSide = () => {
    return (
      <>
        <div
          className={`${styles.line} ${styles.flipLine} ${styles.transform}`}
        >
          {svgLine()}
        </div>
        <span className={styles.number}>{section.sectionNumber}</span>
      </>
    );
  };

  return (
    <div
      className={`${styles.numberedSelector} fadeIn`}
      onClick={() => selectSection(section.sectionNumber)}
    >
      <li className={`${styles.numberWrapper}`}>
        {section.isNumberLeft ? LeftSide() : RightSide()}
      </li>
      <span
        className={`${styles.text} ${!section.isNumberLeft ? "flexEnd" : ""}`}
      >
        <Image
          src={section.sectionNumber === "01" ? iconText : iconImg}
          alt=""
          className={styles.image}
        />
      </span>
    </div>
  );
};

export default NumberedSelector;

NumberedSelector.propTypes = {
  selectSection: PropTypes.func,
  section: PropTypes.shape({
    sectionNumber: PropTypes.string,
    title: PropTypes.string,
    isNumberLeft: PropTypes.bool,
  }),
};
