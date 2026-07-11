uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 8.35 + t * 3.41 + ph) * 0.7;
    float wb = sin(p.y * 11.94 - t * 1.03 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.23;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.98 / 3.1415927, 1.16 / r - time * 2.12);
	tv.x += tv.y * 0.41;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.33, 0.94, 0.46) * (0.13 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col *= clamp(r * 1.01, 0.0, 1.0);
	col = mod(col * 2.20, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
