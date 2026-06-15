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

float field(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 2.54; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 4.32 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.23 + t * 4.69 + ph) + sin(p.y * 5.43 - t * 4.69 + ph)
        + sin((p.x + p.y) * 2.15 + t * 4.69 + ph) + sin(length(p) * 14.69 - t * 4.69 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.53;
	{ float fr = length(p); p *= 1.0 + -0.21 * fr * fr; }
	p = rot2(time * -0.47) * p;
	p = rot2(1.31) * p;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 1.73 * p.y + time * 1.34); p.y += 0.20 / wf * cos(wf * 2.05 * p.x + time * 1.69); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.64);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.84 + time * 0.25, vec3(0.52, 0.47, 0.45), vec3(0.35, 0.43, 0.47), vec3(1.38, 0.90, 1.09), vec3(0.20, 0.19, 0.31));
	col = mod(col * 1.75, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
