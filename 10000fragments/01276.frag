uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 28.69 - t * 5.32 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * -0.64) * p;
	p += vec2(-0.46, -0.54) * sin(length(p) * 5.51 - time * 0.50) * 0.31;
	p = fract(p * 1.62) - 0.5;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.61 + time * 0.14, vec3(0.52, 0.50, 0.49), vec3(0.33, 0.42, 0.42), vec3(1.13, 1.28, 1.12), vec3(0.51, 0.51, 0.07));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
