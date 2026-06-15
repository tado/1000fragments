uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 20.78 + sin(p.y * 5.26 + t * 3.71) * 1.72 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.85;
	{ float fr = length(p); p *= 1.0 + 0.59 * fr * fr; }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 1.81 * p.y + time * 1.98); p.y += 0.46 / wf * cos(wf * 3.06 * p.x + time * 1.88); }
	p = rot2(length(p) * -3.24 + time * 0.86) * p;
	p = rot2(time * -1.10) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.44, 0.13, 0.40), vec3(0.61, 0.92, 0.85), d);
	col = fract(col * 1.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
