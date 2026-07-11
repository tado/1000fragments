uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 17.24 - t * 1.21 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.47 + sr * 20.00 - t * 4.86 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.00;
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 1.07) - 0.5;
	q1.y += sin(q1.x * 2.65 + time * 1.91) * 0.23;
	{ float fr = length(q2); q2 *= 1.0 + -0.63 * fr * fr; }
	q2 = rot2(time * -0.32) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.67);
	float d = d1 * d2;
	vec3 col = hue(d * 1.29 + time * 0.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
