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
    vec2 cq = p * 11.60 + vec2(t * 1.77, -t * 0.78) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 12.67);
    float gsh = hash21(vec2(grow, floor(t * 7.83))) - 0.5;
    float gx = p.x + gsh * 1.17;
    v = sin(gx * 8.50 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.95));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(length(q2) * -1.98 + time * 1.48) * q2;
	q2 = sin(q2 * 1.01 + time * 2.01) * 1.16;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.58);
	float d = d1 * d2;
	vec3 col = hue(d * 1.47 + time * 0.36);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.21 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
