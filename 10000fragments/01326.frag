uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.15 + t * 3.22 + ph) + sin(p.y * 7.16 - t * 3.22 + ph)
        + sin((p.x + p.y) * 4.73 + t * 3.22 + ph) + sin(length(p) * 7.28 - t * 3.22 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.12;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.90, 1.09, 0.76) + vec3(0.15, 0.29, 0.15);
	col = fract(col * 2.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
