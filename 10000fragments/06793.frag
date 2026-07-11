uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.65, t * 1.50 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.47;
	p = rot2(time * 0.90) * p;
	p = rot2(p.y * -1.15 + time * 0.38) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 2.21 * p.y + time * 0.74); p.y += 0.25 / wf * cos(wf * 1.95 * p.x + time * 1.17); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.11, 0.44, 0.17), vec3(0.59, 0.61, 0.81), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
