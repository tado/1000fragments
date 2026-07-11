uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 15.74 + t * 1.73 + ph) * 0.7;
    float wb = sin(p.y * 13.18 - t * 1.59 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.30;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.43 * sin(mf + 3.0) + ph), cos(t * 0.53 * cos(mf + 3.0) + ph));
        ms += 0.038 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(0.66) * q2;
	q2 += vec2(-0.65, 0.29) * sin(length(q2) * 5.35 - time * 1.34) * 0.37;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.48);
	float d = max(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.63 + time * 0.77);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
