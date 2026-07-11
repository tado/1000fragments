uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.16 + t * 2.92 + ph) + sin(p.y * 12.75 - t * 1.26 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.37;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.52; p = rot2(1.72) * p; }
	p.y += sin(p.x * 4.70 + time * 3.37) * 0.31;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.93 + time * 0.26, vec3(0.52, 0.41, 0.50), vec3(0.48, 0.36, 0.36), vec3(1.30, 1.14, 1.37), vec3(0.89, 0.05, 0.61));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
