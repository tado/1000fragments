uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 11.23);
    float gsh = hash21(vec2(grow, floor(t * 6.25))) - 0.5;
    float gx = p.x + gsh * 0.31;
    v = sin(gx * 16.24 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.69));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.96;
	p = (floor(p * 26.0) + 0.5) / 26.0;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 2.91 * p.y + time * 2.00); p.y += 0.39 / wf * cos(wf * 3.37 * p.x + time * 0.96); }
	p = abs(p) - 0.31;
	p *= 2.33;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.70, 0.89, 0.96) * (0.06 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
