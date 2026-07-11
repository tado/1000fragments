uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 10.0 + qr * 5.61 * sin(t * 0.61) + t * 1.94 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + (time * 0.82) * -0.70;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.88 / 3.1415927, 0.40 / r - (time * 0.82) * 0.92);
	tv.x += tv.y * 0.22;
	float d = field(tv, (time * 0.82), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.22, 0.25, 0.23), vec3(0.71, 0.57, 0.59), smoothstep(0.0, 1.0, cc));
	col *= clamp(r * 1.41, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.54 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.61);
	col = clamp(col, 0.0, 1.0) * vec3(0.954, 1.020, 0.942) * 1.00 + 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
