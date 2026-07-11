uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.39 + vec2(t * 0.75, -t * 1.14) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 16.96);
    float gsh = hash21(vec2(grow, floor(t * 6.01))) - 0.5;
    float gx = p.x + gsh * 0.63;
    v = sin(gx * 15.13 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.23));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 9.92);
    float gsh = hash21(vec2(grow, floor(t * 8.57))) - 0.5;
    float gx = p.x + gsh * 0.37;
    v = sin(gx * 6.34 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.24));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.03);
	float d3 = fieldC(q3, time, 1.43);
	d2 = 0.5 * (d2 + d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.14));
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.68 + time * 0.67);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
