uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.88, t * 1.32 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.55 + sin(p.y * 2.39 + t * 2.73) * 2.94 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.50, lr * 2.48 + time * -0.29); }
	p = rot2(p.y * 1.35 + time * 0.23) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.05);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.47 + time * 0.24, vec3(0.56, 0.54, 0.59), vec3(0.47, 0.47, 0.30), vec3(1.28, 1.16, 1.02), vec3(0.87, 0.52, 0.72));
	col = mod(col * 1.59, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
