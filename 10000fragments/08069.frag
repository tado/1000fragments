uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.22 + t * 4.65 + ph) + sin(p.y * 6.28 - t * 4.65 + ph)
        + sin((p.x + p.y) * 8.46 + t * 4.65 + ph) + sin(length(p) * 13.34 - t * 4.65 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.57;
	p = abs(p);
	p *= 2.20;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.37, lr * 1.25 + time * -0.61); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 2.10 * p.y + time * 0.98); p.y += 0.48 / wf * cos(wf * 2.65 * p.x + time * 1.61); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.48 + time * 0.19, vec3(0.50, 0.59, 0.53), vec3(0.45, 0.41, 0.42), vec3(1.14, 1.40, 0.95), vec3(0.67, 0.12, 0.21));
	col = mod(col * 1.63, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
