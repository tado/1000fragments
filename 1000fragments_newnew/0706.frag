uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.51, t * 1.07 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.24;
	float d = 0.5 + 0.5 * field(p, (time * 0.78), 0.0);
	vec3 col = mix(vec3(0.80, 0.85, 0.69), vec3(0.17, 0.18, 0.14), d);
	col = clamp((col - 0.5) * 2.03 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.37);
	col = clamp(col, 0.0, 1.0) * vec3(1.043, 0.991, 0.933) * 1.00 + 0.041;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
