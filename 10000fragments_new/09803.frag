uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 32.29 - t * 2.69 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.20;
	p *= 3.16;
	p = fract(p * 1.87) - 0.5;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.38 / wf * sin(wf * 3.66 * p.y + time * 1.27); p.y += 0.29 / wf * cos(wf * 2.97 * p.x + time * 0.73); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.67), field(p, time, 1.34));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
