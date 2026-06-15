uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.07, t * 2.26 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.38;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 2.18 * p.y + time * 0.85); p.y += 0.47 / wf * cos(wf * 1.80 * p.x + time * 0.91); }
	{ p = vec2(atan(p.y, p.x) * 1.32, length(p) * 5.08 - time * 0.55); }
	p = abs(p) - 0.35;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.22 + time * 0.27, vec3(0.43, 0.47, 0.59), vec3(0.47, 0.41, 0.45), vec3(1.32, 1.30, 0.96), vec3(0.19, 0.43, 0.32));
	col = fract(col * 2.41);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
