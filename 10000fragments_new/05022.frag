uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 3.98;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 12.48 - t * 1.96 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.31;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.30; p = rot2(2.16) * p; }
	{ float fr = length(p); p *= 1.0 + -0.26 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.05 + time * 0.18, vec3(0.46, 0.60, 0.60), vec3(0.38, 0.37, 0.48), vec3(1.26, 1.03, 0.94), vec3(0.68, 0.64, 0.09));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
