uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.09 + t * 0.59 + ph) + sin(p.y * 8.07 - t * 0.59 + ph)
        + sin((p.x + p.y) * 11.00 + t * 0.59 + ph) + sin(length(p) * 17.66 - t * 0.59 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 1.58, length(p) * 3.92 - time * 0.18); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.13; p = rot2(1.55) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.51 + time * 0.28, vec3(0.44, 0.51, 0.41), vec3(0.42, 0.34, 0.35), vec3(0.78, 1.39, 1.03), vec3(0.29, 0.42, 0.20));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
