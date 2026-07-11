uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.47) - 0.5;
    float rad = 0.21 + 0.12 * sin(t * 2.10 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.64;
	p = (floor(p * 17.5) + 0.5) / 17.5;
	{ p = vec2(atan(p.y, p.x) * 2.50, length(p) * 2.15 - time * 0.20); }
	{ float fr = length(p); p *= 1.0 + -0.34 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.43, 1.01, 0.93) + vec3(0.16, 0.03, 0.21);
	col = mod(col * 1.48, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
