uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.57, t * 1.18 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.97;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 2.39 * p.y + time * 1.32); p.y += 0.32 / wf * cos(wf * 3.88 * p.x + time * 0.84); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.10; p = rot2(1.05) * p; }
	p = rot2(0.69) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.02 + time * 0.29, vec3(0.48, 0.44, 0.44), vec3(0.37, 0.31, 0.50), vec3(0.75, 1.16, 1.36), vec3(0.91, 0.86, 0.28));
	col = fract(col * 2.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
