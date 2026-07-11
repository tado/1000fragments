uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 18.02 + t * 1.13 + ph) * 0.7;
    float wb = sin(p.y * 9.41 - t * 3.17 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.35;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.19 / 3.1415927, 0.35 / r + time * 0.65);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.76 + time * 0.97);
	col *= clamp(r * 1.25, 0.0, 1.0);
	col = mod(col * 2.62, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
