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
    float wa = sin(p.x * 9.94 + t * 2.08 + ph) * 0.7;
    float wb = sin(p.y * 8.69 - t * 1.36 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.29;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 5.22; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.46 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.99;
	p = fract(p * 2.79) - 0.5;
	p = rot2(length(p) * 3.24 + time * 0.49) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p.y += sin(p.x * 7.10 + time * 2.11) * 0.37;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.45);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.76 + time * 0.14, vec3(0.52, 0.55, 0.47), vec3(0.44, 0.44, 0.43), vec3(1.26, 1.37, 1.13), vec3(0.73, 0.13, 0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
