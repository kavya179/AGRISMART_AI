"""
AgriSmart AI — Sustainability Scoring Engine
Evaluates farm regenerative practices based on reproducible formulas:
Water Efficiency (0-35) + Resource & Soil Health (0-35) + Crop Health & Biodiversity (0-30) = Total Score (0-100)
"""

class SustainabilityScoringEngine:
    """
    Deterministic calculation of farm sustainability index,
    identifying positive contributors ('What is helping'),
    actionable gaps ('What can improve'), and prioritized next steps.
    """

    IRRIGATION_POINTS = {
        'drip': 18,
        'sprinkler': 12,
        'furrow': 8,
        'flood': 3,
    }

    @classmethod
    def calculate_score(cls, params):
        """
        Calculates sustainability metrics based on farmer inputs.

        Parameters expected in `params`:
        - irrigation_method: 'drip', 'sprinkler', 'furrow', 'flood'
        - rainwater_harvesting: bool (default False)
        - moisture_sensor_timing: bool (default True)
        - organic_manure_used: bool (default True)
        - soil_tested: bool (default True)
        - mulching_or_cover_crop: bool (default False)
        - crop_residue_burned: bool (default False, True = penalty)
        - legume_crop_rotation: bool (default True)
        - bio_pesticides_used: bool (default True)
        - regular_disease_monitoring: bool (default True)
        """
        irrigation = str(params.get('irrigation_method', 'drip')).lower()
        has_rainwater = bool(params.get('rainwater_harvesting', False))
        has_timing = bool(params.get('moisture_sensor_timing', True))

        has_organic = bool(params.get('organic_manure_used', True))
        has_soil_test = bool(params.get('soil_tested', True))
        has_mulch = bool(params.get('mulching_or_cover_crop', False))
        residue_burned = bool(params.get('crop_residue_burned', False))

        has_legume = bool(params.get('legume_crop_rotation', True))
        has_biopesticides = bool(params.get('bio_pesticides_used', True))
        has_monitoring = bool(params.get('regular_disease_monitoring', True))

        # 1. Water Efficiency Component (Max 35 Pts)
        w_method = cls.IRRIGATION_POINTS.get(irrigation, 12)
        w_rain = 9 if has_rainwater else 0
        w_timing = 8 if has_timing else 0
        water_score = min(35, w_method + w_rain + w_timing)

        # 2. Resource & Soil Health Component (Max 35 Pts)
        r_organic = 12 if has_organic else 0
        r_test = 10 if has_soil_test else 0
        r_mulch = 8 if has_mulch else 0
        r_residue = 5 if not residue_burned else 0
        resource_score = min(35, r_organic + r_test + r_mulch + r_residue)

        # 3. Crop Health & Biodiversity Component (Max 30 Pts)
        h_legume = 10 if has_legume else 0
        h_bio = 8 if has_biopesticides else 0
        h_monitor = 7 if has_monitoring else 0
        health_score = min(30, h_legume + h_bio + h_monitor)

        # Total Aggregate Score (0 to 100)
        total_score = water_score + resource_score + health_score

        # Grade Determination
        if total_score >= 85:
            grade = 'Grade A+ (Exemplary Regenerative Farm)'
        elif total_score >= 75:
            grade = 'Grade A- (High Sustainable Standard)'
        elif total_score >= 60:
            grade = 'Grade B (Moderate Conservation Standard)'
        elif total_score >= 45:
            grade = 'Grade C (Transitioning Farm)'
        else:
            grade = 'Grade D (Conventional / High Input Dependency)'

        # What is Helping
        helping_factors = []
        if irrigation == 'drip':
            helping_factors.append('Drip micro-irrigation saves 35-45% groundwater and directs moisture straight to roots.')
        elif irrigation == 'sprinkler':
            helping_factors.append('Sprinkler irrigation provides uniform field coverage with low runoff.')
        
        if has_timing:
            helping_factors.append('Smart moisture-scheduled watering avoids daytime solar evaporation losses.')
        if has_rainwater:
            helping_factors.append('Rainwater harvesting recharges local farm aquifers.')
        if has_organic:
            helping_factors.append('Farmyard manure and vermicompost application boosts soil organic carbon (SOC).')
        if has_soil_test:
            helping_factors.append('Laboratory soil testing prevents over-application of synthetic nitrogen/urea.')
        if has_mulch:
            helping_factors.append('Soil mulching prevents topsoil erosion and preserves root moisture.')
        if not residue_burned:
            helping_factors.append('Zero crop-residue burning preserves microbial topsoil diversity.')
        if has_legume:
            helping_factors.append('Legume crop rotation enriches soil with natural biological nitrogen fixation.')
        if has_biopesticides:
            helping_factors.append('Bio-pesticides (Neem oil, Trichoderma) preserve beneficial pollinators and soil microbes.')
        if has_monitoring:
            helping_factors.append('Routine leaf disease surveillance catches fungal outbreaks before severe damage occurs.')

        # What Can Improve
        improvement_areas = []
        if not has_mulch:
            improvement_areas.append('Implement organic straw mulching or cover crops to reduce soil moisture evaporation by up to 25%.')
        if irrigation in ['furrow', 'flood']:
            improvement_areas.append('Transition from flood irrigation to drip systems to cut power bills and save pumping water.')
        if not has_rainwater:
            improvement_areas.append('Construct a farm pond or bund rainwater catchment to recharge shallow farm aquifers.')
        if not has_legume:
            improvement_areas.append('Introduce short-duration pulses (Moong/Urad/Gram) in the crop rotation schedule.')
        if residue_burned:
            improvement_areas.append('Cease crop stubble burning; incorporate residue using mulchers to build humus.')

        # Recommended Action
        if not has_mulch:
            recommended_action = 'Apply crop residue or dry straw mulching around vegetable beds to conserve 25% moisture during summer.'
        elif not has_legume:
            recommended_action = 'Plant a 60-day Green Gram (Moong) intercrop after harvest to fix ~35 kg of nitrogen per hectare.'
        elif not has_rainwater:
            recommended_action = 'Excavate a micro farm pond on the lowest field contour to harvest monsoon runoff.'
        else:
            recommended_action = 'Continue current regenerative regimen and conduct annual soil carbon testing to maintain Grade A rating.'

        return {
            'sustainability_score': total_score,
            'max_score': 100,
            'rating_grade': grade,
            'score_breakdown': {
                'water_efficiency': {
                    'score': water_score,
                    'max': 35,
                    'percentage': f'{(water_score / 35) * 100:.1f}%'
                },
                'resource_and_soil_health': {
                    'score': resource_score,
                    'max': 35,
                    'percentage': f'{(resource_score / 35) * 100:.1f}%'
                },
                'crop_health_and_biodiversity': {
                    'score': health_score,
                    'max': 30,
                    'percentage': f'{(health_score / 30) * 100:.1f}%'
                }
            },
            'what_is_helping': helping_factors,
            'what_can_improve': improvement_areas,
            'recommended_action': recommended_action,
            'formula_reference': 'S = W(max 35) + R(max 35) + H(max 30)'
        }
