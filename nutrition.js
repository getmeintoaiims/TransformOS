const NutritionSystem = {
  // Scientific calorie & macro formulas calibrated for recomposition (starting at 90kg, target lean body mass ~72-75kg)
  // Phase deficit steps:
  // Phase 1-3: ~1900 kcal (Protein: 160g, Carbs: 180g, Fat: 50g)
  // Phase 4: ~1700 kcal (Protein: 165g, Carbs: 140g, Fat: 40g) - deep deficit to force absolute fat mobilization
  // Phase 5: ~1800 kcal (Carb depletion/loading period)
 baseMacros: {
    1: { calories: 1900, protein: 195, carbs: 180, fats: 50 }, // Calibrated to 195g
    2: { calories: 1900, protein: 195, carbs: 180, fats: 50 }, // Calibrated to 195g
    3: { calories: 1900, protein: 195, carbs: 180, fats: 50 }, // Calibrated to 195g
    4: { calories: 1700, protein: 195, carbs: 140, fats: 40 }, // Calibrated to 195g
    5: { calories: 1800, protein: 195, carbs: 160, fats: 45 }  // Calibrated to 195g
  },

  // Detailed 700ml Bowl dimensions: Upper diam 15cm, Base diam 7cm, Height 7cm
  bowlMetrics: {
    dimensions: "Upper Diameter: 15cm | Base Diameter: 7cm | Height: 7cm | Volume: ~700ml",
    conversions: [
      { food: "Boiled Soya Chunks (Packed loosely)", rawWeight: "60g", portion: "1 full bowl", protein: "31.2g", carbs: "20g", fats: "0.3g", calories: "204 kcal" },
      { food: "Cooked Dal (Thick, low oil)", rawWeight: "45g", portion: "1 full bowl", protein: "10.8g", carbs: "27g", fats: "0.8g", calories: "158 kcal" },
      { food: "Cooked Rice (Standard white/basmati)", rawWeight: "70g", portion: "1 full bowl", protein: "5.5g", carbs: "56g", fats: "0.5g", calories: "250 kcal" },
      { food: "Home-made Low-fat Curd (Double Toned Milk)", rawWeight: "400g milk base", portion: "1 full bowl", protein: "13.6g", carbs: "19g", fats: "6g", calories: "184 kcal" },
      { food: "Boiled Egg Whites (Roughly chopped)", rawWeight: "8 large eggs", portion: "1 full bowl", protein: "32g", carbs: "1.6g", fats: "0g", calories: "136 kcal" },
      { food: "Low-fat Paneer (Cubed, 150g)", rawWeight: "150g", portion: "0.5 bowl", protein: "27g", carbs: "4.5g", fats: "18g", calories: "288 kcal" },
      { food: "Sattu Drink (4 tbsp Sattu + water)", rawWeight: "35g sattu", portion: "1 bowl height cup", protein: "7.2g", carbs: "22g", fats: "1.8g", calories: "133 kcal" }
    ]
  },

  // 100% Broke Indian Budget Meal Plans (Option A: Egg-itarian, Option B: Strict Vegetarian)
  diets: {
    eggitarian: {
      name: "Egg-itarian Ultra-Budget Recomp Diet (Recommended)",
      meals: [
        {
          name: "Meal 1: Breakfast (Muscle Protein Synthesis Trigger)",
          timing: "08:30 AM",
          items: "1 full bowl of Low-fat Curd + 20g Sattu powder (stirred in) + 1 small banana",
          macros: "Protein: ~18g | Carbs: ~42g | Fats: ~7g | Calories: ~300 kcal",
          rationale: "Quickly digested protein and carbohydrate to restore hepatic glycogen and trigger muscle protein synthesis post-wakeup."
        },
        {
          name: "Meal 2: Lunch (V-Taper Fuel & Satiety)",
          timing: "01:30 PM",
          items: "1 full bowl of Boiled Soya Chunks + 0.5 bowl of Cooked Rice + Green Salad (cucumber, onion) with lemon",
          macros: "Protein: ~34g | Carbs: ~48g | Fats: ~1g | Calories: ~330 kcal",
          rationale: "Extremely high stimulus-to-calorie ratio. Soya chunks provide cheap, dense leucine and arginine. Satiety index is incredibly high due to high volume."
        },
        {
          name: "Meal 3: Pre-Workout Power",
          timing: "04:30 PM (Workout at 5:30 PM)",
          items: "1 bowl cup of Sattu Drink (4 tbsp sattu + water + pinch of pink salt) + 1 boiled whole egg",
          macros: "Protein: ~13g | Carbs: ~23g | Fats: ~7g | Calories: ~205 kcal",
          rationale: "Slow-digesting complex carbs from sattu sustain blood glucose during training, while sodium from pink salt improves muscle pumps and intra-workout hydration."
        },
        {
          name: "Meal 4: Post-Workout Recovery (Anabolic Window)",
          timing: "07:30 PM",
          items: "1 full bowl of Boiled Egg Whites (8 large egg whites) + 1 bowl of Cooked Dal (thick) + 2 medium Whole Wheat Chapatis (Rotis)",
          macros: "Protein: ~51g | Carbs: ~68g | Fats: ~5g | Calories: ~520 kcal",
          rationale: "Premium rapid-absorbing egg albumin combined with complex dal and rotis to maximize muscle tissue repair and replenish muscle glycogen."
        },
        {
          name: "Meal 5: Before Bed (Night anti-catabolic phase)",
          timing: "10:00 PM",
          items: "100g Low-fat Paneer (cooked dry with spices or paneer bhurji) or 1 glass of Double-Toned Milk (300ml)",
          macros: "Protein: ~18g | Carbs: ~5g | Fats: ~12g | Calories: ~200 kcal",
          rationale: "Slow-release Micellar Casein from paneer/milk maintains a positive nitrogen balance for all 8-10 hours of sleep, preventing nocturnal muscle catabolism."
        }
      ]
    },
    vegetarian: {
      name: "Strict Veg Ultra-Budget Recomp Diet (No Eggs)",
      meals: [
        {
          name: "Meal 1: Breakfast",
          timing: "08:30 AM",
          items: "1 full bowl of Low-fat Curd + 30g Sattu powder + 1 small banana",
          macros: "Protein: ~20g | Carbs: ~48g | Fats: ~8g | Calories: ~340 kcal",
          rationale: "Dairy-based calcium and sattu minerals trigger metabolic processes."
        },
        {
          name: "Meal 2: Lunch",
          timing: "01:30 PM",
          items: "1 full bowl of Boiled Soya Chunks + 0.5 bowl of Cooked Rice + Green Salad",
          macros: "Protein: ~34g | Carbs: ~48g | Fats: ~1g | Calories: ~330 kcal",
          rationale: "Low fat density keeps Sean in active lipolysis (fat-burning)."
        },
        {
          name: "Meal 3: Pre-Workout Power",
          timing: "04:30 PM",
          items: "1 bowl cup of Sattu Drink (4 tbsp sattu + water + pinch of pink salt) + 30g Roasted Peanuts",
          macros: "Protein: ~15g | Carbs: ~29g | Fats: ~15g | Calories: ~310 kcal",
          rationale: "Healthy fats support hormone production and joint recovery."
        },
        {
          name: "Meal 4: Post-Workout Recovery",
          timing: "07:30 PM",
          items: "100g Low-fat Paneer (cubed and roasted) + 1 bowl of Cooked Dal (thick) + 2 medium Whole Wheat Chapatis (Rotis)",
          macros: "Protein: ~45g | Carbs: ~65g | Fats: ~13g | Calories: ~560 kcal",
          rationale: "Combines dairy protein and plant protein (dal + wheat) to form a complete amino acid profile, maximizing muscle protein synthesis."
        },
        {
          name: "Meal 5: Before Bed",
          timing: "10:00 PM",
          items: "1 bowl of Low-fat Curd (400g) + 10g roasted pumpkin/sunflower seeds",
          macros: "Protein: ~16g | Carbs: ~20g | Fats: ~8g | Calories: ~210 kcal",
          rationale: "Curd provides slow-release protein, seeds provide magnesium and zinc to optimize sleep and natural testosterone."
        }
      ]
    }
  },

  // Scientific Evidence-Based Supplement Stack
  supplements: [
    {
      name: "Creatine Monohydrate",
      dose: "5g daily",
      timing: "Post-workout with post-workout meal (or morning on rest days)",
      evidence: "Saturates muscle cell phosphocreatine stores. Elevates anaerobic strength, output, and cell hydration. Highly validated.",
      budgetBrand: "Nakpro / As-It-Is (Pure Unflavored - very economical)"
    },
    {
      name: "Caffeine",
      dose: "100-200mg (Black Coffee or 1 tablet)",
      timing: "45 minutes pre-workout (Avoid taking after 2:00 PM if bedtime is 11:00 PM)",
      evidence: "Blocks adenosine receptors, reduces rating of perceived exertion (RPE), increases power output and fat oxidation.",
      budgetBrand: "Nescafe Classic (1-2 tsp in warm water)"
    },
    {
      name: "Citrulline Malate",
      dose: "6g (Pure 2:1 ratio)",
      timing: "45 minutes pre-workout",
      evidence: "Precursor to L-arginine; increases nitric oxide levels. Drastically enhances vasodilation, intra-workout oxygen delivery, and muscle pumps.",
      budgetBrand: "As-It-Is / Doctor's Choice"
    },
    {
      name: "Vitamin D3",
      dose: "2000 IU daily",
      timing: "With breakfast (fat-soluble)",
      evidence: "Optimizes androgen receptor sensitivity and muscle tissue repair. Deficiencies strongly linked to low testosterone and poor recovery.",
      budgetBrand: "Standard pharmacy (e.g., Uprise D3)"
    },
    {
      name: "Intra-Workout Electrolyte Mix",
      dose: "1/4 tsp Pink Himalayan Salt + 1/4 tsp Potassium Salt + Water",
      timing: "Sip throughout training session",
      evidence: "Maintains plasma volume and prevents cramping, restoring cellular mineral balance during intense sweating.",
      budgetBrand: "Home-made (costs practically zero)"
    }
  ],

  // Hydration, Electrolyte & Caffeine circadian timing guidelines
  guidelines: {
    hydration: "Drink 4 to 5 liters of water daily. Monitor urine color (should be pale yellow to clear). Never let training start dehydrated.",
    caffeineTiming: "Do not consume caffeine within 9 hours of sleep. Half-life is 5 hours; quarter-life is 10 hours. Sleep disruption ruins muscle recovery.",
    refeedLogic: "Every 21 days in a continuous deficit, schedule a 24-hour carbohydrate refeed where carbs are increased by 50% and fat is lowered. This resets circulating leptin levels, upregulates thyroid hormones (T3), and restores depleted muscle glycogen."
  },

  // Generates specific daily nutritional instructions
  getDailyNutrition: function(dayNumber) {
    let phaseId = 1;
    if (dayNumber <= 30) phaseId = 1;
    else if (dayNumber <= 76) phaseId = 2;
    else if (dayNumber <= 122) phaseId = 3;
    else if (dayNumber <= 153) phaseId = 4;
    else phaseId = 5;

    const macros = this.baseMacros[phaseId];
    
    // Check if it's a refeed day (every 21 days)
    const isRefeed = (dayNumber % 21 === 0 && dayNumber !== 163);

    return {
      phase: phaseId,
      calories: isRefeed ? macros.calories + 400 : macros.calories,
      protein: macros.protein,
      carbs: isRefeed ? macros.carbs + 100 : macros.carbs,
      fats: isRefeed ? macros.fats - 10 : macros.fats,
      isRefeed: isRefeed,
      refeedNotes: isRefeed ? "REFEED DAY: Carbs increased, fats decreased. Eat 1 extra bowl of cooked rice today. Focus on heavy training." : "Standard Recomposition Plan",
      bowlMetrics: this.bowlMetrics,
      diets: this.diets,
      supplements: this.supplements,
      guidelines: this.guidelines
    };
  }
};
