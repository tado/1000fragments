uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.83 + vec2(t * 1.85, -t * 1.85) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 1.54 * p.y + time * 1.59); p.y += 0.25 / wf * cos(wf * 3.98 * p.x + time * 1.98); }
	p = rot2(1.99) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.03 + time * 0.04, vec3(0.51, 0.53, 0.41), vec3(0.43, 0.37, 0.41), vec3(1.32, 1.27, 1.04), vec3(0.12, 0.72, 0.85));
	col = mod(col * 1.81, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
