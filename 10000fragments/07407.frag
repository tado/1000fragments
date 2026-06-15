uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 26.71 - t * 2.90 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 3.26 * p.y + time * 1.67); p.y += 0.48 / wf * cos(wf * 3.86 * p.x + time * 1.50); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.09, 0.05, 0.45), vec3(0.85, 0.74, 0.71), d);
	col = mod(col * 2.80, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
