import React from "react";
import ScrollStackingCards from "@/pages/home/hooks/ScrollStackingCards";

function NaturallybuiltArea() {
  return (
    <div className="naturallybuiltarea">
      <div className="naturallybuiltarea-text-holder-top">
        <p>SMART DESIGN, NATURAL SOUL</p>
        <h5>
          Vastu-aligned, Solar-powered, <br /> <span>Naturally built</span>
        </h5>
      </div>
      <div>
        <ScrollStackingCards
          className="scroll-stack-container"
          animationType="parallax"
        >
          <div className="naturallybuiltarea-card-content-holder">
            <img src="assets/Eco-friendly villa.png" alt="Eco-friendly villa" />
            <section className="">
              <h3>Cooler Summers, Warmer Winters</h3>
              <p>
                These villas breathe with nature, thanks to mud interlocking
                bricks made with 85% natural earth.This passive design keeps
                indoor temperatures regulated—cooler in summer, warmer in
                winter.The result? Lesser dependence on artificial cooling, and
                a home that&apos;s always in sync with the seasons.
              </p>
            </section>
          </div>
          <div className="naturallybuiltarea-card-content-holder">
            <img
              src="assets/A modern eco-friendly villa.jpg"
              alt="Vastu-aligned villa"
            />
            <section>
              <h3>Space Aligned With Energy</h3>
              <p>
                Designed to honour the principles of Vastu, every villa is
                aligned to maximize positivity and flow.Sunlight, airflow, and
                layout come together in harmony—offering spatial logic with
                spiritual rhythm. It&apos;s architecture that&apos;s as
                intuitive as it is intentional.
              </p>
            </section>
          </div>
          <div className="naturallybuiltarea-card-content-holder">
            <img
              src="assets/Modern eco-friendly villa.png"
              alt="Solar-powered villa"
            />
            <section>
              <h3>
                Powered by the Sun,
                <br /> Connected to the Grid
              </h3>
              <p>
                With rooftop solar panels on every villa, you generate your own
                power and often send extra back to the grid. This isn&apos;t
                just green—it&apos;s smart, reducing energy costs while
                increasing independence. Live off the sun, stay connected to the
                city.
              </p>
            </section>
          </div>
          <div className="naturallybuiltarea-card-content-holder">
            <img
              src="assets/Eco-friendly home with a modern sewage.png"
              alt="Water-efficient villa"
            />
            <section>
              <h3>Waste Less, Water More</h3>
              <p>
                Our Eco STP (Sewage Treatment Plant) and grey water filtration
                systems ensure nothing goes to waste. Used water gets a second
                life—flushing toilets, watering gardens, cooling
                landscapes.It&apos;s water wisdom, built into your everyday
                living.
              </p>
            </section>
          </div>
        </ScrollStackingCards>
      </div>

      <div className="naturallybuiltarea-text-holder-bottom">
        <h5>
          See It, Feel It, <span>Live it</span>
        </h5>
        <p>
          Step inside a world where nature meets design. Explore every corner,
          from sunlit rooms to green pathways — and discover what makes The
          Chimes a villa unlike any other
        </p>
      </div>
    </div>
  );
}

export default NaturallybuiltArea;
