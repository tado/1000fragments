uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.58) - 0.5;
    float rad = 0.42 + 0.12 * sin(t * 2.00 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.58;
	{ p = vec2(atan(p.y, p.x) * 1.10, length(p) * 4.84 - time * 0.39); }
	p = fract(p * 1.02) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.77), field(p, time, 1.53));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.84, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
