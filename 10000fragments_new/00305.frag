uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.50, 0.0)) * 32.42 - t * 3.77 + ph);
    float mb = sin(length(p + vec2(0.50, 0.0)) * 32.49 - t * 3.44 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 8.25 - t * 5.96 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.37;
	vec2 q1 = p; vec2 q2 = p;
	q1.x += sin(q1.y * 2.17 + time * 1.00) * 0.22;
	q1 = rot2(2.09) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.93);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.82 + time * 0.02, vec3(0.52, 0.54, 0.52), vec3(0.45, 0.36, 0.41), vec3(1.19, 0.93, 0.90), vec3(0.08, 0.46, 0.63));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
