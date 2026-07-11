uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 6.01 + t * 3.37 + ph) * 0.7;
    float wb = sin(p.y * 12.96 - t * 1.29 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.34;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.85 / 3.1415927, 1.26 / r - time * 2.88);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.45 + time * 0.26);
	col *= clamp(r * 2.16, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.08 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
