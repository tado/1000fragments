uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 32.53 - t * 8.69 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.98;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 3.42 * p.y + time * 1.05); p.y += 0.47 / wf * cos(wf * 2.97 * p.x + time * 1.86); }
	p = fract(p * 1.42) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.32), field(p, time, 0.63));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.59, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
