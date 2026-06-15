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
    vec2 cq = p * 12.78 + vec2(t * 0.72, -t * 0.72) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 8.67; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 4.07 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.80;
	p = abs(p) - 0.58;
	p = rot2(time * 0.49) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.25 / wf * sin(wf * 2.37 * p.y + time * 1.88); p.y += 0.42 / wf * cos(wf * 2.33 * p.x + time * 1.91); }
	{ p = vec2(atan(p.y, p.x) * 1.23, length(p) * 4.89 - time * 0.21); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.05);
	float d = d1 + d2;
	vec3 col = palette(d * 0.65 + time * 0.20, vec3(0.41, 0.46, 0.50), vec3(0.46, 0.49, 0.35), vec3(0.92, 0.77, 1.18), vec3(0.34, 0.19, 0.23));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
