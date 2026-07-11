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
    vec2 vp = p * 8.22; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.64 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 6.70 + t * 2.05 + ph) * 0.7;
    float wb = sin(p.y * 12.16 - t * 3.53 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.56;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.93;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.17; p = rot2(0.56) * p; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ p = vec2(atan(p.y, p.x) * 1.82, length(p) * 5.57 - time * 0.83); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.24);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.84 + time * 0.14, vec3(0.58, 0.44, 0.50), vec3(0.33, 0.41, 0.43), vec3(1.28, 1.28, 1.02), vec3(0.52, 0.68, 0.18));
	col *= 0.88 + 0.16 * sin(gl_FragCoord.y * 1.23 + time * 14.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
