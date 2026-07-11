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
    float wa = sin(p.x * 15.86 + t * 1.69 + ph) * 0.7;
    float wb = sin(p.y * 12.08 - t * 3.16 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.74;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 11.07);
    float gsh = hash21(vec2(grow, floor(t * 5.03))) - 0.5;
    float gx = p.x + gsh * 0.84;
    v = sin(gx * 9.82 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.86));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.19;
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 1.85) - 0.5;
	q1 = abs(q1) - 0.22;
	q2 = rot2(1.50) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.43);
	float d = 0.5 * (d1 + d2);
	vec3 col = hue(d * 1.20 + time * 0.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
