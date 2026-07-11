uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.63, t * 0.49 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.03) - 0.5;
    float rad = 0.33 + 0.12 * sin(t * 0.54 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p *= 2.04;
	p = fract(p * 2.29) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 2.74, length(p) * 4.68 - time * 0.17); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.88);
	float d = d1 + d2;
	vec3 col = palette(d * 1.14 + time * 0.12, vec3(0.42, 0.51, 0.53), vec3(0.49, 0.37, 0.30), vec3(1.06, 1.00, 0.73), vec3(0.26, 0.60, 0.21));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
