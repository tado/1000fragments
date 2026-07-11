uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.04 + vec2(t * 2.84, -t * 2.84) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(0.11, 0.53) * sin(length(p) * 4.24 - time * 1.70) * 0.35;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 3.65 * p.y + time * 1.75); p.y += 0.33 / wf * cos(wf * 2.07 * p.x + time * 0.68); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.27, lr * 1.59 + time * -0.40); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.25 + time * 0.11, vec3(0.59, 0.43, 0.46), vec3(0.41, 0.39, 0.33), vec3(0.94, 0.95, 1.31), vec3(0.34, 0.13, 0.66));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
