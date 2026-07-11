uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.07) - 0.5;
    float rad = 0.32 + 0.12 * sin(t * 3.24 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.79;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.27 / wf * sin(wf * 1.78 * p.y + time * 0.68); p.y += 0.47 / wf * cos(wf * 3.33 * p.x + time * 1.36); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.54), field(p, time, 1.08));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.97, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
