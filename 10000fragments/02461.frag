uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.22) - 0.5;
    float rad = 0.26 + 0.12 * sin(t * 1.93 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.12;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.57;
	p = sin(p * 2.63 + time * 1.50) * 1.43;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.85, 0.15, 0.93) * (0.16 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
