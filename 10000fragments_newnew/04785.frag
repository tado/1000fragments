uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 10.46 - t * 2.44 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.20;
	p = fract(p * 2.65) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.90), field(p, time, 1.79));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.74);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
