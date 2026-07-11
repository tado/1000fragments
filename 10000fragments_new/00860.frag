uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.35 + 0.28 * pow(abs(cos(ra * 7.0 + t * 2.82)), 2.05);
    v = sin((rr - pet) * 11.91 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.00 * sin(mf + 3.0) + ph), cos(t * 1.89 * cos(mf + 3.0) + ph));
        ms += 0.057 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.52;
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 2; fo++){ q1 = abs(q1) - 0.54; q1 = rot2(0.73) * q1; }
	q1 = rot2(time * 0.98) * q1;
	q2 = rot2(length(q2) * -2.98 + time * 0.51) * q2;
	q2 = fract(q2 * 1.89) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.16);
	float d = min(d1, d2);
	vec3 col = hue(d * 0.85 + time * 0.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
