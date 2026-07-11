uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.35, 0.0)) * 28.09 - t * 2.95 + ph);
    float mb = sin(length(p + vec2(0.35, 0.0)) * 9.75 - t * 5.90 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.39 / wf * sin(wf * 2.99 * p.y + time * 0.95); p.y += 0.37 / wf * cos(wf * 1.73 * p.x + time * 0.83); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.80, lr * 1.52 + time * -0.73); }
	{ p = vec2(atan(p.y, p.x) * 2.96, length(p) * 2.43 - time * 0.53); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.99 + time * 0.08, vec3(0.53, 0.58, 0.54), vec3(0.50, 0.42, 0.36), vec3(0.73, 1.15, 0.87), vec3(0.24, 0.47, 0.61));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
