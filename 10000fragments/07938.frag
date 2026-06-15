uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.45) - 0.5;
    float rad = 0.25 + 0.12 * sin(t * 2.21 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.89;
	p += vec2(-0.74, -0.77) * sin(length(p) * 4.48 - time * 1.54) * 0.11;
	p = abs(p) - 0.57;
	{ float fr = length(p); p *= 1.0 + -0.61 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 1.38, length(p) * 3.61 - time * 0.50); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.33), field(p, time, 0.67));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
