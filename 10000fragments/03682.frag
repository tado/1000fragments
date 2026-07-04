uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 2.59 + t * 0.30) - 0.5) * 2.0;
    v = sin((p.y * 6.33 + zx * 1.01 + t * 0.63) * 3.1415927 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 2.50 + vec2(t * 0.63, -t * 0.87);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin(time * 1.40));
	q2 = rot2(q2.y * -2.73 + time * 0.94) * q2;
	q2 += vec2(0.81, -0.89) * sin(length(q2) * 4.69 - time * 1.02) * 0.15;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.24);
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.53 + time * 0.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
