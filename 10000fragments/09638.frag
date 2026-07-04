uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 4.65 + t * 1.04) - 0.5) * 2.0;
    v = sin((p.y * 4.69 + zx * 1.64 + t * 0.92) * 3.1415927 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 2.61 + vec2(t * 0.52, -t * 0.83);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.11;
	vec2 q1 = p; vec2 q2 = p;
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.71; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.94);
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.80 + time * 0.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
