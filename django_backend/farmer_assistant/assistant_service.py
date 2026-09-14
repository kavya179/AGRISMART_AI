"""
AgriSmart AI — Grounded Farmer Conversational Assistant
Provides practical, context-aware agricultural guidance across English, Gujarati, Hindi, and Marathi.
Strictly grounded in verified agronomic practices and real model predictions — never invents diagnoses.
"""
from disease_detection.guidance_catalog import get_guidance_for_class

# Multilingual Translations for Assistant Common Responses
ASSISTANT_KNOWLEDGE_BASE = {
    'en': {
        'greeting': "Namaste! I am your AgriSmart Farming Assistant. I can assist you with your active crop ({crop}), fertilizer timing, organic pest remedies, and weather adjustments.",
        'disease_guardrail': "To diagnose a leaf disease accurately, please take or upload a clear photo in the 'Check Crop' tab. Visual analysis by the computer-vision model is required.",
        'disease_context_ref': "Based on your latest scan of '{crop_class}': {precautions}",
        'weather_context_ref': "Current weather notice for your farm: {weather_summary}. {action}",
        'irrigation_context_ref': "Irrigation advisory for your field: {irrigation_action}",
        'default_advice': "For optimal crop yield, ensure balanced NPK fertilization, maintain morning watering schedules, and monitor lower leaves for early spots."
    },
    'hi': {
        'greeting': "नमस्ते! मैं आपका एग्रीस्मार्ट कृषि सहायक हूँ। मैं आपकी फसल ({crop}), खाद का समय, जैविक कीटनाशक और मौसम अनुसार सलाह दे सकता हूँ।",
        'disease_guardrail': "पत्ती के रोग की सही पहचान के लिए कृपया 'फसल जांचें' विकल्प में जाकर साफ फोटो अपलोड करें।",
        'disease_context_ref': "आपकी हालिया जांच '{crop_class}' के अनुसार: {precautions}",
        'weather_context_ref': "मौसम सलाह: {weather_summary}. {action}",
        'irrigation_context_ref': "सिंचाई सलाह: {irrigation_action}",
        'default_advice': "अच्छी पैदावार के लिए संतुलित खाद दें, सुबह के समय पानी दें और पत्तियों पर धब्बों की नियमित जांच करें।"
    },
    'mr': {
        'greeting': "नमस्कार! मी आपला अ‍ॅग्रीस्मार्ट शेती मित्र आहे. मी आपल्या पिकासाठी ({crop}), खत नियोजन, सेंद्रिय उपाय आणि हवामान सल्ला देण्यासाठी सज्ज आहे.",
        'disease_guardrail': "पानावरील रोगाचे अचूक निदान करण्यासाठी कृपया 'पीक तपासा' विभागात जाऊन पानाचा स्पष्ट फोटो अपलोड करा.",
        'disease_context_ref': "आपल्या मागील तपासणीनुसार ('{crop_class}'): {precautions}",
        'weather_context_ref': "हवामान सल्ला: {weather_summary}. {action}",
        'irrigation_context_ref': "पाणी व्यवस्थापन: {irrigation_action}",
        'default_advice': "चांगल्या उत्पादनासाठी संतुलित खत व्यवस्थापन करा, सकाळी पाणी द्या आणि पानांवर रोगाची लक्षणे वेळेवर तपासा."
    },
    'gu': {
        'greeting': "નમસ્તે! હું તમારો એગ્રીસ્માર્ટ ખેડૂત મિત્ર છું. હું તમારા પાક ({crop}), ખાતરનું સમયપત્રક, જૈવિક દવાઓ અને હવામાન અનુસાર માર્ગદર્શન આપી શકું છું.",
        'disease_guardrail': "પાંદડાના રોગની ચોક્કસ ઓળખ માટે કૃપા કરીને 'પાક તપાસો' ટેબમાં જઈને સ્પષ્ટ ફોટો અપલોડ કરો.",
        'disease_context_ref': "તમારી તાજેતરની તપાસ ('{crop_class}') અનુસાર: {precautions}",
        'weather_context_ref': "હવામાન સલાહ: {weather_summary}. {action}",
        'irrigation_context_ref': "સિંચાઈ સલાહ: {irrigation_action}",
        'default_advice': "વધુ સારા ઉત્પાદન માટે સંતુલિત ખાતર આપો, સવારના સમયે પાણી આપો અને પાંદડા પર રોગના ટપકાં નિયમિત તપાસો."
    }
}


