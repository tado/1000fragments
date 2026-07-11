uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 14.26);
    float gsh = hash21(vec2(grow, floor(t * 7.50))) - 0.5;
    float gx = p.x + gsh * 0.67;
    v = sin(gx * 7.30 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.21));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.27 + vec2(t * 2.53, -t * 1.10) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q2 = (floor(q2 * 24.5) + 0.5) / 24.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.97);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.87, 0.86, 0.21) * (0.19 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col *= 0.89 + 0.15 * sin(gl_FragCoord.y * 2.18 + time * 4.62);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
