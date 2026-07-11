uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 13.32 - t * 4.84 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * 1.29) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.67, lr * 1.57 + time * 0.77); }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.38 / wf * sin(wf * 3.52 * p.y + time * 1.64); p.y += 0.30 / wf * cos(wf * 2.64 * p.x + time * 0.85); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.30 + time * 0.14, vec3(0.43, 0.56, 0.59), vec3(0.48, 0.33, 0.37), vec3(1.37, 1.04, 1.33), vec3(0.45, 0.04, 0.37));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
