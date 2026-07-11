uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 4.10 + t * 3.79 + ph) * 0.7;
    float wb = sin(p.y * 15.84 - t * 3.38 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.70;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.87;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.20 / wf * sin(wf * 1.72 * p.y + time * 1.60); p.y += 0.37 / wf * cos(wf * 1.73 * p.x + time * 0.94); }
	p = (floor(p * 9.9) + 0.5) / 9.9;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.78, lr * 1.88 + time * 0.67); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.69 + time * 0.14, vec3(0.50, 0.47, 0.53), vec3(0.42, 0.47, 0.32), vec3(1.05, 0.93, 1.06), vec3(0.79, 0.02, 0.68));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
