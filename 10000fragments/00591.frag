uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 18.23 + sin(p.y * 1.34 + t * 1.52) * 3.33 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.67;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.64, lr * 2.38 + time * -0.13); }
	{ float fr = length(p); p *= 1.0 + -0.58 * fr * fr; }
	p = rot2(p.y * 2.28 + time * 0.39) * p;
	p = rot2(length(p) * 1.00 + time * 0.65) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.62 + time * 0.10, vec3(0.45, 0.51, 0.44), vec3(0.49, 0.35, 0.46), vec3(1.32, 1.27, 0.87), vec3(0.58, 0.43, 0.89));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
