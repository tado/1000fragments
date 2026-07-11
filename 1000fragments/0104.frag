uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.93 + vec2(t * 0.99, -t * 0.99) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 9.57 + sin(p.y * 2.64 + t * 2.80) * 3.10 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.99;
	p = rot2(length(p) * -1.52 + time * 0.85) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 3.99 * p.y + time * 1.98); p.y += 0.36 / wf * cos(wf * 2.55 * p.x + time * 0.94); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.07);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.04 + time * 0.24, vec3(0.54, 0.53, 0.53), vec3(0.43, 0.43, 0.32), vec3(1.24, 0.88, 0.93), vec3(0.64, 0.91, 0.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
