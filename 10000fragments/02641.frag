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
    float petal = 0.68 + 0.28 * cos(sa * 8 + t * 2.32 + ph);
    v = sin((sr - petal) * 8.14);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.90;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.35; p = rot2(1.14) * p; }
	p = rot2(length(p) * 2.81 + time * 0.24) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.73, lr * 2.52 + time * -0.15); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 1.70 * p.y + time * 1.74); p.y += 0.32 / wf * cos(wf * 3.34 * p.x + time * 0.75); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.32 + time * 0.00, vec3(0.46, 0.53, 0.50), vec3(0.36, 0.41, 0.46), vec3(0.92, 1.07, 0.86), vec3(0.43, 0.06, 0.27));
	col = fract(col * 2.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
