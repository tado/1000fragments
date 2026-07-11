uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 30.12 - t * 2.67 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.22;
	p *= 1.91;
	p += vec2(-0.86, -0.20) * sin(length(p) * 4.55 - time * 1.13) * 0.36;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.45, 0.30, 0.17) * (0.17 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
