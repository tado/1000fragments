uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 10.34 + sin(p.y * 3.46 + t * 1.77) * 1.25 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.76;
	p = rot2(time * 1.11) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(length(p) * 2.08 + time * 0.29) * p;
	p += vec2(0.48, 0.19) * sin(length(p) * 2.96 - time * 1.32) * 0.26;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.62 + time * 0.27, vec3(0.47, 0.55, 0.41), vec3(0.44, 0.38, 0.50), vec3(1.10, 0.96, 1.33), vec3(0.85, 0.80, 0.90));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
