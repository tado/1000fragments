uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.48) - 0.5;
    float rad = 0.34 + 0.12 * sin(t * 0.92 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 1.30) - 0.5;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 3.54 * p.y + time * 1.80); p.y += 0.38 / wf * cos(wf * 2.08 * p.x + time * 1.70); }
	p *= 2.26;
	p += vec2(-0.22, 0.37) * sin(length(p) * 4.54 - time * 1.81) * 0.21;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.00), field(p, time, 2.00));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.55, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
