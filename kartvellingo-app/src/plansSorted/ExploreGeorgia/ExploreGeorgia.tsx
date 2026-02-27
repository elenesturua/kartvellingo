import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ExploreGeorgia.css";

type Section = "overview" | "tbilisi" | "regions" | "food" | "drinks" | "nightlife";

interface Place {
  name: string;
  georgian?: string;
  description: string;
  tip?: string;
}

interface FoodItem {
  name: string;
  georgian: string;
  description: string;
  tip?: string;
}

function ExploreGeorgia() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<Section>("overview");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const tbilisiPlaces: Place[] = [
    {
      name: "Narikala Fortress",
      georgian: "ნარიყალა",
      description: "A restored church from the 4th century overlooking Old Tbilisi. The inside was restored in the 1990s with modern frescos.",
      tip: "Take the cable car up for the best views!"
    },
    {
      name: "Bridge of Peace",
      georgian: "მშვიდობის ხიდი",
      description: "A small, modern design pedestrian bridge. After crossing, there's a tethered air balloon for panoramic views.",
      tip: "Visit at night for the best Old Tbilisi views!"
    },
    {
      name: "Liberty Square",
      georgian: "თავისუფლების მოედანი",
      description: "The gateway to Old Tbilisi. Beautiful when lit up at night. Rustaveli Avenue leading here has the best Christmas decorations.",
    },
    {
      name: "National Botanical Gardens",
      georgian: "ბოტანიკური ბაღი",
      description: "Reach via cable car to Narikala, then walk down through the gardens. A peaceful escape in the city.",
    },
    {
      name: "Chronicles of Georgia",
      georgian: "საქართველოს მატიანე",
      description: "A massive, dramatic monument overlooking Tbilisi Sea (artificial lake). Commemorates 3000 years of Georgian sovereignty and 2000 years of Christianity.",
      tip: "A bit outside city center but worth the trip!"
    },
    {
      name: "Georgian National Museum",
      georgian: "საქართველოს ეროვნული მუზეუმი",
      description: "Highlights: 1.8 million year old homo erectus skulls, archaeological treasures, Soviet era exhibits including Red Army and propaganda.",
    },
    {
      name: "Holy Trinity Cathedral",
      georgian: "სამება",
      description: "One of the biggest Eastern Orthodox cathedrals in the world. Stunning architecture and spiritual significance.",
    },
    {
      name: "Mtatsminda",
      georgian: "მთაწმინდა",
      description: "Take the funicular up, stop at the Pantheon (burial of famous Georgians), continue to the top for amazing night views and the iconic LED antenna.",
    },
  ];

  const regions: Place[] = [
    {
      name: "Kakheti - Wine Region",
      georgian: "კახეთი",
      description: "Eastern Georgia's wine country at the foot of the Caucasus. Home to ancient winemaking traditions, beautiful estates, and incredible hospitality.",
      tip: "Stay at Lopota Lake Resort or Tsinandali Estate. Visit Telavi, the capital, for great wine, food, and architecture."
    },
    {
      name: "Svaneti (Mestia)",
      georgian: "სვანეთი",
      description: "The most beautiful hiking destination in Georgia. Known for 9-13th century stone towers and breathtaking Caucasus scenery.",
      tip: "Try Kubdari - the meat-filled bread from this region!"
    },
    {
      name: "Vardzia",
      georgian: "ვარძია",
      description: "A stunning cave monastery complex carved into a cliff face in southern Georgia. Built in the 12th century.",
    },
    {
      name: "Uplistsikhe",
      georgian: "უფლისციხე",
      description: "An ancient rock-hewn town in eastern Georgia. One of the oldest urban settlements in the Caucasus.",
    },
    {
      name: "Stepantsminda (Kazbegi)",
      georgian: "სტეფანწმინდა",
      description: "A scenic town in northeastern Georgia with incredible mountain scenery. Home to the iconic Gergeti Trinity Church.",
    },
    {
      name: "Kutaisi",
      georgian: "ქუთაისი",
      description: "The old capital of Georgia. Nearby: Prometheus Cave, Sataplia Nature Reserve, and Martvili Canyon.",
    },
  ];

  const foodItems: FoodItem[] = [
    {
      name: "Khinkali",
      georgian: "ხინკალი",
      description: "Georgian dumplings filled with spiced meat and broth. Hold by the top knob, bite a small hole, slurp the juice, then eat!",
      tip: "Best at: Zodiaqo (#1 consensus), Tsiskvili, HB, Puri Guliani"
    },
    {
      name: "Khachapuri Adjaruli",
      georgian: "აჭარული ხაჭაპური",
      description: "Boat-shaped cheese bread with egg and butter. Mix everything together before eating!",
      tip: "Best in Batumi, but available everywhere"
    },
    {
      name: "Khachapuri Imeruli",
      georgian: "იმერული ხაჭაპური",
      description: "Classic round cheese-filled bread from the Imereti region.",
      tip: "Tsiskvili does this well!"
    },
    {
      name: "Khachapuri Megruli",
      georgian: "მეგრული ხაჭაპური",
      description: "Like Imeruli but with extra cheese melted on top. For true cheese lovers!",
    },
    {
      name: "Lobiani",
      georgian: "ლობიანი",
      description: "Looks like khachapuri but filled with seasoned beans instead of cheese.",
    },
    {
      name: "Mtsvadi",
      georgian: "მწვადი",
      description: "Georgian BBQ - pork, beef, or chicken grilled over fire. A must-try!",
    },
    {
      name: "Qababi",
      georgian: "ქაბაბი",
      description: "Meat cooked on fire with pomegranate seeds, wrapped in lavash, served with satsebeli sauce.",
      tip: "A personal favorite and absolute must-try!"
    },
    {
      name: "Ojakhuri",
      georgian: "ოჯახური",
      description: "\"Family-style\" - potatoes with meat and onions served in a clay dish.",
    },
    {
      name: "Pkhali",
      georgian: "ფხალი",
      description: "Finely chopped vegetables (spinach, beets, eggplant) mixed with walnut paste, garlic, and herbs. Often shaped into balls with pomegranate seeds.",
    },
    {
      name: "Lobio",
      georgian: "ლობიო",
      description: "Bean stew, especially good in a clay pot. Served with pickled vegetables and mchadi (cornbread).",
    },
    {
      name: "Kubdari",
      georgian: "კუბდარი",
      description: "Meat-filled bread from Svaneti. Hearty and delicious!",
    },
    {
      name: "Shotis Puri",
      georgian: "შოთის პური",
      description: "Traditional Georgian bread baked in a tone (clay oven). Best with butter or sulguni cheese inside!",
      tip: "The best type of bread!"
    },
    {
      name: "Churchkhela",
      georgian: "ჩურჩხელა",
      description: "Walnuts strung together and dipped in thickened grape juice. A traditional sweet snack.",
    },
    {
      name: "Nazuqi",
      georgian: "ნაზუქი",
      description: "Elite tier sweet bread. The most authentic ones are sold at roadside stands toward the seaside.",
    },
  ];

  const drinks = [
    {
      category: "Wine",
      georgian: "ღვინო",
      items: [
        { name: "Saperavi", georgian: "საფერავი", desc: "Red, dry - the most famous Georgian red" },
        { name: "Kindzmarauli", georgian: "კინძმარაული", desc: "Red, semi-sweet" },
        { name: "Khvanchkara", georgian: "ხვანჭკარა", desc: "Red, semi-sweet/sour - very specific taste" },
        { name: "Rkatsiteli", georgian: "რქაწითელი", desc: "Amber, usually dry to semi-dry" },
        { name: "Tvishi", georgian: "თვიში", desc: "Amber/white, semi-sweet" },
        { name: "Mtsvane", georgian: "მწვანე", desc: "Dry amber (name means 'green')" },
      ],
      tip: "Visit 8000 Mosavali for wine tasting. Good wine is available everywhere in Georgia!"
    },
    {
      category: "Soft Drinks",
      georgian: "სასმელები",
      items: [
        { name: "Lagidze Water", georgian: "ლაღიძის წყალი", desc: "Famous flavored lemonade - try tarragon or cream+chocolate!" },
        { name: "Kompoti", georgian: "კომპოტი", desc: "Sweet fruit drink" },
        { name: "Lemonade", georgian: "ლიმონათი", desc: "Georgian-style with unique flavors (Natakhtari, Zandukeli brands)" },
        { name: "Borjomi", georgian: "ბორჯომი", desc: "Famous mineral water - very specific taste!" },
        { name: "Kvasi", georgian: "ყვასი", desc: "Fermented bread drink" },
      ],
    },
  ];

  const nightlife = [
    {
      name: "Fabrika",
      description: "Universally loved by locals and foreigners. A hostel + courtyard + bars + food. Chill, social, and artsy.",
      tip: "The only bar recommendation that's not overpriced and mid!"
    },
    {
      name: "Bassiani",
      description: "Famous techno club in a Soviet-era swimming pool beneath a stadium. World-renowned.",
    },
    {
      name: "Khidi",
      description: "Another popular techno club. Industrial vibes under a bridge.",
    },
    {
      name: "Sukhishvilebi Dance Show",
      georgian: "სუხიშვილები",
      description: "Traditional Georgian dancing at its finest. Get tickets well ahead of time - they sell out!",
    },
  ];

  return (
    <div className="explore-page">
      <button className="back-button" onClick={() => navigate("/plans")}>
        ← Back to Learning
      </button>

      <div className="explore-header">
        <h1>🇬🇪 Explore Georgia</h1>
        <p className="subtitle">საქართველოს აღმოჩენა</p>
        <p className="intro">Your insider guide to the best of Georgia — from ancient fortresses to the perfect khinkali spot.</p>
      </div>

      <nav className="section-nav">
        {[
          { id: "overview", label: "Overview", emoji: "🗺️" },
          { id: "tbilisi", label: "Tbilisi", emoji: "🏛️" },
          { id: "regions", label: "Regions", emoji: "⛰️" },
          { id: "food", label: "Food", emoji: "🥟" },
          { id: "drinks", label: "Drinks", emoji: "🍷" },
          { id: "nightlife", label: "Nightlife", emoji: "🎭" },
        ].map((section) => (
          <button
            key={section.id}
            className={`nav-tab ${activeSection === section.id ? "active" : ""}`}
            onClick={() => setActiveSection(section.id as Section)}
          >
            <span className="tab-emoji">{section.emoji}</span>
            <span className="tab-label">{section.label}</span>
          </button>
        ))}
      </nav>

      <div className="section-content">
        {activeSection === "overview" && (
          <div className="overview-section">
            <div className="overview-grid">
              <div className="overview-card" onClick={() => setActiveSection("tbilisi")}>
                <span className="card-emoji">🏛️</span>
                <h3>Tbilisi</h3>
                <p>Old Town, fortresses, museums & views</p>
                <span className="georgian-text">თბილისი</span>
              </div>
              <div className="overview-card" onClick={() => setActiveSection("regions")}>
                <span className="card-emoji">⛰️</span>
                <h3>Beyond Tbilisi</h3>
                <p>Wine country, mountains & ancient sites</p>
                <span className="georgian-text">რეგიონები</span>
              </div>
              <div className="overview-card" onClick={() => setActiveSection("food")}>
                <span className="card-emoji">🥟</span>
                <h3>Food Guide</h3>
                <p>Khinkali, khachapuri & local favorites</p>
                <span className="georgian-text">საჭმელი</span>
              </div>
              <div className="overview-card" onClick={() => setActiveSection("drinks")}>
                <span className="card-emoji">🍷</span>
                <h3>Drinks & Wine</h3>
                <p>8000 years of winemaking tradition</p>
                <span className="georgian-text">ღვინო</span>
              </div>
              <div className="overview-card" onClick={() => setActiveSection("nightlife")}>
                <span className="card-emoji">🎭</span>
                <h3>Nightlife & Culture</h3>
                <p>Bars, clubs & traditional dance</p>
                <span className="georgian-text">ღამის ცხოვრება</span>
              </div>
              <div className="overview-card fun-fact">
                <span className="card-emoji">🍔</span>
                <h3>Fun Fact</h3>
                <p>Georgia might have the best McDonald's in the world. Seriously, try it!</p>
                <span className="georgian-text">მაკდონალდსი</span>
              </div>
            </div>
          </div>
        )}

        {activeSection === "tbilisi" && (
          <div className="places-section">
            <h2>🏛️ Sightseeing in Tbilisi</h2>
            <p className="section-intro">From ancient fortresses to modern bridges, Tbilisi blends history with vibrant city life.</p>
            <div className="places-grid">
              {tbilisiPlaces.map((place) => (
                <div 
                  key={place.name} 
                  className={`place-card ${expandedCard === place.name ? "expanded" : ""}`}
                  onClick={() => setExpandedCard(expandedCard === place.name ? null : place.name)}
                >
                  <h3>{place.name}</h3>
                  {place.georgian && <span className="georgian-name">{place.georgian}</span>}
                  <p>{place.description}</p>
                  {place.tip && <p className="tip">💡 {place.tip}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "regions" && (
          <div className="places-section">
            <h2>⛰️ Beyond Tbilisi</h2>
            <p className="section-intro">Georgia's diverse landscapes — from wine valleys to mountain villages to ancient cave cities.</p>
            <div className="places-grid">
              {regions.map((place) => (
                <div 
                  key={place.name} 
                  className={`place-card region-card ${expandedCard === place.name ? "expanded" : ""}`}
                  onClick={() => setExpandedCard(expandedCard === place.name ? null : place.name)}
                >
                  <h3>{place.name}</h3>
                  {place.georgian && <span className="georgian-name">{place.georgian}</span>}
                  <p>{place.description}</p>
                  {place.tip && <p className="tip">💡 {place.tip}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "food" && (
          <div className="food-section">
            <h2>🥟 Georgian Food Guide</h2>
            <p className="section-intro">Georgian cuisine is legendary. Here's what to try and where to find the best!</p>
            
            <div className="restaurant-recs">
              <h3>🏆 Top Restaurant Picks</h3>
              <div className="recs-grid">
                <div className="rec-card">
                  <strong>Zodiaqo</strong>
                  <p>Consensus #1 for khinkali</p>
                </div>
                <div className="rec-card">
                  <strong>Tsiskvili</strong>
                  <p>Great Georgian food overall</p>
                </div>
                <div className="rec-card">
                  <strong>HB</strong>
                  <p>Excellent food</p>
                </div>
                <div className="rec-card">
                  <strong>Puri Guliani</strong>
                  <p>Great food, cafe style</p>
                </div>
              </div>
            </div>

            <div className="food-grid">
              {foodItems.map((item) => (
                <div 
                  key={item.name} 
                  className={`food-card ${expandedCard === item.name ? "expanded" : ""}`}
                  onClick={() => setExpandedCard(expandedCard === item.name ? null : item.name)}
                >
                  <div className="food-header">
                    <h3>{item.name}</h3>
                    <span className="georgian-name">{item.georgian}</span>
                  </div>
                  <p>{item.description}</p>
                  {item.tip && <p className="tip">💡 {item.tip}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "drinks" && (
          <div className="drinks-section">
            <h2>🍷 Drinks & Wine</h2>
            <p className="section-intro">Georgia is the birthplace of wine — with 8000 years of tradition. Good wine is available everywhere!</p>
            
            {drinks.map((category) => (
              <div key={category.category} className="drink-category">
                <h3>{category.category} <span className="georgian-name">{category.georgian}</span></h3>
                {category.tip && <p className="category-tip">💡 {category.tip}</p>}
                <div className="drinks-grid">
                  {category.items.map((drink) => (
                    <div key={drink.name} className="drink-card">
                      <strong>{drink.name}</strong>
                      <span className="drink-georgian">{drink.georgian}</span>
                      <p>{drink.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === "nightlife" && (
          <div className="nightlife-section">
            <h2>🎭 Nightlife & Culture</h2>
            <p className="section-intro">From world-famous techno clubs to traditional dance performances.</p>
            
            <div className="nightlife-grid">
              {nightlife.map((place) => (
                <div key={place.name} className="nightlife-card">
                  <h3>{place.name}</h3>
                  {place.georgian && <span className="georgian-name">{place.georgian}</span>}
                  <p>{place.description}</p>
                  {place.tip && <p className="tip">💡 {place.tip}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="vocab-footer">
        <h3>🗣️ Useful Phrases</h3>
        <div className="phrase-grid">
          <div className="phrase">
            <span className="georgian">მომეცით...</span>
            <span className="transliteration">mometsit...</span>
            <span className="english">Give me...</span>
          </div>
          <div className="phrase">
            <span className="georgian">ანგარიში, თუ შეიძლება</span>
            <span className="transliteration">angarishi, tu sheidzleba</span>
            <span className="english">The bill, please</span>
          </div>
          <div className="phrase">
            <span className="georgian">გემრიელია!</span>
            <span className="transliteration">gemrielia!</span>
            <span className="english">It's delicious!</span>
          </div>
          <div className="phrase">
            <span className="georgian">გაუმარჯოს!</span>
            <span className="transliteration">gaumarjos!</span>
            <span className="english">Cheers! (toast)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExploreGeorgia;
