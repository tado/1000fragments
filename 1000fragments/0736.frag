uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 18.75 + sin(p.y * 4.04 + t * 3.86) * 1.90 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 2.70 * p.y + time * 1.48); p.y += 0.40 / wf * cos(wf * 2.19 * p.x + time * 0.96); }
	p += vec2(0.27, -0.49) * sin(length(p) * 4.20 - time * 1.81) * 0.22;
	p = fract(p * 1.00) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.45), field(p, time, 0.89));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
