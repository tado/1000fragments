uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.23, 0.0)) * 30.45 - t * 1.31 + ph);
    float mb = sin(length(p + vec2(0.23, 0.0)) * 30.06 - t * 1.31 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.38;
	p += vec2(0.19, -0.77) * sin(length(p) * 2.22 - time * 1.86) * 0.18;
	{ float fr = length(p); p *= 1.0 + -0.21 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.66, 1.49, 0.55) + vec3(0.04, 0.26, 0.22);
	col = clamp((col - 0.5) * 2.19 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
