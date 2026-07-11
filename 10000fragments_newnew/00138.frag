uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 5.68;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 22.86 - t * 4.03 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 1.86, length(p) * 5.94 - time * 0.75); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.15; p = rot2(1.71) * p; }
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.60));
	p += vec2(0.19, 0.19) * sin(length(p) * 3.61 - time * 1.10) * 0.15;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.31 + time * 0.12, vec3(0.45, 0.48, 0.47), vec3(0.32, 0.35, 0.32), vec3(1.04, 0.83, 1.06), vec3(0.80, 0.51, 0.15));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
