uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 23.31 - t * 3.77 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.79;
	p += vec2(-0.60, -0.14) * sin(length(p) * 4.21 - time * 0.70) * 0.36;
	p = rot2(p.y * -3.40 + time * 0.57) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(1.54) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.64 + time * 0.21, vec3(0.43, 0.51, 0.55), vec3(0.40, 0.43, 0.40), vec3(1.30, 1.32, 1.04), vec3(0.56, 0.14, 0.43));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
