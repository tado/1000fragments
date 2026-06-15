uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 19.64 - t * 4.94 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.88 + sr * 4.58 - t * 2.49 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.34;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 2.37 * p.y + time * 1.21); p.y += 0.23 / wf * cos(wf * 1.92 * p.x + time * 1.60); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.68, lr * 1.23 + time * -0.62); }
	p = rot2(length(p) * -3.37 + time * 0.80) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.95);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.36 + time * 0.27, vec3(0.51, 0.43, 0.53), vec3(0.36, 0.35, 0.50), vec3(1.09, 1.11, 1.32), vec3(0.69, 0.39, 0.14));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
