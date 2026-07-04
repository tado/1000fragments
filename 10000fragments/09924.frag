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
    float ma = sin(length(p - vec2(0.59, 0.0)) * 21.63 - t * 3.48 + ph);
    float mb = sin(length(p + vec2(0.59, 0.0)) * 33.09 - t * 6.26 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.27 * vnoise2(p * 4.07 + t * 0.89);
    v = sin(wr * 17.68 - t * 3.58 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 10.08 + sin(p.y * 2.51 + t * 1.95) * 1.61 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.05;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float fr = length(q2); q2 *= 1.0 + 0.72 * fr * fr; }
	q3 = rot2(length(q3) * -1.25 + time * 1.37) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.84);
	float d3 = fieldC(q3, time, 0.36);
	d2 = max(d2, d3);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.17, 0.10, 0.42), vec3(0.58, 0.73, 0.81), cc);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.15 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
