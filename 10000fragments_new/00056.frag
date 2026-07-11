uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.00) - 0.5;
    float rad = 0.40 + 0.12 * sin(t * 3.87 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.97;
	p = abs(p);
	p *= 2.91;
	p.x += sin(p.y * 7.49 + time * 2.24) * 0.40;
	p += vec2(-0.83, -0.29) * sin(length(p) * 6.00 - time * 1.66) * 0.15;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.30), field(p, time, 0.59));
	col = 0.5 + 0.5 * col;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.98 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
