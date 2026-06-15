uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.26 + t * 2.25 + ph) + sin(p.y * 9.76 - t * 4.28 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.76;
	p = rot2(2.49) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.88, lr * 1.54 + time * 0.78); }
	p = rot2(p.y * 2.01 + time * 0.84) * p;
	p = abs(p) - 0.66;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.89 + time * 0.14, vec3(0.41, 0.48, 0.56), vec3(0.36, 0.37, 0.44), vec3(1.31, 1.30, 1.06), vec3(0.91, 0.34, 0.21));
	col = clamp((col - 0.5) * 1.57 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
