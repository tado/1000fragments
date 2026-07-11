uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.55, 0.0)) * 10.22 - t * 5.67 + ph);
    float mb = sin(length(p + vec2(0.55, 0.0)) * 20.65 - t * 5.67 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.17 + t * 1.43 + ph) + sin(p.y * 11.53 - t * 1.43 + ph)
        + sin((p.x + p.y) * 11.70 + t * 1.43 + ph) + sin(length(p) * 5.57 - t * 1.43 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.68;
	{ p = vec2(atan(p.y, p.x) * 2.65, length(p) * 4.92 - time * 0.75); }
	p = fract(p * 2.52) - 0.5;
	p = rot2(time * -0.63) * p;
	{ float fr = length(p); p *= 1.0 + -0.39 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.04);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.14 + time * 0.15, vec3(0.55, 0.51, 0.57), vec3(0.37, 0.45, 0.30), vec3(0.79, 1.27, 1.30), vec3(0.08, 0.53, 0.80));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
