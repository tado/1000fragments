uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float fs = 0.0, famp = 0.5; vec2 fq = p * 1.77 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 0.10); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 4.77; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 2.91 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p) - 0.43;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 1.81 * p.y + time * 1.25); p.y += 0.41 / wf * cos(wf * 2.27 * p.x + time * 0.82); }
	{ float fr = length(p); p *= 1.0 + 0.44 * fr * fr; }
	p = rot2(length(p) * 2.64 + time * 1.02) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.19);
	float d = d1 + d2;
	vec3 col = palette(d * 1.04 + time * 0.10, vec3(0.41, 0.53, 0.53), vec3(0.47, 0.47, 0.48), vec3(0.83, 0.74, 1.06), vec3(0.58, 0.68, 0.60));
	col = mod(col * 2.62, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
