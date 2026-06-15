uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.10 + t * 1.14 + ph) + sin(p.y * 2.36 - t * 1.14 + ph)
        + sin((p.x + p.y) * 10.26 + t * 1.14 + ph) + sin(length(p) * 10.61 - t * 1.14 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.83;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.50, 0.22, 0.47), vec3(0.62, 0.86, 0.71), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
