uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.83, t * 2.04 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 8.69 - t * 4.86 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.91;
	p = rot2(2.17) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.18);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.64 + time * 0.05, vec3(0.49, 0.42, 0.58), vec3(0.47, 0.49, 0.37), vec3(1.21, 1.36, 0.99), vec3(0.29, 0.87, 0.48));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
