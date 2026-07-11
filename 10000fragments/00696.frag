uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.82 + sin(p.y * 3.73 + t * 2.73) * 2.92 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 1.53 * p.y + time * 0.76); p.y += 0.36 / wf * cos(wf * 1.62 * p.x + time * 1.41); }
	p *= 1.76;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.34), field(p, time, 0.68));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
