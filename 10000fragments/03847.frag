uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.13 + vec2(t * 2.89, -t * 2.89) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.50 + vec2(t * 2.83, -t * 2.83) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.94;
	p = rot2(0.37) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.19, lr * 1.43 + time * 0.44); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.38; p = rot2(1.10) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.36);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.29 + time * 0.24, vec3(0.43, 0.55, 0.60), vec3(0.35, 0.46, 0.36), vec3(1.07, 1.32, 1.40), vec3(0.14, 0.08, 0.97));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
