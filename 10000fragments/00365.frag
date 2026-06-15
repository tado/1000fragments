uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.34 + t * 1.88 + ph) + sin(p.y * 6.13 - t * 5.36 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.18 + sin(p.y * 4.43 + t * 2.30) * 3.35 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(2.03) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.51);
	float d = d1 * d2;
	vec3 col = palette(d * 1.71 + time * 0.14, vec3(0.54, 0.56, 0.44), vec3(0.43, 0.49, 0.34), vec3(0.71, 0.90, 0.71), vec3(0.79, 0.92, 0.96));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
