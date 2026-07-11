uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.56 + t * 2.20 + ph) + sin(p.y * 13.49 - t * 4.00 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.18 + sr * 12.31 - t * 1.88 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.97;
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 2; fo++){ q2 = abs(q2) - 0.20; q2 = rot2(1.56) * q2; }
	q2 = rot2(time * 0.98) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.79);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.23));
	vec3 col = palette(d * 1.48 + time * 0.14, vec3(0.53, 0.53, 0.46), vec3(0.45, 0.46, 0.43), vec3(0.81, 1.11, 1.14), vec3(0.04, 0.53, 0.65));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
