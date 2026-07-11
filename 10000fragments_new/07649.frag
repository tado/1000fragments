uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 32.19 - t * 2.16 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.66;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = fract(p * 1.54) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.64 + time * 0.15, vec3(0.51, 0.46, 0.45), vec3(0.44, 0.40, 0.48), vec3(0.86, 1.36, 1.15), vec3(0.02, 0.11, 0.07));
	col = mod(col * 1.89, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
