uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.62) - 0.5;
    float rad = 0.28 + 0.12 * sin(t * 1.22 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.11;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.84), field(p, time, 1.67));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.07));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
