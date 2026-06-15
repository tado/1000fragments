uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.31 + 0.29 * cos(sa * 6 + t * 2.40 + ph);
    v = sin((sr - petal) * 6.17);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.06 + vec2(t * 0.67, -t * 0.67) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.05;
	{ p = vec2(atan(p.y, p.x) * 2.31, length(p) * 4.90 - time * 0.29); }
	p = rot2(p.y * -1.80 + time * 0.47) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 2.97 * p.y + time * 1.39); p.y += 0.33 / wf * cos(wf * 3.51 * p.x + time * 0.92); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.24);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.65 + time * 0.14, vec3(0.50, 0.41, 0.48), vec3(0.49, 0.46, 0.45), vec3(0.83, 1.02, 1.03), vec3(0.03, 0.30, 0.29));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
