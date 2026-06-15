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
    vec2 vp = p * 6.78; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 0.95 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.89 + t * 1.12 + ph) + sin(p.y * 9.68 - t * 1.12 + ph)
        + sin((p.x + p.y) * 9.10 + t * 1.12 + ph) + sin(length(p) * 6.14 - t * 1.12 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.65;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.14; p = rot2(1.07) * p; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.23, lr * 1.38 + time * -0.65); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.07);
	float d = d1 + d2;
	vec3 col = palette(d * 0.78 + time * 0.14, vec3(0.49, 0.49, 0.48), vec3(0.43, 0.40, 0.33), vec3(1.33, 0.95, 1.36), vec3(0.32, 0.40, 0.40));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
