uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.62 + 0.18 * cos(sa * 4.0 + t * 2.58 + ph);
    v = sin((sr - petal) * 9.16);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.49 + 0.16 * pow(abs(cos(ra * 6.0 + t * 0.85)), 2.01);
    v = sin((rr - pet) * 20.25 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * 2.87 + time * 0.27) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.35);
	float d = 0.5 * (d1 + d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.01, 0.13, 0.28), vec3(0.91, 0.56, 0.97), cc);
	col = fract(col * 2.30);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
