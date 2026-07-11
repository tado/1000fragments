uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.25 + sin(p.y * 1.67 + t * 1.70) * 1.67 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.08;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.56, 1.12, 0.71) + vec3(0.10, 0.26, 0.16);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.95));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
