uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 6.34);
    float gsh = hash21(vec2(grow, floor(t * 9.30))) - 0.5;
    float gx = p.x + gsh * 0.42;
    v = sin(gx * 17.05 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.44));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.22, t * 1.54 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 1.0 + 0.37 * sin(time * 2.78);
	q1 *= 3.14;
	q2 *= 1.88;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.10);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.06));
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.29, 0.13, 0.50), vec3(0.68, 0.61, 0.99), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
