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

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 7.12;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.29 + 0.06 * sin(t * 4.18 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float bx = p.x + (vnoise2(vec2(p.y * 2.66, t * 0.52)) - 0.5) * 0.86;
    v = exp(-abs(bx) * 10.05) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.28;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.73; kp = rot2(1.35) * kp; kp *= 1.16; }
    v = sin(kp.x * 1.15 - t * 2.24 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.94;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q3 = abs(q3) - 0.59;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.60);
	float d3 = fieldC(q3, time, 1.75);
	d2 = max(d2, d3);
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.09, 0.40, 0.28), vec3(0.62, 0.88, 0.78), cc);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
