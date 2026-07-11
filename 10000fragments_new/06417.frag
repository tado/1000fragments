uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.65 + t * 3.66 + ph) + sin(p.y * 11.69 - t * 1.41 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.49;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.01 / 3.1415927, 1.46 / r - time * 2.80);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.25, 0.22, 0.54), vec3(0.80, 0.83, 0.40), cc);
	col *= clamp(r * 2.10, 0.0, 1.0);
	col = mod(col * 2.86, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
