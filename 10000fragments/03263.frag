uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.26, 0.0)) * 8.06 - t * 5.46 + ph);
    float mb = sin(length(p + vec2(0.26, 0.0)) * 38.95 - t * 5.46 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.42 + t * 3.54 + ph) + sin(p.y * 7.32 - t * 3.54 + ph)
        + sin((p.x + p.y) * 10.03 + t * 3.54 + ph) + sin(length(p) * 14.21 - t * 3.54 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -0.22) * p;
	p = abs(p) - 0.61;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.72);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.50 + time * 0.30, vec3(0.50, 0.56, 0.42), vec3(0.44, 0.42, 0.38), vec3(0.87, 0.93, 1.25), vec3(0.96, 0.55, 0.84));
	col = mod(col * 1.90, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
