uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.92 + t * 0.55 + ph) + sin(p.y * 5.22 - t * 3.98 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.07;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.24; p = rot2(2.15) * p; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float fr = length(p); p *= 1.0 + -0.38 * fr * fr; }
	p = rot2(p.y * 1.02 + time * 0.63) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.80 + time * 0.11, vec3(0.40, 0.53, 0.42), vec3(0.41, 0.44, 0.43), vec3(0.96, 1.09, 1.26), vec3(0.28, 0.54, 0.29));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
