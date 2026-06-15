uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.70, t * 2.33 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.56;
	{ p = vec2(atan(p.y, p.x) * 1.29, length(p) * 3.40 - time * 0.60); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.50 / wf * sin(wf * 2.44 * p.y + time * 1.27); p.y += 0.30 / wf * cos(wf * 2.40 * p.x + time * 1.56); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.13, lr * 1.58 + time * -0.39); }
	p += vec2(-0.51, -0.56) * sin(length(p) * 4.66 - time * 1.62) * 0.19;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.32), field(p, time, 0.65));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
