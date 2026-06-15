uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.65 + t * 0.93 + ph) + sin(p.y * 6.85 - t * 0.93 + ph)
        + sin((p.x + p.y) * 6.10 + t * 0.93 + ph) + sin(length(p) * 14.43 - t * 0.93 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.32, 0.20, 0.28), vec3(0.90, 0.71, 0.81), d);
	col = clamp((col - 0.5) * 1.90 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
