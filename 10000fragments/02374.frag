uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.43 + 0.14 * cos(sa * 7 + t * 1.81 + ph);
    v = sin((sr - petal) * 13.46);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.22;
	{ p = vec2(atan(p.y, p.x) * 1.30, length(p) * 5.08 - time * 0.28); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 2.20 * p.y + time * 1.03); p.y += 0.30 / wf * cos(wf * 3.18 * p.x + time * 1.07); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.64 + time * 0.28, vec3(0.47, 0.41, 0.49), vec3(0.33, 0.36, 0.42), vec3(1.19, 1.13, 1.05), vec3(0.80, 0.70, 0.55));
	col = mod(col * 2.25, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
