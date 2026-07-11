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
    float petal = 0.55 + 0.14 * cos(sa * 6 + t * 2.04 + ph);
    v = sin((sr - petal) * 15.41);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 2.77; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.20 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.74;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(0.36) * p;
	p = rot2(p.y * -3.32 + time * 0.77) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.89);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.95 + time * 0.13, vec3(0.45, 0.44, 0.46), vec3(0.37, 0.31, 0.43), vec3(1.21, 1.03, 0.72), vec3(0.92, 0.95, 0.76));
	col = fract(col * 1.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
