uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 17.00 + sin(p.y * 1.34 + t * 5.31) * 4.03 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.67;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.11, lr * 1.71 + time * 0.19); }
	p = rot2(p.y * -1.46 + time * 0.70) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.18; p = rot2(1.41) * p; }
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.33 + time * 0.12, vec3(0.55, 0.43, 0.57), vec3(0.42, 0.32, 0.49), vec3(0.93, 1.29, 0.99), vec3(0.16, 0.82, 0.17));
	col = clamp((col - 0.5) * 1.55 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
