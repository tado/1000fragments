uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 4.10 - t * 1.05;
    v = sin(floor(lv * 3.9) / 3.9 * 6.2831853 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.49) - 0.5;
    float rad = 0.29 + 0.12 * sin(t * 2.39 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.52;
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 2; fo++){ q1 = abs(q1) - 0.32; q1 = rot2(0.51) * q1; }
	q1 = rot2(0.55) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.58);
	float d = d1 * d2;
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.18 + time * 0.26);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.86 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
