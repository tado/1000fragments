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
    vec2 vp = p * 7.19; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 4.26 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 23.67 + sin(p.y * 1.07 + t * 4.19) * 3.53 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.16;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.13; p = rot2(1.05) * p; }
	p = rot2(time * -0.85) * p;
	{ p = vec2(atan(p.y, p.x) * 2.85, length(p) * 2.84 - time * 0.13); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.09);
	float d = d1 * d2;
	vec3 col = palette(d * 1.17 + time * 0.13, vec3(0.51, 0.48, 0.51), vec3(0.36, 0.37, 0.39), vec3(1.31, 1.22, 1.39), vec3(0.16, 0.17, 0.27));
	col = fract(col * 2.39);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
