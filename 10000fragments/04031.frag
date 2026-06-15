uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.37 + 0.28 * cos(sa * 9 + t * 1.64 + ph);
    v = sin((sr - petal) * 7.83);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.57 + sr * 21.67 - t * 4.09 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 3.47 * p.y + time * 1.50); p.y += 0.21 / wf * cos(wf * 3.50 * p.x + time * 0.63); }
	p += vec2(-0.10, 0.49) * sin(length(p) * 5.47 - time * 0.69) * 0.31;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.67);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.45 + time * 0.29, vec3(0.53, 0.46, 0.45), vec3(0.37, 0.32, 0.44), vec3(0.81, 0.96, 1.26), vec3(0.93, 0.81, 0.74));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
