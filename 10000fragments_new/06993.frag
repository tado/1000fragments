uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.38 + vec2(t * 2.32, -t * 1.12) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 11.96);
    float gsh = hash21(vec2(grow, floor(t * 5.07))) - 0.5;
    float gx = p.x + gsh * 1.04;
    v = sin(gx * 13.23 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.71));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.02;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * -1.19 + time * 1.11) * q1;
	q2 = fract(q2 * 1.04) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.66);
	float d = min(d1, d2);
	vec3 col = hue(d * 0.95 + time * 0.05);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.64));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
