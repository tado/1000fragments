uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 6.12 + t * 0.75 + ph) * 0.7;
    float wb = sin(p.y * 17.25 - t * 1.78 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.51;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.32 / 3.1415927, 0.36 / r - time * 2.33);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.44 + time * 0.08);
	col *= clamp(r * 2.62, 0.0, 1.0);
	col *= 0.81 + 0.10 * sin(gl_FragCoord.y * 2.26 + time * 17.35);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
