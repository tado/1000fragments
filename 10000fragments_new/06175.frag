uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.55 + 0.30 * pow(abs(cos(ra * 5.0 + t * 1.43)), 1.51);
    v = sin((rr - pet) * 16.45 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.30;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 1.93 * p.y + time * 2.10); p.y += 0.45 / wf * cos(wf * 2.57 * p.x + time * 1.45); }
	p.y += sin(p.x * 5.61 + time * 1.71) * 0.36;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.93, 0.73, 0.58) * (0.15 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.07;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
