uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.26, 0.0)) * 12.98 - t * 3.89 + ph);
    float mb = sin(length(p + vec2(0.26, 0.0)) * 20.97 - t * 3.89 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 1.59 * p.y + time * 1.19); p.y += 0.44 / wf * cos(wf * 3.70 * p.x + time * 1.97); }
	{ p = vec2(atan(p.y, p.x) * 1.37, length(p) * 4.60 - time * 0.52); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.09, 0.10, 0.04), vec3(0.69, 0.94, 0.99), d);
	col = mod(col * 1.59, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
