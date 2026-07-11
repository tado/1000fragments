uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.67, t * 2.24 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 2.55 * p.y + time * 0.83); p.y += 0.26 / wf * cos(wf * 2.88 * p.x + time * 1.08); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.00 + time * 0.07, vec3(0.57, 0.45, 0.57), vec3(0.48, 0.32, 0.41), vec3(0.82, 1.14, 1.18), vec3(0.92, 0.08, 0.05));
	col = fract(col * 2.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
