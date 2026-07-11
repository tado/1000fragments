uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.29) - 0.5;
    float rad = 0.41 + 0.12 * sin(t * 3.49 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 17.86 - t * 3.27 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(0.86, 0.03) * sin(length(q1) * 5.73 - time * 1.74) * 0.33;
	q1 = rot2(time * 0.71) * q1;
	for(int fo = 0; fo < 4; fo++){ q2 = abs(q2) - 0.45; q2 = rot2(1.40) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.43);
	float d = d1 * d2;
	vec3 col = vec3(0.57, 0.34, 0.28) * (0.06 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.31 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
