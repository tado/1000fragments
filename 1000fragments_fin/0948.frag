uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.21) - 0.5;
    float rad = 0.42 + 0.12 * sin(t * 3.19 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.00 / 3.1415927, 0.38 / r - (time * 0.88) * 1.42);
	float d = field(tv, (time * 0.88), 0.0);
	vec3 col = vec3(0.984, 0.465, 0.427) * (0.08 / (abs((d)) + 0.03));
	col = col / (1.0 + col);
	col *= clamp(r * 1.73, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.42);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col *= vec3(0.944, 0.983, 1.044);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.23 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
