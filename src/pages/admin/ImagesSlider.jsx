import React, { useState, useEffect } from "react";
import { Grid, IconButton, Button } from "@mui/material";
import "./imagesSlider.css";

function CustomCarousel({ children, autoPlay, onImageChange }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDone, setSlideDone] = useState(true);
  const [timeID, setTimeID] = useState(null);

  useEffect(() => {
    if (slideDone && autoPlay) {
      setSlideDone(false);
      setTimeID(
        setTimeout(() => {
          slideNext();
          setSlideDone(true);
        }, 5000)
      );
    }
  }, [slideDone, autoPlay]);

  useEffect(() => {
    onImageChange(activeIndex);
  }, [activeIndex, onImageChange]);

  const slideNext = () => {
    setActiveIndex((val) => {
      if (val >= children.length - 1) {
        return 0;
      } else {
        return val + 1;
      }
    });
  };

  const slidePrev = () => {
    setActiveIndex((val) => {
      if (val <= 0) {
        return children.length - 1;
      } else {
        return val - 1;
      }
    });
  };

  const AutoPlayStop = () => {
    if (timeID > 0) {
      clearTimeout(timeID);
      setSlideDone(false);
    }
  };

  const AutoPlayStart = () => {
    if (!slideDone && autoPlay) {
      setSlideDone(true);
    }
  };

  return (
    <>
      <div
        className="container__slider"
        onMouseEnter={AutoPlayStop}
        onMouseLeave={AutoPlayStart}
      >
        {children.map((item, index) => {
          return (
            <div
              className={
                "slider__item slider__item-active-" + (activeIndex + 1)
              }
              key={index}
            >
              {item}
            </div>
          );
        })}

        <button
          className="slider__btn-next"
          onClick={(e) => {
            e.preventDefault();
            slideNext();
          }}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            color: "ButtonShadow",
            border: "none",
            padding: "15px 6px",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          {">"}
        </button>
        <button
          className="slider__btn-prev"
          onClick={(e) => {
            e.preventDefault();
            slidePrev();
          }}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            color: "ButtonShadow",
            border: "none",
            padding: "15px 6px",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          {"<"}
        </button>
      </div>
      <div className="container__slider__links">
        {children.map((item, index) => {
          return (
            <button
              key={index}
              className={
                activeIndex === index
                  ? "container__slider__links-small container__slider__links-small-active"
                  : "container__slider__links-small"
              }
              onClick={(e) => {
                e.preventDefault();
                setActiveIndex(index);
              }}
            ></button>
          );
        })}
      </div>
    </>
  );
}

export default CustomCarousel;
