uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 31.10 - t * 5.83 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.71;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.03, 0.44, 0.36), vec3(0.80, 0.72, 0.68), d);
	col *= 0.88 + 0.20 * sin(gl_FragCoord.y * 1.21 + time * 11.84);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
