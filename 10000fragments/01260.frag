uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.84 + t * 4.06 + ph) + sin(p.y * 11.07 - t * 3.27 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.81, t * 1.85 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.42; p = rot2(0.67) * p; }
	p = rot2(time * -0.61) * p;
	{ p = vec2(atan(p.y, p.x) * 2.31, length(p) * 2.77 - time * 0.23); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.93);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.80 + time * 0.19, vec3(0.53, 0.49, 0.48), vec3(0.42, 0.40, 0.50), vec3(1.31, 1.00, 0.76), vec3(0.80, 0.29, 0.63));
	col = mod(col * 1.77, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
