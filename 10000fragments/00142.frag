uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.42 + t * 1.46 + ph) + sin(p.y * 6.58 - t * 3.53 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.95;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 1.75 * p.y + time * 1.80); p.y += 0.33 / wf * cos(wf * 3.65 * p.x + time * 0.61); }
	p += vec2(0.45, -0.60) * sin(length(p) * 3.65 - time * 0.76) * 0.10;
	p = abs(p) - 0.74;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.31), field(p, time, 2.62));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
