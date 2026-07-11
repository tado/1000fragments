uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.89, t * 1.69 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.70) - 0.5;
    float rad = 0.25 + 0.12 * sin(t * 1.33 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.32, lr * 2.31 + time * -0.55); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ p = vec2(atan(p.y, p.x) * 2.66, length(p) * 3.00 - time * 0.76); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.01);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.83 + time * 0.18, vec3(0.46, 0.55, 0.45), vec3(0.34, 0.35, 0.45), vec3(0.77, 0.77, 1.31), vec3(0.19, 0.90, 0.57));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.96));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
