uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 2.69 + vec2(t * 0.40, -t * 0.37);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.55, 0.0)) * 18.97 - t * 5.23 + ph);
    float mb = sin(length(p + vec2(0.55, 0.0)) * 30.59 - t * 5.08 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.68;
	p = rot2(length(p) * -3.27 + time * 1.45) * p;
	{ float fr = length(p); p *= 1.0 + 0.54 * fr * fr; }
	p = rot2(time * 1.43) * p;
	p = (floor(p * 21.9) + 0.5) / 21.9;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.86);
	float d = d1 * d2;
	vec3 col = palette(d * 1.62 + time * 0.04, vec3(0.53, 0.47, 0.50), vec3(0.41, 0.31, 0.49), vec3(1.20, 1.33, 0.92), vec3(0.11, 0.27, 0.72));
	col *= 0.89 + 0.14 * sin(gl_FragCoord.y * 2.60 + time * 13.51);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
