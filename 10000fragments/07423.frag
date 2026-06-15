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
    float petal = 0.59 + 0.22 * cos(sa * 7 + t * 1.86 + ph);
    v = sin((sr - petal) * 16.55);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 2.05 * p.y + time * 1.91); p.y += 0.45 / wf * cos(wf * 3.69 * p.x + time * 0.86); }
	p = rot2(length(p) * -2.98 + time * 0.70) * p;
	{ float fr = length(p); p *= 1.0 + -0.33 * fr * fr; }
	p = rot2(time * -1.08) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.84 + time * 0.17, vec3(0.50, 0.59, 0.50), vec3(0.41, 0.41, 0.39), vec3(1.21, 1.08, 1.04), vec3(0.53, 0.84, 0.09));
	col = mod(col * 1.46, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
