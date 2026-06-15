uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 18.29 + sin(p.y * 2.42 + t * 5.08) * 3.73 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.79 + t * 2.27 + ph) + sin(p.y * 2.23 - t * 2.27 + ph)
        + sin((p.x + p.y) * 2.42 + t * 2.27 + ph) + sin(length(p) * 14.90 - t * 2.27 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.94;
	p = abs(p) - 0.44;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.30 / wf * sin(wf * 2.97 * p.y + time * 0.91); p.y += 0.46 / wf * cos(wf * 3.96 * p.x + time * 1.37); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.22, lr * 2.56 + time * -0.17); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.61);
	float d = d1 + d2;
	vec3 col = palette(d * 0.84 + time * 0.06, vec3(0.52, 0.54, 0.45), vec3(0.32, 0.36, 0.30), vec3(0.83, 1.32, 0.79), vec3(0.35, 0.01, 0.27));
	col = fract(col * 1.32);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
