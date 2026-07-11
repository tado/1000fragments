uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 23.04 - t * 1.93 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y) - 0.42;
	p += vec2(sin((time * 0.60) * 1.01), cos((time * 0.60) * 0.84)) * 0.10;
	float an = atan(p.y, p.x) + (time * 0.60) * -0.56;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.34 / 3.1415927, 1.14 / r + (time * 0.60) * 2.41);
	tv.x += tv.y * 0.25;
	float d = field(tv, (time * 0.60), 0.0);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.63, 0.67, 0.62) + vec3(0.08, 0.06, 0.06);
	col *= clamp(r * 2.72, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.51);
	col = clamp(col, 0.0, 1.0) * vec3(1.045, 0.996, 0.933) * 1.00 + 0.047;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
