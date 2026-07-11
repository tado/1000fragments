uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.88 + sr * 12.09 - t * 1.02 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * 2.47 + time * 0.84) * p;
	p = rot2(time * -1.25) * p;
	p += vec2(0.77, -0.05) * sin(length(p) * 2.37 - time * 1.40) * 0.36;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 3.38 * p.y + time * 1.92); p.y += 0.37 / wf * cos(wf * 2.45 * p.x + time * 1.05); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.17, 1.32, 1.42) + vec3(0.05, 0.23, 0.27);
	col = fract(col * 2.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
