uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 13.76 + t * 3.42 + ph) * 0.7;
    float wb = sin(p.y * 13.59 - t * 1.06 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.74;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.86 / 3.1415927, 1.24 / r - time * 1.78);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.13 + time * 0.54);
	col *= clamp(r * 2.21, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
