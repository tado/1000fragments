uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.39) - 0.5;
    float rad = 0.36 + 0.12 * sin(t * 3.36 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.97;
	{ p = vec2(atan(p.y, p.x) * 1.56, length(p) * 4.59 - time * 0.36); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.67), field(p, time, 1.33));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.00, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
