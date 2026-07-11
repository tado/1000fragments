uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.79) - 0.5;
    float rad = 0.30 + 0.12 * sin(t * 3.40 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.58;
	p = (floor(p * 20.6) + 0.5) / 20.6;
	{ p = vec2(atan(p.y, p.x) * 1.68, length(p) * 2.06 - time * 0.61); }
	p *= 2.68;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.72, 0.37, 0.84) * (0.17 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.22 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
