uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.12 + sin(p.y * 4.94 + t * 0.70) * 3.60 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.38 / wf * sin(wf * 3.22 * p.y + time * 1.80); p.y += 0.46 / wf * cos(wf * 2.68 * p.x + time * 0.85); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.34), field(p, time, 0.69));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
