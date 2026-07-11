uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 13.92 - t * 5.16 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.01 + sin(p.y * 4.93 + t * 1.34) * 4.63 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.46;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(length(p) * -2.50 + time * 0.98) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.42);
	float d = d1 * d2;
	vec3 col = palette(d * 0.72 + time * 0.23, vec3(0.48, 0.45, 0.41), vec3(0.43, 0.48, 0.31), vec3(0.81, 0.84, 0.83), vec3(0.78, 0.56, 0.01));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
