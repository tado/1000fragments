uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.21, t * 1.66 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.63;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 1.97 * p.y + time * 1.00); p.y += 0.48 / wf * cos(wf * 1.97 * p.x + time * 1.60); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.60 + time * 0.21, vec3(0.49, 0.58, 0.47), vec3(0.35, 0.42, 0.31), vec3(0.95, 0.89, 0.92), vec3(0.08, 0.65, 0.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
