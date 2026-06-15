uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.62, t * 1.70 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.40;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 3.44 * p.y + time * 0.82); p.y += 0.31 / wf * cos(wf * 2.87 * p.x + time * 1.94); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.78 + time * 0.25, vec3(0.51, 0.45, 0.49), vec3(0.31, 0.38, 0.36), vec3(0.82, 1.19, 0.84), vec3(0.67, 0.07, 0.77));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
