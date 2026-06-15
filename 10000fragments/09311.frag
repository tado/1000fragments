uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.17) - 0.5;
    float rad = 0.36 + 0.12 * sin(t * 2.70 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p *= 2.93;
	{ p = vec2(atan(p.y, p.x) * 2.98, length(p) * 5.35 - time * 0.30); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.87 + time * 0.01, vec3(0.46, 0.42, 0.57), vec3(0.31, 0.48, 0.38), vec3(1.25, 1.11, 1.03), vec3(0.28, 0.86, 0.69));
	col = fract(col * 2.44);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
