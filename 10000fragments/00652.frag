uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 19.65 - t * 3.08 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 15.42 + sin(p.y * 4.35 + t * 5.81) * 2.40 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(-0.10, 0.16) * sin(length(p) * 4.75 - time * 1.57) * 0.27;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = fract(p * 2.25) - 0.5;
	p = rot2(length(p) * -2.86 + time * 0.26) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.35);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.49 + time * 0.18, vec3(0.41, 0.41, 0.47), vec3(0.39, 0.35, 0.31), vec3(1.34, 1.00, 0.92), vec3(0.55, 0.80, 0.54));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
