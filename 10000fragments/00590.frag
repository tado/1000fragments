uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.46 + sin(p.y * 4.84 + t * 5.68) * 2.40 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.26;
	p = rot2(2.27) * p;
	p = fract(p * 1.82) - 0.5;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 3.75 * p.y + time * 1.11); p.y += 0.32 / wf * cos(wf * 1.72 * p.x + time * 1.51); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.06 + time * 0.14, vec3(0.52, 0.44, 0.55), vec3(0.48, 0.49, 0.47), vec3(1.14, 0.97, 0.80), vec3(0.40, 0.16, 0.25));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
