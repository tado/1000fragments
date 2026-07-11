uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 6.0 + qr * 8.00 * sin(t * 1.18) + t * 3.58 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.64 / 3.1415927, 0.86 / r - (time * 0.80) * 2.46);
	float d = field(tv, (time * 0.80), 0.0);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.65, 0.64, 0.71) + vec3(0.06, 0.07, 0.03);
	col *= clamp(r * 2.47, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(1.002, 0.979, 1.011) * 1.00 + 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
