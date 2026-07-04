uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 1.93 + vec2(t * 0.40, -t * 0.87);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.55 + t * 3.91 + ph) + sin(p.y * 6.44 - t * 3.91 + ph)
        + sin((p.x + p.y) * 4.45 + t * 3.91 + ph) + sin(length(p) * 10.57 - t * 3.91 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.53;
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 1.20) - 0.5;
	q1 = abs(q1);
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.45; }
	q2 = sin(q2 * 2.17 + time * 1.41) * 1.47;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.52);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.86 + time * 0.26, vec3(0.47, 0.59, 0.44), vec3(0.47, 0.42, 0.38), vec3(1.06, 1.20, 1.08), vec3(0.71, 0.07, 0.17));
	col *= 0.80 + 0.10 * sin(gl_FragCoord.y * 2.19 + time * 5.42);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
