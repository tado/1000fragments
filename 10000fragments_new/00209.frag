uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 22.86);
    float gsh = hash21(vec2(grow, floor(t * 2.62))) - 0.5;
    float gx = p.x + gsh * 0.42;
    v = sin(gx * 10.51 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.32));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 22.95);
    float gsh = hash21(vec2(grow, floor(t * 8.55))) - 0.5;
    float gx = p.x + gsh * 0.73;
    v = sin(gx * 19.27 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.88));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 2.15) - 0.5;
	q2 = fract(q2 * 1.72) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.54);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.42));
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.02, 0.05, 0.30), vec3(0.91, 0.92, 0.61), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
