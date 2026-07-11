uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.35) - 0.5;
    float rad = 0.28 + 0.12 * sin(t * 3.13 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.58 + 0.24 * pow(abs(cos(ra * 4.0 + t * 1.15)), 2.75);
    v = sin((rr - pet) * 16.91 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.57;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * -3.86 + time * 0.66) * q1;
	q2 = rot2(2.88) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.99);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.42 + time * 0.15, vec3(0.52, 0.47, 0.47), vec3(0.34, 0.31, 0.31), vec3(1.37, 0.92, 1.01), vec3(0.00, 0.55, 0.06));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
