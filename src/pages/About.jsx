import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  aboutHero,
  storyData,
  experienceData,
  numbersData,
  galleryImages,
  defaultReviews,
  faqData,
} from "../data/aboutData";

import styles from "./About.module.css";

const About = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  const [visibleSections, setVisibleSections] = useState({});

  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem("kamanchaReviews");

    if (saved) {
      return [...defaultReviews, ...JSON.parse(saved)];
    }

    return defaultReviews;
  });

  const [currentReview, setCurrentReview] = useState(0);
  const [reviewModal, setReviewModal] = useState(false);

  const [reviewForm, setReviewForm] = useState({
    name: "",
    text: "",
    rating: 5,
  });

  /* ================================
     SCROLL ANIMATION
  ================================= */

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll("[data-scroll]");

      const newVisibleSections = {};

      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();

        const isVisible =
          rect.top < window.innerHeight * 0.85 &&
          rect.bottom > window.innerHeight * 0.15;

        const id = element.getAttribute("data-scroll");

        newVisibleSections[id] = isVisible;
      });

      setVisibleSections(newVisibleSections);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ================================
     REVIEWS AUTO SLIDER
  ================================= */

  useEffect(() => {
    if (reviews.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentReview((prev) =>
        prev === reviews.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  /* ================================
     FAQ
  ================================= */

  const toggleFaq = (id) => {
    setActiveFaq((prev) => (prev === id ? null : id));
  };

  /* ================================
     REVIEW NAVIGATION
  ================================= */

  const nextReview = () => {
    setCurrentReview((prev) =>
      prev === reviews.length - 1 ? 0 : prev + 1
    );
  };

  const previousReview = () => {
    setCurrentReview((prev) =>
      prev === 0 ? reviews.length - 1 : prev - 1
    );
  };

  /* ================================
     REVIEW FORM
  ================================= */

  const handleReviewChange = (event) => {
    const { name, value } = event.target;

    setReviewForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitReview = (event) => {
    event.preventDefault();

    if (!reviewForm.name.trim() || !reviewForm.text.trim()) {
      return;
    }

    const newReview = {
      id: Date.now(),
      name: reviewForm.name,
      text: reviewForm.text,
      rating: Number(reviewForm.rating),
    };

    const savedReviews =
      JSON.parse(localStorage.getItem("kamanchaReviews")) || [];

    const updatedReviews = [...savedReviews, newReview];

    localStorage.setItem(
      "kamanchaReviews",
      JSON.stringify(updatedReviews)
    );

    setReviews([...defaultReviews, ...updatedReviews]);

    setReviewForm({
      name: "",
      text: "",
      rating: 5,
    });

    setReviewModal(false);
  };

  return (
    <main className={styles.about}>

      {/* ================================
          HERO
      ================================= */}

      <section
        className={styles.hero}
        style={{
          backgroundImage: `url(${aboutHero.image})`,
        }}
      >
        <div className={styles.heroOverlay}></div>

        <div className={styles.heroContent}>
          <span className={styles.heroLabel}>
            KAMANCHA YEREVAN
          </span>

          <h1>{aboutHero.title}</h1>

          <p>{aboutHero.text}</p>

          <div className={styles.heroButtons}>
            <Link
              to="/reservation"
              className={styles.goldButton}
            >
              Ամրագրել սեղան
            </Link>

            <Link
              to="/menu"
              className={styles.outlineButton}
            >
              Տեսնել մենյուն
            </Link>
          </div>
        </div>

        <div className={styles.scrollIndicator}>
          <span></span>
          <p>SCROLL</p>
        </div>
      </section>

      {/* ================================
          STORY
      ================================= */}

      <section
        className={`${styles.story} ${
          visibleSections.story
            ? styles.scrollVisible
            : styles.scrollHidden
        }`}
        data-scroll="story"
      >
        <div className={styles.storyImageBox}>
          <img
            src={storyData.image}
            alt={storyData.title}
          />

          <div className={styles.storyFrame}></div>
        </div>

        <div className={styles.storyContent}>
          <span className={styles.sectionLabel}>
            ՄԵՐ ՊԱՏՄՈՒԹՅՈՒՆԸ
          </span>

          <h2>{storyData.title}</h2>

          <div className={styles.goldLine}></div>

          {storyData.text.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
      </section>

      {/* ================================
          EXPERIENCE
      ================================= */}

      <section
        className={`${styles.experience} ${
          visibleSections.experience
            ? styles.scrollVisible
            : styles.scrollHidden
        }`}
        data-scroll="experience"
      >
        <div className={styles.heading}>
          <span className={styles.sectionLabel}>
            KAMANCHA EXPERIENCE
          </span>

          <h2>Այստեղ ամեն ինչ զգացվում է</h2>

          <p>
            Համը, երաժշտությունը և մթնոլորտը միավորվում են
            մեկ ամբողջական փորձառության մեջ։
          </p>
        </div>

        <div className={styles.experienceGrid}>
          {experienceData.map((item) => (
            <article
              className={`${styles.experienceCard} ${
                visibleSections.experience
                  ? styles.cardVisible
                  : styles.cardHidden
              }`}
              key={item.id}
              style={{
                transitionDelay: `${item.id * 0.15}s`,
              }}
            >
              <div className={styles.experienceImage}>
                <img
                  src={item.image}
                  alt={item.title}
                />

                <span className={styles.experienceIcon}>
                  {item.icon}
                </span>
              </div>

              <div className={styles.experienceBody}>
                <h3>{item.title}</h3>

                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================================
          NUMBERS
      ================================= */}

      <section
        className={`${styles.numbers} ${
          visibleSections.numbers
            ? styles.scrollVisible
            : styles.scrollHidden
        }`}
        data-scroll="numbers"
        style={{
          backgroundImage: `url(${storyData.image})`,
        }}
      >
        <div className={styles.numbersOverlay}></div>

        <div className={styles.numbersGrid}>
          {numbersData.map((item) => (
            <div
              className={`${styles.numberItem} ${
                visibleSections.numbers
                  ? styles.numberVisible
                  : styles.numberHidden
              }`}
              key={item.id}
              style={{
                transitionDelay: `${item.id * 0.12}s`,
              }}
            >
              <strong>{item.number}</strong>

              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ================================
          GALLERY
      ================================= */}

      <section
        className={`${styles.gallery} ${
          visibleSections.gallery
            ? styles.scrollVisible
            : styles.scrollHidden
        }`}
        data-scroll="gallery"
      >
        <div className={styles.heading}>
          <span className={styles.sectionLabel}>
            GALLERY
          </span>

          <h2>Kamancha-ի մթնոլորտը</h2>

          <p>
            Մի փոքրիկ պատուհան դեպի այն աշխարհը,
            որը ստեղծել ենք մեր հյուրերի համար։
          </p>
        </div>

        <div className={styles.galleryGrid}>
          {galleryImages.map((item) => (
            <button
              type="button"
              className={`${styles.galleryItem} ${
                visibleSections.gallery
                  ? styles.galleryVisible
                  : styles.galleryHidden
              }`}
              key={item.id}
              style={{
                transitionDelay: `${item.id * 0.12}s`,
              }}
              onClick={() => setActiveImage(item)}
            >
              <img
                src={item.image}
                alt={item.title}
              />

              <div className={styles.galleryOverlay}>
                <span>{item.title}</span>

                <small>Դիտել</small>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ================================
          REVIEWS
      ================================= */}

      <section
        className={`${styles.reviews} ${
          visibleSections.reviews
            ? styles.scrollVisible
            : styles.scrollHidden
        }`}
        data-scroll="reviews"
      >
        <div className={styles.heading}>
          <span className={styles.sectionLabel}>
            ՄԵՐ ՀՅՈՒՐԵՐԸ
          </span>

          <h2>Նրանց խոսքերով</h2>
        </div>

        <div className={styles.reviewSlider}>
          <button
            type="button"
            className={styles.reviewArrow}
            onClick={previousReview}
          >
            ‹
          </button>

          <div
            className={`${styles.reviewCard} ${styles.reviewChanging}`}
            key={reviews[currentReview].id}
          >
            <div className={styles.reviewStars}>
              {"★".repeat(
                reviews[currentReview].rating
              )}

              {"☆".repeat(
                5 - reviews[currentReview].rating
              )}
            </div>

            <p className={styles.reviewText}>
              “{reviews[currentReview].text}”
            </p>

            <div className={styles.reviewAuthor}>
              <span></span>

              <h3>
                {reviews[currentReview].name}
              </h3>

              <span></span>
            </div>
          </div>

          <button
            type="button"
            className={styles.reviewArrow}
            onClick={nextReview}
          >
            ›
          </button>
        </div>

        <div className={styles.reviewDots}>
          {reviews.map((review, index) => (
            <button
              type="button"
              key={review.id}
              className={
                index === currentReview
                  ? styles.activeDot
                  : styles.dot
              }
              onClick={() => setCurrentReview(index)}
            />
          ))}
        </div>

        <button
          type="button"
          className={styles.reviewButton}
          onClick={() => setReviewModal(true)}
        >
          Կիսվել ձեր կարծիքով
        </button>
      </section>

      {/* ================================
          FAQ
      ================================= */}

      <section
        className={`${styles.faq} ${
          visibleSections.faq
            ? styles.scrollVisible
            : styles.scrollHidden
        }`}
        data-scroll="faq"
      >
        <div className={styles.heading}>
          <span className={styles.sectionLabel}>
            FAQ
          </span>

          <h2>Հաճախ տրվող հարցեր</h2>
        </div>

        <div className={styles.faqList}>
          {faqData.map((item) => (
            <div
              className={`${styles.faqItem} ${
                activeFaq === item.id
                  ? styles.faqActive
                  : ""
              }`}
              key={item.id}
            >
              <button
                type="button"
                className={styles.faqQuestion}
                onClick={() => toggleFaq(item.id)}
              >
                <span>{item.question}</span>

                <strong>
                  {activeFaq === item.id
                    ? "−"
                    : "+"}
                </strong>
              </button>

              <div className={styles.faqAnswer}>
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================
          FINAL CTA
      ================================= */}

      <section
        className={styles.finalCta}
        style={{
          backgroundImage: `url(${aboutHero.image})`,
        }}
      >
        <div className={styles.finalOverlay}></div>

        <div className={styles.finalContent}>
          <span className={styles.sectionLabel}>
            KAMANCHA YEREVAN
          </span>

          <h2>
            Ստեղծեք գեղեցիկ երեկո հայկական համի,
            երաժշտության և ջերմ մթնոլորտի ներքո։
          </h2>

          <div className={styles.finalButtons}>
            <Link
              to="/menu"
              className={styles.goldButton}
            >
              Տեսնել մենյուն
            </Link>

            <Link
              to="/reservation"
              className={styles.outlineButton}
            >
              Ամրագրել սեղան
            </Link>
          </div>
        </div>
      </section>

      {/* ================================
          GALLERY MODAL
      ================================= */}

      {activeImage && (
        <div
          className={styles.modal}
          onClick={() => setActiveImage(null)}
        >
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => setActiveImage(null)}
          >
            ×
          </button>

          <img
            src={activeImage.image}
            alt={activeImage.title}
            className={styles.modalImage}
            onClick={(event) =>
              event.stopPropagation()
            }
          />
        </div>
      )}

      {/* ================================
          REVIEW MODAL
      ================================= */}

      {reviewModal && (
        <div
          className={styles.modal}
          onClick={() => setReviewModal(false)}
        >
          <div
            className={styles.reviewModal}
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setReviewModal(false)}
            >
              ×
            </button>

            <span className={styles.sectionLabel}>
              YOUR EXPERIENCE
            </span>

            <h2>Կիսվեք ձեր կարծիքով</h2>

            <form
              className={styles.reviewForm}
              onSubmit={submitReview}
            >
              <input
                type="text"
                name="name"
                placeholder="Ձեր անունը"
                value={reviewForm.name}
                onChange={handleReviewChange}
              />

              <textarea
                name="text"
                placeholder="Ձեր կարծիքը..."
                value={reviewForm.text}
                onChange={handleReviewChange}
              />

              <div className={styles.rating}>
                <span>Գնահատեք մեզ</span>

                <div>
                  {[1, 2, 3, 4, 5].map(
                    (number) => (
                      <button
                        type="button"
                        key={number}
                        className={
                          number <=
                          reviewForm.rating
                            ? styles.selectedStar
                            : styles.emptyStar
                        }
                        onClick={() =>
                          setReviewForm(
                            (prev) => ({
                              ...prev,
                              rating: number,
                            })
                          )
                        }
                      >
                        ★
                      </button>
                    )
                  )}
                </div>
              </div>

              <button
                type="submit"
                className={styles.submitButton}
              >
                Ուղարկել կարծիքը
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default About;