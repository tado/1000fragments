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
    vec2 cq = p * 5.49 + vec2(t * 1.48, -t * 1.80) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 3.88 - t * 1.37;
    v = sin(floor(lv * 3.7) / 3.7 * 6.2831853 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.17 * vnoise2(p * 2.00 + t * 0.86);
    v = sin(wr * 15.85 - t * 3.93 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.32;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin(time * 0.88));
	{ float fr = length(q1); q1 *= 1.0 + -0.54 * fr * fr; }
	q2 = rot2(time * 1.22) * q2;
	{ float fr = length(q2); q2 *= 1.0 + -0.46 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.31);
	float d3 = fieldC(q3, time, 1.74);
	d2 = 0.5 * (d2 + d3);
	float d = min(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.92, 1.27, 1.14) + vec3(0.24, 0.25, 0.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
