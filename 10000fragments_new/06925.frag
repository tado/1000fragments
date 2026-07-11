uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 13.50 + t * 1.93 + ph) * 0.7;
    float wb = sin(p.y * 18.33 - t * 2.77 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.61;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.82 / 3.1415927, 1.22 / r - time * 2.02);
	tv.x += tv.y * 0.45;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.67 + time * 0.64);
	col *= clamp(r * 2.21, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
