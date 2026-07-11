uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.72) - 0.5;
    float rad = 0.29 + 0.12 * sin(t * 3.73 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.97;
	p *= 1.0 + 0.15 * sin(time * 2.17);
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.55; }
	p *= 2.08;
	{ p = vec2(atan(p.y, p.x) * 2.66, length(p) * 4.05 - time * 0.43); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.95 + time * 0.27, vec3(0.43, 0.58, 0.41), vec3(0.46, 0.45, 0.50), vec3(1.18, 1.29, 1.17), vec3(0.95, 0.84, 0.60));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.14));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
