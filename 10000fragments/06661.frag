uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.56, t * 0.55 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.19;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 3.45 * p.y + time * 1.27); p.y += 0.45 / wf * cos(wf * 2.25 * p.x + time * 1.74); }
	p += vec2(-0.65, -0.28) * sin(length(p) * 5.65 - time * 1.55) * 0.38;
	{ p = vec2(atan(p.y, p.x) * 1.99, length(p) * 2.37 - time * 0.13); }
	p = abs(p) - 0.50;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.57 + time * 0.12, vec3(0.55, 0.44, 0.48), vec3(0.35, 0.36, 0.39), vec3(0.77, 1.19, 1.15), vec3(0.61, 0.24, 0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
