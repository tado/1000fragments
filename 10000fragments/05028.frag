uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 30.79 - t * 5.23 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.65, t * 1.66 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 1.57 * p.y + time * 1.22); p.y += 0.22 / wf * cos(wf * 2.23 * p.x + time * 1.82); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.39; p = rot2(1.91) * p; }
	p = rot2(p.y * 2.89 + time * 0.27) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.12);
	float d = d1 * d2;
	vec3 col = palette(d * 1.52 + time * 0.07, vec3(0.52, 0.44, 0.40), vec3(0.41, 0.30, 0.30), vec3(1.03, 1.31, 0.98), vec3(0.52, 0.14, 0.48));
	col = clamp((col - 0.5) * 1.93 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
