uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.59 + sr * 5.99 - t * 3.63 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 4.85;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 8.10 - t * 5.36 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.02;
	{ float fr = length(p); p *= 1.0 + 0.37 * fr * fr; }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.13; p = rot2(2.05) * p; }
	p += vec2(0.15, 0.14) * sin(length(p) * 5.88 - time * 2.37) * 0.29;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.07);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.56 + time * 0.27, vec3(0.49, 0.45, 0.56), vec3(0.47, 0.46, 0.43), vec3(1.01, 1.38, 1.10), vec3(0.06, 0.83, 0.08));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.40 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
