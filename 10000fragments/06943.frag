uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.12, t * 1.77 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 14.90 - t * 8.46 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.19;
	p = fract(p * 2.19) - 0.5;
	p += vec2(0.04, -0.22) * sin(length(p) * 5.41 - time * 1.47) * 0.33;
	p *= 1.81;
	p = rot2(1.56) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.58);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.51 + time * 0.05, vec3(0.44, 0.57, 0.49), vec3(0.35, 0.31, 0.35), vec3(1.33, 1.18, 0.93), vec3(0.17, 0.19, 0.17));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
