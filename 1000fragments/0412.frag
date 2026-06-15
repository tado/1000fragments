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
    v = sin(sa * 9.94 + sr * 20.28 - t * 1.10 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * 3.14 + time * 0.26) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.33 / wf * sin(wf * 3.42 * p.y + time * 0.62); p.y += 0.44 / wf * cos(wf * 3.95 * p.x + time * 0.99); }
	p = fract(p * 1.32) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.44 + time * 0.11, vec3(0.40, 0.43, 0.55), vec3(0.46, 0.37, 0.35), vec3(1.35, 0.74, 1.10), vec3(0.78, 0.02, 0.31));
	col = mod(col * 2.89, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
