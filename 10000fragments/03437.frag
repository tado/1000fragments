uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.70) - 0.5;
    float rad = 0.44 + 0.12 * sin(t * 3.54 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.46;
	{ p = vec2(atan(p.y, p.x) * 1.24, length(p) * 5.57 - time * 0.27); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.31), field(p, time, 0.62));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
