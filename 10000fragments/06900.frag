uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.95, t * 0.53 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.99 + sr * 19.22 - t * 4.10 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.97;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 3.16 * p.y + time * 1.11); p.y += 0.24 / wf * cos(wf * 3.76 * p.x + time * 1.36); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.62);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.52 + time * 0.28, vec3(0.41, 0.59, 0.42), vec3(0.37, 0.34, 0.31), vec3(0.73, 1.05, 1.24), vec3(0.67, 0.58, 0.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
