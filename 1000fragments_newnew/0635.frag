uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.27, t * 1.57 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.80) * 1.15), cos((time * 0.80) * 1.00)) * 0.23;
	float an = atan(p.y, p.x) + (time * 0.80) * -0.46;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.88 / 3.1415927, 1.00 / r + (time * 0.80) * 1.31);
	tv.x += tv.y * 0.40;
	float d = field(tv, (time * 0.80), 0.0);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.50, 0.42, 0.41) + vec3(0.09, 0.07, 0.04);
	col *= clamp(r * 1.18, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.60);
	col = clamp(col, 0.0, 1.0) * vec3(0.985, 1.004, 1.007) * 1.00 + 0.048;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
