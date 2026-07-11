uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.13 + sin(p.y * 2.80 + t * 3.21) * 4.12 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.66;
	p += vec2(-0.09, -0.32) * sin(length(p) * 2.33 - time * 1.97) * 0.10;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 2.43 * p.y + time * 1.72); p.y += 0.31 / wf * cos(wf * 3.33 * p.x + time * 1.28); }
	p = abs(p) - 0.51;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.75), field(p, time, 1.49));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
