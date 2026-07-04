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
    float ma = sin(length(p - vec2(0.44, 0.0)) * 22.13 - t * 3.61 + ph);
    float mb = sin(length(p + vec2(0.44, 0.0)) * 22.94 - t * 3.06 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.33 + 0.35 * pow(abs(cos(ra * 5.0 + t * 2.18)), 1.82);
    v = sin((rr - pet) * 21.60 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.36 * vnoise2(p * 3.14 + t * 0.79);
    v = sin(wr * 15.91 - t * 3.58 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(length(q1) * 2.21 + time * 0.52) * q1;
	q3 = rot2(length(q3) * 1.60 + time * 0.49) * q3;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q3.x += 0.34 / wf * sin(wf * 2.27 * q3.y + time * 0.79); q3.y += 0.48 / wf * cos(wf * 1.70 * q3.x + time * 2.10); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.46);
	float d3 = fieldC(q3, time, 1.26);
	d2 = 0.5 * (d2 + d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.47));
	vec3 col = palette(d * 0.48 + time * 0.05, vec3(0.41, 0.45, 0.41), vec3(0.49, 0.49, 0.32), vec3(1.12, 1.33, 1.31), vec3(0.17, 0.90, 0.37));
	col *= 0.86 + 0.14 * sin(gl_FragCoord.y * 0.98 + time * 6.74);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
