uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}

float field(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 1.87;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.77); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.42, 0.56, rv + 0.04 * sin(t * 1.28 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 1.46;
	p += vec2(sin((time * 0.70) * 1.16), cos((time * 0.70) * 0.61)) * 0.10;
	p.x *= resolution.x / resolution.y;
	p *= 2.76;
	float d = 0.5 + 0.5 * field(p, (time * 0.70), 0.0);
	vec2 hq = rot2(0.85) * p * 21.30;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.60;
	float v = smoothstep(rad, rad - 0.12, length(hf));
	vec3 col = palette(d * 1.40 + (time * 0.70) * 0.23, vec3(0.38, 0.35, 0.35), vec3(0.20, 0.14, 0.18), vec3(0.49, 0.44, 0.83), vec3(0.71, 0.36, 0.15)) * v;
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col = clamp(col, 0.0, 1.0) * vec3(1.052, 0.993, 0.915) * 1.00 + 0.046;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
