uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.39, 0.0)) * 35.92 - t * 2.11 + ph);
    float mb = sin(length(p + vec2(0.39, 0.0)) * 35.79 - t * 2.11 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.57;
	p = rot2(1.62) * p;
	p = rot2(p.y * -2.69 + time * 0.56) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = fract(p * 1.71) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.41 + time * 0.16, vec3(0.53, 0.42, 0.53), vec3(0.48, 0.31, 0.47), vec3(0.76, 0.85, 1.29), vec3(0.89, 0.31, 0.57));
	col = mod(col * 2.15, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
