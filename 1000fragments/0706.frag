uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.85 + sr * 6.79 - t * 4.66 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.96;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 1.93 * p.y + time * 0.90); p.y += 0.33 / wf * cos(wf * 3.86 * p.x + time * 1.91); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.92), field(p, time, 1.85));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.77));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
