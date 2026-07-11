uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.20, t * 2.25 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.12;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.42, lr * 2.07 + time * 0.36); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.38 / wf * sin(wf * 2.28 * p.y + time * 1.55); p.y += 0.42 / wf * cos(wf * 3.66 * p.x + time * 1.00); }
	p = fract(p * 2.67) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.06 + time * 0.03, vec3(0.41, 0.57, 0.58), vec3(0.49, 0.49, 0.50), vec3(0.77, 0.86, 0.94), vec3(0.05, 0.72, 0.65));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
