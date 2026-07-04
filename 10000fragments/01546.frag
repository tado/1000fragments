uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.48, 0.0)) * 26.67 - t * 3.22 + ph);
    float mb = sin(length(p + vec2(0.48, 0.0)) * 37.30 - t * 2.32 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.29 + t * 4.55 + ph) + sin(p.y * 5.33 - t * 5.55 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.66;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(time * 0.78) * q1;
	{ q2 = vec2(atan(q2.y, q2.x) * 2.93, length(q2) * 2.52 - time * 0.41); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.43);
	float d = d1 * d2;
	vec3 col = palette(d * 1.00 + time * 0.06, vec3(0.57, 0.58, 0.52), vec3(0.39, 0.39, 0.31), vec3(0.71, 1.25, 1.00), vec3(0.96, 0.81, 0.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
