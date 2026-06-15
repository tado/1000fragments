uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.36 + 0.11 * cos(sa * 5 + t * 1.72 + ph);
    v = sin((sr - petal) * 14.80);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.85;
	{ float fr = length(p); p *= 1.0 + -0.49 * fr * fr; }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 2.45 * p.y + time * 1.50); p.y += 0.40 / wf * cos(wf * 2.95 * p.x + time * 1.44); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.04 + time * 0.15, vec3(0.53, 0.47, 0.55), vec3(0.34, 0.46, 0.46), vec3(1.27, 0.96, 0.99), vec3(0.17, 0.61, 0.10));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
