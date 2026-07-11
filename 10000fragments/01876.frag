uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.80 + sr * 7.59 - t * 2.95 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.55;
	p = rot2(time * 1.01) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.99, lr * 1.78 + time * 0.64); }
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.77 + time * 0.10, vec3(0.40, 0.53, 0.47), vec3(0.48, 0.50, 0.41), vec3(1.04, 1.15, 0.98), vec3(0.57, 0.92, 0.01));
	col = mod(col * 2.35, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
