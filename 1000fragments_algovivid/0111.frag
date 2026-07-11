uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.68 + t * 0.68 + ph) + sin(p.y * 14.56 - t * 5.34 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * -0.54;
	p *= 1.73;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.30, lr * 2.59 + (time * 0.66) * -0.32); }
	p = rot2(p.y * 2.29 + (time * 0.66) * 0.30) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 3.76 * p.y + (time * 0.66) * 1.63); p.y += 0.27 / wf * cos(wf * 3.04 * p.x + (time * 0.66) * 0.64); }
	float d = field(p, (time * 0.66), 0.0);
	vec3 col = palette(d * 1.31 + (time * 0.66) * 0.14, vec3(0.38, 0.42, 0.44), vec3(0.22, 0.21, 0.24), vec3(0.49, 0.82, 0.70), vec3(0.22, 0.12, 0.77));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.33);
	col = clamp(col, 0.0, 1.0) * vec3(1.026, 0.972, 1.002) * 1.00 + 0.021;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
