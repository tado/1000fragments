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
    vec2 kp = p * 1.06;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.71; kp = rot2(0.67) * kp; kp *= 1.18; }
    v = sin(kp.x * 1.31 - t * 1.60 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.80) - 0.5;
    float rad = 0.31 + 0.12 * sin(t * 1.29 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.23 * vnoise2(p * 4.10 + t * 0.61);
    v = sin(wr * 16.74 - t * 2.82 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.59;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q3.x += 0.34 / wf * sin(wf * 2.00 * q3.y + time * 1.64); q3.y += 0.44 / wf * cos(wf * 3.27 * q3.x + time * 1.82); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.73);
	float d3 = fieldC(q3, time, 1.74);
	d2 = abs(d2 - d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.70 + time * 0.73);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.07;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
