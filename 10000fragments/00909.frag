uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.64 + sr * 9.54 - t * 2.05 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.58 + t * 3.12 + ph) + sin(p.y * 3.17 - t * 3.12 + ph)
        + sin((p.x + p.y) * 6.34 + t * 3.12 + ph) + sin(length(p) * 10.65 - t * 3.12 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.45;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(p.y * -3.33 + time * 0.78) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.98);
	float d = d1 * d2;
	vec3 col = palette(d * 1.46 + time * 0.14, vec3(0.54, 0.47, 0.41), vec3(0.35, 0.43, 0.31), vec3(1.03, 1.14, 1.27), vec3(0.31, 0.83, 0.53));
	col = fract(col * 1.94);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
