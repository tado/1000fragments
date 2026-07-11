uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 11.23);
    float gsh = hash21(vec2(grow, floor(t * 2.99))) - 0.5;
    float gx = p.x + gsh * 0.65;
    v = sin(gx * 16.39 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.85));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 9.01 + sin(p.y * 2.16 + t * 2.06) * 3.96 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 12.31);
    float gsh = hash21(vec2(grow, floor(t * 2.76))) - 0.5;
    float gx = p.x + gsh * 1.18;
    v = sin(gx * 17.87 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.11));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.32);
	float d3 = fieldC(q3, time, 1.32);
	d2 = 0.5 * (d2 + d3);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.20, 0.09, 0.19), vec3(0.74, 0.87, 0.69), cc);
	col = fract(col * 1.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
