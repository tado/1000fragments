uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 18.35 + t * 0.65 + ph) * 0.7;
    float wb = sin(p.y * 15.29 - t * 2.12 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.58;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 5.0 + t * 0.71 + ph), sin(lt * 5.0 + t * 1.34)) * 0.92;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.21) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.21; p = rot2(0.41) * p; }
	p = fract(p * 2.85) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.82);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.18 + time * 0.08, vec3(0.44, 0.60, 0.50), vec3(0.31, 0.37, 0.40), vec3(1.09, 0.96, 1.28), vec3(0.63, 0.13, 0.74));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.89 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
