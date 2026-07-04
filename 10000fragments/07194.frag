uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 12.0 + qr * 2.28 * sin(t * 0.48) + t * 4.58 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 1.32 + vec2(t * 1.04, -t * 0.89);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.37;
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	q1 = rot2(q1.y * -3.55 + time * 0.52) * q1;
	q2 = abs(q2) - 0.24;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.11);
	float d = max(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.05, 1.07, 0.58) + vec3(0.10, 0.20, 0.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
