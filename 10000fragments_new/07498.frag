uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.27 + t * 1.46 + ph) + sin(p.y * 7.02 - t * 1.46 + ph)
        + sin((p.x + p.y) * 4.28 + t * 1.46 + ph) + sin(length(p) * 17.62 - t * 1.46 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.78;
	p = abs(p) - 0.61;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.02, 0.47, 0.47), vec3(0.96, 0.94, 0.60), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
