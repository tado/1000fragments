uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 16.07 + sin(p.y * 4.12 + t * 1.71) * 4.88 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.20 / wf * sin(wf * 2.74 * p.y + time * 1.91); p.y += 0.50 / wf * cos(wf * 1.91 * p.x + time * 1.81); }
	{ p = vec2(atan(p.y, p.x) * 1.31, length(p) * 2.60 - time * 0.79); }
	p = fract(p * 1.57) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.81), field(p, time, 1.61));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.59 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
