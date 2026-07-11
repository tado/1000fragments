uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.91;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.63; kp = rot2(2.62) * kp; kp *= 1.41; }
    v = sin(kp.y * 1.11 - t * 2.51 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 4.0 + qr * 6.26 * sin(t * 1.32) + t * 3.53 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.18;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(2.98) * q1;
	q1 = rot2(q1.y * -2.52 + time * 0.59) * q1;
	q2 = rot2(length(q2) * -1.12 + time * 0.34) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.64);
	float d = min(d1, d2);
	vec3 col = hue(d * 0.74 + time * 0.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
