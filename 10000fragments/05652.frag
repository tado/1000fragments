uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 11.26 + sin(p.y * 3.08 + t * 0.55) * 1.41 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.04, t * 2.24 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.88;
	p = rot2(p.y * 2.40 + time * 0.33) * p;
	p = rot2(2.22) * p;
	p = fract(p * 1.24) - 0.5;
	p = rot2(time * -0.97) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.93);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.60 + time * 0.07, vec3(0.54, 0.51, 0.60), vec3(0.45, 0.35, 0.31), vec3(0.95, 0.80, 1.21), vec3(0.96, 0.02, 0.29));
	col = clamp((col - 0.5) * 2.01 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
