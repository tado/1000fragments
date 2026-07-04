uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 3.22 - t * 0.65;
    v = sin(floor(lv * 2.6) / 2.6 * 6.2831853 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 18.17);
    float gsh = hash21(vec2(grow, floor(t * 4.55))) - 0.5;
    float gx = p.x + gsh * 0.84;
    v = sin(gx * 6.85 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.84));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.39;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(q2.y * 2.06 + time * 0.27) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.84);
	float d = min(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.95 + time * 0.98);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
