uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 9; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.84 * sin(mf + 3.0) + ph), cos(t * 0.84 * cos(mf + 3.0) + ph));
        ms += 0.065 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.15, t * 0.88 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(0.33, 0.25) * sin(length(p) * 3.78 - time * 0.76) * 0.14;
	{ p = vec2(atan(p.y, p.x) * 2.52, length(p) * 5.51 - time * 0.34); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.26; p = rot2(1.17) * p; }
	p = rot2(2.12) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.09);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.59 + time * 0.00, vec3(0.41, 0.56, 0.57), vec3(0.44, 0.44, 0.35), vec3(0.71, 1.26, 0.96), vec3(0.03, 0.91, 0.15));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
