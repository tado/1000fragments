uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 7.81 - t * 7.92 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.91 + vec2(t * 0.79, -t * 0.79) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.96;
	p = fract(p * 1.23) - 0.5;
	p = rot2(p.y * 1.15 + time * 0.61) * p;
	{ p = vec2(atan(p.y, p.x) * 1.81, length(p) * 3.03 - time * 0.25); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.00, lr * 1.78 + time * 0.24); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.11);
	float d = d1 + d2;
	vec3 col = palette(d * 0.73 + time * 0.08, vec3(0.54, 0.44, 0.45), vec3(0.45, 0.49, 0.49), vec3(1.40, 1.31, 1.33), vec3(0.99, 0.56, 0.38));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
