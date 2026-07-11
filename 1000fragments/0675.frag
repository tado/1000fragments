uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.67 + t * 2.11 + ph) + sin(p.y * 7.63 - t * 5.16 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.70;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 1.68 * p.y + time * 1.89); p.y += 0.41 / wf * cos(wf * 3.02 * p.x + time * 1.97); }
	p = abs(p) - 0.44;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.48), field(p, time, 0.97));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
