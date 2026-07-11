uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.37, 0.0)) * 20.67 - t * 7.82 + ph);
    float mb = sin(length(p + vec2(0.37, 0.0)) * 35.01 - t * 7.82 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.34;
	{ p = vec2(atan(p.y, p.x) * 2.79, length(p) * 2.24 - time * 0.24); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(length(p) * -3.52 + time * 0.68) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.45 + time * 0.16, vec3(0.57, 0.58, 0.50), vec3(0.34, 0.47, 0.46), vec3(1.28, 0.76, 0.78), vec3(0.87, 0.79, 0.39));
	col = mod(col * 2.31, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
