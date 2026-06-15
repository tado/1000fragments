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
    vec2 cq = p * 10.17 + vec2(t * 2.58, -t * 2.58) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 2.22; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.69 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.39;
	{ p = vec2(atan(p.y, p.x) * 1.20, length(p) * 5.68 - time * 0.30); }
	p = rot2(0.76) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.98, lr * 1.51 + time * 0.11); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.18);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.57 + time * 0.04, vec3(0.55, 0.42, 0.55), vec3(0.47, 0.48, 0.40), vec3(1.08, 0.86, 1.14), vec3(0.77, 0.41, 0.11));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
