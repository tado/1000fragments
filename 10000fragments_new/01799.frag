uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.93, t * 0.95 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.29 + vec2(t * 0.36, -t * 0.57) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.39;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.11, lr * 2.05 + time * -0.76); }
	p = abs(p);
	p = rot2(2.16) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.53);
	float d = d1 + d2;
	vec3 col = palette(d * 0.94 + time * 0.12, vec3(0.45, 0.52, 0.50), vec3(0.44, 0.33, 0.44), vec3(0.98, 1.27, 0.83), vec3(0.99, 0.59, 0.06));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.47));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
