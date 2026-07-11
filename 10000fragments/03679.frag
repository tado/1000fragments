uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.84) - 0.5;
    float rad = 0.35 + 0.12 * sin(t * 3.84 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.73;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 2.80 * p.y + time * 1.70); p.y += 0.36 / wf * cos(wf * 2.11 * p.x + time * 1.48); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.46, 0.93, 1.27) + vec3(0.03, 0.19, 0.03);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.73));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
