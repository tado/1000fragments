uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.99 + t * 5.92 + ph) + sin(p.y * 17.85 - t * 4.06 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.29;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.35 / 3.1415927, 1.07 / r + time * 0.72);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.98, 0.76, 1.43) + vec3(0.13, 0.07, 0.10);
	col *= clamp(r * 1.58, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.78 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
