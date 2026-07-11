uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.57 + 0.11 * cos(sa * 8 + t * 1.11 + ph);
    v = sin((sr - petal) * 8.10);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.30 / wf * sin(wf * 3.84 * p.y + time * 1.64); p.y += 0.25 / wf * cos(wf * 1.55 * p.x + time * 1.76); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.30, lr * 1.23 + time * -0.68); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.59 + time * 0.17, vec3(0.54, 0.59, 0.46), vec3(0.34, 0.37, 0.50), vec3(0.95, 0.92, 1.03), vec3(0.34, 0.95, 0.07));
	col = mod(col * 1.35, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
