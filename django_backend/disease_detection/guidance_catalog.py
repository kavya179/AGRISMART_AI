"""
AgriSmart AI - Crop Disease Precautionary Guidance Catalog
Maintains clean, structured advisory guidelines without huge if/else blocks.
Maps normalized disease keys to agricultural management and precautionary actions.
"""

GUIDANCE_CATALOG = {
    # Tomato Diseases
    "tomato_early_blight": [
        "Remove visibly affected lower leaves to prevent spore dispersion.",
        "Avoid overhead sprinkler irrigation; apply water directly to the soil base.",
        "Ensure adequate plant spacing for proper airflow and sunlight penetration.",
        "Apply copper-based organic fungicide or recommended preventative spray early in the morning."
    ],
    "tomato_late_blight": [
        "Destroy and discard severely infected plant debris away from the field.",
        "Avoid handling plants when leaves are wet to reduce fungal transmission.",
        "Improve drainage and ensure field soil is not waterlogged.",
        "Apply protectant bio-fungicide during prolonged periods of high humidity."
    ],
    "tomato_bacterial_spot": [
        "Avoid overhead watering and splashing soil onto foliage.",
        "Disinfect pruning shears and agricultural tools between plants.",
        "Rotate crops with non-solanaceous crops (e.g., legumes, corn) for 2–3 seasons.",
        "Apply copper-mancozeb spray if localized spread begins."
    ],
    "tomato_yellow_leaf_curl_virus": [
        "Control whitefly populations using yellow sticky traps and reflective mulches.",
        "Eradicate weed hosts surrounding the field perimeter.",
        "Use insect-proof netting in nurseries or protected cultivation.",
        "Remove and safely dispose of infected plants showing severe stunting."
    ],
    "tomato_leaf_mold": [
        "Reduce greenhouse/canopy humidity through enhanced cross-ventilation.",
        "Avoid dense planting; prune suckers to improve air circulation.",
        "Keep watering localized to the root zone."
    ],
    "tomato_septoria_leaf_spot": [
        "Remove lower diseased leaves as soon as lesions appear.",
        "Apply organic mulch around plant bases to prevent soil splash.",
        "Sanitize stakes and cages before reusing in subsequent seasons."
    ],
    "tomato_spider_mites": [
        "Spray with neem oil or insecticidal soap on leaf undersides.",
        "Maintain adequate soil moisture; drought stress promotes mite outbreaks.",
        "Encourage natural predatory mites and ladybugs in the field ecosystem."
    ],
    "tomato_target_spot": [
        "Maintain wide row spacing to maximize sunlight and airflow.",
        "Avoid prolonged leaf wetness through drip irrigation.",
        "Apply protective fungicides before flowering if history of target spot exists."
    ],
    "tomato_mosaic_virus": [
        "Wash hands with soap and disinfect tools before handling healthy seedlings.",
        "Do not smoke or handle tobacco products near tomato crops.",
        "Remove and destroy infected plants immediately to prevent sap transmission."
    ],

    # Potato Diseases
    "potato_early_blight": [
        "Maintain optimal soil nitrogen and potassium fertility to avoid plant stress.",
        "Allow vine desiccation and tuber skin curing before harvesting.",
        "Rotate fields with corn, beans, or grains every 2 to 3 years."
    ],
    "potato_late_blight": [
        "Scout fields regularly during cool, humid weather.",
        "Eliminate cull piles and volunteer potato sprouts near the fields.",
        "Ensure hill coverage over growing tubers to prevent spore wash-in."
    ],

    # Corn / Maize Diseases
    "corn_common_rust": [
        "Monitor weather forecasts for humid, overcast conditions.",
        "Utilize certified rust-resistant hybrid seeds in future planting cycles.",
        "Apply foliar fungicide if rust pustules appear before tasseling stage."
    ],
    "corn_northern_leaf_blight": [
        "Incorporate crop residue into soil via tillage after harvest to accelerate decomposition.",
        "Rotate with soybean or other non-grass crops.",
        "Apply labeled fungicides when lesions appear on or below the ear leaf."
    ],
    "corn_gray_leaf_spot": [
        "Practice crop rotation to disrupt fungal overwintering in debris.",
        "Ensure balanced soil fertilization and avoid excessive plant density."
    ],

    # Apple Diseases
    "apple_scab": [
        "Rake and destroy fallen leaves in autumn to eliminate primary inoculum.",
        "Prune tree canopy during dormancy to promote rapid leaf drying.",
        "Apply preventative scab fungicide at green-tip to petal-fall stages."
    ],
    "apple_black_rot": [
        "Prune dead wood, mummified fruits, and cankers during winter dormancy.",
        "Avoid mechanical wounding during fruit development."
    ],
    "apple_cedar_apple_rust": [
        "Remove nearby Eastern red cedar and juniper hosts within 500 meters if feasible.",
        "Apply preventative fungicide from pink bud through petal fall."
    ],

    # Grape Diseases
    "grape_black_rot": [
        "Prune mummified berries and infected canes during the dormant season.",
        "Maintain open canopy architecture with shoot positioning and leaf pulling.",
        "Apply protective sprays starting at early shoot growth (1–3 inches)."
    ],
    "grape_esca_black_measles": [
        "Protect pruning wounds with wound sealants to prevent spore entry.",
        "Avoid making large pruning wounds during wet weather.",
        "Remove and burn dead vine trunks showing internal vascular rot."
    ],
    "grape_leaf_blight": [
        "Improve canopy ventilation by selective leaf thinning around fruit clusters.",
        "Avoid overhead irrigation to minimize humidity in the vineyard."
    ],

    # Pepper (Bell Pepper) Diseases
    "pepper_bacterial_spot": [
        "Use certified disease-free seeds or hot water-treated seeds.",
        "Avoid working in pepper fields when foliage is wet.",
        "Apply copper bactericide sprays at the first sign of leaf spotting."
    ],

    # Healthy Status
    "healthy": [
        "No pathogen symptoms detected; continue routine monitoring.",
        "Maintain balanced soil nutrition (NPK) and moisture levels.",
        "Adhere to integrated pest management (IPM) best practices."
    ],

    # Generic Fallback Guidance
    "generic_disease": [
        "Isolate and monitor affected plants for progression of symptoms.",
        "Avoid overhead irrigation to minimize leaf surface moisture.",
        "Ensure clean agricultural hygiene by sanitizing tools and equipment.",
        "Consult local agricultural extension officer if symptoms spread rapidly."
    ]
}


