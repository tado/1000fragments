uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.30, 0.0)) * 27.39 - t * 7.60 + ph);
    float mb = sin(length(p + vec2(0.30, 0.0)) * 26.73 - t * 5.09 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.61), cos(time * 1.19)) * 0.14;
	float an = atan(p.y, p.x) + time * -0.54;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.52 / 3.1415927, 0.75 / r + time * 0.88);
	tv.x += tv.y * 0.49;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.78, 0.29, 0.49) * (0.16 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col *= clamp(r * 1.45, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.42 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
