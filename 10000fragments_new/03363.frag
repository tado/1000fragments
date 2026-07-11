uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 16.27);
    float gsh = hash21(vec2(grow, floor(t * 2.48))) - 0.5;
    float gx = p.x + gsh * 0.69;
    v = sin(gx * 12.97 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.03));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 10.06 + sin(p.y * 4.84 + t * 5.11) * 2.25 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.58;
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.94, length(q1) * 4.91 - time * 0.67); }
	q1 = rot2(q1.y * 2.27 + time * 0.75) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.89);
	float d = max(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.29 + time * 0.22);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.92 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
