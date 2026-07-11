uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.43, t * 2.36 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.71;
	p *= 1.30;
	p = fract(p * 2.07) - 0.5;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.46, 0.50, 0.30), vec3(0.87, 0.60, 0.75), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.68));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
