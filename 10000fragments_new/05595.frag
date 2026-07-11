uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 19.92);
    float gsh = hash21(vec2(grow, floor(t * 6.69))) - 0.5;
    float gx = p.x + gsh * 0.86;
    v = sin(gx * 14.49 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.54));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 2.68 * p.y + time * 1.19); p.y += 0.27 / wf * cos(wf * 3.41 * p.x + time * 1.54); }
	p += vec2(0.95, -0.36) * sin(length(p) * 2.19 - time * 1.19) * 0.37;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.48 + time * 0.11);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.08;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
