uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 10.54);
    float gsh = hash21(vec2(grow, floor(t * 4.08))) - 0.5;
    float gx = p.x + gsh * 1.00;
    v = sin(gx * 14.59 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.78));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 1.58 * p.y + time * 1.31); p.y += 0.31 / wf * cos(wf * 3.98 * p.x + time * 2.12); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.50, 0.24, 0.47), vec3(0.67, 0.84, 0.72), d);
	col = clamp((col - 0.5) * 1.52 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
