uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 8.36 - t * 2.29 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.59;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.69, lr * 1.19 + time * -0.95); }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 3.44 * p.y + time * 1.00); p.y += 0.27 / wf * cos(wf * 2.75 * p.x + time * 1.48); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.13 + time * 0.10, vec3(0.54, 0.58, 0.42), vec3(0.49, 0.35, 0.36), vec3(0.77, 0.84, 1.11), vec3(0.30, 0.62, 0.03));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
