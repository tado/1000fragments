uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 17.99 - t * 4.06 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + (time * 0.64) * 0.22;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.69 / 3.1415927, 1.24 / r + (time * 0.64) * 1.03);
	float d = field(tv, (time * 0.64), 0.0);
	vec3 col = vec3(0.57, 0.55, 0.59) * (0.06 / (abs((d)) + 0.07));
	col = col / (1.0 + col);
	col *= clamp(r * 2.08, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.61);
	col = clamp(col, 0.0, 1.0) * vec3(0.986, 1.004, 1.018) * 1.00 + 0.010;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
