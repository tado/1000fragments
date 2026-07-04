uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 5.96 + t * 3.62 + ph) * 0.7;
    float wb = sin(p.y * 12.50 - t * 3.52 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.76;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.36), cos(time * 0.70)) * 0.25;
	float an = atan(p.y, p.x) + time * 0.33;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.97 / 3.1415927, 0.79 / r - time * 1.92);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.08 + time * 0.13);
	col *= clamp(r * 1.05, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
