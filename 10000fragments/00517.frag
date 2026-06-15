uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.77 + t * 4.79 + ph) + sin(p.y * 14.07 - t * 1.99 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(0.88, 0.63) * sin(length(p) * 4.99 - time * 1.94) * 0.14;
	{ float fr = length(p); p *= 1.0 + -0.75 * fr * fr; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.86 + time * 0.05, vec3(0.46, 0.55, 0.47), vec3(0.32, 0.49, 0.50), vec3(1.22, 1.02, 0.96), vec3(0.14, 0.83, 0.34));
	col = mod(col * 2.38, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
