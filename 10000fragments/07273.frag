uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.56) - 0.5;
    float rad = 0.38 + 0.12 * sin(t * 3.23 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = abs(p);
	{ float fr = length(p); p *= 1.0 + -0.66 * fr * fr; }
	p *= 2.32;
	p += vec2(-0.04, -0.81) * sin(length(p) * 4.40 - time * 1.18) * 0.31;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.45, 1.43, 1.02) + vec3(0.20, 0.11, 0.19);
	col = fract(col * 1.99);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
