uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.11;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.60; kp = rot2(1.68) * kp; kp *= 1.33; }
    v = sin(kp.x * 2.19 - t * 4.80 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.98;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.27 / wf * sin(wf * 3.63 * p.y + time * 0.62); p.y += 0.21 / wf * cos(wf * 3.30 * p.x + time * 2.15); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.55, 0.17, 0.77) * (0.13 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