class FarmerAssistantService:
    """
    Context-aware conversational assistant grounded in actual farm state and disease detection catalogs.
    """

    @classmethod
    def generate_response(cls, query, language='en', context=None):
        """
        Process farmer query with context augmentation and strict diagnostic guardrails.
        """
        lang = language if language in ASSISTANT_KNOWLEDGE_BASE else 'en'
        kb = ASSISTANT_KNOWLEDGE_BASE[lang]
        q_lower = (query or '').lower().strip()
        context = context or {}

        crop = context.get('crop') or context.get('primaryCrop') or 'Crop'
        growth_stage = context.get('growth_stage') or 'Vegetative / Flowering'
        recent_disease = context.get('recent_disease_prediction') or {}
        weather_data = context.get('weather') or {}
        irrigation_data = context.get('irrigation_status') or {}

        # 1. Strictly enforce guardrail against hallucinating / guessing un-scanned disease
        disease_intent_keywords = ['what disease', 'diagnose', 'identify disease', 'which infection', 'रोग कौन सा', 'કયો રોગ', 'कोणता रोग']
        is_asking_for_diagnosis = any(k in q_lower for k in disease_intent_keywords)

        if is_asking_for_diagnosis and not recent_disease.get('class'):
            return {
                'reply': kb['disease_guardrail'],
                'suggested_action': 'Upload leaf photo in Check Crop tab',
                'grounded_sources': ['Disease Detection Computer Vision Model'],
                'confidence': 'high'
            }

        # 2. Check if asking about the existing diagnosed disease
        if recent_disease.get('class') and (
            'disease' in q_lower or 'blight' in q_lower or 'spot' in q_lower or 'treat' in q_lower or
            'उपचार' in q_lower or 'रोग' in q_lower or 'दवा' in q_lower or 'સારવાર' in q_lower or 'ઉપાય' in q_lower
        ):
            disease_class = recent_disease.get('class')
            guidance = get_guidance_for_class(disease_class)
            if isinstance(guidance, list):
                precautions = " ".join(guidance)
            elif isinstance(guidance, dict):
                precautions = " ".join(guidance.get('precautions', ['Maintain clean field sanitation.']))
            else:
                precautions = str(guidance)

            if lang == 'gu':
                reply = f"તમારા પાકમાં મળેલ '{disease_class}' માટે ભલામણ કરેલ ઉપાય: {precautions}"
            elif lang == 'hi':
                reply = f"आपकी फसल में मिले '{disease_class}' के लिए अनुशंसित कदम: {precautions}"
            elif lang == 'mr':
                reply = f"आपल्या पिकात आढळलेल्या '{disease_class}' साठी उपाय: {precautions}"
            else:
                reply = f"For your diagnosed '{disease_class}': {precautions}"

            return {
                'reply': reply,
                'suggested_action': 'Apply recommended treatment and re-inspect in 3 days',
                'grounded_sources': [f'Guidance Catalog: {disease_class}'],
                'confidence': 'verified_model_context'
            }

        # 3. Natural / Organic Remedies (Neem oil, Vermicompost)
        if (
            'neem' in q_lower or 'organic' in q_lower or 'spray' in q_lower or
            'जैविक' in q_lower or 'सेंद्रिय' in q_lower or 'કુદરતી' in q_lower or
            'લીમડો' in q_lower or 'લીમડા' in q_lower or 'તેલ' in q_lower or 'છાંટવું' in q_lower
        ):
            if lang == 'gu':
                reply = "કુદરતી લીમડાનું તેલ છંટકાવ: ૧ લિટર પાણીમાં ૫ મિલી લીમડાનું તેલ અને ૧ મિલી પ્રવાહી સાબુ મિક્સ કરો. સવારે ૭ થી ૧૦ વાગ્યાની વચ્ચે પાંદડાની ઉપર અને નીચે સરખી રીતે છાંટો."
            elif lang == 'hi':
                reply = "जैविक नीम का तेल स्प्रे: 1 लीटर पानी में 5ml नीम का तेल और 1ml तरल साबुन मिलाएं। सुबह 7 से 10 बजे के बीच पत्तियों के ऊपर और नीचे समान रूप से छिड़काव करें।"
            elif lang == 'mr':
                reply = "सेंद्रिय कडुलिंब अर्क फवारणी: १ लिटर पाण्यात ५ मिली कडुलिंबाचे तेल आणि १ मिली शाम्पू मिसळा. सकाळी ७ ते १० दरम्यान पानांच्या दोन्ही बाजूंना फवारा."
            else:
                reply = "Organic Neem Spray Recipe: Mix 5ml cold-pressed Neem Oil + 1ml mild liquid soap in 1 Liter water. Spray both upper and lower leaf surfaces during early morning (7:00 AM – 10:00 AM)."

            return {
                'reply': reply,
                'suggested_action': 'Spray early morning to avoid bee disruption',
                'grounded_sources': ['Organic Pest Management Protocol'],
                'confidence': 'high'
            }

        # 4. Fertilizer / Nutrition Questions
        if 'urea' in q_lower or 'fertilizer' in q_lower or 'npk' in q_lower or 'खाद' in q_lower or 'खत' in q_lower or 'ખાતર' in q_lower or 'પોષણ' in q_lower:
            if lang == 'gu':
                reply = f"{crop} પાક માટે નાઇટ્રોજન (યુરિયા) ૨ થી ૩ હપ્તામાં આપો. ફૂલ આવવાના તબક્કે વધારાનો યુરિયા આપવાનું ટાળો અને પોટાશ તેમજ ફોસ્ફરસ જમીનમાં મૂળ પાસે આપો."
            elif lang == 'hi':
                reply = f"{crop} की फसल में यूरिया 2 से 3 किस्तों में दें। फूल आने के समय अधिक यूरिया न डालें, और जड़ क्षेत्र में पोटाश एवं फॉस्फोरस का संतुलित उपयोग करें।"
            elif lang == 'mr':
                reply = f"{crop} पिकासाठी युरिया २ ते ३ हप्त्यांमध्ये विभागून द्या. फुलधारणेच्या काळात जास्त युरिया देणे टाळा आणि फॉस्फरस व पोटॅशचा समतोल ठेवा."
            else:
                reply = f"For {crop} in the {growth_stage} stage, apply nitrogen (urea) in split doses. Avoid excess nitrogen during flowering to prevent flower drop; maintain balanced Phosphorus and Potassium."

            return {
                'reply': reply,
                'suggested_action': 'Follow Soil Health Card dosage',
                'grounded_sources': ['ICAR Fertilizer Scheduling Guidelines'],
                'confidence': 'high'
            }

        # 5. Watering / Irrigation Questions
        if 'water' in q_lower or 'irrigation' in q_lower or 'पानी' in q_lower or 'पाणी' in q_lower or 'સિંચાઈ' in q_lower or 'પિયત' in q_lower:
            irr_act = irrigation_data.get('recommended_action') or 'Irrigate during early morning (6:00 - 8:30 AM)'
            reason = irrigation_data.get('reason') or 'Prevents evaporative loss and root fungal disease.'
            
            if lang == 'gu':
                reply = f"સિંચાઈ સલાહ: {irr_act}. કારણ: {reason} પાંદડા ભીના ન થાય તે રીતે ટપક પદ્ધતિથી પાણી આપવું હિતાવહ છે."
            elif lang == 'hi':
                reply = f"सिंचाई सलाह: {irr_act}। कारण: {reason} पत्तियों को गीला किए बिना ड्रिप से पानी देना सबसे अच्छा है।"
            elif lang == 'mr':
                reply = f"पाणी सल्ला: {irr_act}. कारण: {reason} पाने न भिजवता ठिबक सिंचनाने पाणी देणे उत्तम राहील."
            else:
                reply = f"Irrigation Advice for your field: {irr_act}. Reason: {reason} Always water near root base to avoid foliar fungal development."

            return {
                'reply': reply,
                'suggested_action': irr_act,
                'grounded_sources': ['FAO-56 Smart Irrigation Model'],
                'confidence': 'high'
            }

        # 6. Weather / Rain Adaptation Questions
        if 'rain' in q_lower or 'weather' in q_lower or 'मौसम' in q_lower or 'हवामान' in q_lower or 'વરસાદ' in q_lower:
            w_summary = weather_data.get('weather_summary') or 'Partly Sunny • Moderate Conditions'
            w_action = weather_data.get('primary_action') or 'Delay spraying if rainfall probability exceeds 40%.'

            if lang == 'gu':
                reply = f"હવામાન માર્ગદર્શન: {w_summary}. સલાહ: {w_action} ભારે વરસાદની શક્યતા હોય ત્યારે ખેતરના નિકાલની વ્યવસ્થા તપાસો."
            elif lang == 'hi':
                reply = f"मौसम मार्गदर्शन: {w_summary}। सलाह: {w_action} बारिश की संभावना होने पर खेत में जल निकासी की व्यवस्था ठीक रखें।"
            elif lang == 'mr':
                reply = f"हवामान मार्गदर्शन: {w_summary}. सल्ला: {w_action} पाऊस अपेक्षित असल्यास शेतातील पाण्याचा निचरा व्यवस्थित ठेवा."
            else:
                reply = f"Weather Guidance: {w_summary}. Advisory: {w_action} Ensure field drainage furrows are open if rain is expected."

            return {
                'reply': reply,
                'suggested_action': 'Check 7-day farm forecast',
                'grounded_sources': ['Open-Meteo Precision Stream'],
                'confidence': 'high'
            }

        # 7. Fallback Contextual Response
        if lang == 'gu':
            reply = f"તમારા {crop} પાક ({growth_stage}) માટે: જમીનમાં પૂરતો ભેજ જાળવો, પાંદડા પર રોગના લક્ષણો તપાસો અને સંતુલિત પોષણ આપો."
        elif lang == 'hi':
            reply = f"आपकी {crop} फसल ({growth_stage}) के लिए: मिट्टी में उचित नमी बनाए रखें, पत्तियों पर रोगों की निगरानी करें और संतुलित पोषण दें।"
        elif lang == 'mr':
            reply = f"आपल्या {crop} पिकासाठी ({growth_stage}): मातीतील ओलावा तपासा, पानांवरील रोगांची पाहणी करा आणि संतुलित खते द्या."
        else:
            reply = f"For your {crop} ({growth_stage}): Maintain root zone moisture, monitor lower leaves for early lesions, and adhere to recommended split fertilization."

        return {
            'reply': reply,
            'suggested_action': 'Monitor crop health and soil moisture',
            'grounded_sources': ['AgriSmart Agronomic Repository'],
            'confidence': 'general_context'
        }
