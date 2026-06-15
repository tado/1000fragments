uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.35 + vec2(t * 0.73, -t * 0.73) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.46 + 0.22 * cos(sa * 5 + t * 2.53 + ph);
    v = sin((sr - petal) * 12.87);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.53;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 3.06 * p.y + time * 1.32); p.y += 0.24 / wf * cos(wf * 3.89 * p.x + time * 0.71); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.91);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.84 + time * 0.27, vec3(0.58, 0.42, 0.45), vec3(0.40, 0.37, 0.34), vec3(1.17, 1.35, 1.37), vec3(0.59, 0.99, 0.33));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
