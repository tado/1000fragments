uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.86, t * 1.70 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 16.68 + sin(p.y * 5.07 + t * 2.21) * 1.91 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.26;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 1.68 * p.y + time * 1.73); p.y += 0.34 / wf * cos(wf * 2.21 * p.x + time * 1.21); }
	p = fract(p * 2.67) - 0.5;
	p *= 1.59;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.96);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.95 + time * 0.16, vec3(0.45, 0.44, 0.59), vec3(0.42, 0.38, 0.44), vec3(0.87, 0.91, 0.80), vec3(0.23, 0.76, 0.26));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
