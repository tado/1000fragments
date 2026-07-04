uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 11.72 + t * 1.80 + ph) * 0.7;
    float wb = sin(p.y * 16.03 - t * 1.90 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.48;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.10;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.31 / 3.1415927, 0.41 / r + time * 1.71);
	tv.x += tv.y * 0.28;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.05 + time * 0.93);
	col *= clamp(r * 1.83, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.27));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
