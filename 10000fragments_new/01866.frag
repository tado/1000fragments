uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.36 + 0.16 * pow(abs(cos(ra * 2.0 + t * 2.65)), 0.95);
    v = sin((rr - pet) * 9.49 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.05 + sr * 6.21 - t * 1.00 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.55;
	p = abs(p);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p *= 1.62;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.72);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.71 + time * 0.09, vec3(0.53, 0.59, 0.57), vec3(0.36, 0.34, 0.45), vec3(1.23, 1.12, 0.78), vec3(0.75, 0.46, 0.15));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
