const StudySystem = {
  // Streamlined 80-chapter NMC NEET Syllabus (Physics, Chemistry, Biology)
  chapters: [
    // --- BIOLOGY (32 Chapters) ---
    { id: "b1", subject: "Biology", name: "The Living World" },
    { id: "b2", subject: "Biology", name: "Biological Classification" },
    { id: "b3", subject: "Biology", name: "Plant Kingdom" },
    { id: "b4", subject: "Biology", name: "Animal Kingdom" },
    { id: "b5", subject: "Biology", name: "Morphology of Flowering Plants" },
    { id: "b6", subject: "Biology", name: "Anatomy of Flowering Plants" },
    { id: "b7", subject: "Biology", name: "Structural Organisation in Animals" },
    { id: "b8", subject: "Biology", name: "Cell: The Unit of Life" },
    { id: "b9", subject: "Biology", name: "Biomolecules" },
    { id: "b10", subject: "Biology", name: "Cell Cycle and Cell Division" },
    { id: "b11", subject: "Biology", name: "Photosynthesis in Higher Plants" },
    { id: "b12", subject: "Biology", name: "Respiration in Plants" },
    { id: "b13", subject: "Biology", name: "Plant Growth and Development" },
    { id: "b14", subject: "Biology", name: "Breathing and Exchange of Gases" },
    { id: "b15", subject: "Biology", name: "Body Fluids and Circulation" },
    { id: "b16", subject: "Biology", name: "Excretory Products and their Elimination" },
    { id: "b17", subject: "Biology", name: "Locomotion and Movement" },
    { id: "b18", subject: "Biology", name: "Neural Control and Coordination" },
    { id: "b19", subject: "Biology", name: "Chemical Coordination and Integration" },
    { id: "b20", subject: "Biology", name: "Sexual Reproduction in Flowering Plants" },
    { id: "b21", subject: "Biology", name: "Human Reproduction" },
    { id: "b22", subject: "Biology", name: "Reproductive Health" },
    { id: "b23", subject: "Biology", name: "Principles of Inheritance and Variation" },
    { id: "b24", subject: "Biology", name: "Molecular Basis of Inheritance" },
    { id: "b25", subject: "Biology", name: "Evolution" },
    { id: "b26", subject: "Biology", name: "Human Health and Disease" },
    { id: "b27", subject: "Biology", name: "Microbes in Human Welfare" },
    { id: "b28", subject: "Biology", name: "Biotechnology: Principles and Processes" },
    { id: "b29", subject: "Biology", name: "Biotechnology and its Applications" },
    { id: "b30", subject: "Biology", name: "Organisms and Populations" },
    { id: "b31", subject: "Biology", name: "Ecosystem" },
    { id: "b32", subject: "Biology", name: "Biodiversity and Conservation" },

    // --- PHYSICS (28 Chapters) ---
    { id: "p1", subject: "Physics", name: "Units and Measurements" },
    { id: "p2", subject: "Physics", name: "Motion in a Straight Line" },
    { id: "p3", subject: "Physics", name: "Motion in a Plane" },
    { id: "p4", subject: "Physics", name: "Laws of Motion" },
    { id: "p5", subject: "Physics", name: "Work, Energy, and Power" },
    { id: "p6", subject: "Physics", name: "System of Particles and Rotational Motion" },
    { id: "p7", subject: "Physics", name: "Gravitation" },
    { id: "p8", subject: "Physics", name: "Mechanical Properties of Solids" },
    { id: "p9", subject: "Physics", name: "Mechanical Properties of Fluids" },
    { id: "p10", subject: "Physics", name: "Thermal Properties of Matter" },
    { id: "p11", subject: "Physics", name: "Thermodynamics" },
    { id: "p12", subject: "Physics", name: "Kinetic Theory of Gases" },
    { id: "p13", subject: "Physics", name: "Oscillations" },
    { id: "p14", subject: "Physics", name: "Waves" },
    { id: "p15", subject: "Physics", name: "Electric Charges and Fields" },
    { id: "p16", subject: "Physics", name: "Electrostatic Potential and Capacitance" },
    { id: "p17", subject: "Physics", name: "Current Electricity" },
    { id: "p18", subject: "Physics", name: "Moving Charges and Magnetism" },
    { id: "p19", subject: "Physics", name: "Magnetism and Matter" },
    { id: "p20", subject: "Physics", name: "Electromagnetic Induction" },
    { id: "p21", subject: "Physics", name: "Alternating Current" },
    { id: "p22", subject: "Physics", name: "Electromagnetic Waves" },
    { id: "p23", subject: "Physics", name: "Ray Optics and Optical Instruments" },
    { id: "p24", subject: "Physics", name: "Wave Optics" },
    { id: "p25", subject: "Physics", name: "Dual Nature of Radiation and Matter" },
    { id: "p26", subject: "Physics", name: "Atoms" },
    { id: "p27", subject: "Physics", name: "Nuclei" },
    { id: "p28", subject: "Physics", name: "Semiconductor Electronics" },

    // --- CHEMISTRY (20 Chapters) ---
    { id: "c1", subject: "Chemistry", name: "Some Basic Concepts of Chemistry" },
    { id: "c2", subject: "Chemistry", name: "Structure of Atom" },
    { id: "c3", subject: "Chemistry", name: "Classification of Elements and Periodicity" },
    { id: "c4", subject: "Chemistry", name: "Chemical Bonding and Molecular Structure" },
    { id: "c5", subject: "Chemistry", name: "Chemical Thermodynamics" },
    { id: "c6", subject: "Chemistry", name: "Equilibrium" },
    { id: "c7", subject: "Chemistry", name: "Redox Reactions" },
    { id: "c8", subject: "Chemistry", name: "p-Block Elements" },
    { id: "c9", subject: "Chemistry", name: "d- and f-Block Elements" },
    { id: "c10", subject: "Chemistry", name: "Coordination Compounds" },
    { id: "c11", subject: "Chemistry", name: "Organic Chemistry: Basic Principles & Techniques" },
    { id: "c12", subject: "Chemistry", name: "Hydrocarbons" },
    { id: "c13", subject: "Chemistry", name: "Solutions" },
    { id: "c14", subject: "Chemistry", name: "Electrochemistry" },
    { id: "c15", subject: "Chemistry", name: "Chemical Kinetics" },
    { id: "c16", subject: "Haloalkanes and Haloarenes" },
    { id: "c17", subject: "Chemistry", name: "Alcohols, Phenols and Ethers" },
    { id: "c18", subject: "Chemistry", name: "Aldehydes, Ketones and Carboxylic Acids" },
    { id: "c19", subject: "Chemistry", name: "Amines" },
    { id: "c20", subject: "Chemistry", name: "Biomolecules" }
  ],

  // Active recall revision levels
  intervals: [3, 10, 30, 60], // Days after initial study to trigger revision checklist items

  getDailyStudy: function(dayNumber) {
    const totalChapters = this.chapters.length; // 80 chapters
    
    let newChapter = null;
    let revisions = [];
    let isSecondPassActive = false;
    let secondPassChapter = null;

    // --- FIRST PASS (Day 1 to 80: June 1st to August 19th) ---
    if (dayNumber <= totalChapters) {
      newChapter = this.chapters[dayNumber - 1];
    } else {
      // --- SECOND PASS (Day 81 to 163: August 20th to November 10th) ---
      // Sean covers the syllabus a second full time systematically
      isSecondPassActive = true;
      const secondPassIndex = (dayNumber - totalChapters - 1) % totalChapters;
      secondPassChapter = this.chapters[secondPassIndex];
    }

    // --- DETERMINISTIC SPACED REPETITION ENGINE ---
    // Scan all prior days to check if any chapter studied on those days triggers a revision today
    for (let d = 1; d < dayNumber; d++) {
      if (d <= totalChapters) { // Only chapters from the First Pass
        const chapterStudied = this.chapters[d - 1];
        const daysElapsed = dayNumber - d;
        
        if (this.intervals.includes(daysElapsed)) {
          revisions.push({
            chapter: chapterStudied,
            interval: daysElapsed,
            type: `Spaced Repetition (Day ${daysElapsed} Review)`
          });
        }
      }
    }

    // Include the active second pass chapter if we are in the second pass period
    if (isSecondPassActive && secondPassChapter) {
      revisions.unshift({
        chapter: secondPassChapter,
        interval: 0,
        type: "Second Pass Systematic Mastery (Active Recall + PyQs)"
      });
    }

    return {
      dayNumber: dayNumber,
      newChapter: newChapter,
      revisions: revisions,
      isSecondPassActive: isSecondPassActive,
      syllabusProgress: Math.min(100, Math.round((Math.max(dayNumber, totalChapters) / totalChapters) * 100))
    };
  }
};
