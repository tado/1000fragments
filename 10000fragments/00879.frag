uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.81 + sin(p.y * 5.63 + t * 5.32) * 3.98 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.34, 0.07, 0.50), vec3(0.91, 0.53, 0.65), d);
	col = fract(col * 1.89);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
