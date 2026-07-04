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
    vec2 pk = p * 4.20;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.34 + 0.13 * sin(t * 3.36 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 2.14;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.82); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.41, 0.54, rv + 0.05 * sin(t * 0.73 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.61;
	p = rot2(time * -1.13) * p;
	{ float fr = length(p); p *= 1.0 + -0.77 * fr * fr; }
	p.y += sin(p.x * 7.47 + time * 2.83) * 0.27;
	{ p = vec2(atan(p.y, p.x) * 1.54, length(p) * 4.11 - time * 0.90); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.40);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.05 + time * 0.16, vec3(0.50, 0.57, 0.41), vec3(0.35, 0.49, 0.47), vec3(1.02, 0.81, 0.98), vec3(0.43, 0.65, 0.65));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
