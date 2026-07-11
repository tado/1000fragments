uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.09, t * 0.95 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.35;
	p.y += sin(p.x * 5.47 + time * 3.63) * 0.31;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 2.16 * p.y + time * 1.76); p.y += 0.34 / wf * cos(wf * 3.35 * p.x + time * 1.89); }
	p = (floor(p * 8.3) + 0.5) / 8.3;
	p = rot2(time * 0.85) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.83 + time * 0.07, vec3(0.44, 0.54, 0.42), vec3(0.39, 0.40, 0.49), vec3(0.98, 0.83, 0.86), vec3(0.24, 0.11, 0.87));
	col = fract(col * 1.76);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
