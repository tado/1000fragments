uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.33, 0.0)) * 19.60 - t * 4.28 + ph);
    float mb = sin(length(p + vec2(0.33, 0.0)) * 34.82 - t * 3.10 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.53;
	{ float fr = length(p); p *= 1.0 + -0.44 * fr * fr; }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 3.43 * p.y + time * 1.83); p.y += 0.26 / wf * cos(wf * 1.97 * p.x + time * 1.10); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.26), field(p, time, 0.51));
	col = 0.5 + 0.5 * col;
	col *= 0.83 + 0.18 * sin(gl_FragCoord.y * 1.38 + time * 9.57);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
