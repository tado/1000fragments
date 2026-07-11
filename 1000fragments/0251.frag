uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 7.38 + sin(p.y * 4.61 + t * 2.78) * 3.53 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(time * -0.80) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.48 + time * 0.17, vec3(0.50, 0.48, 0.49), vec3(0.30, 0.36, 0.33), vec3(1.28, 1.32, 1.36), vec3(0.75, 0.27, 0.69));
	col = mod(col * 1.97, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
