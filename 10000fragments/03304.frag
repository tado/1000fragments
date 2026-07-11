uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.68) - 0.5;
    float rad = 0.29 + 0.12 * sin(t * 3.62 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.28;
	p = fract(p * 2.59) - 0.5;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.21, 0.22, 0.34), vec3(0.76, 0.92, 0.62), d);
	col = fract(col * 2.46);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
