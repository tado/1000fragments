uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.82 + sin(p.y * 2.62 + t * 4.04) * 3.29 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 13.49);
    float gsh = hash21(vec2(grow, floor(t * 7.87))) - 0.5;
    float gx = p.x + gsh * 0.58;
    v = sin(gx * 17.57 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.63));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q2.x += sin(q2.y * 4.20 + time * 3.29) * 0.24;
	q2 *= 1.0 + 0.18 * sin(time * 3.25);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.27);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.23 + time * 0.24, vec3(0.42, 0.47, 0.46), vec3(0.45, 0.45, 0.45), vec3(1.22, 0.85, 1.38), vec3(0.48, 0.68, 0.86));
	col *= 0.81 + 0.15 * sin(gl_FragCoord.y * 2.75 + time * 16.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
