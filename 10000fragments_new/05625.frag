uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.63 + t * 4.40 + ph) + sin(p.y * 11.36 - t * 4.40 + ph)
        + sin((p.x + p.y) * 2.95 + t * 4.40 + ph) + sin(length(p) * 10.53 - t * 4.40 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.07;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.47, 0.10, 0.45), vec3(0.76, 0.53, 0.68), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
