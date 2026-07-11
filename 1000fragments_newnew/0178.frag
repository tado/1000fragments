uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 3.10;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.29 + 0.14 * sin(t * 2.08 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 12.0 + qr * 2.44 * sin(t * 1.14) + t * 2.74 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.86;
	vec2 q1 = p; vec2 q2 = p;
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin((time * 0.83) * 0.76));
	float d1 = fieldA(q1, (time * 0.83), 0.0);
	float d2 = fieldB(q2, (time * 0.83), 0.30);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.66, 0.76, 0.74) * (0.07 / (abs((d)) + 0.08));
	col = col / (1.0 + col);
	col *= 0.82 + 0.10 * sin(gl_FragCoord.y * 1.31 + (time * 0.83) * 14.38);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.50);
	col = clamp(col, 0.0, 1.0) * vec3(0.955, 1.006, 0.950) * 1.00 + 0.049;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
