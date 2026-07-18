uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 6.51 + t * 2.48 + ph) * 0.7;
    float wb = sin(p.y * 8.27 - t * 1.60 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.51;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 3.23 + t * 0.66) - 0.5) * 2.0;
    v = sin((p.y * 7.00 + zx * 1.98 + t * 1.65) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y = abs(p.y);
	p.y += sin(p.x * 2.52 + (time * 0.70) * 0.46) * 0.13;
	p.x *= resolution.x / resolution.y;
	p *= 1.68;
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q1); q1 *= 1.0 + -0.58 * fr * fr; }
	q1 = (floor(q1 * 17.0) + 0.5) / 17.0;
	float d1 = fieldA(q1, (time * 0.70), 0.0);
	float d2 = fieldB(q2, (time * 0.70), 0.91);
	float d = min(d1, d2);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.036, 0.062, 0.050), vec3(0.381, 0.502, 0.179), smoothstep(0.0, 0.46, cc)), vec3(0.980, 0.882, 0.564), smoothstep(0.46, 1.0, cc));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.15);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col *= vec3(0.998, 0.999, 1.013);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.56 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
