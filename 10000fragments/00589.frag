uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 12.82 + sin(p.y * 2.30 + t * 5.81) * 1.25 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.54 + t * 1.09 + ph) + sin(p.y * 12.84 - t * 1.09 + ph)
        + sin((p.x + p.y) * 8.74 + t * 1.09 + ph) + sin(length(p) * 4.17 - t * 1.09 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.64;
	p = rot2(time * -1.35) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = fract(p * 1.08) - 0.5;
	p = abs(p) - 0.59;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.13);
	float d = d1 + d2;
	vec3 col = palette(d * 0.83 + time * 0.23, vec3(0.57, 0.41, 0.43), vec3(0.49, 0.44, 0.49), vec3(1.19, 1.19, 1.29), vec3(0.55, 0.43, 0.54));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.17));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
