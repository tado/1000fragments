uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 13.18);
    float gsh = hash21(vec2(grow, floor(t * 8.49))) - 0.5;
    float gx = p.x + gsh * 0.64;
    v = sin(gx * 19.95 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.28));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.34 + 0.24 * pow(abs(cos(ra * 5.0 + t * 2.24)), 1.28);
    v = sin((rr - pet) * 12.94 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q2 += vec2(0.09, 0.33) * sin(length(q2) * 3.50 - time * 2.11) * 0.14;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.60);
	float d = min(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.16, 0.11, 0.53), vec3(0.63, 0.87, 0.79), cc);
	col = clamp((col - 0.5) * 1.96 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
