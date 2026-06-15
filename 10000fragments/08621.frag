uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.62 + 0.25 * cos(sa * 6 + t * 2.76 + ph);
    v = sin((sr - petal) * 6.55);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 1.16, length(p) * 5.49 - time * 0.43); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 1.81 * p.y + time * 1.12); p.y += 0.50 / wf * cos(wf * 3.12 * p.x + time * 1.03); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.87 + time * 0.21, vec3(0.56, 0.56, 0.45), vec3(0.44, 0.37, 0.45), vec3(0.85, 1.12, 0.77), vec3(0.65, 0.10, 1.00));
	col = clamp((col - 0.5) * 1.83 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
