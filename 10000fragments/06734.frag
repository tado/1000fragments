uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.85, t * 1.66 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.62, t * 1.88 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.85;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.52; p = rot2(1.43) * p; }
	p = rot2(p.y * -1.63 + time * 0.47) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.36 / wf * sin(wf * 2.20 * p.y + time * 1.90); p.y += 0.23 / wf * cos(wf * 1.63 * p.x + time * 1.40); }
	p = rot2(time * -0.26) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.07);
	float d = d1 * d2;
	vec3 col = palette(d * 0.86 + time * 0.21, vec3(0.57, 0.46, 0.42), vec3(0.35, 0.47, 0.42), vec3(1.36, 0.90, 1.08), vec3(0.64, 0.56, 0.24));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
