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
    vec3 g = vec3(p * 3.38, t * 1.27 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 2.23; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 2.22 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.42;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 2.11 * p.y + time * 0.63); p.y += 0.21 / wf * cos(wf * 3.08 * p.x + time * 1.98); }
	p += vec2(-0.35, 0.13) * sin(length(p) * 4.54 - time * 1.35) * 0.21;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.64, lr * 2.44 + time * 0.20); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.24; p = rot2(1.59) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.28);
	float d = d1 + d2;
	vec3 col = palette(d * 1.16 + time * 0.25, vec3(0.45, 0.57, 0.50), vec3(0.35, 0.46, 0.41), vec3(0.90, 1.34, 1.12), vec3(0.89, 0.20, 0.91));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
