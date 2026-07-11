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
    v = sin(sa * 7.41 + sr * 20.98 - t * 1.80 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 4.95 + t * 1.95 + ph) * 0.7;
    float wb = sin(p.y * 7.48 - t * 0.93 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.21;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 2; fo++){ q2 = abs(q2) - 0.29; q2 = rot2(2.16) * q2; }
	q2 *= 1.0 + 0.30 * sin(time * 1.76);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.46);
	float d = max(d1, d2);
	vec3 col = hue(d * 0.50 + time * 0.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
