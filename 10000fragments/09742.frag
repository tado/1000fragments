uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 22.00 + sin(p.y * 2.46 + t * 5.63) * 2.70 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.52 + sin(p.y * 4.30 + t * 2.60) * 4.77 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.84;
	p = rot2(time * -0.57) * p;
	{ p = vec2(atan(p.y, p.x) * 2.71, length(p) * 3.70 - time * 0.30); }
	p = rot2(p.y * 1.85 + time * 0.93) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.19);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.41 + time * 0.29, vec3(0.52, 0.41, 0.42), vec3(0.48, 0.49, 0.32), vec3(0.79, 0.92, 0.93), vec3(0.29, 0.14, 0.42));
	col = fract(col * 1.69);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
