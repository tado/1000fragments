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
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 4.32;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 1.09); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.43, 0.51, rv + 0.04 * sin(t * 1.06 + ph)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 3.35;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.22 + 0.06 * sin(t * 4.93 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.0 + 0.20 * sin(time * 3.04);
	p = rot2(time * -1.50) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.52);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.89 + time * 0.15, vec3(0.41, 0.56, 0.50), vec3(0.47, 0.48, 0.47), vec3(0.85, 1.20, 1.30), vec3(0.22, 0.94, 0.71));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
