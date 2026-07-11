uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.11 + sin(p.y * 1.85 + t * 1.71) * 1.76 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.44;
	p += vec2(0.11, -0.21) * sin(length(p) * 2.03 - time * 1.74) * 0.18;
	{ float fr = length(p); p *= 1.0 + 0.25 * fr * fr; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.44, 0.08, 0.60), vec3(0.89, 0.88, 0.63), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.71));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
