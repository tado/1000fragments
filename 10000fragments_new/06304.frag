uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 4.0 + qr * 3.41 * sin(t * 1.14) + t * 1.79 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.47, 0.0)) * 30.75 - t * 4.48 + ph);
    float mb = sin(length(p + vec2(0.47, 0.0)) * 37.69 - t * 7.39 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.05;
	p = rot2(length(p) * -1.16 + time * 1.41) * p;
	p *= 2.12;
	{ float fr = length(p); p *= 1.0 + 0.74 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.59);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.52 + time * 0.10, vec3(0.49, 0.58, 0.59), vec3(0.35, 0.45, 0.32), vec3(1.31, 1.14, 1.10), vec3(0.14, 0.88, 0.13));
	col = fract(col * 2.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
