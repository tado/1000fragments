uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.34 + t * 3.37 + ph) + sin(p.y * 5.40 - t * 4.69 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.49;
	p = (floor(p * 6.1) + 0.5) / 6.1;
	p = fract(p * 2.69) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.64), field(p, time, 1.29));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
