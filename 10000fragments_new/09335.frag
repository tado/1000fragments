uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.95) - 0.5;
    float rad = 0.41 + 0.12 * sin(t * 1.30 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += sin(p.y * 2.84 + time * 1.45) * 0.19;
	p = abs(p);
	{ p = vec2(atan(p.y, p.x) * 1.76, length(p) * 2.05 - time * 0.21); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.23), field(p, time, 2.45));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
