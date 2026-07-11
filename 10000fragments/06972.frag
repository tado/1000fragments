uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.28, t * 0.40 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.49;
	p = fract(p * 1.65) - 0.5;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 1.60 * p.y + time * 1.55); p.y += 0.47 / wf * cos(wf * 2.42 * p.x + time * 0.78); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.83 + time * 0.06, vec3(0.44, 0.51, 0.50), vec3(0.35, 0.47, 0.47), vec3(0.71, 0.86, 0.86), vec3(0.45, 0.61, 0.06));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
