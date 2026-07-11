uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.38 + 0.39 * sin(t * 1.12)) + vec2(-0.41, -0.13) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 26; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 26.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.93;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.60, lr * 2.98 + time * 0.51); }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 3.52 * p.y + time * 1.01); p.y += 0.23 / wf * cos(wf * 2.87 * p.x + time * 0.91); }
	p = (floor(p * 6.0) + 0.5) / 6.0;
	float d = field(p, time, 0.0);
	vec3 col = vec3(1.00, 0.96, 0.49) * (0.22 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	col *= 0.88 + 0.17 * sin(gl_FragCoord.y * 1.73 + time * 7.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
