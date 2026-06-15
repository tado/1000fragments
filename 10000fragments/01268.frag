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
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.31 + 0.10 * cos(sa * 9 + t * 2.13 + ph);
    v = sin((sr - petal) * 16.58);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 8.19; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 4.96 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.54;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 1.71 * p.y + time * 0.86); p.y += 0.23 / wf * cos(wf * 3.30 * p.x + time * 0.97); }
	{ p = vec2(atan(p.y, p.x) * 2.54, length(p) * 2.10 - time * 0.32); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.07, lr * 1.07 + time * 0.35); }
	p = rot2(p.y * 3.87 + time * 0.88) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.33);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.23 + time * 0.07, vec3(0.42, 0.45, 0.55), vec3(0.36, 0.35, 0.42), vec3(1.36, 1.04, 0.72), vec3(0.27, 0.12, 0.40));
	col = clamp((col - 0.5) * 1.48 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
