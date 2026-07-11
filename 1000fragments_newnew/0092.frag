uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 3.0 + qr * 7.67 * sin(t * 0.53) + t * 1.94 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.54 * sin(mf + 3.0) + ph), cos(t * 0.54 * cos(mf + 3.0) + ph));
        ms += 0.076 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.31;
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 3; fo++){ q1 = abs(q1) - 0.38; q1 = rot2(1.13) * q1; }
	{ q1 = vec2(atan(q1.y, q1.x) * 1.60, length(q1) * 3.93 - (time * 0.69) * 0.98); }
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 0.76;
	q2 = rot2(length(q2) * 3.10 + (time * 0.69) * 0.76) * q2;
	float d1 = fieldA(q1, (time * 0.69), 0.0);
	float d2 = fieldB(q2, (time * 0.69), 0.66);
	float d = d1 * d2;
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.54, 0.52, 0.51) + vec3(0.10, 0.03, 0.05);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.44);
	col = clamp(col, 0.0, 1.0) * vec3(1.000, 0.971, 1.018) * 1.00 + 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
