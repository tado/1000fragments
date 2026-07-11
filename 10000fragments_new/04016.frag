uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.57 + 0.12 * cos(sa * 9.0 + t * 0.93 + ph);
    v = sin((sr - petal) * 19.71);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.36 * sin(mf + 3.0) + ph), cos(t * 0.32 * cos(mf + 3.0) + ph));
        ms += 0.067 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.62;
	vec2 q1 = p; vec2 q2 = p;
	q1 = abs(q1) - 0.62;
	q1 = rot2(q1.y * 2.52 + time * 0.69) * q1;
	q2 = (floor(q2 * 14.4) + 0.5) / 14.4;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.32);
	float d = max(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.24 + time * 0.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
