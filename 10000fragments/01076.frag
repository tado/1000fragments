uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 3.68;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.24 + 0.13 * sin(t * 2.67 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 7.0 + qr * 5.89 * sin(t * 0.95) + t * 2.46 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.84; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.92);
	float d = max(d1, d2);
	vec3 col = vec3(0.24, 0.17, 0.24) * (0.17 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col *= 0.80 + 0.14 * sin(gl_FragCoord.y * 2.48 + time * 9.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
