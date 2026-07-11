uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.67) - 0.5;
    float rad = 0.43 + 0.12 * sin(t * 3.89 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.48 + vec2(t * 1.53, -t * 2.04) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q1); q1 *= 1.0 + 0.33 * fr * fr; }
	q1 = fract(q1 * 2.10) - 0.5;
	for(int fo = 0; fo < 4; fo++){ q2 = abs(q2) - 0.31; q2 = rot2(0.63) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.58);
	float d = 0.5 * (d1 + d2);
	vec3 col = hue(d * 1.47 + time * 0.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