def normalize_class_name(class_name):
    """
    Normalizes arbitrary class strings (e.g. 'Tomato___Early_blight' or 'Tomato Early Blight')
    into standard catalog lookup keys (e.g. 'tomato_early_blight').
    """
    if not class_name:
        return "generic_disease"

    cleaned = (
        class_name.lower()
        .replace("___", "_")
        .replace("__", "_")
        .replace(" ", "_")
        .replace("-", "_")
        .replace("(", "")
        .replace(")", "")
    )

    # Check for healthy condition
    if "healthy" in cleaned:
        return "healthy"

    return cleaned


def format_display_name(class_name):
    """
    Converts raw class strings (e.g. 'Tomato___Early_blight') into clean human-readable names:
    'Tomato Early Blight'
    """
    if not class_name:
        return "Unknown"
    
    parts = class_name.replace("___", " ").replace("__", " ").replace("_", " ").split()
    return " ".join([p.capitalize() for p in parts])


def determine_health_status(class_name):
    """
    Determines whether the diagnosis is 'healthy' or 'diseased'.
    """
    if not class_name:
        return "unknown"
    
    if "healthy" in class_name.lower():
        return "healthy"
    return "diseased"


def get_guidance_for_class(class_name):
    """
    Retrieves list of precautionary guidelines for a given class name.
    Uses exact lookup first, then substring matching, then generic fallback.
    """
    key = normalize_class_name(class_name)

    # 1. Exact Key Match
    if key in GUIDANCE_CATALOG:
        return GUIDANCE_CATALOG[key]

    # 2. Substring matching against known keys
    for catalog_key, guidance in GUIDANCE_CATALOG.items():
        if catalog_key in key or key in catalog_key:
            return guidance

    # 3. Fallback based on health status
    if "healthy" in key:
        return GUIDANCE_CATALOG["healthy"]

    return GUIDANCE_CATALOG["generic_disease"]
