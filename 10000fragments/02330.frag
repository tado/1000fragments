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
    vec2 vp = p * 7.57; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 2.86 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 22.44 + sin(p.y * 1.62 + t * 2.14) * 3.52 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.22;
	{ float fr = length(p); p *= 1.0 + -0.79 * fr * fr; }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.46; p = rot2(0.57) * p; }
	{ p = vec2(atan(p.y, p.x) * 2.52, length(p) * 2.30 - time * 0.45); }
	p = rot2(time * 0.97) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.22);
	float d = d1 * d2;
	vec3 col = palette(d * 1.38 + time * 0.16, vec3(0.49, 0.57, 0.41), vec3(0.41, 0.33, 0.37), vec3(0.79, 1.18, 1.34), vec3(0.91, 0.29, 0.70));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
