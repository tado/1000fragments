uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 24.28 - t * 4.47 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.45;
	p = fract(p * 1.40) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.56), field(p, time, 1.13));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.28, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
