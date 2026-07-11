uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 9.42 + t * 1.27 + ph) * 0.7;
    float wb = sin(p.y * 13.19 - t * 3.41 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.54;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.21;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.96 / 3.1415927, 0.87 / r - time * 1.05);
	tv.x += tv.y * 0.42;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.47, 0.32, 0.86) * (0.08 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col *= clamp(r * 1.60, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.04));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
