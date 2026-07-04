uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 2.62;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 9.36 - t * 1.76 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.60; p = rot2(1.92) * p; }
	p *= 2.65;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.64 + time * 0.24, vec3(0.58, 0.41, 0.48), vec3(0.35, 0.46, 0.49), vec3(1.31, 0.90, 0.82), vec3(0.18, 0.66, 0.39));
	col = clamp((col - 0.5) * 1.87 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
