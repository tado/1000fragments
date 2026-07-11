uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.77) - 0.5;
    float rad = 0.32 + 0.12 * sin(t * 2.17 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 8.47; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 4.02 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 15.74 + t * 3.92 + ph) * 0.7;
    float wb = sin(p.y * 7.90 - t * 2.96 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.66;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.91;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(q1.y * -3.89 + time * 0.27) * q1;
	{ float fr = length(q1); q1 *= 1.0 + 0.73 * fr * fr; }
	q2 += vec2(0.52, -0.80) * sin(length(q2) * 3.47 - time * 0.89) * 0.20;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q2.x += 0.42 / wf * sin(wf * 3.36 * q2.y + time * 1.91); q2.y += 0.22 / wf * cos(wf * 3.04 * q2.x + time * 1.76); }
	q3 = rot2(length(q3) * 3.08 + time * 0.70) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.43);
	float d3 = fieldC(q3, time, 1.02);
	d2 = min(d2, d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.56 + time * 0.03, vec3(0.50, 0.58, 0.43), vec3(0.36, 0.48, 0.34), vec3(0.72, 1.08, 0.94), vec3(0.22, 0.15, 0.78));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
