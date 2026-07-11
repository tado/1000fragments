uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.84) - 0.5;
    float rad = 0.35 + 0.12 * sin(t * 3.77 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(-0.73, 0.14) * sin(length(p) * 3.98 - time * 1.66) * 0.25;
	p *= 3.21;
	{ float fr = length(p); p *= 1.0 + -0.37 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.87), field(p, time, 1.73));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
