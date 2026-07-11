uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.54 + t * 4.23 + ph) + sin(p.y * 10.33 - t * 2.59 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.68;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 2.93 * p.y + time * 1.63); p.y += 0.40 / wf * cos(wf * 1.75 * p.x + time * 1.40); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.98), field(p, time, 1.97));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.31, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
