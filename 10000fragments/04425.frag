uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.36, 0.0)) * 25.05 - t * 2.75 + ph);
    float mb = sin(length(p + vec2(0.36, 0.0)) * 16.45 - t * 2.75 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.12 + t * 5.92 + ph) + sin(p.y * 2.54 - t * 0.64 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.74;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(1.16) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.76);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.72 + time * 0.07, vec3(0.51, 0.46, 0.45), vec3(0.34, 0.45, 0.39), vec3(1.36, 0.72, 1.08), vec3(0.41, 0.90, 0.20));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
