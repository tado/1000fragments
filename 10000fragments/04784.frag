uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 25.92 - t * 8.02 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.95, lr * 1.06 + time * 0.28); }
	p *= 1.98;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 2.75 * p.y + time * 1.99); p.y += 0.41 / wf * cos(wf * 2.12 * p.x + time * 1.80); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.74 + time * 0.23, vec3(0.46, 0.50, 0.47), vec3(0.34, 0.34, 0.41), vec3(1.02, 1.31, 1.07), vec3(0.39, 0.07, 0.76));
	col = fract(col * 1.12);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
