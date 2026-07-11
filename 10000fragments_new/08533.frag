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
    v = 0.25 * (sin(p.x * 4.09 + t * 0.87 + ph) + sin(p.y * 12.37 - t * 0.87 + ph)
        + sin((p.x + p.y) * 2.47 + t * 0.87 + ph) + sin(length(p) * 17.22 - t * 0.87 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.95 + ph), vnoise2(p * 4.95 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.95 + 1.85 * wq + vec2(1.7, 9.2) + t * 0.38),
                   vnoise2(p * 4.95 + 3.94 * wq + vec2(8.3, 2.8) - t * 0.53));
    v = vnoise2(p * 4.95 + 2.80 * wr) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 11.32 - t * 1.35 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.45;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = (floor(q1 * 21.0) + 0.5) / 21.0;
	q1 *= 1.70;
	q3 = rot2(length(q3) * -2.68 + time * 0.62) * q3;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q3.x += 0.39 / wf * sin(wf * 2.64 * q3.y + time * 1.18); q3.y += 0.27 / wf * cos(wf * 1.59 * q3.x + time * 2.12); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.00);
	float d3 = fieldC(q3, time, 1.20);
	d2 = min(d2, d3);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.87 + time * 0.22, vec3(0.41, 0.47, 0.58), vec3(0.47, 0.31, 0.33), vec3(1.05, 1.21, 1.10), vec3(0.20, 0.93, 0.12));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
