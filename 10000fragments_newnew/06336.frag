uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 3.99;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.24 + 0.14 * sin(t * 1.43 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.51;
    v = 0.5 * (sin(4.0 * cp.x + t * 1.22) * sin(3.0 * cp.y + ph)
             + sin(3.0 * cp.x - t * 2.07) * sin(4.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(time * 1.03) * q1;
	q1 = rot2(length(q1) * -2.86 + time * 1.42) * q1;
	q2 = fract(q2 * 2.62) - 0.5;
	{ float fr = length(q2); q2 *= 1.0 + -0.77 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.69);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.22));
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.04, 0.62, 1.42) + vec3(0.23, 0.20, 0.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
