uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.81 + vec2(t * 0.43, -t * 0.43) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.49 + sr * 5.72 - t * 1.81 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.15;
	p = rot2(p.y * -1.09 + time * 0.53) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 1.93 * p.y + time * 1.61); p.y += 0.29 / wf * cos(wf * 1.65 * p.x + time * 1.53); }
	p = abs(p) - 0.20;
	{ p = vec2(atan(p.y, p.x) * 2.90, length(p) * 4.22 - time * 0.29); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.28);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.51 + time * 0.14, vec3(0.56, 0.49, 0.42), vec3(0.42, 0.34, 0.31), vec3(0.91, 1.15, 0.70), vec3(0.19, 0.27, 0.65));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
