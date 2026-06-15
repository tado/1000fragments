uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.42 + t * 0.66 + ph) + sin(p.y * 10.78 - t * 0.66 + ph)
        + sin((p.x + p.y) * 10.85 + t * 0.66 + ph) + sin(length(p) * 15.17 - t * 0.66 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.48, 0.24, 0.30), vec3(0.90, 0.53, 0.77), d);
	col = mod(col * 2.31, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
