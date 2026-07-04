uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.35 + 0.25 * pow(abs(cos(ra * 2.0 + t * 1.30)), 0.50);
    v = sin((rr - pet) * 17.81 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.80), cos(time * 1.30)) * 0.05;
	float an = atan(p.y, p.x) + time * 0.42;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.37 / 3.1415927, 1.33 / r + time * 1.48);
	tv.x += tv.y * 0.28;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.33 + time * 0.78);
	col *= clamp(r * 2.71, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
