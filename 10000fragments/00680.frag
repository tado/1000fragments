uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.53 + sin(p.y * 3.25 + t * 5.84) * 3.17 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.91;
	p += vec2(0.10, 0.61) * sin(length(p) * 5.62 - time * 1.49) * 0.38;
	p = rot2(0.86) * p;
	p *= 2.28;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 1.78 * p.y + time * 0.78); p.y += 0.47 / wf * cos(wf * 2.93 * p.x + time * 1.93); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.16, 0.05, 0.48), vec3(0.99, 0.60, 0.44), d);
	col = mod(col * 1.33, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
