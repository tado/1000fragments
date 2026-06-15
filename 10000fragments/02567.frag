uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.06, t * 2.29 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.53;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.36 / wf * sin(wf * 3.21 * p.y + time * 1.85); p.y += 0.45 / wf * cos(wf * 3.32 * p.x + time * 1.79); }
	{ float fr = length(p); p *= 1.0 + 0.30 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.56 + time * 0.22, vec3(0.49, 0.42, 0.50), vec3(0.47, 0.48, 0.48), vec3(1.04, 1.32, 0.84), vec3(0.01, 0.44, 0.01));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.21));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
