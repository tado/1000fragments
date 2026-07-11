uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x += p.y * -0.20;
	p.y = abs(p.y);
	p.x *= resolution.x / resolution.y;
	p = rot2((time * 0.60) * -0.46) * p;
	vec2 gp = p * 2.92;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.18 - 0.14 * sin((time * 0.60) * 5.70 + rnd * 6.2831853)) * 23.86);
	vec3 col = palette((v) * 1.07 + (time * 0.60) * 0.01, vec3(0.34, 0.35, 0.41), vec3(0.23, 0.22, 0.29), vec3(0.77, 0.61, 0.61), vec3(0.19, 0.28, 0.25));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.38);
	col = clamp(col, 0.0, 1.0) * vec3(1.000, 0.949, 1.021) * 1.00 + 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
