uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 9.0 + qr * 7.33 * sin(t * 1.01) + t * 1.66 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.50), cos(time * 0.68)) * 0.19;
	float an = atan(p.y, p.x) + time * -0.62;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.75 / 3.1415927, 1.17 / r - time * 0.65);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.54, 0.30, 0.26) * (0.12 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col *= clamp(r * 2.79, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
