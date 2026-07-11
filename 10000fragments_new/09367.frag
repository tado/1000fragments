uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.57 * sin(mf + 3.0) + ph), cos(t * 0.93 * cos(mf + 3.0) + ph));
        ms += 0.034 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.29) - 0.5;
    float rad = 0.38 + 0.12 * sin(t * 2.23 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.25;
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 2.16;
	q2 = rot2(q2.y * 2.17 + time * 0.53) * q2;
	for(int fo = 0; fo < 3; fo++){ q2 = abs(q2) - 0.40; q2 = rot2(1.21) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.72);
	float d = d1 * d2;
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.18, 0.29, 0.19), vec3(0.94, 0.81, 0.80), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
