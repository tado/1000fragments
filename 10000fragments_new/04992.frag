uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.02 * sin(mf + 3.0) + ph), cos(t * 0.65 * cos(mf + 3.0) + ph));
        ms += 0.025 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.28, 0.0)) * 22.97 - t * 6.05 + ph);
    float mb = sin(length(p + vec2(0.28, 0.0)) * 13.77 - t * 6.89 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.48;
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(0.69, 0.94) * sin(length(q1) * 2.48 - time * 2.07) * 0.19;
	q2 = rot2(q2.y * 1.49 + time * 0.98) * q2;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.69);
	float d = d1 * d2;
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.42 + time * 0.32);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
