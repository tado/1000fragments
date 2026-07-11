uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.60 + 0.24 * pow(abs(cos(ra * 7.0 + t * 2.47)), 1.15);
    v = sin((rr - pet) * 12.77 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.49 + 0.27 * pow(abs(cos(ra * 4.0 + t * 1.35)), 0.92);
    v = sin((rr - pet) * 21.75 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = (floor(p * 13.6) + 0.5) / 13.6;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.31);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.87 + time * 0.12, vec3(0.56, 0.57, 0.60), vec3(0.49, 0.45, 0.43), vec3(1.35, 0.95, 1.17), vec3(0.13, 0.20, 0.29));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
