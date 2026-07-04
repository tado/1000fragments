uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 4.48;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.23 + 0.15 * sin(t * 2.74 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.43 + sin(p.y * 4.26 + t * 0.87) * 2.05 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.10;
	vec2 q1 = p; vec2 q2 = p;
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.79; }
	q1 += vec2(-0.54, -0.74) * sin(length(q1) * 5.93 - time * 1.56) * 0.28;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.86);
	float d = min(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.52, 0.71, 0.94) + vec3(0.03, 0.14, 0.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
