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
    float petal = 0.67 + 0.28 * cos(sa * 5 + t * 2.78 + ph);
    v = sin((sr - petal) * 12.89);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.49, lr * 2.16 + time * 0.64); }
	{ p = vec2(atan(p.y, p.x) * 1.92, length(p) * 5.96 - time * 0.70); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.59; p = rot2(0.99) * p; }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 2.22 * p.y + time * 1.80); p.y += 0.42 / wf * cos(wf * 3.53 * p.x + time * 0.98); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.72 + time * 0.16, vec3(0.54, 0.43, 0.43), vec3(0.48, 0.41, 0.35), vec3(1.26, 0.77, 1.10), vec3(0.88, 0.99, 0.28));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
