uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 11.45 + t * 2.26 + ph) * 0.7;
    float wb = sin(p.y * 9.67 - t * 2.03 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.63;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.41), cos(time * 0.89)) * 0.23;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.65 / 3.1415927, 1.28 / r - time * 2.33);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.58 + time * 0.22);
	col *= clamp(r * 1.36, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
