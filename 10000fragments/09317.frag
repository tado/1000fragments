uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.39 + 0.17 * pow(abs(cos(ra * 6.0 + t * 1.57)), 1.96);
    v = sin((rr - pet) * 19.62 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.31;
    v = 0.5 * (sin(3.0 * cp.x + t * 1.69) * sin(4.0 * cp.y + ph)
             + sin(4.0 * cp.x - t * 0.72) * sin(3.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.98;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * 3.43 + time * 0.74) * q1;
	q1 = rot2(1.45) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.79);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.47));
	vec3 col = palette(d * 0.43 + time * 0.34, vec3(0.56, 0.48, 0.42), vec3(0.49, 0.36, 0.39), vec3(0.80, 1.31, 1.02), vec3(0.99, 0.65, 0.87));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
