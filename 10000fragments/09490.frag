uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 20.43 - t * 4.49 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p);
	p = fract(p * 1.29) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.30), field(p, time, 2.59));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.65);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
