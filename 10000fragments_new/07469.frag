uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 13; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.27 * sin(mf + 3.0) + ph), cos(t * 1.26 * cos(mf + 3.0) + ph));
        ms += 0.025 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.55 + 0.16 * cos(sa * 8.0 + t * 0.93 + ph);
    v = sin((sr - petal) * 14.43);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * 3.58 + time * 0.89) * q1;
	q1 += vec2(0.79, 0.02) * sin(length(q1) * 4.61 - time * 2.39) * 0.15;
	{ float fr = length(q2); q2 *= 1.0 + 0.26 * fr * fr; }
	q2 = rot2(q2.y * 2.94 + time * 0.71) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.74);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.45, 0.73, 0.38) * (0.24 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
