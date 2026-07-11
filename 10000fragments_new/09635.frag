uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.48) - 0.5;
    float rad = 0.39 + 0.12 * sin(t * 3.03 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 5.0 + qr * 4.41 * sin(t * 1.42) + t * 1.96 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.75;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * 3.29 + time * 0.35) * q1;
	for(int fo = 0; fo < 3; fo++){ q2 = abs(q2) - 0.35; q2 = rot2(1.19) * q2; }
	q2 = fract(q2 * 2.96) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.39);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.43, 0.65, 0.65) * (0.16 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
