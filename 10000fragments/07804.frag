uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.71 + t * 4.85 + ph) + sin(p.y * 7.59 - t * 4.85 + ph)
        + sin((p.x + p.y) * 11.49 + t * 4.85 + ph) + sin(length(p) * 7.82 - t * 4.85 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.71;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.00, 0.15, 0.12), vec3(0.86, 0.70, 0.59), d);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.22 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
