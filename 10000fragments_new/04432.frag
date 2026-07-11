uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.34) - 0.5;
    float rad = 0.37 + 0.12 * sin(t * 2.53 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 2.67, length(p) * 5.36 - time * 0.20); }
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.52, 0.95, 0.21) * (0.07 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col = fract(col * 1.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
