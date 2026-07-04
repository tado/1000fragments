uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 2.32;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 13.26 - t * 5.33 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.55, t * 1.70 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.83;
	p = fract(p * 1.52) - 0.5;
	p = rot2(length(p) * -2.75 + time * 1.40) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.30; p = rot2(1.41) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.82);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.66 + time * 0.08, vec3(0.46, 0.47, 0.60), vec3(0.48, 0.47, 0.33), vec3(1.28, 1.01, 0.86), vec3(0.26, 0.81, 0.31));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.84 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
