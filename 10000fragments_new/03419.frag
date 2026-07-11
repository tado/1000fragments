uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 15.47);
    float gsh = hash21(vec2(grow, floor(t * 2.42))) - 0.5;
    float gx = p.x + gsh * 1.07;
    v = sin(gx * 9.29 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.37));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.27;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.25 / wf * sin(wf * 1.69 * p.y + time * 2.19); p.y += 0.50 / wf * cos(wf * 1.98 * p.x + time * 1.15); }
	p = fract(p * 2.31) - 0.5;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.18, 0.17, 0.07), vec3(0.77, 0.51, 0.80), d);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.91 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
