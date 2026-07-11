uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 15.72 + sin(p.y * 3.15 + t * 1.51) * 4.10 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.15, lr * 1.79 + time * 0.67); }
	p = rot2(2.01) * p;
	{ float fr = length(p); p *= 1.0 + -0.52 * fr * fr; }
	p = fract(p * 1.97) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.77 + time * 0.09, vec3(0.42, 0.43, 0.42), vec3(0.32, 0.37, 0.40), vec3(1.36, 0.93, 1.23), vec3(0.61, 0.68, 0.30));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
