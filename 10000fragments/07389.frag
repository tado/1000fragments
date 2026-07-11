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
    vec2 vp = p * 2.70; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 2.64 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.74;
	{ p = vec2(atan(p.y, p.x) * 2.02, length(p) * 4.83 - time * 0.28); }
	p = rot2(p.y * -1.45 + time * 0.68) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.92, lr * 2.14 + time * 0.58); }
	{ float fr = length(p); p *= 1.0 + 0.79 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.06 + time * 0.15, vec3(0.55, 0.47, 0.59), vec3(0.33, 0.46, 0.45), vec3(0.85, 0.93, 1.07), vec3(0.33, 0.88, 0.66));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
