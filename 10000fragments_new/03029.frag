uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.55 + 0.21 * pow(abs(cos(ra * 4.0 + t * 1.55)), 0.94);
    v = sin((rr - pet) * 12.12 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 20.30);
    float gsh = hash21(vec2(grow, floor(t * 7.49))) - 0.5;
    float gx = p.x + gsh * 0.38;
    v = sin(gx * 10.77 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.01));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 11.43 + t * 1.19 + ph) * 0.7;
    float wb = sin(p.y * 16.79 - t * 3.33 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.46;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.45;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.28);
	float d3 = fieldC(q3, time, 0.62);
	d2 = abs(d2 - d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.90));
	vec3 col = vec3(0.30, 0.59, 0.69) * (0.20 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
