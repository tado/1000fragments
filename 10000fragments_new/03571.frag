uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.91 + sr * 14.60 - t * 1.43 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.36 + 0.19 * cos(sa * 4.0 + t * 2.53 + ph);
    v = sin((sr - petal) * 16.73);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(-0.01, 0.22) * sin(length(q1) * 3.86 - time * 2.12) * 0.32;
	q1 = rot2(q1.y * 2.04 + time * 0.33) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.19);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.53));
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.13, 0.34, 0.09), vec3(0.97, 0.83, 0.84), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
