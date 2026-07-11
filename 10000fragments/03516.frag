uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.62) - 0.5;
    float rad = 0.24 + 0.12 * sin(t * 3.66 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.22;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.26), field(p, time, 2.51));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.32);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
