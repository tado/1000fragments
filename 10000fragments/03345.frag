uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.98) - 0.5;
    float rad = 0.34 + 0.12 * sin(t * 2.21 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.68;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(0.37, 0.80) * sin(length(p) * 4.46 - time * 1.31) * 0.22;
	p = abs(p) - 0.72;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.63 + time * 0.25, vec3(0.42, 0.49, 0.60), vec3(0.38, 0.37, 0.45), vec3(1.11, 0.75, 0.94), vec3(0.88, 0.60, 0.63));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
