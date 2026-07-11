uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.74;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.52; kp = rot2(1.13) * kp; kp *= 1.19; }
    v = sin(kp.y * 1.61 - t * 1.33 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = (floor(p * 21.5) + 0.5) / 21.5;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 1.86 * p.y + time * 0.80); p.y += 0.40 / wf * cos(wf * 3.14 * p.x + time * 1.94); }
	p += vec2(-0.05, -0.68) * sin(length(p) * 3.54 - time * 2.48) * 0.33;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.46; p = rot2(2.32) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.57), field(p, time, 1.14));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
