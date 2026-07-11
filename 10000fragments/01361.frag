uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.89 + t * 2.28 + ph) + sin(p.y * 3.99 - t * 2.28 + ph)
        + sin((p.x + p.y) * 6.64 + t * 2.28 + ph) + sin(length(p) * 9.01 - t * 2.28 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.23, 1.02, 1.44) + vec3(0.08, 0.18, 0.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
