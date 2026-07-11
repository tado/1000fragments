uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.51 + t * 1.54 + ph) + sin(p.y * 6.09 - t * 4.85 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + -0.70 * fr * fr; }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 2.34 * p.y + time * 1.53); p.y += 0.26 / wf * cos(wf * 3.89 * p.x + time * 1.68); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.33), field(p, time, 2.65));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.01, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
