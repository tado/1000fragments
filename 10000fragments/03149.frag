uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 11.50 + sin(p.y * 1.10 + t * 1.81) * 4.72 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.62, t * 1.85 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.83;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.42; p = rot2(1.96) * p; }
	{ p = vec2(atan(p.y, p.x) * 2.70, length(p) * 2.20 - time * 0.25); }
	p = rot2(p.y * -1.67 + time * 0.47) * p;
	{ float fr = length(p); p *= 1.0 + -0.27 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.88);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.91 + time * 0.17, vec3(0.54, 0.49, 0.55), vec3(0.37, 0.36, 0.42), vec3(1.29, 0.72, 1.05), vec3(0.49, 0.43, 0.15));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
