uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 1.53 + t * 0.30) - 0.5) * 2.0;
    v = sin((p.y * 5.46 + zx * 1.08 + t * 1.35) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + (time * 0.61) * -0.68;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.13 / 3.1415927, 1.05 / r - (time * 0.61) * 2.78);
	float d = field(tv, (time * 0.61), 0.0);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.64, 0.63, 0.65) + vec3(0.00, 0.00, 0.01);
	col *= clamp(r * 1.48, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.31 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.46);
	col = clamp(col, 0.0, 1.0) * vec3(1.019, 0.982, 0.996) * 1.00 + 0.043;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
