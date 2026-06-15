uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 19.44 - t * 1.50 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(-0.87, -0.20) * sin(length(p) * 5.65 - time * 0.86) * 0.32;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.98), field(p, time, 1.95));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.37);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
