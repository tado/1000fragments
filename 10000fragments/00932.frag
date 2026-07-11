uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.35 + t * 3.63 + ph) + sin(p.y * 2.81 - t * 3.63 + ph)
        + sin((p.x + p.y) * 3.66 + t * 3.63 + ph) + sin(length(p) * 16.49 - t * 3.63 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.79;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.45, 0.30, 0.40), vec3(0.96, 0.87, 0.55), d);
	col = mod(col * 2.93, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
