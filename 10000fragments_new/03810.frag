uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 14.17);
    float gsh = hash21(vec2(grow, floor(t * 8.73))) - 0.5;
    float gx = p.x + gsh * 0.50;
    v = sin(gx * 12.14 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.51));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 3.97 * p.y + time * 1.40); p.y += 0.23 / wf * cos(wf * 3.80 * p.x + time * 1.54); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.42, 0.25, 0.23), vec3(0.60, 0.62, 0.50), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.57));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
