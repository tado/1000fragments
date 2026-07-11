uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 16.44 - t * 1.17 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.69;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.14, lr * 1.68 + time * 0.93); }
	p = rot2(length(p) * 3.29 + time * 0.68) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 3.79 * p.y + time * 1.60); p.y += 0.47 / wf * cos(wf * 1.61 * p.x + time * 0.61); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.48; p = rot2(0.83) * p; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.54, 1.19, 1.31) + vec3(0.29, 0.26, 0.09);
	col *= 0.82 + 0.16 * sin(gl_FragCoord.y * 2.04 + time * 5.30);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
