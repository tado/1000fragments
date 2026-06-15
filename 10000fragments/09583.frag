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
    v = sin(sa * 4.34 + sr * 5.77 - t * 0.74 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.52;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 1.83 * p.y + time * 1.76); p.y += 0.35 / wf * cos(wf * 2.97 * p.x + time * 1.73); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.59; p = rot2(1.54) * p; }
	p = rot2(2.75) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.22, lr * 2.17 + time * -0.68); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.54 + time * 0.25, vec3(0.59, 0.50, 0.51), vec3(0.38, 0.43, 0.33), vec3(1.39, 0.86, 1.07), vec3(0.20, 0.28, 0.38));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
