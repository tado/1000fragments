uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.35, 0.0)) * 16.77 - t * 5.70 + ph);
    float mb = sin(length(p + vec2(0.35, 0.0)) * 31.13 - t * 2.71 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.15), cos(time * 1.25)) * 0.14;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.14 / 3.1415927, 1.42 / r + time * 1.02);
	tv.x += tv.y * 0.45;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.68, 0.19, 0.54) * (0.06 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col *= clamp(r * 1.16, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
