uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 17.19 + sin(p.y * 1.79 + t * 5.74) * 2.74 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.53 + vec2(t * 1.40, -t * 1.40) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.35;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(0.59, 0.38) * sin(length(p) * 5.60 - time * 1.34) * 0.29;
	p = rot2(2.44) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.30);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.30 + time * 0.13, vec3(0.52, 0.59, 0.47), vec3(0.33, 0.44, 0.38), vec3(1.12, 0.74, 0.84), vec3(0.08, 0.04, 0.00));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.19));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
