uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.51, 0.0)) * 22.55 - t * 2.03 + ph);
    float mb = sin(length(p + vec2(0.51, 0.0)) * 12.09 - t * 2.03 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.77;
	p *= 1.37;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.25 / wf * sin(wf * 1.58 * p.y + time * 1.22); p.y += 0.29 / wf * cos(wf * 1.68 * p.x + time * 1.09); }
	p = abs(p) - 0.24;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.55), field(p, time, 1.09));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
