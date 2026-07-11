uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.65;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.70; kp = rot2(2.58) * kp; kp *= 1.43; }
    v = sin(kp.y * 1.98 - t * 3.02 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.06;
	p = rot2(time * 1.47) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 2.42 * p.y + time * 0.87); p.y += 0.33 / wf * cos(wf * 2.09 * p.x + time * 0.74); }
	p = (floor(p * 29.4) + 0.5) / 29.4;
	p.y += sin(p.x * 2.08 + time * 2.02) * 0.19;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.41, 0.24, 0.15), vec3(0.79, 0.52, 0.65), d);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
