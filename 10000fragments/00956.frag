uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 26.35 - t * 8.94 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.27 / wf * sin(wf * 1.97 * p.y + time * 0.67); p.y += 0.47 / wf * cos(wf * 2.42 * p.x + time * 1.80); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.52), field(p, time, 1.03));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.30);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
