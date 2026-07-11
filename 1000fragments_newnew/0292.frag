uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.74 + sin(p.y * 5.85 + t * 3.63) * 3.12 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.66) * 0.44), cos((time * 0.66) * 0.94)) * 0.28;
	float an = atan(p.y, p.x) + (time * 0.66) * 0.67;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.45 / 3.1415927, 0.91 / r - (time * 0.66) * 1.20);
	float d = field(tv, (time * 0.66), 0.0);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.57, 0.50, 0.61) + vec3(0.13, 0.12, 0.12);
	col *= clamp(r * 1.14, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.61));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.57);
	col = clamp(col, 0.0, 1.0) * vec3(1.020, 0.961, 0.994) * 1.00 + 0.024;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
