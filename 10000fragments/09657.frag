uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 16.07 + t * 1.97 + ph) * 0.7;
    float wb = sin(p.y * 8.31 - t * 1.47 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.78;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.33), cos(time * 0.98)) * 0.26;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.85 / 3.1415927, 0.48 / r - time * 2.41);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.05, 0.82, 0.54) + vec3(0.07, 0.05, 0.01);
	col *= clamp(r * 1.38, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.96 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
