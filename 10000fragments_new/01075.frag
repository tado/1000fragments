uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.60) - 0.5;
    float rad = 0.36 + 0.12 * sin(t * 2.80 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 2.75 * p.y + time * 1.29); p.y += 0.21 / wf * cos(wf * 2.19 * p.x + time * 1.22); }
	{ float fr = length(p); p *= 1.0 + -0.42 * fr * fr; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.14, 0.25, 0.44), vec3(0.74, 0.76, 0.72), d);
	col *= 0.85 + 0.16 * sin(gl_FragCoord.y * 2.53 + time * 12.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
