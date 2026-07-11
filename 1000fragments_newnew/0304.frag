uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.65;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.69; kp = rot2(0.46) * kp; kp *= 1.24; }
    v = sin(kp.y * 3.29 - t * 1.65 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.50;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.30 / wf * sin(wf * 2.36 * p.y + (time * 0.63) * 1.01); p.y += 0.40 / wf * cos(wf * 3.26 * p.x + (time * 0.63) * 0.78); }
	p = rot2(p.y * -1.32 + (time * 0.63) * 1.00) * p;
	p = mix(p, p.yx, 0.5 + 0.5 * sin((time * 0.63) * 0.94));
	p = sin(p * 2.23 + (time * 0.63) * 2.33) * 1.01;
	float d = field(p, (time * 0.63), 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.58, 0.54, 0.59) + vec3(0.09, 0.08, 0.05);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.39);
	col = clamp(col, 0.0, 1.0) * vec3(1.005, 0.958, 0.994) * 1.00 + 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
