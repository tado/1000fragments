uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 13.27 + t * 2.50 + ph) + sin(p.y * 11.57 - t * 3.93 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.86;
	p = abs(p) - 0.44;
	p += vec2(0.27, 0.75) * sin(length(p) * 5.32 - time * 1.42) * 0.29;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.33), field(p, time, 0.67));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
