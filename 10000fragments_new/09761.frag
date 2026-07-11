uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 17.83);
    float gsh = hash21(vec2(grow, floor(t * 6.48))) - 0.5;
    float gx = p.x + gsh * 0.80;
    v = sin(gx * 15.84 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.33));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.16;
	p.y += sin(p.x * 7.91 + time * 3.78) * 0.28;
	{ p = vec2(atan(p.y, p.x) * 1.75, length(p) * 4.48 - time * 0.64); }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 3.20 * p.y + time * 1.95); p.y += 0.26 / wf * cos(wf * 2.44 * p.x + time * 1.93); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.19, 0.61, 0.91) * (0.14 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
