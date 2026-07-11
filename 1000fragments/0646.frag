uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.13 + t * 0.55 + ph) + sin(p.y * 8.64 - t * 2.61 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 14.00 - t * 1.71 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.48;
	p *= 1.82;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(time * -1.38) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.49);
	float d = d1 + d2;
	vec3 col = palette(d * 0.86 + time * 0.16, vec3(0.54, 0.57, 0.45), vec3(0.32, 0.45, 0.31), vec3(0.76, 1.07, 0.83), vec3(0.32, 0.65, 0.03));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
