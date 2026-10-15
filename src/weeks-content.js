// Course content for the eight weekly pages. Edit text here, then run ./build.sh.
// Paragraph strings may contain simple inline HTML (<em>, <strong>).

module.exports = {
  course: { code: "GEOL 105", title: "Earth Through Time" },
  units: {
    u1: { n: 1, name: "Earth Materials" },
    u2: { n: 2, name: "A Restless Planet" },
    u3: { n: 3, name: "Deep Time" },
    u4: { n: 4, name: "Earth Now" }
  },
  overview: {
    lede: "Welcome to GEOL 105. Over eight weeks you'll learn to read Earth's history in its rocks, from the planet's formation 4.54 billion years ago to the layer we're laying down today. Read this page first. It explains how the course works and how to get help.",
    welcome: [
      "Every cliff, riverbank and road cut is a record of the past. Geologists read those records the way historians read documents: layer by layer, looking for clues about what happened and when. By the end of this course you'll be able to do the same.",
      "No background in science is needed. Each week builds on the one before, so work through them in order. The course is fully online, and you can do the work at any time of day as long as you meet the weekly deadlines."
    ],
    rhythm: [
      ["Read", "Two short readings introduce the week's big ideas."],
      ["Study", "A diagram or chart shows the key idea at a glance."],
      ["Check", "Ungraded questions let you test yourself before moving on."],
      ["Activity", "A lab, map or writing task. This is what you submit."],
      ["Reflect", "A short field journal entry connects the week to your world."]
    ],
    grading: [
      ["Weekly activities", 50, "Seven labs and tasks, Weeks 1–7"],
      ["Final project", 30, "A layer from your town, Week 8"],
      ["Field journal", 20, "One short entry each week"]
    ],
    needs: [
      ["A computer with internet access", "Everything is online. There is no textbook to buy."],
      ["The lab packet", "A PDF in this Start Here module, used in Weeks 1, 4 and 5."],
      ["A phone or camera", "For photographing rocks in Week 2 and for your final project."],
      ["About 3 to 4 hours a week", "Each week's page lists its own time estimate."]
    ],
    policies: [
      ["Late work", "Activities submitted up to three days late lose 10%. After that, contact your instructor. If something serious comes up, reach out early: extensions are easier to arrange before a deadline than after."],
      ["Academic integrity", "Your work should be your own. You're welcome to discuss ideas with classmates, but write your own answers and cite any sources you use."],
      ["Accessibility", "If you have an accommodation plan, share it with your instructor in Week 1. Every diagram in the course has a text description, and every chart has a data table."],
      ["Communication", "Course updates are posted as announcements. Check them at the start of each week. Email is the best way to reach your instructor."]
    ],
    instructor: {
      name: "Dr. Rosa Alvarez",
      initials: "RA",
      role: "Associate Professor, Earth Sciences",
      email: "ralvarez@example.edu",
      hours: "Tuesdays & Thursdays, 1:00–2:30 pm, online",
      reply: "Within one business day"
    }
  },
  weeks: [
    /* ---------------------------------------------------------------- WEEK 1 */
    {
      unit: "u1",
      title: "Welcome to Planet Earth",
      topics: "Course tour, Earth's layers, how we see inside",
      lede: "Before we read four and a half billion years of history, we need to know the planet that wrote it. This week is a tour from the crust to the core, and of how geologists know what's down there without ever seeing it.",
      time: "About 3 hours",
      objectives: [
        "Describe Earth's layers by composition and by physical behavior",
        "Explain how seismic waves reveal the structure of Earth's interior",
        "Use density data to reason about what lies beneath the surface"
      ],
      path: [
        ["Read", "Earth from the inside out", "45 min"],
        ["Study", "The interior diagram", "15 min"],
        ["Check", "Check your understanding", "15 min"],
        ["Lab", "Lab 1: How dense is Earth?", "90 min"],
        ["Reflect", "Field journal, entry 1", "20 min"]
      ],
      sections: [
        {
          h: "A planet in layers",
          p: [
            "Earth is not the same all the way through. When the young planet was hot enough to be partly molten, heavy iron sank toward the center and lighter rock rose toward the surface. Geologists call this sorting <em>differentiation</em>, and it left Earth in three main layers.",
            "The <strong>crust</strong> is the thin outer skin. Continental crust is made mostly of granite-like rock and averages about 35 km thick, reaching 70 km under big mountain ranges. Oceanic crust is denser basalt, only 5 to 10 km thick.",
            "The <strong>mantle</strong> is about 2,900 km thick and makes up roughly 84% of Earth's volume. It is solid rock, but over millions of years it flows very slowly, like extremely stiff putty. That slow flow drives the plate motions we'll study in Unit 2.",
            "The <strong>core</strong> is mostly iron and nickel. The outer core is liquid, and its swirling motion generates Earth's magnetic field. The inner core is solid even though it is about 5,200 °C, close to the temperature of the Sun's surface. The pressure there is so great that the metal can't melt."
          ]
        },
        {
          h: "Seeing through solid rock",
          p: [
            "Nobody has ever been to the mantle. The deepest hole ever drilled reaches about 12 km, which is 0.2% of the way to the center. Almost everything we know about the deep interior comes from earthquakes.",
            "Earthquakes send out two main kinds of body waves. <strong>P waves</strong> are compression waves that can travel through solids and liquids. <strong>S waves</strong> shake rock side to side and can only travel through solids. When seismographs around the world record a large earthquake, there is a broad zone on the far side of the planet where S waves never arrive. Something liquid is blocking them: the outer core.",
            "In 1936 the Danish seismologist Inge Lehmann noticed faint P waves arriving in a zone where none were expected. She proposed that they were bouncing off a solid inner core, and she was right."
          ]
        }
      ],
      figure: {
        id: "interior",
        caption: "Earth's interior, drawn to scale. The crust is too thin to show at this size. If Earth were an apple, the crust would be thinner than its skin."
      },
      fieldNote: {
        place: "Kola Superdeep Borehole, Russia",
        text: "Soviet scientists started drilling here in 1970. By 1989 they had reached 12,262 meters, where the rock was about 180 °C, far hotter than expected. The heat made the rock behave almost like plastic, and the drill could go no further. It is still the deepest hole humans have ever made, and it barely got a third of the way through the continental crust."
      },
      terms: [
        ["Differentiation", "The sorting of a planet into layers by density, with the heaviest material sinking to the center."],
        ["Lithosphere", "The rigid outer shell: the crust plus the uppermost mantle. It is broken into tectonic plates."],
        ["Asthenosphere", "The weak, slowly flowing layer of upper mantle that the plates ride on."],
        ["Seismic wave", "Energy that travels through Earth after an earthquake. Its speed and path reveal what it passes through."],
        ["P wave", "A compression wave. The fastest seismic wave; travels through solids and liquids."],
        ["S wave", "A shear wave. Slower than P waves, and cannot travel through liquids."]
      ],
      checks: [
        ["Why is the inner core solid even though it is hotter than the outer core?", "Pressure. The enormous pressure at the center raises the melting point of iron above the actual temperature, so the inner core stays solid. The outer core is under less pressure, so it is liquid."],
        ["A seismograph on the far side of Earth records P waves from an earthquake but no S waves. What does that tell you?", "S waves can't travel through liquid. Their absence on the far side shows that a liquid layer, the outer core, lies in their path."],
        ["Continental crust is thicker than oceanic crust. Which one is denser, and why does that matter?", "Oceanic crust (basalt) is denser. When the two collide, the denser oceanic crust sinks beneath the continent. You'll see why that matters in Week 3."]
      ],
      activity: {
        title: "Lab 1: How dense is Earth?",
        steps: [
          "Using the table in the lab packet, record the density of granite (2.7 g/cm³), basalt (3.0 g/cm³) and peridotite (3.3 g/cm³).",
          "Compare those values with Earth's average density: 5.51 g/cm³.",
          "In 3 to 4 sentences, explain what that difference tells you about the materials deep inside the planet."
        ],
        deliverable: "Submit one page with your table and explanation."
      }
    },

    /* ---------------------------------------------------------------- WEEK 2 */
    {
      unit: "u1",
      title: "Rocks & the Rock Cycle",
      topics: "Igneous, sedimentary and metamorphic rocks",
      lede: "Every rock is a record of how it formed: cooled from melt, settled out of water, or squeezed by heat and pressure. Learn to read those three stories and you can read a landscape.",
      time: "About 3.5 hours",
      objectives: [
        "Identify the three rock families by how they form",
        "Trace a rock's path through the rock cycle",
        "Read texture clues such as crystal size, layering and banding"
      ],
      path: [
        ["Read", "Three ways to make a rock", "50 min"],
        ["Study", "The rock cycle diagram", "15 min"],
        ["Check", "Check your understanding", "15 min"],
        ["Lab", "Lab 2: Rock ID at home", "90 min"],
        ["Reflect", "Field journal, entry 2", "20 min"]
      ],
      sections: [
        {
          h: "Three ways to make a rock",
          p: [
            "<strong>Igneous rocks</strong> crystallize from molten rock. Cooling speed controls crystal size. Magma that cools slowly deep underground grows large crystals you can see, as in granite. Lava that cools quickly at the surface makes tiny crystals, as in basalt, or even glass, as in obsidian.",
            "<strong>Sedimentary rocks</strong> form at the surface. Older rock is broken down by weathering, and the pieces are carried by water, wind or ice and laid down in layers. Over time the layers are buried, compacted and cemented into sandstone, shale or limestone. Because they form at ordinary temperatures, sedimentary rocks are where almost all fossils are found.",
            "<strong>Metamorphic rocks</strong> are existing rocks transformed by heat and pressure without melting. Minerals recrystallize and often line up in bands called foliation. Shale becomes slate, then schist, then gneiss as conditions intensify. Limestone becomes marble."
          ]
        },
        {
          h: "A cycle with no beginning",
          p: [
            "In the 1780s the Scottish farmer and naturalist James Hutton realized that these processes connect. Mountains erode into sediment, sediment becomes rock, rock is buried and transformed or melted, and new rock is pushed back up to erode again.",
            "Hutton concluded that Earth must be unimaginably old for this cycle to have run so many times. He wrote that he found \"no vestige of a beginning, no prospect of an end.\" That idea, now called <em>deep time</em>, is the foundation of this course."
          ]
        }
      ],
      figure: {
        id: "rockcycle",
        caption: "The rock cycle. Given the right conditions and enough time, any rock can become any other kind."
      },
      fieldNote: {
        place: "Siccar Point, Scotland",
        text: "In 1788 Hutton took two friends by boat to this headland. There, nearly vertical layers of gray rock are capped by gently sloping red sandstone. The lower layers had to be deposited, buried, tilted on end, lifted up and worn flat before the upper layers were laid on top. Hutton's companion John Playfair later wrote that \"the mind seemed to grow giddy by looking so far into the abyss of time.\""
      },
      terms: [
        ["Intrusive", "Igneous rock that cooled underground. Slow cooling gives large crystals."],
        ["Extrusive", "Igneous rock that cooled at the surface. Fast cooling gives small crystals or glass."],
        ["Lithification", "The process of compacting and cementing loose sediment into solid rock."],
        ["Clastic", "Sedimentary rock built from fragments of other rocks, like sandstone."],
        ["Foliation", "Parallel bands or sheets in a metamorphic rock, caused by minerals aligning under pressure."],
        ["Parent rock", "The original rock that was transformed into a metamorphic rock."]
      ],
      checks: [
        ["You find two igneous rocks. One has crystals you can see, and the other has crystals too small to see. Which one cooled underground?", "The one with visible crystals. Slow cooling underground gives crystals time to grow large."],
        ["Why are fossils almost never found in igneous rock?", "Molten rock destroys organic remains. Fossils are preserved when organisms are buried in sediment at normal surface temperatures."],
        ["Marble and limestone are both made mostly of the mineral calcite. What's the difference?", "Marble is limestone that has been recrystallized by heat and pressure. Its crystals interlock, and the original grains, pores and fossils are erased."]
      ],
      activity: {
        title: "Lab 2: Rock ID at home",
        steps: [
          "Find three different rocks: a garden stone, a building stone, a countertop, or gravel.",
          "Photograph each one next to a coin for scale.",
          "For each rock, note crystal size, any layering or banding, and its color.",
          "Classify each one as igneous, sedimentary or metamorphic and give one piece of evidence."
        ],
        deliverable: "Upload your three photos and a three-row table."
      }
    },

    /* ---------------------------------------------------------------- WEEK 3 */
    {
      unit: "u2",
      title: "Plate Tectonics",
      topics: "Continental drift, seafloor spreading, plate boundaries",
      lede: "The ground under you is moving at about the speed your fingernails grow. Over millions of years, that slow drift opens oceans, raises mountains and rearranges whole continents.",
      time: "About 3 hours",
      objectives: [
        "Summarize the evidence for continental drift and seafloor spreading",
        "Distinguish the three types of plate boundary and the features each one creates",
        "Connect plate motion to the rock cycle"
      ],
      path: [
        ["Read", "From drift to plates", "50 min"],
        ["Study", "Plate boundary diagram", "15 min"],
        ["Check", "Check your understanding", "15 min"],
        ["Explore", "Map activity: Find the boundaries", "60 min"],
        ["Reflect", "Field journal, entry 3", "20 min"]
      ],
      sections: [
        {
          h: "From drift to plates",
          p: [
            "In 1912 the German meteorologist Alfred Wegener proposed that the continents had once been joined in a single landmass and had since drifted apart. His evidence was strong: the coastlines of South America and Africa fit together, the same fossil reptile, <em>Mesosaurus</em>, appears on both, and ancient glacial deposits turn up in places that are now tropical.",
            "Most geologists rejected the idea because Wegener couldn't explain what moved the continents. The answer came from the seafloor. In the 1950s Marie Tharp, working with Bruce Heezen, mapped a deep rift valley running down the center of the Mid-Atlantic Ridge. Magnetic surveys then showed matching stripes of rock on either side of the ridges, recording flips in Earth's magnetic field as new crust formed and spread outward.",
            "The seafloor is young. Almost none of it is older than about 200 million years, because it is constantly made at ridges and destroyed elsewhere. By the late 1960s these discoveries had come together as <strong>plate tectonics</strong>: Earth's rigid outer shell is broken into plates that move a few centimeters a year."
          ]
        },
        {
          h: "Where plates meet",
          p: [
            "<strong>Divergent boundaries</strong> are where plates pull apart. Magma rises to fill the gap and forms new crust, as along the Mid-Atlantic Ridge and in Iceland.",
            "<strong>Convergent boundaries</strong> are where plates collide. When oceanic crust meets a continent, the denser ocean plate sinks back into the mantle, a process called subduction. That creates deep ocean trenches and chains of volcanoes like the Andes. When two continents collide, neither sinks easily, and the crust crumples into huge mountain ranges like the Himalaya.",
            "<strong>Transform boundaries</strong> are where plates slide past each other. Crust is neither created nor destroyed, but the plates lock and slip, causing frequent earthquakes. California's San Andreas Fault is the best-known example."
          ]
        }
      ],
      figure: {
        id: "boundaries",
        caption: "The three kinds of plate boundary. Divergent and convergent boundaries are shown in cross-section; the transform boundary is shown from above."
      },
      fieldNote: {
        place: "Þingvellir, Iceland",
        text: "In Þingvellir National Park you can walk along a rift valley where the North American and Eurasian plates are pulling apart by about 2 cm a year. In the Silfra fissure, divers swim through clear glacial meltwater in the crack between the two plates."
      },
      terms: [
        ["Plate", "A rigid slab of lithosphere that moves as a unit over the asthenosphere."],
        ["Subduction", "The sinking of one plate beneath another into the mantle at a convergent boundary."],
        ["Mid-ocean ridge", "An undersea mountain chain where plates diverge and new oceanic crust forms."],
        ["Trench", "A deep, narrow valley in the ocean floor where a plate is subducting."],
        ["Seafloor spreading", "The creation of new oceanic crust at ridges and its movement away from them."],
        ["Paleomagnetism", "The record of Earth's past magnetic field preserved in rocks."]
      ],
      checks: [
        ["The oldest continental rocks are about 4 billion years old, but the oldest seafloor is only about 200 million years old. Why the difference?", "Oceanic crust is dense and is recycled into the mantle at subduction zones. Continental crust is too light to sink, so very old pieces of it survive."],
        ["The Andes have many active volcanoes, but the Himalaya have almost none. Why?", "The Andes sit above an oceanic plate subducting under a continent, which melts mantle rock and feeds volcanoes. The Himalaya formed where two continents collided, and no plate is subducting deep enough to make magma."],
        ["Iceland sits on the Mid-Atlantic Ridge. Is it getting wider or narrower?", "Wider, by about 2 cm a year, because the plates on either side are moving apart."]
      ],
      activity: {
        title: "Map activity: Find the boundaries",
        steps: [
          "Open the USGS \"This Dynamic Planet\" map, or any world map of plate boundaries.",
          "Find three examples of each boundary type: divergent, convergent and transform.",
          "For each example, name the feature it has created, such as a ridge, trench, volcanic arc, mountain range or fault."
        ],
        deliverable: "Submit a labeled screenshot or a list of nine locations."
      }
    },

    /* ---------------------------------------------------------------- WEEK 4 */
    {
      unit: "u2",
      title: "Earthquakes & Volcanoes",
      topics: "Faults, magnitude, eruption styles",
      lede: "Plate boundaries are where Earth releases its energy, sometimes in a matter of seconds. This week: why faults snap, why some volcanoes ooze while others explode, and how scientists measure both.",
      time: "About 3.5 hours",
      objectives: [
        "Explain how stress builds up and is released along a fault",
        "Interpret earthquake magnitude on a logarithmic scale",
        "Relate magma composition to how explosive an eruption will be"
      ],
      path: [
        ["Read", "Stored strain, sudden release", "40 min"],
        ["Study", "The magnitude scale", "15 min"],
        ["Check", "Check your understanding", "15 min"],
        ["Lab", "Lab 4: Locate an epicenter", "90 min"],
        ["Reflect", "Field journal, entry 4", "20 min"]
      ],
      sections: [
        {
          h: "Stored strain, sudden release",
          p: [
            "Plates don't glide smoothly. Along a fault, friction locks the rocks together while the plates keep moving, so the rock slowly bends and stores energy. When the stress finally overcomes friction, the fault slips and the rock snaps back. This idea, called <strong>elastic rebound</strong>, came from studying the 1906 San Francisco earthquake.",
            "The point underground where the slip begins is the <strong>focus</strong>. The point on the surface directly above it is the <strong>epicenter</strong>.",
            "Scientists measure earthquake size with the moment magnitude scale. It is logarithmic: each step up of one whole number releases about 32 times more energy. A magnitude 7 releases roughly 1,000 times the energy of a magnitude 5."
          ]
        },
        {
          h: "Why volcanoes behave differently",
          p: [
            "Whether a volcano erupts gently or violently depends mostly on how thick, or <strong>viscous</strong>, its magma is. Viscosity depends on silica content and dissolved gas.",
            "Low-silica basalt magma is runny. Gas bubbles escape easily, so the lava pours out in flows and fountains, as at Kīlauea in Hawai‘i.",
            "High-silica magma is sticky and traps gas. Pressure builds until the magma shatters in an explosion that throws out ash and sends avalanches of hot gas and rock, called pyroclastic flows, racing downhill. Mount St. Helens in 1980 and Mount Pinatubo in 1991 were eruptions of this kind."
          ]
        }
      ],
      figure: {
        id: "magnitude",
        caption: "Five historic earthquakes on the moment magnitude scale. Because the scale is logarithmic, the Valdivia earthquake released about 16,000 times more energy than Northridge.",
        table: { head: ["Earthquake", "Year", "Magnitude"], rows: [["Northridge, USA", "1994", "6.7"], ["Haiti", "2010", "7.0"], ["San Francisco, USA", "1906", "7.9"], ["Tōhoku, Japan", "2011", "9.1"], ["Valdivia, Chile", "1960", "9.5"]] }
      },
      fieldNote: {
        place: "Mount St. Helens, Washington",
        text: "On May 18, 1980, a magnitude 5.1 earthquake shook loose the bulging north face of the volcano, causing the largest landslide in recorded history. With the weight suddenly removed, the gas-rich magma inside blasted sideways and flattened about 600 km² of forest. The mountain lost about 400 meters of height in a single morning."
      },
      terms: [
        ["Fault", "A fracture in rock along which the two sides have moved."],
        ["Focus", "The point underground where an earthquake rupture begins. Also called the hypocenter."],
        ["Epicenter", "The point on Earth's surface directly above the focus."],
        ["Elastic rebound", "The sudden snapping back of bent rock when a locked fault slips."],
        ["Viscosity", "A fluid's resistance to flow. High-viscosity magma is thick and sticky."],
        ["Pyroclastic flow", "A fast-moving avalanche of hot gas, ash and rock from an explosive eruption."]
      ],
      checks: [
        ["About how much more energy does a magnitude 8 earthquake release than a magnitude 6?", "About 1,000 times. Each step is about 32 times more energy, and 32 × 32 ≈ 1,000."],
        ["Why are Hawaiian eruptions usually much less explosive than the 1980 eruption of Mount St. Helens?", "Hawaiian magma is low-silica basalt. It is runny, so gas escapes easily instead of building up pressure."],
        ["News reports give an earthquake's location as a point on a map. Is that the focus or the epicenter?", "The epicenter, the point on the surface above where the rupture began. The focus is underground."]
      ],
      activity: {
        title: "Lab 4: Locate an epicenter",
        steps: [
          "The lab packet lists the gap between P-wave and S-wave arrival times at three seismograph stations.",
          "Convert each gap into a distance using the travel-time chart. As a rule of thumb, each second of gap is about 8 km.",
          "On the map, draw a circle around each station with that distance as its radius.",
          "Mark the epicenter where all three circles meet."
        ],
        deliverable: "Submit your map with the three circles and the epicenter marked."
      }
    },

    /* ---------------------------------------------------------------- WEEK 5 */
    {
      unit: "u3",
      title: "Reading the Rock Record",
      topics: "Relative dating, unconformities, radiometric dating",
      lede: "Rock layers are pages in Earth's diary. This week you'll learn to put those pages in order, and then to put real dates on them.",
      time: "About 3.5 hours",
      objectives: [
        "Apply the principles of relative dating to a sequence of rock layers",
        "Recognize unconformities and explain what they represent",
        "Calculate the age of a sample from its half-lives"
      ],
      path: [
        ["Read", "Putting events in order", "50 min"],
        ["Study", "The half-life chart", "15 min"],
        ["Check", "Check your understanding", "15 min"],
        ["Lab", "Lab 5: Tell the story of a cliff", "90 min"],
        ["Reflect", "Field journal, entry 5", "20 min"]
      ],
      sections: [
        {
          h: "Putting events in order",
          p: [
            "In 1669 the Danish scientist Nicolas Steno set out simple rules that geologists still use. <strong>Superposition</strong>: in undisturbed layers, the oldest is at the bottom and the youngest at the top. <strong>Original horizontality</strong>: sediment settles in flat layers, so tilted or folded layers were disturbed later.",
            "<strong>Cross-cutting relationships</strong> add another rule: anything that cuts through rock layers, such as a fault or a vein of igneous rock, must be younger than the layers it cuts.",
            "Sometimes layers are missing. An <strong>unconformity</strong> is a surface where rock was eroded away, or never deposited, before the next layers formed on top. Each one is a gap in the record."
          ]
        },
        {
          h: "Putting numbers on time",
          p: [
            "Relative dating gives order but not ages. Real ages come from radioactive isotopes, which decay into other elements at a steady, known rate. The <strong>half-life</strong> is the time it takes for half of a sample's parent isotope to decay.",
            "By measuring how much parent isotope remains compared with the daughter product it decays into, scientists can calculate how long the clock has been running.",
            "Different isotopes suit different jobs. Carbon-14 has a half-life of 5,730 years and dates once-living material up to about 50,000 years old. Uranium-238 has a half-life of 4.5 billion years and is used to date the oldest rocks on Earth, including mineral grains 4.4 billion years old."
          ]
        }
      ],
      figure: {
        id: "halflife",
        caption: "After each half-life, half of the remaining parent isotope has decayed. For carbon-14, one half-life is 5,730 years.",
        table: { head: ["Half-lives elapsed", "Carbon-14 age (years)", "Parent isotope remaining"], rows: [["0", "0", "100%"], ["1", "5,730", "50%"], ["2", "11,460", "25%"], ["3", "17,190", "12.5%"], ["4", "22,920", "6.25%"], ["5", "28,650", "3.13%"]] }
      },
      fieldNote: {
        place: "Grand Canyon, Arizona",
        text: "Nearly two billion years of history are exposed in the canyon walls. At the Great Unconformity, flat layers of sandstone around 500 million years old sit directly on top of schist that is about 1.75 billion years old. In places, more than a billion years of rock record is simply gone."
      },
      terms: [
        ["Superposition", "In undisturbed layers, older rocks lie below younger rocks."],
        ["Original horizontality", "Sediment is deposited in flat layers. Tilted layers were moved after they formed."],
        ["Cross-cutting relationships", "A feature that cuts through rock is younger than the rock it cuts."],
        ["Unconformity", "A buried surface of erosion or non-deposition: a gap in the rock record."],
        ["Isotope", "A form of an element with a particular number of neutrons. Some isotopes are radioactive."],
        ["Half-life", "The time for half of a radioactive parent isotope to decay."]
      ],
      checks: [
        ["A vertical band of basalt cuts through three sandstone layers. Which is older, the basalt or the sandstone?", "All three sandstone layers are older. The basalt cut through them, so it must have come later."],
        ["A sample has 25% of its original parent isotope left. How many half-lives have passed?", "Two. After one half-life 50% remains, and after two, 25%."],
        ["Why can't carbon-14 be used to date a dinosaur bone?", "Dinosaurs lived more than 66 million years ago. After about 50,000 years too little carbon-14 is left to measure. Geologists instead date volcanic ash layers above and below the fossil using longer-lived isotopes."]
      ],
      activity: {
        title: "Lab 5: Tell the story of a cliff",
        steps: [
          "Use the cross-section in the lab packet. It shows layers A to F, a fault and an igneous dike.",
          "List every event from oldest to youngest.",
          "Beside each event, name the principle that tells you where it belongs in the sequence."
        ],
        deliverable: "Submit your numbered sequence with justifications."
      }
    },

    /* ---------------------------------------------------------------- WEEK 6 */
    {
      unit: "u3",
      title: "Fossils & Mass Extinctions",
      topics: "Fossilization, index fossils, the Big Five",
      lede: "Fossils tell us who lived when. They also record five moments when most life on Earth disappeared, and what came back afterward.",
      time: "About 3 hours",
      objectives: [
        "Explain the conditions that allow an organism to become a fossil",
        "Use index fossils to match rock layers in different places",
        "Compare the causes of the five largest mass extinctions"
      ],
      path: [
        ["Read", "How to become a fossil", "45 min"],
        ["Study", "The Big Five chart", "15 min"],
        ["Check", "Check your understanding", "15 min"],
        ["Write", "Field journal: Adopt an extinct species", "60 min"],
        ["Reflect", "Field journal, entry 6", "20 min"]
      ],
      sections: [
        {
          h: "How to become a fossil",
          p: [
            "Most living things leave no trace. To become a fossil, an organism usually needs hard parts such as shell, bone or wood, and quick burial in sediment that keeps out oxygen and scavengers.",
            "Fossils come in several kinds. <strong>Body fossils</strong> preserve the organism itself, often with its original material replaced by minerals. <strong>Trace fossils</strong> such as footprints, burrows and bite marks record behavior. Molds and casts preserve an organism's shape after the original has dissolved.",
            "Some fossils are especially useful for dating. An <strong>index fossil</strong> comes from a species that was widespread and common but lived for only a short time. Finding the same index fossil in two places means the rocks are about the same age. In 1815 William Smith used fossils this way to make the first geologic map of an entire country, England and Wales."
          ]
        },
        {
          h: "Five times the world nearly ended",
          p: [
            "Species go extinct all the time. A <strong>mass extinction</strong> is different: a large share of all species disappearing in a geologically short time. The rock record shows five of them, known as the Big Five.",
            "The largest was the end-Permian extinction 252 million years ago, sometimes called the Great Dying. Massive volcanic eruptions in Siberia released enormous amounts of carbon dioxide, warming and acidifying the oceans. Roughly nine in ten marine species vanished.",
            "The most famous is the end-Cretaceous extinction 66 million years ago, when an asteroid about 10 km across struck what is now Mexico and ended the age of non-bird dinosaurs. After each extinction, survivors spread into the empty niches. Mammals, small and few before, diversified rapidly after the dinosaurs were gone."
          ]
        }
      ],
      figure: {
        id: "bigfive",
        caption: "The Big Five mass extinctions. Bar heights show the estimated share of marine species lost. Estimates vary between studies.",
        table: { head: ["Extinction", "Million years ago", "Marine species lost (approx.)"], rows: [["End-Ordovician", "445", "85%"], ["Late Devonian", "372", "75%"], ["End-Permian", "252", "90%"], ["End-Triassic", "201", "80%"], ["End-Cretaceous", "66", "76%"]] }
      },
      fieldNote: {
        place: "Gubbio, Italy",
        text: "In the 1970s geologist Walter Alvarez studied a thin layer of clay in the limestone near Gubbio that marks the end of the Cretaceous. With his father Luis, a physicist, he found that it held far more iridium than normal. Iridium is rare in Earth's crust but common in asteroids. Their 1980 paper proposed an impact, and in 1991 the crater was identified: Chicxulub, buried beneath Mexico's Yucatán Peninsula."
      },
      terms: [
        ["Body fossil", "The preserved remains of an organism, such as a shell, bone or leaf."],
        ["Trace fossil", "Evidence of an organism's activity, such as footprints, burrows or droppings."],
        ["Index fossil", "A fossil of a widespread, short-lived species, used to match rock layers by age."],
        ["Mass extinction", "The loss of a large share of Earth's species in a geologically short time."],
        ["Adaptive radiation", "The rapid diversification of a group into many new species, often after an extinction."],
        ["K–Pg boundary", "The rock layer marking the end of the Cretaceous Period, 66 million years ago."]
      ],
      checks: [
        ["Which makes a better index fossil: a species that lived for 50 million years in a single lake, or one that lived for 1 million years in oceans worldwide?", "The ocean species. It was widespread, so it can match rocks across continents, and short-lived, so it pins down a narrow window of time."],
        ["Why are soft-bodied animals like jellyfish so rare in the fossil record?", "With no hard parts, they usually decay or are eaten before they can be buried and preserved."],
        ["What evidence pointed to an asteroid impact at the end of the Cretaceous?", "A worldwide clay layer enriched in iridium, shocked quartz grains and glassy spherules in that layer, and the Chicxulub crater, which is dated to about 66 million years ago."]
      ],
      activity: {
        title: "Field journal: Adopt an extinct species",
        steps: [
          "Choose one species that disappeared in one of the Big Five extinctions.",
          "Describe when and where it lived and what its environment was like.",
          "Explain how we know about it: what kind of fossil, and where it was found.",
          "Describe what happened to its world during the extinction."
        ],
        deliverable: "Submit a 300-word entry with one image of your species."
      }
    },

    /* ---------------------------------------------------------------- WEEK 7 */
    {
      unit: "u4",
      title: "Climate Through Time",
      topics: "Ice cores, climate proxies, the carbon record",
      lede: "Earth's climate has swung from ice-covered to ice-free and back many times. Rocks, ice and fossils record those swings, and they give context to the change happening now.",
      time: "About 3 hours",
      objectives: [
        "Describe how proxies such as ice cores record past climate",
        "Explain natural drivers of climate change over different timescales",
        "Compare today's carbon dioxide levels with the ice-core record"
      ],
      path: [
        ["Read", "Reading old climates", "45 min"],
        ["Study", "The carbon dioxide chart", "15 min"],
        ["Check", "Check your understanding", "15 min"],
        ["Lab", "Data lab: Read the Keeling Curve", "60 min"],
        ["Reflect", "Field journal, entry 7", "20 min"]
      ],
      sections: [
        {
          h: "Reading old climates",
          p: [
            "Thermometers only go back a few centuries, so scientists use <strong>proxies</strong>: natural records that respond to climate. Tree rings, pollen in lake mud, the chemistry of seashells and the shapes of glacial deposits all preserve clues about past temperatures and rainfall.",
            "Ice cores are especially powerful. As snow piles up on ice sheets and compresses into ice, it traps tiny bubbles of air. Each bubble is a sample of the atmosphere from the time it was sealed. The chemistry of the ice itself also records the temperature when the snow fell."
          ]
        },
        {
          h: "What changes the climate",
          p: [
            "Over tens of thousands of years, small, regular changes in Earth's orbit and tilt, called <strong>Milankovitch cycles</strong>, change how sunlight is spread across the planet. They repeat roughly every 100,000, 41,000 and 23,000 years, and they set the rhythm of the ice ages.",
            "Greenhouse gases amplify those changes. When the orbit warms the planet slightly, the oceans release carbon dioxide, which traps more heat. Over millions of years, moving continents and volcanic activity matter too. Around 700 million years ago, Earth may have frozen over almost entirely, an episode called Snowball Earth.",
            "Today, carbon dioxide is above 420 parts per million. That is higher than at any point in the 800,000-year ice-core record, and it is rising much faster than the natural changes recorded there."
          ]
        }
      ],
      figure: {
        id: "keeling",
        caption: "Atmospheric carbon dioxide measured at Mauna Loa Observatory, Hawai‘i (NOAA annual means). The dashed line marks about 300 ppm, the highest level in 800,000 years of ice-core records before the industrial era. The vertical axis starts at 280 ppm.",
        table: { head: ["Year", "CO₂ (ppm)"], rows: [["1960", "316.9"], ["1970", "325.7"], ["1980", "338.8"], ["1990", "354.5"], ["2000", "369.7"], ["2010", "389.9"], ["2020", "414.2"], ["2023", "421.1"]] }
      },
      fieldNote: {
        place: "Dome C, Antarctica",
        text: "Scientists from the European EPICA project drilled 3,270 meters down into the ice at Dome C. The deepest ice fell as snow about 800,000 years ago. Air bubbles from the core record eight ice-age cycles, with carbon dioxide rising and falling between roughly 180 and 300 ppm."
      },
      terms: [
        ["Proxy", "A natural record, such as tree rings or ice, used to estimate past climate."],
        ["Ice core", "A long cylinder of ice drilled from a glacier or ice sheet, layered by year."],
        ["Milankovitch cycles", "Regular changes in Earth's orbit and tilt that pace the ice ages."],
        ["Greenhouse effect", "The warming of Earth's surface by gases that trap outgoing heat."],
        ["Interglacial", "A warmer period between ice ages. We are living in one now."],
        ["Snowball Earth", "Episodes about 700 million years ago when ice may have covered nearly the whole planet."]
      ],
      checks: [
        ["How can a bubble in ancient ice tell us about the past atmosphere?", "When snow compresses into ice, it seals small pockets of air. Measuring the gases in those bubbles gives a direct sample of the atmosphere from that time."],
        ["Name the three Milankovitch cycles' approximate lengths.", "About 100,000 years, 41,000 years and 23,000 years."],
        ["How does today's carbon dioxide level compare with the 800,000-year ice-core record?", "It is above 420 ppm. Before the industrial era, the ice-core record never went higher than about 300 ppm."]
      ],
      activity: {
        title: "Data lab: Read the Keeling Curve",
        steps: [
          "Use the chart and its data table on this page.",
          "Calculate the increase in CO₂ from 1960 to 1970, and from 2010 to 2020.",
          "Compare the two rates. Has the rise sped up, slowed down or stayed the same?",
          "In a short paragraph, connect your answer to what you learned about natural climate change."
        ],
        deliverable: "Submit your two calculations and your paragraph."
      }
    },

    /* ---------------------------------------------------------------- WEEK 8 */
    {
      unit: "u4",
      title: "The Anthropocene",
      topics: "A human layer, golden spikes, course wrap-up",
      lede: "Humans now move more sediment each year than all the world's rivers combined. Will our time leave a layer that future geologists can find? This week we ask that question, and then look back over the whole course.",
      time: "About 4 hours",
      objectives: [
        "Evaluate evidence for a human-made signal in the rock record",
        "Explain how geologists define the boundaries of geologic time units",
        "Place human history on the full scale of Earth's history"
      ],
      path: [
        ["Read", "A human layer", "40 min"],
        ["Study", "Earth's history as one year", "15 min"],
        ["Check", "Check your understanding", "15 min"],
        ["Project", "Final project: A layer from your town", "2 hr"],
        ["Reflect", "Field journal, final entry", "20 min"]
      ],
      sections: [
        {
          h: "A human layer",
          p: [
            "Geologists divide Earth's history into eons, eras, periods and epochs, each defined by changes in the rock record. We officially live in the <strong>Holocene</strong> epoch, which began about 11,700 years ago at the end of the last ice age.",
            "Many scientists argue that human activity has changed the planet enough to define a new unit, the <strong>Anthropocene</strong>. Future geologists would find plenty of evidence: plutonium from nuclear weapons tests in the 1950s, particles of plastic and concrete, ash from burning coal, and the jump in carbon dioxide trapped in ice.",
            "To define a new unit, geologists choose a single reference point in the rock called a <strong>golden spike</strong>. In 2024 the committee responsible voted against making the Anthropocene an official epoch, partly because human effects began at different times in different places. The term is still widely used, and the debate continues."
          ]
        },
        {
          h: "All of time on one calendar",
          p: [
            "Earth's 4.54-billion-year history is hard to picture. One way is to squeeze it into a single calendar year, starting with Earth's formation at midnight on January 1. Each day then stands for about 12.4 million years.",
            "On that calendar, life appears in early March, but complex animals don't show up until mid-November. Dinosaurs disappear the day after Christmas. Our species arrives late on the evening of December 31, and all of recorded history fits into the last minute."
          ]
        }
      ],
      figure: {
        id: "calendar",
        caption: "Earth's history as one calendar year. Each day stands for about 12.4 million years. The lower bar zooms in on December.",
        table: { head: ["Event", "Million years ago", "Calendar date"], rows: "calendar" }
      },
      fieldNote: {
        place: "Crawford Lake, Ontario",
        text: "This small, deep lake has bottom water that almost never mixes, so each year's sediment settles in its own thin layer, like tree rings. Cores from the lake show plutonium appearing sharply in the early 1950s. In 2023 scientists proposed the lake as the golden spike for the Anthropocene. The proposal was voted down in 2024, but the lake's layers remain one of the clearest records of human impact anywhere."
      },
      terms: [
        ["Anthropocene", "A proposed name for the current interval of time, defined by human impact on Earth."],
        ["Holocene", "The current official epoch, which began about 11,700 years ago."],
        ["Golden spike", "The single reference point in rock that marks the start of a geologic time unit. Officially a GSSP."],
        ["Epoch", "A subdivision of a geologic period, such as the Holocene or the Pleistocene."],
        ["Technofossil", "A human-made object likely to be preserved in the rock record, such as plastic or concrete."],
        ["Stratigraphic marker", "A distinctive signal in rock layers that can be traced across the globe."]
      ],
      checks: [
        ["Why is plutonium from 1950s weapons tests such a useful marker?", "It spread around the whole globe, it appears suddenly in a known year, and almost none existed naturally before then."],
        ["If human impact is so clear, why wasn't the Anthropocene made an official epoch?", "The committee had concerns about defining it by a single date in the 1950s, when human effects on Earth built up gradually over thousands of years and began at different times in different places."],
        ["On the one-year calendar, what date do the non-bird dinosaurs disappear?", "December 26, about 66 million years ago."]
      ],
      activity: {
        title: "Final project: A layer from your town",
        steps: [
          "Choose a place near you where you can see layers: a road cut, riverbank, construction site or beach.",
          "Photograph it and describe the layers using what you learned in Units 1 and 3.",
          "Imagine a geologist studying this spot 100,000 years from now. What will today's layer contain?",
          "Present your findings as a poster or a short slide deck."
        ],
        deliverable: "Submit your poster or slides. Projects will be shared in the course showcase."
      }
    }
  ]
};
