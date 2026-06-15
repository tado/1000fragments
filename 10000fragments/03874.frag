uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 19.69 - t * 4.05 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.52;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = abs(p);
	p = rot2(time * 1.38) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.45 + time * 0.26, vec3(0.45, 0.53, 0.55), vec3(0.47, 0.33, 0.39), vec3(1.03, 0.92, 1.04), vec3(0.53, 0.65, 0.19));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
