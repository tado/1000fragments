uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.61 + sin(p.y * 1.50 + t * 5.47) * 3.05 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 12.89 - t * 8.35 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.53;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.11; p = rot2(0.60) * p; }
	{ float fr = length(p); p *= 1.0 + 0.21 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.44);
	float d = d1 * d2;
	vec3 col = palette(d * 1.17 + time * 0.21, vec3(0.56, 0.48, 0.53), vec3(0.30, 0.48, 0.43), vec3(0.86, 0.91, 0.76), vec3(0.45, 0.30, 0.30));
	col = clamp((col - 0.5) * 1.82 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
