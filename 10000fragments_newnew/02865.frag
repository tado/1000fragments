uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.50, 0.0)) * 17.47 - t * 1.28 + ph);
    float mb = sin(length(p + vec2(0.50, 0.0)) * 22.17 - t * 5.36 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 3.13 + vec2(t * 0.75, -t * 0.80);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.31;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(2.77) * q1;
	q1 = sin(q1 * 2.53 + time * 1.96) * 1.28;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.20);
	float d = min(d1, d2);
	vec3 col = hue(d * 1.01 + time * 0.35);
	col = clamp((col - 0.5) * 1.84 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
