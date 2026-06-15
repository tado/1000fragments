uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.50 + t * 3.19 + ph) + sin(p.y * 2.81 - t * 3.19 + ph)
        + sin((p.x + p.y) * 7.53 + t * 3.19 + ph) + sin(length(p) * 7.02 - t * 3.19 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(0.65, 0.34) * sin(length(p) * 3.33 - time * 1.59) * 0.27;
	{ float fr = length(p); p *= 1.0 + 0.60 * fr * fr; }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 3.45 * p.y + time * 1.29); p.y += 0.25 / wf * cos(wf * 2.41 * p.x + time * 1.10); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.72), field(p, time, 1.45));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.58, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
