uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.11 + vec2(t * 0.87, -t * 0.87) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.38;
	{ p = vec2(atan(p.y, p.x) * 2.60, length(p) * 4.94 - time * 0.11); }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.20 / wf * sin(wf * 3.98 * p.y + time * 1.01); p.y += 0.41 / wf * cos(wf * 2.16 * p.x + time * 0.69); }
	p *= 2.32;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.47, lr * 1.86 + time * 0.63); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.38 + time * 0.01, vec3(0.55, 0.56, 0.60), vec3(0.44, 0.47, 0.41), vec3(0.75, 0.84, 1.31), vec3(0.20, 0.32, 0.81));
	col = clamp((col - 0.5) * 1.35 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
