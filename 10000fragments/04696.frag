uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.28, 0.0)) * 28.21 - t * 2.88 + ph);
    float mb = sin(length(p + vec2(0.28, 0.0)) * 33.22 - t * 2.88 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.30 / wf * sin(wf * 1.59 * p.y + time * 1.95); p.y += 0.21 / wf * cos(wf * 3.69 * p.x + time * 1.46); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.26, 0.45, 0.02), vec3(0.88, 0.86, 0.66), d);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
