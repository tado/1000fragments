uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.63) - 0.5;
    float rad = 0.44 + 0.12 * sin(t * 1.78 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.61;
	{ p = vec2(atan(p.y, p.x) * 1.52, length(p) * 2.37 - time * 0.98); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.97), field(p, time, 1.94));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
