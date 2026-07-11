uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.15) - 0.5;
    float rad = 0.40 + 0.12 * sin(t * 2.42 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.48;
	{ p = vec2(atan(p.y, p.x) * 1.39, length(p) * 4.37 - time * 0.68); }
	p += vec2(0.53, 0.25) * sin(length(p) * 3.27 - time * 2.00) * 0.23;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.56), field(p, time, 1.13));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
