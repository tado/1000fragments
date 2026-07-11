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
    v = 0.5 * (sin(p.x * 4.37 + t * 2.12 + ph) + sin(p.y * 6.19 - t * 4.09 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 6.58; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.73 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.71;
	p = rot2(p.y * -2.64 + time * 1.20) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.24; p = rot2(0.48) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.10);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.79 + time * 0.06, vec3(0.44, 0.49, 0.41), vec3(0.44, 0.30, 0.50), vec3(0.87, 0.81, 0.90), vec3(0.84, 0.58, 0.60));
	col = mod(col * 2.76, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
