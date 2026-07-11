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

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.33, 0.0)) * 15.42 - t * 4.28 + ph);
    float mb = sin(length(p + vec2(0.33, 0.0)) * 37.62 - t * 6.19 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.59 + ph), vnoise2(p * 4.59 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.59 + 2.03 * wq + vec2(1.7, 9.2) + t * 1.02),
                   vnoise2(p * 4.59 + 3.33 * wq + vec2(8.3, 2.8) - t * 1.04));
    v = vnoise2(p * 4.59 + 1.13 * wr) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 1.15 + vec2(t * 0.69, -t * 0.87);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = (floor(q1 * 18.0) + 0.5) / 18.0;
	q2 = rot2(time * 1.19) * q2;
	{ q2 = vec2(atan(q2.y, q2.x) * 2.13, length(q2) * 5.12 - time * 0.74); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.28);
	float d3 = fieldC(q3, time, 0.06);
	d2 = abs(d2 - d3);
	float d = d1 * d2;
	vec3 col = palette(d * 0.50 + time * 0.02, vec3(0.42, 0.47, 0.46), vec3(0.41, 0.43, 0.34), vec3(0.82, 0.81, 1.02), vec3(0.25, 0.03, 0.47));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
