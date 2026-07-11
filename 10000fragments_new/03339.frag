uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 14.84 + t * 1.94 + ph) * 0.7;
    float wb = sin(p.y * 18.22 - t * 3.11 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.23;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.08), cos(time * 1.40)) * 0.08;
	float an = atan(p.y, p.x) + time * 0.28;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.15 / 3.1415927, 0.73 / r + time * 1.07);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.09 + time * 0.44);
	col *= clamp(r * 2.12, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
