uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.03 * sin(mf + 3.0) + ph), cos(t * 0.97 * cos(mf + 3.0) + ph));
        ms += 0.100 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.42 + t * 3.84 + ph) + sin(p.y * 9.65 - t * 3.84 + ph)
        + sin((p.x + p.y) * 10.87 + t * 3.84 + ph) + sin(length(p) * 4.80 - t * 3.84 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.63;
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(0.42, 0.62) * sin(length(q1) * 2.78 - (time * 0.61) * 1.74) * 0.25;
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 1.08;
	for(int fo = 0; fo < 5; fo++){ q2 = abs(q2) - 0.45; q2 = rot2(2.37) * q2; }
	float d1 = fieldA(q1, (time * 0.61), 0.0);
	float d2 = fieldB(q2, (time * 0.61), 1.81);
	float d = abs(d1 - d2);
	vec3 col = palette((d) * 0.53 + (time * 0.61) * 0.06, vec3(0.35, 0.26, 0.27), vec3(0.24, 0.21, 0.21), vec3(0.87, 0.50, 0.57), vec3(0.95, 0.96, 0.10));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.61);
	col = clamp(col, 0.0, 1.0) * vec3(1.029, 1.000, 0.945) * 1.00 + 0.045;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
