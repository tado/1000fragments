uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.34) - 0.5;
    float rad = 0.31 + 0.12 * sin(t * 1.44 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.85;
	p = abs(p);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = fract(p * 2.75) - 0.5;
	{ float fr = length(p); p *= 1.0 + -0.55 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.75 + time * 0.30, vec3(0.45, 0.50, 0.59), vec3(0.38, 0.49, 0.31), vec3(1.19, 0.95, 1.31), vec3(0.79, 0.08, 0.10));
	col = fract(col * 1.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
