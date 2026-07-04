uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 12.0 + qr * 2.00 * sin(t * 0.65) + t * 1.10 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.58;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.25 / 3.1415927, 1.16 / r - time * 1.92);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.84 + time * 0.30);
	col *= clamp(r * 2.37, 0.0, 1.0);
	col *= 0.85 + 0.15 * sin(gl_FragCoord.y * 1.36 + time * 11.82);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
