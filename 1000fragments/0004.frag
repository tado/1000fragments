uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.30 + sr * 15.41 - t * 0.96 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.49 + t * 3.41 + ph) + sin(p.y * 13.81 - t * 3.41 + ph)
        + sin((p.x + p.y) * 2.94 + t * 3.41 + ph) + sin(length(p) * 9.79 - t * 3.41 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.01 + t * 4.31 + ph) + sin(p.y * 2.07 - t * 4.36 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.60;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = rot2(time * 0.68) * q2;
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 0.87;
	q3.y += sin(q3.x * 4.82 + time * 1.64) * 0.28;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.43);
	float d3 = fieldC(q3, time, 1.48);
	d2 = max(d2, d3);
	float d = min(d1, d2);
	vec3 col = hue(d * 0.84 + time * 0.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
