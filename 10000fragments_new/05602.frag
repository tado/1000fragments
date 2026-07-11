uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.94) - 0.5;
    float rad = 0.37 + 0.12 * sin(t * 3.51 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.17;
	p.x += sin(p.y * 2.48 + time * 2.04) * 0.21;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.02), field(p, time, 2.04));
	col = 0.5 + 0.5 * col;
	col *= 0.85 + 0.12 * sin(gl_FragCoord.y * 2.62 + time * 13.62);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
