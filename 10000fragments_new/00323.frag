uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.83 + t * 1.66 + ph) + sin(p.y * 13.00 - t * 3.88 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.11 * sin(mf + 3.0) + ph), cos(t * 1.88 * cos(mf + 3.0) + ph));
        ms += 0.087 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.15;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(length(q2) * -1.39 + time * 0.88) * q2;
	{ q2 = vec2(atan(q2.y, q2.x) * 1.49, length(q2) * 2.76 - time * 0.60); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.98);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.49));
	vec3 col = palette(d * 1.06 + time * 0.36, vec3(0.41, 0.45, 0.48), vec3(0.39, 0.45, 0.49), vec3(1.18, 1.13, 0.90), vec3(0.30, 0.92, 0.38));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
