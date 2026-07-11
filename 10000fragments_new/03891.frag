uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 7.49 + sin(p.y * 4.99 + t * 0.94) * 1.17 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 3.31 * p.y + time * 1.03); p.y += 0.21 / wf * cos(wf * 1.58 * p.x + time * 1.49); }
	p = fract(p * 2.23) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.82, 0.34, 0.48) * (0.18 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.06 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
