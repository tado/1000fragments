uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.51 + t * 3.71 + ph) + sin(p.y * 3.61 - t * 1.13 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.04;
	p = abs(p) - 0.40;
	p = fract(p * 1.67) - 0.5;
	p *= 3.46;
	{ float fr = length(p); p *= 1.0 + -0.56 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.00, 1.28, 1.15) + vec3(0.17, 0.26, 0.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
