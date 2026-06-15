uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.46, t * 0.60 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 9; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.41 * sin(mf + 3.0) + ph), cos(t * 2.41 * cos(mf + 3.0) + ph));
        ms += 0.067 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 2.63, length(p) * 4.75 - time * 0.59); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.49; p = rot2(0.87) * p; }
	{ float fr = length(p); p *= 1.0 + -0.44 * fr * fr; }
	p = fract(p * 1.40) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.73);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.02 + time * 0.30, vec3(0.52, 0.47, 0.41), vec3(0.32, 0.43, 0.50), vec3(0.82, 1.38, 0.74), vec3(0.10, 0.62, 0.34));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
