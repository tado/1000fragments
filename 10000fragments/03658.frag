uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.84) - 0.5;
    float rad = 0.31 + 0.12 * sin(t * 1.96 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(0.31, 0.35) * sin(length(p) * 3.49 - time * 1.79) * 0.24;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.96), field(p, time, 1.93));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.54, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
