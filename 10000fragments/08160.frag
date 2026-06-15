uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 26.15 - t * 8.45 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.63;
	p += vec2(0.61, -0.88) * sin(length(p) * 3.67 - time * 1.72) * 0.30;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.07), field(p, time, 2.15));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
