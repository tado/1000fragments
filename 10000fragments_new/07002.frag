uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 8.76 + t * 3.47 + ph) * 0.7;
    float wb = sin(p.y * 5.23 - t * 0.86 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.50;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.44), cos(time * 0.41)) * 0.28;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.92 / 3.1415927, 0.46 / r - time * 2.65);
	tv.x += tv.y * 0.37;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.82, 0.68, 0.31) * (0.13 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col *= clamp(r * 2.65, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
