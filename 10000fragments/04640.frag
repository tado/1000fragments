uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.47, 0.0)) * 10.28 - t * 4.42 + ph);
    float mb = sin(length(p + vec2(0.47, 0.0)) * 37.99 - t * 4.42 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + 0.68 * fr * fr; }
	p *= 3.19;
	p += vec2(0.28, -0.15) * sin(length(p) * 5.75 - time * 1.56) * 0.24;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.49, 0.05, 0.37), vec3(0.73, 0.60, 0.81), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.12));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
