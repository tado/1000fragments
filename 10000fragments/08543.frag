uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.16 + t * 2.91 + ph) + sin(p.y * 9.81 - t * 2.91 + ph)
        + sin((p.x + p.y) * 5.47 + t * 2.91 + ph) + sin(length(p) * 6.01 - t * 2.91 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.53;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.40, 0.44, 0.18), vec3(0.73, 0.89, 0.49), d);
	col = fract(col * 1.42);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
