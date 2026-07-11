uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 4.0 + qr * 3.88 * sin(t * 0.64) + t * 1.84 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.42 + 0.16 * pow(abs(cos(ra * 7.0 + t * 2.69)), 2.46);
    v = sin((rr - pet) * 12.35 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.32;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(p.y * 2.33 + time * 0.52) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.44);
	float d = d1 * d2;
	vec3 col = palette(d * 1.55 + time * 0.15, vec3(0.54, 0.42, 0.53), vec3(0.40, 0.33, 0.38), vec3(1.12, 0.96, 1.02), vec3(0.53, 0.42, 0.18));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
