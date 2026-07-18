uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.32 + 0.30 * pow(abs(cos(ra * 6.0 + t * 2.25)), 2.31);
    v = sin((rr - pet) * 17.98 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 9.0 + qr * 6.77 * sin(t * 0.98) + t * 1.90 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.97;
	p *= 2.22;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.54; p = rot2(2.31) * p; }
	p = rot2(2.47) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = mix(p, p.yx, 0.5 + 0.5 * sin((time * 0.76) * 2.41));
	float d1 = field(p, (time * 0.76), 0.0);
	float d2 = field2(p, (time * 0.76), 0.88);
	float d = mix(d1, d2, 0.5 + 0.5 * sin((time * 0.76) * 0.7));
	vec3 col = palette(d * 0.95 + (time * 0.76) * 0.12, vec3(0.14, 0.34, 0.43), vec3(0.15, 0.28, 0.33), vec3(0.97, 1.05, 0.99), vec3(0.56, 0.48, 0.36));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.23);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(1.001, 0.953, 1.014);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.55 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
