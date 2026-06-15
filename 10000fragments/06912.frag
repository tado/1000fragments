uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.38) - 0.5;
    float rad = 0.35 + 0.12 * sin(t * 1.07 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.19 + time * 0.03, vec3(0.59, 0.42, 0.58), vec3(0.39, 0.44, 0.48), vec3(1.36, 1.21, 0.78), vec3(0.19, 0.49, 0.47));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
