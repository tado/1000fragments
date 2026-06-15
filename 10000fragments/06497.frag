uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.34 + t * 5.01 + ph) + sin(p.y * 15.70 - t * 2.66 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(0.90, -0.10) * sin(length(p) * 2.59 - time * 1.17) * 0.39;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(time * -1.22) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.27 + time * 0.23, vec3(0.51, 0.56, 0.60), vec3(0.46, 0.43, 0.31), vec3(1.40, 1.09, 0.89), vec3(0.04, 0.04, 1.00));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
