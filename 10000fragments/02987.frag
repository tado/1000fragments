uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.56 + sr * 11.30 - t * 4.36 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.19 + vec2(t * 0.53, -t * 0.53) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p) - 0.34;
	{ p = vec2(atan(p.y, p.x) * 1.64, length(p) * 4.24 - time * 0.74); }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.38 / wf * sin(wf * 1.64 * p.y + time * 1.48); p.y += 0.28 / wf * cos(wf * 2.54 * p.x + time * 0.99); }
	p *= 2.97;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.01);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.30 + time * 0.29, vec3(0.60, 0.46, 0.56), vec3(0.38, 0.36, 0.30), vec3(1.08, 1.08, 1.37), vec3(0.94, 0.83, 0.34));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
