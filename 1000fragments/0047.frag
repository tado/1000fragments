uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 2.60 + t * 0.46) - 0.5) * 2.0;
    v = sin((p.y * 4.34 + zx * 0.57 + t * 2.20) * 3.1415927 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 1.03 + t * 0.45) - 0.5) * 2.0;
    v = sin((p.y * 2.56 + zx * 1.29 + t * 1.91) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.51;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * 3.53 + time * 0.41) * q1;
	{ q2 = vec2(atan(q2.y, q2.x) * 1.55, length(q2) * 3.28 - time * 0.60); }
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.62; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.99);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.39));
	vec3 col = palette(d * 0.42 + time * 0.16, vec3(0.44, 0.56, 0.59), vec3(0.34, 0.34, 0.38), vec3(1.26, 1.07, 1.14), vec3(0.04, 0.63, 0.62));
	col = mod(col * 1.49, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
