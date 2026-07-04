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
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 5.78 + ga * 2.0 - t * 1.27 + ph);
    v = arm * exp(-gr * 0.93);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.33 * vnoise2(p * 2.01 + t * 1.33);
    v = sin(wr * 18.96 - t * 1.33 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q1.x += 0.29 / wf * sin(wf * 2.21 * q1.y + time * 0.76); q1.y += 0.42 / wf * cos(wf * 1.96 * q1.x + time * 1.70); }
	q1 += vec2(-0.85, -0.66) * sin(length(q1) * 3.43 - time * 1.73) * 0.30;
	q2 = rot2(time * -1.22) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.02);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.69 + time * 0.04, vec3(0.47, 0.57, 0.45), vec3(0.41, 0.38, 0.35), vec3(1.25, 1.03, 0.99), vec3(0.52, 0.25, 0.75));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.33 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
