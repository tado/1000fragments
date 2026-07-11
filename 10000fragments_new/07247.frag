uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 11.56 + t * 2.35 + ph) * 0.7;
    float wb = sin(p.y * 18.29 - t * 1.85 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.77;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.43), cos(time * 0.86)) * 0.25;
	float an = atan(p.y, p.x) + time * 0.46;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.27 / 3.1415927, 1.42 / r + time * 1.38);
	tv.x += tv.y * 0.46;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.71 + time * 0.27);
	col *= clamp(r * 1.47, 0.0, 1.0);
	col = mod(col * 2.37, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
