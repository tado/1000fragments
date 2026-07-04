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
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 4.29;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.85); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.40, 0.54, rv + 0.04 * sin(t * 1.65 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.42;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.61) * p * 13.42;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.50;
	float v = smoothstep(rad, rad - 0.13, length(hf));
	vec3 col = palette(d * 0.55 + time * 0.13, vec3(0.46, 0.53, 0.50), vec3(0.35, 0.46, 0.44), vec3(1.06, 0.91, 1.23), vec3(0.96, 0.20, 0.18)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
