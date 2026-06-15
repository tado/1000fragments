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
    v = 0.25 * (sin(p.x * 6.82 + t * 4.98 + ph) + sin(p.y * 11.26 - t * 4.98 + ph)
        + sin((p.x + p.y) * 3.82 + t * 4.98 + ph) + sin(length(p) * 5.02 - t * 4.98 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 7.21; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.51 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.72;
	p = rot2(0.44) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.14; p = rot2(2.48) * p; }
	p = fract(p * 1.12) - 0.5;
	p = rot2(length(p) * 1.78 + time * 0.78) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.48);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.61 + time * 0.20, vec3(0.52, 0.49, 0.54), vec3(0.39, 0.38, 0.48), vec3(1.25, 1.02, 1.40), vec3(0.95, 0.82, 0.82));
	col = fract(col * 1.87);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
