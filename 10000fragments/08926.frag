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
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 3.05;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.43); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.41, 0.56, rv + 0.08 * sin(t * 2.43 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.56;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.04) * p * 14.75;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.56;
	float v = smoothstep(rad, rad - 0.15, length(hf));
	vec3 col = palette(d * 1.05 + time * 0.03, vec3(0.44, 0.47, 0.56), vec3(0.44, 0.40, 0.32), vec3(1.37, 1.36, 0.74), vec3(0.22, 0.87, 0.75)) * v;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.12;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
