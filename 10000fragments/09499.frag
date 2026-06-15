uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.10 + t * 3.87 + ph) + sin(p.y * 3.04 - t * 5.87 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.05;
	{ p = vec2(atan(p.y, p.x) * 1.88, length(p) * 4.52 - time * 0.76); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.51 + time * 0.18, vec3(0.50, 0.47, 0.57), vec3(0.31, 0.35, 0.35), vec3(1.09, 1.04, 1.31), vec3(0.07, 0.26, 0.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
