uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.40 + 0.21 * cos(sa * 7.0 + t * 0.57 + ph);
    v = sin((sr - petal) * 8.69);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.53 + 0.13 * cos(sa * 6.0 + t * 0.74 + ph);
    v = sin((sr - petal) * 17.42);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.90;
	vec2 q1 = p; vec2 q2 = p;
	q1 = abs(q1);
	for(int fo = 0; fo < 2; fo++){ q1 = abs(q1) - 0.28; q1 = rot2(1.09) * q1; }
	q2 = abs(q2) - 0.75;
	q2 *= 2.93;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.50);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.08));
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.51, 1.45, 1.41) + vec3(0.17, 0.10, 0.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
