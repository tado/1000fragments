uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 17.66 + t * 1.78 + ph) * 0.7;
    float wb = sin(p.y * 14.48 - t * 3.87 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.62;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.73 + sr * 23.71 - t * 3.47 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(0.57) * q1;
	q2 += vec2(-0.96, 0.76) * sin(length(q2) * 3.45 - time * 2.37) * 0.26;
	for(int fo = 0; fo < 4; fo++){ q2 = abs(q2) - 0.23; q2 = rot2(2.23) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.09);
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.21 + time * 0.60);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
