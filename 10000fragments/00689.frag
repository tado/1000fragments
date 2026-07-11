uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.36 + sin(p.y * 2.86 + t * 4.46) * 3.47 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.09;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.44, 0.02, 0.41), vec3(0.58, 0.55, 0.61), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
