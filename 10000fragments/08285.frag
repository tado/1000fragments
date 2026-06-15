uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.27, 0.0)) * 17.69 - t * 4.08 + ph);
    float mb = sin(length(p + vec2(0.27, 0.0)) * 27.42 - t * 4.08 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.10 + vec2(t * 0.57, -t * 0.57) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 2.24 * p.y + time * 0.71); p.y += 0.40 / wf * cos(wf * 3.05 * p.x + time * 1.65); }
	p = rot2(p.y * 1.73 + time * 0.27) * p;
	{ p = vec2(atan(p.y, p.x) * 2.90, length(p) * 3.96 - time * 0.65); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.10);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.06 + time * 0.05, vec3(0.44, 0.50, 0.44), vec3(0.44, 0.46, 0.39), vec3(1.16, 1.30, 1.27), vec3(0.74, 0.05, 0.98));
	col = mod(col * 1.54, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
