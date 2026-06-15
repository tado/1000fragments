uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.05 + t * 0.62 + ph) + sin(p.y * 15.50 - t * 5.82 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.64;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 2.81 * p.y + time * 1.04); p.y += 0.48 / wf * cos(wf * 3.12 * p.x + time * 1.07); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.27, 1.13, 0.65) + vec3(0.25, 0.26, 0.09);
	col = fract(col * 2.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
