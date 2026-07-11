uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.72) - 0.5;
    float rad = 0.33 + 0.12 * sin(t * 3.88 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(0.70, 0.32) * sin(length(p) * 2.08 - time * 1.37) * 0.30;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.57), field(p, time, 1.13));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
