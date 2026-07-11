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
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.88) - 0.5;
    float rad = 0.25 + 0.12 * sin(t * 2.21 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 1.86;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.92); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.40, 0.54, rv + 0.06 * sin(t * 2.96 + ph)) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 3.93;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.62); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.41, 0.50, rv + 0.06 * sin(t * 2.90 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.17;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 += vec2(-0.89, -0.59) * sin(length(q1) * 5.15 - time * 1.81) * 0.10;
	{ float fr = length(q1); q1 *= 1.0 + -0.79 * fr * fr; }
	q2 = rot2(q2.y * 3.47 + time * 1.11) * q2;
	q3 = sin(q3 * 1.98 + time * 0.87) * 1.13;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.80);
	float d3 = fieldC(q3, time, 1.88);
	d2 = d2 * d3;
	float d = 0.5 * (d1 + d2);
	vec3 col = hue(d * 0.48 + time * 0.37);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
