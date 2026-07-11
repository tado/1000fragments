uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 18.65 - t * 7.48 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.39; p = rot2(2.32) * p; }
	p += vec2(0.00, -0.26) * sin(length(p) * 5.49 - time * 1.14) * 0.20;
	p = fract(p * 2.17) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.24 + time * 0.27, vec3(0.54, 0.42, 0.43), vec3(0.39, 0.49, 0.42), vec3(0.96, 1.01, 0.82), vec3(0.37, 0.66, 0.27));
	col = clamp((col - 0.5) * 1.86 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
