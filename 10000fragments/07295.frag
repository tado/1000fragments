uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.25 + t * 2.17 + ph) + sin(p.y * 7.98 - t * 2.17 + ph)
        + sin((p.x + p.y) * 4.01 + t * 2.17 + ph) + sin(length(p) * 4.85 - t * 2.17 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.25;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.21, 0.62, 0.66) * (0.18 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col = mod(col * 2.81, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
