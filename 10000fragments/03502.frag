uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.82, t * 0.52 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.26, t * 1.50 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 1.82, length(p) * 2.92 - time * 0.19); }
	p = rot2(time * -0.89) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.24);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.81 + time * 0.17, vec3(0.42, 0.42, 0.49), vec3(0.31, 0.32, 0.38), vec3(1.15, 0.92, 1.16), vec3(0.62, 0.27, 0.33));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
