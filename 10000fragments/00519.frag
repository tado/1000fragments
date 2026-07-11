uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 21.18 + sin(p.y * 3.03 + t * 1.01) * 3.66 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 1.24, length(p) * 4.08 - time * 0.13); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float fr = length(p); p *= 1.0 + 0.31 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.16 + time * 0.07, vec3(0.43, 0.53, 0.51), vec3(0.40, 0.37, 0.48), vec3(0.71, 0.95, 0.96), vec3(0.69, 0.70, 0.08));
	col = clamp((col - 0.5) * 1.72 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
