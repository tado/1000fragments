uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 15.14 + sin(p.y * 4.68 + t * 4.37) * 1.99 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 30.84 - t * 2.98 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.79 + t * 0.97 + ph) + sin(p.y * 13.22 - t * 0.97 + ph)
        + sin((p.x + p.y) * 8.69 + t * 0.97 + ph) + sin(length(p) * 17.49 - t * 0.97 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.73;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = rot2(time * -0.36) * q2;
	q2 = fract(q2 * 2.53) - 0.5;
	q3 = fract(q3 * 1.11) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.73);
	float d3 = fieldC(q3, time, 0.52);
	d2 = abs(d2 - d3);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.45 + time * 0.00, vec3(0.59, 0.56, 0.41), vec3(0.42, 0.39, 0.39), vec3(0.92, 0.88, 0.90), vec3(0.60, 0.46, 0.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
