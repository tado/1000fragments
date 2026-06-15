uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 7.44 - t * 7.75 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.46;
	p = rot2(time * -0.26) * p;
	{ float fr = length(p); p *= 1.0 + 0.38 * fr * fr; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(-0.30, -0.83) * sin(length(p) * 4.69 - time * 1.35) * 0.34;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.66 + time * 0.10, vec3(0.45, 0.42, 0.54), vec3(0.47, 0.42, 0.33), vec3(0.76, 1.27, 1.37), vec3(0.68, 0.43, 0.66));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
