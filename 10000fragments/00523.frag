uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 16.10 + sin(p.y * 3.08 + t * 1.52) * 2.50 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(p.y * -3.60 + time * 0.78) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.67 + time * 0.12, vec3(0.47, 0.45, 0.41), vec3(0.45, 0.34, 0.35), vec3(1.10, 1.08, 0.78), vec3(0.32, 0.90, 0.96));
	col = mod(col * 1.68, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
