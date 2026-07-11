uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.26 + t * 3.08 + ph) + sin(p.y * 6.58 - t * 3.08 + ph)
        + sin((p.x + p.y) * 4.00 + t * 3.08 + ph) + sin(length(p) * 14.61 - t * 3.08 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.95;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.67, 0.55, 0.71) + vec3(0.10, 0.26, 0.02);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.57));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
