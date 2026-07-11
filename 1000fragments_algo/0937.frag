uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.76) - 0.5;
    float rad = 0.27 + 0.12 * sin(t * 3.49 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.35;
	p += vec2(sin((time * 0.57) * 0.71), cos((time * 0.57) * 0.74)) * 0.26;
	float an = atan(p.y, p.x) + (time * 0.57) * 0.60;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.55 / 3.1415927, 1.43 / r + (time * 0.57) * 1.07);
	float d = field(tv, (time * 0.57), 0.0);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.64, 0.65, 0.57) + vec3(0.08, 0.07, 0.12);
	col *= clamp(r * 2.73, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.83));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.36);
	col = clamp(col, 0.0, 1.0) * vec3(0.997, 0.947, 1.015) * 1.00 + 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
